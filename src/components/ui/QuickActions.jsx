import React, { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';

const actions = [
  {
    icon: '📝', label: 'New Journal Entry', desc: 'Write your thoughts',
    gradient: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)',
    glow: 'rgba(124,58,237,0.4)', to: '/journel/new-entry',
  },
  {
    icon: '🤖', label: 'Chat with AI', desc: 'Talk to your guide',
    gradient: 'linear-gradient(135deg, #0ea5e9 0%, #38bdf8 100%)',
    glow: 'rgba(14,165,233,0.4)', to: '/ai-chat',
  },
  {
    icon: '🧘', label: 'Start Exercise', desc: 'Calm your mind',
    gradient: 'linear-gradient(135deg, #10b981 0%, #34d399 100%)',
    glow: 'rgba(16,185,129,0.4)', to: '/exercises',
  },
  {
    icon: '🎵', label: 'Soundscapes', desc: 'Find your calm',
    gradient: 'linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)',
    glow: 'rgba(245,158,11,0.4)', to: '/soundscapes',
  },
];

const QuickActions = () => {
  const navigate = useNavigate();
  const cardRefs = useRef([]);
  const wrapRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(cardRefs.current.filter(Boolean),
      { opacity: 0, y: 30, scale: 0.92 },
      { opacity: 1, y: 0, scale: 1, stagger: 0.09, duration: 0.55, ease: 'back.out(1.4)',
        scrollTrigger: { trigger: wrapRef.current, start: 'top 88%' }
      }
    );
  }, []);

  const handleEnter = (i) => {
    gsap.to(cardRefs.current[i], { y: -6, scale: 1.03, duration: 0.3, ease: 'power2.out' });
  };
  const handleLeave = (i) => {
    gsap.to(cardRefs.current[i], { y: 0, scale: 1, duration: 0.45, ease: 'elastic.out(1, 0.5)' });
  };
  const handleClick = (i, to) => {
    gsap.timeline()
      .to(cardRefs.current[i], { scale: 0.93, duration: 0.1 })
      .to(cardRefs.current[i], { scale: 1, duration: 0.3, ease: 'back.out(2)', onComplete: () => navigate(to) });
  };

  return (
    <>
      <style>{`
        .qa-section { margin-bottom: 36px; }

        .qa-header {
          display: flex; align-items: center; gap: 14px;
          margin-bottom: 20px;
        }
        .qa-title {
          font-family: 'Sora', sans-serif;
          font-size: 1.2rem; font-weight: 700;
          color: #0f0722; letter-spacing: -0.02em;
        }
        .qa-line { flex: 1; height: 1px; background: linear-gradient(90deg, rgba(124,58,237,0.15), transparent); }

        .qa-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 14px;
        }
        @media (max-width: 800px) {
          .qa-grid { grid-template-columns: repeat(2, 1fr); }
        }

        .qa-card {
          border-radius: 20px;
          padding: 22px 20px;
          cursor: pointer;
          position: relative; overflow: hidden;
          display: flex; flex-direction: column; gap: 10px;
        }
        .qa-card::after {
          content: '';
          position: absolute; inset: 0;
          background: rgba(255,255,255,0.12);
          opacity: 0; transition: opacity 0.2s;
          border-radius: 20px;
        }
        .qa-card:hover::after { opacity: 1; }

        .qa-card-icon {
          width: 48px; height: 48px; border-radius: 14px;
          background: rgba(255,255,255,0.2);
          display: flex; align-items: center; justify-content: center;
          font-size: 1.4rem;
          backdrop-filter: blur(4px);
        }
        .qa-card-label {
          font-family: 'Sora', sans-serif;
          font-size: 0.9rem; font-weight: 700;
          color: white; letter-spacing: -0.01em;
        }
        .qa-card-desc {
          font-size: 0.75rem; color: rgba(255,255,255,0.7);
          font-weight: 400;
        }
        .qa-card-arrow {
          position: absolute; right: 16px; top: 50%;
          transform: translateY(-50%);
          font-size: 1rem; color: rgba(255,255,255,0.5);
          transition: transform 0.2s, color 0.2s;
        }
        .qa-card:hover .qa-card-arrow {
          transform: translateY(-50%) translateX(4px);
          color: rgba(255,255,255,0.9);
        }
      `}</style>

      <div className="qa-section" ref={wrapRef}>
        <div className="qa-header">
          <span className="qa-title">⚡ Quick Actions</span>
          <div className="qa-line" />
        </div>
        <div className="qa-grid">
          {actions.map((a, i) => (
            <div
              key={i}
              className="qa-card"
              ref={el => cardRefs.current[i] = el}
              style={{
                background: a.gradient,
                boxShadow: `0 8px 32px ${a.glow}`,
              }}
              onMouseEnter={() => handleEnter(i)}
              onMouseLeave={() => handleLeave(i)}
              onClick={() => handleClick(i, a.to)}
            >
              <div className="qa-card-icon">{a.icon}</div>
              <div>
                <div className="qa-card-label">{a.label}</div>
                <div className="qa-card-desc">{a.desc}</div>
              </div>
              <span className="qa-card-arrow">→</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default QuickActions;