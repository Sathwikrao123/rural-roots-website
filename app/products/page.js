// 'use client';
// export const dynamic = 'force-dynamic';
// import { useEffect, useState } from 'react';
// import { supabase } from '../../lib/supabase';
// import { useCart } from '../../lib/CartContext';
// import { Search, SlidersHorizontal, X } from 'lucide-react';
// import toast from 'react-hot-toast';

// function getImg(category) {
//   if (category === 'Honey') return '/honey.png';
//   if (category === 'Oil')   return '/coconut-oil.png';
//   return '/pepper.png';
// }
// function getBg(category) {
//   if (category === 'Honey') return 'radial-gradient(ellipse at 60% 40%, #ffe082 0%, #ffca28 55%, #f9a825 100%)';
//   if (category === 'Oil')   return 'radial-gradient(ellipse at 60% 40%, #e8f5e9 0%, #c8e6c9 55%, #a5d6a7 100%)';
//   return 'radial-gradient(ellipse at 60% 40%, #efebe9 0%, #d7ccc8 55%, #bcaaa4 100%)';
// }

// function ProductCard({ group, index }) {
//   const { addToCart } = useCart();
//   const variants = group.items;
//   const [selIdx, setSelIdx] = useState(0);
//   const [added, setAdded] = useState(false);
//   const selected = variants[selIdx];
//   const img = getImg(selected.category);

//   function handleAdd() {
//     addToCart(selected);
//     setAdded(true);
//     setTimeout(() => setAdded(false), 1400);
//     toast.success(`🛒 ${selected.name} added!`, { style:{ background:'#1a0f0a', color:'#f5c842', fontWeight:600 } });
//   }

//   return (
//     <div className="card reveal" style={{ animationDelay:`${index * 0.1}s`, '--delay':`${index * 0.1}s` }}>
//       {/* Image */}
//       <div style={{ height:260, background:getBg(selected.category), position:'relative', overflow:'hidden', borderRadius:'20px 20px 0 0', display:'flex', alignItems:'flex-end', justifyContent:'center' }}>
//         <div style={{ position:'absolute', bottom:-40, left:'50%', transform:'translateX(-50%)', width:200, height:200, borderRadius:'50%', background:'rgba(255,255,255,0.2)', filter:'blur(30px)', pointerEvents:'none' }} />
//         <span style={{ position:'absolute', top:14, left:14, background:'rgba(26,15,10,0.78)', color:'#f5c842', padding:'5px 13px', borderRadius:20, fontSize:11, fontWeight:700, backdropFilter:'blur(8px)', letterSpacing:'0.07em', textTransform:'uppercase' }}>
//           {selected.category}
//         </span>
//         {selected.stock > 0 && selected.stock < 20 && (
//           <span style={{ position:'absolute', top:14, right:14, background:'#e63946', color:'white', padding:'4px 10px', borderRadius:20, fontSize:10, fontWeight:700 }}>
//             Low Stock!
//           </span>
//         )}
//         <img src={img} alt={selected.name}
//           style={{ width:'68%', height:'94%', objectFit:'contain', objectPosition:'center bottom', transition:'transform 0.45s cubic-bezier(0.34,1.56,0.64,1)', filter:'drop-shadow(0 18px 28px rgba(0,0,0,0.22))', position:'relative', zIndex:2 }}
//           onMouseEnter={e => e.target.style.transform='scale(1.12) translateY(-12px) rotate(-1.5deg)'}
//           onMouseLeave={e => e.target.style.transform='scale(1) translateY(0) rotate(0)'}
//         />
//       </div>

//       {/* Content */}
//       <div style={{ padding:'22px 22px 26px' }}>
//         <h3 style={{ fontFamily:'var(--font-playfair)', fontSize:'1.18rem', color:'#1a0f0a', marginBottom:6 }}>{group.name}</h3>
//         <p style={{ fontSize:12.5, color:'#999', lineHeight:1.6, marginBottom:16 }}>{selected.description?.split('.')[0]}.</p>

//         <p style={{ fontSize:10, fontWeight:700, letterSpacing:'0.12em', color:'#bbb', marginBottom:9 }}>CHOOSE SIZE</p>
//         <div style={{ display:'flex', gap:9, marginBottom:18 }}>
//           {variants.map((v, i) => {
//             const isSel = i === selIdx;
//             return (
//               <button key={v.id} onClick={() => setSelIdx(i)} style={{
//                 flex:1, padding:'10px 6px', borderRadius:12,
//                 border: isSel ? '2px solid #d4870a' : '2px solid #ead8b8',
//                 background: isSel ? '#4a3728' : 'white', cursor:'pointer',
//                 transition:'all 0.28s cubic-bezier(0.34,1.4,0.64,1)',
//                 transform: isSel ? 'scale(1.06)' : 'scale(1)',
//                 boxShadow: isSel ? '0 4px 16px rgba(74,55,40,0.25)' : 'none'
//               }}>
//                 <div style={{ fontSize:11, fontWeight:600, color: isSel ? '#f5c842' : '#999', marginBottom:2 }}>{v.name.split('–')[1]?.trim()}</div>
//                 <div style={{ fontSize:15, fontWeight:700, color: isSel ? '#f5c842' : '#d4870a', fontFamily:'var(--font-dm)' }}>₹{v.price}</div>
//               </button>
//             );
//           })}
//         </div>

//         <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', borderTop:'1px solid #f0e8dc', paddingTop:16 }}>
//           <div>
//             <p style={{ fontSize:11, color:'#bbb', marginBottom:2 }}>Selected price</p>
//             <p style={{ fontSize:'1.45rem', fontWeight:700, color:'#d4870a', fontFamily:'var(--font-dm)', lineHeight:1 }}>₹{selected.price}</p>
//           </div>
//           <button
//             onClick={handleAdd}
//             style={{
//               padding:'12px 22px', borderRadius:50, border:'none', cursor:'pointer',
//               background: added ? '#22c55e' : '#4a3728',
//               color: added ? 'white' : '#f5c842',
//               fontWeight:700, fontSize:'0.9rem', fontFamily:'var(--font-dm)',
//               transition:'all 0.3s cubic-bezier(0.34,1.56,0.64,1)',
//               transform: added ? 'scale(1.08)' : 'scale(1)',
//               boxShadow: added ? '0 8px 20px rgba(34,197,94,0.35)' : '0 4px 14px rgba(74,55,40,0.25)'
//             }}>
//             {added ? '✓ Added!' : '+ Add to Cart'}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default function Products() {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [search, setSearch] = useState('');
//   const [category, setCategory] = useState('All');
//   const [visible, setVisible] = useState(false);

//   useEffect(() => {
//     setTimeout(() => setVisible(true), 50);
//     async function load() {
//       const { data } = await supabase.from('products').select('*').eq('active', true).order('category');
//       if (data) {
//         const groups = {};
//         data.forEach(p => {
//           const base = p.name.split('–')[0].trim();
//           if (!groups[base]) groups[base] = { name:base, items:[] };
//           groups[base].items.push(p);
//         });
//         setProducts(Object.values(groups));
//       }
//       setLoading(false);
//     }
//     load();
//   }, []);

//   useEffect(() => {
//     const els = document.querySelectorAll('.reveal,.reveal-left,.reveal-right');
//     const obs = new IntersectionObserver(entries => entries.forEach(e => { if(e.isIntersecting) e.target.classList.add('visible'); }), { threshold:0.1 });
//     els.forEach(el => obs.observe(el));
//     return () => obs.disconnect();
//   }, [products]);

//   const cats = ['All', ...new Set(products.flatMap(g => g.items.map(i => i.category)))];
//   const filtered = products.filter(g => {
//     const matchCat = category === 'All' || g.items[0].category === category;
//     const matchSearch = g.name.toLowerCase().includes(search.toLowerCase());
//     return matchCat && matchSearch;
//   });

//   return (
//     <div style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(24px)', transition:'all 0.6s cubic-bezier(0.22,1,0.36,1)' }}>

//       {/* Hero Banner */}
//       <div style={{ background:'linear-gradient(135deg, #1a0f0a 0%, #4a3728 60%, #7a5c40 100%)', padding:'70px 24px 80px', textAlign:'center', position:'relative', overflow:'hidden' }}>
//         <div style={{ position:'absolute', top:-60, right:-60, width:300, height:300, borderRadius:'50%', background:'rgba(245,200,66,0.06)', border:'1px solid rgba(245,200,66,0.1)' }} />
//         <p style={{ fontSize:11, fontWeight:700, letterSpacing:'0.18em', color:'#d4870a', textTransform:'uppercase', marginBottom:12, animation:'slideUp 0.5s both' }}>BROWSE OUR COLLECTION</p>
//         <h1 style={{ fontFamily:'var(--font-playfair)', fontSize:'clamp(2rem,4vw,3rem)', color:'white', marginBottom:14, animation:'slideUp 0.5s 0.1s both' }}>Farm Fresh Products</h1>
//         <p style={{ color:'rgba(255,255,255,0.6)', fontSize:'1rem', animation:'slideUp 0.5s 0.2s both' }}>Pure, natural and sourced directly from farms</p>
//       </div>

//       {/* Sticky Filter Bar */}
//       <div style={{ background:'white', borderBottom:'1px solid #f0e8dc', position:'sticky', top:66, zIndex:50, boxShadow:'0 4px 20px rgba(74,55,40,0.08)', animation:'slideUp 0.5s 0.3s both' }}>
//         <div style={{ maxWidth:1200, margin:'0 auto', padding:'16px 24px', display:'flex', gap:16, alignItems:'center', flexWrap:'wrap' }}>
//           {/* Search */}
//           <div style={{ position:'relative', flex:'1', minWidth:200 }}>
//             <Search size={15} color="#bbb" style={{ position:'absolute', left:13, top:'50%', transform:'translateY(-50%)' }} />
//             <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search products..."
//               style={{ width:'100%', paddingLeft:38, paddingRight: search ? 36 : 14, paddingTop:10, paddingBottom:10, border:'1.5px solid #ead8b8', borderRadius:50, fontSize:13.5, outline:'none', background:'#fffbf0', transition:'border-color 0.2s', fontFamily:'var(--font-dm)' }}
//               onFocus={e => e.target.style.borderColor='#d4870a'}
//               onBlur={e => e.target.style.borderColor='#ead8b8'}
//             />
//             {search && <button onClick={() => setSearch('')} style={{ position:'absolute', right:12, top:'50%', transform:'translateY(-50%)', background:'none', border:'none', cursor:'pointer', color:'#bbb' }}><X size={14} /></button>}
//           </div>

//           {/* Category pills */}
//           <div style={{ display:'flex', gap:8, flexWrap:'wrap', alignItems:'center' }}>
//             <SlidersHorizontal size={15} color="#aaa" />
//             {cats.map(cat => (
//               <button key={cat} onClick={() => setCategory(cat)} style={{
//                 padding:'8px 18px', borderRadius:50, border:'none', cursor:'pointer', fontWeight:600, fontSize:13,
//                 background: category === cat ? '#4a3728' : '#f5ede0',
//                 color: category === cat ? '#f5c842' : '#7a5c40',
//                 transition:'all 0.25s cubic-bezier(0.34,1.4,0.64,1)',
//                 transform: category === cat ? 'scale(1.07)' : 'scale(1)',
//                 boxShadow: category === cat ? '0 4px 14px rgba(74,55,40,0.25)' : 'none'
//               }}>{cat}</button>
//             ))}
//           </div>

//           <span style={{ fontSize:13, color:'#bbb', whiteSpace:'nowrap' }}>{filtered.length} product{filtered.length !== 1 ? 's' : ''}</span>
//         </div>
//       </div>

//       {/* Products Grid */}
//       <div style={{ maxWidth:1200, margin:'0 auto', padding:'48px 24px 80px' }}>
//         {loading ? (
//           <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(300px,1fr))', gap:28 }}>
//             {[1,2,3].map(i => <div key={i} className="shimmer" style={{ height:440, borderRadius:20 }} />)}
//           </div>
//         ) : filtered.length === 0 ? (
//           <div style={{ textAlign:'center', padding:'80px 20px' }}>
//             <div style={{ fontSize:52, marginBottom:16 }}>🔍</div>
//             <h3 style={{ fontFamily:'var(--font-playfair)', color:'#4a3728', marginBottom:8 }}>No products found</h3>
//             <p style={{ color:'#aaa' }}>Try a different search or category</p>
//             <button onClick={() => { setSearch(''); setCategory('All'); }} style={{ marginTop:20, padding:'10px 24px', borderRadius:50, background:'#4a3728', color:'#f5c842', border:'none', fontWeight:700, cursor:'pointer' }}>Clear Filters</button>
//           </div>
//         ) : (
//           <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(300px,1fr))', gap:28 }}>
//             {filtered.map((g, i) => <ProductCard key={g.name} group={g} index={i} />)}
//           </div>
//         )}
//       </div>

//       <style>{`@media(max-width:768px){.filter-bar{flex-direction:column!important;align-items:stretch!important}}`}</style>
//     </div>
//   );
// }



'use client';
export const dynamic = 'force-dynamic';
import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { useCart } from '../../lib/CartContext';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import toast from 'react-hot-toast';

/* ✅ UPDATED IMAGE FUNCTION */
function getImg(category) {
  if (category === 'Honey') return '/honey.png';
  if (category === 'Oil')   return '/coconut-oil.png';
  if (category === 'Pickle') return '/Pickle.png'; // ✅ NEW
  return '/pepper.png';
}

/* ✅ UPDATED BACKGROUND FUNCTION */
function getBg(category) {
  if (category === 'Honey') return 'radial-gradient(ellipse at 60% 40%, #ffe082 0%, #ffca28 55%, #f9a825 100%)';
  if (category === 'Oil')   return 'radial-gradient(ellipse at 60% 40%, #e8f5e9 0%, #c8e6c9 55%, #a5d6a7 100%)';
  if (category === 'Pickle') return 'radial-gradient(ellipse at 60% 40%, #fff3e0 0%, #ffcc80 55%, #fb8c00 100%)'; // ✅ NEW
  return 'radial-gradient(ellipse at 60% 40%, #efebe9 0%, #d7ccc8 55%, #bcaaa4 100%)';
}

function ProductCard({ group, index }) {
  const { addToCart } = useCart();
  const variants = group.items;
  const [selIdx, setSelIdx] = useState(0);
  const [added, setAdded] = useState(false);
  const selected = variants[selIdx];
  const img = getImg(selected.category);

  function handleAdd() {
    addToCart(selected);
    setAdded(true);
    setTimeout(() => setAdded(false), 1400);
    toast.success(`🛒 ${selected.name} added!`, { style:{ background:'#1a0f0a', color:'#f5c842', fontWeight:600 } });
  }

  return (
    <div className="card reveal" style={{ animationDelay:`${index * 0.1}s`, '--delay':`${index * 0.1}s` }}>
      
      {/* Image */}
      <div style={{ height:260, background:getBg(selected.category), position:'relative', overflow:'hidden', borderRadius:'20px 20px 0 0', display:'flex', alignItems:'flex-end', justifyContent:'center' }}>
        
        <div style={{ position:'absolute', bottom:-40, left:'50%', transform:'translateX(-50%)', width:200, height:200, borderRadius:'50%', background:'rgba(255,255,255,0.2)', filter:'blur(30px)', pointerEvents:'none' }} />
        
        <span style={{ position:'absolute', top:14, left:14, background:'rgba(26,15,10,0.78)', color:'#f5c842', padding:'5px 13px', borderRadius:20, fontSize:11, fontWeight:700, backdropFilter:'blur(8px)', letterSpacing:'0.07em', textTransform:'uppercase' }}>
          {selected.category}
        </span>

        {selected.stock > 0 && selected.stock < 20 && (
          <span style={{ position:'absolute', top:14, right:14, background:'#e63946', color:'white', padding:'4px 10px', borderRadius:20, fontSize:10, fontWeight:700 }}>
            Low Stock!
          </span>
        )}

        <img src={img} alt={selected.name}
          style={{ width:'68%', height:'94%', objectFit:'contain', objectPosition:'center bottom', transition:'transform 0.45s cubic-bezier(0.34,1.56,0.64,1)', filter:'drop-shadow(0 18px 28px rgba(0,0,0,0.22))', position:'relative', zIndex:2 }}
          onMouseEnter={e => e.target.style.transform='scale(1.12) translateY(-12px) rotate(-1.5deg)'}
          onMouseLeave={e => e.target.style.transform='scale(1) translateY(0) rotate(0)'}
        />
      </div>

      {/* Content */}
      <div style={{ padding:'22px 22px 26px' }}>
        <h3 style={{ fontFamily:'var(--font-playfair)', fontSize:'1.18rem', color:'#1a0f0a', marginBottom:6 }}>
          {group.name}
        </h3>

        <p style={{ fontSize:12.5, color:'#999', lineHeight:1.6, marginBottom:16 }}>
          {selected.description?.split('.')[0]}.
        </p>

        <p style={{ fontSize:10, fontWeight:700, letterSpacing:'0.12em', color:'#bbb', marginBottom:9 }}>
          CHOOSE SIZE
        </p>

        <div style={{ display:'flex', gap:9, marginBottom:18 }}>
          {variants.map((v, i) => {
            const isSel = i === selIdx;
            return (
              <button key={v.id} onClick={() => setSelIdx(i)} style={{
                flex:1, padding:'10px 6px', borderRadius:12,
                border: isSel ? '2px solid #d4870a' : '2px solid #ead8b8',
                background: isSel ? '#4a3728' : 'white',
                cursor:'pointer',
                transform: isSel ? 'scale(1.06)' : 'scale(1)'
              }}>
                <div style={{ fontSize:11, fontWeight:600, color: isSel ? '#f5c842' : '#999' }}>
                  {v.name.split('–')[1]?.trim()}
                </div>
                <div style={{ fontSize:15, fontWeight:700, color: isSel ? '#f5c842' : '#d4870a' }}>
                  ₹{v.price}
                </div>
              </button>
            );
          })}
        </div>

        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', borderTop:'1px solid #f0e8dc', paddingTop:16 }}>
          <div>
            <p style={{ fontSize:11, color:'#bbb' }}>Selected price</p>
            <p style={{ fontSize:'1.45rem', fontWeight:700, color:'#d4870a' }}>
              ₹{selected.price}
            </p>
          </div>

          <button onClick={handleAdd} style={{
            padding:'12px 22px', borderRadius:50, border:'none',
            background:'#4a3728', color:'#f5c842', fontWeight:700,
            cursor:'pointer'
          }}>
            + Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');

  useEffect(() => {
    async function load() {
      const { data } = await supabase
        .from('products')
        .select('*')
        .eq('active', true)
        .order('category');

      if (data) {
        const groups = {};
        data.forEach(p => {
          const base = p.name.split('–')[0].trim();
          if (!groups[base]) groups[base] = { name: base, items: [] };
          groups[base].items.push(p);
        });
        setProducts(Object.values(groups));
      }
      setLoading(false);
    }
    load();
  }, []);

  const cats = ['All', ...new Set(products.flatMap(g => g.items.map(i => i.category)))];

  const filtered = products.filter(g => {
    const matchCat = category === 'All' || g.items[0].category === category;
    const matchSearch = g.name.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div>

      <div style={{ padding:20 }}>
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search..."
        />

        {cats.map(cat => (
          <button key={cat} onClick={() => setCategory(cat)}>
            {cat}
          </button>
        ))}
      </div>

      {loading ? <p>Loading...</p> : (
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(300px,1fr))', gap:20 }}>
          {filtered.map((g, i) => (
            <ProductCard key={g.name} group={g} index={i} />
          ))}
        </div>
      )}
    </div>
  );
}
