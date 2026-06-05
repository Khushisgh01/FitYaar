// src/pages/LandingPage.jsx
// Add this route in App.jsx: { path: '/landing', element: <LandingPage /> }
// Or set as the public root before auth check.
// Install GSAP: npm install gsap

import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// ─── Floating orb background ───────────────────────────────────────────────
const Orbs = () => (
  <div className="orbs-container" aria-hidden="true">
    <div className="orb orb-1" />
    <div className="orb orb-2" />
    <div className="orb orb-3" />
    <div className="orb orb-4" />
  </div>
);

// ─── Feature card data ─────────────────────────────────────────────────────
const features = [
  {
    emoji: '🧠',
    title: 'MindfulBot AI',
    desc: 'Your compassionate mental wellness companion. Listens, supports, detects crisis signals — powered by an Agno agent with persistent memory.',
    accent: '#a78bfa',
  },
  {
    emoji: '💪',
    title: 'AI Gym Trainer',
    desc: 'A separately deployed ML engine that designs personalised workouts. Fully integrated — every rep feeds your wellness score.',
    accent: '#34d399',
  },
  {
    emoji: '📊',
    title: 'Insight Analytics',
    desc: 'Mood × workout correlations, weekly heatmaps, and AI-generated Sunday reports that no single-purpose app can match.',
    accent: '#f472b6',
  },
  {
    emoji: '🤝',
    title: 'Multi-Agent Team',
    desc: 'A Coordinator, MindfulAgent, FitnessAgent & InsightAgent collaborate behind the scenes to understand you as a whole person.',
    accent: '#60a5fa',
  },
  {
    emoji: '📔',
    title: 'Mood Journal',
    desc: 'Tag-rich, streak-tracked journaling with timeline view. Each entry enriches your AI agent\'s understanding of your patterns.',
    accent: '#fbbf24',
  },
  {
    emoji: '🎶',
    title: 'Soundscapes',
    desc: 'Curated ambient audio — from Tibetan bowls to coffee shop buzz — with preset blends and a master mixer.',
    accent: '#f87171',
  },
];

// ─── Step data ─────────────────────────────────────────────────────────────
const steps = [
  { num: '01', title: 'Log your mood', body: 'Select an emoji, journal your thoughts. Thirty seconds is all it takes.' },
  { num: '02', title: 'Let agents work', body: 'Your team of AI agents analyse mood history, detect patterns, and prepare personalised actions.' },
  { num: '03', title: 'Move your body', body: 'Get a workout recommendation from FitnessAgent, launch the AI Gym Trainer, and complete the session.' },
  { num: '04', title: 'See the insight', body: 'InsightAgent correlates your data. Every Sunday a personalised wellness report lands — with your score.' },
];

// ─── Main Component ────────────────────────────────────────────────────────
const LandingPage = () => {
  const navigate = useNavigate();

  // refs for GSAP targets
  const heroRef = useRef(null);
  const taglineRef = useRef(null);
  const headlineRef = useRef(null);
  const subRef = useRef(null);
  const ctaRef = useRef(null);
  const badgeRef = useRef(null);
  const featureRefs = useRef([]);
  const stepRefs = useRef([]);
  const gymRef = useRef(null);
  const footerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ── Hero entrance ────────────────────────────────────────────────────
      const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      heroTl
        .fromTo(badgeRef.current,
          { opacity: 0, y: -20 },
          { opacity: 1, y: 0, duration: 0.6 })
        .fromTo(taglineRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.7 }, '-=0.3')
        .fromTo(headlineRef.current,
          { opacity: 0, y: 50, skewY: 2 },
          { opacity: 1, y: 0, skewY: 0, duration: 0.9 }, '-=0.4')
        .fromTo(subRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.7 }, '-=0.5')
        .fromTo(ctaRef.current.children,
          { opacity: 0, y: 20, scale: 0.95 },
          { opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.12 }, '-=0.4');

      // floating orbs
      gsap.to('.orb-1', { y: -30, x: 15, duration: 6, repeat: -1, yoyo: true, ease: 'sine.inOut' });
      gsap.to('.orb-2', { y: 25, x: -20, duration: 8, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 1 });
      gsap.to('.orb-3', { y: -20, x: 25, duration: 7, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 2 });
      gsap.to('.orb-4', { y: 30, x: -15, duration: 9, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 0.5 });

      // ── Feature cards scroll reveal ───────────────────────────────────────
      featureRefs.current.forEach((el, i) => {
        if (!el) return;
        gsap.fromTo(el,
          { opacity: 0, y: 60, rotateX: 8 },
          {
            opacity: 1, y: 0, rotateX: 0, duration: 0.7,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
            },
            delay: (i % 3) * 0.1,
          });
      });

      // ── Steps ─────────────────────────────────────────────────────────────
      stepRefs.current.forEach((el, i) => {
        if (!el) return;
        gsap.fromTo(el,
          { opacity: 0, x: i % 2 === 0 ? -50 : 50 },
          {
            opacity: 1, x: 0, duration: 0.7, ease: 'power2.out',
            scrollTrigger: { trigger: el, start: 'top 88%' },
            delay: i * 0.08,
          });
      });

      // ── Gym Trainer section ───────────────────────────────────────────────
      if (gymRef.current) {
        gsap.fromTo(gymRef.current,
          { opacity: 0, scale: 0.96 },
          {
            opacity: 1, scale: 1, duration: 0.9, ease: 'power2.out',
            scrollTrigger: { trigger: gymRef.current, start: 'top 80%' },
          });
      }

      // ── Footer ────────────────────────────────────────────────────────────
      if (footerRef.current) {
        gsap.fromTo(footerRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1, y: 0, duration: 0.7,
            scrollTrigger: { trigger: footerRef.current, start: 'top 95%' },
          });
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      <style>{`
        /* ── Google Fonts ── */
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --bg:        #06060f;
          --surface:   #0e0e1f;
          --surface2:  #14142a;
          --border:    rgba(255,255,255,0.07);
          --violet:    #7c3aed;
          --violet-lt: #a78bfa;
          --mint:      #34d399;
          --pink:      #f472b6;
          --blue:      #60a5fa;
          --text:      #f0eeff;
          --muted:     #9090b0;
          --font-head: 'Syne', sans-serif;
          --font-body: 'DM Sans', sans-serif;
        }

        .lp-root {
          background: var(--bg);
          color: var(--text);
          font-family: var(--font-body);
          min-height: 100vh;
          overflow-x: hidden;
        }

        /* ── Orbs ── */
        .orbs-container {
          position: absolute; inset: 0; overflow: hidden; pointer-events: none; z-index: 0;
        }
        .orb {
          position: absolute; border-radius: 50%; filter: blur(80px); opacity: 0.35;
        }
        .orb-1 { width: 520px; height: 520px; background: radial-gradient(circle, #7c3aed, transparent 70%); top: -120px; left: -100px; }
        .orb-2 { width: 400px; height: 400px; background: radial-gradient(circle, #34d399, transparent 70%); top: 60px; right: -80px; }
        .orb-3 { width: 350px; height: 350px; background: radial-gradient(circle, #f472b6, transparent 70%); bottom: 80px; left: 30%; }
        .orb-4 { width: 300px; height: 300px; background: radial-gradient(circle, #60a5fa, transparent 70%); bottom: -60px; right: 10%; }

        /* ── NAV ── */
        .lp-nav {
          position: fixed; top: 0; left: 0; right: 0; z-index: 100;
          display: flex; align-items: center; justify-content: space-between;
          padding: 18px 48px;
          background: rgba(6,6,15,0.7); backdrop-filter: blur(18px);
          border-bottom: 1px solid var(--border);
        }
        .nav-logo { font-family: var(--font-head); font-size: 1.25rem; font-weight: 800; color: var(--violet-lt); letter-spacing: -0.02em; }
        .nav-logo span { color: var(--mint); }
        .nav-actions { display: flex; gap: 12px; align-items: center; }
        .btn-ghost {
          background: none; border: 1px solid var(--border); color: var(--muted);
          padding: 8px 20px; border-radius: 100px; font-family: var(--font-body);
          font-size: 0.875rem; cursor: pointer; transition: all 0.2s;
        }
        .btn-ghost:hover { border-color: var(--violet-lt); color: var(--text); }
        .btn-primary {
          background: var(--violet); color: #fff; border: none;
          padding: 9px 22px; border-radius: 100px; font-family: var(--font-body);
          font-size: 0.875rem; font-weight: 500; cursor: pointer; transition: all 0.2s;
        }
        .btn-primary:hover { background: #6d28d9; transform: translateY(-1px); }

        /* ── HERO ── */
        .hero {
          position: relative; min-height: 100vh;
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          text-align: center; padding: 120px 24px 80px;
          overflow: hidden;
        }
        .hero > * { position: relative; z-index: 1; }
        .hero-badge {
          display: inline-flex; align-items: center; gap: 8px;
          background: rgba(124,58,237,0.15); border: 1px solid rgba(167,139,250,0.3);
          padding: 6px 16px; border-radius: 100px; font-size: 0.8rem;
          color: var(--violet-lt); margin-bottom: 28px; letter-spacing: 0.04em;
          text-transform: uppercase; font-weight: 500;
        }
        .hero-badge-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--mint); animation: pulse 2s infinite; }
        @keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.5;transform:scale(0.8)} }
        .hero-tagline {
          font-family: var(--font-body); font-weight: 300; font-style: italic;
          font-size: 1.05rem; color: var(--muted); letter-spacing: 0.02em; margin-bottom: 16px;
        }
        .hero-headline {
          font-family: var(--font-head); font-size: clamp(2.8rem, 6vw, 5.5rem);
          font-weight: 800; line-height: 1.05; letter-spacing: -0.03em;
          margin-bottom: 24px; max-width: 900px;
        }
        .hero-headline .hl-violet { color: var(--violet-lt); }
        .hero-headline .hl-mint { color: var(--mint); }
        .hero-sub {
          font-size: 1.1rem; color: var(--muted); max-width: 580px;
          line-height: 1.7; margin: 0 auto 44px; font-weight: 300;
        }
        .hero-cta { display: flex; gap: 14px; justify-content: center; flex-wrap: wrap; }
        .btn-lg {
          padding: 14px 32px; border-radius: 100px; font-family: var(--font-body);
          font-size: 1rem; font-weight: 500; cursor: pointer; transition: all 0.25s;
          display: inline-flex; align-items: center; gap: 8px;
        }
        .btn-lg-primary {
          background: linear-gradient(135deg, var(--violet), #6d28d9);
          color: #fff; border: none; box-shadow: 0 0 40px rgba(124,58,237,0.4);
        }
        .btn-lg-primary:hover { transform: translateY(-2px); box-shadow: 0 0 60px rgba(124,58,237,0.6); }
        .btn-lg-outline {
          background: transparent; border: 1px solid var(--border); color: var(--text);
        }
        .btn-lg-outline:hover { border-color: var(--violet-lt); background: rgba(124,58,237,0.08); }
        .hero-scroll-hint {
          position: absolute; bottom: 32px; left: 50%; transform: translateX(-50%);
          display: flex; flex-direction: column; align-items: center; gap: 8px;
          color: var(--muted); font-size: 0.75rem; opacity: 0.6; z-index: 1;
        }
        .scroll-line {
          width: 1px; height: 48px; background: linear-gradient(to bottom, var(--violet-lt), transparent);
          animation: scrollLine 2s ease-in-out infinite;
        }
        @keyframes scrollLine { 0%{transform:scaleY(0);transform-origin:top} 50%{transform:scaleY(1);transform-origin:top} 51%{transform:scaleY(1);transform-origin:bottom} 100%{transform:scaleY(0);transform-origin:bottom} }

        /* ── STAT BAR ── */
        .stat-bar {
          display: flex; justify-content: center; flex-wrap: wrap; gap: 0;
          border-top: 1px solid var(--border); border-bottom: 1px solid var(--border);
          background: var(--surface);
        }
        .stat-item {
          flex: 1; min-width: 160px; padding: 32px 24px; text-align: center;
          border-right: 1px solid var(--border);
        }
        .stat-item:last-child { border-right: none; }
        .stat-num { font-family: var(--font-head); font-size: 2.4rem; font-weight: 800; color: var(--violet-lt); }
        .stat-label { font-size: 0.85rem; color: var(--muted); margin-top: 4px; }

        /* ── SECTION SHARED ── */
        .section { padding: 100px 48px; max-width: 1200px; margin: 0 auto; }
        .section-eyebrow {
          font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.12em;
          color: var(--mint); font-weight: 600; margin-bottom: 14px;
        }
        .section-title {
          font-family: var(--font-head); font-size: clamp(2rem, 4vw, 3rem);
          font-weight: 800; line-height: 1.1; letter-spacing: -0.025em; margin-bottom: 16px;
        }
        .section-body { color: var(--muted); font-size: 1.05rem; line-height: 1.7; max-width: 560px; }

        /* ── FEATURES GRID ── */
        .features-header { margin-bottom: 64px; }
        .features-grid {
          display: grid; grid-template-columns: repeat(auto-fill, minmax(340px, 1fr)); gap: 24px;
        }
        .feat-card {
          background: var(--surface); border: 1px solid var(--border);
          border-radius: 20px; padding: 32px; transition: border-color 0.3s, transform 0.3s;
          cursor: default; perspective: 800px;
        }
        .feat-card:hover { border-color: var(--accent, var(--violet-lt)); transform: translateY(-4px); }
        .feat-icon { font-size: 2.2rem; margin-bottom: 18px; display: block; }
        .feat-title { font-family: var(--font-head); font-size: 1.25rem; font-weight: 700; margin-bottom: 10px; }
        .feat-desc { font-size: 0.9rem; color: var(--muted); line-height: 1.65; }
        .feat-tag {
          display: inline-block; margin-top: 16px; padding: 4px 12px;
          border-radius: 100px; font-size: 0.72rem; font-weight: 600;
          letter-spacing: 0.06em; text-transform: uppercase;
        }

        /* ── HOW IT WORKS ── */
        .how-wrap { display: grid; grid-template-columns: 1fr 1fr; gap: 48px 80px; margin-top: 64px; }
        .step-card {
          display: flex; gap: 20px; align-items: flex-start;
        }
        .step-num {
          font-family: var(--font-head); font-size: 3rem; font-weight: 800;
          color: var(--border); line-height: 1; flex-shrink: 0;
          transition: color 0.3s;
        }
        .step-card:hover .step-num { color: var(--violet-lt); }
        .step-title { font-family: var(--font-head); font-size: 1.15rem; font-weight: 700; margin-bottom: 8px; }
        .step-body { font-size: 0.9rem; color: var(--muted); line-height: 1.6; }

        /* ── GYM TRAINER SECTION ── */
        .gym-section {
          margin: 0 48px 100px; border-radius: 28px; overflow: hidden;
          background: linear-gradient(135deg, #0d1a2e 0%, #0a0a1f 50%, #1a0d2e 100%);
          border: 1px solid rgba(52,211,153,0.2);
          box-shadow: 0 0 80px rgba(52,211,153,0.08), inset 0 1px 0 rgba(255,255,255,0.05);
          display: grid; grid-template-columns: 1fr 1fr; align-items: center; gap: 0;
        }
        .gym-content { padding: 72px 64px; }
        .gym-badge {
          display: inline-flex; align-items: center; gap: 8px;
          background: rgba(52,211,153,0.1); border: 1px solid rgba(52,211,153,0.3);
          padding: 6px 16px; border-radius: 100px; font-size: 0.75rem;
          color: var(--mint); text-transform: uppercase; letter-spacing: 0.08em;
          font-weight: 600; margin-bottom: 24px;
        }
        .gym-title { font-family: var(--font-head); font-size: clamp(1.8rem, 3vw, 2.8rem); font-weight: 800; line-height: 1.1; margin-bottom: 18px; letter-spacing: -0.02em; }
        .gym-title .hl-mint { color: var(--mint); }
        .gym-body { color: var(--muted); font-size: 0.95rem; line-height: 1.7; margin-bottom: 36px; }
        .btn-mint {
          display: inline-flex; align-items: center; gap: 10px;
          background: var(--mint); color: #06060f; padding: 14px 30px;
          border-radius: 100px; font-size: 1rem; font-weight: 700; border: none;
          cursor: pointer; transition: all 0.25s; font-family: var(--font-body);
        }
        .btn-mint:hover { transform: translateY(-2px); box-shadow: 0 0 40px rgba(52,211,153,0.4); }
        .gym-visual {
          height: 100%; min-height: 360px;
          background: linear-gradient(135deg, rgba(52,211,153,0.08), rgba(124,58,237,0.12));
          display: flex; align-items: center; justify-content: center;
          border-left: 1px solid rgba(52,211,153,0.1);
          position: relative; overflow: hidden;
        }
        .gym-visual-inner {
          text-align: center; position: relative; z-index: 1;
        }
        .gym-visual-emoji { font-size: 6rem; display: block; margin-bottom: 12px; filter: drop-shadow(0 0 40px rgba(52,211,153,0.4)); }
        .gym-visual-label { font-size: 0.85rem; color: var(--mint); letter-spacing: 0.06em; text-transform: uppercase; }
        .gym-ring {
          position: absolute; border-radius: 50%; border: 1px solid rgba(52,211,153,0.1);
        }
        .gym-ring-1 { width: 300px; height: 300px; top: 50%; left: 50%; transform: translate(-50%,-50%); animation: spin 20s linear infinite; }
        .gym-ring-2 { width: 200px; height: 200px; top: 50%; left: 50%; transform: translate(-50%,-50%); animation: spin 12s linear infinite reverse; }
        @keyframes spin { to { transform: translate(-50%,-50%) rotate(360deg); } }

        /* ── AGENT ARCHITECTURE ── */
        .arch-section { background: var(--surface); border-top: 1px solid var(--border); border-bottom: 1px solid var(--border); }
        .arch-inner { padding: 100px 48px; max-width: 1000px; margin: 0 auto; text-align: center; }
        .arch-diagram {
          margin-top: 60px; background: var(--surface2); border: 1px solid var(--border);
          border-radius: 20px; padding: 48px; font-family: 'Courier New', monospace;
          font-size: 0.82rem; color: var(--muted); text-align: left; overflow-x: auto;
          line-height: 1.9; white-space: pre;
        }
        .arch-violet { color: var(--violet-lt); }
        .arch-mint { color: var(--mint); }
        .arch-pink { color: var(--pink); }
        .arch-blue { color: var(--blue); }

        /* ── CTA SECTION ── */
        .cta-section {
          text-align: center; padding: 120px 48px;
          position: relative; overflow: hidden;
        }
        .cta-section::before {
          content: ''; position: absolute; inset: 0;
          background: radial-gradient(ellipse at center, rgba(124,58,237,0.12) 0%, transparent 70%);
          pointer-events: none;
        }
        .cta-title { font-family: var(--font-head); font-size: clamp(2rem,5vw,4rem); font-weight: 800; letter-spacing:-0.03em; margin-bottom: 20px; }
        .cta-sub { color: var(--muted); font-size: 1.05rem; max-width: 480px; margin: 0 auto 44px; line-height: 1.7; }
        .cta-actions { display: flex; gap: 14px; justify-content: center; flex-wrap: wrap; }

        /* ── FOOTER ── */
        .lp-footer {
          border-top: 1px solid var(--border); padding: 40px 48px;
          display: flex; align-items: center; justify-content: space-between;
          background: var(--surface); flex-wrap: wrap; gap: 16px;
        }
        .footer-logo { font-family: var(--font-head); font-size: 1.1rem; font-weight: 800; color: var(--violet-lt); }
        .footer-copy { font-size: 0.8rem; color: var(--muted); }
        .footer-links { display: flex; gap: 24px; }
        .footer-links a { font-size: 0.82rem; color: var(--muted); text-decoration: none; transition: color 0.2s; }
        .footer-links a:hover { color: var(--text); }

        @media (max-width: 900px) {
          .lp-nav { padding: 16px 24px; }
          .section { padding: 64px 24px; }
          .how-wrap { grid-template-columns: 1fr; gap: 36px; }
          .gym-section { grid-template-columns: 1fr; margin: 0 24px 64px; }
          .gym-visual { min-height: 220px; border-left: none; border-top: 1px solid rgba(52,211,153,0.1); }
          .gym-content { padding: 48px 32px; }
          .lp-footer { flex-direction: column; text-align: center; }
          .features-grid { grid-template-columns: 1fr; }
          .arch-inner { padding: 64px 24px; }
          .arch-diagram { font-size: 0.72rem; padding: 28px 20px; }
          .stat-bar { flex-direction: column; }
          .stat-item { border-right: none; border-bottom: 1px solid var(--border); }
          .stat-item:last-child { border-bottom: none; }
        }
      `}</style>

      <div className="lp-root">

        {/* ── NAV ─────────────────────────────────────────────────────────── */}
        <nav className="lp-nav">
          <div className="nav-logo">Wellness<span>OS</span></div>
          <div className="nav-actions">
            <button className="btn-ghost" onClick={() => navigate('/login')}>Log in</button>
            <button className="btn-primary" onClick={() => navigate('/signup')}>Get started free</button>
          </div>
        </nav>

        {/* ── HERO ─────────────────────────────────────────────────────────── */}
        <section className="hero" ref={heroRef}>
          <Orbs />
          <div className="hero-badge" ref={badgeRef}>
            <span className="hero-badge-dot" />
            Multi-Agent AI · Built with Agno + Gemini 2.0 Flash
          </div>
          <p className="hero-tagline" ref={taglineRef}>Mind & body, finally in sync</p>
          <h1 className="hero-headline" ref={headlineRef}>
            Your <span className="hl-violet">whole-person</span><br />
            wellness <span className="hl-mint">intelligence</span>
          </h1>
          <p className="hero-sub" ref={subRef}>
            WellnessOS is a mind-body platform where a team of AI agents — MindfulBot, FitnessAgent, and InsightAgent — collaborate to understand you as a complete human being.
          </p>
          <div className="hero-cta" ref={ctaRef}>
            <button className="btn-lg btn-lg-primary" onClick={() => navigate('/signup')}>
              Start your journey →
            </button>
            <button className="btn-lg btn-lg-outline" onClick={() => navigate('/login')}>
              Sign in
            </button>
          </div>
          <div className="hero-scroll-hint">
            <span>scroll</span>
            <div className="scroll-line" />
          </div>
        </section>

        {/* ── STAT BAR ─────────────────────────────────────────────────────── */}
        <div className="stat-bar">
          {[
            { num: '4', label: 'Collaborative AI Agents' },
            { num: '360°', label: 'Wellness Coverage' },
            { num: '∞', label: 'Persistent Memory' },
            { num: '7×', label: 'Weekly AI Reports' },
          ].map(s => (
            <div className="stat-item" key={s.label}>
              <div className="stat-num">{s.num}</div>
              <div className="stat-label">{s.label}</div>
            </div>
          ))}
        </div>

        {/* ── FEATURES ─────────────────────────────────────────────────────── */}
        <div className="section">
          <div className="features-header">
            <p className="section-eyebrow">Everything you need</p>
            <h2 className="section-title">One platform.<br />Every dimension.</h2>
            <p className="section-body">From daily mood journaling to AI-powered workout design — every feature feeds back into your unified wellness profile.</p>
          </div>
          <div className="features-grid">
            {features.map((f, i) => (
              <div
                className="feat-card"
                key={f.title}
                ref={el => featureRefs.current[i] = el}
                style={{ '--accent': f.accent }}
              >
                <span className="feat-icon">{f.emoji}</span>
                <div className="feat-title">{f.title}</div>
                <div className="feat-desc">{f.desc}</div>
                <span className="feat-tag" style={{ background: f.accent + '18', color: f.accent }}>
                  {i === 0 ? 'AI Powered' : i === 1 ? 'Deployed' : i === 2 ? 'Analytics' : i === 3 ? 'Multi-Agent' : i === 4 ? 'Persistent' : 'Ambient'}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ── HOW IT WORKS ─────────────────────────────────────────────────── */}
        <div className="section" style={{ paddingTop: 0 }}>
          <p className="section-eyebrow">How it works</p>
          <h2 className="section-title">Four steps to<br />whole-person insight</h2>
          <div className="how-wrap">
            {steps.map((s, i) => (
              <div className="step-card" key={s.num} ref={el => stepRefs.current[i] = el}>
                <div className="step-num">{s.num}</div>
                <div>
                  <div className="step-title">{s.title}</div>
                  <div className="step-body">{s.body}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── AI GYM TRAINER ───────────────────────────────────────────────── */}
        <div className="gym-section" ref={gymRef}>
          <div className="gym-content">
            <div className="gym-badge">⚡ Live & Deployed</div>
            <h2 className="gym-title">
              Meet your<br /><span className="hl-mint">AI Gym Trainer</span>
            </h2>
            <p className="gym-body">
              A separately deployed ML-powered fitness engine. Tell it your goals, fitness level, and available equipment — it builds a personalised workout session in seconds. Every completed session feeds directly into WellnessOS, linking your physical effort to your mental state.
            </p>
            <button
              className="btn-mint"
              onClick={() => window.open('https://your-gym-trainer-url.com', '_blank')}
            >
              <span>🏋️</span> Launch AI Gym Trainer
            </button>
          </div>
          <div className="gym-visual">
            <div className="gym-ring gym-ring-1" />
            <div className="gym-ring gym-ring-2" />
            <div className="gym-visual-inner">
              <span className="gym-visual-emoji">🏋️‍♂️</span>
              <div className="gym-visual-label">AI Gym Trainer · Live</div>
            </div>
          </div>
        </div>

        {/* ── AGENT ARCHITECTURE ───────────────────────────────────────────── */}
        <div className="arch-section">
          <div className="arch-inner">
            <p className="section-eyebrow">Under the hood</p>
            <h2 className="section-title">The agent team<br />architecture</h2>
            <p className="section-body" style={{ margin: '0 auto' }}>
              Built on Agno Framework with Gemini 2.0 Flash — a coordinator routes every request to the right specialist agent, then synthesises a unified response.
            </p>
            <div className="arch-diagram">
              <span className="arch-violet">User Message / App Event
        ↓
  ┌─────────────────────────────────┐
  │      </span><span className="arch-mint">COORDINATOR AGENT</span><span className="arch-violet">          │
  │  Decides which agents to call   │
  │  Synthesises all responses      │
  └──────┬──────────┬──────────┬────┘</span>
         ↓          ↓          ↓
  <span className="arch-blue">┌──────────┐</span> <span className="arch-mint">┌──────────┐</span> <span className="arch-pink">┌──────────────┐</span>
  <span className="arch-blue">│ MINDFUL  │</span> <span className="arch-mint">│ FITNESS  │</span> <span className="arch-pink">│   INSIGHT    │</span>
  <span className="arch-blue">│  AGENT   │</span> <span className="arch-mint">│  AGENT   │</span> <span className="arch-pink">│   AGENT      │</span>
  <span className="arch-blue">│          │</span> <span className="arch-mint">│          │</span> <span className="arch-pink">│              │</span>
  <span className="arch-blue">│ Mood     │</span> <span className="arch-mint">│ Connects │</span> <span className="arch-pink">│ Reads mood + │</span>
  <span className="arch-blue">│ health   │</span> <span className="arch-mint">│ to Gym   │</span> <span className="arch-pink">│ workout data │</span>
  <span className="arch-blue">│ support  │</span> <span className="arch-mint">│ Trainer  │</span> <span className="arch-pink">│ finds patterns│</span>
  <span className="arch-blue">└──────────┘</span> <span className="arch-mint">└──────────┘</span> <span className="arch-pink">└──────────────┘</span>
         ↓          ↓          ↓
  <span className="arch-violet">┌─────────────────────────────────┐
  │         MEMORY LAYER            │
  │  MongoDB: summaries, themes,    │
  │  mood history, workout history  │
  └─────────────────────────────────┘</span></div>
          </div>
        </div>

        {/* ── FINAL CTA ────────────────────────────────────────────────────── */}
        <div className="cta-section">
          <h2 className="cta-title">Ready to understand<br />yourself completely?</h2>
          <p className="cta-sub">Join WellnessOS and let a team of AI agents find the patterns that change everything.</p>
          <div className="cta-actions">
            <button className="btn-lg btn-lg-primary" onClick={() => navigate('/signup')}>
              Create your free account →
            </button>
            <button
              className="btn-lg btn-lg-outline"
              onClick={() => window.open('https://your-gym-trainer-url.com', '_blank')}
            >
              🏋️ Try AI Gym Trainer
            </button>
          </div>
        </div>

        {/* ── FOOTER ───────────────────────────────────────────────────────── */}
        <footer className="lp-footer" ref={footerRef}>
          <div className="footer-logo">WellnessOS</div>
          <div className="footer-copy">© {new Date().getFullYear()} WellnessOS. Built with ❤️ and Agno.</div>
          <div className="footer-links">
            <a href="/crises-support">Crisis Support</a>
            <a href="/login">Login</a>
            <a href="/signup">Sign Up</a>
          </div>
        </footer>

      </div>
    </>
  );
};

export default LandingPage;