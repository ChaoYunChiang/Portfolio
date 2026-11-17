/* Keeps a visitor on the same version of the site (default or HCI) while they move between pages.
   The two entry pages declare their version in a meta tag. Other pages follow the stored choice.
   Without JavaScript or storage the links simply lead to the default version. */
(function(){
  var KEY='pf-view',view=null;
  try{
    var m=document.querySelector('meta[name="pf-view"]');
    if(m){view=m.content;sessionStorage.setItem(KEY,view)}
    else{view=sessionStorage.getItem(KEY)}
  }catch(e){var mm=document.querySelector('meta[name="pf-view"]');view=mm?mm.content:null}
  if(view!=='hci')return;
  var map=[[/(^|\/)index\.html$/,'hci.html'],[/(^|\/)projects\.html$/,'projects-hci.html']];
  var links=document.querySelectorAll('a[href]');
  for(var i=0;i<links.length;i++){
    var href=links[i].getAttribute('href'),hash='',q=href.indexOf('#');
    if(q>-1){hash=href.slice(q);href=href.slice(0,q)}
    for(var j=0;j<map.length;j++){
      if(map[j][0].test(href)){links[i].setAttribute('href',href.replace(map[j][0],'$1'+map[j][1])+hash);break}
    }
  }
})();
