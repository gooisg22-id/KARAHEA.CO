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
 const h=Number(document.getElementById('height').value), w=Number(document.getElementById('weight').value);
 const waist=Number(document.getElementById('waist').value), hip=Number(document.getElementById('hip').value);
 const fit=document.getElementById('fit').value;
 if(!h||!w||!waist||!hip)return;
 const sizes=[
  {s:'S',waist:[68,76],hip:[94,102],h:[155,170]},
  {s:'M',waist:[76,84],hip:[102,110],h:[165,178]},
  {s:'L',waist:[84,92],hip:[110,118],h:[170,185]},
  {s:'XL',waist:[92,100],hip:[118,126],h:[175,195]},
  {s:'XXL',waist:[100,110],hip:[126,136],h:[180,205]}
 ];
 let score=sizes.map(x=>{
   let d=Math.abs(waist-(x.waist[0]+x.waist[1])/2)+Math.abs(hip-(x.hip[0]+x.hip[1])/2)*.7+Math.abs(h-(x.h[0]+x.h[1])/2)*.25;
   return {x,d};
 }).sort((a,b)=>a.d-b.d);
 let idx=sizes.findIndex(x=>x.s===score[0].x.s);
 if(fit==='baggy' && idx<sizes.length-1 && waist>=sizes[idx].waist[0]-2) idx++;
 if(fit==='extreme' && idx<sizes.length-1) idx=Math.min(idx+1,sizes.length-1);
 const pick=sizes[idx];
 const result=document.getElementById('sizeResult');
 result.innerHTML='<span>YOUR KARAHEA SIZE</span><strong>'+pick.s+'</strong><p>'+pick.waist[0]+'–'+pick.waist[1]+' cm waist / '+pick.hip[0]+'–'+pick.hip[1]+' cm hip / '+fit.toUpperCase()+' FIT</p>';
 result.scrollIntoView({behavior:'smooth',block:'center'});
});

const fitModel=document.querySelector('.fit-model');
const fitCaption=document.getElementById('fitCaption');
document.querySelectorAll('[data-fit-size]').forEach(btn=>btn.addEventListener('click',()=>{
 document.querySelectorAll('[data-fit-size]').forEach(x=>x.classList.remove('active'));btn.classList.add('active');
 const s=btn.dataset.fitSize; fitModel.dataset.size=s;
 fitCaption.textContent=s+' / '+document.getElementById('fit').value.toUpperCase()+' — '+(s==='M'?'cleaner, less oversized':s==='L'?'balanced oversized silhouette':'maximum oversized volume');
}));
