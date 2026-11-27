/* Layered rectangles in the gaps between home sections. Each layer moves at its own speed. */
(function(){
  if(window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  var els=[].slice.call(document.querySelectorAll('.px [data-speed], .deco [data-speed], .flow-layer [data-speed]'));
  if(!els.length)return;
  var ticking=false;
  function update(){
    var vh=window.innerHeight;
    els.forEach(function(el){
      var box=el.parentNode.getBoundingClientRect();
      var mid=box.top+el.offsetTop+el.offsetHeight/2-vh/2;
      var s=parseFloat(el.getAttribute('data-speed'));
      el.style.transform='translate3d(0,'+(-mid*s).toFixed(1)+'px,0)';
    });
    ticking=false;
  }
  window.addEventListener('scroll',function(){if(!ticking){ticking=true;requestAnimationFrame(update)}},{passive:true});
  window.addEventListener('resize',update);
  update();
})();
