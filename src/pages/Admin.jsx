import { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, LogOut, Users, Download, Search, BarChart2, ChevronUp, ChevronDown, Printer, X, Loader2 } from 'lucide-react';
import { getRegistrations, CATEGORIES, ADMIN_PASSWORD, PROGRAM_DATA, DB_URL } from '../data/programData';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

// ─── Login ─────────────────────────────────────────────────────────────────
function AdminLogin({ onLogin }) {
  const [pw, setPw] = useState('');
  const [error, setError] = useState('');
  const [shake, setShake] = useState(false);

  const attempt = (e) => {
    e.preventDefault();
    if (pw === ADMIN_PASSWORD) {
      onLogin();
    } else {
      setError('Incorrect password.');
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
  };

  return (
    <div className="page-bg flex items-center justify-center px-5 min-h-screen">
      <div className={`relative z-10 w-full max-w-sm glass rounded-2xl gold-border p-8 anim-fade-up ${shake ? 'shake' : ''}`}>
        <div className="text-center mb-8">
          <div style={{
            width: 56, height: 56, borderRadius: 12,
            background: 'rgba(180,140,60,0.1)', border: '1px solid rgba(180,140,60,0.3)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px'
          }}>
            <Lock size={24} style={{ color: '#d4a84b' }} />
          </div>
          <p className="label-caps text-haven-gold-light mb-1">Organizer Access</p>
          <h1 className="heading-display text-xl gradient-gold">Admin Dashboard</h1>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.3)', marginTop: 6 }}>AS YOLO 2026</p>
        </div>

        <form onSubmit={attempt} className="space-y-4">
          <div>
            <label className="form-label" htmlFor="admin-pw">Password</label>
            <input id="admin-pw" type="password" placeholder="Enter password"
              className="form-input text-center" style={{ letterSpacing: '0.2em', fontSize: 18 }}
              value={pw} onChange={e => { setPw(e.target.value); setError(''); }} autoFocus />
            {error && <p style={{ color: '#f87171', fontSize: 12, marginTop: 8, textAlign: 'center' }}>{error}</p>}
          </div>
          <button id="admin-login-btn" type="submit" className="btn-primary w-full">
            <Lock size={14} /> Access Dashboard
          </button>
        </form>

        <p style={{ textAlign: 'center', fontSize: 11, color: 'rgba(255,255,255,0.12)', marginTop: 20 }}>
          Authorized personnel only
        </p>
      </div>

      <style>{`
        @keyframes shake {
          0%,100%{transform:translateX(0)}
          20%{transform:translateX(-8px)}
          40%{transform:translateX(8px)}
          60%{transform:translateX(-8px)}
          80%{transform:translateX(8px)}
        }
        .shake { animation: shake 0.4s ease; }
      `}</style>
    </div>
  );
}

// ─── Dashboard ─────────────────────────────────────────────────────────────
function Dashboard({ onLogout }) {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [sortField, setSortField] = useState('registeredAt');
  const [sortDir, setSortDir] = useState('desc');
  const [view, setView] = useState('table');
  const [raw, setRaw] = useState(() => getRegistrations());
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(DB_URL)
      .then(res => res.ok ? res.text() : "[]")
      .then(text => {
        const data = text ? JSON.parse(text) : [];
        if (data.length > 0) {
          setRaw(data);
          localStorage.setItem("as_yolo_2026_registrations", JSON.stringify(data));
        }
      })
      .catch(err => console.error("Could not fetch online database:", err))
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => {
    let data = [...raw];
    if (search.trim()) {
      const q = search.toLowerCase();
      data = data.filter(r =>
        r.fullName?.toLowerCase().includes(q) ||
        r.phone?.includes(q) ||
        r.location?.toLowerCase().includes(q) ||
        r.category?.toLowerCase().includes(q) ||
        r.schoolOrWork?.toLowerCase().includes(q)
      );
    }
    data.sort((a, b) => {
      const av = (a[sortField] || '').toLowerCase();
      const bv = (b[sortField] || '').toLowerCase();
      return sortDir === 'asc' ? av.localeCompare(bv) : bv.localeCompare(av);
    });
    return data;
  }, [raw, search, sortField, sortDir]);

  const total = raw.length;
  const byCategory = CATEGORIES.map(cat => ({
    name: cat.replace(' Student', '').replace(' Fresher', ' Fresh.'),
    value: raw.filter(r => r.category === cat).length,
  }));
  const wantMentorship = raw.filter(r => r.wantsMentorship === 'Yes, please').length;
  const withChurch = raw.filter(r => r.church?.trim()).length;

  const CHART_COLORS = ['#14b8a6', '#d4a84b', '#a855f7', '#ec4899'];

  const toggleSort = (field) => {
    if (sortField === field) setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    else { setSortField(field); setSortDir('asc'); }
  };

  const SortIcon = ({ field }) => {
    if (sortField !== field) return <span style={{ opacity: 0.2, fontSize: 10 }}>↕</span>;
    return sortDir === 'asc'
      ? <ChevronUp size={11} style={{ color: '#14b8a6' }} />
      : <ChevronDown size={11} style={{ color: '#14b8a6' }} />;
  };

  const exportCSV = () => {
    const headers = ['Full Name','Phone','Category','School/Workplace','Church','Location','Mentorship','Registered At'];
    const rows = raw.map(r => [
      `"${r.fullName||''}"`, `"${r.phone||''}"`, `"${r.category||''}"`,
      `"${r.schoolOrWork||''}"`, `"${r.church||''}"`, `"${r.location||''}"`,
      `"${r.wantsMentorship||''}"`,
      `"${r.registeredAt ? new Date(r.registeredAt).toLocaleString() : ''}"`,
    ]);
    const csv = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv' }));
    const a = document.createElement('a');
    a.href = url;
    a.download = `AS_YOLO_2026_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="page-bg">
      <div className="relative z-10 max-w-4xl mx-auto px-5 pt-8 pb-16">

        {/* Top bar */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28 }}>
          <div>
            <p className="label-caps text-haven-gold-light mb-1">Organizer Portal</p>
            <h1 className="heading-display text-2xl gradient-gold">Admin Dashboard</h1>
            <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)', marginTop: 2 }}>{PROGRAM_DATA.date}</p>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button onClick={() => navigate('/')} className="btn-ghost">Home</button>
            <button onClick={onLogout} style={{
              display: 'flex', alignItems: 'center', gap: 6, padding: '7px 14px',
              borderRadius: 8, fontSize: 12, fontWeight: 600, background: 'rgba(239,68,68,0.08)',
              border: '1px solid rgba(239,68,68,0.2)', color: '#fca5a5', cursor: 'pointer', transition: 'all 0.2s'
            }}>
              <LogOut size={13} /> Logout
            </button>
          </div>
        </div>

        {/* Stat Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12, marginBottom: 24 }}>
          {[
            { label: 'Total Registrants', value: total, color: '#14b8a6' },
            { label: 'Want Mentorship', value: wantMentorship, color: '#d4a84b' },
            { label: 'Provided Church', value: withChurch, color: '#a855f7' },
            { label: 'Unique Locations', value: [...new Set(raw.map(r=>r.location?.trim()).filter(Boolean))].length, color: '#ec4899' },
          ].map(s => (
            <div key={s.label} className="stat-card">
              <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: 8 }}>{s.label}</p>
              <p style={{ fontFamily: "'Cinzel', serif", fontSize: 36, fontWeight: 700, color: s.color, lineHeight: 1 }}>{s.value}</p>
            </div>
          ))}
        </div>

        {/* View toggle */}
        <div style={{ display: 'flex', gap: 4, marginBottom: 16, background: 'rgba(255,255,255,0.03)', padding: 4, borderRadius: 10, width: 'fit-content', border: '1px solid rgba(255,255,255,0.06)' }}>
          {['table', 'charts'].map(v => (
            <button key={v} onClick={() => setView(v)} style={{
              padding: '7px 16px', borderRadius: 8, fontSize: 11, fontWeight: 700,
              letterSpacing: '0.08em', textTransform: 'uppercase', border: 'none', cursor: 'pointer',
              background: view === v ? 'rgba(20,184,166,0.15)' : 'transparent',
              color: view === v ? '#5eead4' : 'rgba(255,255,255,0.35)', transition: 'all 0.2s'
            }}>{v === 'table' ? 'Attendees' : 'Charts'}</button>
          ))}
        </div>

        {/* ── Table View ── */}
        {view === 'table' && (
          <>
            <div style={{ display: 'flex', gap: 8, marginBottom: 12, flexWrap: 'wrap', alignItems: 'center' }}>
              {loading && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase', color: 'var(--teal-light)', marginRight: 8 }}>
                  <Loader2 size={13} style={{ animation: 'spin 1s linear infinite' }} /> Syncing...
                </div>
              )}
              <div style={{ flex: 1, minWidth: 200, position: 'relative' }}>
                <Search size={13} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.25)' }} />
                <input id="admin-search" type="text" placeholder="Search name, phone, area..."
                  className="form-input" style={{ paddingLeft: 34, fontSize: 13 }}
                  value={search} onChange={e => setSearch(e.target.value)} />
                {search && (
                  <button onClick={() => setSearch('')} style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.3)' }}>
                    <X size={13} />
                  </button>
                )}
              </div>
              <button id="export-csv" onClick={exportCSV} className="btn-secondary" style={{ padding: '10px 16px', fontSize: 12, gap: 6 }}>
                <Download size={13} /> Export CSV
              </button>
              <button id="export-print" onClick={() => window.print()} className="btn-ghost" style={{ padding: '10px 16px', fontSize: 12, gap: 6 }}>
                <Printer size={13} /> Print
              </button>
            </div>

            <div className="glass rounded-xl" style={{ overflowX: 'auto' }}>
              {filtered.length === 0 ? (
                <div style={{ padding: 48, textAlign: 'center', color: 'rgba(255,255,255,0.25)' }}>
                  {total === 0 ? (
                    <>
                      <Users size={36} style={{ margin: '0 auto 12px', opacity: 0.25 }} />
                      <p style={{ fontSize: 14 }}>No registrations yet.</p>
                      <p style={{ fontSize: 12, marginTop: 4 }}>Registrations appear here when attendees scan the QR code.</p>
                    </>
                  ) : (
                    <p>No results match your search.</p>
                  )}
                </div>
              ) : (
                <table className="admin-table">
                  <thead>
                    <tr>
                      {[
                        { label: 'Name', field: 'fullName' },
                        { label: 'Phone', field: 'phone' },
                        { label: 'Category', field: 'category' },
                        { label: 'School / Work', field: 'schoolOrWork' },
                        { label: 'Location', field: 'location' },
                        { label: 'Mentorship', field: null },
                        { label: 'Registered', field: 'registeredAt' },
                      ].map(({ label, field }) => (
                        <th key={label} onClick={field ? () => toggleSort(field) : undefined}
                          style={{ cursor: field ? 'pointer' : 'default' }}>
                          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                            {label} {field && <SortIcon field={field} />}
                          </span>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((reg, i) => (
                      <tr key={reg.id || i}>
                        <td style={{ fontWeight: 600, color: 'rgba(255,255,255,0.9)' }}>{reg.fullName}</td>
                        <td style={{ fontFamily: 'monospace', fontSize: 12 }}>{reg.phone}</td>
                        <td><CategoryBadge cat={reg.category} /></td>
                        <td style={{ maxWidth: 140, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', color: 'rgba(255,255,255,0.45)', fontSize: 12 }}>{reg.schoolOrWork || '—'}</td>
                        <td style={{ color: 'rgba(255,255,255,0.6)', fontSize: 13 }}>{reg.location || '—'}</td>
                        <td><MentorBadge val={reg.wantsMentorship} /></td>
                        <td style={{ color: 'rgba(255,255,255,0.3)', fontSize: 11, whiteSpace: 'nowrap' }}>
                          {reg.registeredAt ? new Date(reg.registeredAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '—'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>

            {filtered.length > 0 && (
              <p style={{ textAlign: 'right', fontSize: 11, color: 'rgba(255,255,255,0.2)', marginTop: 8 }}>
                {filtered.length} of {total} registrants
              </p>
            )}
          </>
        )}

        {/* ── Charts View ── */}
        {view === 'charts' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {total === 0 ? (
              <div className="glass rounded-xl" style={{ padding: 48, textAlign: 'center', color: 'rgba(255,255,255,0.25)' }}>
                <BarChart2 size={36} style={{ margin: '0 auto 12px', opacity: 0.25 }} />
                <p>No data to display yet.</p>
              </div>
            ) : (
              <>
                <div className="glass rounded-xl" style={{ padding: 20 }}>
                  <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', marginBottom: 16 }}>Registrants by Category</p>
                  <ResponsiveContainer width="100%" height={160}>
                    <BarChart data={byCategory} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                      <XAxis dataKey="name" tick={{ fill: 'rgba(255,255,255,0.35)', fontSize: 10 }} axisLine={false} tickLine={false} />
                      <YAxis tick={{ fill: 'rgba(255,255,255,0.35)', fontSize: 10 }} axisLine={false} tickLine={false} allowDecimals={false} />
                      <Tooltip contentStyle={{ background: '#0f1a2e', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, color: '#fff', fontSize: 12 }} cursor={{ fill: 'rgba(255,255,255,0.04)' }} />
                      <Bar dataKey="value" fill="#14b8a6" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                <div className="glass rounded-xl" style={{ padding: 20 }}>
                  <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', marginBottom: 16 }}>Category Distribution</p>
                  <ResponsiveContainer width="100%" height={200}>
                    <PieChart>
                      <Pie data={byCategory.filter(d => d.value > 0)} dataKey="value" nameKey="name"
                        cx="50%" cy="50%" outerRadius={75}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        labelLine={{ stroke: 'rgba(255,255,255,0.15)' }}>
                        {byCategory.map((_, idx) => <Cell key={idx} fill={CHART_COLORS[idx % CHART_COLORS.length]} />)}
                      </Pie>
                      <Tooltip contentStyle={{ background: '#0f1a2e', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, color: '#fff', fontSize: 12 }} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                <div className="glass rounded-xl" style={{ padding: 20 }}>
                  <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', marginBottom: 16 }}>Mentorship Interest</p>
                  <ResponsiveContainer width="100%" height={160}>
                    <PieChart>
                      <Pie data={[
                        { name: 'Yes', value: raw.filter(r => r.wantsMentorship === 'Yes, please').length },
                        { name: 'Maybe', value: raw.filter(r => r.wantsMentorship === 'Maybe later').length },
                        { name: 'No', value: raw.filter(r => r.wantsMentorship === 'No, thanks').length },
                        { name: 'N/A', value: raw.filter(r => !r.wantsMentorship).length },
                      ].filter(d => d.value > 0)} dataKey="value" nameKey="name"
                        cx="50%" cy="50%" outerRadius={60}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                        {['#14b8a6', '#d4a84b', '#ef4444', '#64748b'].map((c, i) => <Cell key={i} fill={c} />)}
                      </Pie>
                      <Tooltip contentStyle={{ background: '#0f1a2e', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, color: '#fff', fontSize: 12 }} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function CategoryBadge({ cat }) {
  if (!cat) return <span style={{ color: 'rgba(255,255,255,0.2)', fontSize: 12 }}>—</span>;
  const map = { 'JHS/SHS Leaver': 'badge-teal', 'Continuing Student': 'badge-gold', 'University Fresher': 'badge-purple' };
  return <span className={`badge ${map[cat] || 'badge-teal'}`}>{cat}</span>;
}

function MentorBadge({ val }) {
  if (val === 'Yes, please') return <span className="badge badge-teal">Yes</span>;
  if (val === 'Maybe later') return <span className="badge badge-gold">Maybe</span>;
  if (val === 'No, thanks') return <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.25)' }}>No</span>;
  return <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.2)' }}>—</span>;
}

export default function Admin() {
  const [loggedIn, setLoggedIn] = useState(false);
  return loggedIn
    ? <Dashboard onLogout={() => setLoggedIn(false)} />
    : <AdminLogin onLogin={() => setLoggedIn(true)} />;
}
