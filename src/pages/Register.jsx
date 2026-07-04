import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, ChevronLeft, ArrowRight, Loader2, User, Phone, BookOpen, Tag, MapPin, Heart } from 'lucide-react';
import { CATEGORIES, saveRegistration } from '../data/programData';

const INIT = { fullName:'', phone:'', schoolOrWork:'', category:'', church:'', location:'', wantsMentorship:'' };

export default function Register() {
  const nav = useNavigate();
  const [form, setForm] = useState(INIT);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [saved, setSaved] = useState(null);

  const validate = () => {
    const e = {};
    if (!form.fullName.trim()) e.fullName = 'Full name is required';
    if (!form.phone.trim()) e.phone = 'Phone number is required';
    else if (!/^[0-9+\s()-]{7,}$/.test(form.phone)) e.phone = 'Enter a valid phone number';
    if (!form.category) e.category = 'Please select a category';
    if (!form.location.trim()) e.location = 'Location is required';
    return e;
  };

  const onChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
    if (errors[name]) setErrors(er => ({ ...er, [name]: '' }));
  };

  const onSubmit = async e => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setSubmitting(true);
    await new Promise(r => setTimeout(r, 700));
    setSaved(saveRegistration(form));
    setDone(true);
    setSubmitting(false);
  };

  const onReset = () => {
    setForm(INIT);
    setErrors({});
    setSaved(null);
    setDone(false);
  };

  if (done) return <Success reg={saved} nav={nav} onReset={onReset} />;

  return (
    <div style={{ background:'var(--navy)', minHeight:'100dvh' }}>

      {/* Header bar */}
      <div style={{
        position:'sticky', top:0, zIndex:50,
        background:'rgba(5,9,26,0.92)', backdropFilter:'blur(16px)',
        borderBottom:'1px solid rgba(255,255,255,0.07)',
        padding:'12px 20px', display:'flex', alignItems:'center', gap:14
      }}>
        <button onClick={()=>nav('/')} style={{
          background:'rgba(255,255,255,0.06)', border:'1px solid rgba(255,255,255,0.09)',
          borderRadius:8, padding:'6px 10px', color:'var(--white-70)', cursor:'pointer',
          display:'flex', alignItems:'center', gap:4, fontSize:12, fontWeight:600
        }}>
          <ChevronLeft size={14} /> Back
        </button>
        <div>
          <p style={{ fontSize:10, fontWeight:800, letterSpacing:'0.15em', textTransform:'uppercase', color:'var(--teal)' }}>ONCYM</p>
          <p style={{ fontSize:13, fontWeight:700, color:'var(--white)', lineHeight:1.1 }}>Registration</p>
        </div>
      </div>

      <div style={{ maxWidth:480, margin:'0 auto', padding:'24px 20px 120px' }}>

        {/* Intro card */}
        <div className="card card-gold" style={{ padding:'18px 20px', marginBottom:28, display:'flex', gap:14, alignItems:'flex-start' }}>
          <div style={{ width:40, height:40, borderRadius:10, background:'rgba(240,165,0,0.12)', border:'1px solid rgba(240,165,0,0.25)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
            <User size={18} style={{ color:'var(--gold)' }} />
          </div>
          <div>
            <p style={{ fontWeight:700, fontSize:14, color:'var(--white)', marginBottom:4 }}>Join AS YOLO 2026</p>
            <p style={{ fontSize:12, color:'var(--white-40)', lineHeight:1.6 }}>Register your attendance — it's completely free. Bring a friend!</p>
          </div>
        </div>

        <form onSubmit={onSubmit} style={{ display:'flex', flexDirection:'column', gap:20 }} noValidate>

          <FormField icon={<User size={14}/>} label="Full Name" required error={errors.fullName}>
            <input id="reg-fullName" name="fullName" type="text" placeholder="Your full name"
              className="form-input" value={form.fullName} onChange={onChange} autoComplete="name" />
          </FormField>

          <FormField icon={<Phone size={14}/>} label="Phone Number" required error={errors.phone}>
            <input id="reg-phone" name="phone" type="tel" placeholder="0244 123 456"
              className="form-input" value={form.phone} onChange={onChange} autoComplete="tel" />
          </FormField>

          <FormField icon={<BookOpen size={14}/>} label="School / Workplace" hint="Optional" error={errors.schoolOrWork}>
            <input id="reg-schoolOrWork" name="schoolOrWork" type="text" placeholder="Name of school or workplace"
              className="form-input" value={form.schoolOrWork} onChange={onChange} />
          </FormField>

          {/* Category */}
          <div>
            <label className="form-label" style={{ display:'flex', alignItems:'center', gap:6 }}>
              <Tag size={13} style={{ color:'var(--teal)' }} /> Category <span style={{ color:'#ef4444' }}>*</span>
            </label>
            <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
              {CATEGORIES.map(cat => (
                <label key={cat} style={{
                  display:'flex', alignItems:'center', gap:12, padding:'12px 14px', borderRadius:10, cursor:'pointer',
                  border:`1.5px solid ${form.category===cat ? 'var(--teal)' : 'rgba(255,255,255,0.08)'}`,
                  background: form.category===cat ? 'rgba(0,201,167,0.07)' : 'rgba(255,255,255,0.02)',
                  transition:'all 0.2s'
                }}>
                  <input type="radio" name="category" value={cat} checked={form.category===cat}
                    onChange={onChange} style={{ display:'none' }} />
                  <div style={{
                    width:18, height:18, borderRadius:'50%', flexShrink:0,
                    border:`2px solid ${form.category===cat ? 'var(--teal)' : 'rgba(255,255,255,0.2)'}`,
                    background: form.category===cat ? 'var(--teal)' : 'transparent',
                    transition:'all 0.2s', display:'flex', alignItems:'center', justifyContent:'center'
                  }}>
                    {form.category===cat && <div style={{ width:6, height:6, borderRadius:'50%', background:'var(--navy)' }} />}
                  </div>
                  <span style={{ fontSize:13, fontWeight:600, color: form.category===cat ? 'var(--white)' : 'rgba(255,255,255,0.45)' }}>{cat}</span>
                </label>
              ))}
            </div>
            {errors.category && <p style={{ color:'#f87171', fontSize:11, marginTop:6 }}>{errors.category}</p>}
          </div>

          <FormField icon={<MapPin size={14}/>} label="Church Attended" hint="Optional">
            <input id="reg-church" name="church" type="text" placeholder="e.g. Overcomers Nation Church"
              className="form-input" value={form.church} onChange={onChange} />
          </FormField>

          <FormField icon={<MapPin size={14}/>} label="Location / Area" required error={errors.location}>
            <input id="reg-location" name="location" type="text" placeholder="e.g. Tesano, East Legon, Kumasi"
              className="form-input" value={form.location} onChange={onChange} />
          </FormField>

          {/* Mentorship */}
          <div>
            <label className="form-label" style={{ display:'flex', alignItems:'center', gap:6 }}>
              <Heart size={13} style={{ color:'var(--teal)' }} /> Mentorship Interest <span style={{ fontSize:10, fontWeight:400, color:'rgba(255,255,255,0.25)', textTransform:'none', letterSpacing:0 }}>(Optional)</span>
            </label>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:8 }}>
              {['Yes, please','Maybe later','No, thanks'].map(opt=>(
                <label key={opt} style={{
                  textAlign:'center', padding:'11px 6px', borderRadius:10, cursor:'pointer',
                  border:`1.5px solid ${form.wantsMentorship===opt ? 'var(--gold)' : 'rgba(255,255,255,0.08)'}`,
                  background: form.wantsMentorship===opt ? 'rgba(240,165,0,0.08)' : 'rgba(255,255,255,0.02)',
                  fontSize:11, fontWeight:700, letterSpacing:'0.04em',
                  color: form.wantsMentorship===opt ? 'var(--gold-light)' : 'rgba(255,255,255,0.35)',
                  transition:'all 0.2s'
                }}>
                  <input type="radio" name="wantsMentorship" value={opt} checked={form.wantsMentorship===opt}
                    onChange={onChange} style={{ display:'none' }} />
                  {opt}
                </label>
              ))}
            </div>
          </div>

          {/* Submit */}
          <div style={{ paddingTop:8 }}>
            <button id="reg-submit" type="submit" disabled={submitting}
              className="btn btn-gold btn-lg" style={{ width:'100%', opacity: submitting ? 0.7 : 1 }}>
              {submitting
                ? <><Loader2 size={16} style={{ animation:'spin 1s linear infinite' }} /> Submitting...</>
                : <>Complete Registration <ArrowRight size={15} /></>}
            </button>
            <p style={{ textAlign:'center', fontSize:10, fontWeight:700, letterSpacing:'0.15em', textTransform:'uppercase', color:'rgba(255,255,255,0.2)', marginTop:12 }}>
              Free Entry — No Fees Required
            </p>
          </div>
        </form>
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

function FormField({ icon, label, hint, required, error, children }) {
  return (
    <div>
      <label className="form-label" style={{ display:'flex', alignItems:'center', gap:6, marginBottom:8 }}>
        <span style={{ color:'var(--teal)' }}>{icon}</span>
        {label}
        {required && <span style={{ color:'#ef4444', fontSize:11 }}>*</span>}
        {hint && <span style={{ fontSize:10, fontWeight:400, color:'rgba(255,255,255,0.2)', textTransform:'none', letterSpacing:0 }}>({hint})</span>}
      </label>
      {children}
      {error && <p style={{ color:'#f87171', fontSize:11, marginTop:5 }}>{error}</p>}
    </div>
  );
}

function ConfettiBubbles() {
  const [bubbles, setBubbles] = useState([]);

  useEffect(() => {
    const list = [];
    for (let i = 0; i < 30; i++) {
      list.push({
        id: i,
        left: Math.random() * 100,
        size: Math.random() * 14 + 6,
        delay: Math.random() * 5,
        duration: Math.random() * 4 + 4,
        color: Math.random() > 0.5 ? 'var(--teal)' : 'var(--gold)'
      });
    }
    setBubbles(list);
  }, []);

  return (
    <div style={{ position: 'fixed', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 99 }}>
      {bubbles.map(b => (
        <div
          key={b.id}
          style={{
            position: 'absolute',
            bottom: -50,
            left: `${b.left}%`,
            width: b.size,
            height: b.size,
            borderRadius: '50%',
            background: b.color,
            opacity: 0.5,
            animation: `bubbleUp ${b.duration}s linear ${b.delay}s infinite`
          }}
        />
      ))}
      <style>{`
        @keyframes bubbleUp {
          0% { transform: translateY(0) scale(1); opacity: 0; }
          10% { opacity: 0.6; }
          90% { opacity: 0.6; }
          100% { transform: translateY(-110vh) scale(1.3); opacity: 0; }
        }
      `}</style>
    </div>
  );
}

function Success({ reg, nav, onReset }) {
  return (
    <div style={{ background:'var(--navy)', minHeight:'100dvh', display:'flex', alignItems:'center', justifyContent:'center', padding:24 }}>
      <ConfettiBubbles />

      <div style={{ maxWidth:380, width:'100%', textAlign:'center' }}>

        {/* Icon */}
        <div style={{ display:'flex', justifyContent:'center', marginBottom:24 }}>
          <div style={{
            width:88, height:88, borderRadius:'50%',
            background:'rgba(0,201,167,0.1)', border:'2px solid rgba(0,201,167,0.35)',
            display:'flex', alignItems:'center', justifyContent:'center',
            boxShadow:'0 0 40px rgba(0,201,167,0.2)'
          }}>
            <CheckCircle size={44} style={{ color:'var(--teal)' }} />
          </div>
        </div>

        <p className="t-overline" style={{ marginBottom:8 }}>Registration Confirmed</p>
        <h2 style={{ fontFamily:"'Cinzel', serif", fontSize:24, fontWeight:700, marginBottom:6,
          background:'linear-gradient(135deg, #FFD166, #F0A500)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>
          Welcome, {reg?.fullName}
        </h2>
        <p style={{ fontSize:13, color:'var(--white-40)', lineHeight:1.7, marginBottom:28 }}>
          Your spot for AS YOLO 2026 has been confirmed. We look forward to seeing you on the day.
        </p>

        {/* Summary */}
        <div className="card card-gold" style={{ padding:'20px', textAlign:'left', marginBottom:28 }}>
          <p className="t-section-label" style={{ marginBottom:14 }}>Event Summary</p>
          <div className="divider-gold" style={{ marginBottom:14 }} />
          {[
            ['Date', 'Saturday, 4th July 2026'],
            ['Time', '1:00 PM Prompt'],
            ['Venue', 'Overcomers Nation Church, Opp. Ayrton Drug, Tesano'],
            ['Dress', 'Smart Casual'],
          ].map(([k, v]) => (
            <div key={k} style={{ display:'flex', gap:12, marginBottom:10 }}>
              <span style={{ fontSize:9, fontWeight:800, letterSpacing:'0.12em', textTransform:'uppercase', color:'rgba(255,255,255,0.25)', minWidth:44, paddingTop:2 }}>{k}</span>
              <span style={{ fontSize:12, color:'rgba(255,255,255,0.65)', lineHeight:1.5, fontWeight:500 }}>{v}</span>
            </div>
          ))}
          <div className="divider" style={{ margin:'12px 0' }} />
          <p style={{ fontSize:11, color:'rgba(255,255,255,0.25)', fontStyle:'italic', fontFamily:"'Playfair Display', serif" }}>
            "Don't Just Exist. Discover. Decide. Live on Purpose."
          </p>
        </div>

        <p style={{ fontSize:12, color:'rgba(255,255,255,0.3)', marginBottom:24 }}>
          Remember to invite a friend — entry is free for everyone.
        </p>

        <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
          <button onClick={onReset} className="btn btn-gold btn-lg" style={{ width:'100%' }}>Register Another Person</button>
          <button onClick={()=>nav('/program')} className="btn btn-outline-teal btn-md" style={{ width:'100%' }}>View Full Program</button>
          <button onClick={()=>nav('/')} className="btn btn-outline btn-md" style={{ width:'100%' }}>Back to Home</button>
        </div>
      </div>
    </div>
  );
}
