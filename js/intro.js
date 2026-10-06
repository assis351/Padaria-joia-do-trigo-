(()=>{const I=document.getElementById("intro");if(!I)return;
const B=document.body;
if(matchMedia("(prefers-reduced-motion: reduce)").matches){I.remove();B.classList.remove("intro-on");return}
if("scrollRestoration"in history)history.scrollRestoration="manual";scrollTo(0,0);
let done=false,raf=0;const T=[];
function end(){if(done)return;done=true;T.forEach(clearTimeout);cancelAnimationFrame(raf);I.classList.add("out");setTimeout(()=>{I.remove();B.classList.remove("intro-on")},650)}
document.getElementById("skip").onclick=end;
addEventListener("keydown",e=>{if(e.key==="Escape")end()});
const cv=I.querySelector("canvas"),c=cv.getContext("2d"),L=I.querySelector(".logo"),bread=I.querySelector(".bread svg"),cup=I.querySelector(".cup");
let W,H;function size(){const D=Math.min(devicePixelRatio||1,1.5);W=innerWidth;H=innerHeight;cv.width=W*D;cv.height=H*D;c.setTransform(D,0,0,D,0,0)}
size();addEventListener("resize",size);
const spr=document.createElement("canvas");spr.width=spr.height=64;
{const g=spr.getContext("2d"),r=g.createRadialGradient(32,32,0,32,32,32);r.addColorStop(0,"rgba(255,255,255,1)");r.addColorStop(.4,"rgba(255,255,255,.45)");r.addColorStop(1,"rgba(255,255,255,0)");g.fillStyle=r;g.fillRect(0,0,64,64)}
const rnd=(a,b)=>a+Math.random()*(b-a),P=[],F=[];
for(let i=0;i<46;i++)F.push({x:Math.random(),y:Math.random(),r:rnd(.8,2.4),s:rnd(.01,.04),p:rnd(0,6.28)});
let conv=false,eb=0,ec=0,t0=0,last=0;
function target(p){const a=rnd(0,6.28),r=L.offsetWidth*.46*Math.sqrt(Math.random());p.tx=W/2+Math.cos(a)*r;p.ty=H/2+Math.sin(a)*r;p.cv=true;p.m=p.l+rnd(1.8,2.8)}
function emit(x,y){if(P.length>170)return;const p={x:x+rnd(-8,8),y,vx:rnd(-6,6),vy:-rnd(22,48),m:rnd(2.6,4),l:0,s:rnd(10,18),ph:rnd(0,6.28),cv:false};if(conv)target(p);P.push(p)}
function onscreen(r){return r.right>-40&&r.left<W+40}
function frame(now){raf=requestAnimationFrame(frame);const dt=Math.min((now-last)/1000,.05);last=now;const t=(now-t0)/1000;c.clearRect(0,0,W,H);
 if(t>1.5&&t<10.2){eb+=dt;if(eb>.05){eb=0;const r=bread.getBoundingClientRect();if(onscreen(r))emit(r.left+r.width*.5,r.top+r.height*.2)}}
 if(t>3&&t<10.2){ec+=dt;if(ec>.06){ec=0;const r=cup.getBoundingClientRect();if(onscreen(r))emit(r.left+r.width*.5,r.top+r.height*.3)}}
 if(t>=8&&!conv){conv=true;P.forEach(target)}
 for(let i=P.length-1;i>=0;i--){const p=P[i];p.l+=dt;const k=p.l/p.m;if(k>=1){P.splice(i,1);continue}
  if(p.cv){p.x+=(p.tx-p.x)*dt*1.5+Math.sin(p.l*3+p.ph)*20*dt;p.y+=(p.ty-p.y)*dt*1.5}
  else{p.x+=(p.vx+Math.sin(p.l*1.7+p.ph)*14)*dt;p.y+=p.vy*dt;p.s+=dt*16}
  c.globalAlpha=Math.min(1,p.l*2)*(1-k)*(p.cv?.34:.2);c.drawImage(spr,p.x-p.s,p.y-p.s,p.s*2,p.s*2)}
 if(t>3.2&&t<10){const fa=Math.min(1,t-3.2)*Math.min(1,10-t);c.fillStyle="#fff6e0";
  for(const f of F){const y=(((f.y-t*f.s)%1)+1)%1*H;c.globalAlpha=.4*fa*(.5+.5*Math.sin(t*2+f.p));c.beginPath();c.arc(f.x*W+Math.sin(t+f.p)*12,y,f.r,0,6.283);c.fill()}}
 c.globalAlpha=1}
function fly(){const h=document.querySelector(".hero img.logo");if(!h)return;const r=h.getBoundingClientRect(),s=r.width/L.offsetWidth;
 L.classList.add("fly");L.style.transform=`translate(calc(-50% + ${r.left+r.width/2-innerWidth/2}px),calc(-50% + ${r.top+r.height/2-innerHeight/2}px)) scale(${s})`}
requestAnimationFrame(()=>requestAnimationFrame(t=>{t0=last=t;I.classList.add("go");raf=requestAnimationFrame(frame)}));
T.push(setTimeout(()=>I.classList.add("s3"),8000),setTimeout(()=>I.classList.add("s4"),11000),setTimeout(fly,12400),setTimeout(end,14400));
})();
