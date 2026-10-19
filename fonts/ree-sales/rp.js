(function(){
var root=document.querySelector('.reels [data-rp-root]');if(!root||root.getAttribute('data-rp-on'))return;root.setAttribute('data-rp-on','1');
var mq=window.matchMedia&&window.matchMedia('(prefers-reduced-motion:reduce)'),calm=mq&&mq.matches;
var rp=root.querySelector('[data-rp]'),shell=root.querySelector('.rp-shell'),stage=rp.querySelector('.rp__stage'),
num=rp.querySelector('[data-rp-n]'),xEl=rp.querySelector('.rp__x'),replay=rp.querySelector('.rp__replay'),cur=rp.querySelector('.rp__cur');
var S={reel:rp.querySelector('[data-slot=reel]'),car:rp.querySelector('[data-slot=car]'),story:rp.querySelector('[data-slot=story]')};
var T=[],auto=true,busy=false,started=false;
function fxOn(){[].forEach.call(root.querySelectorAll('.rpfx[data-on]'),function(f){f.classList.remove('is-on');void f.offsetWidth;f.classList.add('is-on');});}
root.addEventListener('rp:fx',fxOn);
if(calm){[].forEach.call(root.querySelectorAll('.rpfx'),function(f){f.classList.add('is-on');});return;}
function later(f,ms){T.push(setTimeout(f,ms));}
function stop(){T.forEach(clearTimeout);T=[];}
function has(k,c){return S[k].classList.contains(c);}
function plus(k){var b=S[k].querySelector('.rp__box'),p=document.createElement('span');p.className='rp__plus';p.textContent='+1 post';
b.appendChild(p);setTimeout(function(){p.remove();},1600);}
function tally(k){var n=0;for(var j in S)if(has(j,'is-done'))n++;
if(k)plus(k);rp.classList.toggle('is-x3',n===3);rp.classList.toggle('is-empty',n===0);if(n===3){replay.hidden=false;hideCur();later(confetti,250);}}
function hideCur(){cur.style.opacity='0';}
function reset(){stop();busy=false;for(var k in S){S[k].classList.remove('is-done','is-building');}
replay.hidden=true;rp.classList.remove('is-x3');rp.classList.add('is-empty');}
function drop(){S.reel.classList.add('is-done');var v=S.reel.querySelector('video');if(v&&v.play){var p=v.play();if(p&&p.catch)p.catch(function(){});}tally('reel');}
function box(el){var a=el.getBoundingClientRect(),b=stage.getBoundingClientRect();return{x:a.left-b.left,y:a.top-b.top,w:a.width,h:a.height};}
function fly(k,done){var f=box(S.reel.querySelector('.rp__box')),t=box(S[k].querySelector('.rp__box'));
var g=document.createElement('div');g.className='rp__ghost';var p=S.reel.querySelector('video');
g.style.backgroundImage='url('+(p&&p.getAttribute('poster')||'')+')';g.style.width=f.w+'px';g.style.height=f.h+'px';stage.appendChild(g);
var fr=[{transform:'translate('+f.x+'px,'+f.y+'px) scale(1)',opacity:.95},
{transform:'translate('+(f.x+(t.x-f.x)*.5)+'px,'+(Math.min(f.y,t.y)-36)+'px) scale(.8)',opacity:1,offset:.5},
{transform:'translate('+(t.x+(t.w-f.w)/2)+'px,'+(t.y+(t.h-f.h)/2)+'px) scale('+Math.min(t.w/f.w,t.h/f.h)+')',opacity:0}];
if(g.animate){var a=g.animate(fr,{duration:540,easing:'cubic-bezier(.65,0,.35,1)'});a.onfinish=function(){g.remove();};setTimeout(done,380);}
else{g.remove();done();}}
function make(k){if(busy||!has('reel','is-done')||has(k,'is-done')||has(k,'is-building'))return;busy=true;
fly(k,function(){S[k].classList.add('is-building');
setTimeout(function(){S[k].classList.remove('is-building');S[k].classList.add('is-done');busy=false;tally(k);if(auto)later(step,1000);},950);});}
function point(btn,cb){var a=btn.getBoundingClientRect(),b=rp.getBoundingClientRect();
if(cur.style.opacity!=='1'){cur.style.transition='none';cur.style.transform='translate('+(b.width*.5)+'px,'+(b.height-30)+'px)';void cur.offsetWidth;cur.style.transition='';cur.style.opacity='1';}
cur.style.transform='translate('+(a.left-b.left+a.width*.6)+'px,'+(a.top-b.top+a.height*.55)+'px)';
later(function(){cur.classList.add('is-click');btn.classList.add('is-press');
later(function(){cur.classList.remove('is-click');btn.classList.remove('is-press');cb();},170);},650);}
function step(){if(!auto)return;if(!has('reel','is-done')){drop();later(step,950);return;}
var k=!has('car','is-done')?'car':(!has('story','is-done')?'story':null);if(!k){hideCur();return;}
point(S[k].querySelector('.rp__make'),function(){make(k);});}
function confetti(){var cv=document.createElement('canvas');cv.className='rp__conf';shell.appendChild(cv);
var R=shell.getBoundingClientRect(),B=rp.querySelector('.ccut__bar').getBoundingClientRect(),dpr=Math.min(window.devicePixelRatio||1,2);
var W=R.width,H=R.height;cv.width=W*dpr;cv.height=H*dpr;var g=cv.getContext('2d');g.scale(dpr,dpr);
var top=B.bottom-R.top,cols=['#e9d29a','#d9b26a','#c4a064','#f3ead0','#ffffff','#bd1b1b'],wts=[5,5,4,4,2,2],bag=[],P=[],N=W<600?46:72;
wts.forEach(function(w,i){for(var j=0;j<w;j++)bag.push(cols[i]);});
for(var i=0;i<N;i++){var c=bag[(Math.random()*bag.length)|0];
P.push({x:W*.06+Math.random()*W*.88,y:top-10-Math.random()*40,vy:18+Math.random()*26,fall:52+Math.random()*44,
sw:10+Math.random()*22,sp:1.2+Math.random()*1.6,ph:Math.random()*6.28,r:Math.random()*6.28,vr:(Math.random()-.5)*2.2,
flip:2.2+Math.random()*3,w:5+Math.random()*4,h:2.4+Math.random()*2.2,c:c,star:Math.random()<.18,born:Math.random()*.5,life:2.6+Math.random()*1.1});}
function ease(t){return t<0?0:t>1?1:t*t*(3-2*t);}
var t0=performance.now(),last=t0,END=4.3;(function f(t){var e=(t-t0)/1000,dt=Math.min((t-last)/1000,.05);last=t;g.clearRect(0,0,W,H);
P.forEach(function(p){var a=e-p.born;if(a<0)return;p.vy+=(p.fall-p.vy)*Math.min(1,dt*1.6);p.y+=p.vy*dt;p.r+=p.vr*dt;
var x=p.x+Math.sin(a*p.sp+p.ph)*p.sw,k=a/p.life,al=ease(k/.12)*(1-ease((k-.6)/.4));if(al<=0)return;
g.save();g.globalAlpha=al;g.translate(x,p.y);g.rotate(p.r+Math.sin(a*p.sp+p.ph)*.5);g.fillStyle=p.c;
if(p.star){var z=3.2+Math.sin(a*6+p.ph)*.8;g.beginPath();g.moveTo(0,-z);g.quadraticCurveTo(z*.15,-z*.15,z,0);g.quadraticCurveTo(z*.15,z*.15,0,z);
g.quadraticCurveTo(-z*.15,z*.15,-z,0);g.quadraticCurveTo(-z*.15,-z*.15,0,-z);g.fill();}
else{var sy=Math.cos(a*p.flip+p.ph);g.fillRect(-p.w/2,-p.h/2*Math.abs(sy),p.w,p.h*Math.max(.15,Math.abs(sy)));}
g.restore();});
if(e<END)requestAnimationFrame(f);else cv.remove();})(t0);}
[].forEach.call(rp.querySelectorAll('.rp__make'),function(btn){btn.addEventListener('click',function(){
auto=false;stop();hideCur();make(btn.getAttribute('data-make'));});});
replay.addEventListener('click',function(){reset();auto=true;later(step,500);});
reset();
function go(){if(started)return;started=true;window.removeEventListener('scroll',near);window.removeEventListener('resize',near);later(step,300);}
function near(){if(started)return;var r=rp.getBoundingClientRect(),vh=window.innerHeight||800;if(r.top<vh*.72&&r.bottom>vh*.2)go();}
if('IntersectionObserver' in window){var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){go();io.disconnect();}});},{threshold:.45});io.observe(rp);}
window.addEventListener('scroll',near,{passive:true});window.addEventListener('resize',near);setTimeout(near,800);
var head=root.querySelector('.rp-head'),hs=false;
function headOn(){if(hs)return;var r=head.getBoundingClientRect(),vh=window.innerHeight||800;if(r.top<vh*.85&&r.bottom>0){hs=true;fxOn();}}
window.addEventListener('scroll',function(){headOn();},{passive:true});setTimeout(function(){headOn();},300);setTimeout(function(){headOn();},1200);
})();