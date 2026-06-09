import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const insights = [
  {
    image: '/images/1st.jpg',
    title: 'Practice Mindfulness',
    description: 'Pause for one minute to notice five things you can see, four you can touch, three you can hear, two you can smell, and one you can taste.',
    tag: 'Grounding',
    tagColor: '#34d399',
    accentColor: '#059669',
  },
  {
    image: '/images/hydrate1.jpg',
    title: 'Stay Hydrated',
    description: 'Physical health directly impacts mental clarity. Drinking enough water reduces fatigue, sharpens focus, and lifts your mood.',
    tag: 'Wellness',
    tagColor: '#60a5fa',
    accentColor: '#2563eb',
  },
  {
    image: '/images/limit.jpg',
    title: 'Limit Comparison',
    description: "Social media highlights are not reality. Focus on your own journey, progress, and growth — comparison is the thief of joy.",
    tag: 'Mindset',
    tagColor: '#f472b6',
    accentColor: '#be185d',
  },
  {
    image: '/images/sleep.jpg',
    title: 'Prioritize Sleep',
    description: 'Ensure you get 7–9 hours of quality sleep. It is essential for emotional regulation, memory consolidation, and cognitive function.',
    tag: 'Recovery',
    tagColor: '#a78bfa',
    accentColor: '#7c3aed',
  },
];

const InsightCard = ({ insight, idx, cardRef }) => {
  const hoverRef = useRef(null);

  const handleMouseEnter = () =>
    gsap.to(hoverRef.current, { y: -7, scale: 1.015, duration: 0.32, ease: 'power2.out' });
  const handleMouseLeave = () =>
    gsap.to(hoverRef.current, { y: 0, scale: 1, duration: 0.5, ease: 'elastic.out(1,0.5)' });

  return (
    <div
      ref={el => { cardRef.current[idx] = el; hoverRef.current = el; }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        background: '#ffffff',
        borderRadius: '24px',
        overflow: 'hidden',
        boxShadow: '0 4px 28px rgba(0,0,0,0.07), 0 1px 0 rgba(255,255,255,0.9) inset',
        border: '1px solid rgba(0,0,0,0.05)',
        cursor: 'default',
        transition: 'box-shadow 0.3s',
        /* make every card the same height in the grid row */
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* ── Image band ── */}
      <div style={{
        position: 'relative',
        /* 56.25% = 16:9 ratio — tall enough to show subjects properly */
        paddingTop: '52%',
        overflow: 'hidden',
        flexShrink: 0,
      }}>
        <img
          src={insight.image}
          alt={insight.title}
          style={{
            position: 'absolute',
            top: 0, left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            /* push focal point slightly up so faces/subjects aren't cut */
            objectPosition: 'center 30%',
            display: 'block',
          }}
        />

        {/* subtle bottom fade so text area blends in */}
        <div style={{
          position: 'absolute',
          bottom: 0, left: 0, right: 0,
          height: '50%',
          background: 'linear-gradient(to bottom, transparent, rgba(0,0,0,0.18))',
          pointerEvents: 'none',
        }} />

        {/* Tag badge — top right */}
        <span style={{
          position: 'absolute',
          top: 14, right: 14,
          zIndex: 1,
          background: 'rgba(255,255,255,0.93)',
          color: insight.tagColor,
          fontSize: '0.67rem',
          fontWeight: 700,
          letterSpacing: '0.07em',
          textTransform: 'uppercase',
          padding: '5px 13px',
          borderRadius: '100px',
          border: `1px solid ${insight.tagColor}50`,
          backdropFilter: 'blur(8px)',
          boxShadow: '0 2px 10px rgba(0,0,0,0.12)',
        }}>
          {insight.tag}
        </span>
      </div>

      {/* ── Text content ── */}
      <div style={{
        padding: '22px 26px 26px',
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
      }}>
        <h3 style={{
          fontFamily: "'Clash Display', sans-serif",
          fontSize: '1.12rem',
          fontWeight: 700,
          color: '#111827',
          letterSpacing: '-0.02em',
          marginBottom: '10px',
          lineHeight: 1.25,
        }}>
          {insight.title}
        </h3>
        <p style={{
          fontSize: '0.875rem',
          color: '#6b7280',
          lineHeight: 1.65,
          fontWeight: 400,
          flex: 1,
        }}>
          {insight.description}
        </p>

        {/* Accent bar */}
        <div style={{
          marginTop: '18px',
          height: 3,
          borderRadius: 100,
          background: `linear-gradient(90deg, ${insight.tagColor}, ${insight.tagColor}35)`,
          width: '38%',
        }} />
      </div>
    </div>
  );
};

const InsightfulThoughts = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const cardRefs = useRef([]);

  useEffect(() => {
    gsap.fromTo(
      headingRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1, y: 0, duration: 0.7, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 85%' },
      }
    );

    cardRefs.current.forEach((card, i) => {
      if (!card) return;
      gsap.fromTo(
        card,
        { opacity: 0, y: 50, scale: 0.95 },
        {
          opacity: 1, y: 0, scale: 1,
          duration: 0.7, ease: 'power3.out',
          delay: i * 0.12,
          scrollTrigger: { trigger: card, start: 'top 92%' },
        }
      );
    });
  }, []);

  return (
    <>
      <style>{`
        .insights-section { margin-top: 8px; }

        .insights-header {
          display: flex;
          align-items: center;
          gap: 14px;
          margin-bottom: 28px;
        }
        .insights-eyebrow {
          font-size: 0.72rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: #7c3aed;
          font-weight: 700;
        }
        .insights-title {
          font-family: 'Clash Display', sans-serif;
          font-size: 1.6rem;
          font-weight: 600;
          color: #111827;
          letter-spacing: -0.025em;
          line-height: 1.1;
        }

        /* 2-col grid; rows are equal height */
        .insights-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          /* each row: image area + content area, perfectly matched */
          grid-auto-rows: 1fr;
          gap: 22px;
          align-items: stretch;
        }

        @media (max-width: 700px) {
          .insights-grid {
            grid-template-columns: 1fr;
            grid-auto-rows: auto;
          }
        }
      `}</style>

      <div className="insights-section" ref={sectionRef}>
        <div className="insights-header" ref={headingRef}>
          <div>
            <p className="insights-eyebrow">Daily Wisdom</p>
            <h2 className="insights-title">🧠 Insightful Thoughts</h2>
          </div>
        </div>

        <div className="insights-grid">
          {insights.map((insight, idx) => (
            <InsightCard
              key={insight.title}
              insight={insight}
              idx={idx}
              cardRef={cardRefs}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default InsightfulThoughts;