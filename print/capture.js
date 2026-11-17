// Turns the real web pages into PDFs on standard Letter pages, keeping the site's own design.
// Things a PDF cannot play (video, the 360 viewer, the Design switcher) are replaced by still images.
// Usage: node print/capture.js spring-breeze   (writes print/out/spring-breeze.pdf)
const {chromium}=require('playwright');
const path=require('path');const fs=require('fs');
const ROOT=path.resolve(__dirname,'..');
const PROJECTS={
  'spring-breeze':['projects/spring-breeze-game.html','projects/spring-breeze-design.html'],
};
const FRAMES={ // video file name -> still frames in print/frames
  'spring-breeze-gameplay.mp4':['sb_3.jpg','sb_10.jpg','sb_26.jpg','sb_34.jpg','sb_42.jpg','sb_50.jpg'],
};
const PRINT_CSS=`
@media print{
  html,body{-webkit-print-color-adjust:exact;print-color-adjust:exact}
  .home-nav,.crumb,.vw-top,.site-foot{display:none!important}
  figure,table,.tbl-wrap,.lanes,.shot,.film,.mk,.dsg-panel,.pf-frames,.pf-pano figure,.chr,.cols>div,.ver>div,.p-img{break-inside:avoid;page-break-inside:avoid}
  h1,h2,h3,h4{break-after:avoid;page-break-after:avoid}
  .pf-frames{display:grid;grid-template-columns:repeat(3,1fr);gap:12px}
  .pf-frames img{display:block;width:100%;height:auto}
  .pf-cap{font-size:13px;margin:6px 0 0;opacity:.85}
  .pf-pano{display:grid;gap:14px}
  .pf-pano img{display:block;width:100%;height:auto}
}`;
async function prepare(p){
  await p.emulateMedia({media:'print'});
  await p.addStyleTag({content:PRINT_CSS});
  await p.evaluate(({frames,root})=>{
    document.querySelectorAll('img[loading="lazy"]').forEach(i=>{i.loading='eager'});
    document.querySelectorAll('video').forEach(v=>{
      const name=(v.getAttribute('src')||(v.querySelector('source')||{}).src||'').split('/').pop();
      const list=frames[name];
      if(list){
        const box=document.createElement('div');box.className='pf-frames';
        list.forEach(f=>{const im=document.createElement('img');im.src='file://'+root+'/print/frames/'+f;im.alt='';box.appendChild(im)});
        v.replaceWith(box);
      }else{v.style.display='none'}
    });
  },{frames:FRAMES,root:ROOT});
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
      await p.goto('file://'+path.join(ROOT,rel),{waitUntil:'networkidle'});
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
