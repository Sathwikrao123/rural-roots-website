
// 'use client';
// import { useEffect, useRef, useState } from 'react';
// import Link from 'next/link';
// import { supabase } from '../lib/supabase';
// import { useCart } from '../lib/CartContext';
// import { Leaf, ShieldCheck, Truck, Star, ArrowRight, Phone, Mail, MapPin, ChevronDown, Sparkles, Plus } from 'lucide-react';
// import toast from 'react-hot-toast';

// /* ── Scroll reveal ── */
// function useReveal() {
//   useEffect(() => {
//     const els = document.querySelectorAll('.reveal,.reveal-left,.reveal-right,.reveal-scale');
//     const obs = new IntersectionObserver(entries =>
//       entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
//       { threshold: 0.1 }
//     );
//     els.forEach(el => obs.observe(el));
//     return () => obs.disconnect();
//   }, []);
// }

// /* ── Animated counter ── */
// function Counter({ target, suffix = '', prefix = '' }) {
//   const [count, setCount] = useState(0);
//   const ref = useRef();
//   useEffect(() => {
//     const obs = new IntersectionObserver(([e]) => {
//       if (e.isIntersecting) {
//         if (target === 0) { setCount(0); return; }
//         let start = 0;
//         const step = target / 60;
//         const timer = setInterval(() => {
//           start += step;
//           if (start >= target) { setCount(target); clearInterval(timer); }
//           else setCount(Math.floor(start));
//         }, 20);
//       }
//     }, { threshold: 0.5 });
//     if (ref.current) obs.observe(ref.current);
//     return () => obs.disconnect();
//   }, [target]);
//   return <span ref={ref}>{prefix || count}{suffix}</span>;
// }

// function getImg(cat) {
//   if (cat === 'Honey') return '/honey.png';
//   if (cat === 'Oil')   return '/coconut-oil.png';
//   return '/pepper.png';
// }
// function getBg(cat) {
//   if (cat === 'Honey') return 'radial-gradient(ellipse at 60% 30%, #ffe082, #ffca28 55%, #f9a825)';
//   if (cat === 'Oil')   return 'radial-gradient(ellipse at 60% 30%, #e8f5e9, #c8e6c9 55%, #a5d6a7)';
//   return 'radial-gradient(ellipse at 60% 30%, #efebe9, #d7ccc8 55%, #bcaaa4)';
// }

// /* ── Product card for home ── */
// function HomeCard({ group }) {
//   const { addToCart } = useCart();
//   const [sel, setSel] = useState(0);
//   const [added, setAdded] = useState(false);
//   const item = group.items[sel];

//   function handleAdd() {
//     addToCart(item);
//     setAdded(true);
//     setTimeout(() => setAdded(false), 1400);
//     toast.success(`🛒 ${item.name} added!`, {
//       style: { background: '#1a0f0a', color: '#f5c842', fontWeight: 600 }
//     });
//   }

//   return (
//     <div className="card reveal" style={{ overflow: 'hidden', cursor: 'default' }}>
//       {/* Image */}
//       <div style={{ height: 250, background: getBg(item.category), position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
//         <div style={{ position:'absolute', bottom:-40, left:'50%', transform:'translateX(-50%)', width:210, height:210, borderRadius:'50%', background:'rgba(255,255,255,0.2)', filter:'blur(30px)', pointerEvents:'none' }} />
//         <span style={{ position:'absolute', top:12, left:12, background:'rgba(26,15,10,0.78)', color:'#f5c842', padding:'4px 12px', borderRadius:20, fontSize:10, fontWeight:700, letterSpacing:'0.08em', textTransform:'uppercase', backdropFilter:'blur(6px)' }}>
//           {item.category}
//         </span>
//         <img src={getImg(item.category)} alt={item.name}
//           style={{ width:'66%', height:'92%', objectFit:'contain', objectPosition:'center bottom', transition:'transform 0.45s cubic-bezier(0.34,1.56,0.64,1)', filter:'drop-shadow(0 16px 28px rgba(0,0,0,0.25))', position:'relative', zIndex:2 }}
//           onMouseEnter={e => e.target.style.transform = 'scale(1.12) translateY(-12px) rotate(-2deg)'}
//           onMouseLeave={e => e.target.style.transform = 'scale(1) translateY(0) rotate(0)'}
//         />
//       </div>

//       {/* Info */}
//       <div style={{ padding: '20px 20px 22px' }}>
//         <h3 style={{ fontFamily:'var(--font-playfair)', fontSize:'1.1rem', color:'#1a0f0a', marginBottom:5 }}>{group.name}</h3>
//         <p style={{ fontSize:12.5, color:'#aaa', lineHeight:1.6, marginBottom:14 }}>{item.description?.split('.')[0]}.</p>

//         <p style={{ fontSize:10, fontWeight:700, letterSpacing:'0.12em', color:'#ccc', marginBottom:8 }}>CHOOSE SIZE</p>
//         <div style={{ display:'flex', gap:8, marginBottom:16 }}>
//           {group.items.map((v, i) => {
//             const isSel = i === sel;
//             return (
//               <button key={v.id} onClick={() => setSel(i)} style={{
//                 flex:1, padding:'9px 6px', borderRadius:10,
//                 border: isSel ? '2px solid #d4870a' : '2px solid #ead8b8',
//                 background: isSel ? '#4a3728' : 'white',
//                 cursor:'pointer',
//                 transition:'all 0.25s cubic-bezier(0.34,1.4,0.64,1)',
//                 transform: isSel ? 'scale(1.05)' : 'scale(1)',
//               }}>
//                 <div style={{ fontSize:10, fontWeight:600, color: isSel ? '#f5c842' : '#aaa' }}>{v.name.split('–')[1]?.trim()}</div>
//                 <div style={{ fontSize:14, fontWeight:700, color: isSel ? '#f5c842' : '#d4870a', fontFamily:'var(--font-dm)' }}>₹{v.price}</div>
//               </button>
//             );
//           })}
//         </div>

//         <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
//           <div>
//             <p style={{ fontSize:10, color:'#ccc', marginBottom:1 }}>Price</p>
//             <p style={{ fontSize:'1.4rem', fontWeight:700, color:'#d4870a', fontFamily:'var(--font-dm)', lineHeight:1 }}>₹{item.price}</p>
//           </div>
//           <button onClick={handleAdd} style={{
//             padding:'11px 20px', borderRadius:50, border:'none', cursor:'pointer',
//             background: added ? '#22c55e' : '#4a3728',
//             color: added ? 'white' : '#f5c842',
//             fontWeight:700, fontSize:'0.875rem',
//             transition:'all 0.3s cubic-bezier(0.34,1.56,0.64,1)',
//             transform: added ? 'scale(1.08)' : 'scale(1)',
//             boxShadow: added ? '0 6px 20px rgba(34,197,94,0.4)' : '0 4px 14px rgba(74,55,40,0.3)'
//           }}>
//             {added ? '✓ Added!' : '+ Add to Cart'}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// /* ══════════════════ HOME PAGE ══════════════════ */
// export default function Home() {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [scrollY, setScrollY] = useState(0);
//   const heroRef = useRef();

//   useReveal();

//   /* Parallax on scroll */
//   useEffect(() => {
//     const handler = () => setScrollY(window.scrollY);
//     window.addEventListener('scroll', handler, { passive: true });
//     return () => window.removeEventListener('scroll', handler);
//   }, []);

//   useEffect(() => {
//     async function load() {
//       const { data } = await supabase.from('products').select('*').eq('active', true).order('category');
//       if (data) {
//         const groups = {};
//         data.forEach(p => {
//           const base = p.name.split('–')[0].trim();
//           if (!groups[base]) groups[base] = { name: base, items: [] };
//           groups[base].items.push(p);
//         });
//         setProducts(Object.values(groups));
//       }
//       setLoading(false);
//     }
//     load();
//   }, []);

//   const features = [
//     { icon: <Leaf size={26} />, title: '100% Natural', desc: 'No chemicals, no additives — straight from nature', emoji: '🌿' },
//     { icon: <ShieldCheck size={26} />, title: 'Quality Assured', desc: 'Every product tested before dispatch', emoji: '✅' },
//     { icon: <Truck size={26} />, title: 'On-Time Delivery', desc: 'Fresh delivery right to your doorstep', emoji: '🚚' },
//     { icon: <Star size={26} />, title: 'Farm Direct', desc: 'Straight from farmers — fair price for all', emoji: '🧑‍🌾' },
//   ];

//   const stats = [
//     { value: 3, suffix: '', label: 'Farm Products' },
//     { value: 100, suffix: '%', label: 'Natural & Pure' },
//     { value: 0, suffix: '', label: 'Middlemen', prefix: 'Zero' },
//     { value: 100, suffix: '%', label: 'Farm Direct' },
//   ];

//   const marqueeItems = ['🍯 Pure Honey', '🫙 Coconut Oil', '🌶 Black Pepper', '🌿 Farm Fresh', '✅ No Chemicals', '📦 Free Delivery above ₹500', '🇮🇳 Made in Karnataka'];

//   return (
//     <div>

//       {/* ══ HERO ══ */}
//       <section ref={heroRef} style={{ position:'relative', minHeight:'100vh', overflow:'hidden', display:'flex', alignItems:'center' }}>

//         {/* Layered background */}
//         <div style={{ position:'absolute', inset:0, background:'linear-gradient(135deg, #0d0603 0%, #2a1208 35%, #5c2d0e 65%, #8b5020 100%)', transform:`translateY(${scrollY * 0.3}px)` }} />
//         {/* Radial glow spots */}
//         <div style={{ position:'absolute', top:'20%', right:'15%', width:500, height:500, borderRadius:'50%', background:'radial-gradient(circle, rgba(212,135,10,0.18) 0%, transparent 70%)', pointerEvents:'none' }} />
//         <div style={{ position:'absolute', bottom:'10%', left:'5%', width:350, height:350, borderRadius:'50%', background:'radial-gradient(circle, rgba(245,200,66,0.1) 0%, transparent 70%)', pointerEvents:'none' }} />

//         {/* Animated particles */}
//         {[...Array(18)].map((_, i) => (
//           <div key={i} style={{
//             position:'absolute', borderRadius:'50%',
//             width: 4 + (i % 4) * 4, height: 4 + (i % 4) * 4,
//             background: i % 3 === 0 ? 'rgba(245,200,66,0.7)' : i % 3 === 1 ? 'rgba(212,135,10,0.6)' : 'rgba(255,255,255,0.25)',
//             left: `${5 + i * 5.2}%`, top: `${10 + (i * 19) % 80}%`,
//             animation: `drift ${6 + i * 0.7}s ${i * 0.35}s ease-in-out infinite`,
//           }} />
//         ))}

//         {/* Diagonal texture lines */}
//         <div style={{ position:'absolute', inset:0, backgroundImage:'repeating-linear-gradient(45deg, transparent, transparent 60px, rgba(255,255,255,0.012) 60px, rgba(255,255,255,0.012) 61px)', pointerEvents:'none' }} />

//         <div style={{ maxWidth:1280, margin:'0 auto', padding:'100px 48px 100px', display:'grid', gridTemplateColumns:'55% 45%', gap:48, alignItems:'center', width:'100%', position:'relative', zIndex:1 }}>

//           {/* ── LEFT ── */}
//           <div>
//             {/* Badge */}
//             <div style={{ display:'inline-flex', alignItems:'center', gap:8, background:'rgba(245,200,66,0.12)', border:'1px solid rgba(245,200,66,0.28)', borderRadius:50, padding:'8px 20px', marginBottom:30, animation:'fadeSlideUp 0.6s 0.1s both' }}>
//               <Sparkles size={13} color="#f5c842" />
//               <span style={{ fontSize:11, fontWeight:800, letterSpacing:'0.14em', color:'#f5c842', textTransform:'uppercase' }}>From Farm to Your Door</span>
//             </div>

//             {/* Headline */}
//             <h1 style={{ fontFamily:'var(--font-playfair)', fontSize:'clamp(2.6rem, 4.5vw, 4rem)', color:'white', lineHeight:1.12, marginBottom:24, animation:'fadeSlideUp 0.7s 0.25s both' }}>
//               <span style={{ display:'block' }}>Pure & Natural</span>
//               <span style={{ display:'block', color:'#f5c842', WebkitTextStroke:'0px' }}>Farm Products</span>
//               <span style={{ display:'block', fontSize:'80%', color:'rgba(255,255,255,0.75)' }}>from Rural Karnataka</span>
//             </h1>

//             <p style={{ color:'rgba(255,255,255,0.68)', fontSize:'1.05rem', lineHeight:1.85, marginBottom:16, animation:'fadeSlideUp 0.7s 0.4s both', maxWidth:480 }}>
//               Sourced directly from the forests and farms of Belthangady — no middlemen, no chemicals.
//             </p>
//             <p style={{ color:'#f5c842', fontWeight:700, fontSize:'1rem', marginBottom:40, animation:'fadeSlideUp 0.7s 0.5s both' }}>
//               🌿 Just nature's best, at your doorstep.
//             </p>

//             {/* CTA buttons */}
//             <div style={{ display:'flex', gap:16, flexWrap:'wrap', marginBottom:52, animation:'fadeSlideUp 0.7s 0.6s both' }}>
//               <Link href="/products" style={{ textDecoration:'none' }}>
//                 <button style={{
//                   display:'inline-flex', alignItems:'center', gap:10,
//                   background:'linear-gradient(135deg, #f5c842, #d4870a)',
//                   color:'#1a0f0a', padding:'15px 32px', borderRadius:50,
//                   fontWeight:800, fontSize:'1rem', border:'none', cursor:'pointer',
//                   boxShadow:'0 8px 32px rgba(212,135,10,0.5)',
//                   transition:'all 0.3s cubic-bezier(0.34,1.56,0.64,1)',
//                   fontFamily:'var(--font-dm)'
//                 }}
//                   onMouseEnter={e => { e.currentTarget.style.transform='translateY(-4px) scale(1.04)'; e.currentTarget.style.boxShadow='0 16px 48px rgba(212,135,10,0.6)'; }}
//                   onMouseLeave={e => { e.currentTarget.style.transform='translateY(0) scale(1)'; e.currentTarget.style.boxShadow='0 8px 32px rgba(212,135,10,0.5)'; }}>
//                   <ShoppingBagIcon />
//                   Explore Products
//                   <ArrowRight size={17} />
//                 </button>
//               </Link>
//               <Link href="#about" style={{ textDecoration:'none' }}>
//                 <button style={{
//                   display:'inline-flex', alignItems:'center', gap:8,
//                   background:'rgba(255,255,255,0.08)', color:'white',
//                   padding:'15px 28px', borderRadius:50,
//                   fontWeight:600, fontSize:'1rem',
//                   border:'1.5px solid rgba(255,255,255,0.22)',
//                   cursor:'pointer', backdropFilter:'blur(8px)',
//                   transition:'all 0.3s cubic-bezier(0.34,1.56,0.64,1)',
//                   fontFamily:'var(--font-dm)'
//                 }}
//                   onMouseEnter={e => { e.currentTarget.style.background='rgba(255,255,255,0.18)'; e.currentTarget.style.transform='translateY(-3px)'; }}
//                   onMouseLeave={e => { e.currentTarget.style.background='rgba(255,255,255,0.08)'; e.currentTarget.style.transform='translateY(0)'; }}>
//                   Our Story
//                 </button>
//               </Link>
//             </div>

//             {/* Trust badges */}
//             <div style={{ display:'flex', gap:20, flexWrap:'wrap', animation:'fadeSlideUp 0.7s 0.75s both' }}>
//               {[['🍯','Pure Honey'],['🫙','Cold Pressed Oil'],['🌶','Black Pepper']].map(([e, l]) => (
//                 <div key={l} style={{ display:'flex', alignItems:'center', gap:8, background:'rgba(255,255,255,0.07)', borderRadius:50, padding:'8px 16px', border:'1px solid rgba(255,255,255,0.1)', backdropFilter:'blur(6px)' }}>
//                   <span style={{ fontSize:16 }}>{e}</span>
//                   <span style={{ fontSize:12, fontWeight:600, color:'rgba(255,255,255,0.75)' }}>{l}</span>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* ── RIGHT — Product showcase ── */}
//           <div style={{ position:'relative', display:'flex', justifyContent:'center', animation:'fadeSlideUp 0.8s 0.4s both' }}>
//             {/* Rotating ring */}
//             <div style={{ position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%)', width:360, height:360, borderRadius:'50%', border:'1px dashed rgba(245,200,66,0.2)', animation:'spin 30s linear infinite' }} />
//             <div style={{ position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%)', width:300, height:300, borderRadius:'50%', border:'1px dashed rgba(245,200,66,0.1)', animation:'spinReverse 20s linear infinite' }} />

//             {/* Main floating card */}
//             <div style={{ width:280, position:'relative', zIndex:2 }}>
//               <div style={{
//                 background:'rgba(255,255,255,0.07)', backdropFilter:'blur(20px)',
//                 border:'1px solid rgba(255,255,255,0.15)',
//                 borderRadius:28, padding:'28px 24px 24px', textAlign:'center',
//                 boxShadow:'0 32px 80px rgba(0,0,0,0.4)',
//                 animation:'float 5s ease-in-out infinite'
//               }}>
//                 <div style={{ background:'radial-gradient(#ffe082,#f9a825)', borderRadius:18, padding:'16px', marginBottom:16, height:180, display:'flex', alignItems:'center', justifyContent:'center' }}>
//                   <img src="/honey.png" alt="Honey" style={{ width:120, height:160, objectFit:'contain', filter:'drop-shadow(0 16px 32px rgba(0,0,0,0.35))' }} />
//                 </div>
//                 <p style={{ color:'white', fontFamily:'var(--font-playfair)', fontSize:'1.15rem', fontWeight:700, marginBottom:6 }}>Pure Forest Honey</p>
//                 <p style={{ color:'rgba(255,255,255,0.5)', fontSize:12, marginBottom:12 }}>Western Ghats, Belthangady</p>
//                 <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
//                   <span style={{ color:'#f5c842', fontWeight:800, fontSize:'1.3rem', fontFamily:'var(--font-dm)' }}>₹299</span>
//                   <span style={{ background:'rgba(245,200,66,0.15)', color:'#f5c842', padding:'4px 12px', borderRadius:20, fontSize:11, fontWeight:700 }}>500g</span>
//                 </div>
//               </div>

//               {/* Floating tag: 100% Natural */}
//               <div style={{ position:'absolute', top:-18, right:-24, background:'linear-gradient(135deg,#f5c842,#d4870a)', color:'#1a0f0a', padding:'10px 16px', borderRadius:20, fontSize:12, fontWeight:800, boxShadow:'0 8px 24px rgba(212,135,10,0.45)', animation:'float 3.5s 0.5s ease-in-out infinite', zIndex:3, display:'flex', alignItems:'center', gap:6 }}>
//                 🌿 100% Natural
//               </div>

//               {/* Floating tag: Top Seller */}
//               <div style={{ position:'absolute', bottom:30, left:-36, background:'white', color:'#4a3728', padding:'10px 16px', borderRadius:20, fontSize:12, fontWeight:800, boxShadow:'0 8px 24px rgba(0,0,0,0.2)', animation:'float 4s 1.2s ease-in-out infinite', zIndex:3, display:'flex', alignItems:'center', gap:6 }}>
//                 ⭐ Top Seller
//               </div>

//               {/* Floating tag: No chemicals */}
//               <div style={{ position:'absolute', bottom:-16, right:-10, background:'rgba(34,197,94,0.15)', border:'1px solid rgba(34,197,94,0.3)', color:'#22c55e', padding:'8px 14px', borderRadius:20, fontSize:11, fontWeight:700, backdropFilter:'blur(8px)', animation:'float 4.5s 0.8s ease-in-out infinite', zIndex:3 }}>
//                 ✓ No Chemicals
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Scroll indicator */}
//         <div style={{ position:'absolute', bottom:28, left:'50%', transform:'translateX(-50%)', display:'flex', flexDirection:'column', alignItems:'center', gap:6, animation:'float 2.5s ease-in-out infinite', zIndex:2 }}>
//           <span style={{ fontSize:10, letterSpacing:'0.18em', color:'rgba(255,255,255,0.35)', textTransform:'uppercase' }}>Discover</span>
//           <ChevronDown size={18} color="rgba(255,255,255,0.35)" />
//         </div>
//       </section>

//       {/* ══ MARQUEE ══ */}
//       <div style={{ background:'#4a3728', overflow:'hidden', padding:'13px 0', borderTop:'2px solid #3a2718', borderBottom:'2px solid #3a2718' }}>
//         <div className="marquee-track">
//           {[...marqueeItems, ...marqueeItems, ...marqueeItems].map((item, i) => (
//             <span key={i} style={{ whiteSpace:'nowrap', padding:'0 28px', color:'#f5c842', fontWeight:600, fontSize:12.5, letterSpacing:'0.04em' }}>
//               {item} <span style={{ color:'rgba(245,200,66,0.3)', margin:'0 6px' }}>✦</span>
//             </span>
//           ))}
//         </div>
//       </div>

//       {/* ══ FEATURES ══ */}
//       <section style={{ background:'linear-gradient(180deg,#fdf5e4,#fffbf0)', padding:'80px 20px' }}>
//         <div style={{ maxWidth:1200, margin:'0 auto' }}>
//           <div style={{ textAlign:'center', marginBottom:52 }}>
//             <p className="reveal" style={{ fontSize:11, fontWeight:800, letterSpacing:'0.18em', color:'#d4870a', textTransform:'uppercase', marginBottom:10 }}>WHY CHOOSE US</p>
//             <h2 className="reveal delay-1" style={{ fontFamily:'var(--font-playfair)', fontSize:'clamp(1.8rem,3vw,2.5rem)', color:'#1a0f0a' }}>The Rural Roots Promise</h2>
//           </div>
//           <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))', gap:24 }}>
//             {features.map((f, i) => (
//               <div key={i} className={`reveal delay-${i+1}`} style={{ background:'white', borderRadius:20, padding:'32px 22px', textAlign:'center', boxShadow:'0 4px 20px rgba(74,55,40,0.06)', transition:'all 0.35s cubic-bezier(0.34,1.2,0.64,1)', cursor:'default', border:'1.5px solid transparent' }}
//                 onMouseEnter={e => { e.currentTarget.style.transform='translateY(-10px)'; e.currentTarget.style.boxShadow='0 24px 52px rgba(74,55,40,0.14)'; e.currentTarget.style.borderColor='#f5c842'; e.currentTarget.style.background='#1a0f0a'; const els=e.currentTarget.querySelectorAll('[data-title],[data-desc]'); els.forEach(el=>{if(el.dataset.title)el.style.color='#f5c842'; if(el.dataset.desc)el.style.color='rgba(255,255,255,0.55)'}); }}
//                 onMouseLeave={e => { e.currentTarget.style.transform='translateY(0)'; e.currentTarget.style.boxShadow='0 4px 20px rgba(74,55,40,0.06)'; e.currentTarget.style.borderColor='transparent'; e.currentTarget.style.background='white'; const els=e.currentTarget.querySelectorAll('[data-title],[data-desc]'); els.forEach(el=>{if(el.dataset.title)el.style.color='#1a0f0a'; if(el.dataset.desc)el.style.color='#999'}); }}>
//                 <div style={{ fontSize:36, marginBottom:16 }}>{f.emoji}</div>
//                 <div style={{ display:'inline-flex', alignItems:'center', justifyContent:'center', width:52, height:52, borderRadius:'50%', background:'linear-gradient(135deg,#f5c842,#d4870a)', marginBottom:14, boxShadow:'0 6px 18px rgba(212,135,10,0.3)', transition:'transform 0.3s' }}
//                   onMouseEnter={e => e.currentTarget.style.transform='rotate(15deg) scale(1.15)'}
//                   onMouseLeave={e => e.currentTarget.style.transform='rotate(0) scale(1)'}>
//                   <div style={{ color:'white' }}>{f.icon}</div>
//                 </div>
//                 <h3 data-title style={{ fontFamily:'var(--font-playfair)', fontSize:'1.05rem', color:'#1a0f0a', marginBottom:8, transition:'color 0.3s' }}>{f.title}</h3>
//                 <p data-desc style={{ color:'#999', fontSize:13.5, lineHeight:1.65, transition:'color 0.3s' }}>{f.desc}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* ══ PRODUCTS TEASER ══ */}
//       <section style={{ background:'#fffbf0', padding:'60px 20px 72px' }}>
//         <div style={{ maxWidth:1200, margin:'0 auto' }}>
//           {/* Section header */}
//           <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', marginBottom:40, flexWrap:'wrap', gap:16 }}>
//             <div>
//               <p className="reveal" style={{ fontSize:11, fontWeight:800, letterSpacing:'0.18em', color:'#d4870a', textTransform:'uppercase', marginBottom:10 }}>FARM FRESH</p>
//               <h2 className="reveal delay-1" style={{ fontFamily:'var(--font-playfair)', fontSize:'clamp(1.8rem,3vw,2.4rem)', color:'#1a0f0a', lineHeight:1.2 }}>
//                 Our Products
//               </h2>
//               <p className="reveal delay-2" style={{ color:'#aaa', fontSize:'0.95rem', marginTop:8 }}>Handpicked from nature, delivered to you</p>
//             </div>
//             <Link href="/products" className="reveal" style={{ textDecoration:'none', display:'inline-flex', alignItems:'center', gap:8, color:'#d4870a', fontWeight:700, fontSize:14, borderBottom:'2px solid #d4870a', paddingBottom:3, transition:'gap 0.2s' }}
//               onMouseEnter={e => e.currentTarget.style.gap='14px'}
//               onMouseLeave={e => e.currentTarget.style.gap='8px'}>
//               View All <ArrowRight size={16} />
//             </Link>
//           </div>

//           {loading ? (
//             <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(300px,1fr))', gap:28 }}>
//               {[1,2,3].map(i => <div key={i} className="shimmer" style={{ height:420, borderRadius:20 }} />)}
//             </div>
//           ) : (
//             <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(300px,1fr))', gap:28 }}>
//               {products.map(g => <HomeCard key={g.name} group={g} />)}
//             </div>
//           )}

//           {/* Bottom CTA banner */}
//           <div className="reveal" style={{ marginTop:52, background:'linear-gradient(135deg,#1a0f0a,#4a3728)', borderRadius:24, padding:'40px 40px', display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:20, boxShadow:'0 16px 48px rgba(26,15,10,0.2)' }}>
//             <div>
//               <h3 style={{ fontFamily:'var(--font-playfair)', color:'#f5c842', fontSize:'1.5rem', marginBottom:8 }}>Ready to taste the difference?</h3>
//               <p style={{ color:'rgba(255,255,255,0.55)', fontSize:14 }}>Free delivery on orders above ₹500. Cash on delivery available.</p>
//             </div>
//             <Link href="/products" style={{ textDecoration:'none' }}>
//               <button style={{ background:'linear-gradient(135deg,#f5c842,#d4870a)', color:'#1a0f0a', padding:'14px 32px', borderRadius:50, fontWeight:800, fontSize:'1rem', border:'none', cursor:'pointer', display:'flex', alignItems:'center', gap:10, whiteSpace:'nowrap', boxShadow:'0 8px 24px rgba(212,135,10,0.4)', transition:'all 0.3s', fontFamily:'var(--font-dm)' }}
//                 onMouseEnter={e => { e.currentTarget.style.transform='scale(1.05) translateY(-2px)'; }}
//                 onMouseLeave={e => { e.currentTarget.style.transform='scale(1) translateY(0)'; }}>
//                 Shop All Products <ArrowRight size={16} />
//               </button>
//             </Link>
//           </div>
//         </div>
//       </section>

//       {/* ══ STATS ══ */}
//       <section style={{ background:'linear-gradient(135deg,#1a0f0a,#4a3728)', padding:'64px 20px' }}>
//         <div style={{ maxWidth:960, margin:'0 auto', display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(180px,1fr))', gap:32, textAlign:'center' }}>
//           {stats.map((s, i) => (
//             <div key={i} className={`reveal delay-${i+1}`}>
//               <div style={{ fontFamily:'var(--font-playfair)', fontSize:'clamp(2rem,4vw,3rem)', fontWeight:700, color:'#f5c842', lineHeight:1 }}>
//                 <Counter target={s.value} suffix={s.suffix} prefix={s.prefix} />
//               </div>
//               <div style={{ color:'rgba(255,255,255,0.5)', fontSize:13, marginTop:8, letterSpacing:'0.04em' }}>{s.label}</div>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* ══ ABOUT ══ */}
//       <section id="about" style={{ background:'#fdf5e4', padding:'90px 20px' }}>
//         <div style={{ maxWidth:1100, margin:'0 auto', display:'grid', gridTemplateColumns:'1fr 1fr', gap:72, alignItems:'center' }}>
//           <div className="reveal-left">
//             <p style={{ fontSize:11, fontWeight:800, letterSpacing:'0.18em', color:'#d4870a', textTransform:'uppercase', marginBottom:14 }}>OUR STORY</p>
//             <h2 style={{ fontFamily:'var(--font-playfair)', fontSize:'clamp(1.8rem,3vw,2.5rem)', color:'#1a0f0a', marginBottom:20, lineHeight:1.25 }}>Rooted in the Forests of Belthangady</h2>
//             <p style={{ color:'#777', lineHeight:1.9, fontSize:'1rem', marginBottom:18 }}>
//               Rural Roots was born from a simple belief — the best products come directly from nature. Located in the heart of Belthangady, Karnataka, we work hand-in-hand with local farmers.
//             </p>
//             <p style={{ color:'#777', lineHeight:1.9, fontSize:'1rem', marginBottom:32 }}>
//               Every bottle of honey, every drop of coconut oil, every grain of black pepper is carefully sourced, quality checked, and delivered fresh to your doorstep.
//             </p>
//             <div style={{ display:'flex', gap:28 }}>
//               {[['🌲','Western Ghats'],['🧑‍🌾','Local Farmers'],['✅','No Chemicals']].map(([e, l]) => (
//                 <div key={l} style={{ textAlign:'center' }}>
//                   <div style={{ fontSize:26, marginBottom:6 }}>{e}</div>
//                   <div style={{ fontSize:11, fontWeight:700, color:'#4a3728', letterSpacing:'0.04em' }}>{l}</div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           <div className="reveal-right" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:14 }}>
//             {[
//               { bg:'radial-gradient(#ffe082,#f9a825)', img:'/honey.png', label:'Pure Honey' },
//               { bg:'radial-gradient(#c8e6c9,#a5d6a7)', img:'/coconut-oil.png', label:'Coconut Oil' },
//               { bg:'radial-gradient(#d7ccc8,#bcaaa4)', img:'/pepper.png', label:'Black Pepper' },
//               { bg:'linear-gradient(135deg,#1a0f0a,#4a3728)', label:'More coming soon...', isText:true },
//             ].map((item, i) => (
//               <div key={i} style={{ background:item.bg, borderRadius:18, height:155, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'flex-end', padding:14, transition:'transform 0.35s cubic-bezier(0.34,1.2,0.64,1)', overflow:'hidden', boxShadow:'0 6px 20px rgba(0,0,0,0.1)' }}
//                 onMouseEnter={e => e.currentTarget.style.transform='scale(1.06) translateY(-4px)'}
//                 onMouseLeave={e => e.currentTarget.style.transform='scale(1) translateY(0)'}>
//                 {item.img && <img src={item.img} style={{ width:65, height:75, objectFit:'contain', filter:'drop-shadow(0 6px 12px rgba(0,0,0,0.2))' }} />}
//                 {item.isText && <div style={{ fontSize:26, marginBottom:8 }}>🌿</div>}
//                 <span style={{ fontSize:10, fontWeight:700, color: item.isText?'#f5c842':'#4a3728', background:'rgba(255,255,255,0.3)', backdropFilter:'blur(8px)', padding:'3px 10px', borderRadius:20, marginTop:6 }}>{item.label}</span>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* ══ CONTACT ══ */}
//       <section id="contact" style={{ background:'#fffbf0', padding:'80px 20px' }}>
//         <div style={{ maxWidth:900, margin:'0 auto', textAlign:'center' }}>
//           <p className="reveal" style={{ fontSize:11, fontWeight:800, letterSpacing:'0.18em', color:'#d4870a', textTransform:'uppercase', marginBottom:12 }}>GET IN TOUCH</p>
//           <h2 className="reveal delay-1" style={{ fontFamily:'var(--font-playfair)', fontSize:'clamp(1.8rem,3vw,2.4rem)', color:'#1a0f0a', marginBottom:14 }}>Contact Us</h2>
//           <p className="reveal delay-2" style={{ color:'#aaa', marginBottom:48 }}>We'd love to hear from you — orders, queries, or just a hello!</p>
//           <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))', gap:22 }}>
//             {[
//               { icon:<Phone size={22} />, label:'Phone', value:'+91 91875 43765', href:'tel:+919187543765' },
//               { icon:<Mail size={22} />, label:'Email', value:'officialruralroots@gmail.com', href:'mailto:officialruralroots@gmail.com' },
//               { icon:<MapPin size={22} />, label:'Address', value:'Hathyadka Village, Belthangady, D.K.', href:'#' },
//             ].map((c, i) => (
//               <a key={i} href={c.href} className={`reveal delay-${i+1}`} style={{ background:'white', borderRadius:20, padding:'26px 18px', textDecoration:'none', boxShadow:'0 4px 18px rgba(74,55,40,0.06)', transition:'all 0.35s cubic-bezier(0.34,1.2,0.64,1)', display:'block', border:'1.5px solid transparent' }}
//                 onMouseEnter={e => { e.currentTarget.style.transform='translateY(-8px)'; e.currentTarget.style.background='#1a0f0a'; e.currentTarget.style.borderColor='#4a3728'; e.currentTarget.querySelectorAll('[data-lbl],[data-val]').forEach(el => { if(el.dataset.lbl) el.style.color='#f5c842'; if(el.dataset.val) el.style.color='rgba(255,255,255,0.6)'; }); }}
//                 onMouseLeave={e => { e.currentTarget.style.transform='translateY(0)'; e.currentTarget.style.background='white'; e.currentTarget.style.borderColor='transparent'; e.currentTarget.querySelectorAll('[data-lbl],[data-val]').forEach(el => { if(el.dataset.lbl) el.style.color='#4a3728'; if(el.dataset.val) el.style.color='#888'; }); }}>
//                 <div style={{ display:'inline-flex', alignItems:'center', justifyContent:'center', width:50, height:50, borderRadius:'50%', background:'linear-gradient(135deg,#f5c842,#d4870a)', marginBottom:14 }}>
//                   <div style={{ color:'white' }}>{c.icon}</div>
//                 </div>
//                 <p data-lbl style={{ fontWeight:700, fontSize:13.5, color:'#4a3728', marginBottom:6, transition:'color 0.3s' }}>{c.label}</p>
//                 <p data-val style={{ fontSize:12.5, color:'#888', transition:'color 0.3s' }}>{c.value}</p>
//               </a>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* ══ FOOTER ══ */}
//       <footer style={{ background:'#1a0f0a', color:'#d4b896', padding:'52px 32px 28px', borderTop:'2px solid #4a3728' }}>
//         <div style={{ maxWidth:1200, margin:'0 auto', display:'grid', gridTemplateColumns:'2fr 1fr 1fr', gap:40, marginBottom:36 }}>
//           <div>
//             <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:14 }}>
//               <Leaf size={22} color="#f5c842" />
//               <span style={{ fontFamily:'var(--font-playfair)', fontSize:'1.2rem', color:'#f5c842' }}>Rural Roots</span>
//             </div>
//             <p style={{ fontSize:13.5, lineHeight:1.8, color:'rgba(212,184,150,0.65)', maxWidth:280 }}>Pure, natural products from the forests and farms of Belthangady, Karnataka.</p>
//           </div>
//           <div>
//             <p style={{ fontWeight:700, color:'#f5c842', marginBottom:14, fontSize:12, letterSpacing:'0.1em' }}>QUICK LINKS</p>
//             {['/', '/products', '/#about', '/#contact'].map((href, i) => (
//               <Link key={i} href={href} style={{ display:'block', color:'rgba(212,184,150,0.6)', textDecoration:'none', fontSize:13.5, marginBottom:10, transition:'color 0.2s' }}
//                 onMouseEnter={e => e.target.style.color='#f5c842'}
//                 onMouseLeave={e => e.target.style.color='rgba(212,184,150,0.6)'}>
//                 {['Home','Products','About','Contact'][i]}
//               </Link>
//             ))}
//           </div>
//           <div>
//             <p style={{ fontWeight:700, color:'#f5c842', marginBottom:14, fontSize:12, letterSpacing:'0.1em' }}>CONTACT</p>
//             <p style={{ fontSize:13, color:'rgba(212,184,150,0.6)', lineHeight:1.85 }}>+91 91875 43765<br />officialruralroots@gmail.com<br />Belthangady, Karnataka</p>
//           </div>
//         </div>
//         <div style={{ borderTop:'1px solid #4a3728', paddingTop:20, textAlign:'center', fontSize:12.5, color:'rgba(212,184,150,0.38)' }}>
//           © 2025 Rural Roots. All rights reserved. | Made with 🌿 in Karnataka
//         </div>
//       </footer>

//       <style>{`
//         @keyframes fadeSlideUp { from{opacity:0;transform:translateY(30px)} to{opacity:1;transform:translateY(0)} }
//         @keyframes drift { 0%{transform:translateY(0) translateX(0) rotate(0deg);opacity:0.6} 33%{transform:translateY(-35px) translateX(14px) rotate(120deg)} 66%{transform:translateY(-70px) translateX(-10px) rotate(240deg)} 100%{transform:translateY(-110px) translateX(5px) rotate(360deg);opacity:0} }
//         @keyframes spin { from{transform:translate(-50%,-50%) rotate(0deg)} to{transform:translate(-50%,-50%) rotate(360deg)} }
//         @keyframes spinReverse { from{transform:translate(-50%,-50%) rotate(0deg)} to{transform:translate(-50%,-50%) rotate(-360deg)} }
//         @media(max-width:768px) {
//           section > div { grid-template-columns:1fr !important; }
//         }
//       `}</style>
//     </div>
//   );
// }

// function ShoppingBagIcon() {
//   return (
//     <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
//       <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/>
//     </svg>
//   );
// }

'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { supabase } from '../lib/supabase';
import { useCart } from '../lib/CartContext';
import { ArrowRight, Leaf, ShieldCheck, Truck, Users } from 'lucide-react';
import toast from 'react-hot-toast';

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.sr,.sr-l,.sr-r');
    const obs = new IntersectionObserver(
      e => e.forEach(x => { if (x.isIntersecting) x.target.classList.add('in'); }),
      { threshold: 0.08 }
    );
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

const IMGS = { Honey: '/honey.png', Oil: '/coconut-oil.png', Spices: '/pepper.png' };
function getBg(cat) {
  if (cat === 'Honey')  return 'linear-gradient(145deg,#fff8e1,#ffe082 60%,#ffc107)';
  if (cat === 'Oil')    return 'linear-gradient(145deg,#f1f8e9,#dcedc8 60%,#aed581)';
  return 'linear-gradient(145deg,#efebe9,#d7ccc8 60%,#bcaaa4)';
}

export default function Home() {
  const [loaded, setLoaded] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  useReveal();

  useEffect(() => {
    setTimeout(() => setLoaded(true), 80);
    const h = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', h, { passive: true });
    return () => window.removeEventListener('scroll', h);
  }, []);

  const MARQUEE = ['🍯 Wild Forest Honey','🫙 Cold Pressed Coconut Oil','🌶 Black Pepper','🌿 100% Natural','🚜 Farm Direct','📦 Cash on Delivery','🇮🇳 Made in Karnataka'];

  const features = [
    { emoji:'🌿', t:'100% Natural',    d:'No pesticides, no additives. Pure goodness from the Western Ghats.' },
    { emoji:'✅', t:'Quality Assured', d:'Every batch hand-checked before it leaves our farm.' },
    { emoji:'🚚', t:'On-Time Delivery',d:'Packed fresh and delivered to your doorstep, every time.' },
    { emoji:'🧑‍🌾', t:'Farm Direct',    d:'Straight from our farmers — honest prices, no middlemen.' },
  ];

  const products = [
    { emoji:'🍯', name:'Pure Honey',   desc:'Wild forest honey from Belthangady', price:'from ₹299', bg:'linear-gradient(145deg,#fff8e1,#ffe082 60%,#ffc107)', img:'/honey.png' },
    { emoji:'🫙', name:'Coconut Oil',  desc:'Cold pressed virgin coconut oil',    price:'from ₹299', bg:'linear-gradient(145deg,#f1f8e9,#dcedc8 60%,#aed581)', img:'/coconut-oil.png' },
    { emoji:'🌶', name:'Black Pepper', desc:'Sun-dried farm fresh black pepper',  price:'from ₹599', bg:'linear-gradient(145deg,#efebe9,#d7ccc8 60%,#bcaaa4)', img:'/pepper.png' },
  ];

  return (
    <div style={{ fontFamily:'var(--font-body, Jost, sans-serif)', overflowX:'hidden' }}>

      {/* ── HERO ── */}
      <section className="hero-section" style={{ position:'relative', minHeight:'100vh', display:'flex', alignItems:'center', background:'#0e0905', overflow:'hidden', paddingTop:64 }}>
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(150deg,#0e0905 0%,#1e0d06 20%,#3a1a08 50%,#6b3818 75%,#7a4520 100%)', transform:`translateY(${scrollY*.2}px)` }} />
        <div style={{ position:'absolute', top:'10%', right:'10%', width:500, height:500, borderRadius:'50%', background:'radial-gradient(circle,rgba(184,131,42,.18) 0%,transparent 65%)', pointerEvents:'none' }} />
        <div style={{ position:'absolute', bottom:'5%', left:'5%', width:360, height:360, borderRadius:'50%', background:'radial-gradient(circle,rgba(44,74,40,.25) 0%,transparent 65%)', pointerEvents:'none' }} />

        {[...Array(6)].map((_,i) => (
          <div key={i} style={{ position:'absolute', borderRadius:'50%', width:4+(i%3)*3, height:4+(i%3)*3, background:i%2===0?'rgba(184,131,42,.5)':'rgba(255,255,255,.12)', left:`${10+i*15}%`, top:`${20+(i*19)%60}%`, animation:`gfloat ${5+i*.9}s ${i*.5}s ease-in-out infinite` }} />
        ))}

        <div className="hero-grid" style={{ position:'relative', zIndex:2, width:'100%', maxWidth:1200, margin:'0 auto', padding:'60px 24px 60px', display:'grid', gridTemplateColumns:'1fr 1fr', gap:48, alignItems:'center' }}>

          {/* Left */}
          <div style={{ opacity:loaded?1:0, transform:loaded?'translateY(0)':'translateY(28px)', transition:'all .9s ease' }}>
            <div style={{ display:'inline-flex', alignItems:'center', gap:8, background:'rgba(184,131,42,.15)', border:'1px solid rgba(184,131,42,.3)', borderRadius:30, padding:'7px 16px', marginBottom:24 }}>
              <Leaf size={12} color="#b8832a" />
              <span style={{ fontSize:11, letterSpacing:'.14em', color:'#b8832a', textTransform:'uppercase', fontWeight:500 }}>From Farm to Your Door</span>
            </div>

            <h1 className="hero-h1" style={{ fontFamily:'var(--font-head, Playfair Display, serif)', fontSize:'clamp(2.4rem,5vw,4.2rem)', fontWeight:400, color:'white', lineHeight:1.1, marginBottom:20 }}>
              <span style={{ display:'block', fontStyle:'italic', color:'#b8832a' }}>Pure & Natural</span>
              <span style={{ display:'block' }}>Farm Products</span>
              <span style={{ display:'block', fontSize:'55%', color:'rgba(255,255,255,.5)', fontStyle:'normal', marginTop:4 }}>from Rural Karnataka</span>
            </h1>

            <p style={{ fontSize:'clamp(0.9rem,2.5vw,1rem)', color:'rgba(255,255,255,.62)', lineHeight:1.85, maxWidth:420, marginBottom:32 }}>
              Wild honey, cold-pressed coconut oil and black pepper — sourced directly from Belthangady. <strong style={{ color:'rgba(255,255,255,.9)', fontWeight:500 }}>No middlemen. No chemicals.</strong>
            </p>

            <div className="hero-cta" style={{ display:'flex', gap:12, flexWrap:'wrap', marginBottom:36 }}>
              <Link href="/products" style={{ textDecoration:'none' }}>
                <button style={{ display:'inline-flex', alignItems:'center', gap:8, background:'#b8832a', color:'white', padding:'14px 28px', border:'none', borderRadius:6, fontSize:12, fontWeight:600, letterSpacing:'.1em', textTransform:'uppercase', fontFamily:'inherit', transition:'all .3s', cursor:'pointer' }}
                  onMouseEnter={e => { e.currentTarget.style.background='#d4961e'; e.currentTarget.style.transform='translateY(-2px)'; e.currentTarget.style.boxShadow='0 10px 28px rgba(184,131,42,.4)'; }}
                  onMouseLeave={e => { e.currentTarget.style.background='#b8832a'; e.currentTarget.style.transform='translateY(0)'; e.currentTarget.style.boxShadow='none'; }}>
                  Shop Now <ArrowRight size={14}/>
                </button>
              </Link>
              <Link href="#about" style={{ textDecoration:'none' }}>
                <button style={{ display:'inline-flex', alignItems:'center', gap:8, background:'transparent', color:'rgba(255,255,255,.7)', padding:'13px 22px', border:'1px solid rgba(255,255,255,.2)', borderRadius:6, fontSize:12, fontWeight:500, letterSpacing:'.1em', textTransform:'uppercase', fontFamily:'inherit', transition:'all .3s', cursor:'pointer' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor='rgba(255,255,255,.5)'; e.currentTarget.style.color='white'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor='rgba(255,255,255,.2)'; e.currentTarget.style.color='rgba(255,255,255,.7)'; }}>
                  Our Story
                </button>
              </Link>
            </div>

            {/* Trust chips */}
            <div className="hero-chips" style={{ display:'flex', gap:10, flexWrap:'wrap' }}>
              {[['🍯','Wild Honey','from ₹299'],['🫙','Coconut Oil','from ₹299'],['🌶','Black Pepper','from ₹599']].map(([e,n,p]) => (
                <div key={n} style={{ display:'flex', alignItems:'center', gap:8, background:'rgba(255,255,255,.06)', border:'1px solid rgba(255,255,255,.09)', borderRadius:8, padding:'8px 14px', transition:'all .25s' }}
                  onMouseEnter={e2 => { e2.currentTarget.style.background='rgba(184,131,42,.12)'; e2.currentTarget.style.borderColor='rgba(184,131,42,.3)'; }}
                  onMouseLeave={e2 => { e2.currentTarget.style.background='rgba(255,255,255,.06)'; e2.currentTarget.style.borderColor='rgba(255,255,255,.09)'; }}>
                  <span style={{ fontSize:18 }}>{e}</span>
                  <div>
                    <p style={{ fontSize:11, fontWeight:500, color:'rgba(255,255,255,.8)', marginBottom:1 }}>{n}</p>
                    <p style={{ fontSize:10, color:'#b8832a', fontWeight:500 }}>{p}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — hidden on mobile via CSS */}
          <div className="hero-right" style={{ display:'flex', justifyContent:'center', alignItems:'center', opacity:loaded?1:0, transition:'opacity 1s .4s ease' }}>
            <div style={{ position:'relative', width:280 }}>
              <div style={{ position:'absolute', inset:-40, borderRadius:'50%', border:'1px dashed rgba(184,131,42,.2)', animation:'spinSlow 40s linear infinite' }} />
              <div style={{ position:'absolute', inset:-20, borderRadius:'50%', border:'1px dashed rgba(184,131,42,.1)', animation:'spinSlowR 25s linear infinite' }} />
              <div style={{ background:'rgba(255,255,255,.07)', backdropFilter:'blur(24px)', border:'1px solid rgba(255,255,255,.12)', borderRadius:16, padding:'24px 20px 20px', textAlign:'center', boxShadow:'0 40px 80px rgba(0,0,0,.5)', animation:'gfloat 6s ease-in-out infinite' }}>
                <div style={{ background:'linear-gradient(145deg,#fff8e1,#ffe082 60%,#ffc107)', borderRadius:10, height:180, display:'flex', alignItems:'center', justifyContent:'center', marginBottom:16, overflow:'hidden' }}>
                  <img src="/honey.png" alt="Pure Honey" style={{ width:'75%', height:'100%', objectFit:'contain', filter:'drop-shadow(0 16px 32px rgba(0,0,0,.3))' }} />
                </div>
                <p style={{ fontFamily:'var(--font-head)', color:'white', fontSize:'1.1rem', marginBottom:4 }}>Pure Honey</p>
                <p style={{ fontSize:10, color:'rgba(255,255,255,.4)', letterSpacing:'.1em', textTransform:'uppercase', marginBottom:10 }}>Karnataka</p>
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                  <span style={{ fontFamily:'var(--font-head)', color:'#b8832a', fontSize:'1.25rem' }}></span>
                  <span style={{ fontSize:10, color:'rgba(255,255,255,.35)', letterSpacing:'.08em' }}>500g</span>
                </div>
              </div>
              <div style={{ position:'absolute', top:-14, right:-24, background:'linear-gradient(135deg,#b8832a,#d4961e)', color:'white', padding:'8px 14px', borderRadius:8, fontSize:11, fontWeight:600, boxShadow:'0 8px 24px rgba(184,131,42,.4)', animation:'gfloat 4s .5s ease-in-out infinite', whiteSpace:'nowrap' }}>🌿 100% Natural</div>
              <div style={{ position:'absolute', bottom:20, left:-40, background:'white', color:'#4a3424', padding:'8px 14px', borderRadius:8, fontSize:11, fontWeight:600, boxShadow:'0 8px 24px rgba(0,0,0,.18)', animation:'gfloat 5s 1.2s ease-in-out infinite', whiteSpace:'nowrap' }}>⭐ Top Seller</div>
              <div style={{ position:'absolute', bottom:-10, right:-10, background:'rgba(44,74,40,.9)', color:'#a8d5a2', padding:'7px 12px', borderRadius:8, fontSize:10, fontWeight:600, backdropFilter:'blur(8px)', animation:'gfloat 4.5s .9s ease-in-out infinite', whiteSpace:'nowrap' }}>✓ Zero Chemicals</div>
            </div>
          </div>
        </div>

        {/* Scroll cue */}
        <div style={{ position:'absolute', bottom:24, left:'50%', transform:'translateX(-50%)', display:'flex', flexDirection:'column', alignItems:'center', gap:6, opacity:.4, animation:'gfloat 2.5s ease-in-out infinite', zIndex:3 }}>
          <div style={{ width:1, height:36, background:'rgba(255,255,255,.4)' }} />
          <span style={{ fontSize:9, letterSpacing:'.2em', color:'white', textTransform:'uppercase' }}>scroll</span>
        </div>
        <div style={{ position:'absolute', bottom:0, left:0, right:0, height:80, background:'linear-gradient(to top,#0e0905,transparent)', pointerEvents:'none' }} />
      </section>

      {/* ── MARQUEE ── */}
      <div style={{ background:'#1c1410', borderTop:'1px solid #2e1e14', borderBottom:'1px solid #2e1e14', padding:'11px 0', overflow:'hidden' }}>
        <div className="mq">
          {[...MARQUEE,...MARQUEE,...MARQUEE].map((t,i) => (
            <span key={i} style={{ whiteSpace:'nowrap', padding:'0 28px', fontSize:11, fontWeight:400, letterSpacing:'.07em', color:'var(--sand,#c8a87c)' }}>
              {t} <span style={{ color:'#3e2a1a', margin:'0 4px' }}>◆</span>
            </span>
          ))}
        </div>
      </div>

      {/* ── FEATURES ── */}
      <section style={{ background:'var(--cream,#faf6f0)', padding:'80px 24px' }}>
        <div style={{ maxWidth:1200, margin:'0 auto' }}>
          <div style={{ textAlign:'center', marginBottom:48 }}>
            <p className="sr" style={{ fontSize:10, letterSpacing:'.22em', textTransform:'uppercase', color:'var(--gold,#b8832a)', marginBottom:12 }}>Why Choose Rural Roots</p>
            <h2 className="sr d1" style={{ fontFamily:'var(--font-head)', fontSize:'clamp(1.8rem,4vw,2.8rem)', fontWeight:400, color:'var(--ink,#1c1410)' }}>Our <em>Promise</em> to You</h2>
          </div>
          <div className="features-grid" style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:16 }}>
            {features.map((f,i) => (
              <div key={i} className={`sr d${i+1}`}
                style={{ background:'white', borderRadius:12, padding:'28px 22px', boxShadow:'0 2px 16px rgba(28,20,16,.05)', transition:'all .35s cubic-bezier(.25,1,.5,1)', border:'1px solid transparent' }}
                onMouseEnter={e => { e.currentTarget.style.transform='translateY(-6px)'; e.currentTarget.style.boxShadow='0 16px 40px rgba(28,20,16,.12)'; e.currentTarget.style.borderColor='var(--linen,#f2e8d8)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform='translateY(0)'; e.currentTarget.style.boxShadow='0 2px 16px rgba(28,20,16,.05)'; e.currentTarget.style.borderColor='transparent'; }}>
                <div style={{ fontSize:32, marginBottom:16 }}>{f.emoji}</div>
                <h3 style={{ fontFamily:'var(--font-head)', fontSize:'1.1rem', fontWeight:500, color:'var(--ink,#1c1410)', marginBottom:8 }}>{f.t}</h3>
                <p style={{ fontSize:13, color:'var(--clay,#8c6848)', lineHeight:1.7 }}>{f.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRODUCTS ── */}
      <section style={{ background:'var(--linen,#f2e8d8)', padding:'80px 24px' }}>
        <div style={{ maxWidth:1200, margin:'0 auto' }}>
          <div className="products-header" style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', marginBottom:44, flexWrap:'wrap', gap:12 }}>
            <div>
              <p className="sr" style={{ fontSize:10, letterSpacing:'.22em', textTransform:'uppercase', color:'var(--gold,#b8832a)', marginBottom:12 }}>Farm Fresh</p>
              <h2 className="sr d1" style={{ fontFamily:'var(--font-head)', fontSize:'clamp(1.8rem,4vw,2.8rem)', fontWeight:400, color:'var(--ink,#1c1410)' }}>Our <em>Products</em></h2>
            </div>
            <Link href="/products" className="sr d2" style={{ display:'flex', alignItems:'center', gap:6, textDecoration:'none', fontSize:12, fontWeight:500, letterSpacing:'.1em', textTransform:'uppercase', color:'var(--ink,#1c1410)', borderBottom:'1px solid var(--sand,#c8a87c)', paddingBottom:3 }}
              onMouseEnter={e => e.currentTarget.style.color='var(--gold,#b8832a)'}
              onMouseLeave={e => e.currentTarget.style.color='var(--ink,#1c1410)'}>
              View All <ArrowRight size={13}/>
            </Link>
          </div>

          <div className="products-grid" style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:16 }}>
            {products.map((p,i) => (
              <Link key={i} href="/products" style={{ textDecoration:'none' }} className={`sr d${i+1}`}>
                <div style={{ background:'white', borderRadius:12, overflow:'hidden', boxShadow:'0 2px 16px rgba(28,20,16,.06)', transition:'all .35s cubic-bezier(.25,1,.5,1)', height:'100%' }}
                  onMouseEnter={e => { e.currentTarget.style.transform='translateY(-8px)'; e.currentTarget.style.boxShadow='0 20px 48px rgba(28,20,16,.13)'; }}
                  onMouseLeave={e => { e.currentTarget.style.transform='translateY(0)'; e.currentTarget.style.boxShadow='0 2px 16px rgba(28,20,16,.06)'; }}>
                  <div style={{ height:220, background:p.bg, display:'flex', alignItems:'flex-end', justifyContent:'center', position:'relative', overflow:'hidden' }}>
                    <div style={{ position:'absolute', bottom:-40, left:'50%', transform:'translateX(-50%)', width:200, height:200, borderRadius:'50%', background:'rgba(255,255,255,.3)', filter:'blur(32px)' }} />
                    <img src={p.img} style={{ width:'58%', height:'88%', objectFit:'contain', objectPosition:'bottom center', filter:'drop-shadow(0 16px 24px rgba(28,20,16,.2))', position:'relative', zIndex:1, transition:'transform .4s cubic-bezier(.25,1,.5,1)' }}
                      onMouseEnter={e => e.target.style.transform='scale(1.08) translateY(-8px)'}
                      onMouseLeave={e => e.target.style.transform='scale(1) translateY(0)'} />
                  </div>
                  <div style={{ padding:'18px 20px 22px' }}>
                    <h3 style={{ fontFamily:'var(--font-head)', fontSize:'1.15rem', fontWeight:500, color:'var(--ink,#1c1410)', marginBottom:5 }}>{p.name}</h3>
                    <p style={{ fontSize:13, color:'var(--clay,#8c6848)', lineHeight:1.6, marginBottom:14 }}>{p.desc}</p>
                    <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                      <span style={{ fontFamily:'var(--font-head)', fontSize:'1.3rem', color:'var(--gold,#b8832a)', fontWeight:500 }}>{p.price}</span>
                      <span style={{ fontSize:11, fontWeight:500, letterSpacing:'.08em', textTransform:'uppercase', color:'var(--ink,#1c1410)', display:'flex', alignItems:'center', gap:4 }}>Shop <ArrowRight size={11}/></span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* CTA banner */}
          <div className="cta-banner sr" style={{ marginTop:48, background:'var(--ink,#1c1410)', borderRadius:12, padding:'40px 40px', display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:20 }}>
            <div>
              <h3 style={{ fontFamily:'var(--font-head)', color:'white', fontSize:'clamp(1.3rem,3vw,1.6rem)', fontWeight:400, fontStyle:'italic', marginBottom:8 }}>Ready to taste the difference?</h3>
              <p style={{ fontSize:13, color:'rgba(242,232,216,.55)', lineHeight:1.7 }}>Free delivery on orders above ₹500 · Cash on delivery available.</p>
            </div>
            <Link href="/products" style={{ textDecoration:'none' }}>
              <button style={{ display:'inline-flex', alignItems:'center', gap:8, background:'#b8832a', color:'white', padding:'13px 26px', border:'none', borderRadius:6, fontSize:11, fontWeight:600, letterSpacing:'.1em', textTransform:'uppercase', fontFamily:'inherit', whiteSpace:'nowrap', transition:'all .3s', cursor:'pointer' }}
                onMouseEnter={e => { e.currentTarget.style.background='#d4961e'; e.currentTarget.style.transform='scale(1.04)'; }}
                onMouseLeave={e => { e.currentTarget.style.background='#b8832a'; e.currentTarget.style.transform='scale(1)'; }}>
                Browse All Products <ArrowRight size={13}/>
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section style={{ background:'var(--ink,#1c1410)', padding:'60px 24px' }}>
        <div className="stats-grid" style={{ maxWidth:900, margin:'0 auto', display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:0 }}>
          {[['3','Farm Products'],['100%','Natural & Pure'],['Zero','Middlemen'],['100%','Farm Direct']].map(([v,l],i) => (
            <div key={i} className={`sr d${i+1} stats-item`} style={{ textAlign:'center', padding:'0 20px', borderRight:i<3?'1px solid rgba(255,255,255,.08)':'none' }}>
              <p style={{ fontFamily:'var(--font-head)', fontSize:'clamp(1.8rem,4vw,2.8rem)', fontWeight:400, color:'var(--gold,#b8832a)', lineHeight:1, marginBottom:8 }}>{v}</p>
              <p style={{ fontSize:10, letterSpacing:'.12em', textTransform:'uppercase', color:'rgba(200,168,124,.45)' }}>{l}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" style={{ background:'var(--cream,#faf6f0)', padding:'80px 24px' }}>
        <div className="about-grid" style={{ maxWidth:1200, margin:'0 auto', display:'grid', gridTemplateColumns:'1fr 1fr', gap:64, alignItems:'center' }}>
          <div className="sr-l">
            <p style={{ fontSize:10, letterSpacing:'.22em', textTransform:'uppercase', color:'var(--gold,#b8832a)', marginBottom:14 }}>Our Story</p>
            <h2 style={{ fontFamily:'var(--font-head)', fontSize:'clamp(1.8rem,3.5vw,2.8rem)', fontWeight:400, color:'var(--ink,#1c1410)', lineHeight:1.15, marginBottom:18 }}>
              Rooted in the Forests<br /><em>of Belthangady</em>
            </h2>
            <div style={{ width:40, height:2, background:'var(--gold,#b8832a)', marginBottom:20 }} />
            <p style={{ fontSize:'clamp(0.9rem,2.5vw,1rem)', color:'var(--clay,#8c6848)', lineHeight:1.85, marginBottom:14 }}>
              Rural Roots was born from a simple belief — the best products come directly from nature. We work hand-in-hand with local farmers in the Western Ghats.
            </p>
            <p style={{ fontSize:'clamp(0.9rem,2.5vw,1rem)', color:'var(--clay,#8c6848)', lineHeight:1.85, marginBottom:32 }}>
              Every bottle of honey, every drop of coconut oil, every grain of black pepper is carefully sourced and delivered fresh to your doorstep.
            </p>
            <div style={{ display:'flex', gap:28, flexWrap:'wrap' }}>
              {[['🌲','Western Ghats'],['🧑‍🌾','Local Farmers'],['✅','Zero Chemicals']].map(([e,l]) => (
                <div key={l} style={{ textAlign:'center' }}>
                  <div style={{ fontSize:24, marginBottom:6 }}>{e}</div>
                  <p style={{ fontSize:10, fontWeight:500, letterSpacing:'.1em', textTransform:'uppercase', color:'var(--earth,#4a3424)' }}>{l}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="sr-r about-mosaic" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10 }}>
            {[
              { bg:'linear-gradient(145deg,#fff3c4,#ffd54f)', img:'/honey.png',       label:'Honey' },
              { bg:'linear-gradient(145deg,#dcedc8,#aed581)', img:'/coconut-oil.png', label:'Coconut Oil' },
              { bg:'linear-gradient(145deg,#d7ccc8,#a1887f)', img:'/pepper.png',       label:'Black Pepper' },
              { bg:'var(--ink,#1c1410)',                       isText:true,            label:'More Soon' },
            ].map((item,i) => (
              <div key={i} style={{ background:item.bg, borderRadius:10, height:150, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'flex-end', padding:14, overflow:'hidden', transition:'transform .4s cubic-bezier(.25,1,.5,1)', boxShadow:'0 4px 16px rgba(28,20,16,.1)' }}
                onMouseEnter={e => e.currentTarget.style.transform='scale(1.05) translateY(-4px)'}
                onMouseLeave={e => e.currentTarget.style.transform='scale(1) translateY(0)'}>
                {item.img && <img src={item.img} style={{ width:62, height:72, objectFit:'contain', filter:'drop-shadow(0 6px 12px rgba(0,0,0,.2))' }} />}
                {item.isText && <span style={{ fontSize:26, marginBottom:8 }}>🌱</span>}
                <span style={{ marginTop:8, fontSize:9, fontWeight:500, letterSpacing:'.1em', textTransform:'uppercase', color:item.isText?'var(--gold,#b8832a)':'var(--earth,#4a3424)', background:item.isText?'transparent':'rgba(255,255,255,.4)', backdropFilter:'blur(6px)', padding:'3px 10px', borderRadius:20 }}>{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" style={{ background:'var(--ink,#1c1410)', padding:'80px 24px' }}>
        <div className="contact-grid" style={{ maxWidth:1200, margin:'0 auto', display:'grid', gridTemplateColumns:'1fr 2fr', gap:60, alignItems:'center' }}>
          <div className="sr-l">
            <p style={{ fontSize:10, letterSpacing:'.22em', textTransform:'uppercase', color:'var(--gold,#b8832a)', marginBottom:14 }}>Get in Touch</p>
            <h2 style={{ fontFamily:'var(--font-head)', fontSize:'clamp(1.8rem,3.5vw,2.8rem)', fontWeight:400, color:'white', lineHeight:1.15 }}>
              We'd love<br /><em style={{ color:'var(--gold,#b8832a)' }}>to hear from you</em>
            </h2>
          </div>
          <div className="sr-r contact-cards" style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:12 }}>
            {[
              { emoji:'📞', label:'Phone',   value:'+91 91875 43765',              href:'tel:+919187543765' },
              { emoji:'✉️', label:'Email',   value:'officialruralroots@gmail.com', href:'mailto:officialruralroots@gmail.com' },
              { emoji:'📍', label:'Address', value:'Hathyadka Village, Belthangady, D.K.', href:'#' },
            ].map((c,i) => (
              <a key={i} href={c.href} style={{ background:'rgba(255,255,255,.04)', border:'1px solid rgba(255,255,255,.07)', borderRadius:10, padding:'24px 18px', textDecoration:'none', display:'block', transition:'all .3s ease' }}
                onMouseEnter={e => { e.currentTarget.style.background='rgba(184,131,42,.1)'; e.currentTarget.style.borderColor='rgba(184,131,42,.3)'; e.currentTarget.style.transform='translateY(-4px)'; }}
                onMouseLeave={e => { e.currentTarget.style.background='rgba(255,255,255,.04)'; e.currentTarget.style.borderColor='rgba(255,255,255,.07)'; e.currentTarget.style.transform='translateY(0)'; }}>
                <div style={{ fontSize:26, marginBottom:14 }}>{c.emoji}</div>
                <p style={{ fontSize:9, letterSpacing:'.16em', textTransform:'uppercase', color:'var(--gold,#b8832a)', marginBottom:8 }}>{c.label}</p>
                <p style={{ fontSize:13, color:'rgba(242,232,216,.6)', lineHeight:1.65 }}>{c.value}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ background:'#080604', borderTop:'1px solid #1c1410', padding:'28px 24px' }}>
        <div className="footer-inner" style={{ maxWidth:1200, margin:'0 auto', display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:16 }}>
          <div>
            <p style={{ fontFamily:'var(--font-head)', fontSize:'1.05rem', color:'var(--linen,#f2e8d8)', letterSpacing:'.05em', marginBottom:3 }}>Rural Roots</p>
            <p style={{ fontSize:10, color:'rgba(200,168,124,.35)', letterSpacing:'.12em', textTransform:'uppercase' }}>Karnataka</p>
          </div>
          <div className="footer-links" style={{ display:'flex', gap:24 }}>
            {[['/','/products','/#about','/#contact'],['Home','Products','About','Contact']].reduce((acc,_,i,arr) => i===0 ? arr[0].map((href,j) => (
              <Link key={href} href={href} style={{ fontSize:11, letterSpacing:'.1em', textTransform:'uppercase', color:'rgba(200,168,124,.35)', textDecoration:'none', transition:'color .2s' }}
                onMouseEnter={e => e.target.style.color='var(--gold,#b8832a)'}
                onMouseLeave={e => e.target.style.color='rgba(200,168,124,.35)'}>
                {arr[1][j]}
              </Link>
            )) : acc, [])}
          </div>
          <p style={{ fontSize:11, color:'rgba(200,168,124,.25)' }}>© 2025 Rural Roots · Made with 🌿 in Karnataka</p>
        </div>
      </footer>

      <style>{`
        @keyframes gfloat { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
        @keyframes spinSlow  { to{transform:rotate(360deg)} }
        @keyframes spinSlowR { to{transform:rotate(-360deg)} }

        /* Mobile overrides */
        @media(max-width:768px) {
          .hero-grid  { grid-template-columns:1fr !important; padding:40px 20px 52px !important; }
          .hero-right { display:none !important; }
          .hero-h1    { font-size:2.2rem !important; }
          .hero-chips { gap:8px !important; }
          .hero-chips > div { padding:7px 12px !important; }
          .features-grid { grid-template-columns:1fr 1fr !important; gap:12px !important; }
          .products-grid { grid-template-columns:1fr !important; }
          .products-header { flex-direction:column !important; align-items:flex-start !important; }
          .cta-banner { flex-direction:column !important; text-align:center !important; align-items:center !important; padding:28px 20px !important; }
          .stats-grid { grid-template-columns:1fr 1fr !important; gap:24px 0 !important; }
          .stats-item { border-right:none !important; padding-bottom:20px !important; border-bottom:1px solid rgba(255,255,255,.08); }
          .about-grid { grid-template-columns:1fr !important; gap:36px !important; }
          .contact-grid { grid-template-columns:1fr !important; gap:28px !important; }
          .contact-cards { grid-template-columns:1fr !important; gap:10px !important; }
          .footer-inner { flex-direction:column !important; text-align:center !important; }
          .footer-links { justify-content:center !important; flex-wrap:wrap !important; gap:16px !important; }
        }
        @media(max-width:480px) {
          .features-grid { grid-template-columns:1fr !important; }
          .hero-chips { flex-direction:column !important; }
          .about-mosaic { grid-template-columns:1fr 1fr !important; }
        }
      `}</style>
    </div>
  );
}