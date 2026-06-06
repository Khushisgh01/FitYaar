import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const stats = [
  { value: 5, suffix: '', label: 'Day Streak', icon: '🔥', color: '#f97316', bg: 'rgba(249,115,22,0.1)', border: 'rgba(249,115,22,0.2)' },
  { value: 12, suffix: '', label: 'Sessions Done', icon: '✅', color: '#34d399', bg: 'rgba(52,211,153,0.1)', border: 'rgba(52,211,153,0.2)' },
  { value: 87, suffix: '%', label: 'Weekly Goal', icon: '🎯', color: '#60a5fa', bg: 'rgba(96,165,250,0.1)', border: 'rgba(96,165,250,0.2)' },
  { value: 3, suffix: 'h', label: 'Mindful Time', icon: '⏱️', color: '#a78bfa', bg: 'rgba(167,139,250,0.1)', border: 'rgba(167,139,250,0.2)' },
];

const StatsStrip = () => {
  const numRefs = useRef([]);

  useEffect(() => {
    stats.forEach((s, i) => {
      if (!numRefs.current[i]) return;
      gsap.fromTo(numRefs.current[i],
        { innerText: 0 },
        {
          innerText: s.value,
          duration: 1.6, ease: 'power2.out', delay: 0.7 + i * 0.15,
          snap: { innerText: 1 },
          onUpdate() {
            if (numRefs.current[i]) {
              numRefs.current[i].textContent =
                Math.round(gsap.getProperty(this.targets()[0], 'innerText')) + s.suffix;
            }
          }
        }
      );
    });
  }, []);

  return (
    <>
      <style>{`
        .stats-strip {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 14px;
        }
        @media (max-width: 700px) {
          .stats-strip { grid-template-columns: repeat(2, 1fr); }
        }

        .stat-card {
          background: white;
          border-radius: 18px;
          padding: 18px 20px;
          display: flex; align-items: center; gap: 14px;
          box-shadow: 0 2px 14px rgba(0,0,0,0.05);
          transition: transform 0.25s, box-shadow 0.25s;
          cursor: default;
        }
        .stat-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 30px rgba(0,0,0,0.1);
        }

        .stat-icon {
          width: 44px; height: 44px; border-radius: 13px;
          display: flex; align-items: center; justify-content: center;
          font-size: 1.2rem; flex-shrink: 0;
        }

        .stat-value {
          font-family: 'Sora', sans-serif;
          font-size: 1.7rem; font-weight: 800;
          letter-spacing: -0.03em; line-height: 1;
        }
        .stat-label {
          font-size: 0.72rem; font-weight: 500;
          color: #9ca3af; margin-top: 3px;
          text-transform: uppercase; letter-spacing: 0.05em;
        }
      `}</style>

      <div className="stats-strip">
        {stats.map((s, i) => (
          <div
            key={i}
            className="stat-card"
            style={{ border: `1px solid ${s.border}` }}
          >
            <div className="stat-icon" style={{ background: s.bg }}>
              {s.icon}
            </div>
            <div>
              <div className="stat-value" style={{ color: s.color }} ref={el => numRefs.current[i] = el}>
                0{s.suffix}
              </div>
              <div className="stat-label">{s.label}</div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default StatsStrip;