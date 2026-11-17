// Turns the real web pages into PDFs on standard Letter pages, keeping the site's own design.
// Things a PDF cannot play (video, the 360 viewer, the Design switcher) are replaced by still images.
// Usage: node print/capture.js spring-breeze   (writes print/out/spring-breeze.pdf)
const {chromium}=require('playwright');
const path=require('path');const fs=require('fs');
const ROOT=path.resolve(__dirname,'..');
// By default a video becomes its poster image, as the page shows it before playing. FRAMES=1 swaps it for six still frames instead.
const USE_FRAMES=process.env.FRAMES==='1';
const PROJECTS={
  'spring-breeze':['projects/spring-breeze-game.html','projects/spring-breeze-design.html'],
  'taipei-brewery':['projects/taipei-brewery.html'],
  'meimei':['projects/meimei-pet-game.html'],
  'byacre':['projects/byacre.html'],
  'order-vendor-link':['projects/order-vendor-link.html'],
  'reusable-cup':['projects/reusable-cup.html'],
  'vr-locomotion':['projects/vr-locomotion.html'],
  'video-work':['projects/video-work.html'],
  'cover-hci':['print/cover.html?v=hci'],
  'cover-creative':['print/cover.html?v=creative'],
};
const FRAMES={ // video file name -> still frames in print/frames, and how many columns to lay them out in
  'spring-breeze-gameplay.mp4':{files:['sb_3.jpg','sb_10.jpg','sb_26.jpg','sb_34.jpg','sb_42.jpg','sb_50.jpg'],cols:3},
  'taipei-brewery-tour.mp4':{files:['bw_4.jpg','bw_16.jpg','bw_28.jpg','bw_40.jpg','bw_52.jpg','bw_66.jpg'],cols:3},
  'errand-demo.mp4':{files:['mm_1.jpg','mm_4.jpg','mm_7.jpg','mm_10.jpg'],cols:2},
};
const YT={ // YouTube id -> a still image in print/frames
  'tC8eScxL7qA':'yt_tC8eScxL7qA.jpg','nyKfb9Sx4u8':'yt_nyKfb9Sx4u8.jpg','ubvrPFhVYig':'yt_ubvrPFhVYig.jpg',
};
const PRINT_CSS=`
@media print{
  html,body{-webkit-print-color-adjust:exact;print-color-adjust:exact}
  .home-nav,.crumb,.vw-top,.site-foot{display:none!important}
  figure,table,.tbl-wrap,.lanes,.shot,.film,.mk,.dsg-panel,.pf-frames,.pf-pano figure,.chr,.cols>div,.ver>div,.p-img{break-inside:avoid;page-break-inside:avoid}
  h1,h2,h3,h4{break-after:avoid;page-break-after:avoid}
  .pf-frames{display:grid;gap:12px}
  .pf-frames img{display:block;width:100%;height:auto}
  .pf-cap{font-size:13px;margin:6px 0 0;opacity:.85}
  .pf-pano{display:grid;gap:14px}
  .pf-pano img{display:block;width:100%;height:auto}
  .pf-pano figcaption{font-size:13px;margin-top:6px}
  .film .player{max-width:600px;break-inside:avoid}
  .film{padding-block:26px!important}
  .film .yt{display:none!important}
  .film{break-inside:auto!important;page-break-inside:auto!important}
  .film ul.tags,.film h2{break-after:avoid!important;page-break-after:avoid!important}
  .dtabs{display:none!important}
  .dd{break-inside:avoid}
  .live-svg svg .stp{opacity:1!important}
  details.full[open] summary{display:none}
  #dsg.pf-open{grid-template-columns:minmax(0,1fr)!important}
  #dsg.pf-open .dsg-stage{display:grid;grid-template-columns:1fr 1fr;gap:16px;min-height:0;padding:16px}
  #dsg.pf-open .dsg-panel{align-items:flex-start}
  #dsg.pf-open .dsg-ctl{display:none}
}`;
async function prepare(p){
  await p.emulateMedia({media:'print'});
  await p.addStyleTag({content:PRINT_CSS});
  await p.evaluate(({frames,yt,root,USE_FRAMES})=>{
    const file=f=>'file://'+root+'/print/frames/'+f;
    document.querySelectorAll('img[loading="lazy"]').forEach(i=>{i.loading='eager'});
    document.querySelectorAll('video').forEach(v=>{
      const name=(v.getAttribute('src')||(v.querySelector('source')||{}).src||'').split('/').pop();
      const spec=USE_FRAMES?frames[name]:null;
      if(spec){
        const box=document.createElement('div');box.className='pf-frames';
        box.style.gridTemplateColumns='repeat('+spec.cols+',1fr)';
        spec.files.forEach(f=>{const im=document.createElement('img');im.src=file(f);im.alt='';box.appendChild(im)});
        v.replaceWith(box);
      }else if(v.poster){
        const im=document.createElement('img');im.src=v.poster;im.alt='';im.style.cssText='display:block;width:100%;height:auto';
        v.replaceWith(im);
      }else{v.style.display='none'}
    });
    document.querySelectorAll('iframe').forEach(f=>{
      const m=(f.src||'').match(/embed\/([\w-]+)/);
      if(m&&yt[m[1]]){const im=document.createElement('img');im.src=file(yt[m[1]]);im.alt='';im.style.cssText='display:block;width:100%;aspect-ratio:16/9;object-fit:cover';f.replaceWith(im)}
      else{f.style.display='none'}
    });
    document.querySelectorAll('.pano[data-scenes]').forEach(el=>{
      const box=document.createElement('div');box.className='pf-pano';
      JSON.parse(el.dataset.scenes).forEach(s=>{
        const fig=document.createElement('figure'),im=document.createElement('img'),cap=document.createElement('figcaption');
        im.src=new URL(s.src,location.href).href;im.alt='';cap.textContent=s.label;fig.append(im,cap);box.append(fig);
      });
      el.querySelectorAll('.pano-stage,.pano-tabs').forEach(n=>n.remove());
      el.insertBefore(box,el.firstChild);
    });
    document.querySelectorAll('.dd').forEach(x=>{x.hidden=false});
    document.querySelectorAll('details').forEach(d=>{d.open=true});
    const dsg=document.getElementById('dsg');
    if(dsg){dsg.classList.add('pf-open');dsg.querySelectorAll('.dsg-panel').forEach(x=>{x.hidden=false});dsg.querySelectorAll('[role=tab]').forEach(x=>x.setAttribute('aria-selected','false'))}
  },{frames:FRAMES,yt:YT,root:ROOT,USE_FRAMES});
  await p.evaluate(()=>Promise.all([...document.images].map(i=>i.complete?1:new Promise(r=>{i.onload=i.onerror=r}))));
  await p.evaluate(()=>document.fonts.ready);
}
(async()=>{
  const names=process.argv.slice(2);
  if(!names.length||names.some(n=>!PROJECTS[n])){console.error('Known projects: '+Object.keys(PROJECTS).join(', '));process.exit(1)}
  fs.mkdirSync(path.join(__dirname,'out','parts'),{recursive:true});
  const b=await chromium.launch();
  for(const n of names){
    const parts=[];
    for(const [i,rel] of PROJECTS[n].entries()){
      const p=await b.newPage({viewport:{width:1280,height:900}});
      const [relPath,query]=rel.split('?');
      await p.goto('file://'+path.join(ROOT,relPath)+(query?'?'+query:''),{waitUntil:'networkidle'});
      await prepare(p);
      const out=path.join(__dirname,'out','parts',`${n}-${i+1}.pdf`);
      await p.pdf({path:out,format:'Letter',scale:0.64,printBackground:true,margin:{top:'0.35in',bottom:'0.35in',left:'0',right:'0'}});
      // The page colour fills the top and bottom margins: a matching one-page PDF goes behind each page (see merge.py).
      const bg=await p.evaluate(()=>getComputedStyle(document.body).backgroundColor);
      const q=await b.newPage();
      await q.setContent('<style>@page{margin:0}html,body{margin:0;height:100%;background:'+bg+'}</style><body></body>');
      await q.pdf({path:out.replace(/\.pdf$/,'.bg.pdf'),format:'Letter',printBackground:true,margin:{top:0,bottom:0,left:0,right:0}});
      await q.close();
      parts.push(out);await p.close();
    }
    console.log(n,'parts:',parts.map(x=>path.basename(x)).join(', '));
  }
  await b.close();
})();
