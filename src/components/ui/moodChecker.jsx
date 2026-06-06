// import React from 'react';
// import EmojiButton from './emoji'; // Adjust path if needed

// // 1. Accept the onMoodSelect prop from Home.js
// const MoodChecker = ({ onMoodSelect }) => {

//   const handleMoodClick = (moodText, emojiChar) => {
//     // 2. Call the prop, which will trigger the navigation
//     onMoodSelect(moodText, emojiChar);
//   };

//   return (
//     <div className='text-center mb-4 bg-white rounded-2xl shadow-md'>
//       <h2 className='text-2xl font-semibold mb-4 pt-4'>How are you feeling today?</h2>
//       <p>Select your current mood</p>
//       <div className="flex flex-wrap justify-center gap-4 p-4">
        
//         {/* 3. Each button now just calls handleMoodClick */}
//         <EmojiButton 
//           emoji="😢" 
//           onClick={() => handleMoodClick('Very-Sad', '😢')} 
//         />
        
//         <EmojiButton 
//           emoji="😊" 
//           onClick={() => handleMoodClick('Happy', '😊')} 
//         />

//         <EmojiButton 
//           emoji="😠" 
//           onClick={() => handleMoodClick('Angry', '😠')} 
//         />
//         <EmojiButton 
//           emoji="😐" 
//           onClick={() => handleMoodClick('Neutral', '😐')} 
//         />
//         <EmojiButton 
//           emoji="😞" 
//           onClick={() => handleMoodClick('Sad', '😞')} 
//         />
//       </div>
//       {/* We don't need the <p> tag showing the mood, 
//           since we are navigating away immediately. */}
//     </div>
//   );
// };

// export default MoodChecker;
import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

const moods = [
  { emoji: '😢', label: 'Very Sad', moodText: 'Very-Sad', color: '#60a5fa', bg: 'rgba(96,165,250,0.12)', ring: 'rgba(96,165,250,0.4)', glow: '#60a5fa' },
  { emoji: '😊', label: 'Happy', moodText: 'Happy', color: '#34d399', bg: 'rgba(52,211,153,0.12)', ring: 'rgba(52,211,153,0.4)', glow: '#34d399' },
  { emoji: '😠', label: 'Angry', moodText: 'Angry', color: '#f87171', bg: 'rgba(248,113,113,0.12)', ring: 'rgba(248,113,113,0.4)', glow: '#f87171' },
  { emoji: '😐', label: 'Neutral', moodText: 'Neutral', color: '#fbbf24', bg: 'rgba(251,191,36,0.12)', ring: 'rgba(251,191,36,0.4)', glow: '#fbbf24' },
  { emoji: '😞', label: 'Sad', moodText: 'Sad', color: '#a78bfa', bg: 'rgba(167,139,250,0.12)', ring: 'rgba(167,139,250,0.4)', glow: '#a78bfa' },
];

const MoodChecker = ({ onMoodSelect }) => {
  const [hovered, setHovered] = useState(null);
  const [selected, setSelected] = useState(null);
  const cardRef = useRef(null);
  const titleRef = useRef(null);
  const emojiRefs = useRef([]);
  const wavesRef = useRef(null);

  useEffect(() => {
    // Staggered entrance for emoji buttons
    gsap.fromTo(emojiRefs.current,
      { opacity: 0, y: 30, scale: 0.7 },
      {
        opacity: 1, y: 0, scale: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: 'back.out(1.7)',
        delay: 0.3,
      }
    );

    // Animate the ambient waves
    if (wavesRef.current) {
      const waves = wavesRef.current.children;
      Array.from(waves).forEach((wave, i) => {
        gsap.to(wave, {
          scale: 1.15,
          opacity: 0,
          duration: 2.5 + i * 0.5,
          repeat: -1,
          ease: 'power1.out',
          delay: i * 0.8,
        });
      });
    }
  }, []);

  const handleClick = (mood, idx) => {
    setSelected(idx);

    // Pop animation
    gsap.timeline()
      .to(emojiRefs.current[idx], { scale: 1.4, duration: 0.15, ease: 'power2.out' })
      .to(emojiRefs.current[idx], { scale: 1.1, duration: 0.3, ease: 'elastic.out(1.2, 0.5)' });

    // Ripple from card center
    const card = cardRef.current;
    if (card) {
      const ripple = document.createElement('div');
      ripple.style.cssText = `
        position:absolute; border-radius:50%;
        width:20px; height:20px;
        left:50%; top:50%; transform:translate(-50%,-50%);
        background:${mood.color}30;
        pointer-events:none; z-index:0;
      `;
      card.style.position = 'relative';
      card.appendChild(ripple);
      gsap.to(ripple, {
        width: 600, height: 600, opacity: 0, duration: 0.8, ease: 'power2.out',
        onComplete: () => ripple.remove()
      });
    }

    setTimeout(() => onMoodSelect(mood.moodText, mood.emoji), 400);
  };

  const handleHover = (idx) => {
    setHovered(idx);
    gsap.to(emojiRefs.current[idx], { y: -8, scale: 1.12, duration: 0.3, ease: 'power2.out' });
  };

  const handleLeave = (idx) => {
    if (selected !== idx) {
      setHovered(null);
      gsap.to(emojiRefs.current[idx], { y: 0, scale: 1, duration: 0.4, ease: 'elastic.out(1, 0.5)' });
    }
  };

  return (
    <>
      <style>{`
        .mood-card {
          background: #ffffff;
          border-radius: 28px;
          padding: 40px 36px;
          box-shadow:
            0 1px 0 rgba(255,255,255,0.8) inset,
            0 20px 60px rgba(124,58,237,0.08),
            0 4px 20px rgba(0,0,0,0.04);
          border: 1px solid rgba(167,139,250,0.12);
          position: relative;
          overflow: hidden;
          height: 100%;
        }

        .mood-card-deco {
          position: absolute;
          top: -60px; right: -60px;
          width: 200px; height: 200px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(167,139,250,0.15), transparent 70%);
          pointer-events: none;
        }

        .mood-title {
          font-family: 'Clash Display', sans-serif;
          font-size: 1.5rem;
          font-weight: 600;
          color: #1a1a2e;
          margin-bottom: 6px;
          letter-spacing: -0.02em;
        }

        .mood-sub {
          font-size: 0.88rem;
          color: #9ca3af;
          margin-bottom: 36px;
          font-weight: 400;
        }

        .mood-emoji-row {
          display: flex;
          gap: 16px;
          justify-content: center;
          align-items: center;
          flex-wrap: wrap;
        }

        .mood-btn-wrap {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          cursor: pointer;
        }

        .mood-btn {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2.2rem;
          border: 2.5px solid transparent;
          transition: border-color 0.2s, box-shadow 0.2s, background 0.2s;
          position: relative;
          cursor: pointer;
          user-select: none;
        }

        .mood-label {
          font-size: 0.72rem;
          font-weight: 600;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          opacity: 0.7;
          transition: opacity 0.2s, color 0.2s;
        }

        .mood-btn-wrap:hover .mood-label { opacity: 1; }

        .mood-waves {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          pointer-events: none;
        }

        .mood-wave {
          position: absolute;
          border-radius: 50%;
          border: 1.5px solid;
          width: 80px; height: 80px;
        }
      `}</style>

      <div className="mood-card" ref={cardRef}>
        <div className="mood-card-deco" />
        <div ref={titleRef}>
          <h2 className="mood-title">How are you feeling today?</h2>
          <p className="mood-sub">Select your current mood to begin your check-in</p>
        </div>

        <div className="mood-emoji-row">
          {moods.map((mood, idx) => (
            <div
              key={mood.moodText}
              className="mood-btn-wrap"
              onMouseEnter={() => handleHover(idx)}
              onMouseLeave={() => handleLeave(idx)}
              onClick={() => handleClick(mood, idx)}
            >
              <div
                className="mood-btn"
                ref={el => emojiRefs.current[idx] = el}
                style={{
                  background: (hovered === idx || selected === idx) ? mood.bg : 'rgba(249,247,255,0.8)',
                  borderColor: (hovered === idx || selected === idx) ? mood.ring : 'rgba(229,225,255,0.6)',
                  boxShadow: (hovered === idx || selected === idx)
                    ? `0 0 0 6px ${mood.bg}, 0 8px 30px ${mood.color}30`
                    : '0 2px 8px rgba(0,0,0,0.04)',
                }}
              >
                {selected === idx && (
                  <div className="mood-waves" ref={wavesRef}>
                    {[0,1,2].map(i => (
                      <div
                        key={i}
                        className="mood-wave"
                        style={{ borderColor: mood.color }}
                      />
                    ))}
                  </div>
                )}
                {mood.emoji}
              </div>
              <span
                className="mood-label"
                style={{ color: (hovered === idx || selected === idx) ? mood.color : '#9ca3af' }}
              >
                {mood.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default MoodChecker;