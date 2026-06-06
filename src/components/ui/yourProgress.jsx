// import React from 'react'

// const yourProgress = () => {
//   return (
//     <div className='text-xl font-medium pb-70 pl-5 p-4 mb-4 bg-white rounded-2xl shadow-md'>Your Progress</div>
//   )
// }

// export default yourProgress
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const YourProgress = () => {
  const cardRef = useRef(null);
  const streakRef = useRef(null);
  const barRef = useRef(null);
  const numberRef = useRef(null);
  const ringsRef = useRef([]);

  useEffect(() => {
    // Animate streak number count-up
    gsap.fromTo(numberRef.current,
      { innerText: 0 },
      {
        innerText: 5,
        duration: 1.4,
        ease: 'power2.out',
        delay: 0.8,
        snap: { innerText: 1 },
        onUpdate() {
          if (numberRef.current) {
            numberRef.current.textContent = Math.round(gsap.getProperty(this.targets()[0], 'innerText'));
          }
        }
      }
    );

    // Animate progress bar
    gsap.fromTo(barRef.current,
      { width: '0%' },
      { width: '71%', duration: 1.6, ease: 'power3.out', delay: 1 }
    );

    // Animate orbital rings
    ringsRef.current.forEach((ring, i) => {
      if (ring) {
        gsap.to(ring, {
          rotation: i % 2 === 0 ? 360 : -360,
          duration: 8 + i * 3,
          repeat: -1,
          ease: 'none',
          transformOrigin: 'center center',
        });
      }
    });

    // Card float
    gsap.to(cardRef.current, {
      y: -6,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });
  }, []);

  const days = ['M','T','W','T','F','S','S'];
  const completed = [true, true, true, true, true, false, false];

  return (
    <>
      <style>{`
        .progress-card {
          background: linear-gradient(145deg, #1a0533 0%, #2d1257 50%, #1a0a3d 100%);
          border-radius: 28px;
          padding: 32px 28px;
          box-shadow:
            0 0 0 1px rgba(167,139,250,0.2),
            0 30px 80px rgba(124,58,237,0.3),
            0 10px 30px rgba(0,0,0,0.2);
          position: relative;
          overflow: hidden;
          height: 100%;
          min-height: 320px;
          display: flex;
          flex-direction: column;
        }

        .progress-deco-ring {
          position: absolute;
          border-radius: 50%;
          border: 1px solid rgba(167,139,250,0.15);
          pointer-events: none;
        }

        .progress-deco-glow {
          position: absolute;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(167,139,250,0.25), transparent 60%);
          pointer-events: none;
          top: -40px; right: -40px;
          width: 200px; height: 200px;
        }

        .progress-deco-glow2 {
          position: absolute;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(244,114,182,0.15), transparent 60%);
          pointer-events: none;
          bottom: -20px; left: -20px;
          width: 150px; height: 150px;
        }

        .progress-header {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 28px;
          position: relative; z-index: 1;
        }

        .progress-icon {
          width: 36px; height: 36px;
          background: linear-gradient(135deg, #f97316, #fbbf24);
          border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
          font-size: 1.1rem;
          box-shadow: 0 4px 15px rgba(249,115,22,0.4);
        }

        .progress-title {
          font-family: 'Clash Display', sans-serif;
          font-size: 1rem;
          font-weight: 600;
          color: #e9d5ff;
          letter-spacing: -0.01em;
        }

        .streak-section {
          text-align: center;
          margin-bottom: 28px;
          position: relative; z-index: 1;
        }

        .streak-number {
          font-family: 'Clash Display', sans-serif;
          font-size: 4.5rem;
          font-weight: 700;
          line-height: 1;
          background: linear-gradient(135deg, #f9a8d4, #a78bfa, #93c5fd);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          letter-spacing: -0.04em;
        }

        .streak-label {
          font-size: 0.8rem;
          color: rgba(233,213,255,0.55);
          font-weight: 500;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          margin-top: 4px;
        }

        .days-row {
          display: flex;
          justify-content: center;
          gap: 8px;
          margin-bottom: 28px;
          position: relative; z-index: 1;
        }

        .day-dot {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 5px;
        }

        .day-circle {
          width: 30px; height: 30px;
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-size: 0.6rem;
          font-weight: 700;
          letter-spacing: 0.02em;
          transition: all 0.2s;
        }

        .day-circle.done {
          background: linear-gradient(135deg, #7c3aed, #a78bfa);
          box-shadow: 0 0 12px rgba(167,139,250,0.5);
          color: white;
        }

        .day-circle.todo {
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.08);
          color: rgba(255,255,255,0.3);
        }

        .goal-section {
          position: relative; z-index: 1;
        }

        .goal-label {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 10px;
        }

        .goal-text {
          font-size: 0.8rem;
          color: rgba(233,213,255,0.6);
          font-weight: 500;
        }

        .goal-count {
          font-size: 0.78rem;
          font-weight: 700;
          color: #a78bfa;
        }

        .progress-track {
          background: rgba(255,255,255,0.07);
          border-radius: 100px;
          height: 8px;
          overflow: hidden;
        }

        .progress-fill {
          height: 100%;
          border-radius: 100px;
          background: linear-gradient(90deg, #7c3aed, #a78bfa, #f472b6);
          box-shadow: 0 0 16px rgba(167,139,250,0.6);
          width: 0%;
        }
      `}</style>

      <div className="progress-card" ref={cardRef}>
        <div className="progress-deco-glow" />
        <div className="progress-deco-glow2" />
        {[
          { size: 180, top: '50%', left: '50%', transform: 'translate(-50%,-50%)' },
          { size: 240, top: '50%', left: '50%', transform: 'translate(-50%,-50%)' },
        ].map((r, i) => (
          <div
            key={i}
            className="progress-deco-ring"
            ref={el => ringsRef.current[i] = el}
            style={{ width: r.size, height: r.size, top: r.top, left: r.left, transform: r.transform }}
          />
        ))}

        <div className="progress-header">
          <div className="progress-icon">🔥</div>
          <span className="progress-title">Your Progress</span>
        </div>

        <div className="streak-section" ref={streakRef}>
          <div className="streak-number" ref={numberRef}>5</div>
          <div className="streak-label">day streak</div>
        </div>

        <div className="days-row">
          {days.map((d, i) => (
            <div className="day-dot" key={i}>
              <div className={`day-circle ${completed[i] ? 'done' : 'todo'}`}>
                {completed[i] ? '✓' : d}
              </div>
            </div>
          ))}
        </div>

        <div className="goal-section">
          <div className="goal-label">
            <span className="goal-text">Weekly Goal</span>
            <span className="goal-count">5 / 7 days</span>
          </div>
          <div className="progress-track">
            <div className="progress-fill" ref={barRef} />
          </div>
        </div>
      </div>
    </>
  );
};

export default YourProgress;