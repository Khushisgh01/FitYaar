import React, { useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

const ExercisePlayer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { videoUrl, title } = location.state || {};
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(true);

  // ── Determine if this is a local file or a YouTube URL ──────────────────
  const isLocal =
    videoUrl &&
    (videoUrl.startsWith('/') ||
      videoUrl.startsWith('./') ||
      videoUrl.includes('.mp4') ||
      videoUrl.includes('.webm') ||
      videoUrl.includes('.ogg'));

  const getYouTubeEmbedUrl = (url) => {
    if (!url) return null;
    const regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11
      ? `https://www.youtube.com/embed/${match[2]}?autoplay=1`
      : null;
  };

  const embedUrl = isLocal ? null : getYouTubeEmbedUrl(videoUrl);

  // ── Nothing playable ──────────────────────────────────────────────────────
  if (!videoUrl || (!isLocal && !embedUrl)) {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          background: 'var(--bg-primary, #fff)',
          gap: 16,
          fontFamily: "'Plus Jakarta Sans', sans-serif",
        }}
      >
        <span style={{ fontSize: '3rem' }}>🎬</span>
        <h2
          style={{
            fontSize: '1.4rem',
            fontWeight: 700,
            color: 'var(--text-primary, #1a1a2e)',
            fontFamily: "'Sora', sans-serif",
          }}
        >
          Video Unavailable
        </h2>
        <p style={{ color: 'var(--text-muted, #6b7280)', fontSize: '0.95rem' }}>
          No valid video was found for this exercise.
        </p>
        <button
          onClick={() => navigate(-1)}
          style={{
            marginTop: 8,
            padding: '10px 28px',
            background: 'linear-gradient(135deg, #7c3aed, #a855f7)',
            color: '#fff',
            border: 'none',
            borderRadius: 100,
            fontFamily: 'inherit',
            fontWeight: 700,
            fontSize: '0.9rem',
            cursor: 'pointer',
            boxShadow: '0 4px 16px rgba(124,58,237,0.35)',
          }}
        >
          ← Go Back
        </button>
      </div>
    );
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        background: 'var(--bg-primary, #0a0a14)',
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        color: '#fff',
      }}
    >
      {/* ── Header bar ──────────────────────────────────────────────────── */}
      <div
        style={{
          padding: '14px 24px',
          display: 'flex',
          alignItems: 'center',
          gap: 14,
          background: 'linear-gradient(135deg, #7c3aed, #6d28d9)',
          boxShadow: '0 4px 24px rgba(124,58,237,0.35)',
        }}
      >
        <button
          onClick={() => navigate(-1)}
          style={{
            background: 'rgba(255,255,255,0.12)',
            border: 'none',
            borderRadius: '50%',
            width: 40,
            height: 40,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: '#fff',
            flexShrink: 0,
            transition: 'background 0.2s',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.22)')}
          onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.12)')}
          aria-label="Go back"
        >
          <ArrowLeftIcon style={{ width: 20, height: 20 }} />
        </button>

        <h1
          style={{
            fontFamily: "'Sora', sans-serif",
            fontSize: 'clamp(1rem, 2vw, 1.25rem)',
            fontWeight: 800,
            letterSpacing: '-0.02em',
            margin: 0,
          }}
        >
          {title || 'Exercise Session'}
        </h1>
      </div>

      {/* ── Video area ──────────────────────────────────────────────────── */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '32px 24px',
          gap: 24,
          background: 'radial-gradient(ellipse at center, rgba(124,58,237,0.08) 0%, transparent 70%)',
        }}
      >
        <div
          style={{
            width: '100%',
            maxWidth: 900,
            aspectRatio: '16/9',
            borderRadius: 24,
            overflow: 'hidden',
            boxShadow: '0 8px 60px rgba(0,0,0,0.6), 0 0 0 1px rgba(124,58,237,0.2)',
            background: '#000',
            position: 'relative',
          }}
        >
          {/* ── Local MP4 ── */}
          {isLocal && (
            <video
              ref={videoRef}
              src={videoUrl}
              controls
              autoPlay
              playsInline
              style={{ width: '100%', height: '100%', display: 'block', objectFit: 'contain', background: '#000' }}
              onPlay={() => setPlaying(true)}
              onPause={() => setPlaying(false)}
            />
          )}

          {/* ── YouTube embed ── */}
          {!isLocal && embedUrl && (
            <iframe
              src={embedUrl}
              title={title || 'Exercise Video'}
              style={{ width: '100%', height: '100%', border: 'none', display: 'block' }}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          )}
        </div>

        {/* ── Exercise info below player ───────────────────────────────── */}
        <div
          style={{
            width: '100%',
            maxWidth: 900,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 12,
          }}
        >
          <div>
            <p
              style={{
                fontFamily: "'Sora', sans-serif",
                fontSize: '1.1rem',
                fontWeight: 700,
                color: '#fff',
                margin: 0,
              }}
            >
              {title}
            </p>
            <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)', margin: '4px 0 0' }}>
              {isLocal ? 'Local video' : 'YouTube'}
            </p>
          </div>

          <button
            onClick={() => navigate(-1)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              padding: '10px 22px',
              background: 'rgba(255,255,255,0.08)',
              border: '1px solid rgba(255,255,255,0.12)',
              borderRadius: 100,
              color: '#fff',
              fontFamily: 'inherit',
              fontSize: '0.875rem',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'background 0.2s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.14)')}
            onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.08)')}
          >
            ← Back to Exercises
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExercisePlayer;