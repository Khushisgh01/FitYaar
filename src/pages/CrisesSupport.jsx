// // import React from 'react'
// // import Sidebar from '../components/ui/Sidebar'
// // import HeroSection from '../components/ui/heroSection'
// // import CrisesNavBar from '../components/ui/crisesNavbar'
// // import { Outlet } from 'react-router-dom'

// // const CrisesSupport = () => {
// //     return (
// //         <div className='flex min-h-screen'>
// //             <Sidebar />
// //             <div className='flex-1 p-8 '>
// //                 <div className='mb-8 text-center'>
// //                     <HeroSection heading="Crisis Support" subheading="If you're having thoughts of suicide or self-harm, please reach out for help immediately. You are not alone, and support is available 24/7." />

// //                 </div>
// //                 <CrisesNavBar />
// //                 <div className="mt-8 p-6 bg-white rounded-lg shadow-md">
// //                     <Outlet />
// //                 </div>
// //             </div>
// //         </div>
// //     )
// // }

// // export default CrisesSupport
// import React, { useEffect, useRef } from 'react';
// import { Outlet } from 'react-router-dom';
// import { gsap } from 'gsap';
// import Sidebar from '../components/ui/Sidebar';
// import CrisesNavBar from '../components/ui/crisesNavbar';

// const CrisesSupport = () => {
//   const orb1 = useRef(null);
//   const orb2 = useRef(null);
//   const pulseRef = useRef(null);
//   const badgeRef = useRef(null);
//   const titleRef = useRef(null);
//   const subRef = useRef(null);
//   const alertRef = useRef(null);
//   const navRef = useRef(null);
//   const contentRef = useRef(null);
//   const linesRef = useRef([]);

//   useEffect(() => {
//     // Orb movement
//     gsap.to(orb1.current, { x: -40, y: 30, duration: 8, repeat: -1, yoyo: true, ease: 'sine.inOut' });
//     gsap.to(orb2.current, { x: 50, y: -35, duration: 10, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 1.5 });

//     // Pulse ring
//     gsap.to(pulseRef.current, { scale: 1.8, opacity: 0, duration: 2.5, repeat: -1, ease: 'power2.out' });

//     // Animated scan lines
//     linesRef.current.forEach((line, i) => {
//       if (!line) return;
//       gsap.fromTo(line, { scaleX: 0, opacity: 0.6 }, {
//         scaleX: 1, opacity: 0, duration: 2 + i * 0.3,
//         repeat: -1, ease: 'power1.inOut', delay: i * 0.7,
//         transformOrigin: 'left center',
//       });
//     });

//     // Entrance
//     const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
//     tl.fromTo(badgeRef.current, { opacity: 0, scale: 0.8, y: -20 }, { opacity: 1, scale: 1, y: 0, duration: 0.7 })
//       .fromTo(titleRef.current, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.85 }, '-=0.4')
//       .fromTo(subRef.current, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.65 }, '-=0.5')
//       .fromTo(alertRef.current, { opacity: 0, y: 20, scale: 0.97 }, { opacity: 1, y: 0, scale: 1, duration: 0.6 }, '-=0.35')
//       .fromTo(navRef.current, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.5 }, '-=0.25')
//       .fromTo(contentRef.current, { opacity: 0, y: 36, scale: 0.98 }, { opacity: 1, y: 0, scale: 1, duration: 0.7 }, '-=0.3');
//   }, []);

//   return (
//     <>
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,300;0,600;0,700;1,300&family=Instrument+Sans:wght@400;500;600;700&display=swap');

//         .cs-root {
//           display: flex;
//           min-height: 100vh;
//           font-family: 'Instrument Sans', sans-serif;
//           position: relative; overflow-x: hidden;
//           background: #0d0812;
//         }

//         /* Noise texture */
//         .cs-noise {
//           position: fixed; inset: 0; z-index: 0; pointer-events: none; opacity: 0.03;
//           background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
//           background-size: 200px 200px;
//         }

//         .cs-orb {
//           position: fixed; border-radius: 50%; pointer-events: none; z-index: 0; filter: blur(120px);
//         }
//         .cs-orb-1 {
//           width: 700px; height: 700px;
//           background: radial-gradient(circle, rgba(239,68,68,0.12), transparent 65%);
//           top: -200px; left: -100px;
//         }
//         .cs-orb-2 {
//           width: 500px; height: 500px;
//           background: radial-gradient(circle, rgba(124,58,237,0.1), transparent 65%);
//           bottom: -100px; right: -80px;
//         }

//         /* Scan lines */
//         .cs-scan-wrap {
//           position: fixed; inset: 0; z-index: 0; pointer-events: none; overflow: hidden;
//         }
//         .cs-scan-line {
//           position: absolute; left: 0; right: 0; height: 1px;
//           background: linear-gradient(90deg, transparent, rgba(239,68,68,0.15), transparent);
//           transform-origin: left center;
//         }

//         /* Grid overlay */
//         .cs-grid {
//           position: fixed; inset: 0; z-index: 0; pointer-events: none;
//           background-image:
//             linear-gradient(rgba(239,68,68,0.04) 1px, transparent 1px),
//             linear-gradient(90deg, rgba(239,68,68,0.04) 1px, transparent 1px);
//           background-size: 60px 60px;
//         }

//         .cs-main {
//           flex: 1; position: relative; z-index: 1;
//           padding: 52px 56px 56px 88px;
//         }

//         /* ── Badge ── */
//         .cs-badge {
//           display: inline-flex; align-items: center; gap: 10px;
//           background: rgba(239,68,68,0.12);
//           border: 1px solid rgba(239,68,68,0.3);
//           padding: 7px 18px; border-radius: 100px;
//           font-size: 0.72rem; font-weight: 700; letter-spacing: 0.1em;
//           text-transform: uppercase; color: #fca5a5;
//           margin-bottom: 22px; position: relative;
//         }
//         .cs-badge-pulse-wrap {
//           position: relative; width: 8px; height: 8px;
//         }
//         .cs-badge-dot {
//           position: absolute; inset: 0; border-radius: 50%; background: #ef4444;
//         }
//         .cs-badge-ring {
//           position: absolute; inset: 0; border-radius: 50%;
//           border: 2px solid #ef4444;
//         }

//         .cs-title {
//           font-family: 'Fraunces', serif;
//           font-size: clamp(2.4rem, 4.5vw, 4rem);
//           font-weight: 700; line-height: 1.05;
//           letter-spacing: -0.03em;
//           margin-bottom: 16px;
//           color: #fff;
//         }
//         .cs-title .cs-red {
//           color: #f87171;
//           font-style: italic; font-weight: 300;
//         }

//         .cs-sub {
//           font-size: 1rem; color: rgba(255,255,255,0.55);
//           font-weight: 400; line-height: 1.7;
//           max-width: 540px; margin-bottom: 32px;
//         }

//         /* ── Alert bar ── */
//         .cs-alert {
//           background: linear-gradient(135deg, rgba(239,68,68,0.15), rgba(239,68,68,0.08));
//           border: 1px solid rgba(239,68,68,0.25);
//           border-left: 4px solid #ef4444;
//           border-radius: 18px; padding: '18px 24px';
//           display: flex; align-items: center; gap: 16;
//           margin-bottom: 32px;
//           backdrop-filter: blur(10px);
//         }

//         /* ── Hotline chips ── */
//         .cs-hotlines {
//           display: flex; gap: 10px; flex-wrap: wrap; margin-bottom: 36px;
//         }
//         .cs-hotline-chip {
//           display: flex; align-items: center; gap: 10px;
//           background: rgba(255,255,255,0.06);
//           border: 1px solid rgba(255,255,255,0.1);
//           border-radius: 14px; padding: 10px 18px;
//           text-decoration: none;
//           transition: all 0.22s; cursor: pointer;
//           backdrop-filter: blur(8px);
//         }
//         .cs-hotline-chip:hover {
//           background: rgba(239,68,68,0.15);
//           border-color: rgba(239,68,68,0.3);
//           transform: translateY(-2px);
//         }
//         .cs-hotline-num {
//           font-family: 'Fraunces', serif;
//           font-size: 1.2rem; font-weight: 700; color: #fca5a5;
//         }
//         .cs-hotline-label { font-size: 0.72rem; color: rgba(255,255,255,0.45); text-transform: uppercase; letter-spacing: 0.06em; }

//         /* ── Divider ── */
//         .cs-divider {
//           height: 1px;
//           background: linear-gradient(90deg, rgba(239,68,68,0.2), rgba(239,68,68,0.05), transparent);
//           margin-bottom: 28px;
//         }

//         /* ── Nav ── */
//         .cs-nav-wrap {
//           display: inline-flex; gap: 4px;
//           background: rgba(255,255,255,0.04);
//           border: 1px solid rgba(255,255,255,0.08);
//           border-radius: 18px; padding: 5px;
//           margin-bottom: 28px;
//           backdrop-filter: blur(8px);
//         }
//         .cs-nav-wrap a {
//           padding: 9px 22px; border-radius: 13px;
//           font-size: 0.875rem; font-weight: 600;
//           text-decoration: none; transition: all 0.2s;
//           color: rgba(255,255,255,0.45); white-space: nowrap;
//           font-family: 'Instrument Sans', sans-serif;
//         }
//         .cs-nav-wrap a:hover { color: rgba(255,255,255,0.75); background: rgba(255,255,255,0.06); }
//         .cs-nav-wrap a.cs-active {
//           background: linear-gradient(135deg, #ef4444, #dc2626) !important;
//           color: white !important;
//           box-shadow: 0 4px 16px rgba(239,68,68,0.35);
//         }

//         /* ── Content card ── */
//         .cs-content {
//           background: rgba(255,255,255,0.04);
//           backdrop-filter: blur(16px);
//           border: 1px solid rgba(255,255,255,0.08);
//           border-radius: 26px;
//           padding: 36px;
//           box-shadow: 0 8px 48px rgba(0,0,0,0.3), 0 1px 0 rgba(255,255,255,0.06) inset;
//         }
//       `}</style>

//       <div className="cs-root">
//         <div className="cs-noise" />
//         <div className="cs-orb cs-orb-1" ref={orb1} />
//         <div className="cs-orb cs-orb-2" ref={orb2} />
//         <div className="cs-grid" />

//         {/* Scan lines */}
//         <div className="cs-scan-wrap">
//           {[20, 40, 60, 75, 88].map((top, i) => (
//             <div key={i} ref={el => linesRef.current[i] = el} className="cs-scan-line" style={{ top: `${top}%` }} />
//           ))}
//         </div>

//         <Sidebar />

//         <div className="cs-main">

//           {/* Badge */}
//           <div ref={badgeRef}>
//             <div className="cs-badge">
//               <div className="cs-badge-pulse-wrap">
//                 <div className="cs-badge-dot" />
//                 <div className="cs-badge-ring" ref={pulseRef} />
//               </div>
//               Crisis Support — 24 / 7 Available
//             </div>
//           </div>

//           {/* Title */}
//           <h1 className="cs-title" ref={titleRef}>
//             You Are <span className="cs-red">Not</span><br />Alone
//           </h1>

//           {/* Sub */}
//           <p className="cs-sub" ref={subRef}>
//             If you're experiencing thoughts of suicide or self-harm, please reach out immediately. Trained counselors are available right now, every hour of every day.
//           </p>

//           {/* Hotline quick-dial chips */}
//           <div className="cs-hotlines" ref={alertRef}>
//             <a href="tel:988" className="cs-hotline-chip">
//               <span style={{ fontSize: '1.2rem' }}>📞</span>
//               <div>
//                 <div className="cs-hotline-num">988</div>
//                 <div className="cs-hotline-label">Suicide & Crisis Lifeline</div>
//               </div>
//             </a>
//             <a href="sms:741741?body=HOME" className="cs-hotline-chip">
//               <span style={{ fontSize: '1.2rem' }}>💬</span>
//               <div>
//                 <div className="cs-hotline-num">741741</div>
//                 <div className="cs-hotline-label">Text HOME — Crisis Text Line</div>
//               </div>
//             </a>
//             <a href="tel:911" className="cs-hotline-chip">
//               <span style={{ fontSize: '1.2rem' }}>🚨</span>
//               <div>
//                 <div className="cs-hotline-num">911</div>
//                 <div className="cs-hotline-label">Emergency Services</div>
//               </div>
//             </a>
//           </div>

//           <div className="cs-divider" />

//           {/* Nav */}
//           <div ref={navRef}>
//             <CrisesNavBar />
//           </div>

//           {/* Content */}
//           <div className="cs-content" ref={contentRef}>
//             <Outlet />
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default CrisesSupport;
import React, { useEffect, useRef } from 'react';
import { Outlet } from 'react-router-dom';
import { gsap } from 'gsap';
import Sidebar from '../components/ui/Sidebar';
import CrisesNavBar from '../components/ui/crisesNavbar';

const CrisesSupport = () => {
  const orb1 = useRef(null);
  const orb2 = useRef(null);
  const pulseRef = useRef(null);
  const badgeRef = useRef(null);
  const titleRef = useRef(null);
  const subRef = useRef(null);
  const alertRef = useRef(null);
  const navRef = useRef(null);
  const contentRef = useRef(null);
  const linesRef = useRef([]);

  useEffect(() => {
    gsap.to(orb1.current, { x: -40, y: 30, duration: 8, repeat: -1, yoyo: true, ease: 'sine.inOut' });
    gsap.to(orb2.current, { x: 50, y: -35, duration: 10, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 1.5 });
    gsap.to(pulseRef.current, { scale: 1.8, opacity: 0, duration: 2.5, repeat: -1, ease: 'power2.out' });

    linesRef.current.forEach((line, i) => {
      if (!line) return;
      gsap.fromTo(line, { scaleX: 0, opacity: 0.6 }, {
        scaleX: 1, opacity: 0, duration: 2 + i * 0.3,
        repeat: -1, ease: 'power1.inOut', delay: i * 0.7,
        transformOrigin: 'left center',
      });
    });

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    tl.fromTo(badgeRef.current, { opacity: 0, scale: 0.8, y: -20 }, { opacity: 1, scale: 1, y: 0, duration: 0.7 })
      .fromTo(titleRef.current, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.85 }, '-=0.4')
      .fromTo(subRef.current, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.65 }, '-=0.5')
      .fromTo(alertRef.current, { opacity: 0, y: 20, scale: 0.97 }, { opacity: 1, y: 0, scale: 1, duration: 0.6 }, '-=0.35')
      .fromTo(navRef.current, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.5 }, '-=0.25')
      .fromTo(contentRef.current, { opacity: 0, y: 36, scale: 0.98 }, { opacity: 1, y: 0, scale: 1, duration: 0.7 }, '-=0.3');
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,300;0,600;0,700;1,300&family=Instrument+Sans:wght@400;500;600;700&display=swap');

        .cs-root {
          display: flex; min-height: 100vh;
          font-family: 'Instrument Sans', sans-serif;
          position: relative; overflow-x: hidden;
          background: var(--bg-primary);
          transition: background 0.35s;
        }

        .cs-noise {
          position: fixed; inset: 0; z-index: 0; pointer-events: none; opacity: 0.025;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
          background-size: 200px 200px;
        }

        .cs-orb {
          position: fixed; border-radius: 50%; pointer-events: none; z-index: 0; filter: blur(120px);
        }
        .cs-orb-1 {
          width: 700px; height: 700px;
          background: radial-gradient(circle, rgba(239,68,68,0.1), transparent 65%);
          top: -200px; left: -100px;
        }
        .cs-orb-2 {
          width: 500px; height: 500px;
          background: radial-gradient(circle, var(--orb-1-color), transparent 65%);
          bottom: -100px; right: -80px;
        }

        .cs-scan-wrap {
          position: fixed; inset: 0; z-index: 0; pointer-events: none; overflow: hidden;
        }
        .cs-scan-line {
          position: absolute; left: 0; right: 0; height: 1px;
          background: linear-gradient(90deg, transparent, rgba(239,68,68,0.1), transparent);
          transform-origin: left center;
        }

        .cs-main {
          flex: 1; position: relative; z-index: 1;
          padding: 52px 56px 56px 88px;
        }

        .cs-badge {
          display: inline-flex; align-items: center; gap: 10px;
          background: rgba(239,68,68,0.1);
          border: 1px solid rgba(239,68,68,0.25);
          padding: 7px 18px; border-radius: 100px;
          font-size: 0.72rem; font-weight: 700; letter-spacing: 0.1em;
          text-transform: uppercase; color: #fca5a5;
          margin-bottom: 22px; position: relative;
        }
        .cs-badge-pulse-wrap { position: relative; width: 8px; height: 8px; }
        .cs-badge-dot { position: absolute; inset: 0; border-radius: 50%; background: #ef4444; }
        .cs-badge-ring { position: absolute; inset: 0; border-radius: 50%; border: 2px solid #ef4444; }

        .cs-title {
          font-family: 'Fraunces', serif;
          font-size: clamp(2.4rem, 4.5vw, 4rem);
          font-weight: 700; line-height: 1.05;
          letter-spacing: -0.03em;
          margin-bottom: 16px;
          color: var(--text-primary);
          transition: color 0.35s;
        }
        .cs-title .cs-red { color: #f87171; font-style: italic; font-weight: 300; }

        .cs-sub {
          font-size: 1rem; color: var(--text-muted);
          font-weight: 400; line-height: 1.7;
          max-width: 540px; margin-bottom: 32px;
          transition: color 0.35s;
        }

        .cs-hotlines {
          display: flex; gap: 10px; flex-wrap: wrap; margin-bottom: 36px;
        }
        .cs-hotline-chip {
          display: flex; align-items: center; gap: 10px;
          background: var(--bg-card);
          border: 1px solid var(--border-card);
          border-radius: 14px; padding: 10px 18px;
          text-decoration: none;
          transition: all 0.22s; cursor: pointer;
          backdrop-filter: blur(8px);
        }
        .cs-hotline-chip:hover {
          background: rgba(239,68,68,0.12);
          border-color: rgba(239,68,68,0.3);
          transform: translateY(-2px);
        }
        .cs-hotline-num {
          font-family: 'Fraunces', serif;
          font-size: 1.2rem; font-weight: 700; color: #fca5a5;
        }
        .cs-hotline-label {
          font-size: 0.72rem; color: var(--text-muted);
          text-transform: uppercase; letter-spacing: 0.06em;
        }

        .cs-divider {
          height: 1px;
          background: linear-gradient(90deg, rgba(239,68,68,0.2), rgba(239,68,68,0.05), transparent);
          margin-bottom: 28px;
        }

        .cs-content {
          background: var(--bg-card);
          backdrop-filter: blur(16px);
          border: 1px solid var(--border-card);
          border-radius: 26px;
          padding: 36px;
          box-shadow: var(--shadow-card);
          transition: background 0.35s, border-color 0.35s;
        }
      `}</style>

      <div className="cs-root">
        <div className="cs-noise" />
        <div className="cs-orb cs-orb-1" ref={orb1} />
        <div className="cs-orb cs-orb-2" ref={orb2} />
        <div className="theme-bg-grid" />

        <div className="cs-scan-wrap">
          {[20, 40, 60, 75, 88].map((top, i) => (
            <div key={i} ref={el => linesRef.current[i] = el} className="cs-scan-line" style={{ top: `${top}%` }} />
          ))}
        </div>

        <Sidebar />

        <div className="cs-main">
          <div ref={badgeRef}>
            <div className="cs-badge">
              <div className="cs-badge-pulse-wrap">
                <div className="cs-badge-dot" />
                <div className="cs-badge-ring" ref={pulseRef} />
              </div>
              Crisis Support — 24 / 7 Available
            </div>
          </div>

          <h1 className="cs-title" ref={titleRef}>
            You Are <span className="cs-red">Not</span><br />Alone
          </h1>

          <p className="cs-sub" ref={subRef}>
            If you're experiencing thoughts of suicide or self-harm, please reach out immediately. Trained counselors are available right now, every hour of every day.
          </p>

          <div className="cs-hotlines" ref={alertRef}>
            <a href="tel:988" className="cs-hotline-chip">
              <span style={{ fontSize: '1.2rem' }}>📞</span>
              <div>
                <div className="cs-hotline-num">988</div>
                <div className="cs-hotline-label">Suicide & Crisis Lifeline</div>
              </div>
            </a>
            <a href="sms:741741?body=HOME" className="cs-hotline-chip">
              <span style={{ fontSize: '1.2rem' }}>💬</span>
              <div>
                <div className="cs-hotline-num">741741</div>
                <div className="cs-hotline-label">Text HOME — Crisis Text Line</div>
              </div>
            </a>
            <a href="tel:911" className="cs-hotline-chip">
              <span style={{ fontSize: '1.2rem' }}>🚨</span>
              <div>
                <div className="cs-hotline-num">911</div>
                <div className="cs-hotline-label">Emergency Services</div>
              </div>
            </a>
          </div>

          <div className="cs-divider" />

          <div ref={navRef}>
            <CrisesNavBar />
          </div>

          <div className="cs-content" ref={contentRef}>
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default CrisesSupport;