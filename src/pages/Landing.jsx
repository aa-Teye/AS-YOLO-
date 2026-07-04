import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Calendar, MapPin, Clock, ChevronRight, Play, ExternalLink, ChevronLeft } from 'lucide-react';
import { PROGRAM_DATA, SOCIAL_LINKS } from '../data/programData';

const SLIDES = [
  { src: '/assets/artwork-today.png', title: 'The Haven Choir Is Ready!', subtitle: 'Join us today at 1:00 PM Prompt at Overcomers Nation Church.' },
  { src: '/assets/artwork-ebenezer.png', title: 'Rev. Dr. Ebenezer Okronipa', subtitle: 'Purpose Discovery and the Prophetic and Impactation.' },
  { src: '/assets/artwork-abigail.png', title: 'Mrs. Abigail Akakpo', subtitle: 'Relationships, Boundaries and God\'s Design.' },
  { src: '/assets/artwork-esther.png', title: 'LP Esther Okronipa', subtitle: 'Peer Pressure and the Power of Friendship.' },
  { src: '/assets/artwork-repping.png', title: 'We Are Repping Live!', subtitle: 'Don\'t miss this glorious youth gathering.' },
  { src: '/assets/artwork-tina.png', title: 'Spicey Drama with Tina', subtitle: 'See you this Saturday at 1:00 PM Prompt.' },
  { src: '/assets/artwork-spiders.png', title: 'Spiders Dance Crew', subtitle: 'Get ready for an exciting and powerful time!' },
];

export default function Landing() {
  const nav = useNavigate();
  const [slideIdx, setSlideIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setSlideIdx(prev => (prev + 1) % SLIDES.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setSlideIdx(prev => (prev + 1) % SLIDES.length);
  const prevSlide = () => setSlideIdx(prev => (prev - 1 + SLIDES.length) % SLIDES.length);

  return (
    <div style={{ background: 'var(--navy)', minHeight: '100dvh', display: 'flex', flexDirection: 'column' }}>

      {/* ── HERO ── */}
      <section className="hero" style={{ minHeight: '100dvh' }}>
        <div className="hero-bg" />
        <div className="hero-overlay" />

        <div className="hero-content" style={{ paddingBottom: 100 }}>

          {/* Org tag */}
          <p className="t-overline anim-up d1" style={{ marginBottom: 20 }}>
            ONCYM
          </p>

          {/* Real Haven Logo */}
          <div className="anim-up d1" style={{ marginBottom: 20 }}>
            <img
              src="/assets/haven-logo.png"
              alt="The Haven Logo"
              style={{ width: 80, height: 'auto', filter: 'drop-shadow(0 0 20px rgba(61,143,163,0.4))' }}
            />
          </div>

          {/* Title */}
          <h1 className="t-hero-title anim-up d2" style={{ marginBottom: 6 }}>AS YOLO</h1>
          <p className="anim-up d2" style={{ color:'var(--teal)', fontWeight:700, letterSpacing:'0.3em', fontSize:14, marginBottom:24 }}>2026</p>

          {/* Gold rule */}
          <div className="divider-gold anim-up d3" style={{ width:120, margin:'0 auto 24px' }} />

          {/* Theme */}
          <h2 className="t-theme anim-up d3" style={{ marginBottom:12 }}>Purpose Before Pressure</h2>
          <p className="t-subtheme anim-up d4" style={{ marginBottom:32 }}>
            "Don't Just Exist. Discover. Decide. Live on Purpose. Live Bold. Live Purposeful. — Live Once."
          </p>

          {/* Event chips */}
          <div className="anim-up d4" style={{ display:'flex', flexDirection:'column', gap:8, marginBottom:32, width:'100%', maxWidth:320 }}>
            {[
              { icon:<Calendar size={14}/>, text:'Saturday, 4th July 2026' },
              { icon:<Clock size={14}/>,    text:'1:00 PM Prompt' },
              { icon:<MapPin size={14}/>,   text:'Overcomers Nation Church, Tesano' },
            ].map(({icon, text}, i) => (
              <div key={i} style={{
                display:'flex', alignItems:'center', gap:10,
                background:'rgba(255,255,255,0.06)', backdropFilter:'blur(8px)',
                border:'1px solid rgba(255,255,255,0.09)', borderRadius:8, padding:'10px 14px'
              }}>
                <span style={{ color:'var(--gold)', flexShrink:0 }}>{icon}</span>
                <span style={{ fontSize:13, color:'var(--white-70)', fontWeight:500 }}>{text}</span>
              </div>
            ))}
          </div>

          {/* Audience tags */}
          <div className="anim-up d4" style={{ display:'flex', flexWrap:'wrap', gap:8, justifyContent:'center', marginBottom:36 }}>
            {PROGRAM_DATA.targetAudience.map(tag=>(
              <span key={tag} className="badge badge-teal">{tag}</span>
            ))}
          </div>

          {/* CTAs */}
          <div className="anim-up d5" style={{ display:'flex', gap:12, width:'100%', maxWidth:300 }}>
            <button id="cta-register" onClick={()=>nav('/register')} className="btn btn-gold btn-lg" style={{ flex:1 }}>
              Register
              <ChevronRight size={16} />
            </button>
            <button id="cta-program" onClick={()=>nav('/program')} className="btn btn-outline btn-lg" style={{ flex:1 }}>
              Program
            </button>
          </div>

          <p className="anim-up d5" style={{ fontSize:11, color:'var(--white-20)', fontWeight:600, letterSpacing:'0.15em', textTransform:'uppercase', marginTop:16 }}>
            Free Entry &nbsp;·&nbsp; Smart Casual
          </p>
        </div>

        {/* Scroll arrow */}
        <div style={{ position:'absolute', bottom:80, left:'50%', transform:'translateX(-50%)', zIndex:3, opacity:0.35 }}>
          <div style={{ width:1, height:40, background:'linear-gradient(to bottom, transparent, var(--teal))', margin:'0 auto 4px' }} />
          <div style={{ fontSize:9, fontWeight:700, letterSpacing:'0.2em', color:'var(--teal)', textTransform:'uppercase' }}>SCROLL</div>
        </div>
      </section>

      {/* ── TODAY COUNTDOWN BANNER (SLIDESHOW) ── */}
      <section style={{ padding: '24px 20px 0', background: 'var(--navy)' }}>
        <p className="t-section-label" style={{ marginBottom: 12 }}>Today's Feature</p>
        <div className="card card-gold" style={{ overflow: 'hidden', position: 'relative', boxShadow: '0 8px 32px rgba(196,146,42,0.15)' }}>
          
          {/* Active slide view */}
          <div style={{ position: 'relative' }}>
            <img 
              src={SLIDES[slideIdx].src} 
              alt={SLIDES[slideIdx].title} 
              style={{ width: '100%', height: 'auto', display: 'block', transition: 'all 0.5s ease-in-out' }} 
            />
            
            {/* Arrows */}
            <button onClick={prevSlide} style={{
              position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)',
              background: 'rgba(5,13,26,0.6)', border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '50%', width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'white', cursor: 'pointer', zIndex: 10
            }}>
              <ChevronLeft size={18} />
            </button>
            <button onClick={nextSlide} style={{
              position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)',
              background: 'rgba(5,13,26,0.6)', border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '50%', width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'white', cursor: 'pointer', zIndex: 10
            }}>
              <ChevronRight size={18} />
            </button>

            {/* Info overlay */}
            <div style={{
              background: 'linear-gradient(to top, rgba(5,13,26,0.95) 0%, rgba(5,13,26,0.4) 70%, transparent 100%)',
              padding: '36px 16px 20px', position: 'absolute', bottom: 0, left: 0, right: 0
            }}>
              <span className="badge badge-gold" style={{ marginBottom: 8 }}>Highlights</span>
              <h3 style={{ fontSize: 16, fontWeight: 800, color: 'white', marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                {SLIDES[slideIdx].title}
              </h3>
              <p style={{ fontSize: 12, color: 'var(--white-60)', lineHeight: 1.4 }}>
                {SLIDES[slideIdx].subtitle}
              </p>
            </div>
          </div>

          {/* Dots Indicators */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: 6, padding: '10px 0', background: 'rgba(5,13,26,0.95)' }}>
            {SLIDES.map((_, i) => (
              <button 
                key={i} 
                onClick={() => setSlideIdx(i)}
                style={{
                  width: i === slideIdx ? 16 : 6, height: 6, borderRadius: 3,
                  background: i === slideIdx ? 'var(--gold)' : 'rgba(255,255,255,0.2)',
                  border: 'none', cursor: 'pointer', transition: 'all 0.25s'
                }}
              />
            ))}
          </div>

        </div>
      </section>

      {/* ── WELCOME VIDEO SECTION ── */}
      {/* To add your video: replace VIDEO_URL with your YouTube embed link or local file path */}
      {/* e.g. 'https://www.youtube.com/embed/YOUR_VIDEO_ID' or '/assets/welcome-video.mp4' */}
      <section style={{ background:'var(--navy)', padding:'20px 20px 0' }}>
        {(() => {
          const VIDEO_URL = ''; // PASTE YOUR VIDEO EMBED URL OR LOCAL FILE PATH HERE
          const isLocalVideo = VIDEO_URL && !VIDEO_URL.includes('youtube.com') && !VIDEO_URL.includes('youtu.be') && !VIDEO_URL.includes('facebook.com');

          if (!VIDEO_URL) {
            return (
              <div style={{
                borderRadius:16,
                background:'rgba(0,201,167,0.04)',
                border:'1px dashed rgba(0,201,167,0.18)',
                padding:'28px 20px', textAlign:'center'
              }}>
                <div style={{
                  width:56, height:56, borderRadius:'50%', margin:'0 auto 14px',
                  background:'rgba(0,201,167,0.1)', border:'1.5px solid rgba(0,201,167,0.25)',
                  display:'flex', alignItems:'center', justifyContent:'center'
                }}>
                  <svg viewBox="0 0 24 24" fill="none" width="24" height="24">
                    <circle cx="12" cy="12" r="10" stroke="#00C9A7" strokeWidth="1.5"/>
                    <path d="M10 8l6 4-6 4V8z" fill="#00C9A7"/>
                  </svg>
                </div>
                <p style={{ fontWeight:800, fontSize:14, color:'rgba(255,255,255,0.6)', marginBottom:5 }}>
                  Welcome from The Haven - ONCYM
                </p>
                <p style={{ fontSize:11, color:'rgba(255,255,255,0.25)', lineHeight:1.7 }}>
                  Your welcome video will appear here.<br/>
                  Share the link or local file path to embed it.
                </p>
              </div>
            );
          }

          return isLocalVideo ? (
            <div style={{ position:'relative', width:'100%', borderRadius:16, overflow:'hidden', border:'1px solid rgba(255,255,255,0.1)' }}>
              <video
                src={VIDEO_URL}
                controls
                playsInline
                style={{ width:'100%', height:'auto', display:'block' }}
              />
            </div>
          ) : (
            <div style={{ position:'relative', paddingTop:'56.25%', width:'100%', borderRadius:16, overflow:'hidden' }}>
              <iframe
                src={VIDEO_URL}
                title="Welcome to The Haven - ONCYM — AS YOLO 2026"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{ position:'absolute', top:0, left:0, width:'100%', height:'100%', border:'none' }}
              />
            </div>
          );
        })()}
      </section>


      {/* ── QUICK INFO SECTION ── */}
      <section style={{ padding:'36px 20px 28px', background:'var(--navy-mid)' }}>
        <p className="t-section-label" style={{ marginBottom:20 }}>About the Event</p>
        <p style={{ fontSize:14, color:'var(--white-70)', lineHeight:1.8, marginBottom:24 }}>
          A powerful, purpose-filled gathering for young people at the crossroads of life — crafted by{' '}
          <span style={{ color:'var(--teal-light)', fontWeight:600 }}>The Haven - ONCYM</span>, the youth ministry of{' '}
          <span style={{ color:'var(--white-60)', fontWeight:600 }}>Overcomers Nation Church</span>.
        </p>

        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10 }}>
          {PROGRAM_DATA.focusAreas.map(area=>(
            <div key={area} className="card" style={{ padding:'14px 16px', display:'flex', alignItems:'center', gap:10 }}>
              <div style={{ width:6, height:6, borderRadius:'50%', background:'var(--teal)', flexShrink:0 }} />
              <span style={{ fontSize:12, fontWeight:600, color:'var(--white-70)' }}>{area}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── LIVESTREAM BANNER ── */}
      {SOCIAL_LINKS.filter(l=>l.isLivestream).map(link=>(
        <a key={link.id} href={link.url} target="_blank" rel="noopener noreferrer"
          style={{ display:'block', margin:'0', textDecoration:'none' }}>
          <div style={{
            background:'linear-gradient(135deg, rgba(220,38,38,0.15), rgba(29,78,216,0.15))',
            border:'1px solid rgba(220,38,38,0.25)', borderLeft:'none', borderRight:'none',
            padding:'16px 20px', display:'flex', alignItems:'center', justifyContent:'space-between'
          }}>
            <div style={{ display:'flex', alignItems:'center', gap:12 }}>
              <div style={{
                width:36, height:36, borderRadius:8, background:'#1877F2',
                display:'flex', alignItems:'center', justifyContent:'center', color:'white', flexShrink:0
              }}>
                <Play size={16} fill="white" />
              </div>
              <div>
                <div style={{ display:'flex', alignItems:'center', gap:6, marginBottom:2 }}>
                  <span className="badge badge-live">Live Stream</span>
                </div>
                <p style={{ fontSize:12, fontWeight:600, color:'var(--white-70)' }}>Watch on Facebook — {link.handle}</p>
              </div>
            </div>
            <ExternalLink size={16} style={{ color:'rgba(255,255,255,0.3)', flexShrink:0 }} />
          </div>
        </a>
      ))}



      {/* ── ENQUIRIES FOOTER ── */}
      <div style={{ padding:'20px 20px 100px', textAlign:'center' }}>
        <p style={{ fontSize:10, fontWeight:700, letterSpacing:'0.2em', textTransform:'uppercase', color:'rgba(255,255,255,0.2)' }}>
          Enquiries: {PROGRAM_DATA.enquiries.join(' / ')}
        </p>
        <p style={{ fontSize:10, color:'rgba(255,255,255,0.12)', marginTop:6, fontStyle:'italic' }}>
          Rooted in Christ, Rising in Purpose
        </p>
      </div>
    </div>
  );
}

