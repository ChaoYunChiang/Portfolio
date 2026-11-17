// Builds PDFs from the print/*.html pages.
// Usage: node print/build.js spring-breeze-full
// A name ending in -full makes one tall page, 1280 px wide, as long as the content.
// Any other name makes a single 16:9 slide.
const {chromium}=require('playwright');const path=require('path');const fs=require('fs');
(async()=>{
  const names=process.argv.slice(2);
  if(!names.length){console.error('Give at least one page name, for example spring-breeze-full');process.exit(1)}
  fs.mkdirSync(path.join(__dirname,'out'),{recursive:true});
  const b=await chromium.launch();
  for(const n of names){
    const p=await b.newPage({viewport:{width:1280,height:720}});
    await p.goto('file://'+path.join(__dirname,n+'.html'),{waitUntil:'networkidle'});
    await p.evaluate(()=>document.fonts.ready);
    const out=path.join(__dirname,'out',n);
    if(/-full$/.test(n)){
      const h=(await p.evaluate(()=>Math.ceil(document.documentElement.scrollHeight)))+8;
      await p.addStyleTag({content:'@page{size:1280px '+h+'px;margin:0}'});
      await p.pdf({path:out+'.pdf',width:'1280px',height:h+'px',printBackground:true,preferCSSPageSize:true});
      await p.screenshot({path:out+'.png',fullPage:true});
      console.log('built',n,'height',h);
    }else{
      await p.pdf({path:out+'.pdf',width:'13.333in',height:'7.5in',printBackground:true,preferCSSPageSize:true});
      await p.screenshot({path:out+'.png'});
      console.log('built',n);
    }
    await p.close();
  }
  await b.close();
})();
