'use client';
import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Package, ShoppingBag, Users, TrendingUp, Plus, Trash2 } from 'lucide-react';

export default function Admin() {
  const [tab, setTab] = useState('dashboard');
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [stats, setStats] = useState({ orders: 0, products: 0, customers: 0, revenue: 0 });
  const [newProduct, setNewProduct] = useState({ name: '', description: '', price: '', stock: '', category: '' });
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState('');
  const [auth, setAuth] = useState(false);

  // ✅ useEffect MUST be before any conditional return
  useEffect(() => {
    if (auth) loadAll();
  }, [auth]);

  async function loadAll() {
    const [o, p, c] = await Promise.all([
      supabase.from('orders').select('*, customers(name, phone)').order('created_at', { ascending: false }),
      supabase.from('products').select('*').order('created_at', { ascending: false }),
      supabase.from('customers').select('*').order('created_at', { ascending: false }),
    ]);
    if (o.data) setOrders(o.data);
    if (p.data) setProducts(p.data);
    if (c.data) setCustomers(c.data);
    const revenue = o.data?.reduce((sum, x) => sum + (x.total || 0), 0) || 0;
    setStats({ orders: o.data?.length || 0, products: p.data?.length || 0, customers: c.data?.length || 0, revenue });
  }

  async function addProduct() {
    if (!newProduct.name || !newProduct.price) { alert('Name and price required'); return; }
    setLoading(true);
    await supabase.from('products').insert({ ...newProduct, price: parseFloat(newProduct.price), stock: parseInt(newProduct.stock) || 0, active: true });
    setNewProduct({ name: '', description: '', price: '', stock: '', category: '' });
    await loadAll();
    setLoading(false);
    alert('Product added!');
  }

  async function deleteProduct(id) {
    if (!confirm('Delete this product?')) return;
    await supabase.from('products').delete().eq('id', id);
    await loadAll();
  }

  async function updateOrderStatus(id, status) {
    await supabase.from('orders').update({ status }).eq('id', id);
    await loadAll();
  }

  // ✅ Conditional return AFTER all hooks
  if (!auth) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#fffbf0' }}>
      <div style={{ background: 'white', padding: 40, borderRadius: 16, boxShadow: '0 4px 24px rgba(0,0,0,0.1)', textAlign: 'center', width: 320 }}>
        <h2 style={{ fontFamily: 'var(--font-playfair)', color: '#1a0f0a', marginBottom: 8 }}>Admin Login</h2>
        <p style={{ color: '#aaa', fontSize: 13, marginBottom: 20 }}>Rural Roots Dashboard</p>
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Enter admin password"
          style={{ width: '100%', padding: '12px', border: '1.5px solid #ddd', borderRadius: 8, fontSize: 14, marginBottom: 14, outline: 'none' }}
          onKeyDown={e => e.key === 'Enter' && (password === 'ruralroots2024' ? setAuth(true) : alert('Wrong password'))}
        />
        <button className="btn-primary" style={{ width: '100%' }}
          onClick={() => password === 'ruralroots2024' ? setAuth(true) : alert('Wrong password')}>
          Login
        </button>
        <p style={{ fontSize: 11, color: '#aaa', marginTop: 12 }}>Default password: ruralroots2024</p>
      </div>
    </div>
  );

  const tabStyle = (t) => ({
    padding: '10px 20px', border: 'none', borderRadius: 8, cursor: 'pointer', fontWeight: 600,
    fontSize: 14, background: tab === t ? '#2d6a4f' : 'white',
    color: tab === t ? 'white' : '#555', transition: 'all 0.2s'
  });

  const inputStyle = { padding: '10px 12px', border: '1px solid #ddd', borderRadius: 8, fontSize: 13, outline: 'none', width: '100%' };

  return (
    <div style={{ minHeight: '100vh', background: '#fffbf0' }}>
      {/* Header */}
      <div style={{ background: '#1a0f0a', color: 'white', padding: '20px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ fontFamily: 'var(--font-playfair)', fontSize: '1.4rem' }}>🌿 RRA</h1>
        <button onClick={() => setAuth(false)} style={{ background: 'rgba(255,255,255,0.15)', border: 'none', color: 'white', padding: '8px 16px', borderRadius: 6, cursor: 'pointer', fontSize: 13 }}>
          Logout
        </button>
      </div>

      <div style={{ padding: '24px 32px', maxWidth: 1200, margin: '0 auto' }}>
        {/* Tabs */}
        <div style={{ display: 'flex', gap: 10, marginBottom: 28, flexWrap: 'wrap' }}>
          {['dashboard', 'orders', 'products', 'customers'].map(t => (
            <button key={t} style={tabStyle(t)} onClick={() => setTab(t)}>
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>

        {/* ── DASHBOARD ── */}
        {tab === 'dashboard' && (
          <div>
            <h2 style={{ fontFamily: 'var(--font-playfair)', color: '#1a0f0a', marginBottom: 24 }}>Overview</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 20, marginBottom: 32 }}>
              {[
                { icon: <ShoppingBag size={28} color="#2d6a4f" />, label: 'Total Orders', value: stats.orders, color: '#d8f3dc' },
                { icon: <Package size={28} color="#bc6c25" />, label: 'Products', value: stats.products, color: '#ffe8d6' },
                { icon: <Users size={28} color="#1d3557" />, label: 'Customers', value: stats.customers, color: '#e8f4f8' },
                { icon: <TrendingUp size={28} color="#e63946" />, label: 'Revenue', value: `₹${stats.revenue.toFixed(2)}`, color: '#fde8e8' },
              ].map((s, i) => (
                <div key={i} style={{ background: 'white', borderRadius: 12, padding: 24, boxShadow: '0 2px 12px rgba(0,0,0,0.06)', display: 'flex', alignItems: 'center', gap: 16 }}>
                  <div style={{ background: s.color, borderRadius: 10, padding: 12 }}>{s.icon}</div>
                  <div>
                    <div style={{ fontSize: 13, color: '#888', marginBottom: 4 }}>{s.label}</div>
                    <div style={{ fontSize: '1.4rem', fontWeight: 700, color: '#1a0f0a' }}>{s.value}</div>
                  </div>
                </div>
              ))}
            </div>
            <h3 style={{ color: '#1a0f0a', marginBottom: 16 }}>Recent Orders</h3>
            <div style={{ background: 'white', borderRadius: 12, overflow: 'auto', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                <thead style={{ background: '#fffbf0' }}>
                  <tr>{['Customer', 'Phone', 'Total', 'Status', 'Date'].map(h => (
                    <th key={h} style={{ padding: '12px 16px', textAlign: 'left', color: '#888', fontWeight: 600 }}>{h}</th>
                  ))}</tr>
                </thead>
                <tbody>
                  {orders.slice(0, 10).map(o => (
                    <tr key={o.id} style={{ borderTop: '1px solid #f0f0f0' }}>
                      <td style={{ padding: '12px 16px', fontWeight: 600 }}>{o.customers?.name || '-'}</td>
                      <td style={{ padding: '12px 16px', color: '#d4870a' }}>{o.customers?.phone || '-'}</td>
                      <td style={{ padding: '12px 16px', fontWeight: 700, color: '#bc6c25', fontFamily: 'Georgia, serif' }}>₹{o.total}</td>
                      <td style={{ padding: '12px 16px' }}>
                        <select value={o.status} onChange={e => updateOrderStatus(o.id, e.target.value)}
                          style={{ padding: '4px 8px', borderRadius: 4, border: '1px solid #ddd', fontSize: 12 }}>
                          {['pending','confirmed','shipped','delivered','cancelled'].map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                      </td>
                      <td style={{ padding: '12px 16px', color: '#888' }}>{new Date(o.created_at).toLocaleDateString('en-IN')}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ── ORDERS ── */}
        {tab === 'orders' && (
          <div>
            <h2 style={{ fontFamily: 'var(--font-playfair)', color: '#1a0f0a', marginBottom: 24 }}>All Orders ({orders.length})</h2>
            <div style={{ background: 'white', borderRadius: 12, overflow: 'auto', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                <thead style={{ background: '#fffbf0' }}>
                  <tr>{['Customer', 'Phone', 'Address', 'Total', 'Status', 'Date'].map(h => (
                    <th key={h} style={{ padding: '12px 16px', textAlign: 'left', color: '#888', fontWeight: 600 }}>{h}</th>
                  ))}</tr>
                </thead>
                <tbody>
                  {orders.map(o => (
                    <tr key={o.id} style={{ borderTop: '1px solid #f0f0f0' }}>
                      <td style={{ padding: '12px 16px', fontWeight: 600 }}>{o.customers?.name || '-'}</td>
                      <td style={{ padding: '12px 16px', color: '#d4870a' }}>{o.customers?.phone || '-'}</td>
                      <td style={{ padding: '12px 16px', color: '#666', maxWidth: 180, fontSize: 12 }}>{o.customers?.address || '-'}</td>
                      <td style={{ padding: '12px 16px', fontWeight: 700, color: '#bc6c25', fontFamily: 'Georgia, serif' }}>₹{o.total}</td>
                      <td style={{ padding: '12px 16px' }}>
                        <select value={o.status} onChange={e => updateOrderStatus(o.id, e.target.value)}
                          style={{ padding: '4px 8px', borderRadius: 4, border: '1px solid #ddd', fontSize: 12 }}>
                          {['pending','confirmed','shipped','delivered','cancelled'].map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                      </td>
                      <td style={{ padding: '12px 16px', color: '#888' }}>{new Date(o.created_at).toLocaleDateString('en-IN')}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ── PRODUCTS ── */}
        {tab === 'products' && (
          <div>
            <h2 style={{ fontFamily: 'var(--font-playfair)', color: '#1a0f0a', marginBottom: 24 }}>Products ({products.length})</h2>
            <div style={{ background: 'white', borderRadius: 12, padding: 24, marginBottom: 28, boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
              <h3 style={{ color: '#1a0f0a', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
                <Plus size={18} /> Add New Product
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 14 }}>
                {[
                  { key: 'name', placeholder: 'Product Name *', type: 'text' },
                  { key: 'price', placeholder: 'Price (₹) *', type: 'number' },
                  { key: 'stock', placeholder: 'Stock quantity', type: 'number' },
                  { key: 'category', placeholder: 'Category (Honey/Oil/Spices)', type: 'text' },
                ].map(f => (
                  <input key={f.key} type={f.type} placeholder={f.placeholder} value={newProduct[f.key]}
                    onChange={e => setNewProduct(p => ({ ...p, [f.key]: e.target.value }))}
                    style={inputStyle} />
                ))}
                <input placeholder="Description" value={newProduct.description}
                  onChange={e => setNewProduct(p => ({ ...p, description: e.target.value }))}
                  style={{ ...inputStyle, gridColumn: 'span 2' }} />
              </div>
              <button className="btn-primary" style={{ marginTop: 16 }} onClick={addProduct} disabled={loading}>
                {loading ? 'Adding...' : '+ Add Product'}
              </button>
            </div>
            <div style={{ background: 'white', borderRadius: 12, overflow: 'auto', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                <thead style={{ background: '#fffbf0' }}>
                  <tr>{['Name', 'Category', 'Price', 'Stock', 'Status', 'Delete'].map(h => (
                    <th key={h} style={{ padding: '12px 16px', textAlign: 'left', color: '#888', fontWeight: 600 }}>{h}</th>
                  ))}</tr>
                </thead>
                <tbody>
                  {products.map(p => (
                    <tr key={p.id} style={{ borderTop: '1px solid #f0f0f0' }}>
                      <td style={{ padding: '12px 16px', fontWeight: 600 }}>{p.name}</td>
                      <td style={{ padding: '12px 16px' }}><span className="badge badge-green">{p.category}</span></td>
                      <td style={{ padding: '12px 16px', color: '#bc6c25', fontWeight: 700, fontFamily: 'Georgia, serif' }}>₹{p.price}</td>
                      <td style={{ padding: '12px 16px' }}>{p.stock}</td>
                      <td style={{ padding: '12px 16px', color: p.active ? '#2d6a4f' : '#e63946', fontWeight: 600, fontSize: 12 }}>
                        {p.active ? '✓ Active' : '✗ Hidden'}
                      </td>
                      <td style={{ padding: '12px 16px' }}>
                        <button onClick={() => deleteProduct(p.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#e63946' }}>
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ── CUSTOMERS ── */}
        {tab === 'customers' && (
          <div>
            <h2 style={{ fontFamily: 'var(--font-playfair)', color: '#1a0f0a', marginBottom: 24 }}>Customers ({customers.length})</h2>
            <div style={{ background: 'white', borderRadius: 12, overflow: 'auto', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                <thead style={{ background: '#fffbf0' }}>
                  <tr>{['Name', 'Phone', 'Email', 'Address', 'Joined'].map(h => (
                    <th key={h} style={{ padding: '12px 16px', textAlign: 'left', color: '#888', fontWeight: 600 }}>{h}</th>
                  ))}</tr>
                </thead>
                <tbody>
                  {customers.map(c => (
                    <tr key={c.id} style={{ borderTop: '1px solid #f0f0f0' }}>
                      <td style={{ padding: '12px 16px', fontWeight: 600 }}>{c.name}</td>
                      <td style={{ padding: '12px 16px', color: '#d4870a' }}>{c.phone}</td>
                      <td style={{ padding: '12px 16px', color: '#888' }}>{c.email || '-'}</td>
                      <td style={{ padding: '12px 16px', color: '#666', maxWidth: 200, fontSize: 12 }}>{c.address}</td>
                      <td style={{ padding: '12px 16px', color: '#888' }}>{new Date(c.created_at).toLocaleDateString('en-IN')}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
      <style>{`
        @media(max-width:768px){
          .admin-tabs { flex-wrap: wrap !important; }
          .admin-stats { grid-template-columns: 1fr 1fr !important; }
          .admin-table { font-size: 12px !important; }
          .admin-table th, .admin-table td { padding: 8px !important; }
        }
      `}</style>
    </div>
  );
}