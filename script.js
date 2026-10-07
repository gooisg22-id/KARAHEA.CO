const cursor=document.getElementById('cursor'),ring=document.getElementById('cursor-ring');
window.addEventListener('mousemove',e=>{cursor.style.left=e.clientX+'px';cursor.style.top=e.clientY+'px';ring.style.left=e.clientX+'px';ring.style.top=e.clientY+'px'});
document.querySelectorAll('a,button').forEach(el=>{el.addEventListener('mouseenter',()=>{ring.style.width='54px';ring.style.height='54px'});el.addEventListener('mouseleave',()=>{ring.style.width='34px';ring.style.height='34px'})});
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(e=>io.observe(e));
document.querySelectorAll('.thumb').forEach(btn=>btn.addEventListener('click',()=>{document.querySelectorAll('.thumb').forEach(x=>x.classList.remove('active'));btn.classList.add('active');document.getElementById('mainImage').src=btn.dataset.image}));
const menu=document.querySelector('.menu'),nav=document.querySelector('.nav nav');
menu?.addEventListener('click',()=>nav.classList.toggle('mobile-open'));

const sizeForm=document.getElementById('sizeForm');
sizeForm?.addEventListener('submit',e=>{
 e.preventDefault();

 const h=Number(document.getElementById('height').value);
 const w=Number(document.getElementById('weight').value);
 const waist=Number(document.getElementById('waist').value);
 const hip=Number(document.getElementById('hip').value);
 const fit=document.getElementById('fit').value;

 // Height + weight are enough to get a starting recommendation.
 // Waist + hip are optional and only improve the recommendation when entered.
 if(!h || !w)return;

 const sizes=[
  {s:'S',waist:[68,76],hip:[94,102],h:[155,170],weight:[45,62]},
  {s:'M',waist:[76,84],hip:[102,110],h:[165,178],weight:[58,72]},
  {s:'L',waist:[84,92],hip:[110,118],h:[170,185],weight:[68,84]},
  {s:'XL',waist:[92,100],hip:[118,126],h:[175,195],weight:[80,100]},
  {s:'XXL',waist:[100,110],hip:[126,136],h:[180,205],weight:[96,125]}
 ];

 const mid=a=>(a[0]+a[1])/2;

 // Base score uses only height + weight, so the form works even when
 // the optional waist/hip fields are completely empty.
 let score=sizes.map(x=>{
   let d=Math.abs(h-mid(x.h))*0.65 + Math.abs(w-mid(x.weight))*1.35;
   if(waist) d+=Math.abs(waist-mid(x.waist))*1.6;
   if(hip) d+=Math.abs(hip-mid(x.hip))*1.0;
   return {x,d};
 }).sort((a,b)=>a.d-b.d);

 let idx=sizes.findIndex(x=>x.s===score[0].x.s);

 // Baggy preference intentionally moves the recommendation up.
 if(fit==='baggy') idx=Math.min(idx+1,sizes.length-1);
 if(fit==='extreme') idx=Math.min(idx+2,sizes.length-1);

 const pick=sizes[idx];
 const result=document.getElementById('sizeResult');
 const precision=waist||hip
   ? 'Based on your height, weight and optional measurements.'
   : 'Based on height + weight. Add waist/hip only if you want a more precise result.';

 result.innerHTML='<span>YOUR KARAHEA SIZE</span><strong>'+pick.s+'</strong><p>'+pick.waist[0]+'–'+pick.waist[1]+' cm waist / '+pick.hip[0]+'–'+pick.hip[1]+' cm hip / '+fit.toUpperCase()+' FIT</p><small>'+precision+'</small>';

 if(fitModel){
   fitModel.dataset.size=pick.s;
   document.querySelectorAll('[data-fit-size]').forEach(x=>{
     x.classList.toggle('active',x.dataset.fitSize===pick.s || (pick.s==='XXL'&&x.dataset.fitSize==='XL'));
   });
 }

 if(fitCaption) fitCaption.textContent=pick.s+' / '+fit.toUpperCase()+' — recommended starting point';
 result.scrollIntoView({behavior:'smooth',block:'center'});
});

const fitModel=document.querySelector('.fit-model');
const fitCaption=document.getElementById('fitCaption');
document.querySelectorAll('[data-fit-size]').forEach(btn=>btn.addEventListener('click',()=>{
 document.querySelectorAll('[data-fit-size]').forEach(x=>x.classList.remove('active'));btn.classList.add('active');
 const s=btn.dataset.fitSize; fitModel.dataset.size=s;
 fitCaption.textContent=s+' / '+document.getElementById('fit').value.toUpperCase()+' — '+(s==='M'?'cleaner, less oversized':s==='L'?'balanced oversized silhouette':'maximum oversized volume');
}));
