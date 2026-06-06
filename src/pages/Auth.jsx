// // src/pages/Auth.jsx

// import React from 'react';
// import AuthForm from '../components/auth/AuthForm';
// import Sidebar from '../components/ui/Sidebar';
// import { useParams } from 'react-router-dom';

// // Note: Since App.jsx routes to /login and /signup, 
// // we can use a single component here and differentiate the content.

// const Auth = () => {
//     // Use window.location.pathname or useParams to check if it's /login or /signup
//     const isLoginPage = window.location.pathname.includes('/login');

//     return (
//         <div className='flex min-h-screen bg-gray-50'>
//             {/* The Sidebar remains visible */}
//             <Sidebar /> 
            
//             <div className='flex-1 p-8 overflow-y-auto'>
//                 <AuthForm type={isLoginPage ? 'login' : 'signup'} />
//             </div>
//         </div>
//     );
// };

// export default Auth;
import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { useAuth } from '../context/AuthContext';

/* ─── Floating background cards data ─────────────────────────────── */
const FLOAT_CARDS = [
  { emoji: '🧘', text: 'Breathing Exercise',  sub: '4-7-8 technique',      x: '4%',  y: '12%', rot: -8  },
  { emoji: '📔', text: 'Journal Entry',       sub: 'Feeling grateful...',  x: '72%', y: '8%',  rot: 6   },
  { emoji: '💬', text: 'AI Support Chat',     sub: 'MindfulBot online',    x: '80%', y: '62%', rot: -5  },
  { emoji: '🎵', text: 'Ocean Waves',         sub: 'Now playing...',       x: '3%',  y: '65%', rot: 7   },
  { emoji: '🔥', text: '7-Day Streak!',       sub: 'Keep it going',        x: '60%', y: '82%', rot: -4  },
  { emoji: '🩺', text: 'Dr. Sarah Chen',      sub: 'Therapist · CBT',      x: '18%', y: '82%', rot: 3   },
  { emoji: '✅', text: '12 Sessions Done',    sub: 'This month',           x: '76%', y: '30%', rot: 8   },
  { emoji: '🌿', text: 'Mindfulness',         sub: '3-min scan',           x: '2%',  y: '38%', rot: -6  },
];

/* ─── Blob background ──────────────────────────────────────────────── */
const BLOBS = [
  { color: 'rgba(167,139,250,0.35)', size: 500, x: '-10%',  y: '-5%'  },
  { color: 'rgba(244,114,182,0.22)', size: 420, x: '65%',   y: '-8%'  },
  { color: 'rgba(96,165,250,0.18)',  size: 380, x: '-5%',   y: '55%'  },
  { color: 'rgba(52,211,153,0.18)',  size: 360, x: '70%',   y: '60%'  },
  { color: 'rgba(251,191,36,0.15)',  size: 300, x: '35%',   y: '70%'  },
];

/* ─── Single floating card ─────────────────────────────────────────── */
const FloatCard = ({ card, cardRef, idx }) => (
  <div
    ref={el => cardRef.current[idx] = el}
    style={{
      position: 'absolute',
      left: card.x, top: card.y,
      transform: `rotate(${card.rot}deg)`,
      background: 'rgba(255,255,255,0.75)',
      backdropFilter: 'blur(14px)',
      WebkitBackdropFilter: 'blur(14px)',
      border: '1px solid rgba(255,255,255,0.9)',
      borderRadius: 18,
      padding: '10px 16px',
      display: 'flex', alignItems: 'center', gap: 10,
      boxShadow: '0 8px 32px rgba(124,58,237,0.08), 0 2px 8px rgba(0,0,0,0.06)',
      minWidth: 160, maxWidth: 200,
      userSelect: 'none', pointerEvents: 'none',
      opacity: 0,
      zIndex: 1,
    }}
  >
    <span style={{ fontSize: '1.4rem', flexShrink: 0 }}>{card.emoji}</span>
    <div>
      <div style={{
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        fontSize: '0.8rem', fontWeight: 700, color: '#1a1a2e', lineHeight: 1.2,
      }}>
        {card.text}
      </div>
      <div style={{
        fontSize: '0.7rem', color: '#7c6f9f', marginTop: 2, fontWeight: 400,
      }}>
        {card.sub}
      </div>
    </div>
  </div>
);

/* ─── Main Auth Component ──────────────────────────────────────────── */
const Auth = () => {
  const isLoginPage = window.location.pathname.includes('/login');
  const [isLogin, setIsLogin] = useState(isLoginPage);
  const [name, setName]       = useState('');
  const [email, setEmail]     = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [error, setError]     = useState('');
  const [loading, setLoading] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  const { login, register } = useAuth();
  const navigate = useNavigate();

  /* refs */
  const pageRef     = useRef(null);
  const cardRef     = useRef(null);
  const formRef     = useRef(null);
  const logoRef     = useRef(null);
  const titleRef    = useRef(null);
  const subtitleRef = useRef(null);
  const fieldsRef   = useRef(null);
  const btnRef      = useRef(null);
  const floatCards  = useRef([]);
  const blobRefs    = useRef([]);
  const switchRef   = useRef(null);
  const errorRef    = useRef(null);

  /* ── entrance animation ── */
  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    /* blobs */
    BLOBS.forEach((_, i) => {
      gsap.to(blobRefs.current[i], {
        x: `+=${20 + i * 8}`,
        y: `+=${15 + i * 6}`,
        duration: 6 + i * 1.5,
        repeat: -1, yoyo: true,
        ease: 'sine.inOut',
        delay: i * 0.4,
      });
    });

    /* card entrance stagger */
    tl.fromTo(floatCards.current,
      { opacity: 0, scale: 0.7, y: 30 },
      { opacity: 1, scale: 1, y: 0, duration: 0.7, stagger: 0.1, ease: 'back.out(1.5)' }, 0
    );

    /* continuous float per card */
    floatCards.current.forEach((el, i) => {
      if (!el) return;
      gsap.to(el, {
        y: `+=${12 + (i % 3) * 6}`,
        x: `+=${(i % 2 === 0 ? 1 : -1) * 8}`,
        duration: 3.5 + i * 0.5,
        repeat: -1, yoyo: true,
        ease: 'sine.inOut',
        delay: i * 0.3,
      });
    });

    /* form card */
    tl.fromTo(cardRef.current,
      { opacity: 0, y: 60, scale: 0.92 },
      { opacity: 1, y: 0, scale: 1, duration: 0.85, ease: 'back.out(1.3)' }, 0.3
    );

    /* logo pop */
    tl.fromTo(logoRef.current,
      { scale: 0, rotation: -90 },
      { scale: 1, rotation: 0, duration: 0.7, ease: 'back.out(2)' }, 0.5
    );

    /* title + subtitle */
    tl.fromTo([titleRef.current, subtitleRef.current],
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.55, stagger: 0.1 }, 0.7
    );

    /* fields */
    tl.fromTo(fieldsRef.current?.querySelectorAll('.auth-field-wrap') || [],
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: 0.45, stagger: 0.08 }, 0.9
    );

    /* button */
    tl.fromTo(btnRef.current,
      { opacity: 0, y: 12 },
      { opacity: 1, y: 0, duration: 0.4 }, 1.1
    );

    /* switch link */
    tl.fromTo(switchRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.4 }, 1.2
    );

    /* logo float */
    gsap.to(logoRef.current, {
      y: -6, duration: 2.8, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 1.5
    });

  }, []);

  /* ── mode switch animation ── */
  const handleSwitch = () => {
    gsap.timeline()
      .to(formRef.current, { opacity: 0, y: -20, duration: 0.28, ease: 'power2.in' })
      .call(() => {
        setIsLogin(v => !v);
        setError('');
        setName(''); setEmail(''); setPassword('');
      })
      .fromTo(formRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out' }
      );
  };

  /* ── submit ── */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); setLoading(true);

    /* button pulse */
    gsap.to(btnRef.current, { scale: 0.96, duration: 0.1, yoyo: true, repeat: 1 });

    const action = isLogin ? login : register;
    const args   = isLogin ? [email, password] : [name, email, password];
    const result = await action(...args);

    if (result.success) {
      gsap.to(cardRef.current, {
        scale: 1.03, opacity: 0, y: -40, duration: 0.5, ease: 'power3.in',
        onComplete: () => navigate('/')
      });
    } else {
      setError(result.message || 'Something went wrong');
      gsap.fromTo(cardRef.current,
        { x: -10 },
        { x: 0, duration: 0.5, ease: 'elastic.out(1, 0.3)',
          keyframes: [{ x: -10 }, { x: 10 }, { x: -6 }, { x: 6 }, { x: 0 }] }
      );
      if (errorRef.current) {
        gsap.fromTo(errorRef.current,
          { opacity: 0, y: -8 },
          { opacity: 1, y: 0, duration: 0.3 }
        );
      }
    }
    setLoading(false);
  };

  /* ── field focus glow ── */
  const fieldStyle = (name) => ({
    width: '100%',
    padding: '13px 16px',
    paddingLeft: name === 'password' ? '44px' : '44px',
    paddingRight: name === 'password' ? '44px' : '16px',
    background: focusedField === name
      ? 'rgba(124,58,237,0.05)'
      : 'rgba(248,246,255,0.8)',
    border: `1.5px solid ${focusedField === name ? '#a78bfa' : 'rgba(167,139,250,0.25)'}`,
    borderRadius: 14,
    fontSize: '0.9rem',
    color: '#1a1a2e',
    outline: 'none',
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    transition: 'border-color 0.2s, background 0.2s, box-shadow 0.2s',
    boxShadow: focusedField === name
      ? '0 0 0 4px rgba(124,58,237,0.1)'
      : 'none',
  });

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap');

        .auth-page * { box-sizing: border-box; margin: 0; padding: 0; }

        .auth-page {
          min-height: 100vh;
          display: flex; align-items: center; justify-content: center;
          background: linear-gradient(135deg, #f0eaff 0%, #fce4f3 35%, #e8f4fd 65%, #eafff5 100%);
          position: relative; overflow: hidden;
          font-family: 'Plus Jakarta Sans', sans-serif;
          padding: 40px 20px;
        }

        .auth-blob {
          position: absolute; border-radius: 50%;
          filter: blur(80px); pointer-events: none; z-index: 0;
        }

        .auth-card {
          position: relative; z-index: 10;
          background: rgba(255,255,255,0.72);
          backdropFilter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border: 1px solid rgba(255,255,255,0.95);
          border-radius: 28px;
          padding: 44px 40px;
          width: 100%; max-width: 420px;
          box-shadow:
            0 20px 80px rgba(124,58,237,0.12),
            0 8px 32px rgba(244,114,182,0.08),
            0 2px 8px rgba(0,0,0,0.06),
            inset 0 1px 0 rgba(255,255,255,0.9);
        }

        .auth-logo {
          width: 58px; height: 58px; border-radius: 18px;
          background: linear-gradient(135deg, #7c3aed, #ec4899);
          display: flex; align-items: center; justify-content: center;
          font-size: 1.6rem; margin: 0 auto 22px;
          box-shadow: 0 8px 28px rgba(124,58,237,0.4);
        }

        .auth-title {
          font-family: 'Sora', sans-serif;
          font-size: 1.8rem; font-weight: 800;
          color: #1a1a2e; text-align: center;
          letter-spacing: -0.03em; line-height: 1.1;
          margin-bottom: 8px;
        }

        .auth-subtitle {
          font-size: 0.875rem; color: #7c6f9f;
          text-align: center; margin-bottom: 30px; font-weight: 400;
          line-height: 1.5;
        }

        .auth-field-wrap {
          position: relative; margin-bottom: 14px;
        }

        .auth-field-icon {
          position: absolute; left: 14px; top: 50%; transform: translateY(-50%);
          font-size: 1rem; pointer-events: none; z-index: 1;
          transition: opacity 0.2s;
        }

        .auth-label {
          display: block; font-size: 0.78rem; font-weight: 600;
          color: #5c5175; margin-bottom: 6px; letter-spacing: 0.03em;
          text-transform: uppercase;
        }

        .auth-error {
          display: flex; align-items: center; gap: 8px;
          background: rgba(248,113,113,0.1); border: 1px solid rgba(248,113,113,0.3);
          border-radius: 12px; padding: 10px 14px;
          font-size: 0.82rem; color: #dc2626;
          margin-bottom: 16px; font-weight: 500;
        }

        .auth-btn {
          width: 100%; padding: 14px;
          background: linear-gradient(135deg, #7c3aed, #a855f7);
          color: white; border: none; border-radius: 14px;
          font-family: 'Sora', sans-serif;
          font-size: 0.95rem; font-weight: 700;
          cursor: pointer; letter-spacing: -0.01em;
          box-shadow: 0 6px 24px rgba(124,58,237,0.38);
          transition: transform 0.15s, box-shadow 0.15s;
          margin-top: 8px;
          display: flex; align-items: center; justify-content: center; gap: 8px;
        }
        .auth-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 10px 32px rgba(124,58,237,0.48);
        }
        .auth-btn:active:not(:disabled) { transform: translateY(0); }
        .auth-btn:disabled { opacity: 0.7; cursor: not-allowed; }

        .auth-divider {
          display: flex; align-items: center; gap: 12px;
          margin: 22px 0;
        }
        .auth-divider-line {
          flex: 1; height: 1px; background: rgba(167,139,250,0.2);
        }
        .auth-divider-text {
          font-size: 0.75rem; color: #b0a8c8; font-weight: 500;
        }

        .auth-switch {
          text-align: center; font-size: 0.85rem; color: #7c6f9f;
        }
        .auth-switch-link {
          color: #7c3aed; font-weight: 700; cursor: pointer;
          text-decoration: none; background: none; border: none;
          font-family: inherit; font-size: inherit;
          transition: color 0.2s;
        }
        .auth-switch-link:hover { color: #6d28d9; text-decoration: underline; }

        .auth-loading-dots {
          display: inline-flex; gap: 4px;
        }
        .auth-loading-dots span {
          width: 6px; height: 6px; border-radius: 50%;
          background: rgba(255,255,255,0.8);
          animation: ld-bounce 1s ease-in-out infinite;
        }
        .auth-loading-dots span:nth-child(2) { animation-delay: 0.15s; }
        .auth-loading-dots span:nth-child(3) { animation-delay: 0.3s; }
        @keyframes ld-bounce {
          0%,80%,100% { transform: translateY(0); }
          40% { transform: translateY(-6px); }
        }

        .auth-show-pass {
          position: absolute; right: 14px; top: 50%; transform: translateY(-50%);
          background: none; border: none; cursor: pointer; padding: 4px;
          color: #b0a8c8; font-size: 1rem; transition: color 0.2s; z-index: 1;
        }
        .auth-show-pass:hover { color: #7c3aed; }

        .auth-terms {
          font-size: 0.72rem; color: #b0a8c8; text-align: center;
          margin-top: 16px; line-height: 1.5;
        }
        .auth-terms a { color: #a78bfa; text-decoration: none; }
        .auth-terms a:hover { text-decoration: underline; }

        .auth-badge {
          display: inline-flex; align-items: center; gap: 6px;
          background: rgba(52,211,153,0.12); border: 1px solid rgba(52,211,153,0.3);
          padding: 4px 12px; border-radius: 100px;
          font-size: 0.68rem; font-weight: 700; color: #059669;
          letter-spacing: 0.06em; text-transform: uppercase;
          margin: 0 auto 20px; display: flex; width: fit-content;
        }
        .auth-badge-dot {
          width: 6px; height: 6px; border-radius: 50%; background: #34d399;
          animation: badge-pulse 2s ease-in-out infinite;
        }
        @keyframes badge-pulse {
          0%,100% { box-shadow: 0 0 0 2px rgba(52,211,153,0.25); }
          50% { box-shadow: 0 0 0 5px rgba(52,211,153,0.08); }
        }

        input:-webkit-autofill {
          -webkit-box-shadow: 0 0 0 30px rgba(248,246,255,0.8) inset;
          -webkit-text-fill-color: #1a1a2e;
        }
      `}</style>

      <div className="auth-page" ref={pageRef}>

        {/* Blobs */}
        {BLOBS.map((b, i) => (
          <div
            key={i}
            ref={el => blobRefs.current[i] = el}
            className="auth-blob"
            style={{
              width: b.size, height: b.size,
              background: `radial-gradient(circle, ${b.color}, transparent 70%)`,
              left: b.x, top: b.y,
            }}
          />
        ))}

        {/* Floating context cards */}
        {FLOAT_CARDS.map((card, i) => (
          <FloatCard key={i} card={card} cardRef={floatCards} idx={i} />
        ))}

        {/* Main card */}
        <div className="auth-card" ref={cardRef}>
          <div ref={logoRef} className="auth-logo">💜</div>

          <div ref={formRef}>
            {/* Live badge */}
            <div className="auth-badge">
              <span className="auth-badge-dot" />
              MindfulSpace
            </div>

            <h1 className="auth-title" ref={titleRef}>
              {isLogin ? 'Welcome back 👋' : 'Start your journey ✨'}
            </h1>
            <p className="auth-subtitle" ref={subtitleRef}>
              {isLogin
                ? 'Sign in to continue your wellness journey'
                : 'Join thousands improving their mental wellbeing'}
            </p>

            {/* Error */}
            {error && (
              <div className="auth-error" ref={errorRef}>
                <span>⚠️</span> {error}
              </div>
            )}

            <div ref={fieldsRef}>
              {/* Name field (signup only) */}
              {!isLogin && (
                <div className="auth-field-wrap">
                  <label className="auth-label">Your Name</label>
                  <div style={{ position: 'relative' }}>
                    <span className="auth-field-icon">👤</span>
                    <input
                      type="text"
                      placeholder="e.g. Khushi Sharma"
                      value={name}
                      onChange={e => setName(e.target.value)}
                      onFocus={() => setFocusedField('name')}
                      onBlur={() => setFocusedField(null)}
                      required
                      style={fieldStyle('name')}
                    />
                  </div>
                </div>
              )}

              {/* Email */}
              <div className="auth-field-wrap">
                <label className="auth-label">Email Address</label>
                <div style={{ position: 'relative' }}>
                  <span className="auth-field-icon">✉️</span>
                  <input
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => setFocusedField(null)}
                    required
                    style={fieldStyle('email')}
                  />
                </div>
              </div>

              {/* Password */}
              <div className="auth-field-wrap">
                <label className="auth-label">Password</label>
                <div style={{ position: 'relative' }}>
                  <span className="auth-field-icon">🔒</span>
                  <input
                    type={showPass ? 'text' : 'password'}
                    placeholder={isLogin ? '••••••••' : 'Min 6 characters'}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    onFocus={() => setFocusedField('password')}
                    onBlur={() => setFocusedField(null)}
                    required
                    style={fieldStyle('password')}
                  />
                  <button
                    type="button"
                    className="auth-show-pass"
                    onClick={() => setShowPass(v => !v)}
                    aria-label={showPass ? 'Hide password' : 'Show password'}
                  >
                    {showPass ? '🙈' : '👁️'}
                  </button>
                </div>
              </div>
            </div>

            {/* Submit */}
            <button
              ref={btnRef}
              className="auth-btn"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? (
                <div className="auth-loading-dots">
                  <span /><span /><span />
                </div>
              ) : (
                <>
                  {isLogin ? '→ Sign In' : '→ Create Account'}
                </>
              )}
            </button>

            {/* Switch */}
            <div className="auth-divider">
              <div className="auth-divider-line" />
              <span className="auth-divider-text">or</span>
              <div className="auth-divider-line" />
            </div>

            <div className="auth-switch" ref={switchRef}>
              {isLogin ? "Don't have an account? " : 'Already have an account? '}
              <button className="auth-switch-link" onClick={handleSwitch}>
                {isLogin ? 'Sign Up' : 'Log In'}
              </button>
            </div>

            {!isLogin && (
              <p className="auth-terms">
                By creating an account you agree to our{' '}
                <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Auth;