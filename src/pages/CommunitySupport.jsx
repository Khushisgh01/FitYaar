// import React from 'react';
// import Sidebar from '../components/ui/Sidebar';
// import HeroSection from '../components/ui/heroSection';
// import CommunityNavBar from '../components/ui/CommunityNavBar';
// import CommunityFeedPlaceholder from '../components/ui/CommunityFeedPlaceholder'; 
// import SupportGroupsPlaceholder from '../components/ui/SupportGroupsPlaceholder';
// import WeeklyTopicsPlaceholder from '../components/ui/WeeklyTopicsPlaceholder';
// import GuidelinesContent from '../components/ui/GuidelinesContent';
// import { Outlet } from 'react-router-dom';

// const CommunitySupport = () => {
//     return (
//         <div className='flex min-h-screen bg-gray-50'>
//             <Sidebar /> 
//             <div className='flex-1 p-8 overflow-y-auto'>
                
//                 {/* Header */}
//                 <div className='mb-8 text-center'>
//                     <HeroSection 
//                         heading="Community Support" 
//                         subheading="Connect with others on similar journeys. Share encouragement, coping strategies, and celebrate progress together in our safe, moderated space." 
//                     />
//                 </div>
                
//                 {/* Navigation Tabs */}
//                 <CommunityNavBar />
                
//                 {/* Content based on Route (Outlet) */}
//                 <div className="mt-8 p-6 bg-white rounded-2xl shadow-xl">
//                     <Outlet />
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default CommunitySupport;
import React, { useEffect, useRef } from 'react';
import { Outlet } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Sidebar from '../components/ui/Sidebar';
import CommunityNavBar from '../components/ui/CommunityNavBar';

gsap.registerPlugin(ScrollTrigger);

const CommunitySupport = () => {
  const orb1 = useRef(null);
  const orb2 = useRef(null);
  const orb3 = useRef(null);
  const badgeRef = useRef(null);
  const titleRef = useRef(null);
  const subRef = useRef(null);
  const statsRef = useRef(null);
  const navRef = useRef(null);
  const contentRef = useRef(null);
  const marqueeRef = useRef(null);

  useEffect(() => {
    // Orbs drift
    gsap.to(orb1.current, { x: 50, y: -30, duration: 9,  repeat: -1, yoyo: true, ease: 'sine.inOut' });
    gsap.to(orb2.current, { x: -40, y: 45, duration: 11, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 2 });
    gsap.to(orb3.current, { x: 30, y: -20, duration: 7,  repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 1 });

    // Marquee
    if (marqueeRef.current) {
      gsap.to(marqueeRef.current, { x: '-50%', duration: 28, ease: 'none', repeat: -1 });
    }

    // Entrance
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    tl.fromTo(badgeRef.current,  { opacity: 0, y: -20, scale: 0.85 }, { opacity: 1, y: 0, scale: 1, duration: 0.65 })
      .fromTo(titleRef.current,  { opacity: 0, y: 50, skewY: 2 },    { opacity: 1, y: 0, skewY: 0, duration: 0.85 }, '-=0.35')
      .fromTo(subRef.current,    { opacity: 0, y: 24 },               { opacity: 1, y: 0, duration: 0.6 }, '-=0.5')
      .fromTo(Array.from(statsRef.current?.children || []), { opacity: 0, y: 30, scale: 0.9 }, { opacity: 1, y: 0, scale: 1, stagger: 0.09, duration: 0.55 }, '-=0.35')
      .fromTo(navRef.current,    { opacity: 0, y: 18 },               { opacity: 1, y: 0, duration: 0.5 }, '-=0.2')
      .fromTo(contentRef.current,{ opacity: 0, y: 40, scale: 0.98 }, { opacity: 1, y: 0, scale: 1, duration: 0.7 }, '-=0.3');

    return () => ScrollTrigger.getAll().forEach(t => t.kill());
  }, []);

  const liveStats = [
    { emoji: '👥', value: '12,400+', label: 'Members' },
    { emoji: '💬', value: '340',     label: 'Posts Today' },
    { emoji: '🌿', value: '98%',     label: 'Positive' },
    { emoji: '🛡️', value: '100%',   label: 'Moderated' },
  ];

  const marqueeItems = ['Share Your Story ✦', 'Find Your People ✦', 'Lift Each Other Up ✦', 'You Are Not Alone ✦', 'Growth Happens Together ✦', 'Safe Space, Always ✦'];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,400;1,700&family=DM+Sans:wght@300;400;500;600&display=swap');

        .cs2-root {
          display: flex; min-height: 100vh;
          font-family: 'DM Sans', sans-serif;
          background: #faf6f0;
          position: relative; overflow-x: hidden;
        }

        /* Layered background */
        .cs2-bg {
          position: fixed; inset: 0; z-index: 0; pointer-events: none;
          background:
            radial-gradient(ellipse 700px 500px at 90% 10%,  rgba(234,179,8,0.08)  0%, transparent 60%),
            radial-gradient(ellipse 600px 400px at -5% 85%,  rgba(16,185,129,0.07) 0%, transparent 60%),
            radial-gradient(ellipse 500px 500px at 50% 50%,  rgba(249,115,22,0.04) 0%, transparent 70%),
            #faf6f0;
        }

        /* Dot grid */
        .cs2-dots {
          position: fixed; inset: 0; z-index: 0; pointer-events: none; opacity: 0.4;
          background-image: radial-gradient(circle, rgba(120,80,40,0.15) 1px, transparent 1px);
          background-size: 28px 28px;
        }

        .cs2-orb {
          position: fixed; border-radius: 50%; pointer-events: none; z-index: 0; filter: blur(110px);
        }
        .cs2-orb-1 { width: 500px; height: 500px; background: radial-gradient(circle, rgba(234,179,8,0.12),   transparent 70%); top: -80px; right: 0; }
        .cs2-orb-2 { width: 420px; height: 420px; background: radial-gradient(circle, rgba(16,185,129,0.1),   transparent 70%); bottom: -60px; left: -40px; }
        .cs2-orb-3 { width: 320px; height: 320px; background: radial-gradient(circle, rgba(249,115,22,0.09),  transparent 70%); top: 40%; right: 20%; }

        /* Marquee strip */
        .cs2-marquee-wrap {
          position: relative; z-index: 10; overflow: hidden;
          background: linear-gradient(135deg, #1c1408, #2d1f08);
          height: 40px; display: flex; align-items: center;
        }
        .cs2-marquee-inner {
          display: flex; gap: 0; white-space: nowrap; will-change: transform;
        }
        .cs2-marquee-item {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.72rem; font-weight: 500;
          letter-spacing: 0.08em; text-transform: uppercase;
          color: rgba(253,230,138,0.75); padding: 0 32px;
        }

        .cs2-main {
          flex: 1; position: relative; z-index: 1;
          padding: 0;
          display: flex; flex-direction: column;
        }

        /* Header area */
        .cs2-header-area {
          padding: 48px 56px 0 88px;
        }

        /* Badge */
        .cs2-badge {
          display: inline-flex; align-items: center; gap: 10px;
          background: rgba(120,53,15,0.08);
          border: 1px solid rgba(120,53,15,0.18);
          padding: 6px 16px; border-radius: 100px;
          font-size: 0.7rem; font-weight: 600; letter-spacing: 0.08em;
          text-transform: uppercase; color: #92400e;
          margin-bottom: 22px;
        }
        .cs2-badge-dot {
          width: 7px; height: 7px; border-radius: 50%;
          background: #10b981;
          box-shadow: 0 0 0 3px rgba(16,185,129,0.2);
          animation: cs2-pulse 2s ease-in-out infinite;
        }
        @keyframes cs2-pulse {
          0%,100%{ box-shadow: 0 0 0 3px rgba(16,185,129,0.2); }
          50%    { box-shadow: 0 0 0 8px rgba(16,185,129,0.05); }
        }

        /* Title */
        .cs2-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(2.6rem, 4.5vw, 4.2rem);
          font-weight: 900; line-height: 1.02;
          letter-spacing: -0.03em; color: #1c1408;
          margin-bottom: 16px;
        }
        .cs2-title em {
          font-style: italic; font-weight: 400;
          color: #d97706;
        }

        .cs2-sub {
          font-size: 1rem; color: #78716c;
          font-weight: 400; line-height: 1.7;
          max-width: 520px; margin-bottom: 36px;
        }

        /* Stats */
        .cs2-stats {
          display: flex; gap: 14px; flex-wrap: wrap; margin-bottom: 44px;
        }
        .cs2-stat {
          display: flex; align-items: center; gap: 12px;
          background: white;
          border: 1px solid rgba(120,53,15,0.1);
          border-radius: 18px; padding: 14px 20px;
          box-shadow: 0 2px 16px rgba(120,53,15,0.06), 0 1px 0 rgba(255,255,255,0.9) inset;
        }
        .cs2-stat-icon {
          width: 38px; height: 38px; border-radius: 11px;
          display: flex; align-items: center; justify-content: center;
          font-size: 1rem; flex-shrink: 0;
          background: linear-gradient(135deg, rgba(234,179,8,0.12), rgba(16,185,129,0.08));
        }
        .cs2-stat-val {
          font-family: 'Playfair Display', serif;
          font-size: 1.3rem; font-weight: 700; color: #1c1408; line-height: 1;
        }
        .cs2-stat-label {
          font-size: 0.68rem; color: #a8a29e; font-weight: 500;
          text-transform: uppercase; letter-spacing: 0.06em; margin-top: 2px;
        }

        /* Divider — editorial rule */
        .cs2-rule {
          height: 2px; margin: 0 56px 0 88px; margin-bottom: 32px;
          background: linear-gradient(90deg, #1c1408, rgba(120,53,15,0.15), transparent);
        }

        /* Nav + content */
        .cs2-body {
          padding: 0 56px 56px 88px;
          flex: 1; display: flex; flex-direction: column; gap: 0;
        }

        /* Nav */
        .cs2-nav-wrap {
          display: inline-flex; gap: 2px;
          background: rgba(120,53,15,0.06);
          border: 1px solid rgba(120,53,15,0.12);
          border-radius: 18px; padding: 5px;
          margin-bottom: 28px;
          box-shadow: 0 2px 12px rgba(120,53,15,0.05);
        }
        .cs2-nav-wrap a {
          padding: 9px 22px; border-radius: 13px;
          font-size: 0.855rem; font-weight: 600;
          text-decoration: none; transition: all 0.22s;
          color: #78716c; white-space: nowrap;
          font-family: 'DM Sans', sans-serif;
        }
        .cs2-nav-wrap a:hover { background: rgba(120,53,15,0.07); color: #92400e; }
        .cs2-nav-wrap a.cs2-active {
          background: linear-gradient(135deg, #d97706, #b45309);
          color: white;
          box-shadow: 0 4px 14px rgba(217,119,6,0.35);
        }

        /* Content card */
        .cs2-content {
          background: white;
          border: 1px solid rgba(120,53,15,0.08);
          border-radius: 26px; padding: 36px;
          box-shadow: 0 6px 40px rgba(120,53,15,0.07), 0 1px 0 rgba(255,255,255,1) inset;
          flex: 1;
        }
      `}</style>

      <div className="cs2-root">
        <div className="cs2-bg" />
        <div className="cs2-dots" />
        <div className="cs2-orb cs2-orb-1" ref={orb1} />
        <div className="cs2-orb cs2-orb-2" ref={orb2} />
        <div className="cs2-orb cs2-orb-3" ref={orb3} />

        <Sidebar />

        <div className="cs2-main">
          {/* Marquee */}
          <div className="cs2-marquee-wrap">
            <div className="cs2-marquee-inner" ref={marqueeRef}>
              {[...marqueeItems, ...marqueeItems].map((item, i) => (
                <span className="cs2-marquee-item" key={i}>{item}</span>
              ))}
            </div>
          </div>

          {/* Header */}
          <div className="cs2-header-area">
            <div ref={badgeRef}>
              <div className="cs2-badge">
                <span className="cs2-badge-dot" /> Live Community · {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </div>
            </div>

            <h1 className="cs2-title" ref={titleRef}>
              A Space to<br /><em>Heal Together</em>
            </h1>

            <p className="cs2-sub" ref={subRef}>
              Share encouragement, coping strategies, and celebrate progress in a safe, moderated community of people who truly understand.
            </p>

            <div className="cs2-stats" ref={statsRef}>
              {liveStats.map((s, i) => (
                <div className="cs2-stat" key={i}>
                  <div className="cs2-stat-icon">{s.emoji}</div>
                  <div>
                    <div className="cs2-stat-val">{s.value}</div>
                    <div className="cs2-stat-label">{s.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="cs2-rule" />

          <div className="cs2-body">
            <div ref={navRef}>
              <CommunityNavBar />
            </div>
            <div className="cs2-content" ref={contentRef}>
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CommunitySupport;