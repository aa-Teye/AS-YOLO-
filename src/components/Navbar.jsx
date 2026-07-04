// Navbar is no longer rendered as top bar — navigation is handled by BottomNav in App.jsx
// This file exports the HavenBadge/logo component for reuse

export function HavenBadge({ size = 56 }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: '50%',
      background: 'linear-gradient(135deg, rgba(0,201,167,0.15), rgba(240,165,0,0.1))',
      border: '1.5px solid rgba(240,165,0,0.4)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      boxShadow: '0 0 40px rgba(0,201,167,0.15)',
    }}>
      <svg viewBox="0 0 100 100" width={size * 0.68} height={size * 0.68} xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="48" fill="none" stroke="#F0A500" strokeWidth="2" />
        <circle cx="50" cy="50" r="43" fill="rgba(5,9,26,0.8)" />
        <g transform="translate(50,53)" fill="none" stroke="#F0A500" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="0" y1="-20" x2="0" y2="17" />
          <circle cx="0" cy="-20" r="3.5" strokeWidth="2" />
          <line x1="-12" y1="-11" x2="12" y2="-11" />
          <path d="M-9,17 Q-16,13 -16,7 Q-16,2 -9,2" />
          <path d="M9,17 Q16,13 16,7 Q16,2 9,2" />
          <path d="M-9,17 Q0,21 9,17" />
        </g>
        <g fill="#00C9A7" opacity="0.9">
          <path d="M50,42 Q32,31 19,40 Q26,41 29,46 Q36,38 50,44 Z" />
          <path d="M50,42 Q68,31 81,40 Q74,41 71,46 Q64,38 50,44 Z" />
          <ellipse cx="50" cy="40" rx="5.5" ry="6.5" />
          <path d="M50,35 L54,38 L50,41 Z" fill="#F0A500" />
        </g>
      </svg>
    </div>
  );
}

export default function Navbar() {
  return null; // Bottom nav used instead — see App.jsx
}
