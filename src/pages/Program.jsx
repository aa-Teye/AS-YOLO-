import { useState } from 'react';
import { PROGRAM_DATA, PROGRAM_ACTIVITIES, SPEAKERS, PERFORMERS } from '../data/programData';

// One consistent teal/gold palette — no rainbow, matches brand
const catStyle = {
  Worship:     { bg:'rgba(0,201,167,0.10)', border:'rgba(0,201,167,0.25)', text:'#5eead4', dot:'#00C9A7' },
  Opening:     { bg:'rgba(0,201,167,0.10)', border:'rgba(0,201,167,0.25)', text:'#5eead4', dot:'#00C9A7' },
  Performance: { bg:'rgba(240,165,0,0.10)', border:'rgba(240,165,0,0.25)', text:'#FFD166', dot:'#F0A500' },
  Inspiration: { bg:'rgba(240,165,0,0.10)', border:'rgba(240,165,0,0.25)', text:'#FFD166', dot:'#F0A500' },
  Talk:        { bg:'rgba(0,201,167,0.10)', border:'rgba(0,201,167,0.25)', text:'#5eead4', dot:'#00C9A7' },
  Interactive: { bg:'rgba(0,201,167,0.10)', border:'rgba(0,201,167,0.25)', text:'#5eead4', dot:'#00C9A7' },
  Word:        { bg:'rgba(240,165,0,0.14)', border:'rgba(240,165,0,0.35)', text:'#FFD166', dot:'#F0A500' },
  Ceremony:    { bg:'rgba(240,165,0,0.10)', border:'rgba(240,165,0,0.25)', text:'#FFD166', dot:'#F0A500' },
  Closing:     { bg:'rgba(0,201,167,0.07)', border:'rgba(0,201,167,0.15)', text:'rgba(94,234,212,0.6)', dot:'rgba(0,201,167,0.4)' },
};

const TABS = ['Activities', 'Speakers', 'Highlights'];

export default function Program() {
  const [tab, setTab] = useState('Activities');

  return (
    <div style={{ background:'var(--navy)', minHeight:'100dvh' }}>

      {/* Top hero banner */}
      <div style={{
        background:'linear-gradient(135deg, var(--navy-mid) 0%, rgba(0,201,167,0.08) 100%)',
        borderBottom:'1px solid rgba(255,255,255,0.07)',
        padding:'56px 20px 24px'
      }}>
        <p className="t-overline" style={{ marginBottom:8 }}>The Haven - ONCYM · 2026</p>
        <h1 className="t-page-title" style={{ marginBottom:4 }}>Program Outline</h1>
        <p style={{ fontSize:12, color:'var(--white-40)', fontWeight:500 }}>
          Saturday, 4th July 2026 &nbsp;·&nbsp; 1:00 PM &nbsp;·&nbsp; Overcomers Nation Church
        </p>

        {/* Theme */}
        <div style={{
          marginTop:16, padding:'14px 16px', borderRadius:12,
          background:'rgba(240,165,0,0.06)', border:'1px solid rgba(240,165,0,0.2)'
        }}>
          <p style={{ fontSize:10, fontWeight:800, letterSpacing:'0.15em', textTransform:'uppercase', color:'var(--gold)', marginBottom:4 }}>Theme</p>
          <p style={{ fontFamily:"'Playfair Display', serif", fontWeight:700, fontSize:18, color:'var(--white)', marginBottom:4 }}>
            Purpose Before Pressure
          </p>
          <p style={{ fontSize:11, color:'var(--white-40)', fontStyle:'italic', fontFamily:"'Playfair Display', serif", lineHeight:1.6 }}>
            "Don't Just Exist. Discover. Decide. Live on Purpose."
          </p>
        </div>

        {/* Featuring chips */}
        <div style={{ display:'flex', flexWrap:'wrap', gap:6, marginTop:14 }}>
          {PROGRAM_DATA.featuring.map(f=>(
            <span key={f} className="badge badge-teal">{f}</span>
          ))}
        </div>
      </div>

      {/* Sticky tab bar */}
      <div style={{
        position:'sticky', top:0, zIndex:40,
        background:'rgba(5,9,26,0.95)', backdropFilter:'blur(16px)',
        borderBottom:'1px solid rgba(255,255,255,0.07)',
        padding:'8px 12px', display:'flex', gap:4
      }}>
        {TABS.map(t=>(
          <button key={t} onClick={()=>setTab(t)} style={{
            flex:1, padding:'9px 6px', borderRadius:8, border:'none', cursor:'pointer',
            fontSize:11, fontWeight:800, letterSpacing:'0.08em', textTransform:'uppercase',
            transition:'all 0.2s',
            background: tab===t ? 'rgba(0,201,167,0.15)' : 'transparent',
            color: tab===t ? 'var(--teal)' : 'rgba(255,255,255,0.35)',
            borderBottom: tab===t ? '2px solid var(--teal)' : '2px solid transparent'
          }}>{t}</button>
        ))}
      </div>

      {/* Content */}
      <div style={{ padding:'20px 20px 120px', maxWidth:560, margin:'0 auto' }}>

        {/* ── ACTIVITIES ── */}
        {tab === 'Activities' && (
          <div>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:20 }}>
              <p className="t-section-label">Program Lineup</p>
              <p style={{ fontSize:10, color:'var(--white-40)', fontWeight:500 }}>MC: {PROGRAM_DATA.mc.join(' & ')}</p>
            </div>

            {/* Timeline container */}
            <div style={{ position:'relative' }}>
              {/* Vertical line */}
              <div style={{
                position:'absolute', left:15, top:0, bottom:0, width:1,
                background:'linear-gradient(to bottom, var(--teal), rgba(0,201,167,0.1))',
                zIndex:0
              }} />

              <div style={{ display:'flex', flexDirection:'column', gap:0 }}>
                {PROGRAM_ACTIVITIES.map((item, i) => {
                  const c = catStyle[item.category] || catStyle.Closing;
                  return (
                    <div key={item.id} style={{
                      display:'flex', alignItems:'flex-start', gap:14,
                      paddingBottom: i < PROGRAM_ACTIVITIES.length - 1 ? 16 : 0,
                      position:'relative', zIndex:1
                    }}>
                      {/* Number dot */}
                      <div style={{
                        width:30, height:30, borderRadius:'50%', flexShrink:0,
                        background: c.bg,
                        border:`2px solid ${c.dot}`,
                        display:'flex', alignItems:'center', justifyContent:'center',
                        fontSize:9, fontWeight:900, color:c.text,
                        fontFamily:"'Montserrat', sans-serif",
                        boxShadow:`0 0 0 3px rgba(5,9,26,1)`,
                        zIndex:2
                      }}>
                        {String(i+1).padStart(2,'0')}
                      </div>

                      {/* Content */}
                      <div style={{
                        flex:1, paddingTop:4,
                        paddingBottom: i < PROGRAM_ACTIVITIES.length - 1 ? 4 : 0,
                        borderBottom: i < PROGRAM_ACTIVITIES.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none'
                      }}>
                        <p style={{
                          fontSize:13, fontWeight:700,
                          color:'rgba(255,255,255,0.88)',
                          lineHeight:1.35,
                          marginBottom:4
                        }}>{item.name}</p>
                        <span style={{
                          display:'inline-block',
                          fontSize:9, fontWeight:800, letterSpacing:'0.1em', textTransform:'uppercase',
                          padding:'2px 8px', borderRadius:4,
                          background: c.bg, border:`1px solid ${c.border}`, color:c.text
                        }}>{item.category}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ── SPEAKERS ── */}
        {tab === 'Speakers' && (
          <div>
            <p className="t-section-label" style={{ marginBottom:16 }}>Guest Speakers</p>
            <div style={{ display:'flex', flexDirection:'column', gap:12, marginBottom:24 }}>
              {[
                { ...SPEAKERS[0], img:'/assets/artwork-esther.png' },
                { ...SPEAKERS[1], img:'/assets/artwork-abigail.png' },
                { ...SPEAKERS[2], img:'/assets/artwork-ebenezer.png' },
                ...SPEAKERS.slice(3).map(s => ({ ...s, img: null })),
              ].map((s, i)=>(
                <div key={s.id} className="card" style={{ overflow:'hidden' }}>
                  {s.img && (
                    <div style={{ display:'flex', gap:0 }}>
                      <div style={{ width:100, flexShrink:0 }}>
                        <img src={s.img} alt={s.name} style={{ width:'100%', height:'100%', objectFit:'cover', display:'block' }} />
                      </div>
                      <div style={{ padding:'14px 16px', flex:1, borderLeft:`3px solid ${['#3D8FA3','#C4922A','#a855f7','#3b82f6','#ec4899'][i%5]}` }}>
                        <p style={{ fontSize:9, fontWeight:800, letterSpacing:'0.15em', textTransform:'uppercase', color:'rgba(255,255,255,0.3)', marginBottom:5 }}>
                          Speaker {String(i+1).padStart(2,'0')}
                        </p>
                        <p style={{ fontFamily:"'Montserrat', sans-serif", fontWeight:800, fontSize:14, color:'var(--white)', marginBottom:5, lineHeight:1.3 }}>
                          {s.name}
                        </p>
                        <p style={{ fontFamily:"'Playfair Display', serif", fontStyle:'italic', fontSize:12, color:'rgba(255,255,255,0.45)', lineHeight:1.5 }}>
                          "{s.topic}"
                        </p>
                      </div>
                    </div>
                  )}
                  {!s.img && (
                    <div style={{ padding:'16px 16px', borderLeft:`3px solid ${['#3D8FA3','#C4922A','#a855f7','#3b82f6','#ec4899'][i%5]}` }}>
                      <p style={{ fontSize:9, fontWeight:800, letterSpacing:'0.15em', textTransform:'uppercase', color:'rgba(255,255,255,0.3)', marginBottom:5 }}>
                        Speaker {String(i+1).padStart(2,'0')}
                      </p>
                      <p style={{ fontFamily:"'Montserrat', sans-serif", fontWeight:800, fontSize:14, color:'var(--white)', marginBottom:5, lineHeight:1.3 }}>
                        {s.name}
                      </p>
                      <p style={{ fontFamily:"'Playfair Display', serif", fontStyle:'italic', fontSize:12, color:'rgba(255,255,255,0.45)', lineHeight:1.5 }}>
                        "{s.topic}"
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="divider-gold" style={{ margin:'4px 0 20px' }} />
            <p className="t-section-label" style={{ marginBottom:14 }}>Performers</p>

            {/* Performers with artwork */}
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10, marginBottom:16 }}>
              {[
                { name:'Spiders Dance Crew', role:'Dance Crew', img:'/assets/artwork-spiders.png' },
                { name:'Tina', role:'Drama', img:'/assets/artwork-tina.png' },
              ].map(p=>(
                <div key={p.name} className="artwork-card">
                  <img src={p.img} alt={p.name} loading="lazy" />
                  <div className="artwork-card-label">
                    <p style={{ fontSize:9, fontWeight:800, letterSpacing:'0.1em', textTransform:'uppercase', color:'var(--teal-light)', marginBottom:2 }}>{p.role}</p>
                    <p style={{ fontSize:12, fontWeight:700, color:'white', lineHeight:1.2 }}>{p.name}</p>
                  </div>
                </div>
              ))}
            </div>

            {PERFORMERS.filter(p => !['Spiders Dance Crew','Tina'].includes(p.name)).map(p=>(
              <div key={p.name} className="program-row" style={{ marginBottom:8 }}>
                <div style={{ width:8, height:8, borderRadius:'50%', background:'var(--gold)', flexShrink:0 }} />
                <div>
                  <p style={{ fontWeight:700, fontSize:14, color:'rgba(255,255,255,0.85)' }}>{p.name}</p>
                  <p style={{ fontSize:11, color:'rgba(255,255,255,0.35)', marginTop:1 }}>{p.role}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── HIGHLIGHTS ── */}
        {tab === 'Highlights' && (
          <div>
            <p className="t-section-label" style={{ marginBottom:12 }}>What to Expect</p>
            <p style={{ fontSize:13, color:'var(--white-40)', lineHeight:1.8, marginBottom:24 }}>
              AS YOLO 2026 is a purpose-packed, Spirit-filled gathering designed for the young and
              the bold — those ready to discover who they are and why they are here.
            </p>

            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10, marginBottom:24 }}>
              {[
                { title:'Purpose Discovery', desc:'Uncover your God-given calling',    color:'#00C9A7' },
                { title:'Career Guidance',   desc:'Navigate your future boldly',       color:'#F0A500' },
                { title:'Faith Walk',        desc:'Rooted in Christ, rising higher',   color:'#a855f7' },
                { title:'Mentorship',        desc:'Connect with inspiring leaders',    color:'#3b82f6' },
                { title:'Drama & Arts',      desc:'Creative expressions of truth',     color:'#ec4899' },
                { title:'Worship & Praise',  desc:'Encounter the presence of God',    color:'#10b981' },
              ].map((item)=>(
                <div key={item.title} className="card" style={{ padding:'16px' }}>
                  <div style={{
                    width:8, height:8, borderRadius:'50%',
                    background: item.color,
                    marginBottom:10,
                    boxShadow:`0 0 8px ${item.color}60`
                  }} />
                  <p style={{ fontSize:12, fontWeight:800, color:'rgba(255,255,255,0.85)', marginBottom:4, lineHeight:1.2 }}>{item.title}</p>
                  <p style={{ fontSize:11, color:'rgba(255,255,255,0.35)', lineHeight:1.5 }}>{item.desc}</p>
                </div>
              ))}
            </div>

            {/* Logistics */}
            <div className="card card-gold" style={{ padding:'16px 18px', marginBottom:16 }}>
              <p className="t-section-label" style={{ marginBottom:12 }}>Event Logistics</p>
              {[
                ['Venue','Overcomers Nation Church, Opposite Ayrton Drug, Tesano'],
                ['Date','Saturday, 4th July 2026'],
                ['Time','1:00 PM Prompt'],
                ['Dress','Smart Casual'],
                ['Entry','Free — Invite a friend'],
                ['Contact','0532458862 / 0546363957'],
              ].map(([k,v])=>(
                <div key={k} style={{ display:'flex', gap:10, marginBottom:8 }}>
                  <span style={{ fontSize:9, fontWeight:800, letterSpacing:'0.1em', textTransform:'uppercase', color:'rgba(255,255,255,0.25)', minWidth:48, paddingTop:2 }}>{k}</span>
                  <span style={{ fontSize:12, color:'rgba(255,255,255,0.65)', fontWeight:500, lineHeight:1.5 }}>{v}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
