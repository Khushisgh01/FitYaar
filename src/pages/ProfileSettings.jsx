import React, { useEffect, useRef, useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import Sidebar from '../components/ui/Sidebar';
import { useAuth } from '../context/AuthContext';

const NAV_ITEMS = [
  { to: '/profile-settings',              end: true,  icon: '⚙️',  label: 'Preferences',   color: '#a78bfa' },
  { to: '/profile-settings/notifications', end: false, icon: '🔔',  label: 'Notifications', color: '#34d399' },
  { to: '/profile-settings/privacy',       end: false, icon: '🛡️',  label: 'Privacy',       color: '#60a5fa' },
  { to: '/profile-settings/about',         end: false, icon: 'ℹ️',  label: 'About',         color: '#f472b6' },
];

const ProfileSettings = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const rootRef    = useRef(null);
  const orb1       = useRef(null);
  const orb2       = useRef(null);
  const orb3       = useRef(null);
  const heroRef    = useRef(null);
  const avatarRef  = useRef(null);
  const navRef     = useRef(null);
  const cardRef    = useRef(null);
  const navItemRefs = useRef([]);

  const [glowIdx, setGlowIdx] = useState(0);
  const glowColors = ['#a78bfa', '#f472b6', '#60a5fa', '#34d399'];

  useEffect(() => {
    const id = setInterval(() => setGlowIdx(i => (i + 1) % glowColors.length), 2000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    gsap.to(orb1.current, { x: 60, y: -40, duration: 7, repeat: -1, yoyo: true, ease: 'sine.inOut' });
    gsap.to(orb2.current, { x: -50, y: 55, duration: 9, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 1.2 });
    gsap.to(orb3.current, { x: 35, y: 30, duration: 6, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 2.5 });

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    tl.fromTo(heroRef.current,   { opacity: 0, y: -40 }, { opacity: 1, y: 0, duration: 0.8 })
      .fromTo(avatarRef.current, { scale: 0, rotation: -180, opacity: 0 }, { scale: 1, rotation: 0, opacity: 1, duration: 0.9, ease: 'back.out(1.7)' }, '-=0.5')
      .fromTo(navItemRefs.current, { opacity: 0, x: -30 }, { opacity: 1, x: 0, stagger: 0.08, duration: 0.5 }, '-=0.4')
      .fromTo(cardRef.current, { opacity: 0, y: 50, scale: 0.96 }, { opacity: 1, y: 0, scale: 1, duration: 0.7 }, '-=0.3');

    gsap.to(avatarRef.current, { y: -8, duration: 3, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 1 });
  }, []);

  const handleLogout = () => {
    gsap.to(rootRef.current, {
      opacity: 0, scale: 0.97, duration: 0.4, ease: 'power2.in',
      onComplete: () => { logout(); navigate('/login'); }
    });
  };

  const initials = user?.name
    ? user.name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2)
    : 'U';

  return (
    <>
      <style>{`
        .ps-root {
          display: flex; min-height: 100vh;
          background: var(--bg-primary);
          font-family: 'Plus Jakarta Sans', sans-serif;
          position: relative; overflow-x: hidden;
          transition: background 0.35s;
        }

        .ps-orb {
          position: fixed; border-radius: 50%;
          pointer-events: none; z-index: 0; filter: blur(100px);
        }
        .ps-orb-1 { width: 600px; height: 600px; background: radial-gradient(circle, var(--orb-1-color), transparent 70%); top: -150px; right: -100px; }
        .ps-orb-2 { width: 450px; height: 450px; background: radial-gradient(circle, var(--orb-2-color), transparent 70%); bottom: -80px; left: -80px; }
        .ps-orb-3 { width: 350px; height: 350px; background: radial-gradient(circle, var(--orb-3-color), transparent 70%); top: 40%; left: 30%; }

        .ps-noise {
          position: fixed; inset: 0; z-index: 0; pointer-events: none; opacity: 0.025;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
        }

        .ps-main {
          flex: 1; position: relative; z-index: 1;
          padding: 44px 52px 60px 80px;
          display: flex; flex-direction: column; gap: 32px;
        }

        .ps-hero {
          display: flex; align-items: center; gap: 28px; flex-wrap: wrap;
        }

        .ps-avatar-wrap { position: relative; flex-shrink: 0; }
        .ps-avatar {
          width: 90px; height: 90px; border-radius: 50%;
          background: linear-gradient(135deg, #7c3aed, #ec4899, #f97316);
          display: flex; align-items: center; justify-content: center;
          font-family: 'Sora', sans-serif; font-size: 2rem; font-weight: 800; color: white;
          position: relative; z-index: 1; transition: box-shadow 1s ease;
        }
        .ps-avatar-ring {
          position: absolute; inset: -8px; border-radius: 50%;
          border: 2px solid transparent;
          background: linear-gradient(135deg, #a78bfa, #f472b6, #34d399, #60a5fa) border-box;
          -webkit-mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: destination-out; mask-composite: exclude;
          animation: ring-spin 4s linear infinite;
        }
        @keyframes ring-spin { to { transform: rotate(360deg); } }
        .ps-avatar-dot {
          position: absolute; bottom: 4px; right: 4px;
          width: 18px; height: 18px; border-radius: 50%;
          background: #34d399; border: 3px solid var(--bg-primary);
          box-shadow: 0 0 12px rgba(52,211,153,0.8);
          animation: dot-pulse 2s ease-in-out infinite;
          transition: border-color 0.35s;
        }
        @keyframes dot-pulse {
          0%,100% { box-shadow: 0 0 12px rgba(52,211,153,0.8); }
          50%      { box-shadow: 0 0 24px rgba(52,211,153,1), 0 0 40px rgba(52,211,153,0.4); }
        }

        .ps-user-name {
          font-family: 'Sora', sans-serif;
          font-size: clamp(1.6rem, 3vw, 2.4rem);
          font-weight: 800; color: var(--text-primary);
          letter-spacing: -0.03em; line-height: 1; margin-bottom: 6px;
          transition: color 0.35s;
        }
        .ps-user-email { font-size: 0.9rem; color: var(--text-muted); font-weight: 400; transition: color 0.35s; }
        .ps-user-badge {
          display: inline-flex; align-items: center; gap: 6px;
          background: rgba(52,211,153,0.12); border: 1px solid rgba(52,211,153,0.3);
          padding: 4px 12px; border-radius: 100px;
          font-size: 0.72rem; font-weight: 700; color: #34d399;
          letter-spacing: 0.06em; text-transform: uppercase; margin-top: 10px;
        }

        .ps-logout-btn {
          margin-left: auto; display: flex; align-items: center; gap: 8px;
          padding: 10px 22px; border-radius: 100px;
          background: rgba(239,68,68,0.08); border: 1px solid rgba(239,68,68,0.2);
          color: #f87171; font-size: 0.875rem; font-weight: 600;
          cursor: pointer; transition: all 0.2s; font-family: inherit;
        }
        .ps-logout-btn:hover {
          background: rgba(239,68,68,0.18); border-color: #f87171;
          box-shadow: 0 0 20px rgba(239,68,68,0.2); transform: translateY(-1px);
        }

        .ps-nav {
          display: flex; gap: 6px; flex-wrap: wrap;
          background: var(--nav-bg);
          border: 1px solid var(--nav-border);
          border-radius: 20px; padding: 6px;
          backdrop-filter: blur(10px);
          transition: background 0.35s, border-color 0.35s;
        }
        .ps-nav-item {
          flex: 1; min-width: 120px;
          display: flex; align-items: center; justify-content: center; gap: 8px;
          padding: 12px 20px; border-radius: 14px;
          text-decoration: none;
          font-size: 0.875rem; font-weight: 600;
          color: var(--nav-link-color);
          transition: all 0.25s; position: relative; overflow: hidden;
        }
        .ps-nav-item:hover { color: var(--text-secondary); background: var(--bg-card-hover); }
        .ps-nav-item.ps-active {
          background: linear-gradient(135deg, rgba(124,58,237,0.25), rgba(192,38,211,0.15));
          color: var(--accent-violet-lt);
          box-shadow: 0 0 0 1px rgba(167,139,250,0.25), 0 4px 20px rgba(124,58,237,0.2);
        }

        .ps-card {
          background: var(--bg-card);
          border: 1px solid var(--border-card);
          border-radius: 28px;
          backdrop-filter: blur(16px);
          padding: 40px;
          box-shadow: var(--shadow-card);
          position: relative; overflow: hidden;
          transition: background 0.35s, border-color 0.35s;
        }
        .ps-card::before {
          content: '';
          position: absolute; top: 0; left: 0; right: 0; height: 1px;
          background: linear-gradient(90deg, transparent, rgba(167,139,250,0.4), rgba(244,114,182,0.4), transparent);
        }
      `}</style>

      <div className="ps-root" ref={rootRef}>
        <div className="ps-orb ps-orb-1" ref={orb1} />
        <div className="ps-orb ps-orb-2" ref={orb2} />
        <div className="ps-orb ps-orb-3" ref={orb3} />
        <div className="ps-noise" />
        <div className="theme-bg-grid" />

        <Sidebar />

        <div className="ps-main">
          <div className="ps-hero" ref={heroRef}>
            <div className="ps-avatar-wrap" ref={avatarRef}>
              <div className="ps-avatar-ring" />
              <div
                className="ps-avatar"
                style={{ boxShadow: `0 0 0 4px rgba(167,139,250,0.3), 0 0 40px ${glowColors[glowIdx]}70, 0 0 80px ${glowColors[glowIdx]}30` }}
              >
                {initials}
              </div>
              <div className="ps-avatar-dot" />
            </div>

            <div>
              <div className="ps-user-name">{user?.name || 'Your Profile'}</div>
              <div className="ps-user-email">{user?.email || 'user@email.com'}</div>
              <div className="ps-user-badge">
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#34d399', display: 'inline-block' }} />
                Active Member
              </div>
            </div>

            <button className="ps-logout-btn" onClick={handleLogout}>
              <span>🚪</span> Sign out
            </button>
          </div>

          <nav className="ps-nav" ref={navRef}>
            {NAV_ITEMS.map((item, i) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                ref={el => navItemRefs.current[i] = el}
                className={({ isActive }) => `ps-nav-item ${isActive ? 'ps-active' : ''}`}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </NavLink>
            ))}
          </nav>

          <div className="ps-card" ref={cardRef}>
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileSettings;