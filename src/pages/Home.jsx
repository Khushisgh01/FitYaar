// // import React from 'react';
// // // 1. Import useNavigate to handle navigation
// // import { useNavigate } from 'react-router-dom';

// // // Your component imports
// // import HeroSection from '../components/ui/heroSection.jsx';
// // import MoodChecker from '../components/ui/moodChecker.jsx';
// // import Sidebar from '../components/ui/Sidebar.jsx';
// // import InsightfulThoughts from '../components/ui/InsightfulThoughts.jsx';

// // const Home = () => {
// //   // 2. Initialize the navigate function
// //   const navigate = useNavigate();

// //   // 3. This function catches the mood from MoodChecker
// //   //    and navigates the user to the new entry page.
// //   const handleMoodSelectAndNavigate = (moodText, emojiChar) => {
// //     navigate('/journel/new-entry', { 
// //       state: {
// //         selectedMood: moodText,
// //         selectedEmoji: emojiChar
// //       } 
// //     });
// //   };

// //   return (
// //     <div className='flex bg-blue-50 min-h-screen'>
// //       <Sidebar /> 
// //       <div className='flex-1 p-8 bg-gray-50'> 
        
// //         {/* Header Section */}
// //         <div className='mb-8 text-center'> 
// //           <HeroSection heading="Good evening!" subheading="Welcome to your mindful space. How can we support you today?"/>
// //         </div>

// //         {/* Main Content Grid */}
// //         <div className='grid grid-cols-3 gap-6'>
          
// //           {/* MoodChecker (Spans 2 columns) */}
// //           <div className='col-span-2'>
// //             {/* 4. Pass the navigation function as a prop */}
// //             <MoodChecker onMoodSelect={handleMoodSelectAndNavigate} />
// //           </div>

// //           {/* Progress/Achievements (Spans 1 column) */}
// //           <div className='col-span-1 bg-white rounded-2xl shadow-md p-4'>
// //             <h3 className='text-xl font-semibold text-orange-500 mb-2'>🔥 Your Progress</h3>
// //             <div className='text-center'>
// //               <p className='text-5xl my-4 font-bold'>5</p>
// //               <p className='text-sm text-gray-500'>day streak</p>
// //               <div className='mt-4 p-3'>
// //                 <h4 className='font-medium text-gray-700 mb-2'>Weekly Goal</h4>
// //                 <div className='h-2 bg-gray-200 rounded-full mt-1'>
// //                   <div className='w-[70%] h-2 bg-purple-500 rounded-full'></div>
// //                 </div>
// //                 <p className='text-xs text-gray-500 mt-1'>5/7 days</p>
// //               </div>
// //             </div>
// //           </div>
          
// //           {/* Insightful Thoughts Section */}
// //           <div className='col-span-3'>
// //               <InsightfulThoughts /> 
// //           </div>

// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // export default Home;
// import React, { useEffect, useRef } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { gsap } from 'gsap';
// import MoodChecker from '../components/ui/moodChecker.jsx';
// import Sidebar from '../components/ui/Sidebar.jsx';
// import InsightfulThoughts from '../components/ui/InsightfulThoughts.jsx';
// import YourProgress from '../components/ui/yourProgress.jsx';

// const Home = () => {
//   const navigate = useNavigate();
//   const headerRef = useRef(null);
//   const greetingRef = useRef(null);
//   const subRef = useRef(null);
//   const moodRef = useRef(null);
//   const progressRef = useRef(null);
//   const insightRef = useRef(null);
//   const particlesRef = useRef(null);

//   const handleMoodSelectAndNavigate = (moodText, emojiChar) => {
//     navigate('/journel/new-entry', {
//       state: { selectedMood: moodText, selectedEmoji: emojiChar }
//     });
//   };

//   useEffect(() => {
//     // Create floating particles
//     const container = particlesRef.current;
//     if (container) {
//       for (let i = 0; i < 18; i++) {
//         const el = document.createElement('div');
//         el.className = 'particle';
//         el.style.cssText = `
//           position:absolute;
//           width:${Math.random()*8+4}px;
//           height:${Math.random()*8+4}px;
//           border-radius:50%;
//           background:${['#f472b6','#a78bfa','#34d399','#60a5fa','#fbbf24'][Math.floor(Math.random()*5)]};
//           opacity:0;
//           left:${Math.random()*100}%;
//           top:${Math.random()*100}%;
//           pointer-events:none;
//         `;
//         container.appendChild(el);

//         gsap.to(el, {
//           opacity: Math.random() * 0.5 + 0.1,
//           y: `${Math.random() * -60 - 20}`,
//           x: `${(Math.random() - 0.5) * 40}`,
//           duration: Math.random() * 5 + 4,
//           repeat: -1,
//           yoyo: true,
//           ease: 'sine.inOut',
//           delay: Math.random() * 4,
//         });
//       }
//     }

//     const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

//     tl.fromTo(greetingRef.current,
//       { opacity: 0, y: 40, skewY: 2 },
//       { opacity: 1, y: 0, skewY: 0, duration: 0.9 }
//     )
//     .fromTo(subRef.current,
//       { opacity: 0, y: 20 },
//       { opacity: 1, y: 0, duration: 0.7 }, '-=0.5'
//     )
//     .fromTo(moodRef.current,
//       { opacity: 0, y: 50, scale: 0.96 },
//       { opacity: 1, y: 0, scale: 1, duration: 0.8 }, '-=0.4'
//     )
//     .fromTo(progressRef.current,
//       { opacity: 0, x: 40 },
//       { opacity: 1, x: 0, duration: 0.8 }, '-=0.6'
//     )
//     .fromTo(insightRef.current,
//       { opacity: 0, y: 60 },
//       { opacity: 1, y: 0, duration: 0.9 }, '-=0.4'
//     );

//     return () => {
//       if (container) container.innerHTML = '';
//     };
//   }, []);

//   return (
//     <>
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Clash+Display:wght@400;500;600;700&family=Satoshi:wght@300;400;500;700&display=swap');

//         .home-root {
//           display: flex;
//           min-height: 100vh;
//           background: #faf7ff;
//           font-family: 'Satoshi', sans-serif;
//         }

//         .home-main {
//           flex: 1;
//           padding: 40px 48px;
//           overflow-y: auto;
//           position: relative;
//         }

//         .particles-bg {
//           position: fixed;
//           inset: 0;
//           pointer-events: none;
//           z-index: 0;
//           overflow: hidden;
//         }

//         .mesh-bg {
//           position: fixed;
//           inset: 0;
//           z-index: 0;
//           pointer-events: none;
//           background:
//             radial-gradient(ellipse 600px 400px at 80% 20%, rgba(167,139,250,0.12) 0%, transparent 70%),
//             radial-gradient(ellipse 400px 300px at 10% 70%, rgba(244,114,182,0.10) 0%, transparent 70%),
//             radial-gradient(ellipse 500px 350px at 50% 90%, rgba(52,211,153,0.08) 0%, transparent 70%);
//         }

//         .home-content {
//           position: relative;
//           z-index: 1;
//           max-width: 1200px;
//           margin: 0 auto;
//         }

//         .header-section {
//           text-align: center;
//           margin-bottom: 48px;
//         }

//         .greeting-chip {
//           display: inline-flex;
//           align-items: center;
//           gap: 8px;
//           background: linear-gradient(135deg, rgba(167,139,250,0.15), rgba(244,114,182,0.12));
//           border: 1px solid rgba(167,139,250,0.3);
//           padding: 6px 18px;
//           border-radius: 100px;
//           font-size: 0.78rem;
//           font-weight: 600;
//           letter-spacing: 0.08em;
//           text-transform: uppercase;
//           color: #7c3aed;
//           margin-bottom: 20px;
//         }

//         .greeting-chip-dot {
//           width: 7px;
//           height: 7px;
//           border-radius: 50%;
//           background: #34d399;
//           animation: blink 2s ease-in-out infinite;
//         }

//         @keyframes blink {
//           0%, 100% { opacity: 1; transform: scale(1); }
//           50% { opacity: 0.4; transform: scale(0.7); }
//         }

//         .greeting-title {
//           font-family: 'Clash Display', sans-serif;
//           font-size: clamp(2.5rem, 5vw, 4rem);
//           font-weight: 700;
//           line-height: 1.05;
//           letter-spacing: -0.03em;
//           background: linear-gradient(135deg, #1a1a2e 30%, #7c3aed 65%, #f472b6 100%);
//           -webkit-background-clip: text;
//           -webkit-text-fill-color: transparent;
//           background-clip: text;
//           margin-bottom: 14px;
//         }

//         .greeting-sub {
//           font-size: 1.05rem;
//           color: #6b7280;
//           font-weight: 300;
//           letter-spacing: 0.01em;
//         }

//         .main-grid {
//           display: grid;
//           grid-template-columns: 1fr 340px;
//           gap: 24px;
//           margin-bottom: 32px;
//         }

//         @media (max-width: 900px) {
//           .main-grid { grid-template-columns: 1fr; }
//           .home-main { padding: 24px 20px; }
//         }
//       `}</style>

//       <div className="home-root">
//         <div className="mesh-bg" />
//         <div className="particles-bg" ref={particlesRef} />
//         <Sidebar />
//         <div className="home-main">
//           <div className="home-content">

//             {/* Header */}
//             <div className="header-section" ref={headerRef}>
//               <div ref={greetingRef}>
//                 <div className="greeting-chip">
//                   <span className="greeting-chip-dot" />
//                   Saturday, June 6
//                 </div>
//                 <h1 className="greeting-title">Good evening! ✨</h1>
//               </div>
//               <p className="greeting-sub" ref={subRef}>
//                 Welcome to your mindful space — how can we support you today?
//               </p>
//             </div>

//             {/* Main 2-col grid */}
//             <div className="main-grid">
//               <div ref={moodRef}>
//                 <MoodChecker onMoodSelect={handleMoodSelectAndNavigate} />
//               </div>
//               <div ref={progressRef}>
//                 <YourProgress />
//               </div>
//             </div>

//             {/* Insights */}
//             <div ref={insightRef}>
//               <InsightfulThoughts />
//             </div>

//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Home;
import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MoodChecker from '../components/ui/moodChecker.jsx';
import Sidebar from '../components/ui/Sidebar.jsx';
import InsightfulThoughts from '../components/ui/InsightfulThoughts.jsx';
import YourProgress from '../components/ui/yourProgress.jsx';
import QuickActions from '../components/ui/QuickActions.jsx';
import StatsStrip from '../components/ui/StatsStrip.jsx';

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const navigate = useNavigate();
  const mainRef = useRef(null);
  const heroRef = useRef(null);
  const chipRef = useRef(null);
  const h1Ref = useRef(null);
  const subRef = useRef(null);
  const statsRef = useRef(null);
  const moodRef = useRef(null);
  const progressRef = useRef(null);
  const actionsRef = useRef(null);
  const insightRef = useRef(null);
  const orb1 = useRef(null);
  const orb2 = useRef(null);
  const orb3 = useRef(null);
  const gridRef = useRef(null);

  const handleMoodSelectAndNavigate = (moodText, emojiChar) => {
    navigate('/journel/new-entry', { state: { selectedMood: moodText, selectedEmoji: emojiChar } });
  };

  useEffect(() => {
    // Floating orbs
    gsap.to(orb1.current, { x: 60, y: -40, duration: 7, repeat: -1, yoyo: true, ease: 'sine.inOut' });
    gsap.to(orb2.current, { x: -50, y: 50, duration: 9, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 1 });
    gsap.to(orb3.current, { x: 30, y: 30, duration: 6, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 2 });

    // Hero entrance timeline
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    tl.fromTo(chipRef.current,
      { opacity: 0, y: -20, scale: 0.85 },
      { opacity: 1, y: 0, scale: 1, duration: 0.6 }
    )
    .fromTo(h1Ref.current,
      { opacity: 0, y: 50, skewY: 3 },
      { opacity: 1, y: 0, skewY: 0, duration: 0.9 }, '-=0.3'
    )
    .fromTo(subRef.current,
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: 0.6 }, '-=0.5'
    )
    .fromTo(statsRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.7 }, '-=0.3'
    )
    .fromTo([moodRef.current, progressRef.current],
      { opacity: 0, y: 60, scale: 0.95 },
      { opacity: 1, y: 0, scale: 1, duration: 0.75, stagger: 0.15 }, '-=0.3'
    )
    .fromTo(actionsRef.current,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.6 }, '-=0.4'
    )
    .fromTo(insightRef.current,
      { opacity: 0, y: 60 },
      { opacity: 1, y: 0, duration: 0.7 }, '-=0.3'
    );

    // Ticker/marquee animation
    const ticker = document.getElementById('ticker-inner');
    if (ticker) {
      gsap.to(ticker, { x: '-50%', duration: 22, ease: 'none', repeat: -1 });
    }

    return () => { ScrollTrigger.getAll().forEach(t => t.kill()); };
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .home-root {
          min-height: 100vh;
          background: #f8f4ff;
          font-family: 'Plus Jakarta Sans', sans-serif;
          position: relative;
          overflow-x: hidden;
        }

        /* ─── Animated background orbs ─── */
        .bg-orb {
          position: fixed; border-radius: 50%;
          pointer-events: none; z-index: 0; filter: blur(80px);
        }
        .bg-orb-1 {
          width: 520px; height: 520px;
          background: radial-gradient(circle, rgba(124,58,237,0.18) 0%, transparent 70%);
          top: -100px; right: -80px;
        }
        .bg-orb-2 {
          width: 400px; height: 400px;
          background: radial-gradient(circle, rgba(236,72,153,0.14) 0%, transparent 70%);
          bottom: 5%; left: -60px;
        }
        .bg-orb-3 {
          width: 350px; height: 350px;
          background: radial-gradient(circle, rgba(6,182,212,0.1) 0%, transparent 70%);
          top: 50%; left: 40%;
        }

        /* grid lines overlay */
        .bg-grid {
          position: fixed; inset: 0; z-index: 0; pointer-events: none;
          background-image:
            linear-gradient(rgba(124,58,237,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(124,58,237,0.04) 1px, transparent 1px);
          background-size: 60px 60px;
        }

        /* ─── Ticker ─── */
        .ticker-wrap {
          position: relative; z-index: 10;
          background: linear-gradient(90deg, #7c3aed, #c026d3);
          overflow: hidden; height: 36px;
          display: flex; align-items: center;
        }
        .ticker-inner {
          display: flex; gap: 0; white-space: nowrap;
          will-change: transform;
        }
        .ticker-item {
          font-size: 0.72rem; font-weight: 600;
          letter-spacing: 0.06em; text-transform: uppercase;
          color: rgba(255,255,255,0.85);
          padding: 0 40px;
          display: flex; align-items: center; gap: 10px;
        }
        .ticker-dot { width: 5px; height: 5px; border-radius: 50%; background: rgba(255,255,255,0.5); }

        /* ─── Main layout ─── */
        .home-main {
          position: relative; z-index: 1;
          padding: 44px 52px 60px 80px;
          max-width: 1440px; margin: 0 auto;
        }
        @media (max-width: 900px) {
          .home-main { padding: 40px 20px 60px 20px; }
        }

        /* ─── Hero ─── */
        .hero-section {
          padding-bottom: 44px;
          border-bottom: 1px solid rgba(124,58,237,0.1);
          margin-bottom: 40px;
          position: relative;
        }

        .hero-date-chip {
          display: inline-flex; align-items: center; gap: 8px;
          background: white;
          border: 1px solid rgba(124,58,237,0.2);
          padding: 6px 16px 6px 10px;
          border-radius: 100px;
          font-size: 0.75rem; font-weight: 600;
          letter-spacing: 0.05em; text-transform: uppercase;
          color: #7c3aed;
          margin-bottom: 22px;
          box-shadow: 0 2px 12px rgba(124,58,237,0.1);
        }
        .chip-live {
          width: 8px; height: 8px; border-radius: 50%;
          background: #34d399;
          box-shadow: 0 0 0 3px rgba(52,211,153,0.25);
          animation: pulse-green 2s ease-in-out infinite;
        }
        @keyframes pulse-green {
          0%,100% { box-shadow: 0 0 0 3px rgba(52,211,153,0.25); }
          50% { box-shadow: 0 0 0 7px rgba(52,211,153,0.08); }
        }

        .hero-title {
          font-family: 'Sora', sans-serif;
          font-size: clamp(2.8rem, 5.5vw, 4.8rem);
          font-weight: 800; line-height: 1.0;
          letter-spacing: -0.04em;
          color: #0f0722;
          margin-bottom: 18px;
        }
        .hero-title .grad {
          background: linear-gradient(135deg, #7c3aed 0%, #ec4899 50%, #f97316 100%);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .hero-sub {
          font-size: 1.1rem; color: #6b7280;
          font-weight: 400; line-height: 1.65;
          max-width: 540px;
        }

        /* ─── Stats strip ─── */
        .stats-strip-wrap { margin-top: 32px; }

        /* ─── Responsive 2-col ─── */
        .main-grid {
          display: grid;
          grid-template-columns: 1fr 340px;
          gap: 26px;
          margin-bottom: 28px;
          align-items: start;
        }
        @media (max-width: 960px) {
          .main-grid { grid-template-columns: 1fr; }
        }

        /* ─── Section heading ─── */
        .section-eyebrow {
          display: flex; align-items: center; gap: 10px;
          margin-bottom: 22px;
        }
        .eyebrow-line {
          flex: 1; height: 1px;
          background: linear-gradient(90deg, rgba(124,58,237,0.2), transparent);
        }
        .eyebrow-text {
          font-size: 0.7rem; font-weight: 700;
          letter-spacing: 0.12em; text-transform: uppercase;
          color: #7c3aed;
        }
      `}</style>

      <div className="home-root">
        <div className="bg-orb bg-orb-1" ref={orb1} />
        <div className="bg-orb bg-orb-2" ref={orb2} />
        <div className="bg-orb bg-orb-3" ref={orb3} />
        <div className="bg-grid" ref={gridRef} />

        <Sidebar />

        {/* Animated ticker */}
        <div className="ticker-wrap">
          <div className="ticker-inner" id="ticker-inner">
            {[...Array(2)].map((_, ri) =>
              ['Breathe deeply 🌿', 'You are enough ✨', 'Take it one step at a time 🚶', 'Your feelings are valid 💙', 'Small wins matter 🏆', 'Be kind to yourself 💜', 'Progress not perfection 🌱', 'You got this 💪'].map((t, i) => (
                <span className="ticker-item" key={`${ri}-${i}`}>
                  <span className="ticker-dot" />{t}
                </span>
              ))
            )}
          </div>
        </div>

        <div className="home-main" ref={mainRef}>

          {/* ── Hero ── */}
          <div className="hero-section" ref={heroRef}>
            <div ref={chipRef}>
              <div className="hero-date-chip">
                <span className="chip-live" /> Saturday, June 6 · Evening
              </div>
            </div>
            <h1 className="hero-title" ref={h1Ref}>
              Good evening,<br /><span className="grad">Khuhsi! ✨</span>
            </h1>
            <p className="hero-sub" ref={subRef}>
              Welcome back to your mindful space. Your journey to inner peace continues — let's make today count.
            </p>
            <div className="stats-strip-wrap" ref={statsRef}>
              <StatsStrip />
            </div>
          </div>

          {/* ── Mood + Progress ── */}
          <div className="main-grid">
            <div ref={moodRef}>
              <MoodChecker onMoodSelect={handleMoodSelectAndNavigate} />
            </div>
            <div ref={progressRef}>
              <YourProgress />
            </div>
          </div>

          {/* ── Quick Actions ── */}
          <div ref={actionsRef}>
            <QuickActions />
          </div>

          {/* ── Insights ── */}
          <div ref={insightRef}>
            <InsightfulThoughts />
          </div>

        </div>
      </div>
    </>
  );
};

export default Home;