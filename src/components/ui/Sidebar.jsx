import React, { useEffect, useRef, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { useAuth } from '../../context/AuthContext';
import ThemeToggle from './ThemeToggle';

const NAV = [
  {
    section: 'MAIN',
    items: [
      { icon: '🏠', text: 'Home',      to: '/home' },
      { icon: '💬', text: 'AI Chat',   to: '/ai-chat' },
      { icon: '📔', text: 'Journal',   to: '/journel' },
      { icon: '🧘', text: 'Exercises', to: '/exercises' },
    ],
  },
  {
    section: 'ADVANCED',
    items: [
      { icon: '🎶', text: 'Soundscapes',    to: '/soundscapes' },
      { icon: '🫂', text: 'Community',      to: '/community-support' },
      { icon: '🩺', text: 'Find Therapist', to: '/find-therapist' },
    ],
  },
  {
    section: 'EMERGENCY',
    items: [
      { icon: '📞', text: 'Crisis Support', to: '/crises-support', emergency: true },
    ],
  },
];

const Sidebar = () => {
  const navigate   = useNavigate();
  const { user, logout } = useAuth() || {};
  const [open, setOpen] = useState(true);

  const drawerRef  = useRef(null);
  const overlayRef = useRef(null);
  const logoRef    = useRef(null);
  const itemsRef   = useRef([]);
  const burgerRef  = useRef(null);
  const bar1 = useRef(null);
  const bar2 = useRef(null);
  const bar3 = useRef(null);
  const auroraRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(drawerRef.current,
      { x: -280, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.7, ease: 'power3.out', delay: 0.1 }
    );
    gsap.fromTo(logoRef.current,
      { opacity: 0, y: -16 },
      { opacity: 1, y: 0, duration: 0.5, delay: 0.5, ease: 'back.out(1.4)' }
    );
    gsap.fromTo(itemsRef.current.filter(Boolean),
      { opacity: 0, x: -24 },
      { opacity: 1, x: 0, stagger: 0.05, duration: 0.45, delay: 0.55, ease: 'power3.out' }
    );
    gsap.to(auroraRef.current, {
      backgroundPosition: '200% center',
      duration: 4, repeat: -1, ease: 'none',
    });
  }, []);

  const animateBurgerOpen = () => {
    gsap.to(bar1.current, { rotation: 45,  y: 7,  duration: 0.3, ease: 'power3.inOut' });
    gsap.to(bar2.current, { opacity: 0, scaleX: 0, duration: 0.2 });
    gsap.to(bar3.current, { rotation: -45, y: -7, duration: 0.3, ease: 'power3.inOut' });
  };
  const animateBurgerClose = () => {
    gsap.to(bar1.current, { rotation: 0, y: 0, duration: 0.3, ease: 'power3.inOut' });
    gsap.to(bar2.current, { opacity: 1, scaleX: 1, duration: 0.2, delay: 0.1 });
    gsap.to(bar3.current, { rotation: 0, y: 0, duration: 0.3, ease: 'power3.inOut' });
  };

  const toggleSidebar = () => {
    if (open) {
      gsap.to(drawerRef.current, { x: -280, duration: 0.45, ease: 'power3.inOut' });
      gsap.to(overlayRef.current, { opacity: 0, duration: 0.3, pointerEvents: 'none' });
      animateBurgerClose();
    } else {
      gsap.to(drawerRef.current, { x: 0, duration: 0.45, ease: 'power3.out' });
      gsap.to(overlayRef.current, { opacity: 1, duration: 0.3, pointerEvents: 'auto' });
      animateBurgerOpen();
    }
    setOpen(o => !o);
  };

  const handleLogout = () => {
    if (logout) logout();
    navigate('/login');
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:wght@600;700&family=Instrument+Sans:wght@500;600;700&display=swap');

        .sb2-overlay {
          position: fixed; inset: 0; z-index: 40;
          background: rgba(5,3,15,0.6);
          backdrop-filter: blur(4px);
          opacity: 0; pointer-events: none;
          transition: opacity 0.3s;
        }

        .sb2-drawer {
          position: fixed; left: 0; top: 0; bottom: 0;
          width: 264px; z-index: 50;
          background: var(--sidebar-bg);
          display: flex; flex-direction: column;
          box-shadow: 6px 0 60px rgba(139,108,244,0.15), 2px 0 0 var(--sidebar-border);
          overflow: hidden;
          transition: background 0.35s;
        }

        /* Subtle grid inside drawer */
        .sb2-grid {
          position: absolute; inset: 0; pointer-events: none; opacity: 0.025;
          background-image:
            linear-gradient(rgba(139,108,244,1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(139,108,244,1) 1px, transparent 1px);
          background-size: 32px 32px;
        }

        /* Aurora top strip */
        .sb2-aurora {
          height: 3px; flex-shrink: 0;
          background: linear-gradient(90deg, #7c3aed, #ec4899, #06b6d4, #22c993, #f59e0b, #7c3aed);
          background-size: 200% 100%;
        }

        /* Logo */
        .sb2-logo-area {
          padding: 20px 20px 16px;
          display: flex; align-items: center; gap: 12px;
          border-bottom: 1px solid var(--sidebar-border);
          position: relative; z-index: 1;
        }
        .sb2-logo-gem {
          width: 42px; height: 42px;
          background: linear-gradient(135deg, #7c3aed, #c026d3);
          border-radius: 13px;
          display: flex; align-items: center; justify-content: center;
          font-size: 1.2rem; flex-shrink: 0;
          box-shadow: 0 0 20px rgba(124,58,237,0.5), 0 0 40px rgba(124,58,237,0.15);
          animation: gem-glow 3s ease-in-out infinite;
        }
        @keyframes gem-glow {
          0%,100%{ box-shadow: 0 0 20px rgba(124,58,237,0.5), 0 0 40px rgba(124,58,237,0.15); }
          50%    { box-shadow: 0 0 28px rgba(192,38,211,0.7), 0 0 60px rgba(124,58,237,0.25); }
        }
        .sb2-app-name {
          font-family: 'Fraunces', serif;
          font-size: 1rem; font-weight: 700;
          color: var(--sidebar-active-text); letter-spacing: -0.02em;
          transition: color 0.35s;
        }
        .sb2-app-tagline {
          font-family: 'Instrument Sans', sans-serif;
          font-size: 0.65rem; color: rgba(139,108,244,0.45);
          font-weight: 500; margin-top: 1px;
        }

        /* User pill */
        .sb2-user-pill {
          margin: 12px 14px 4px;
          background: var(--bg-card);
          border: 1px solid var(--sidebar-border);
          border-radius: 14px; padding: 10px 13px;
          display: flex; align-items: center; gap: 10px;
          position: relative; z-index: 1;
          transition: background 0.35s, border-color 0.35s;
        }
        .sb2-avatar {
          width: 32px; height: 32px;
          background: linear-gradient(135deg, #7c3aed, #ec4899);
          display: flex; align-items: center; justify-content: center;
          font-family: 'Fraunces', serif;
          font-size: 0.9rem; font-weight: 700; color: white;
          flex-shrink: 0; border-radius: 50%;
        }
        .sb2-user-name {
          font-family: 'Instrument Sans', sans-serif;
          font-size: 0.82rem; font-weight: 600; color: var(--text-secondary);
          transition: color 0.35s;
        }
        .sb2-user-email {
          font-family: 'Instrument Sans', sans-serif;
          font-size: 0.67rem; color: var(--text-muted);
          margin-top: 1px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; max-width: 140px;
          transition: color 0.35s;
        }

        /* Nav scroll */
        .sb2-nav {
          flex: 1; overflow-y: auto; padding: 6px 10px 14px;
          position: relative; z-index: 1;
        }
        .sb2-nav::-webkit-scrollbar { width: 2px; }
        .sb2-nav::-webkit-scrollbar-thumb { background: rgba(139,108,244,0.15); border-radius: 10px; }

        .sb2-section-label {
          font-family: 'Instrument Sans', sans-serif;
          font-size: 0.58rem; font-weight: 700;
          letter-spacing: 0.13em; text-transform: uppercase;
          color: var(--sidebar-section-label);
          padding: 12px 10px 4px;
          transition: color 0.35s;
        }

        /* Nav items */
        .sb2-item {
          display: flex; align-items: center; gap: 11px;
          padding: 9px 12px; border-radius: 12px;
          text-decoration: none;
          font-family: 'Instrument Sans', sans-serif;
          font-size: 0.855rem; font-weight: 500;
          color: var(--sidebar-text);
          transition: all 0.18s;
          position: relative; margin-bottom: 1px;
          overflow: hidden;
        }
        .sb2-item::before {
          content: '';
          position: absolute; inset: 0;
          background: linear-gradient(90deg, rgba(139,108,244,0.12), transparent);
          opacity: 0; transition: opacity 0.2s; border-radius: 12px;
        }
        .sb2-item:hover { color: var(--text-secondary); }
        .sb2-item:hover::before { opacity: 1; }

        .sb2-item.sb2-active {
          background: var(--sidebar-active-bg);
          color: var(--sidebar-active-text);
          box-shadow: 0 0 0 1px rgba(139,108,244,0.18), inset 0 1px 0 rgba(255,255,255,0.04);
        }
        .sb2-item.sb2-active::after {
          content: '';
          position: absolute; right: 0; top: 50%; transform: translateY(-50%);
          width: 3px; height: 55%; border-radius: 10px 0 0 10px;
          background: linear-gradient(180deg, #a78bfa, #ec4899);
        }

        /* Emergency */
        .sb2-item.sb2-emergency {
          background: rgba(239,68,68,0.07);
          color: #fca5a5;
        }
        .sb2-item.sb2-emergency:hover { background: rgba(239,68,68,0.12); }
        .sb2-item.sb2-emergency.sb2-active {
          background: linear-gradient(135deg, rgba(239,68,68,0.25), rgba(239,68,68,0.12));
          color: #fca5a5;
          box-shadow: 0 0 0 1px rgba(239,68,68,0.2);
        }
        .sb2-item.sb2-emergency.sb2-active::after {
          background: linear-gradient(180deg, #ef4444, #dc2626);
        }

        .sb2-item-icon {
          width: 30px; height: 30px; border-radius: 9px;
          display: flex; align-items: center; justify-content: center;
          font-size: 0.9rem; flex-shrink: 0;
          background: rgba(255,255,255,0.04);
          transition: background 0.18s;
        }
        .sb2-item.sb2-active .sb2-item-icon {
          background: rgba(139,108,244,0.18);
        }

        /* Bottom */
        .sb2-bottom {
          padding: 10px 10px 18px;
          border-top: 1px solid var(--sidebar-border);
          position: relative; z-index: 1;
          transition: border-color 0.35s;
        }
        .sb2-bottom-btn {
          display: flex; align-items: center; gap: 10px;
          padding: 8px 12px; border-radius: 11px;
          cursor: pointer; border: none; background: none;
          font-family: 'Instrument Sans', sans-serif;
          font-size: 0.82rem; font-weight: 500;
          color: var(--sidebar-bottom-btn-color);
          transition: all 0.18s; width: 100%; text-align: left;
        }
        .sb2-bottom-btn:hover { background: rgba(255,255,255,0.04); color: var(--text-secondary); }
        .sb2-bottom-btn.sb2-logout:hover { background: rgba(239,68,68,0.08); color: #fca5a5; }

        /* Hamburger */
        .sb2-burger {
          position: fixed; top: 18px; left: 18px; z-index: 60;
          width: 44px; height: 44px;
          background: linear-gradient(135deg, #7c3aed, #c026d3);
          border: none; border-radius: 13px;
          display: flex; flex-direction: column;
          align-items: center; justify-content: center; gap: 5px;
          cursor: pointer;
          box-shadow: 0 4px 20px rgba(124,58,237,0.5);
          transition: transform 0.15s;
        }
        .sb2-burger:hover { transform: scale(1.06); }
        .sb2-bar {
          width: 20px; height: 2px;
          background: white; border-radius: 2px;
          transform-origin: center; display: block;
        }
      `}</style>

      {/* Hamburger */}
      <button className="sb2-burger" ref={burgerRef} onClick={toggleSidebar} aria-label="Toggle menu">
        <span className="sb2-bar" ref={bar1} />
        <span className="sb2-bar" ref={bar2} />
        <span className="sb2-bar" ref={bar3} />
      </button>

      {/* Overlay */}
      <div className="sb2-overlay" ref={overlayRef} onClick={toggleSidebar} />

      {/* Drawer */}
      <div className="sb2-drawer" ref={drawerRef}>
        <div className="sb2-grid" />
        <div className="sb2-aurora" ref={auroraRef} />

        {/* Logo */}
        <div className="sb2-logo-area" ref={logoRef}>
          <div className="sb2-logo-gem">💜</div>
          <div>
            <div className="sb2-app-name">FitYaar</div>
            <div className="sb2-app-tagline">Your wellness companion</div>
          </div>
        </div>

        {/* User pill */}
        <div className="sb2-user-pill">
          <div className="sb2-avatar">
            {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
          </div>
          <div style={{ overflow: 'hidden' }}>
            <div className="sb2-user-name">Welcome, {user?.name || 'Friend'}!</div>
            <div className="sb2-user-email">{user?.email || ''}</div>
          </div>
        </div>

        {/* Navigation */}
        <div className="sb2-nav">
          {NAV.map((group, gi) => (
            <div key={gi}>
              <div className="sb2-section-label">{group.section}</div>
              {group.items.map((item, ii) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === '/home'}
                  ref={el => itemsRef.current.push(el)}
                  className={({ isActive }) =>
                    `sb2-item ${item.emergency ? 'sb2-emergency' : ''} ${isActive ? 'sb2-active' : ''}`
                  }
                  onClick={() => { if (!open) toggleSidebar(); }}
                >
                  <span className="sb2-item-icon">{item.icon}</span>
                  {item.text}
                </NavLink>
              ))}
            </div>
          ))}
        </div>

        {/* Bottom actions */}
        <div className="sb2-bottom">
          <button className="sb2-bottom-btn" onClick={() => navigate('/profile-settings')}>
            <span style={{ fontSize: '1rem' }}>👤</span> Profile & Settings
          </button>

          {/* Theme toggle — compact version */}
          <ThemeToggle compact={true} />

          <button className="sb2-bottom-btn sb2-logout" onClick={handleLogout}>
            <span style={{ fontSize: '1rem' }}>🚪</span> Logout
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;