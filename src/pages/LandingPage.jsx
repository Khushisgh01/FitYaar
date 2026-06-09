import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const GYM_TRAINER_URL = 'https://marvelous-sherbet-c11eb1.netlify.app/';

// ── Floating Bubbles ──────────────────────────────────────────────────────
const FloatingBubbles = () => {
  const bubblesRef = useRef([]);
  useEffect(() => {
    bubblesRef.current.forEach((el, i) => {
      if (!el) return;
      gsap.to(el, {
        y: `-=${80 + Math.random() * 120}`, x: `+=${(Math.random() - 0.5) * 60}`,
        opacity: 0, duration: 4 + Math.random() * 4, delay: Math.random() * 6,
        repeat: -1, ease: 'power1.out', repeatDelay: Math.random() * 3,
      });
    });
  }, []);
  const bubbles = Array.from({ length: 18 }, (_, i) => ({
    size: 8 + Math.random() * 28, left: `${5 + Math.random() * 90}%`, bottom: `${Math.random() * 30}%`,
    color: i % 3 === 0 ? 'rgba(167,139,250,0.35)' : i % 3 === 1 ? 'rgba(52,211,153,0.3)' : 'rgba(244,114,182,0.28)',
  }));
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 1 }}>
      {bubbles.map((b, i) => (
        <div key={i} ref={el => bubblesRef.current[i] = el} style={{
          position: 'absolute', width: b.size, height: b.size, borderRadius: '50%',
          background: b.color, left: b.left, bottom: b.bottom,
          backdropFilter: 'blur(2px)', border: '1px solid rgba(255,255,255,0.15)',
          boxShadow: `0 0 ${b.size}px ${b.color}`,
        }} />
      ))}
    </div>
  );
};

const FLOAT_PILLS = [
  { emoji: '🧠', text: 'FitYaarBot AI',    sub: 'Online · Always here',   x: '3%',  y: '22%', rot: -6 },
  { emoji: '📔', text: 'Mood Journal',     sub: 'Streak: 7 days 🔥',      x: '74%', y: '14%', rot: 5  },
  { emoji: '🎵', text: 'Ocean Waves',      sub: 'Now playing...',          x: '78%', y: '58%', rot: -4 },
  { emoji: '🌿', text: 'Breathe deeply',   sub: '4-7-8 technique',         x: '2%',  y: '62%', rot: 7  },
  { emoji: '✅', text: '12 sessions done', sub: 'This month',              x: '68%', y: '80%', rot: -3 },
  { emoji: '🩺', text: 'Dr. Sarah Chen',   sub: 'Therapist · CBT',         x: '18%', y: '82%', rot: 4  },
];

const features = [
  { emoji: '🧠', title: 'FitYaarBot AI',     desc: 'Your 24/7 mental wellness companion. Detects crisis signals, provides emotional support, and remembers your journey.', accent: '#7c3aed', tag: 'AI Powered' },
  { emoji: '📊', title: 'Insight Analytics', desc: 'Mood × workout correlations, weekly heatmaps, and AI-generated Sunday reports for whole-person understanding.',           accent: '#ec4899', tag: 'Analytics'  },
  { emoji: '🤝', title: 'Multi-Agent Team',  desc: 'Coordinator, MindfulAgent, FitnessAgent & InsightAgent collaborate to understand you completely.',                       accent: '#3b82f6', tag: 'Multi-Agent'},
  { emoji: '📔', title: 'Mood Journal',       desc: "Tag-rich, streak-tracked journaling. Each entry enriches your AI agent's understanding of your patterns.",              accent: '#f59e0b', tag: 'Persistent' },
  { emoji: '🎶', title: 'Soundscapes',        desc: 'Curated ambient audio — Tibetan bowls to coffee shop buzz — with preset blends and a master mixer.',                    accent: '#ef4444', tag: 'Ambient'    },
  { emoji: '🆘', title: 'Crisis Support',     desc: '24/7 hotlines, safety planning tools, and immediate coping strategies always one tap away.',                            accent: '#10b981', tag: 'Always On'  },
];

const steps = [
  { num: '01', title: 'Log your mood',     body: 'Select an emoji, journal your thoughts. Thirty seconds is all it takes.' },
  { num: '02', title: 'Let agents work',   body: 'Your AI agents analyse mood history, detect patterns, and prepare personalised actions.' },
  { num: '03', title: 'Move your body',    body: 'Get a workout from AI Gym Trainer, complete the session, feed it back to FitYaar.' },
  { num: '04', title: 'See the insight',   body: 'InsightAgent correlates your data. Every Sunday a full wellness report lands.' },
];

const LandingPage = () => {
  const navigate = useNavigate();
  const navRef      = useRef(null);
  const badgeRef    = useRef(null);
  const taglineRef  = useRef(null);
  const headlineRef = useRef(null);
  const subRef      = useRef(null);
  const ctaRef      = useRef(null);
  const pillRefs    = useRef([]);
  const gymRef      = useRef(null);
  const gymImg1Ref  = useRef(null);
  const gymImg2Ref  = useRef(null);
  const featureRefs = useRef([]);
  const stepRefs    = useRef([]);
  const footerRef   = useRef(null);
  const orb1 = useRef(null);
  const orb2 = useRef(null);
  const orb3 = useRef(null);
  const statBarRef  = useRef(null);

  useEffect(() => {
    gsap.to(orb1.current, { x: 60, y: -50, duration: 8,  repeat: -1, yoyo: true, ease: 'sine.inOut' });
    gsap.to(orb2.current, { x: -55, y: 60, duration: 10, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 1.5 });
    gsap.to(orb3.current, { x: 40, y: -30, duration: 7,  repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 3 });

    pillRefs.current.forEach((el, i) => {
      if (!el) return;
      gsap.fromTo(el, { opacity: 0, scale: 0.7, y: 20 }, { opacity: 1, scale: 1, y: 0, duration: 0.7, delay: 0.6 + i * 0.15, ease: 'back.out(1.5)' });
      gsap.to(el, { y: `+=${10 + i * 3}`, x: `+=${(i % 2 === 0 ? 1 : -1) * 6}`, duration: 3 + i * 0.6, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: i * 0.3 });
    });

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    tl.fromTo(navRef.current,     { y: -80, opacity: 0 },          { y: 0, opacity: 1, duration: 0.7 })
      .fromTo(badgeRef.current,   { opacity: 0, y: -20, scale: 0.85 }, { opacity: 1, y: 0, scale: 1, duration: 0.6 }, '-=0.3')
      .fromTo(taglineRef.current,  { opacity: 0, y: 30 },            { opacity: 1, y: 0, duration: 0.65 }, '-=0.3')
      .fromTo(headlineRef.current, { opacity: 0, y: 60, skewY: 3 }, { opacity: 1, y: 0, skewY: 0, duration: 1 }, '-=0.4')
      .fromTo(subRef.current,      { opacity: 0, y: 30 },            { opacity: 1, y: 0, duration: 0.7 }, '-=0.5')
      .fromTo(Array.from(ctaRef.current?.children || []), { opacity: 0, y: 20, scale: 0.92 }, { opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.12 }, '-=0.4');

    gsap.fromTo(statBarRef.current?.children ? Array.from(statBarRef.current.children) : [],
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, stagger: 0.1, duration: 0.6, ease: 'power2.out', scrollTrigger: { trigger: statBarRef.current, start: 'top 90%' } }
    );

    if (gymRef.current) {
      gsap.fromTo(gymRef.current, { opacity: 0, scale: 0.95, y: 50 }, { opacity: 1, scale: 1, y: 0, duration: 1, ease: 'power2.out', scrollTrigger: { trigger: gymRef.current, start: 'top 80%' } });
    }
    if (gymImg1Ref.current) {
      gsap.fromTo(gymImg1Ref.current, { opacity: 0, x: -60, rotation: -5 }, { opacity: 1, x: 0, rotation: 0, duration: 0.9, ease: 'back.out(1.2)', scrollTrigger: { trigger: gymRef.current, start: 'top 75%' }, delay: 0.2 });
      gsap.to(gymImg1Ref.current, { y: -12, duration: 4, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 1 });
    }
    if (gymImg2Ref.current) {
      gsap.fromTo(gymImg2Ref.current, { opacity: 0, x: 60, rotation: 5 }, { opacity: 1, x: 0, rotation: 0, duration: 0.9, ease: 'back.out(1.2)', scrollTrigger: { trigger: gymRef.current, start: 'top 75%' }, delay: 0.4 });
      gsap.to(gymImg2Ref.current, { y: 10, duration: 3.5, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 1.5 });
    }

    featureRefs.current.forEach((el, i) => {
      if (!el) return;
      gsap.fromTo(el, { opacity: 0, y: 60, scale: 0.94 }, { opacity: 1, y: 0, scale: 1, duration: 0.7, ease: 'power2.out', delay: (i % 3) * 0.1, scrollTrigger: { trigger: el, start: 'top 88%' } });
    });

    stepRefs.current.forEach((el, i) => {
      if (!el) return;
      gsap.fromTo(el, { opacity: 0, x: i % 2 === 0 ? -50 : 50 }, { opacity: 1, x: 0, duration: 0.7, ease: 'power2.out', delay: i * 0.08, scrollTrigger: { trigger: el, start: 'top 88%' } });
    });

    if (footerRef.current) {
      gsap.fromTo(footerRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.7, scrollTrigger: { trigger: footerRef.current, start: 'top 95%' } });
    }

    return () => ScrollTrigger.getAll().forEach(t => t.kill());
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800;900&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap');

        /* ── Landing page uses its own fixed dark theme variables ─────────────
           The landing page is intentionally always dark (as a marketing page).
           Only the app interior respects the theme toggle.
        ───────────────────────────────────────────────────────────────────── */
        .lp-root {
          background: #06060f;
          color: #f0eeff;
          font-family: 'Plus Jakarta Sans', sans-serif;
          min-height: 100vh;
          overflow-x: hidden;
          --lp-bg:        #06060f;
          --lp-surface:   #0e0e1f;
          --lp-surface2:  #14142a;
          --lp-border:    rgba(255,255,255,0.08);
          --lp-violet:    #7c3aed;
          --lp-violet-lt: #a78bfa;
          --lp-mint:      #34d399;
          --lp-pink:      #f472b6;
          --lp-blue:      #60a5fa;
          --lp-text:      #f0eeff;
          --lp-muted:     rgba(203,213,225,0.6);
        }

        /* ── NAV ── */
        .lp-nav {
          position: fixed; top: 0; left: 0; right: 0; z-index: 200;
          display: flex; align-items: center; justify-content: space-between;
          padding: 16px 48px;
          background: rgba(6,6,15,0.82); backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(167,139,250,0.1);
        }
        .nav-logo {
          font-family: 'Sora', sans-serif; font-size: 1.3rem; font-weight: 800;
          color: #e9d5ff; letter-spacing: -0.02em; display: flex; align-items: center; gap: 8px;
        }
        .nav-logo span { color: var(--lp-mint); }
        .nav-actions { display: flex; gap: 12px; align-items: center; }
        .btn-ghost-nav {
          background: none; border: 1px solid rgba(255,255,255,0.12); color: var(--lp-muted);
          padding: 8px 22px; border-radius: 100px; font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 0.875rem; cursor: pointer; transition: all 0.2s; font-weight: 500;
        }
        .btn-ghost-nav:hover { border-color: var(--lp-violet-lt); color: #fff; }
        .btn-primary-nav {
          background: linear-gradient(135deg, var(--lp-violet), #9333ea); color: #fff; border: none;
          padding: 9px 24px; border-radius: 100px; font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 0.875rem; font-weight: 700; cursor: pointer; transition: all 0.2s;
          box-shadow: 0 4px 20px rgba(124,58,237,0.4);
        }
        .btn-primary-nav:hover { transform: translateY(-2px); box-shadow: 0 8px 28px rgba(124,58,237,0.55); }

        /* ── HERO ── */
        .lp-hero {
          position: relative; min-height: 100vh;
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          text-align: center; padding: 130px 24px 100px; overflow: hidden;
          background: var(--lp-bg);
        }
        .lp-hero > * { position: relative; z-index: 2; }

        .lp-bg-orb { position: absolute; border-radius: 50%; filter: blur(100px); pointer-events: none; z-index: 0; }
        .lp-bg-orb-1 { width: 700px; height: 700px; background: radial-gradient(circle, rgba(124,58,237,0.22), transparent 65%); top: -200px; left: -150px; }
        .lp-bg-orb-2 { width: 550px; height: 550px; background: radial-gradient(circle, rgba(52,211,153,0.18), transparent 65%); top: 100px; right: -120px; }
        .lp-bg-orb-3 { width: 450px; height: 450px; background: radial-gradient(circle, rgba(244,114,182,0.15), transparent 65%); bottom: 50px; left: 30%; }

        .lp-hero-grid {
          position: absolute; inset: 0; z-index: 0; pointer-events: none; opacity: 0.25;
          background-image: radial-gradient(circle, rgba(167,139,250,0.5) 1px, transparent 1px);
          background-size: 44px 44px;
        }

        .hero-badge {
          display: inline-flex; align-items: center; gap: 8px;
          background: rgba(124,58,237,0.15); border: 1px solid rgba(167,139,250,0.35);
          padding: 7px 18px; border-radius: 100px; font-size: 0.78rem;
          color: var(--lp-violet-lt); margin-bottom: 28px; letter-spacing: 0.06em;
          text-transform: uppercase; font-weight: 700; box-shadow: 0 0 30px rgba(124,58,237,0.2);
        }
        .badge-live { width: 7px; height: 7px; border-radius: 50%; background: var(--lp-mint); animation: livepulse 2s infinite; display: inline-block; }
        @keyframes livepulse { 0%,100%{box-shadow:0 0 0 0 rgba(52,211,153,0.6)} 50%{box-shadow:0 0 0 8px rgba(52,211,153,0)} }

        .hero-tagline {
          font-family: 'Plus Jakarta Sans', sans-serif; font-style: italic; font-weight: 300;
          font-size: 1.1rem; color: var(--lp-muted); margin-bottom: 18px;
        }
        .hero-headline {
          font-family: 'Sora', sans-serif; font-size: clamp(3rem, 7vw, 6rem);
          font-weight: 900; line-height: 1.0; letter-spacing: -0.04em;
          margin-bottom: 24px; max-width: 900px;
        }
        .hl-white  { color: #ffffff; }
        .hl-violet { color: var(--lp-violet-lt); }
        .hl-mint   { color: var(--lp-mint); }
        .hero-sub  {
          font-size: 1.1rem; color: var(--lp-muted); max-width: 560px;
          line-height: 1.75; margin: 0 auto 48px; font-weight: 400;
        }
        .hero-cta  { display: flex; gap: 14px; justify-content: center; flex-wrap: wrap; }

        .btn-lg { padding: 15px 34px; border-radius: 100px; font-family: 'Plus Jakarta Sans', sans-serif; font-size: 1rem; font-weight: 700; cursor: pointer; transition: all 0.3s; display: inline-flex; align-items: center; gap: 8px; letter-spacing: -0.01em; border: none; }
        .btn-cta-primary { background: linear-gradient(135deg, var(--lp-violet), #9333ea); color: #fff; box-shadow: 0 0 40px rgba(124,58,237,0.45); }
        .btn-cta-primary:hover { transform: translateY(-3px); box-shadow: 0 0 60px rgba(124,58,237,0.65); }
        .btn-cta-gym { background: linear-gradient(135deg, #22c55e, #16a34a); color: #fff; box-shadow: 0 0 40px rgba(34,197,94,0.4); animation: gym-pulse-btn 3s ease-in-out infinite; }
        @keyframes gym-pulse-btn { 0%,100%{box-shadow:0 0 40px rgba(34,197,94,0.4)} 50%{box-shadow:0 0 60px rgba(34,197,94,0.7)} }
        .btn-cta-gym:hover { transform: translateY(-3px) scale(1.03); }
        .btn-cta-outline { background: transparent; border: 1.5px solid rgba(255,255,255,0.2); color: rgba(255,255,255,0.85); }
        .btn-cta-outline:hover { border-color: rgba(255,255,255,0.5); background: rgba(255,255,255,0.06); color: #fff; }

        .float-pill {
          position: absolute; z-index: 3;
          background: rgba(255,255,255,0.08); backdrop-filter: blur(16px);
          border: 1px solid rgba(255,255,255,0.14); border-radius: 16px;
          padding: 10px 14px; display: flex; align-items: center; gap: 10px;
          box-shadow: 0 8px 32px rgba(0,0,0,0.3); min-width: 155px; pointer-events: none;
        }
        .fp-name { font-size: 0.78rem; font-weight: 700; color: rgba(255,255,255,0.9); line-height: 1.2; }
        .fp-sub  { font-size: 0.65rem; color: rgba(255,255,255,0.45); margin-top: 1px; }

        .scroll-hint {
          position: absolute; bottom: 28px; left: 50%; transform: translateX(-50%);
          display: flex; flex-direction: column; align-items: center; gap: 8px;
          color: rgba(255,255,255,0.3); font-size: 0.72rem; letter-spacing: 0.08em; text-transform: uppercase; z-index: 2;
        }
        .scroll-line { width: 1px; height: 50px; background: linear-gradient(to bottom, var(--lp-violet-lt), transparent); animation: scrollLine 2s ease-in-out infinite; }
        @keyframes scrollLine { 0%{transform:scaleY(0);transform-origin:top} 50%{transform:scaleY(1);transform-origin:top} 51%{transform:scaleY(1);transform-origin:bottom} 100%{transform:scaleY(0);transform-origin:bottom} }

        /* ── STAT BAR ── */
        .lp-stat-bar {
          display: flex; justify-content: center; flex-wrap: wrap;
          background: var(--lp-surface);
          border-top: 1px solid var(--lp-border); border-bottom: 1px solid var(--lp-border);
        }
        .lp-stat-item {
          flex: 1; min-width: 160px; padding: 36px 24px; text-align: center;
          border-right: 1px solid var(--lp-border);
        }
        .lp-stat-item:last-child { border-right: none; }
        .lp-stat-num   { font-family: 'Sora', sans-serif; font-size: 2.6rem; font-weight: 900; color: var(--lp-violet-lt); letter-spacing: -0.04em; }
        .lp-stat-label { font-size: 0.82rem; color: var(--lp-muted); margin-top: 6px; font-weight: 500; }

        /* ── GYM SECTION ── */
        .gym-hero {
          background: linear-gradient(135deg, #030a0f 0%, #061a10 40%, #020508 100%);
          border-top: 1px solid rgba(52,211,153,0.15); border-bottom: 1px solid rgba(52,211,153,0.15);
          position: relative; overflow: hidden;
        }
        .gym-hero-inner {
          max-width: 1200px; margin: 0 auto; padding: 80px 48px;
          display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: center;
        }
        .gym-glow-1 { position: absolute; width: 600px; height: 600px; border-radius: 50%; background: radial-gradient(circle, rgba(52,211,153,0.12), transparent 70%); top: -100px; right: -100px; pointer-events: none; }
        .gym-glow-2 { position: absolute; width: 400px; height: 400px; border-radius: 50%; background: radial-gradient(circle, rgba(124,58,237,0.1), transparent 70%); bottom: -80px; left: -60px; pointer-events: none; }
        .gym-badge-lp {
          display: inline-flex; align-items: center; gap: 8px;
          background: rgba(52,211,153,0.12); border: 1px solid rgba(52,211,153,0.35);
          padding: 7px 18px; border-radius: 100px; font-size: 0.72rem;
          color: var(--lp-mint); text-transform: uppercase; letter-spacing: 0.1em; font-weight: 700; margin-bottom: 22px;
        }
        .gym-badge-dot { width: 7px; height: 7px; border-radius: 50%; background: var(--lp-mint); animation: livepulse 2s infinite; display: inline-block; }
        .gym-title-lp {
          font-family: 'Sora', sans-serif; font-size: clamp(2rem, 3.5vw, 3.4rem);
          font-weight: 900; line-height: 1.05; letter-spacing: -0.03em; margin-bottom: 18px; color: #fff;
        }
        .gym-title-lp .mint { color: var(--lp-mint); }
        .gym-body-lp { font-size: 1rem; color: var(--lp-muted); line-height: 1.75; margin-bottom: 32px; }
        .gym-url-lp {
          display: inline-flex; align-items: center; gap: 6px;
          background: rgba(52,211,153,0.07); border: 1px solid rgba(52,211,153,0.2);
          padding: 6px 14px; border-radius: 8px; font-size: 0.75rem;
          color: rgba(52,211,153,0.6); margin-bottom: 28px; font-family: 'Courier New', monospace;
        }
        .btn-gym-cta {
          display: inline-flex; align-items: center; gap: 10px;
          background: linear-gradient(135deg, #22c55e, #16a34a); color: #fff;
          padding: 15px 34px; border-radius: 100px; font-size: 1rem; font-weight: 800;
          border: none; cursor: pointer; font-family: 'Plus Jakarta Sans', sans-serif;
          box-shadow: 0 0 40px rgba(34,197,94,0.5); transition: all 0.3s;
          animation: gym-pulse-btn 3s ease-in-out infinite;
        }
        .btn-gym-cta:hover { transform: translateY(-3px) scale(1.04); }
        .gym-images { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; position: relative; }
        .gym-img-card {
          border-radius: 20px; overflow: hidden; border: 1px solid rgba(52,211,153,0.2);
          box-shadow: 0 20px 60px rgba(0,0,0,0.5); position: relative; aspect-ratio: 3/4;
          background: rgba(52,211,153,0.05);
        }
        .gym-img-card img { width: 100%; height: 100%; object-fit: cover; filter: brightness(0.9) saturate(1.1); }
        .gym-img-placeholder {
          width: 100%; height: 100%; display: flex; flex-direction: column;
          align-items: center; justify-content: center; gap: 12px;
          color: rgba(52,211,153,0.5); font-size: 3rem;
          background: linear-gradient(135deg, rgba(52,211,153,0.05), rgba(124,58,237,0.05));
        }
        .gym-img-placeholder p { font-size: 0.75rem; color: rgba(52,211,153,0.4); text-transform: uppercase; letter-spacing: 0.1em; font-weight: 600; }
        .gym-img-badge {
          position: absolute; top: 12px; right: 12px;
          background: rgba(52,211,153,0.9); color: #fff;
          padding: 4px 12px; border-radius: 100px; font-size: 0.65rem; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase;
        }
        .gym-feats { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 28px; }
        .gym-feat-pill {
          display: flex; align-items: center; gap: 7px;
          background: rgba(52,211,153,0.08); border: 1px solid rgba(52,211,153,0.18);
          padding: 7px 14px; border-radius: 100px; font-size: 0.8rem; font-weight: 600; color: rgba(255,255,255,0.75);
        }

        /* ── FEATURES ── */
        .lp-features { padding: 100px 48px; max-width: 1200px; margin: 0 auto; }
        .lp-eyebrow { font-size: 0.72rem; text-transform: uppercase; letter-spacing: 0.12em; color: var(--lp-mint); font-weight: 700; margin-bottom: 14px; }
        .lp-sec-title { font-family: 'Sora', sans-serif; font-size: clamp(2rem, 4vw, 3.2rem); font-weight: 800; line-height: 1.08; letter-spacing: -0.03em; margin-bottom: 16px; color: #fff; }
        .lp-sec-body { color: var(--lp-muted); font-size: 1rem; line-height: 1.7; max-width: 520px; }
        .lp-features-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(340px, 1fr)); gap: 22px; margin-top: 56px; }
        .lp-feat-card {
          background: var(--lp-surface); border: 1px solid var(--lp-border);
          border-radius: 22px; padding: 32px; transition: all 0.3s; cursor: default; position: relative; overflow: hidden;
        }
        .lp-feat-card::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px; background: var(--accent-grad, transparent); opacity: 0; transition: opacity 0.3s; }
        .lp-feat-card:hover { border-color: var(--accent-border, rgba(167,139,250,0.3)); transform: translateY(-5px); box-shadow: 0 20px 50px rgba(0,0,0,0.3); }
        .lp-feat-card:hover::before { opacity: 1; }
        .lp-feat-icon  { font-size: 2.2rem; margin-bottom: 18px; display: block; }
        .lp-feat-title { font-family: 'Sora', sans-serif; font-size: 1.2rem; font-weight: 700; margin-bottom: 10px; color: #fff; }
        .lp-feat-desc  { font-size: 0.88rem; color: var(--lp-muted); line-height: 1.65; }
        .lp-feat-tag   { display: inline-block; margin-top: 18px; padding: 4px 14px; border-radius: 100px; font-size: 0.7rem; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; }

        /* ── HOW IT WORKS ── */
        .lp-how { background: var(--lp-surface); border-top: 1px solid var(--lp-border); border-bottom: 1px solid var(--lp-border); }
        .lp-how-inner { padding: 100px 48px; max-width: 1100px; margin: 0 auto; }
        .lp-how-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 50px 80px; margin-top: 60px; }
        .lp-step { display: flex; gap: 22px; align-items: flex-start; }
        .lp-step-num { font-family: 'Sora', sans-serif; font-size: 3.2rem; font-weight: 900; color: rgba(255,255,255,0.06); line-height: 1; flex-shrink: 0; transition: color 0.3s; }
        .lp-step:hover .lp-step-num { color: var(--lp-violet-lt); }
        .lp-step-title { font-family: 'Sora', sans-serif; font-size: 1.2rem; font-weight: 700; margin-bottom: 9px; color: #fff; }
        .lp-step-body  { font-size: 0.9rem; color: var(--lp-muted); line-height: 1.65; }

        /* ── FINAL CTA ── */
        .lp-cta {
          text-align: center; padding: 130px 48px; position: relative; overflow: hidden;
          background: linear-gradient(180deg, var(--lp-bg) 0%, rgba(124,58,237,0.06) 50%, var(--lp-bg) 100%);
        }
        .lp-cta-glow { position: absolute; width: 800px; height: 500px; border-radius: 50%; background: radial-gradient(ellipse, rgba(124,58,237,0.15), transparent 70%); top: 50%; left: 50%; transform: translate(-50%,-50%); pointer-events: none; }
        .lp-cta-title { font-family: 'Sora', sans-serif; font-size: clamp(2.2rem, 5vw, 4rem); font-weight: 900; letter-spacing: -0.04em; margin-bottom: 20px; position: relative; z-index: 1; color: #fff; }
        .lp-cta-sub { color: var(--lp-muted); font-size: 1.05rem; max-width: 460px; margin: 0 auto 48px; line-height: 1.7; position: relative; z-index: 1; }
        .lp-cta-actions { display: flex; gap: 14px; justify-content: center; flex-wrap: wrap; position: relative; z-index: 1; }

        /* ── FOOTER ── */
        .lp-footer {
          border-top: 1px solid var(--lp-border); padding: 40px 48px;
          display: flex; align-items: center; justify-content: space-between;
          background: var(--lp-surface); flex-wrap: wrap; gap: 16px;
        }
        .lp-footer-logo  { font-family: 'Sora', sans-serif; font-size: 1.15rem; font-weight: 800; color: var(--lp-violet-lt); }
        .lp-footer-copy  { font-size: 0.8rem; color: var(--lp-muted); }
        .lp-footer-links { display: flex; gap: 24px; }
        .lp-footer-links a { font-size: 0.82rem; color: var(--lp-muted); text-decoration: none; transition: color 0.2s; }
        .lp-footer-links a:hover { color: #fff; }

        @media (max-width: 900px) {
          .lp-nav { padding: 14px 20px; }
          .lp-features, .lp-how-inner { padding: 64px 24px; }
          .gym-hero-inner { grid-template-columns: 1fr; padding: 60px 24px; }
          .gym-images { grid-template-columns: 1fr 1fr; }
          .lp-how-grid { grid-template-columns: 1fr; gap: 36px; }
          .lp-footer { flex-direction: column; text-align: center; }
          .lp-features-grid { grid-template-columns: 1fr; }
          .lp-stat-bar { flex-direction: column; }
          .lp-stat-item { border-right: none; border-bottom: 1px solid var(--lp-border); }
          .lp-stat-item:last-child { border-bottom: none; }
          .float-pill { display: none; }
        }
      `}</style>

      <div className="lp-root">

        {/* NAV */}
        <nav className="lp-nav" ref={navRef}>
          <div className="nav-logo">💜 Fit<span>Yaar</span></div>
          <div className="nav-actions">
            <button className="btn-ghost-nav" onClick={() => navigate('/login')}>Log in</button>
            <button className="btn-primary-nav" onClick={() => navigate('/signup')}>Get started free</button>
          </div>
        </nav>

        {/* HERO */}
        <section className="lp-hero">
          <div className="lp-bg-orb lp-bg-orb-1" ref={orb1} />
          <div className="lp-bg-orb lp-bg-orb-2" ref={orb2} />
          <div className="lp-bg-orb lp-bg-orb-3" ref={orb3} />
          <div className="lp-hero-grid" />
          <FloatingBubbles />

          {FLOAT_PILLS.map((pill, i) => (
            <div key={i} className="float-pill" ref={el => pillRefs.current[i] = el}
              style={{ left: pill.x, top: pill.y, transform: `rotate(${pill.rot}deg)`, opacity: 0 }}>
              <span style={{ fontSize: '1.3rem', flexShrink: 0 }}>{pill.emoji}</span>
              <div>
                <div className="fp-name">{pill.text}</div>
                <div className="fp-sub">{pill.sub}</div>
              </div>
            </div>
          ))}

          <div className="hero-badge" ref={badgeRef}>
            <span className="badge-live" /> Mind & Body · AI-Powered Wellness
          </div>
          <p className="hero-tagline" ref={taglineRef}>Your whole-person wellness intelligence</p>
          <h1 className="hero-headline" ref={headlineRef}>
            <span className="hl-white">Feel better,</span><br />
            <span className="hl-violet">think clearer,</span><br />
            <span className="hl-mint">move stronger.</span>
          </h1>
          <p className="hero-sub" ref={subRef}>
            FitYaar combines an AI mental wellness companion with a live AI Gym Trainer — a team of agents working together to help you thrive as a whole human being.
          </p>
          <div className="hero-cta" ref={ctaRef}>
            <button className="btn-lg btn-cta-primary" onClick={() => navigate('/signup')}>Start your journey →</button>
            <button className="btn-lg btn-cta-gym" onClick={() => window.open(GYM_TRAINER_URL, '_blank', 'noopener')}>🏋️ Try AI Gym Trainer</button>
            <button className="btn-lg btn-cta-outline" onClick={() => navigate('/login')}>Sign in</button>
          </div>
          <div className="scroll-hint">
            <span>scroll</span>
            <div className="scroll-line" />
          </div>
        </section>

        {/* STAT BAR */}
        <div className="lp-stat-bar" ref={statBarRef}>
          {[
            { num: '4',    label: 'Collaborative AI Agents' },
            { num: '360°', label: 'Wellness Coverage' },
            { num: '∞',    label: 'Persistent Memory' },
            { num: 'Live', label: 'AI Gym Trainer Deployed' },
          ].map(s => (
            <div className="lp-stat-item" key={s.label}>
              <div className="lp-stat-num">{s.num}</div>
              <div className="lp-stat-label">{s.label}</div>
            </div>
          ))}
        </div>

        {/* AI GYM TRAINER */}
        <section className="gym-hero" ref={gymRef}>
          <div className="gym-glow-1" />
          <div className="gym-glow-2" />
          <div className="gym-hero-inner">
            <div>
              <div className="gym-badge-lp"><span className="gym-badge-dot" /> Live & Deployed · Main Feature</div>
              <h2 className="gym-title-lp">Meet your<br /><span className="mint">AI Gym Trainer</span><br />— built for results</h2>
              <div className="gym-url-lp">🔗 marvelous-sherbet-c11eb1.netlify.app</div>
              <p className="gym-body-lp">A separately deployed ML-powered fitness engine. Tell it your goals, fitness level, and equipment — it builds a personalised workout in seconds. Every session links physical effort to mental state inside FitYaar.</p>
              <button className="btn-gym-cta" onClick={() => window.open(GYM_TRAINER_URL, '_blank', 'noopener')}>
                <span>🏋️</span> Launch AI Gym Trainer ↗
              </button>
              <div className="gym-feats">
                {['🎯 Personalised Plans', '⚡ Real-time Coaching', '📊 Progress Tracking', '🔄 Syncs with FitYaar'].map(f => (
                  <div className="gym-feat-pill" key={f}>{f}</div>
                ))}
              </div>
            </div>
            <div className="gym-images">
              <div className="gym-img-card" ref={gymImg1Ref} style={{ marginTop: 32 }}>
                <img src="/images/img1.png" alt="AI Gym Trainer screenshot 1"
                  onError={e => { e.target.style.display='none'; e.target.nextSibling.style.display='flex'; }} />
                <div className="gym-img-placeholder" style={{ display: 'none' }}><span>🏋️</span><p>AI Trainer UI</p></div>
                <div className="gym-img-badge">Live App</div>
              </div>
              <div className="gym-img-card" ref={gymImg2Ref} style={{ marginTop: -32 }}>
                <img src="/images/img2.png" alt="AI Gym Trainer screenshot 2"
                  onError={e => { e.target.style.display='none'; e.target.nextSibling.style.display='flex'; }} />
                <div className="gym-img-placeholder" style={{ display: 'none' }}><span>💪</span><p>Workout Plans</p></div>
                <div className="gym-img-badge">ML Powered</div>
              </div>
            </div>
          </div>
        </section>

        {/* FEATURES */}
        <section className="lp-features">
          <p className="lp-eyebrow">Everything you need</p>
          <h2 className="lp-sec-title">One platform.<br />Every dimension.</h2>
          <p className="lp-sec-body">From daily mood journaling to AI-powered workout design — every feature feeds your unified wellness profile.</p>
          <div className="lp-features-grid">
            {features.map((f, i) => (
              <div key={f.title} className="lp-feat-card" ref={el => featureRefs.current[i] = el}
                style={{ '--accent-border': f.accent + '50', '--accent-grad': `linear-gradient(90deg, transparent, ${f.accent}70, transparent)` }}>
                <span className="lp-feat-icon">{f.emoji}</span>
                <div className="lp-feat-title">{f.title}</div>
                <div className="lp-feat-desc">{f.desc}</div>
                <span className="lp-feat-tag" style={{ background: f.accent + '18', color: f.accent }}>{f.tag}</span>
              </div>
            ))}
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="lp-how">
          <div className="lp-how-inner">
            <p className="lp-eyebrow">How it works</p>
            <h2 className="lp-sec-title">Four steps to<br />whole-person insight</h2>
            <div className="lp-how-grid">
              {steps.map((s, i) => (
                <div className="lp-step" key={s.num} ref={el => stepRefs.current[i] = el}>
                  <div className="lp-step-num">{s.num}</div>
                  <div>
                    <div className="lp-step-title">{s.title}</div>
                    <div className="lp-step-body">{s.body}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="lp-cta">
          <div className="lp-cta-glow" />
          <h2 className="lp-cta-title">Ready to feel<br />your best?</h2>
          <p className="lp-cta-sub">Join FitYaar and let a team of AI agents guide your mind and body together.</p>
          <div className="lp-cta-actions">
            <button className="btn-lg btn-cta-primary" onClick={() => navigate('/signup')}>Create your free account →</button>
            <button className="btn-lg btn-cta-gym" onClick={() => window.open(GYM_TRAINER_URL, '_blank', 'noopener')}>🏋️ Try AI Gym Trainer</button>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="lp-footer" ref={footerRef}>
          <div className="lp-footer-logo">FitYaar</div>
          <div className="lp-footer-copy">© {new Date().getFullYear()} FitYaar. Built with 💜</div>
          <div className="lp-footer-links">
            <a href="/crises-support">Crisis Support</a>
            <a href="#" onClick={e => { e.preventDefault(); navigate('/login'); }}>Login</a>
            <a href="#" onClick={e => { e.preventDefault(); navigate('/signup'); }}>Sign Up</a>
          </div>
        </footer>

      </div>
    </>
  );
};

export default LandingPage;
