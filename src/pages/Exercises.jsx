import React, { useState, useEffect, useCallback, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/ui/Sidebar.jsx';
import { useAuth } from '../context/AuthContext.jsx';

gsap.registerPlugin(ScrollTrigger);

const categories = ['All', 'Breathing', 'Mindfulness', 'Gratitude', 'CBT', 'Movement'];

const LOCAL_VIDEOS = [
  '/videos/1.mp4',
  '/videos/2.mp4',
  '/videos/3.mp4',
  '/videos/4.mp4',
  '/videos/5.mp4',
  '/videos/6.mp4',
  '/videos/7.mp4',
];

const CATEGORY_VIDEO_MAP = {
  Breathing: '/videos/1.mp4',
  Mindfulness: '/videos/2.mp4',
  Gratitude: '/videos/3.mp4',
  CBT: '/videos/4.mp4',
  Movement: '/videos/5.mp4',
};

/* ── AI Gym Trainer Banner ──────────────────────────────────────────────── */
const GymTrainerBanner = ({ bannerRef }) => {
  const GYM_URL = 'https://marvelous-sherbet-c11eb1.netlify.app/';

  return (
    <div
      ref={bannerRef}
      style={{
        position: 'relative',
        borderRadius: 24,
        overflow: 'hidden',
        marginBottom: 32,
        background: 'linear-gradient(135deg, #022c1a 0%, #041f0f 45%, #031a14 100%)',
        border: '1.5px solid rgba(52,211,153,0.3)',
        boxShadow: '0 8px 48px rgba(52,211,153,0.12), 0 0 0 1px rgba(52,211,153,0.08)',
        padding: '28px 32px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 24,
        flexWrap: 'wrap',
      }}
    >
      <div
        style={{
          position: 'absolute',
          width: 300,
          height: 300,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(52,211,153,0.15), transparent 70%)',
          top: -80,
          right: -40,
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          width: 200,
          height: 200,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(124,58,237,0.1), transparent 70%)',
          bottom: -60,
          left: 20,
          pointerEvents: 'none',
        }}
      />

      <div style={{ display: 'flex', alignItems: 'center', gap: 20, position: 'relative', zIndex: 1 }}>
        <div
          style={{
            width: 68,
            height: 68,
            borderRadius: 18,
            flexShrink: 0,
            background: 'linear-gradient(135deg, #22c55e, #16a34a)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '2rem',
            boxShadow: '0 0 30px rgba(34,197,94,0.5), 0 0 60px rgba(34,197,94,0.2)',
            animation: 'gym-icon-pulse 3s ease-in-out infinite',
          }}
        >
          🏋️
        </div>

        <div>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              marginBottom: 6,
              background: 'rgba(52,211,153,0.12)',
              border: '1px solid rgba(52,211,153,0.3)',
              padding: '3px 12px',
              borderRadius: 100,
              fontSize: '0.65rem',
              fontWeight: 700,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: '#34d399',
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: '50%',
                background: '#34d399',
                boxShadow: '0 0 6px #34d399',
                animation: 'liveblink 2s infinite',
                display: 'inline-block',
              }}
            />
            Live & Deployed
          </div>

          <h3
            style={{
              fontFamily: "'Sora', sans-serif",
              fontWeight: 800,
              fontSize: 'clamp(1.1rem, 2vw, 1.5rem)',
              color: '#fff',
              letterSpacing: '-0.03em',
              lineHeight: 1.1,
              marginBottom: 4,
            }}
          >
            AI Gym Trainer — <span style={{ color: '#34d399' }}>now live</span>
          </h3>

          <p style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.5, maxWidth: 480 }}>
            Our separately deployed ML fitness engine builds personalised workouts in seconds.
            Tell it your goals, equipment & level — it handles the rest.
          </p>
        </div>
      </div>

      <div style={{ position: 'relative', zIndex: 1, flexShrink: 0 }}>
        <a
          href={GYM_URL}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 10,
            padding: '13px 28px',
            borderRadius: 100,
            background: 'linear-gradient(135deg, #22c55e, #16a34a)',
            color: '#fff',
            textDecoration: 'none',
            fontFamily: "'Sora', sans-serif",
            fontWeight: 800,
            fontSize: '0.95rem',
            letterSpacing: '-0.01em',
            boxShadow: '0 0 28px rgba(34,197,94,0.5), 0 0 60px rgba(34,197,94,0.2)',
            transition: 'all 0.25s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px) scale(1.04)';
            e.currentTarget.style.boxShadow = '0 0 40px rgba(34,197,94,0.7), 0 0 80px rgba(34,197,94,0.3)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'none';
            e.currentTarget.style.boxShadow = '0 0 28px rgba(34,197,94,0.5), 0 0 60px rgba(34,197,94,0.2)';
          }}
        >
          🏋️ Launch AI Gym Trainer ↗
        </a>
        <p style={{ fontSize: '0.7rem', color: 'rgba(52,211,153,0.5)', textAlign: 'center', marginTop: 8, fontFamily: 'monospace' }}>
          marvelous-sherbet-c11eb1.netlify.app
        </p>
      </div>

      <style>{`
        @keyframes gym-icon-pulse {
          0%,100% { box-shadow: 0 0 30px rgba(34,197,94,0.5), 0 0 60px rgba(34,197,94,0.2); }
          50%     { box-shadow: 0 0 50px rgba(34,197,94,0.8), 0 0 90px rgba(34,197,94,0.35); }
        }
        @keyframes liveblink {
          0%,100% { opacity: 1; }
          50%     { opacity: 0.3; }
        }
      `}</style>
    </div>
  );
};

/* ── Filter pill ── */
const FilterPill = ({ category, selected, onClick }) => (
  <button
    onClick={() => onClick(category)}
    style={{
      padding: '8px 20px',
      borderRadius: '100px',
      border: selected ? 'none' : '1.5px solid var(--border-primary)',
      background: selected ? 'linear-gradient(135deg, #7c3aed, #a855f7)' : 'var(--bg-card)',
      color: selected ? 'white' : 'var(--text-muted)',
      fontSize: '0.875rem',
      fontWeight: 600,
      cursor: 'pointer',
      transition: 'all 0.2s',
      boxShadow: selected ? '0 4px 14px rgba(124,58,237,0.35)' : 'none',
      fontFamily: 'inherit',
    }}
  >
    {category}
  </button>
);

/* ── Exercise Card ── */
const ExerciseCard = ({ exercise, cardRef, idx }) => {
  const navigate = useNavigate();
  const ref = useRef(null);

  useEffect(() => {
    if (cardRef) cardRef.current[idx] = ref.current;
  }, [cardRef, idx]);

  // ── Normalize field names: support both backend (title/benefits/videoUrl)
  //    and local JSON (name/description/video) field conventions ──
  const title    = exercise.title    || exercise.name        || 'Untitled Exercise';
  const benefits = exercise.benefits || exercise.description || '';
  const imageSrc = exercise.imageSrc || exercise.image       || null;
  const videoUrl = exercise.videoUrl || exercise.video       || CATEGORY_VIDEO_MAP[exercise.category] || '';
  const duration = exercise.duration || '–';
  const difficulty = exercise.difficulty || null;

  const diffColor = {
    Beginner:     { bg: 'rgba(52,211,153,0.12)',  color: '#059669' },
    Intermediate: { bg: 'rgba(251,191,36,0.12)',  color: '#d97706' },
    Advanced:     { bg: 'rgba(239,68,68,0.12)',   color: '#dc2626' },
  }[difficulty] || { bg: 'rgba(107,114,128,0.1)', color: '#6b7280' };

  const handleStart = () => {
    if (videoUrl.trim()) {
      navigate('/exercises/player', { state: { videoUrl: videoUrl.trim(), title } });
    } else {
      alert('No video available for this exercise yet. Add one to /public/videos/');
    }
  };

  const handleEnter = () =>
    gsap.to(ref.current, { y: -6, scale: 1.02, duration: 0.3, ease: 'power2.out' });

  const handleLeave = () =>
    gsap.to(ref.current, { y: 0, scale: 1, duration: 0.45, ease: 'elastic.out(1,0.5)' });

  const hasVideo = !!videoUrl.trim();

  return (
    <div
      ref={ref}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      style={{
        background: 'var(--bg-card)',
        borderRadius: 22,
        overflow: 'hidden',
        boxShadow: 'var(--shadow-card)',
        border: '1px solid var(--border-card)',
        display: 'flex',
        flexDirection: 'column',
        cursor: 'default',
        transition: 'box-shadow 0.3s, background 0.3s',
      }}
    >
      {/* ── Thumbnail / Video preview ── */}
      <div style={{ height: 190, overflow: 'hidden', position: 'relative', background: '#0f0f18' }}>
        {imageSrc ? (
          <img
            src={imageSrc}
            alt={title}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        ) : hasVideo ? (
          /* Show a native video thumbnail (muted, no controls, poster frame) */
          <video
            src={videoUrl}
            muted
            playsInline
            preload="metadata"
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            onMouseEnter={(e) => e.currentTarget.play()}
            onMouseLeave={(e) => { e.currentTarget.pause(); e.currentTarget.currentTime = 0; }}
          />
        ) : (
          /* Placeholder when no image or video */
          <div
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'linear-gradient(135deg, rgba(124,58,237,0.15), rgba(52,211,153,0.08))',
              fontSize: '3rem',
            }}
          >
            🧘
          </div>
        )}

        {/* Category badge */}
        <span
          style={{
            position: 'absolute',
            top: 12,
            left: 12,
            background: 'rgba(255,255,255,0.92)',
            backdropFilter: 'blur(6px)',
            color: '#7c3aed',
            fontSize: '0.7rem',
            fontWeight: 700,
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            padding: '4px 12px',
            borderRadius: 100,
            border: '1px solid rgba(124,58,237,0.2)',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
          }}
        >
          {exercise.category}
        </span>

        {/* Video badge */}
        {hasVideo && (
          <span
            style={{
              position: 'absolute',
              top: 12,
              right: 12,
              background: 'rgba(34,197,94,0.9)',
              color: '#fff',
              fontSize: '0.65rem',
              fontWeight: 700,
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              padding: '3px 10px',
              borderRadius: 100,
            }}
          >
            ▶ Video
          </span>
        )}

        {/* Play overlay shown on hover when there's a video but no image */}
        {hasVideo && !imageSrc && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              pointerEvents: 'none',
            }}
          >
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: '50%',
                background: 'rgba(124,58,237,0.75)',
                backdropFilter: 'blur(4px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.2rem',
                color: '#fff',
                boxShadow: '0 4px 20px rgba(124,58,237,0.5)',
              }}
            >
              ▶
            </div>
          </div>
        )}
      </div>

      {/* ── Card body ── */}
      <div style={{ padding: '20px 22px 22px', flex: 1, display: 'flex', flexDirection: 'column', gap: 10 }}>

        {/* Title + duration */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8 }}>
          <h3
            style={{
              fontFamily: "'Sora', sans-serif",
              fontSize: '1.05rem',
              fontWeight: 700,
              color: 'var(--text-primary)',
              letterSpacing: '-0.02em',
              lineHeight: 1.2,
              transition: 'color 0.3s',
            }}
          >
            {title}
          </h3>
          <span
            style={{
              flexShrink: 0,
              display: 'flex',
              alignItems: 'center',
              gap: 4,
              fontSize: '0.78rem',
              color: 'var(--text-muted)',
              fontWeight: 500,
            }}
          >
            🕒 {duration} min
          </span>
        </div>

        {/* Difficulty badge (only if present) */}
        {difficulty && (
          <span
            style={{
              display: 'inline-block',
              alignSelf: 'flex-start',
              background: diffColor.bg,
              color: diffColor.color,
              fontSize: '0.72rem',
              fontWeight: 700,
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              padding: '4px 12px',
              borderRadius: 100,
            }}
          >
            {difficulty}
          </span>
        )}

        {/* Description / benefits */}
        <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.55, flex: 1, transition: 'color 0.3s' }}>
          {benefits}
        </p>

        {/* CTA button */}
        <button
          onClick={handleStart}
          style={{
            width: '100%',
            padding: '11px 0',
            background: 'linear-gradient(135deg, #7c3aed, #a855f7)',
            color: 'white',
            border: 'none',
            borderRadius: 14,
            fontFamily: 'inherit',
            fontSize: '0.9rem',
            fontWeight: 700,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
            boxShadow: '0 4px 16px rgba(124,58,237,0.35)',
            transition: 'transform 0.15s, box-shadow 0.15s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.02)';
            e.currentTarget.style.boxShadow = '0 6px 22px rgba(124,58,237,0.45)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = '0 4px 16px rgba(124,58,237,0.35)';
          }}
        >
          ▶ Start Exercise
        </button>
      </div>
    </div>
  );
};

/* ── Page ── */
const Exercises = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [exerciseData, setExerciseData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { getAuthHeader } = useAuth();

  const orb1 = useRef(null);
  const orb2 = useRef(null);
  const bannerRef = useRef(null);
  const headerRef = useRef(null);
  const filterRef = useRef(null);
  const cardRefs = useRef([]);

  useEffect(() => {
    gsap.to(orb1.current, { x: 50, y: -30, duration: 7, repeat: -1, yoyo: true, ease: 'sine.inOut' });
    gsap.to(orb2.current, { x: -40, y: 45, duration: 9, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 1.5 });

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    tl.fromTo(bannerRef.current, { opacity: 0, y: -30, scale: 0.97 }, { opacity: 1, y: 0, scale: 1, duration: 0.8 })
      .fromTo(headerRef.current, { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.65 }, '-=0.4')
      .fromTo(filterRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.55 }, '-=0.4');
  }, []);

  useEffect(() => {
    if (!loading && cardRefs.current.length) {
      gsap.fromTo(
        cardRefs.current.filter(Boolean),
        { opacity: 0, y: 50, scale: 0.94 },
        { opacity: 1, y: 0, scale: 1, duration: 0.65, stagger: 0.08, ease: 'power3.out', delay: 0.1 }
      );
    }
  }, [loading, selectedCategory]);

  // ── Fetch with local JSON fallback ──────────────────────────────────────
  const fetchExercises = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/exercises', { headers: getAuthHeader() });
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const data = await res.json();

      if (Array.isArray(data) && data.length > 0) {
        setExerciseData(data);
      } else {
        // Backend returned empty array — fall back to local JSON
        const { default: localData } = await import('../data/exercises.json');
        setExerciseData(localData);
      }
    } catch {
      // Backend unavailable — fall back to local JSON silently
      try {
        const { default: localData } = await import('../data/exercises.json');
        setExerciseData(localData);
      } catch {
        setError('Failed to load exercises. Please try again later.');
      }
    } finally {
      setLoading(false);
    }
  }, [getAuthHeader]);

  useEffect(() => {
    fetchExercises();
  }, [fetchExercises]);

  const filtered = exerciseData.filter(
    (ex) => selectedCategory === 'All' || ex.category === selectedCategory
  );

  const handleFilter = (cat) => {
    cardRefs.current = [];
    setSelectedCategory(cat);
  };

  return (
    <>
      <style>{`
        .ex-root {
          display: flex;
          min-height: 100vh;
          background: var(--bg-primary);
          font-family: 'Plus Jakarta Sans', sans-serif;
          position: relative;
          overflow-x: hidden;
          transition: background 0.35s;
        }
        .ex-orb {
          position: fixed;
          border-radius: 50%;
          pointer-events: none;
          z-index: 0;
          filter: blur(90px);
        }
        .ex-orb-1 {
          width: 500px;
          height: 500px;
          background: radial-gradient(circle, var(--orb-1-color), transparent 70%);
          top: -80px;
          right: -60px;
        }
        .ex-orb-2 {
          width: 360px;
          height: 360px;
          background: radial-gradient(circle, var(--orb-3-color), transparent 70%);
          bottom: 8%;
          left: -40px;
        }
        .ex-main {
          flex: 1;
          position: relative;
          z-index: 1;
          padding: 44px 52px 60px 80px;
        }
        .ex-chip {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: var(--bg-card);
          border: 1px solid var(--border-primary);
          padding: 5px 14px;
          border-radius: 100px;
          font-size: 0.72rem;
          font-weight: 600;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          color: var(--accent-violet);
          margin-bottom: 12px;
          box-shadow: var(--shadow-card);
          transition: background 0.3s, border-color 0.3s;
        }
        .ex-chip-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #34d399;
          box-shadow: 0 0 0 3px rgba(52,211,153,0.25);
          animation: expulse 2s ease-in-out infinite;
        }
        @keyframes expulse {
          0%,100%{ box-shadow: 0 0 0 3px rgba(52,211,153,0.25); }
          50%    { box-shadow: 0 0 0 7px rgba(52,211,153,0.08); }
        }
        .ex-title {
          font-family: 'Sora', sans-serif;
          font-size: clamp(1.8rem, 3vw, 2.6rem);
          font-weight: 800;
          color: var(--text-primary);
          letter-spacing: -0.03em;
          line-height: 1.05;
          margin-bottom: 6px;
          transition: color 0.3s;
        }
        .ex-title .grad {
          background: linear-gradient(135deg, #7c3aed, #34d399);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .ex-sub {
          font-size: 0.95rem;
          color: var(--text-muted);
          font-weight: 400;
          line-height: 1.55;
          transition: color 0.3s;
        }
        .ex-header-row {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 12px;
        }
        .ex-random-btn {
          display: flex;
          align-items: center;
          gap: 7px;
          padding: 9px 20px;
          border-radius: 100px;
          background: var(--bg-card);
          border: 1.5px solid var(--border-primary);
          color: var(--accent-violet);
          font-size: 0.875rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
          font-family: inherit;
          box-shadow: var(--shadow-card);
        }
        .ex-random-btn:hover {
          background: var(--bg-card-hover);
          border-color: var(--accent-violet);
          transform: translateY(-1px);
        }
        .ex-divider {
          height: 1px;
          background: linear-gradient(90deg, var(--border-primary), transparent);
          margin: 26px 0;
        }
        .ex-filter-row {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
          align-items: center;
        }
        .ex-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 22px;
          margin-top: 28px;
        }
        .ex-loading, .ex-error, .ex-empty {
          grid-column: 1 / -1;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 60px 24px;
          border-radius: 20px;
          text-align: center;
        }
        .ex-loading { background: var(--bg-card); }
        .ex-loading-inner {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 14px;
        }
        .ex-spinner {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          border: 3px solid var(--border-primary);
          border-top-color: #7c3aed;
          animation: spin 0.8s linear infinite;
        }
        @keyframes spin { to { transform: rotate(360deg); } }
        .ex-loading p {
          font-size: 0.95rem;
          color: var(--accent-violet);
          font-weight: 600;
        }
        .ex-error {
          background: rgba(239,68,68,0.05);
          border: 1px solid rgba(239,68,68,0.2);
          color: #dc2626;
          font-size: 0.95rem;
        }
        .ex-empty {
          background: var(--bg-card);
          border: 1px dashed var(--border-primary);
          color: var(--text-muted);
          font-size: 0.95rem;
        }
        .ex-count-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 6px 14px;
          border-radius: 100px;
          background: rgba(124,58,237,0.07);
          border: 1px solid rgba(124,58,237,0.12);
          font-size: 0.78rem;
          font-weight: 600;
          color: var(--accent-violet);
        }
        .ex-video-hint {
          margin-top: 40px;
          padding: 20px 24px;
          background: var(--bg-card);
          border: 1px solid var(--border-card);
          border-radius: 18px;
          border-left: 3px solid #7c3aed;
        }
        .ex-video-hint-title {
          font-family: 'Sora', sans-serif;
          font-size: 0.875rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 12px;
        }
        .ex-video-list {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 8px;
        }
        .ex-video-item {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 12px;
          border-radius: 10px;
          background: rgba(124,58,237,0.06);
          border: 1px solid rgba(124,58,237,0.1);
          font-size: 0.8rem;
          color: var(--text-muted);
        }
        .ex-video-item code {
          font-family: monospace;
          font-size: 0.75rem;
          color: var(--accent-violet);
        }
      `}</style>

      <div className="ex-root">
        <div className="ex-orb ex-orb-1" ref={orb1} />
        <div className="ex-orb ex-orb-2" ref={orb2} />
        <div className="theme-bg-grid" />

        <Sidebar />

        <div className="ex-main">
          <GymTrainerBanner bannerRef={bannerRef} />

          <div ref={headerRef}>
            <div className="ex-chip">
              <span className="ex-chip-dot" /> Wellness Exercises
            </div>
            <div className="ex-header-row">
              <div>
                <h1 className="ex-title">
                  Wellness <span className="grad">Exercises</span>
                </h1>
                <p className="ex-sub">Evidence-based practices to support your mental wellbeing.</p>
              </div>
              <button
                className="ex-random-btn"
                onClick={() => {
                  const cat = categories[Math.floor(Math.random() * (categories.length - 1)) + 1];
                  handleFilter(cat);
                }}
              >
                ✨ Random Category
              </button>
            </div>
          </div>

          <div className="ex-divider" />

          <div className="ex-filter-row" ref={filterRef}>
            {categories.map((cat) => (
              <FilterPill
                key={cat}
                category={cat}
                selected={selectedCategory === cat}
                onClick={handleFilter}
              />
            ))}
            {!loading && (
              <span className="ex-count-badge" style={{ marginLeft: 'auto' }}>
                {filtered.length} exercise{filtered.length !== 1 ? 's' : ''}
              </span>
            )}
          </div>

          <div className="ex-grid">
            {loading ? (
              <div className="ex-loading">
                <div className="ex-loading-inner">
                  <div className="ex-spinner" />
                  <p>Loading exercises…</p>
                </div>
              </div>
            ) : error ? (
              <div className="ex-error">⚠️ &nbsp;{error}</div>
            ) : filtered.length === 0 ? (
              <div className="ex-empty">No exercises found for this category.</div>
            ) : (
              filtered.map((ex, i) => (
                <ExerciseCard
                  key={ex._id || ex.id || i}
                  exercise={ex}
                  cardRef={cardRefs}
                  idx={i}
                />
              ))
            )}
          </div>

        </div>
      </div>
    </>
  );
};

export default Exercises;