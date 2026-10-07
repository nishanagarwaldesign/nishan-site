const IMG={
 "who": "/assets/img/who.webp",
 "studio": "/assets/img/studio.webp",
 "past": "/assets/img/past.webp",
 "now": "/assets/img/now.webp",
 "taste": "/assets/img/taste.webp",
 "portrait": "/assets/img/portrait.webp",
 "cat": "/assets/img/cat.webp"
};
const $=s=>document.querySelector(s);
document.querySelectorAll('[data-img]').forEach(e=>e.style.backgroundImage=`url(${IMG[e.dataset.img]})`);
document.querySelectorAll('[data-img-bg]').forEach(e=>e.style.backgroundImage=`url(${IMG[e.dataset.imgBg]})`);
(()=>{const c=document.createElement('canvas');c.width=c.height=160;const x=c.getContext('2d'),d=x.createImageData(160,160);
for(let i=0;i<d.data.length;i+=4){const v=160+Math.random()*95;d.data[i]=d.data[i+1]=d.data[i+2]=v;d.data[i+3]=255}x.putImageData(d,0,0);document.body.style.setProperty('--grain',`url(${c.toDataURL()})`)})();
const T=$('#toast');let tt;function toast(m){T.textContent=m;T.classList.add('show');clearTimeout(tt);tt=setTimeout(()=>T.classList.remove('show'),2600)}

/* hero seam */
const hero=$('#hero'),seam=$('#seam');
function setSplit(p){p=Math.max(20,Math.min(70,p));hero.style.setProperty('--split',p+'%');seam.setAttribute('aria-valuenow',Math.round(p))}
seam.addEventListener('pointerdown',e=>{seam.setPointerCapture(e.pointerId);const mv=ev=>{const r=hero.getBoundingClientRect();setSplit((ev.clientX-r.left)/r.width*100)};
 seam.addEventListener('pointermove',mv);seam.addEventListener('pointerup',()=>seam.removeEventListener('pointermove',mv),{once:true});$('.hint').style.display='none'});
seam.addEventListener('keydown',e=>{const v=+seam.getAttribute('aria-valuenow');if(e.key==='ArrowLeft')setSplit(v-3);if(e.key==='ArrowRight')setSplit(v+3)});

/* ticker */
const Q=[['siddharth vij · bricx','“delivers on time, every time”'],['reshav pandey · fluid studio','“pixel-perfect and incredibly quick”'],['rajat moury · apnisec','“built our entire user experience from scratch”'],['brijraj rana · stealth.design','“high-quality work even under tight deadlines”'],['kshitij pandey · pawaac drones','“a thinker who knows how to move people”']];
const qh=Q.map(([a,b])=>`<div class="q"><b>${a}</b><span>${b}</span></div>`).join('');$('#track').innerHTML=qh+qh;

/* chapters */
const CH=[
 {t:'How I ended up building websites',s:'An architecture student’s side quest',img:'portrait',b:'<p>I’m Nishan, 23, in my fifth year of B.Arch at IIT BHU. Somewhere between studio crits and site visits I opened Figma, then Webflow, and never really closed them.</p><p>Three years later the side quest pays for itself and then some.</p>'},
 {t:'The architecture side',s:'Systems, circulation, light',img:'who',b:'<p>Architecture taught me to think in systems: how people move through a space, what holds it up, where the light lands.</p><p>Websites are the same problem with a faster build cycle. This semester it’s a convention centre expansion in Sigra and picking a thesis for AR 559.</p>'},
 {t:'Everytime Studio',s:'Small studio, short list, no handoff drama',img:'studio',b:'<p>A white-label Webflow and Framer studio for design agencies and teams who would rather not touch the code. 60+ sites for 20+ companies so far.</p><p>The name is the promise. It ships, every time.</p>'}];
let ci=0;const chP=$('#chP');
function chap(i){ci=(i+3)%3;const c=CH[ci];chP.classList.add('fade');setTimeout(()=>{chP.style.backgroundImage=`url(${IMG[c.img]})`;chP.setAttribute('aria-label',c.t);chP.classList.remove('fade')},180);
 $('#chN').textContent=`chapter ${ci+1} of 3`;$('#chT').textContent=c.t;$('#chS').textContent=c.s;$('#chB').innerHTML=c.b;
 document.querySelectorAll('#chDots i').forEach((d,k)=>d.classList.toggle('on',k===ci));$('#chNext').textContent=ci===2?'back to chapter 1 →':'next chapter →'}
document.querySelectorAll('[data-d]').forEach(b=>b.addEventListener('click',()=>chap(ci+ +b.dataset.d)));chap(0);

/* journey board */
const J=[
 {img:'who',lbl:'2022 · b.arch begins',nt:'five years. what was i thinking',ntp:'right:-150px;top:72%',d:[7,2,-4],m:[3,1,-4]},
 {img:'studio',lbl:'2023 · first webflow site',nt:'it had a marquee. sorry.',ntp:'right:-150px;top:62%',d:[37,12,3],m:[50,13,4]},
 {img:'past',wide:1,lbl:'founding designer, apnisec',nt:'hello? product ux speaking',ntp:'left:10%;top:-50px',d:[68,3,-2],m:[2,29,-3]},
 {img:'taste',lbl:'everytime studio is born',nt:'named after a promise',ntp:'left:6px;top:103%',d:[69,46,5],m:[50,44,5]},
 {img:'now',lbl:'60+ sites, 20+ companies',nt:'and a chicago client came back for more',ntp:'left:-170px;top:58%',d:[38,52,-6],m:[3,60,-5]},
 {img:'cat',lbl:'now · sem ix + a thesis',nt:'the studio cat has notes',ntp:'left:6px;top:103%',d:[5,50,4],m:[50,77,3]}];
const board=$('#board'),strP=$('#strP');
const pols=J.map(j=>{const e=document.createElement('div');e.className='pol'+(j.wide?' wide':'');
 e.innerHTML=`<span class="pin" title="drag me"></span><img src="${IMG[j.img]}" alt="${j.lbl}" draggable="false"><span class="lbl">${j.lbl}</span>${j.nt?`<span class="nt" style="${j.ntp}">${j.nt}</span>`:''}`;
 board.appendChild(e);return {e,j,x:0,y:0,r:0}});
const mob=()=>innerWidth<=700;
function layout(){const W=board.clientWidth,H=board.clientHeight;pols.forEach(p=>{const s=mob()?p.j.m:p.j.d;p.x=s[0]/100*W;p.y=s[1]/100*H;p.r=s[2];
 p.x=Math.min(p.x,W-p.e.offsetWidth);place(p)});str()}
function place(p){p.e.style.transform=`translate(${p.x}px,${p.y}px) rotate(${p.r}deg)`}
function str(){const pts=pols.map(p=>[p.x+p.e.offsetWidth/2,p.y+25]);let d=`M${pts[0]}`;for(let i=1;i<pts.length;i++){const [a,b]=pts[i-1],[c,e]=pts[i];d+=` Q${(a+c)/2},${Math.max(b,e)+40} ${c},${e}`}strP.setAttribute('d',d)}
let zz=10;
pols.forEach(p=>{let sx,sy,ox,oy,on=false;
 const down=ev=>{if(ev.pointerType==='touch'&&!ev.target.classList.contains('pin'))return;if(ev.button)return;ev.preventDefault();on=true;p.e.setPointerCapture(ev.pointerId);sx=ev.clientX;sy=ev.clientY;ox=p.x;oy=p.y;p.e.style.zIndex=++zz;p.e.classList.add('drag')};
 p.e.addEventListener('pointerdown',down);
 p.e.addEventListener('pointermove',ev=>{if(!on)return;const W=board.clientWidth-p.e.offsetWidth,H=board.clientHeight-p.e.offsetHeight;p.x=Math.max(0,Math.min(W,ox+ev.clientX-sx));p.y=Math.max(0,Math.min(H,oy+ev.clientY-sy));p.r=(ev.clientX-sx)*.02;place(p);str()});
 const up=()=>{if(!on)return;on=false;p.e.classList.remove('drag');p.r=(Math.random()-.5)*10;place(p);str()};p.e.addEventListener('pointerup',up);p.e.addEventListener('pointercancel',up)});
const ims=[...board.querySelectorAll('img')];Promise.all(ims.map(i=>i.complete?1:new Promise(r=>i.onload=i.onerror=r))).then(layout);
layout();let lw=innerWidth;addEventListener('resize',()=>{if(Math.abs(innerWidth-lw)>30){lw=innerWidth;layout()}});

/* scorecard */
$('#grid12').innerHTML=Array.from({length:72},(_,i)=>`<i class="${i<60?'x':''}"></i>`).join('');

/* punch card */
const holes=$('#holes');holes.innerHTML=Array.from({length:10},(_,i)=>`<button aria-label="Punch ${i+1}">${i<9?'★':'10'}</button>`).join('');
holes.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;b.classList.toggle('on');const n=holes.querySelectorAll('.on').length;
 if(n===10)toast('10th site shipped on time. because, every time.');else if(b.classList.contains('on'))toast(`${n} punched · ${10-n} to go`)});

/* tool cards */
const TOOLS=[
 ['#01','Figma','where it starts','var(--red)','<path d="M20 90 L60 20 L100 90 Z"/><circle cx="60" cy="20" r="8"/><path d="M60 28 V70"/><circle cx="60" cy="74" r="5"/>','every project starts as frames. i design in figma even when the client hands me a figma file, just to understand it.',-4],
 ['#02','Webflow','3 years, 60+ sites','var(--mustard)','<rect x="10" y="20" width="100" height="72" rx="6"/><path d="M10 36 H110"/><circle cx="20" cy="28" r="2"/><circle cx="28" cy="28" r="2"/><path d="M26 54 L40 78 L54 54 L68 78 L82 54"/>','the main event. cms builds, clean class systems, sites a marketing team can actually edit.',3],
 ['#03','Framer','the fast lane','var(--cobalt)','<path d="M30 14 H90 V44 H60 Z"/><path d="M30 44 H60 L90 74 H30 Z"/><path d="M30 74 H60 V104 Z"/>','when it needs to be live by friday and still feel crafted.',-2],
 ['#04','GSAP','motion that eases','var(--red)','<path d="M10 100 H110 M10 100 V10"/><path d="M10 100 C 60 100, 50 14, 110 14"/><circle cx="50" cy="62" r="4"/>','scroll scenes, timelines and easing curves i spend way too long tuning.',5],
 ['#05','Three.js','the third dimension','var(--green)','<path d="M60 12 L104 36 V84 L60 108 L16 84 V36 Z"/><path d="M16 36 L60 60 L104 36 M60 60 V108"/>','for the moments a flat page is not enough. used sparingly, on purpose.',-3],
 ['#06','Lenis','smooth scroll','var(--cobalt)','<rect x="40" y="10" width="40" height="70" rx="20"/><path d="M60 24 V40"/><path d="M20 94 C 40 84, 60 104, 80 94 S 110 90, 116 94"/>','the quiet layer that makes every scroll feel expensive.',4]];
$('#cards').innerHTML=TOOLS.map(([n,name,sub,c,svg,back,r])=>`<button class="tc" style="--c:${c};--r:${r}deg" aria-label="${name}: ${sub}. Tap to flip"><div class="in"><div class="fr"><b>${n}</b><span>${name}</span><small>${sub}</small><svg viewBox="0 0 120 120" aria-hidden="true">${svg}</svg></div><div class="bk"><span class="cap">${n} · ${name}</span><p>${back}</p><div class="rainbow"><i></i><i></i><i></i><i></i><i></i><i></i></div></div></div></button>`).join('');
document.querySelectorAll('.tc').forEach(c=>c.addEventListener('click',()=>c.classList.toggle('flip')));

/* manifesto chips */
document.querySelectorAll('.chip').forEach(c=>c.addEventListener('click',()=>toast(c.dataset.say)));

/* stamps */
const ST=[
 ['Varanasi','iit bhu · 25.32°n<br>sem ix · 2026','var(--red)','<path d="M6 70 H94"/><path d="M14 70 V52 H86 V70"/><path d="M22 52 V40 H78 V52"/><path d="M34 40 V28 H66 V40"/><path d="M50 28 V12"/><path d="M44 16 L50 10 L56 16"/><path d="M10 80 Q 30 76 50 80 T 90 80"/>'],
 ['Thesis','ar 559<br>in progress','var(--sky)','<circle cx="50" cy="16" r="5"/><path d="M50 21 L28 80 M50 21 L72 80"/><path d="M34 62 Q50 72 66 62"/><path d="M22 86 H78"/>'],
 ['8:30 AM','college gym<br>most mornings','var(--mustard)','<path d="M18 46 H82"/><rect x="10" y="30" width="10" height="32" rx="2"/><rect x="80" y="30" width="10" height="32" rx="2"/><rect x="22" y="36" width="8" height="20" rx="2"/><rect x="70" y="36" width="8" height="20" rx="2"/>'],
 ['Open','everytime studio<br>agency builds','#7fb08a','<rect x="10" y="14" width="80" height="58" rx="5"/><path d="M10 26 H90"/><path d="M40 44 L52 74 L56 60 L70 56 Z"/>']];
$('#stamps').innerHTML=ST.map(([b,s,c,svg])=>`<button class="stamp" style="--sc:${c}" aria-label="${b}"><div class="inner"><div class="art"><svg viewBox="0 0 100 90" aria-hidden="true">${svg}</svg></div><div class="row"><b>${b}</b><small>${s}</small></div></div><div class="mark"><svg viewBox="0 0 120 120"><circle cx="60" cy="60" r="44"/><circle cx="60" cy="60" r="36"/><text x="60" y="56" text-anchor="middle">VARANASI</text><text x="60" y="74" text-anchor="middle">OCT 2026</text><path d="M104 40 C 120 46, 140 34, 160 40 M104 60 C 120 66, 140 54, 160 60"/></svg></div></button>`).join('');
document.querySelectorAll('.stamp').forEach(s=>s.addEventListener('click',()=>s.classList.toggle('inked')));

/* stickers drag */
const letter=$('#letter');
document.querySelectorAll('.st').forEach(s=>{let sx,sy,ox,oy,on=false;
 s.addEventListener('pointerdown',e=>{on=true;s.setPointerCapture(e.pointerId);sx=e.clientX;sy=e.clientY;ox=s.offsetLeft;oy=s.offsetTop;['right','bottom'].forEach(k=>s.style.setProperty(k,'auto','important'));s.style.setProperty('left',ox+'px','important');s.style.setProperty('top',oy+'px','important');s.style.zIndex=9});
 s.addEventListener('pointermove',e=>{if(!on)return;const W=letter.clientWidth-s.offsetWidth,H=letter.clientHeight-s.offsetHeight;s.style.setProperty('left',Math.max(0,Math.min(W,ox+e.clientX-sx))+'px','important');s.style.setProperty('top',Math.max(0,Math.min(H,oy+e.clientY-sy))+'px','important')});
 s.addEventListener('pointerup',()=>on=false);s.addEventListener('pointercancel',()=>on=false)});

/* copy */
$('#copy').addEventListener('click',()=>{try{navigator.clipboard.writeText('hello@everytimestudio.com').then(()=>toast('email copied'),()=>toast('select the email and copy it'))}catch(_){toast('select the email and copy it')}});
