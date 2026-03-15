// 'use client';
// import Link from 'next/link';
// import { useCart } from '../lib/CartContext';
// import { ShoppingCart, Leaf, Menu, X, Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
// import { useState, useEffect, useRef } from 'react';

// export default function Navbar() {
//   const { cart, totalItems, totalPrice, removeFromCart, updateQty } = useCart();
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [drawerOpen, setDrawerOpen] = useState(false);
//   const [bounce, setBounce] = useState(false);
//   const [flashCount, setFlashCount] = useState(0);
//   const prevCount = useRef(totalItems);

//   // Trigger bounce + auto-open drawer when item added
//   useEffect(() => {
//     if (totalItems > prevCount.current) {
//       // Bounce the icon
//       setBounce(true);
//       setTimeout(() => setBounce(false), 700);
//       // Flash the badge
//       setFlashCount(c => c + 1);
//       // Auto open drawer
//       setDrawerOpen(true);
//       // Auto close drawer after 4 seconds
//       setTimeout(() => setDrawerOpen(false), 4000);
//     }
//     prevCount.current = totalItems;
//   }, [totalItems]);

//   const delivery = 50;
//   const grandTotal = totalPrice + delivery;

//   return (
//     <>
//       <nav style={{
//         background: '#1a0f0a',
//         borderBottom: '2px solid #4a3728',
//         position: 'sticky', top: 0, zIndex: 100,
//         boxShadow: '0 4px 20px rgba(26,15,10,0.4)'
//       }}>
//         <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 66 }}>

//           {/* Logo */}
//           <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}>
//             <Leaf size={22} color="#f5c842" />
//             <span style={{ fontFamily: 'var(--font-playfair)', fontSize: '1.25rem', fontWeight: 700, color: '#f5c842', letterSpacing: '0.02em' }}>
//               Rural Roots
//             </span>
//           </Link>

//           {/* Desktop Links */}
//           <div style={{ display: 'flex', gap: 32, alignItems: 'center' }} className="desktop-nav">
//             {['/', '/products', '/#about', '/#contact'].map((href, i) => (
//               <Link key={i} href={href} style={{ textDecoration: 'none', color: '#d4b896', fontWeight: 500, fontSize: 14, transition: 'color 0.2s' }}
//                 onMouseEnter={e => e.target.style.color = '#f5c842'}
//                 onMouseLeave={e => e.target.style.color = '#d4b896'}>
//                 {['Home', 'Products', 'About', 'Contact'][i]}
//               </Link>
//             ))}
//           </div>

//           {/* Cart button */}
//           <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
//             <button
//               onClick={() => setDrawerOpen(o => !o)}
//               style={{
//                 position: 'relative', background: 'none', border: 'none',
//                 cursor: 'pointer', color: '#f5c842', padding: 4,
//                 transition: 'transform 0.1s'
//               }}
//             >
//               {/* Cart icon with bounce */}
//               <div style={{
//                 animation: bounce ? 'cartBounce 0.6s cubic-bezier(0.36, 0.07, 0.19, 0.97)' : 'none',
//                 display: 'inline-block'
//               }}>
//                 <ShoppingCart size={26} />
//               </div>

//               {/* Badge */}
//               {totalItems > 0 && (
//                 <span key={flashCount} style={{
//                   position: 'absolute', top: -8, right: -8,
//                   background: '#d4870a', color: 'white',
//                   borderRadius: '50%', width: 22, height: 22,
//                   display: 'flex', alignItems: 'center', justifyContent: 'center',
//                   fontSize: 11, fontWeight: 800,
//                   animation: 'badgePop 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
//                   boxShadow: '0 0 0 3px rgba(212,135,10,0.3)'
//                 }}>{totalItems}</span>
//               )}
//             </button>

//             <button onClick={() => setMenuOpen(!menuOpen)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#d4b896', display: 'none' }} className="mobile-menu-btn">
//               {menuOpen ? <X size={24} /> : <Menu size={24} />}
//             </button>
//           </div>
//         </div>

//         {/* Mobile Menu */}
//         {menuOpen && (
//           <div style={{ background: '#2a1a0f', borderTop: '1px solid #4a3728', padding: '16px 24px', display: 'flex', flexDirection: 'column', gap: 18 }}>
//             {['/', '/products', '/#about', '/#contact'].map((href, i) => (
//               <Link key={i} href={href} onClick={() => setMenuOpen(false)} style={{ textDecoration: 'none', color: '#d4b896', fontWeight: 500, fontSize: 15 }}>
//                 {['Home', 'Products', 'About', 'Contact'][i]}
//               </Link>
//             ))}
//           </div>
//         )}
//       </nav>

//       {/* ── BACKDROP ── */}
//       {drawerOpen && (
//         <div
//           onClick={() => setDrawerOpen(false)}
//           style={{
//             position: 'fixed', inset: 0, background: 'rgba(26,15,10,0.5)',
//             zIndex: 200, backdropFilter: 'blur(2px)',
//             animation: 'fadeIn 0.2s ease'
//           }}
//         />
//       )}

//       {/* ── CART DRAWER ── */}
//       <div style={{
//         position: 'fixed', top: 0, right: 0, bottom: 0,
//         width: 'min(400px, 100vw)',
//         background: '#fffbf0',
//         zIndex: 201,
//         boxShadow: '-8px 0 40px rgba(26,15,10,0.25)',
//         transform: drawerOpen ? 'translateX(0)' : 'translateX(100%)',
//         transition: 'transform 0.35s cubic-bezier(0.34, 1.1, 0.64, 1)',
//         display: 'flex', flexDirection: 'column',
//         overflowY: 'auto'
//       }}>

//         {/* Drawer Header */}
//         <div style={{
//           background: '#1a0f0a', color: '#f5c842',
//           padding: '18px 20px',
//           display: 'flex', justifyContent: 'space-between', alignItems: 'center',
//           flexShrink: 0
//         }}>
//           <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
//             <ShoppingCart size={20} />
//             <span style={{ fontFamily: 'var(--font-playfair)', fontSize: '1.1rem', fontWeight: 700 }}>
//               Your Cart
//             </span>
//             {totalItems > 0 && (
//               <span style={{ background: '#d4870a', color: 'white', borderRadius: 20, padding: '2px 8px', fontSize: 12, fontWeight: 700 }}>
//                 {totalItems} item{totalItems > 1 ? 's' : ''}
//               </span>
//             )}
//           </div>
//           <button onClick={() => setDrawerOpen(false)} style={{ background: 'rgba(255,255,255,0.1)', border: 'none', color: '#f5c842', cursor: 'pointer', borderRadius: '50%', width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
//             <X size={18} />
//           </button>
//         </div>

//         {/* Empty state */}
//         {cart.length === 0 ? (
//           <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12, padding: 40 }}>
//             <ShoppingBag size={52} color="#d4b896" />
//             <p style={{ color: '#a08060', fontWeight: 600, fontSize: '1rem' }}>Your cart is empty</p>
//             <Link href="/products" onClick={() => setDrawerOpen(false)}
//               style={{ background: '#4a3728', color: '#f5c842', padding: '10px 24px', borderRadius: 8, textDecoration: 'none', fontWeight: 700, fontSize: 14 }}>
//               Browse Products
//             </Link>
//           </div>
//         ) : (
//           <>
//             {/* Cart Items */}
//             <div style={{ flex: 1, padding: '16px', display: 'flex', flexDirection: 'column', gap: 12, overflowY: 'auto' }}>
//               {cart.map(item => (
//                 <div key={item.id} style={{
//                   background: 'white', borderRadius: 12, padding: '12px',
//                   display: 'flex', gap: 12, alignItems: 'center',
//                   boxShadow: '0 2px 8px rgba(74,55,40,0.08)',
//                   border: '1px solid #f0e4d0'
//                 }}>
//                   {/* Thumbnail */}
//                   <div style={{
//                     width: 60, height: 60, borderRadius: 8, flexShrink: 0, overflow: 'hidden',
//                     background: item.category === 'Honey' ? 'radial-gradient(#ffe082,#f9a825)' : item.category === 'Oil' ? 'radial-gradient(#c8e6c9,#a5d6a7)' : 'radial-gradient(#d7ccc8,#bcaaa4)',
//                     display: 'flex', alignItems: 'center', justifyContent: 'center'
//                   }}>
//                     <img src={item.category === 'Honey' ? '/honey.png' : item.category === 'Oil' ? '/coconut-oil.png' : '/pepper.png'}
//                       style={{ width: '85%', height: '85%', objectFit: 'contain', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.15))' }} />
//                   </div>

//                   <div style={{ flex: 1, minWidth: 0 }}>
//                     <p style={{ fontWeight: 700, fontSize: 13, color: '#1a0f0a', marginBottom: 2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.name}</p>
//                     <p style={{ fontSize: 13, fontWeight: 800, color: '#d4870a' }}>₹{item.price}</p>
//                   </div>

//                   {/* Qty */}
//                   <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
//                     <button onClick={() => updateQty(item.id, item.qty - 1)} style={{ width: 26, height: 26, borderRadius: '50%', border: '1.5px solid #e0cfc0', background: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#4a3728' }}>
//                       <Minus size={11} />
//                     </button>
//                     <span style={{ fontWeight: 700, fontSize: 14, minWidth: 18, textAlign: 'center' }}>{item.qty}</span>
//                     <button onClick={() => updateQty(item.id, item.qty + 1)} style={{ width: 26, height: 26, borderRadius: '50%', border: '1.5px solid #e0cfc0', background: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#4a3728' }}>
//                       <Plus size={11} />
//                     </button>
//                   </div>

//                   <button onClick={() => removeFromCart(item.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#e63946', flexShrink: 0 }}>
//                     <Trash2 size={15} />
//                   </button>
//                 </div>
//               ))}
//             </div>

//             {/* Order Summary */}
//             <div style={{ background: 'white', borderTop: '2px dashed #e0cfc0', padding: '16px 20px', flexShrink: 0 }}>
//               <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: '#888', marginBottom: 8 }}>
//                 <span>Subtotal</span><span>₹{totalPrice.toFixed(2)}</span>
//               </div>
//               <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: '#888', marginBottom: 12 }}>
//                 <span>🚚 Delivery</span><span style={{ color: '#d4870a' }}>₹{delivery}.00</span>
//               </div>
//               <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 800, fontSize: '1.15rem', color: '#1a0f0a', marginBottom: 16 }}>
//                 <span>Total</span>
//                 <span style={{ color: '#d4870a' }}>₹{grandTotal.toFixed(2)}</span>
//               </div>
//               <Link href="/checkout" onClick={() => setDrawerOpen(false)}
//                 style={{ display: 'block', textAlign: 'center', background: '#4a3728', color: '#f5c842', padding: '14px', borderRadius: 10, textDecoration: 'none', fontWeight: 700, fontSize: '1rem', letterSpacing: '0.02em' }}>
//                 Checkout →
//               </Link>
//               <Link href="/cart" onClick={() => setDrawerOpen(false)}
//                 style={{ display: 'block', textAlign: 'center', color: '#a08060', fontSize: 13, marginTop: 10, textDecoration: 'none' }}>
//                 View full cart
//               </Link>
//             </div>
//           </>
//         )}
//       </div>

//       <style>{`
//         @media (max-width: 768px) {
//           .desktop-nav { display: none !important; }
//           .mobile-menu-btn { display: block !important; }
//         }
//         @keyframes cartBounce {
//           0%, 100% { transform: translateY(0) rotate(0); }
//           20%       { transform: translateY(-8px) rotate(-8deg); }
//           40%       { transform: translateY(-4px) rotate(6deg); }
//           60%       { transform: translateY(-6px) rotate(-4deg); }
//           80%       { transform: translateY(-2px) rotate(2deg); }
//         }
//         @keyframes badgePop {
//           0%   { transform: scale(0); opacity: 0; }
//           60%  { transform: scale(1.35); }
//           100% { transform: scale(1); opacity: 1; }
//         }
//         @keyframes fadeIn {
//           from { opacity: 0; }
//           to   { opacity: 1; }
//         }
//       `}</style>
//     </>
//   );
// }

'use client';
import Link from 'next/link';
import { useCart } from '../lib/CartContext';
import { X, Trash2, Plus, Minus, ArrowRight, Package } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

const IMGS = { Honey: '/honey.png', Oil: '/coconut-oil.png', Spices: '/pepper.png' };
const BGS  = { Honey: 'linear-gradient(135deg,#fff3c4,#ffd54f)', Oil: 'linear-gradient(135deg,#dcedc8,#aed581)', Spices: 'linear-gradient(135deg,#d7ccc8,#a1887f)' };

export default function Navbar() {
  const { cart, totalItems, totalPrice, removeFromCart, updateQty } = useCart();
  const [scrolled, setScrolled]   = useState(false);
  const [cartOpen, setCartOpen]   = useState(false);
  const [shake,    setShake]      = useState(false);
  const [badgeKey, setBadgeKey]   = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);
  const prevTotal = useRef(totalItems);
  const delivery  = 50;
  const grand     = totalPrice + delivery;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (totalItems > prevTotal.current) {
      setShake(true);  setTimeout(() => setShake(false), 700);
      setBadgeKey(k => k + 1);
      setCartOpen(true); setTimeout(() => setCartOpen(false), 4000);
    }
    prevTotal.current = totalItems;
  }, [totalItems]);

  const NAV_BG = scrolled ? 'rgba(250,246,240,0.96)' : 'transparent';
  const NAV_SHADOW = scrolled ? '0 1px 0 rgba(28,20,16,0.08)' : 'none';
  const LOGO_COLOR = scrolled ? 'var(--ink)' : '#ffffff';
  const LINK_COLOR = scrolled ? 'var(--clay)' : 'rgba(255,255,255,0.75)';
  const LINK_HOVER = scrolled ? 'var(--ink)' : '#ffffff';

  return (
    <>
      {/* ── NAV ── */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 400,
        height: 64,
        background: NAV_BG,
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        boxShadow: NAV_SHADOW,
        transition: 'all 0.4s ease',
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 32px', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

          {/* Logo */}
          <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10 }}>
            {/* Leaf icon */}
            <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'linear-gradient(135deg, #b8832a, #d4961e)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: '0 4px 12px rgba(184,131,42,0.4)', transition: 'all 0.4s' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>
              </svg>
            </div>
            {/* Text */}
            <div style={{ lineHeight: 1.15 }}>
              <div style={{ fontFamily: 'var(--font-head, Playfair Display, serif)', fontSize: '2.0rem', fontWeight: 600, color: LOGO_COLOR, letterSpacing: '0.03em', transition: 'color 0.4s' }}>
                Rural Roots
              </div>
              <div style={{ fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#b8832a', fontWeight: 500, marginTop: 1 }}>
                Farm Fresh
              </div>
            </div>
          </Link>

          {/* Desktop nav links */}
          <div className="hide-mobile" style={{ display: 'flex', gap: 36, alignItems: 'center' }}>
            {[['/', 'Home'], ['/products', 'Products'], ['/#about', 'About'], ['/#contact', 'Contact']].map(([href, label]) => (
              <Link key={href} href={href} style={{
                fontFamily: 'var(--font-body, Jost, sans-serif)',
                fontSize: 12, fontWeight: 500, letterSpacing: '0.1em',
                textTransform: 'uppercase', color: LINK_COLOR,
                textDecoration: 'none', transition: 'color 0.3s',
              }}
                onMouseEnter={e => e.currentTarget.style.color = LINK_HOVER}
                onMouseLeave={e => e.currentTarget.style.color = LINK_COLOR}>
                {label}
              </Link>
            ))}
          </div>

          {/* Cart + mobile */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <button
              onClick={() => setCartOpen(o => !o)}
              style={{ position: 'relative', background: 'none', border: 'none', padding: '6px', display: 'flex', alignItems: 'center' }}
              aria-label="Open cart">
              <div style={{ animation: shake ? 'shake 0.6s ease' : 'none' }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
                  stroke={scrolled ? 'var(--ink)' : 'white'}
                  strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
                  style={{ transition: 'stroke 0.4s' }}>
                  <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
                  <line x1="3" y1="6" x2="21" y2="6"/>
                  <path d="M16 10a4 4 0 01-8 0"/>
                </svg>
              </div>
              {totalItems > 0 && (
                <span key={badgeKey} style={{
                  position: 'absolute', top: 0, right: 0,
                  width: 18, height: 18, borderRadius: '50%',
                  background: 'var(--gold)', color: 'white',
                  fontSize: 9, fontWeight: 700,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  animation: 'pop 0.35s cubic-bezier(0.34,1.56,0.64,1) both',
                }}>
                  {totalItems}
                </span>
              )}
            </button>

            {/* Mobile hamburger */}
            <button
              className="show-mobile" style={{ display: 'none', background: 'none', border: 'none', flexDirection: 'column', gap: 5, padding: 4 }}
              onClick={() => setMobileOpen(o => !o)}>
              {[0,1,2].map(i => (
                <span key={i} style={{ display: 'block', width: 22, height: 1.5, background: scrolled ? 'var(--ink)' : 'white', transition: 'background 0.4s' }} />
              ))}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div style={{ background: 'var(--cream)', borderTop: '1px solid var(--linen)', padding: '20px 32px', display: 'flex', flexDirection: 'column', gap: 20 }}>
            {[['/', 'Home'], ['/products', 'Products'], ['/#about', 'About'], ['/#contact', 'Contact']].map(([href, label]) => (
              <Link key={href} href={href} onClick={() => setMobileOpen(false)}
                style={{ fontFamily: 'var(--ff-body)', fontSize: 13, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--clay)', textDecoration: 'none' }}>
                {label}
              </Link>
            ))}
          </div>
        )}
      </nav>

      {/* ── BACKDROP ── */}
      {cartOpen && (
        <div onClick={() => setCartOpen(false)}
          style={{ position: 'fixed', inset: 0, background: 'rgba(28,20,16,0.5)', zIndex: 500, backdropFilter: 'blur(4px)', animation: 'fiu 0.25s ease' }} />
      )}

      {/* ── CART DRAWER ── */}
      <aside style={{
        position: 'fixed', top: 0, right: 0, bottom: 0,
        width: 'min(380px, 100vw)', zIndex: 600,
        background: 'var(--cream)',
        boxShadow: '-16px 0 48px rgba(28,20,16,0.18)',
        transform: cartOpen ? 'translateX(0)' : 'translateX(100%)',
        transition: 'transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)',
        display: 'flex', flexDirection: 'column',
      }}>

        {/* Header */}
        <div style={{ padding: '24px 24px 18px', borderBottom: '1px solid var(--linen)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0 }}>
          <div>
            <h3 style={{ fontFamily: 'var(--ff-head, Playfair Display, serif)', fontSize: '1.4rem', color: 'var(--ink)' }}>Your Cart</h3>
            <p style={{ fontSize: 11, color: 'var(--sand)', marginTop: 3, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              {totalItems === 0 ? 'Empty' : `${totalItems} item${totalItems > 1 ? 's' : ''}`}
            </p>
          </div>
          <button onClick={() => setCartOpen(false)}
            style={{ width: 36, height: 36, borderRadius: '50%', border: '1px solid var(--linen)', background: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--clay)', transition: 'all 0.2s' }}
            onMouseEnter={e => { e.currentTarget.style.background = 'var(--ink)'; e.currentTarget.style.color = 'var(--linen)'; e.currentTarget.style.borderColor = 'var(--ink)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'none'; e.currentTarget.style.color = 'var(--clay)'; e.currentTarget.style.borderColor = 'var(--linen)'; }}>
            <X size={15} />
          </button>
        </div>

        {/* Items */}
        {cart.length === 0 ? (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16, padding: 40, textAlign: 'center' }}>
            <Package size={52} color="var(--linen)" strokeWidth={1} />
            <p style={{ fontFamily: 'var(--ff-head)', fontSize: '1.3rem', color: 'var(--earth)', fontStyle: 'italic' }}>Nothing added yet</p>
            <p style={{ fontSize: 13, color: 'var(--sand)', lineHeight: 1.6 }}>Browse our farm fresh products</p>
            <Link href="/products" onClick={() => setCartOpen(false)}
              style={{ marginTop: 8, display: 'inline-block', background: 'var(--ink)', color: 'var(--linen)', padding: '11px 22px', borderRadius: 3, textDecoration: 'none', fontSize: 11, fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              Shop Now
            </Link>
          </div>
        ) : (
          <>
            <div style={{ flex: 1, overflowY: 'auto', padding: '16px 24px', display: 'flex', flexDirection: 'column', gap: 16 }}>
              {cart.map(item => (
                <div key={item.id} style={{ display: 'flex', gap: 14, alignItems: 'center', paddingBottom: 16, borderBottom: '1px solid var(--linen)' }}>
                  <div style={{ width: 60, height: 60, borderRadius: 6, background: BGS[item.category] || 'var(--linen)', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <img src={IMGS[item.category] || '/honey.png'} style={{ width: '80%', height: '80%', objectFit: 'contain', filter: 'drop-shadow(0 3px 6px rgba(0,0,0,0.15))' }} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontSize: 13.5, fontWeight: 500, color: 'var(--ink)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', marginBottom: 4 }}>{item.name}</p>
                    <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--gold)' }}>₹{item.price}</p>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <button onClick={() => updateQty(item.id, item.qty - 1)}
                      style={{ width: 26, height: 26, borderRadius: '50%', border: '1px solid var(--linen)', background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s' }}
                      onMouseEnter={e => e.currentTarget.style.background = 'var(--linen)'}
                      onMouseLeave={e => e.currentTarget.style.background = 'white'}>
                      <Minus size={10} color="var(--earth)" />
                    </button>
                    <span style={{ fontSize: 14, fontWeight: 600, minWidth: 20, textAlign: 'center' }}>{item.qty}</span>
                    <button onClick={() => updateQty(item.id, item.qty + 1)}
                      style={{ width: 26, height: 26, borderRadius: '50%', border: '1px solid var(--linen)', background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s' }}
                      onMouseEnter={e => e.currentTarget.style.background = 'var(--linen)'}
                      onMouseLeave={e => e.currentTarget.style.background = 'white'}>
                      <Plus size={10} color="var(--earth)" />
                    </button>
                  </div>
                  <button onClick={() => removeFromCart(item.id)}
                    style={{ background: 'none', border: 'none', color: 'var(--linen)', padding: 4, transition: 'color 0.2s' }}
                    onMouseEnter={e => e.currentTarget.style.color = '#c0392b'}
                    onMouseLeave={e => e.currentTarget.style.color = 'var(--linen)'}>
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div style={{ padding: '16px 24px 24px', borderTop: '1px solid var(--linen)', flexShrink: 0 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: 'var(--clay)', marginBottom: 8 }}>
                <span>Subtotal</span><span>₹{totalPrice.toFixed(2)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: 'var(--clay)', paddingBottom: 16, marginBottom: 16, borderBottom: '1px dashed var(--linen)' }}>
                <span>Delivery</span><span style={{ color: 'var(--gold)' }}>₹{delivery}.00</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 18 }}>
                <span style={{ fontFamily: 'var(--ff-head)', fontSize: '1.15rem' }}>Total</span>
                <span style={{ fontFamily: 'var(--ff-head)', fontSize: '1.15rem', color: 'var(--gold)' }}>₹{grand.toFixed(2)}</span>
              </div>
              <Link href="/checkout" onClick={() => setCartOpen(false)}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, background: 'var(--ink)', color: 'var(--linen)', padding: '14px', borderRadius: 3, textDecoration: 'none', fontSize: 11, fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', transition: 'background 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.background = 'var(--earth)'}
                onMouseLeave={e => e.currentTarget.style.background = 'var(--ink)'}>
                Proceed to Checkout <ArrowRight size={13} />
              </Link>
              <Link href="/cart" onClick={() => setCartOpen(false)}
                style={{ display: 'block', textAlign: 'center', fontSize: 12, color: 'var(--sand)', marginTop: 12, textDecoration: 'none' }}>
                View full cart
              </Link>
            </div>
          </>
        )}
      </aside>

      <style>{`
        @keyframes fiu { from{opacity:0} to{opacity:1} }
        @keyframes pop { 0%{transform:scale(0)} 70%{transform:scale(1.3)} 100%{transform:scale(1)} }
        @keyframes shake { 0%,100%{transform:rotate(0)} 20%{transform:rotate(-12deg)} 40%{transform:rotate(10deg)} 60%{transform:rotate(-8deg)} 80%{transform:rotate(5deg)} }
      `}</style>
    </>
  );
}