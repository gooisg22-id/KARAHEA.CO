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
 if(!h || !w)return;

 const sizes=[
  {s:'S',waist:[68,76],hip:[94,102],h:[155,170],weight:[45,62]},
  {s:'M',waist:[76,84],hip:[102,110],h:[165,178],weight:[58,72]},
  {s:'L',waist:[84,92],hip:[110,118],h:[170,185],weight:[68,84]},
  {s:'XL',waist:[92,100],hip:[118,126],h:[175,195],weight:[80,100]}
 ];
 const mid=a=>(a[0]+a[1])/2;
 const score=sizes.map(x=>{
   let d=Math.abs(h-mid(x.h))*0.65 + Math.abs(w-mid(x.weight))*1.35;
   if(waist)d+=Math.abs(waist-mid(x.waist))*1.6;
   if(hip)d+=Math.abs(hip-mid(x.hip));
   return {x,d};
 }).sort((a,b)=>a.d-b.d);
 const pick=score[0].x;
 const result=document.getElementById('sizeResult');
 const precision=waist||hip
   ? 'Based on your height, weight and optional measurements.'
   : 'Based on height + weight. Waist and hip are optional.';
 result.innerHTML='<span>YOUR KARAHEA SIZE</span><strong>'+pick.s+'</strong><p>'+pick.waist[0]+'–'+pick.waist[1]+' cm waist / '+pick.hip[0]+'–'+pick.hip[1]+' cm hip / BAGGY FIT</p><small>'+precision+'</small>';
 result.scrollIntoView({behavior:'smooth',block:'center'});
});
/* KARAHEA size guide interactions */
const guideTabs=document.querySelectorAll('[data-guide-tab]');
const guidePanels=document.querySelectorAll('[data-guide-panel]');
guideTabs.forEach(tab=>tab.addEventListener('click',()=>{
  guideTabs.forEach(x=>x.classList.remove('active'));
  guidePanels.forEach(x=>x.classList.remove('active'));
  tab.classList.add('active');
  document.querySelector('[data-guide-panel="'+tab.dataset.guideTab+'"]')?.classList.add('active');
}));

const unitButtons=document.querySelectorAll('[data-unit]');
unitButtons.forEach(btn=>btn.addEventListener('click',()=>{
  unitButtons.forEach(x=>x.classList.remove('active'));
  btn.classList.add('active');
  const unit=btn.dataset.unit;
  document.querySelectorAll('[data-cm]').forEach(cell=>{
    cell.textContent=cell.dataset[unit];
  });
  document.querySelectorAll('.guide-title>span').forEach(x=>{
    if(x.textContent.includes('ALL DIMENSIONS')) x.textContent=unit==='cm'?'ALL DIMENSIONS IN CM':'ALL DIMENSIONS IN INCH';
  });
}));

document.querySelectorAll('[data-size-row]').forEach(row=>row.addEventListener('click',()=>{
  document.querySelectorAll('[data-size-row]').forEach(x=>x.classList.remove('selected'));
  row.classList.add('selected');
}));


/* Multilingual UI: English / Japanese / Indonesian */
const KARAHEA_LANG={"en":{".hero .eyebrow":"KARAHEA / EST. 2026 / JAPAN",".hero h1":"BUILT FOR|THE EDGE.",".hero .intro":"Technical snow outerwear. Raw graphics. Street-built silhouettes.",".hero .button":"EXPLORE COLLECTION ↓",".manifesto p":"SNOW / STREET / OUTERWEAR",".product-head span":"COMING SOON",".product-info h2":"BAGGY CARGO|SNOWPANTS",".product-info .price":"¥ — COMING SOON",".product-info .desc":"Oversized snow-ready cargo silhouette designed for deep snow, resort laps and the street. Adjustable at the waist and hem with a functional pocket system.",".product-info .button.full":"FIND MY SIZE","#lookbook h2":"RAW.|WEIRD.|ALIVE.","#lookbook .lookbook-copy>p:last-child":"KARAHEA mixes technical construction with hand-drawn underground graphics. Built for riders who don’t want to look like everyone else.","#about h2":"DESIGNED FOR|THE MOUNTAINS.|BUILT FOR|THE STREETS.",".about-text":"KARAHEA is an independent clothing concept built around snowboard culture, technical outerwear and a raw visual identity.","#shop h2":"DROP|001.",".shop-card h3":"CARGO BAGGY SNOWPANTS",".shop-card span":"COMING SOON",".shop-card .button":"NOTIFY ME","#contact h2":"LET’S BUILD|SOMETHING."},"ja":{".hero .eyebrow":"KARAHEA / 2026 / JAPAN",".hero h1":"限界のために|つくられた。",".hero .intro":"テクニカルスノーウェア。生々しいグラフィック。ストリートのシルエット。",".hero .button":"コレクションを見る ↓",".manifesto p":"SNOW / STREET / OUTERWEAR",".product-head span":"近日発売",".product-info h2":"バギーカーゴ|スノーパンツ",".product-info .price":"¥ — 近日発売",".product-info .desc":"深雪、ゲレンデ、ストリートに対応するオーバーサイズのカーゴシルエット。ウエストと裾を調整できる機能的なポケットシステム。",".product-info .button.full":"サイズを探す","#lookbook h2":"RAW.|WEIRD.|ALIVE.","#lookbook .lookbook-copy>p:last-child":"テクニカルな構造と手描きのアンダーグラウンドグラフィックを融合。誰とも同じになりたくないライダーのために。","#about h2":"山のために|デザインし、|ストリートのために|つくる。",".about-text":"KARAHEAは、スノーボードカルチャー、テクニカルアウターウェア、荒々しいビジュアルを軸にした独立系クロージングコンセプトです。","#shop h2":"DROP|001.",".shop-card h3":"カーゴ バギー スノーパンツ",".shop-card span":"近日発売",".shop-card .button":"通知を受け取る","#contact h2":"何かを|つくろう。"},"id":{".hero .eyebrow":"KARAHEA / EST. 2026 / JEPANG",".hero h1":"DIBUAT UNTUK|BATAS.",".hero .intro":"Snowwear teknis. Grafis mentah. Siluet bergaya street.",".hero .button":"LIHAT KOLEKSI ↓",".manifesto p":"SALJU / STREET / OUTERWEAR",".product-head span":"SEGERA HADIR",".product-info h2":"BAGGY CARGO|SNOWPANTS",".product-info .price":"¥ — SEGERA HADIR",".product-info .desc":"Siluet cargo oversized untuk salju tebal, lintasan resort, dan street. Dilengkapi pengaturan pinggang dan ujung kaki serta sistem saku fungsional.",".product-info .button.full":"CARI UKURAN SAYA","#lookbook h2":"RAW.|WEIRD.|ALIVE.","#lookbook .lookbook-copy>p:last-child":"KARAHEA memadukan konstruksi teknis dengan grafis underground bergaya hand-drawn. Dibuat untuk rider yang tidak ingin terlihat seperti semua orang.","#about h2":"DIDESAIN UNTUK|PEGUNUNGAN.|DIBUAT UNTUK|JALANAN.",".about-text":"KARAHEA adalah konsep clothing independen yang berangkat dari kultur snowboard, technical outerwear, dan identitas visual yang raw.","#shop h2":"DROP|001.",".shop-card h3":"CARGO BAGGY SNOWPANTS",".shop-card span":"SEGERA HADIR",".shop-card .button":"BERI TAHU SAYA","#contact h2":"MARI BUAT|SESUATU."}};
const KARAHEA_NAV={en:['Collection','Product','Lookbook','About','Contact','Shop'],ja:['コレクション','プロダクト','ルックブック','アバウト','コンタクト','ショップ'],id:['Koleksi','Produk','Lookbook','Tentang','Kontak','Toko']};
function setKaraheaLanguage(lang){const d=KARAHEA_LANG[lang]||KARAHEA_LANG.en;Object.entries(d).forEach(([s,v])=>{const e=document.querySelector(s);if(e)e.innerHTML=v.replaceAll('|','<br>')});document.querySelectorAll('[data-i18n]').forEach((e,i)=>{const k=e.dataset.i18n.split('.')[1];const m={collection:0,product:1,lookbook:2,about:3,contact:4,shop:5};if(m[k]!==undefined)e.textContent=KARAHEA_NAV[lang][m[k]]});document.querySelectorAll('.lang-btn').forEach(b=>b.classList.toggle('active',b.dataset.lang===lang));document.documentElement.lang=lang==='ja'?'ja':lang==='id'?'id':'en';localStorage.setItem('karahea-lang',lang)}
document.querySelectorAll('.lang-btn').forEach(b=>b.addEventListener('click',()=>setKaraheaLanguage(b.dataset.lang)));setKaraheaLanguage(localStorage.getItem('karahea-lang')||'en');
