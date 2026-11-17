// Builds the one-page PDFs from the print/*.html pages.
// Usage: node print/build.js spring-breeze   (writes print/out/spring-breeze.pdf)
const {chromium}=require('playwright');const path=require('path');const fs=require('fs');
(async()=>{
  const names=process.argv.slice(2);
  if(!names.length){console.error('Give at least one page name, for example spring-breeze');process.exit(1)}
  fs.mkdirSync(path.join(__dirname,'out'),{recursive:true});
  const b=await chromium.launch();
  for(const n of names){
    const p=await b.newPage({viewport:{width:1280,height:720}});
    await p.goto('file://'+path.join(__dirname,n+'.html'),{waitUntil:'networkidle'});
    await p.evaluate(()=>document.fonts.ready);
    await p.pdf({path:path.join(__dirname,'out',n+'.pdf'),width:'13.333in',height:'7.5in',printBackground:true,preferCSSPageSize:true});
    await p.screenshot({path:path.join(__dirname,'out',n+'.png')});
    await p.close();console.log('built',n);
  }
  await b.close();
})();
