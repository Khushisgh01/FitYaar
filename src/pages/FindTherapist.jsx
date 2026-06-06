// import React from 'react';
// import { Outlet } from 'react-router-dom';
// import Sidebar from '../components/ui/Sidebar';
// import HeroSection from '../components/ui/heroSection';
// import TherapistNavbar from '../components/ui/TherapistNavbar'; // NEW IMPORT
// import FindTherapistContent from '../components/ui/FindTherapistContent'; // Default content


// const FindTherapist = () => {
//     return (
//         <div className='flex min-h-screen bg-gray-50'>
//             <Sidebar />
//             <div className='flex-1 p-8 overflow-y-auto'>
                
//                 {/* Header Section */}
//                 <div className='mb-8 text-center'>
//                     <HeroSection 
//                         heading="Find Professional Support" 
//                         subheading="Connect with licensed mental health professionals who can provide personalized care. All therapists are verified and specialize in evidence-based treatments." 
//                     />
//                 </div>
                
//                 {/* Navigation Tabs (Find Therapists, Types of Therapy, Insurance & Costs) */}
//                 <TherapistNavbar />
                
//                 {/* Content based on Route (Outlet). Defaulting to FindTherapistContent if no sub-route is matched. */}
//                 <div className="mt-8">
//                     <Outlet />
//                     {/* Render default content if no specific outlet is matched (e.g., /find-therapist) */}
//                     {/* Note: In App.jsx, we set FindTherapistContent as the index element. */}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default FindTherapist;
import React, { useEffect, useRef } from 'react';
import { Outlet } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Sidebar from '../components/ui/Sidebar';
import TherapistNavbar from '../components/ui/TherapistNavbar';

gsap.registerPlugin(ScrollTrigger);

const FindTherapist = () => {
  const orb1 = useRef(null);
  const orb2 = useRef(null);
  const orb3 = useRef(null);
  const headerRef = useRef(null);
  const badgeRef = useRef(null);
  const titleRef = useRef(null);
  const subRef = useRef(null);
  const statsRef = useRef(null);
  const navRef = useRef(null);
  const contentRef = useRef(null);
  const particlesRef = useRef([]);

  useEffect(() => {
    // Floating orbs
    gsap.to(orb1.current, { x: 60, y: -40, duration: 8, repeat: -1, yoyo: true, ease: 'sine.inOut' });
    gsap.to(orb2.current, { x: -50, y: 55, duration: 10, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 2 });
    gsap.to(orb3.current, { x: 35, y: -25, duration: 7, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 1 });

    // Particle floats
    particlesRef.current.forEach((p, i) => {
      if (!p) return;
      gsap.to(p, {
        y: -20 - i * 5,
        x: (i % 2 === 0 ? 1 : -1) * (8 + i * 3),
        opacity: 0,
        duration: 3 + i * 0.5,
        repeat: -1,
        ease: 'power1.out',
        delay: i * 0.4,
      });
    });

    // Hero entrance
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    tl.fromTo(badgeRef.current, { opacity: 0, y: -24, scale: 0.85 }, { opacity: 1, y: 0, scale: 1, duration: 0.65 })
      .fromTo(titleRef.current, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.8 }, '-=0.3')
      .fromTo(subRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 }, '-=0.5')
      .fromTo(statsRef.current?.children ? Array.from(statsRef.current.children) : [], { opacity: 0, y: 30, scale: 0.9 }, { opacity: 1, y: 0, scale: 1, stagger: 0.1, duration: 0.55 }, '-=0.3')
      .fromTo(navRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5 }, '-=0.2')
      .fromTo(contentRef.current, { opacity: 0, y: 40, scale: 0.98 }, { opacity: 1, y: 0, scale: 1, duration: 0.7 }, '-=0.3');

    return () => ScrollTrigger.getAll().forEach(t => t.kill());
  }, []);

  const quickStats = [
    { icon: '🩺', value: '2,400+', label: 'Verified Therapists' },
    { icon: '⭐', value: '4.9', label: 'Avg Rating' },
    { icon: '🔒', value: '100%', label: 'Confidential' },
    { icon: '⚡', value: '48h', label: 'Avg Match Time' },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,300;0,600;0,700;1,300;1,600&family=Instrument+Sans:wght@400;500;600;700&display=swap');

        .ft-root {
          display: flex;
          min-height: 100vh;
          background: #f0ede8;
          font-family: 'Instrument Sans', sans-serif;
          position: relative;
          overflow-x: hidden;
        }

        .ft-bg {
          position: fixed; inset: 0; z-index: 0; pointer-events: none;
          background:
            radial-gradient(ellipse 800px 600px at 80% -10%, rgba(139,108,244,0.12) 0%, transparent 60%),
            radial-gradient(ellipse 600px 500px at -10% 90%, rgba(236,155,90,0.1) 0%, transparent 60%),
            #f0ede8;
        }

        .ft-noise {
          position: fixed; inset: 0; z-index: 0; pointer-events: none; opacity: 0.025;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
          background-size: 200px 200px;
        }

        .ft-orb {
          position: fixed; border-radius: 50%; pointer-events: none; z-index: 0; filter: blur(100px);
        }
        .ft-orb-1 {
          width: 600px; height: 600px;
          background: radial-gradient(circle, rgba(139,108,244,0.18), transparent 70%);
          top: -150px; right: -80px;
        }
        .ft-orb-2 {
          width: 450px; height: 450px;
          background: radial-gradient(circle, rgba(236,155,90,0.15), transparent 70%);
          bottom: -60px; left: -60px;
        }
        .ft-orb-3 {
          width: 300px; height: 300px;
          background: radial-gradient(circle, rgba(100,200,170,0.12), transparent 70%);
          top: 40%; right: 20%;
        }

        .ft-particle {
          position: fixed; border-radius: 50%; pointer-events: none; z-index: 0;
          opacity: 0.4;
        }

        .ft-main {
          flex: 1; position: relative; z-index: 1;
          padding: 52px 56px 56px 88px;
        }

        /* ── Header ── */
        .ft-badge {
          display: inline-flex; align-items: center; gap: 10px;
          background: rgba(139,108,244,0.1);
          border: 1px solid rgba(139,108,244,0.25);
          backdrop-filter: blur(8px);
          padding: 7px 18px; border-radius: 100px;
          font-size: 0.72rem; font-weight: 600; letter-spacing: 0.08em;
          text-transform: uppercase; color: #6b3fd4;
          margin-bottom: 20px;
        }
        .ft-badge-dot {
          width: 7px; height: 7px; border-radius: 50%;
          background: #22c993;
          box-shadow: 0 0 0 3px rgba(34,201,147,0.25);
          animation: ft-pulse 2s ease-in-out infinite;
        }
        @keyframes ft-pulse {
          0%,100%{ box-shadow: 0 0 0 3px rgba(34,201,147,0.25); }
          50%    { box-shadow: 0 0 0 8px rgba(34,201,147,0.05); }
        }

        .ft-title {
          font-family: 'Fraunces', serif;
          font-size: clamp(2.4rem, 4vw, 3.8rem);
          font-weight: 700; line-height: 1.05;
          letter-spacing: -0.03em; color: #1a1025;
          margin-bottom: 14px;
        }
        .ft-title em {
          font-style: italic; font-weight: 300;
          color: #6b3fd4;
        }

        .ft-sub {
          font-size: 1rem; color: #6b6474;
          font-weight: 400; line-height: 1.65;
          max-width: 520px; margin-bottom: 36px;
        }

        /* ── Stats row ── */
        .ft-stats {
          display: flex; gap: 12px; flex-wrap: wrap; margin-bottom: 40px;
        }
        .ft-stat {
          display: flex; align-items: center; gap: 10px;
          background: rgba(255,255,255,0.7);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255,255,255,0.9);
          border-radius: 16px; padding: 12px 20px;
          box-shadow: 0 2px 16px rgba(0,0,0,0.06);
        }
        .ft-stat-icon {
          width: 36px; height: 36px; border-radius: 10px;
          background: linear-gradient(135deg, rgba(139,108,244,0.15), rgba(100,200,170,0.1));
          display: flex; align-items: center; justify-content: center;
          font-size: 1rem; flex-shrink: 0;
        }
        .ft-stat-val {
          font-family: 'Fraunces', serif;
          font-size: 1.3rem; font-weight: 700; color: #1a1025; line-height: 1;
        }
        .ft-stat-label { font-size: 0.7rem; color: #9b8faa; font-weight: 500; text-transform: uppercase; letter-spacing: 0.05em; margin-top: 1px; }

        /* ── Divider ── */
        .ft-divider {
          height: 1px;
          background: linear-gradient(90deg, rgba(139,108,244,0.2), rgba(139,108,244,0.05), transparent);
          margin-bottom: 32px;
        }

        /* ── Nav wrapper ── */
        .ft-nav-wrap {
          background: rgba(255,255,255,0.65);
          backdrop-filter: blur(16px);
          border: 1px solid rgba(255,255,255,0.8);
          border-radius: 20px;
          padding: 6px;
          display: inline-flex; gap: 4px;
          box-shadow: 0 4px 24px rgba(0,0,0,0.06);
          margin-bottom: 28px;
        }
        .ft-nav-wrap a {
          padding: 10px 24px; border-radius: 14px;
          font-size: 0.875rem; font-weight: 600;
          text-decoration: none; transition: all 0.22s;
          color: #6b6474; white-space: nowrap;
        }
        .ft-nav-wrap a:hover {
          background: rgba(139,108,244,0.08);
          color: #6b3fd4;
        }
        .ft-nav-wrap a.active {
          background: linear-gradient(135deg, #7c3aed, #9d5cf0);
          color: white;
          box-shadow: 0 4px 16px rgba(124,58,237,0.3);
        }

        /* ── Content card ── */
        .ft-content {
          background: rgba(255,255,255,0.75);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255,255,255,0.9);
          border-radius: 28px;
          padding: 36px;
          box-shadow:
            0 8px 48px rgba(0,0,0,0.06),
            0 1px 0 rgba(255,255,255,1) inset;
        }
      `}</style>

      <div className="ft-root">
        <div className="ft-bg" />
        <div className="ft-noise" />
        <div className="ft-orb ft-orb-1" ref={orb1} />
        <div className="ft-orb ft-orb-2" ref={orb2} />
        <div className="ft-orb ft-orb-3" ref={orb3} />

        {/* Floating particles */}
        {[
          { size: 6, color: '#7c3aed', top: '20%', left: '15%' },
          { size: 4, color: '#22c993', top: '60%', left: '75%' },
          { size: 5, color: '#ec8b3a', top: '35%', left: '85%' },
          { size: 3, color: '#7c3aed', top: '75%', left: '25%' },
          { size: 4, color: '#22c993', top: '15%', left: '60%' },
        ].map((p, i) => (
          <div
            key={i}
            className="ft-particle"
            ref={el => particlesRef.current[i] = el}
            style={{ width: p.size, height: p.size, background: p.color, top: p.top, left: p.left }}
          />
        ))}

        <Sidebar />

        <div className="ft-main">
          <div ref={headerRef}>
            <div ref={badgeRef}>
              <div className="ft-badge">
                <span className="ft-badge-dot" /> Professional Support Network
              </div>
            </div>

            <h1 className="ft-title" ref={titleRef}>
              Find Your <em>Perfect</em><br />Therapist Match
            </h1>

            <p className="ft-sub" ref={subRef}>
              Connect with licensed, verified mental health professionals who specialize in evidence-based treatments tailored just for you.
            </p>

            <div className="ft-stats" ref={statsRef}>
              {quickStats.map((s, i) => (
                <div className="ft-stat" key={i}>
                  <div className="ft-stat-icon">{s.icon}</div>
                  <div>
                    <div className="ft-stat-val">{s.value}</div>
                    <div className="ft-stat-label">{s.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="ft-divider" />

          {/* Nav */}
          <div ref={navRef}>
            <TherapistNavbar />
          </div>

          {/* Content */}
          <div className="ft-content" ref={contentRef}>
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default FindTherapist;