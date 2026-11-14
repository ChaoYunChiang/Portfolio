/* Minimal equirectangular 360 viewer (WebGL, no library). Usage: <div class="pano" data-scenes='[{"label":"..","src":".."}]'> */
(function(){
  document.querySelectorAll('.pano').forEach(function(root){
    var scenes=JSON.parse(root.getAttribute('data-scenes')||'[]');
    var stage=root.querySelector('.pano-stage'),tabs=root.querySelector('.pano-tabs');
    var canvas=document.createElement('canvas');canvas.tabIndex=0;
    canvas.setAttribute('aria-label','Interactive 360 degree panorama. Drag or use arrow keys to look around.');
    var hint=document.createElement('div');hint.className='pano-hint';hint.textContent='Drag to look around';
    stage.appendChild(canvas);stage.appendChild(hint);
    var cur=0,yaw=0,pitch=0,fov=1.55,dirty=true,imgs=[];
    var gl=canvas.getContext('webgl')||canvas.getContext('experimental-webgl');
    function mark(){Array.prototype.forEach.call(tabs.children,function(b,i){b.setAttribute('aria-pressed',i===cur?'true':'false')})}
    function load(i,cb){if(imgs[i]){cb(imgs[i]);return}var im=new Image();im.onload=function(){imgs[i]=im;cb(im)};im.src=scenes[i].src}
    scenes.forEach(function(s,i){var b=document.createElement('button');b.type='button';b.textContent=s.label;b.addEventListener('click',function(){show(i)});tabs.appendChild(b)});
    if(!gl){
      stage.innerHTML='<div class="pano-flat"><img alt=""></div>';var fi=stage.querySelector('img');
      var showFlat=function(i){cur=i;fi.src=scenes[i].src;fi.alt=scenes[i].label;mark()};
      Array.prototype.forEach.call(tabs.children,function(b,i){b.onclick=function(){showFlat(i)}});showFlat(0);return;
    }
    function sh(t,src){var s=gl.createShader(t);gl.shaderSource(s,src);gl.compileShader(s);return s}
    var vs='attribute vec2 p;varying vec2 v;void main(){v=p;gl_Position=vec4(p,0.0,1.0);}';
    var fs='precision mediump float;varying vec2 v;uniform sampler2D t;uniform vec2 res;uniform float yaw,pitch,fov;'+
    'void main(){float f=tan(fov*0.5);vec3 d=normalize(vec3(v.x*res.x/res.y*f,v.y*f,-1.0));'+
    'float cp=cos(pitch),sp=sin(pitch);d=vec3(d.x,d.y*cp-d.z*sp,d.y*sp+d.z*cp);'+
    'float cy=cos(yaw),sy=sin(yaw);d=vec3(d.x*cy+d.z*sy,d.y,-d.x*sy+d.z*cy);'+
    'float lon=atan(d.x,-d.z);float lat=asin(clamp(d.y,-1.0,1.0));'+
    'gl_FragColor=texture2D(t,vec2(lon/6.2831853+0.5,0.5-lat/3.14159265));}';
    var pr=gl.createProgram();gl.attachShader(pr,sh(gl.VERTEX_SHADER,vs));gl.attachShader(pr,sh(gl.FRAGMENT_SHADER,fs));gl.linkProgram(pr);gl.useProgram(pr);
    gl.bindBuffer(gl.ARRAY_BUFFER,gl.createBuffer());gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,1,1]),gl.STATIC_DRAW);
    var loc=gl.getAttribLocation(pr,'p');gl.enableVertexAttribArray(loc);gl.vertexAttribPointer(loc,2,gl.FLOAT,false,0,0);
    var U={res:gl.getUniformLocation(pr,'res'),yaw:gl.getUniformLocation(pr,'yaw'),pitch:gl.getUniformLocation(pr,'pitch'),fov:gl.getUniformLocation(pr,'fov')};
    var tex=gl.createTexture();
    function size(){var d=Math.min(window.devicePixelRatio||1,2);canvas.width=Math.round(stage.clientWidth*d);canvas.height=Math.round(stage.clientHeight*d);gl.viewport(0,0,canvas.width,canvas.height);dirty=true}
    function draw(){dirty=false;gl.uniform2f(U.res,canvas.width,canvas.height);gl.uniform1f(U.yaw,yaw);gl.uniform1f(U.pitch,pitch);gl.uniform1f(U.fov,fov);gl.drawArrays(gl.TRIANGLE_STRIP,0,4)}
    (function loop(){if(dirty)draw();requestAnimationFrame(loop)})();
    function show(i){load(i,function(im){cur=i;mark();gl.bindTexture(gl.TEXTURE_2D,tex);gl.texImage2D(gl.TEXTURE_2D,0,gl.RGB,gl.RGB,gl.UNSIGNED_BYTE,im);
      gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.LINEAR);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE);yaw=0;pitch=0;dirty=true})}
    var drag=null;
    function clamp(){if(pitch>1.4)pitch=1.4;if(pitch<-1.4)pitch=-1.4;dirty=true}
    canvas.addEventListener('pointerdown',function(e){drag={x:e.clientX,y:e.clientY};canvas.setPointerCapture(e.pointerId);hint.hidden=true});
    canvas.addEventListener('pointermove',function(e){if(!drag)return;var k=fov/canvas.clientHeight;yaw+=(e.clientX-drag.x)*k;pitch+=(e.clientY-drag.y)*k;drag={x:e.clientX,y:e.clientY};clamp()});
    var end=function(){drag=null};canvas.addEventListener('pointerup',end);canvas.addEventListener('pointercancel',end);
    canvas.addEventListener('keydown',function(e){var s=.12,h=true;
      if(e.key==='ArrowLeft')yaw-=s;else if(e.key==='ArrowRight')yaw+=s;else if(e.key==='ArrowUp')pitch+=s;else if(e.key==='ArrowDown')pitch-=s;else h=false;
      if(h){e.preventDefault();hint.hidden=true;clamp()}});
    window.addEventListener('resize',size);size();show(0);
  });
})();
