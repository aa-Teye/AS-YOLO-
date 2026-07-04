import { BrowserRouter, Routes, Route, useLocation, Link } from 'react-router-dom';
import { Home, ClipboardList, Share2, UserPlus } from 'lucide-react';
import Landing from './pages/Landing';
import Register from './pages/Register';
import Program from './pages/Program';
import Social from './pages/Social';

const NAV = [
  { to: '/',         label: 'Home',    icon: Home },
  { to: '/program',  label: 'Program', icon: ClipboardList },
  { to: '/register', label: 'Register',icon: UserPlus },
  { to: '/social',   label: 'Connect', icon: Share2 },
];

function BottomNav() {
  const { pathname } = useLocation();

  return (
    <nav className="bottom-nav safe-bottom">
      {NAV.map(({ to, label, icon: Icon }) => {
        const active = pathname === to;
        return (
          <Link key={to} to={to} className={`bottom-nav-item${active ? ' active' : ''}`}>
            <Icon size={20} className="nav-icon" />
            <span className="nav-label">{label}</span>
          </Link>
        );
      })}
    </nav>
  );
}

function AppLayout() {
  return (
    <>
      <Routes>
        <Route path="/"         element={<Landing />} />
        <Route path="/register" element={<Register />} />
        <Route path="/program"  element={<Program />} />
        <Route path="/social"   element={<Social />} />
        <Route path="*"         element={<Landing />} />
      </Routes>
      <BottomNav />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
}
