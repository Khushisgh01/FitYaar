

// import React, { useState, useEffect, useCallback } from 'react'
// import Sidebar from '../components/ui/Sidebar'
// import BottomNavBar from '../components/ui/bottomNavbar'
// import { Outlet } from 'react-router-dom'
// import { useAuth } from '../context/AuthContext' // 💡 NEW IMPORT

// const API_URL = '/api/journal';

// const Journel = () => {
//   const { getAuthHeader } = useAuth(); // 💡 GET AUTH HEADER FUNCTION
//   const [entries, setEntries] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Function to fetch data from the backend
//   const fetchEntries = useCallback(async () => {
//     setLoading(true);
//     setError(null);
//     try {
//         const response = await fetch(API_URL, {
//             headers: getAuthHeader() // 💡 PASS AUTH HEADER
//         }); 
//         if (!response.ok) {
//             // Handle 401/403 specifically here if needed, but the protect middleware handles it on the server side
//             throw new Error(`HTTP error! status: ${response.status}`);
//         }
//         const data = await response.json();
//         setEntries(data);
//     } catch (e) {
//         console.error("Error fetching journal entries:", e);
//         setError("Failed to load journal entries.");
//     } finally {
//         setLoading(false);
//     }
//   }, [getAuthHeader]); // Dependency on getAuthHeader

//   // Fetch data on component mount
//   useEffect(() => {
//     fetchEntries();
//   }, [fetchEntries]);

//   // We pass fetchEntries as a dependency into the Outlet to trigger refetching after a save.
//   return (
//     <div className='flex min-h-screen'>
//         <Sidebar/>
//         <div className='flex-1 p-8 '>
//             <h1 className="text-3xl font-bold text-gray-800">Mood Journal</h1>
//             <p className='text-gray-500'>Track your emotional journey and discover patterns</p>
//             <BottomNavBar/>
//             {/* Pass the entries and the refetch function to the Outlet context */}
//             <Outlet context={{ entries, loading, error, refetchEntries: fetchEntries }} />
//         </div>
//     </div>
//   )
// }

// export default Journel
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Sidebar from '../components/ui/Sidebar';
import BottomNavBar from '../components/ui/bottomNavbar';
import { Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

gsap.registerPlugin(ScrollTrigger);

const API_URL = '/api/journal';

const Journel = () => {
  const { getAuthHeader } = useAuth();
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /* ── GSAP refs ── */
  const orb1 = useRef(null);
  const orb2 = useRef(null);
  const headerRef = useRef(null);
  const statsRef = useRef(null);
  const navRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    gsap.to(orb1.current, { x: 55, y: -35, duration: 7, repeat: -1, yoyo: true, ease: 'sine.inOut' });
    gsap.to(orb2.current, { x: -45, y: 40, duration: 9, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 1.5 });

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    tl.fromTo(headerRef.current, { opacity: 0, y: -30 }, { opacity: 1, y: 0, duration: 0.75 })
      .fromTo(statsRef.current,  { opacity: 0, y: 20  }, { opacity: 1, y: 0, duration: 0.6  }, '-=0.4')
      .fromTo(navRef.current,    { opacity: 0, y: 20  }, { opacity: 1, y: 0, duration: 0.5  }, '-=0.3')
      .fromTo(contentRef.current,{ opacity: 0, y: 40, scale: 0.97 }, { opacity: 1, y: 0, scale: 1, duration: 0.7 }, '-=0.3');
  }, []);

  const fetchEntries = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(API_URL, { headers: getAuthHeader() });
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const data = await res.json();
      setEntries(data);
    } catch (e) {
      setError('Failed to load journal entries.');
    } finally {
      setLoading(false);
    }
  }, [getAuthHeader]);

  useEffect(() => { fetchEntries(); }, [fetchEntries]);

  /* quick stats derived from entries */
  const totalEntries = entries.length;
  const thisWeek = entries.filter(e => {
    const d = new Date(e.createdAt);
    const now = new Date();
    const diff = (now - d) / (1000 * 60 * 60 * 24);
    return diff <= 7;
  }).length;
  const moodCounts = entries.reduce((acc, e) => {
    acc[e.mood] = (acc[e.mood] || 0) + 1;
    return acc;
  }, {});
  const topMood = Object.entries(moodCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || '—';

  const miniStats = [
    { icon: '📔', label: 'Total Entries', value: totalEntries },
    { icon: '📅', label: 'This Week',    value: thisWeek     },
    { icon: '😊', label: 'Top Mood',     value: topMood      },
  ];

  return (
    <>
      <style>{`

        .journal-root {
          display: flex; min-height: 100vh;
          background: #f8f4ff;
          font-family: 'Plus Jakarta Sans', sans-serif;
          position: relative; overflow-x: hidden;
        }
        .journal-orb {
          position: fixed; border-radius: 50%;
          pointer-events: none; z-index: 0; filter: blur(90px);
        }
        .journal-orb-1 {
          width: 500px; height: 500px;
          background: radial-gradient(circle, rgba(124,58,237,0.15), transparent 70%);
          top: -100px; right: -60px;
        }
        .journal-orb-2 {
          width: 380px; height: 380px;
          background: radial-gradient(circle, rgba(244,114,182,0.12), transparent 70%);
          bottom: 10%; left: -40px;
        }
        .journal-bg-grid {
          position: fixed; inset: 0; z-index: 0; pointer-events: none;
          background-image:
            linear-gradient(rgba(124,58,237,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(124,58,237,0.04) 1px, transparent 1px);
          background-size: 60px 60px;
        }
        .journal-main {
          flex: 1; position: relative; z-index: 1;
          padding: 44px 52px 44px 80px;
        }
        /* ── header ── */
        .journal-chip {
          display: inline-flex; align-items: center; gap: 8px;
          background: white; border: 1px solid rgba(124,58,237,0.2);
          padding: 5px 14px; border-radius: 100px;
          font-size: 0.72rem; font-weight: 600;
          letter-spacing: 0.05em; text-transform: uppercase;
          color: #7c3aed; margin-bottom: 12px;
          box-shadow: 0 2px 12px rgba(124,58,237,0.1);
        }
        .journal-chip-dot {
          width: 7px; height: 7px; border-radius: 50%;
          background: #f472b6;
          box-shadow: 0 0 0 3px rgba(244,114,182,0.25);
          animation: jpulse 2s ease-in-out infinite;
        }
        @keyframes jpulse {
          0%,100%{ box-shadow: 0 0 0 3px rgba(244,114,182,0.25); }
          50%    { box-shadow: 0 0 0 7px rgba(244,114,182,0.08); }
        }
        .journal-title {
          font-family: 'Sora', sans-serif;
          font-size: clamp(1.8rem, 3vw, 2.6rem);
          font-weight: 800; color: #0f0722;
          letter-spacing: -0.03em; line-height: 1.05; margin-bottom: 6px;
        }
        .journal-title .grad {
          background: linear-gradient(135deg, #7c3aed, #f472b6);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .journal-sub { font-size: 0.95rem; color: #6b7280; font-weight: 400; line-height: 1.55; }
        /* ── mini stats ── */
        .journal-stats {
          display: flex; gap: 14px; margin-top: 24px; flex-wrap: wrap;
        }
        .journal-stat-card {
          background: white;
          border-radius: 16px; padding: 14px 20px;
          display: flex; align-items: center; gap: 12px;
          box-shadow: 0 2px 14px rgba(0,0,0,0.05);
          border: 1px solid rgba(124,58,237,0.07);
          min-width: 140px;
        }
        .journal-stat-icon {
          width: 38px; height: 38px; border-radius: 11px;
          background: linear-gradient(135deg, rgba(124,58,237,0.1), rgba(244,114,182,0.08));
          display: flex; align-items: center; justify-content: center;
          font-size: 1rem; flex-shrink: 0;
        }
        .journal-stat-val {
          font-family: 'Sora', sans-serif;
          font-size: 1.35rem; font-weight: 800; color: #7c3aed; line-height: 1;
        }
        .journal-stat-label { font-size: 0.72rem; color: #9ca3af; margin-top: 2px; font-weight: 500; text-transform: uppercase; letter-spacing: 0.05em; }
        /* ── divider ── */
        .journal-divider {
          height: 1px; background: linear-gradient(90deg, rgba(124,58,237,0.15), transparent);
          margin: 28px 0;
        }
        /* ── nav bar wrapper ── */
        .journal-nav-wrap {
          background: white;
          border-radius: 16px;
          padding: 6px;
          box-shadow: 0 2px 14px rgba(124,58,237,0.07);
          border: 1px solid rgba(124,58,237,0.07);
          display: inline-flex; gap: 4px;
        }
        .journal-nav-wrap a {
          padding: 9px 22px; border-radius: 11px;
          font-size: 0.875rem; font-weight: 600;
          text-decoration: none; transition: all 0.2s;
          color: #6b7280;
        }
        .journal-nav-wrap a:hover { background: rgba(124,58,237,0.06); color: #7c3aed; }
        .journal-nav-wrap a.active-nav-link {
          background: linear-gradient(135deg, #7c3aed, #a855f7);
          color: white; box-shadow: 0 4px 14px rgba(124,58,237,0.3);
        }
        /* ── outlet card ── */
        .journal-outlet-card {
          margin-top: 24px;
          background: white;
          border-radius: 24px;
          padding: 32px;
          box-shadow: 0 4px 40px rgba(124,58,237,0.07), 0 1px 0 rgba(255,255,255,0.9) inset;
          border: 1px solid rgba(124,58,237,0.07);
        }
      `}</style>

      <div className="journal-root">
        <div className="journal-orb journal-orb-1" ref={orb1} />
        <div className="journal-orb journal-orb-2" ref={orb2} />
        <div className="journal-bg-grid" />

        <Sidebar />

        <div className="journal-main">

          {/* Header */}
          <div ref={headerRef}>
            <div className="journal-chip">
              <span className="journal-chip-dot" /> Mood Journal
            </div>
            <h1 className="journal-title">
              Your <span className="grad">Journal</span>
            </h1>
            <p className="journal-sub">Track your emotional journey and discover patterns over time.</p>
          </div>

          {/* Mini stats */}
          <div className="journal-stats" ref={statsRef}>
            {miniStats.map((s, i) => (
              <div className="journal-stat-card" key={i}>
                <div className="journal-stat-icon">{s.icon}</div>
                <div>
                  <div className="journal-stat-val">{s.value}</div>
                  <div className="journal-stat-label">{s.label}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="journal-divider" />

          {/* Nav */}
          <div ref={navRef}>
            <BottomNavBar />
          </div>

          {/* Outlet */}
          <div className="journal-outlet-card" ref={contentRef}>
            <Outlet context={{ entries, loading, error, refetchEntries: fetchEntries }} />
          </div>

        </div>
      </div>
    </>
  );
};

export default Journel;