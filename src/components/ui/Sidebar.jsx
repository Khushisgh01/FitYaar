// // // import React from 'react';
// // // import SidebarItem from './SidebarItem';
// // // import { useAuth } from '../../context/AuthContext';
// // // import { useNavigate } from 'react-router-dom';

// // // const Sidebar = () => {
// // //   const { user, logout } = useAuth();
// // //   const navigate = useNavigate();

// // //   const handleLogout = () => {
// // //     logout();
// // //     navigate('/login');
// // //   };

// // //   const NavSection = ({ title, items, isEmergency = false, isAdvanced = false }) => (
// // //     <div className="mt-4">
// // //       {title && <h3 className="text-xs font-semibold uppercase text-gray-400 mb-2 px-3">{title}</h3>}
// // //       <div className="space-y-0">
// // //         {items.map(item => (
// // //           <SidebarItem
// // //             key={item.text}
// // //             icon={item.icon}
// // //             text={item.text}
// // //             to={item.to}
// // //             isEmergency={isEmergency}
// // //             isAdvanced={isAdvanced}
// // //           />
// // //         ))}
// // //       </div>
// // //     </div>
// // //   );

// // //   const mainNavItems = [
// // //     { icon: '🏠', text: 'Home', to: '/' },
// // //     { icon: '💬', text: 'AI Chat', to: '/ai-chat' },
// // //     { icon: '📔', text: 'Journal', to: '/journel' },
// // //     { icon: '🧘', text: 'Exercises', to: '/exercises' },
// // //   ];

// // //   const advancedItems = [
// // //     { icon: '🎶', text: 'Soundscapes', to: '/soundscapes' },
// // //     { icon: '🫂', text: 'Community Support', to: '/community-support' },
// // //     { icon: '🩺', text: 'Find Therapist', to: '/find-therapist' },
// // //   ];

// // //   const emergencyItem = [
// // //     { icon: '📞', text: 'Crisis Support', to: '/crises-support' },
// // //   ];

// // //   const profileSettings = [
// // //     { icon: '👤', text: 'Profile & Settings', to: '/profile-settings' },
// // //   ];

// // //   return (
// // //     <div className="w-64 min-h-screen bg-white p-4 flex flex-col shadow-xl">
// // //       <div className="flex items-center mt-4 mb-4">
// // //         <div className="bg-violet-100 p-2 rounded-full mr-3">
// // //           <span className="text-violet-600 text-xl">💜</span>
// // //         </div>
// // //         <div>
// // //           <h2 className="text-lg font-bold text-gray-800">MindfulSpace</h2>
// // //           <p className="text-xs text-gray-500">Your wellness companion</p>
// // //         </div>
// // //       </div>

// // //       <div className="p-3 bg-gray-50 rounded-xl mb-4">
// // //         {user ? (
// // //           <>
// // //             <p className="text-sm font-semibold text-gray-700">Welcome, {user.name}!</p>
// // //             <p className="text-xs text-gray-500 truncate">{user.email}</p>
// // //           </>
// // //         ) : (
// // //           <SidebarItem icon="➡️" text="Login / Sign Up" to="/login" />
// // //         )}
// // //       </div>

// // //       <NavSection title="MAIN" items={mainNavItems} />
// // //       <NavSection title="ADVANCED" items={advancedItems} isAdvanced={true} />
// // //       <NavSection title="EMERGENCY" items={emergencyItem} isEmergency={true} />
// // //       {user && <NavSection items={profileSettings} isAdvanced={true} />}

// // //       <div className="mt-auto pt-4">
// // //         {user && (
// // //           <div
// // //             onClick={handleLogout}
// // //             className="p-3 rounded-xl cursor-pointer text-red-600 hover:bg-red-50 flex items-center mb-2"
// // //           >
// // //             <span className="mr-3 text-lg">🚪</span>
// // //             <span>Logout</span>
// // //           </div>
// // //         )}
// // //         <div className="p-3 rounded-xl cursor-pointer text-gray-700 hover:bg-gray-100 flex items-center">
// // //           <span className="mr-3 text-lg">🌙</span>
// // //           <span>Dark Mode</span>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default Sidebar;
// // import React, { useEffect, useRef } from 'react';
// // import SidebarItem from './SidebarItem';
// // import { useAuth } from '../../context/AuthContext';
// // import { useNavigate } from 'react-router-dom';
// // import { gsap } from 'gsap';

// // const Sidebar = ({ initialActiveItem = 'Home' }) => {
// //   const { user, logout } = useAuth();
// //   const navigate = useNavigate();
// //   const [activeItem, setActiveItem] = React.useState(initialActiveItem);
// //   const sidebarRef = useRef(null);
// //   const logoRef = useRef(null);
// //   const itemsRef = useRef([]);

// //   useEffect(() => {
// //     gsap.fromTo(sidebarRef.current,
// //       { x: -280, opacity: 0 },
// //       { x: 0, opacity: 1, duration: 0.7, ease: 'power3.out' }
// //     );
// //     gsap.fromTo(logoRef.current,
// //       { opacity: 0, y: -10 },
// //       { opacity: 1, y: 0, duration: 0.6, delay: 0.3, ease: 'power2.out' }
// //     );
// //     gsap.fromTo(itemsRef.current.filter(Boolean),
// //       { opacity: 0, x: -20 },
// //       { opacity: 1, x: 0, duration: 0.5, stagger: 0.05, delay: 0.4, ease: 'power2.out' }
// //     );
// //   }, []);

// //   const handleLogout = () => {
// //     logout();
// //     navigate('/login');
// //   };

// //   const mainNavItems = [
// //     { icon: '🏠', text: 'Home', to: '/' },
// //     { icon: '💬', text: 'AI Chat', to: '/ai-chat' },
// //     { icon: '📔', text: 'Journal', to: '/journel' },
// //     { icon: '🧘', text: 'Exercises', to: '/exercises' },
// //   ];

// //   const advancedItems = [
// //     { icon: '🎶', text: 'Soundscapes', to: '/soundscapes' },
// //     { icon: '🫂', text: 'Community Support', to: '/community-support' },
// //     { icon: '🩺', text: 'Find Therapist', to: '/find-therapist' },
// //   ];

// //   const emergencyItem = [
// //     { icon: '📞', text: 'Crisis Support', to: '/crises-support' },
// //   ];

// //   const profileSettings = [
// //     { icon: '👤', text: 'Profile & Settings', to: '/profile-settings' },
// //   ];

// //   const Section = ({ title, items, isEmergency = false, sectionIdx }) => (
// //     <div style={{ marginTop: 20 }}>
// //       {title && (
// //         <p style={{
// //           fontSize: '0.62rem',
// //           fontWeight: 700,
// //           letterSpacing: '0.1em',
// //           textTransform: 'uppercase',
// //           color: 'rgba(148,163,184,0.7)',
// //           padding: '0 12px',
// //           marginBottom: 6,
// //         }}>
// //           {title}
// //         </p>
// //       )}
// //       {items.map((item, i) => (
// //         <div key={item.text} ref={el => itemsRef.current.push(el)}>
// //           <SidebarItem
// //             icon={item.icon}
// //             text={item.text}
// //             to={item.to}
// //             isSelected={activeItem === item.text}
// //             isEmergency={isEmergency}
// //             onClick={() => setActiveItem(item.text)}
// //           />
// //         </div>
// //       ))}
// //     </div>
// //   );

// //   return (
// //     <>
// //       <style>{`
// //         .sidebar-root {
// //           width: 248px;
// //           min-height: 100vh;
// //           background: linear-gradient(180deg, #ffffff 0%, #faf8ff 100%);
// //           display: flex;
// //           flex-direction: column;
// //           padding: 20px 12px;
// //           box-shadow: 4px 0 30px rgba(124,58,237,0.06);
// //           border-right: 1px solid rgba(167,139,250,0.1);
// //           position: relative;
// //           overflow: hidden;
// //           flex-shrink: 0;
// //         }

// //         .sidebar-root::before {
// //           content: '';
// //           position: absolute;
// //           top: 0; left: 0; right: 0;
// //           height: 3px;
// //           background: linear-gradient(90deg, #7c3aed, #a78bfa, #f472b6, #34d399);
// //         }

// //         .sidebar-logo-area {
// //           display: flex;
// //           align-items: center;
// //           gap: 10px;
// //           padding: 12px 8px 16px;
// //           border-bottom: 1px solid rgba(229,225,255,0.6);
// //           margin-bottom: 8px;
// //         }

// //         .sidebar-logo-icon {
// //           width: 40px; height: 40px;
// //           background: linear-gradient(135deg, #7c3aed, #a78bfa);
// //           border-radius: 12px;
// //           display: flex; align-items: center; justify-content: center;
// //           font-size: 1.2rem;
// //           box-shadow: 0 4px 16px rgba(124,58,237,0.35);
// //           flex-shrink: 0;
// //         }

// //         .sidebar-app-name {
// //           font-family: 'Clash Display', sans-serif;
// //           font-size: 1rem;
// //           font-weight: 600;
// //           color: #1a1a2e;
// //           letter-spacing: -0.01em;
// //         }

// //         .sidebar-app-sub {
// //           font-size: 0.68rem;
// //           color: #9ca3af;
// //           font-weight: 400;
// //         }

// //         .sidebar-user-card {
// //           background: linear-gradient(135deg, rgba(124,58,237,0.06), rgba(244,114,182,0.05));
// //           border: 1px solid rgba(167,139,250,0.15);
// //           border-radius: 14px;
// //           padding: 12px 14px;
// //           margin: 8px 0 4px;
// //         }

// //         .sidebar-user-name {
// //           font-size: 0.85rem;
// //           font-weight: 600;
// //           color: #374151;
// //           white-space: nowrap;
// //           overflow: hidden;
// //           text-overflow: ellipsis;
// //         }

// //         .sidebar-user-email {
// //           font-size: 0.72rem;
// //           color: #9ca3af;
// //           white-space: nowrap;
// //           overflow: hidden;
// //           text-overflow: ellipsis;
// //           margin-top: 1px;
// //         }

// //         .sidebar-bottom {
// //           margin-top: auto;
// //           padding-top: 16px;
// //           border-top: 1px solid rgba(229,225,255,0.5);
// //         }

// //         .sidebar-bottom-btn {
// //           display: flex;
// //           align-items: center;
// //           gap: 10px;
// //           padding: 10px 12px;
// //           border-radius: 12px;
// //           cursor: pointer;
// //           font-size: 0.85rem;
// //           font-weight: 500;
// //           transition: background 0.2s;
// //           border: none;
// //           background: none;
// //           width: 100%;
// //           text-align: left;
// //         }

// //         .sidebar-bottom-btn:hover {
// //           background: rgba(239,68,68,0.07);
// //         }
// //       `}</style>

// //       <div className="sidebar-root" ref={sidebarRef}>
// //         <div className="sidebar-logo-area" ref={logoRef}>
// //           <div className="sidebar-logo-icon">💜</div>
// //           <div>
// //             <div className="sidebar-app-name">MindfulSpace</div>
// //             <div className="sidebar-app-sub">Your wellness companion</div>
// //           </div>
// //         </div>

// //         {user && (
// //           <div className="sidebar-user-card">
// //             <div className="sidebar-user-name">Welcome, {user.name}!</div>
// //             <div className="sidebar-user-email">{user.email}</div>
// //           </div>
// //         )}

// //         <Section title="MAIN" items={mainNavItems} />
// //         <Section title="ADVANCED" items={advancedItems} />
// //         <Section title="EMERGENCY" items={emergencyItem} isEmergency />
// //         {user && <Section items={profileSettings} />}

// //         <div className="sidebar-bottom">
// //           {user && (
// //             <button className="sidebar-bottom-btn" onClick={handleLogout} style={{ color: '#ef4444' }}>
// //               <span>🚪</span> Logout
// //             </button>
// //           )}
// //           <button className="sidebar-bottom-btn" style={{ color: '#6b7280' }}>
// //             <span>🌙</span> Dark Mode
// //           </button>
// //         </div>
// //       </div>
// //     </>
// //   );
// // };

// // export default Sidebar;
// import React, { useEffect, useRef, useState } from 'react';
// import { NavLink, useNavigate } from 'react-router-dom';
// import { gsap } from 'gsap';

// const NAV = [
//   { section: 'MAIN', items: [
//     { icon: '🏠', text: 'Home', to: '/' },
//     { icon: '💬', text: 'AI Chat', to: '/ai-chat' },
//     { icon: '📔', text: 'Journal', to: '/journel' },
//     { icon: '🧘', text: 'Exercises', to: '/exercises' },
//   ]},
//   { section: 'ADVANCED', items: [
//     { icon: '🎶', text: 'Soundscapes', to: '/soundscapes' },
//     { icon: '🫂', text: 'Community', to: '/community-support' },
//     { icon: '🩺', text: 'Find Therapist', to: '/find-therapist' },
//   ]},
//   { section: 'EMERGENCY', items: [
//     { icon: '📞', text: 'Crisis Support', to: '/crises-support', emergency: true },
//   ]},
// ];

// const Sidebar = () => {
//   const navigate = useNavigate();
//   const [open, setOpen] = useState(true);
//   const drawerRef = useRef(null);
//   const overlayRef = useRef(null);
//   const itemsRef = useRef([]);
//   const logoRef = useRef(null);
//   const burgerRef = useRef(null);
//   const bar1 = useRef(null);
//   const bar2 = useRef(null);
//   const bar3 = useRef(null);

//   // initial entrance
//   useEffect(() => {
//     gsap.fromTo(drawerRef.current,
//       { x: -280, opacity: 0 },
//       { x: 0, opacity: 1, duration: 0.7, ease: 'power3.out', delay: 0.1 }
//     );
//     gsap.fromTo(logoRef.current,
//       { opacity: 0, y: -16 },
//       { opacity: 1, y: 0, duration: 0.5, delay: 0.5, ease: 'back.out(1.4)' }
//     );
//     gsap.fromTo(itemsRef.current.filter(Boolean),
//       { opacity: 0, x: -24 },
//       { opacity: 1, x: 0, stagger: 0.055, duration: 0.45, delay: 0.55, ease: 'power3.out' }
//     );
//   }, []);

//   const animateBurgerOpen = () => {
//     gsap.to(bar1.current, { rotation: 45, y: 7, duration: 0.3, ease: 'power3.inOut' });
//     gsap.to(bar2.current, { opacity: 0, scaleX: 0, duration: 0.2 });
//     gsap.to(bar3.current, { rotation: -45, y: -7, duration: 0.3, ease: 'power3.inOut' });
//   };
//   const animateBurgerClose = () => {
//     gsap.to(bar1.current, { rotation: 0, y: 0, duration: 0.3, ease: 'power3.inOut' });
//     gsap.to(bar2.current, { opacity: 1, scaleX: 1, duration: 0.2, delay: 0.1 });
//     gsap.to(bar3.current, { rotation: 0, y: 0, duration: 0.3, ease: 'power3.inOut' });
//   };

//   const toggleSidebar = () => {
//     if (open) {
//       gsap.to(drawerRef.current, { x: -280, duration: 0.45, ease: 'power3.inOut' });
//       gsap.to(overlayRef.current, { opacity: 0, duration: 0.3, pointerEvents: 'none' });
//       animateBurgerClose();
//     } else {
//       gsap.to(drawerRef.current, { x: 0, duration: 0.45, ease: 'power3.out' });
//       gsap.to(overlayRef.current, { opacity: 1, duration: 0.3, pointerEvents: 'auto' });
//       animateBurgerOpen();
//     }
//     setOpen(o => !o);
//   };

//   return (
//     <>
//       <style>{`

//         * { box-sizing: border-box; margin: 0; padding: 0; }

//         .sb-overlay {
//           position: fixed; inset: 0; z-index: 40;
//           background: rgba(10,5,30,0.45);
//           backdrop-filter: blur(2px);
//           opacity: 0; pointer-events: none;
//         }

//         .sb-drawer {
//           position: fixed; left: 0; top: 0; bottom: 0;
//           width: 268px; z-index: 50;
//           background: linear-gradient(160deg, #0f0722 0%, #160d35 40%, #0c1a3a 100%);
//           display: flex; flex-direction: column;
//           padding: 0;
//           box-shadow: 6px 0 60px rgba(124,58,237,0.25), 2px 0 0 rgba(167,139,250,0.08);
//           overflow: hidden;
//         }

//         /* animated aurora top strip */
//         .sb-aurora {
//           height: 3px;
//           background: linear-gradient(90deg, #7c3aed, #ec4899, #06b6d4, #34d399, #7c3aed);
//           background-size: 300% 100%;
//           animation: aurora-slide 4s linear infinite;
//         }
//         @keyframes aurora-slide {
//           0% { background-position: 0% 0%; }
//           100% { background-position: 300% 0%; }
//         }

//         .sb-logo-area {
//           padding: 22px 22px 18px;
//           display: flex; align-items: center; gap: 12px;
//           border-bottom: 1px solid rgba(167,139,250,0.1);
//         }

//         .sb-logo-gem {
//           width: 42px; height: 42px;
//           background: linear-gradient(135deg, #7c3aed, #c026d3);
//           border-radius: 13px;
//           display: flex; align-items: center; justify-content: center;
//           font-size: 1.3rem;
//           box-shadow: 0 0 20px rgba(124,58,237,0.6), 0 0 40px rgba(124,58,237,0.2);
//           flex-shrink: 0;
//           animation: gem-pulse 3s ease-in-out infinite;
//         }
//         @keyframes gem-pulse {
//           0%,100% { box-shadow: 0 0 20px rgba(124,58,237,0.6), 0 0 40px rgba(124,58,237,0.2); }
//           50% { box-shadow: 0 0 30px rgba(192,38,211,0.8), 0 0 60px rgba(124,58,237,0.3); }
//         }

//         .sb-app-name {
//           font-family: 'Sora', sans-serif;
//           font-size: 1rem; font-weight: 700;
//           color: #e9d5ff; letter-spacing: -0.01em;
//         }
//         .sb-app-tagline {
//           font-size: 0.68rem; color: rgba(167,139,250,0.5);
//           font-weight: 400; margin-top: 1px;
//         }

//         .sb-user-pill {
//           margin: 14px 16px 6px;
//           background: rgba(167,139,250,0.07);
//           border: 1px solid rgba(167,139,250,0.13);
//           border-radius: 14px;
//           padding: 11px 14px;
//           display: flex; align-items: center; gap: 10px;
//         }
//         .sb-avatar {
//           width: 34px; height: 34px; border-radius: 50%;
//           background: linear-gradient(135deg, #7c3aed, #ec4899);
//           display: flex; align-items: center; justify-content: center;
//           font-size: 0.85rem; font-weight: 700; color: white;
//           flex-shrink: 0;
//         }
//         .sb-user-name { font-size: 0.83rem; font-weight: 600; color: #e2e8f0; }
//         .sb-user-email { font-size: 0.68rem; color: rgba(148,163,184,0.6); margin-top: 1px; }

//         .sb-nav-scroll {
//           flex: 1; overflow-y: auto; padding: 8px 10px 16px;
//         }
//         .sb-nav-scroll::-webkit-scrollbar { width: 3px; }
//         .sb-nav-scroll::-webkit-scrollbar-thumb { background: rgba(167,139,250,0.15); border-radius: 10px; }

//         .sb-section-label {
//           font-size: 0.6rem; font-weight: 700;
//           letter-spacing: 0.12em; text-transform: uppercase;
//           color: rgba(148,163,184,0.35);
//           padding: 14px 10px 5px;
//         }

//         .sb-item {
//           display: flex; align-items: center; gap: 11px;
//           padding: 10px 12px;
//           border-radius: 12px;
//           text-decoration: none;
//           font-family: 'Plus Jakarta Sans', sans-serif;
//           font-size: 0.855rem; font-weight: 500;
//           color: rgba(203,213,225,0.7);
//           transition: color 0.15s, background 0.15s;
//           position: relative; overflow: hidden;
//           margin-bottom: 1px;
//         }
//         .sb-item::before {
//           content: '';
//           position: absolute; inset: 0;
//           background: linear-gradient(90deg, rgba(124,58,237,0.15), transparent);
//           opacity: 0; transition: opacity 0.2s;
//           border-radius: 12px;
//         }
//         .sb-item:hover::before { opacity: 1; }
//         .sb-item:hover { color: #e2e8f0; }

//         .sb-item.active-link {
//           background: linear-gradient(135deg, rgba(124,58,237,0.35), rgba(192,38,211,0.2));
//           color: #e9d5ff;
//           box-shadow: 0 0 0 1px rgba(167,139,250,0.2), inset 0 1px 0 rgba(255,255,255,0.05);
//         }
//         .sb-item.active-link::after {
//           content: '';
//           position: absolute; right: 0; top: 50%; transform: translateY(-50%);
//           width: 3px; height: 60%; border-radius: 10px;
//           background: linear-gradient(180deg, #a78bfa, #ec4899);
//         }

//         .sb-item.emergency-link {
//           background: rgba(239,68,68,0.08);
//           color: #fca5a5;
//         }
//         .sb-item.emergency-link:hover { background: rgba(239,68,68,0.14); }

//         .sb-item-icon {
//           width: 30px; height: 30px; border-radius: 9px;
//           display: flex; align-items: center; justify-content: center;
//           font-size: 0.95rem; flex-shrink: 0;
//           background: rgba(255,255,255,0.04);
//         }
//         .sb-item.active-link .sb-item-icon {
//           background: rgba(167,139,250,0.15);
//         }

//         .sb-bottom {
//           padding: 12px 10px 20px;
//           border-top: 1px solid rgba(167,139,250,0.08);
//           display: flex; flex-direction: column; gap: 2px;
//         }

//         .sb-bottom-btn {
//           display: flex; align-items: center; gap: 11px;
//           padding: 9px 12px; border-radius: 12px;
//           cursor: pointer; border: none; background: none;
//           font-family: 'Plus Jakarta Sans', sans-serif;
//           font-size: 0.84rem; font-weight: 500;
//           color: rgba(148,163,184,0.6);
//           transition: background 0.15s, color 0.15s;
//           width: 100%; text-align: left;
//         }
//         .sb-bottom-btn:hover { background: rgba(255,255,255,0.04); color: #e2e8f0; }
//         .sb-bottom-btn.logout:hover { background: rgba(239,68,68,0.08); color: #fca5a5; }

//         /* ── Hamburger button ── */
//         .burger-btn {
//           position: fixed;
//           top: 18px; left: 18px;
//           z-index: 60;
//           width: 44px; height: 44px;
//           background: linear-gradient(135deg, #7c3aed, #c026d3);
//           border: none; border-radius: 13px;
//           display: flex; flex-direction: column;
//           align-items: center; justify-content: center; gap: 5px;
//           cursor: pointer;
//           box-shadow: 0 4px 20px rgba(124,58,237,0.5);
//           padding: 0;
//         }
//         .burger-btn:hover { transform: scale(1.05); }

//         .burger-bar {
//           width: 20px; height: 2px;
//           background: white; border-radius: 2px;
//           transform-origin: center;
//           display: block;
//         }
//       `}</style>

//       {/* Hamburger always-visible */}
//       <button className="burger-btn" ref={burgerRef} onClick={toggleSidebar} aria-label="Toggle menu">
//         <span className="burger-bar" ref={bar1} />
//         <span className="burger-bar" ref={bar2} />
//         <span className="burger-bar" ref={bar3} />
//       </button>

//       {/* Overlay */}
//       <div className="sb-overlay" ref={overlayRef} onClick={toggleSidebar} />

//       {/* Drawer */}
//       <div className="sb-drawer" ref={drawerRef}>
//         <div className="sb-aurora" />

//         <div className="sb-logo-area" ref={logoRef}>
//           <div className="sb-logo-gem">💜</div>
//           <div>
//             <div className="sb-app-name">MindfulSpace</div>
//             <div className="sb-app-tagline">Your wellness companion</div>
//           </div>
//         </div>

//         <div className="sb-user-pill">
//           <div className="sb-avatar">K</div>
//           <div>
//             <div className="sb-user-name">Welcome, Khuhsi!</div>
//             <div className="sb-user-email">khushi@gmail.com</div>
//           </div>
//         </div>

//         <div className="sb-nav-scroll">
//           {NAV.map((group, gi) => (
//             <div key={gi}>
//               <div className="sb-section-label">{group.section}</div>
//               {group.items.map((item, ii) => (
//                 <NavLink
//                   key={item.to}
//                   to={item.to}
//                   ref={el => itemsRef.current.push(el)}
//                   className={({ isActive }) =>
//                     `sb-item ${isActive ? 'active-link' : ''} ${item.emergency ? 'emergency-link' : ''}`
//                   }
//                   onClick={toggleSidebar}
//                 >
//                   <span className="sb-item-icon">{item.icon}</span>
//                   {item.text}
//                 </NavLink>
//               ))}
//             </div>
//           ))}
//         </div>

//         <div className="sb-bottom">
//           <button className="sb-bottom-btn">
//             <span>👤</span> Profile & Settings
//           </button>
//           <button className="sb-bottom-btn">
//             <span>🌙</span> Dark Mode
//           </button>
//           <button className="sb-bottom-btn logout" onClick={() => navigate('/login')}>
//             <span>🚪</span> Logout
//           </button>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Sidebar;
import React, { useEffect, useRef, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { useAuth } from '../../context/AuthContext';

const NAV = [
  {
    section: 'MAIN',
    items: [
      { icon: '🏠', text: 'Home',      to: '/' },
      { icon: '💬', text: 'AI Chat',   to: '/ai-chat' },
      { icon: '📔', text: 'Journal',   to: '/journel' },
      { icon: '🧘', text: 'Exercises', to: '/exercises' },
    ],
  },
  {
    section: 'ADVANCED',
    items: [
      { icon: '🎶', text: 'Soundscapes',    to: '/soundscapes' },
      { icon: '🫂', text: 'Community',      to: '/community-support' },
      { icon: '🩺', text: 'Find Therapist', to: '/find-therapist' },
    ],
  },
  {
    section: 'EMERGENCY',
    items: [
      { icon: '📞', text: 'Crisis Support', to: '/crises-support', emergency: true },
    ],
  },
];

const Sidebar = () => {
  const navigate   = useNavigate();
  const { user, logout } = useAuth() || {};
  const [open, setOpen]  = useState(true);

  const drawerRef = useRef(null);
  const overlayRef = useRef(null);
  const logoRef    = useRef(null);
  const itemsRef   = useRef([]);
  const burgerRef  = useRef(null);
  const bar1 = useRef(null);
  const bar2 = useRef(null);
  const bar3 = useRef(null);
  const auroraRef = useRef(null);

  useEffect(() => {
    // Entrance
    gsap.fromTo(drawerRef.current,
      { x: -280, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.7, ease: 'power3.out', delay: 0.1 }
    );
    gsap.fromTo(logoRef.current,
      { opacity: 0, y: -16 },
      { opacity: 1, y: 0, duration: 0.5, delay: 0.5, ease: 'back.out(1.4)' }
    );
    gsap.fromTo(itemsRef.current.filter(Boolean),
      { opacity: 0, x: -24 },
      { opacity: 1, x: 0, stagger: 0.05, duration: 0.45, delay: 0.55, ease: 'power3.out' }
    );

    // Aurora shimmer
    gsap.to(auroraRef.current, {
      backgroundPosition: '200% center',
      duration: 4, repeat: -1, ease: 'none',
    });
  }, []);

  const animateBurgerOpen = () => {
    gsap.to(bar1.current, { rotation: 45,  y: 7,  duration: 0.3, ease: 'power3.inOut' });
    gsap.to(bar2.current, { opacity: 0, scaleX: 0, duration: 0.2 });
    gsap.to(bar3.current, { rotation: -45, y: -7, duration: 0.3, ease: 'power3.inOut' });
  };
  const animateBurgerClose = () => {
    gsap.to(bar1.current, { rotation: 0, y: 0, duration: 0.3, ease: 'power3.inOut' });
    gsap.to(bar2.current, { opacity: 1, scaleX: 1, duration: 0.2, delay: 0.1 });
    gsap.to(bar3.current, { rotation: 0, y: 0, duration: 0.3, ease: 'power3.inOut' });
  };

  const toggleSidebar = () => {
    if (open) {
      gsap.to(drawerRef.current, { x: -280, duration: 0.45, ease: 'power3.inOut' });
      gsap.to(overlayRef.current, { opacity: 0, duration: 0.3, pointerEvents: 'none' });
      animateBurgerClose();
    } else {
      gsap.to(drawerRef.current, { x: 0, duration: 0.45, ease: 'power3.out' });
      gsap.to(overlayRef.current, { opacity: 1, duration: 0.3, pointerEvents: 'auto' });
      animateBurgerOpen();
    }
    setOpen(o => !o);
  };

  const handleLogout = () => {
    if (logout) logout();
    navigate('/login');
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:wght@600;700&family=Instrument+Sans:wght@500;600;700&display=swap');

        * { box-sizing: border-box; }

        .sb2-overlay {
          position: fixed; inset: 0; z-index: 40;
          background: rgba(5,3,15,0.6);
          backdrop-filter: blur(4px);
          opacity: 0; pointer-events: none;
          transition: opacity 0.3s;
        }

        .sb2-drawer {
          position: fixed; left: 0; top: 0; bottom: 0;
          width: 264px; z-index: 50;
          background: linear-gradient(170deg, #0d0812 0%, #130920 45%, #0a0d20 100%);
          display: flex; flex-direction: column;
          box-shadow: 6px 0 60px rgba(139,108,244,0.18), 2px 0 0 rgba(139,108,244,0.06);
          overflow: hidden;
        }

        /* Top rainbow aurora */
        .sb2-aurora {
          height: 3px; flex-shrink: 0;
          background: linear-gradient(90deg, #7c3aed, #ec4899, #06b6d4, #22c993, #f59e0b, #7c3aed);
          background-size: 200% 100%;
        }

        /* Subtle grid inside drawer */
        .sb2-grid {
          position: absolute; inset: 0; pointer-events: none; opacity: 0.03;
          background-image:
            linear-gradient(rgba(139,108,244,1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(139,108,244,1) 1px, transparent 1px);
          background-size: 32px 32px;
        }

        /* Logo area */
        .sb2-logo-area {
          padding: 20px 20px 16px;
          display: flex; align-items: center; gap: 12px;
          border-bottom: 1px solid rgba(139,108,244,0.1);
          position: relative; z-index: 1;
        }
        .sb2-logo-gem {
          width: 42px; height: 42px;
          background: linear-gradient(135deg, #7c3aed, #c026d3);
          border-radius: 13px;
          display: flex; align-items: center; justify-content: center;
          font-size: 1.2rem; flex-shrink: 0;
          box-shadow: 0 0 20px rgba(124,58,237,0.5), 0 0 40px rgba(124,58,237,0.15);
          animation: gem-glow 3s ease-in-out infinite;
        }
        @keyframes gem-glow {
          0%,100%{ box-shadow: 0 0 20px rgba(124,58,237,0.5), 0 0 40px rgba(124,58,237,0.15); }
          50%    { box-shadow: 0 0 28px rgba(192,38,211,0.7), 0 0 60px rgba(124,58,237,0.25); }
        }
        .sb2-app-name {
          font-family: 'Fraunces', serif;
          font-size: 1rem; font-weight: 700;
          color: #e9d5ff; letter-spacing: -0.02em;
        }
        .sb2-app-tagline {
          font-family: 'Instrument Sans', sans-serif;
          font-size: 0.65rem; color: rgba(139,108,244,0.45);
          font-weight: 500; margin-top: 1px;
        }

        /* User pill */
        .sb2-user-pill {
          margin: 12px 14px 4px;
          background: rgba(139,108,244,0.07);
          border: 1px solid rgba(139,108,244,0.12);
          border-radius: 14px; padding: 10px 13px;
          display: flex; align-items: center; gap: 10px;
          position: relative; z-index: 1;
        }
        .sb2-avatar {
          width: 32px; height: 32px; border-radius: '50%';
          background: linear-gradient(135deg, #7c3aed, #ec4899);
          display: flex; align-items: center; justify-content: center;
          font-family: 'Fraunces', serif;
          font-size: 0.9rem; font-weight: 700; color: white;
          flex-shrink: 0; border-radius: 50%;
        }
        .sb2-user-name {
          font-family: 'Instrument Sans', sans-serif;
          font-size: 0.82rem; font-weight: 600; color: #e2e8f0;
        }
        .sb2-user-email {
          font-family: 'Instrument Sans', sans-serif;
          font-size: 0.67rem; color: rgba(148,163,184,0.5);
          margin-top: 1px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; max-width: 140px;
        }

        /* Nav scroll */
        .sb2-nav {
          flex: 1; overflow-y: auto; padding: 6px 10px 14px;
          position: relative; z-index: 1;
        }
        .sb2-nav::-webkit-scrollbar { width: 2px; }
        .sb2-nav::-webkit-scrollbar-thumb { background: rgba(139,108,244,0.15); border-radius: 10px; }

        .sb2-section-label {
          font-family: 'Instrument Sans', sans-serif;
          font-size: 0.58rem; font-weight: 700;
          letter-spacing: 0.13em; text-transform: uppercase;
          color: rgba(148,163,184,0.3);
          padding: 12px 10px 4px;
        }

        /* Nav items */
        .sb2-item {
          display: flex; align-items: center; gap: 11px;
          padding: 9px 12px; border-radius: 12px;
          text-decoration: none;
          font-family: 'Instrument Sans', sans-serif;
          font-size: 0.855rem; font-weight: 500;
          color: rgba(203,213,225,0.6);
          transition: all 0.18s;
          position: relative; margin-bottom: 1px;
          overflow: hidden;
        }
        .sb2-item::before {
          content: '';
          position: absolute; inset: 0;
          background: linear-gradient(90deg, rgba(139,108,244,0.12), transparent);
          opacity: 0; transition: opacity 0.2s; border-radius: 12px;
        }
        .sb2-item:hover { color: #e2e8f0; }
        .sb2-item:hover::before { opacity: 1; }

        /* Active state */
        .sb2-item.sb2-active {
          background: linear-gradient(135deg, rgba(124,58,237,0.3), rgba(192,38,211,0.15));
          color: #e9d5ff;
          box-shadow: 0 0 0 1px rgba(139,108,244,0.18), inset 0 1px 0 rgba(255,255,255,0.04);
        }
        .sb2-item.sb2-active::after {
          content: '';
          position: absolute; right: 0; top: 50%; transform: translateY(-50%);
          width: 3px; height: 55%; border-radius: 10px 0 0 10px;
          background: linear-gradient(180deg, #a78bfa, #ec4899);
        }

        /* Emergency */
        .sb2-item.sb2-emergency {
          background: rgba(239,68,68,0.07);
          color: #fca5a5;
        }
        .sb2-item.sb2-emergency:hover { background: rgba(239,68,68,0.12); }
        .sb2-item.sb2-emergency.sb2-active {
          background: linear-gradient(135deg, rgba(239,68,68,0.25), rgba(239,68,68,0.12));
          color: #fca5a5;
          box-shadow: 0 0 0 1px rgba(239,68,68,0.2);
        }
        .sb2-item.sb2-emergency.sb2-active::after {
          background: linear-gradient(180deg, #ef4444, #dc2626);
        }

        .sb2-item-icon {
          width: 30px; height: 30px; border-radius: 9px;
          display: flex; align-items: center; justify-content: center;
          font-size: 0.9rem; flex-shrink: 0;
          background: rgba(255,255,255,0.04);
          transition: background 0.18s;
        }
        .sb2-item.sb2-active .sb2-item-icon {
          background: rgba(139,108,244,0.18);
        }

        /* Bottom */
        .sb2-bottom {
          padding: 10px 10px 18px;
          border-top: 1px solid rgba(139,108,244,0.08);
          position: relative; z-index: 1;
        }
        .sb2-bottom-btn {
          display: flex; align-items: center; gap: 10px;
          padding: 8px 12px; border-radius: 11px;
          cursor: pointer; border: none; background: none;
          font-family: 'Instrument Sans', sans-serif;
          font-size: 0.82rem; font-weight: 500;
          color: rgba(148,163,184,0.5);
          transition: all 0.18s; width: 100%; text-align: left;
        }
        .sb2-bottom-btn:hover { background: rgba(255,255,255,0.04); color: #e2e8f0; }
        .sb2-bottom-btn.sb2-logout:hover { background: rgba(239,68,68,0.08); color: #fca5a5; }

        /* Hamburger */
        .sb2-burger {
          position: fixed; top: 18px; left: 18px; z-index: 60;
          width: 44px; height: 44px;
          background: linear-gradient(135deg, #7c3aed, #c026d3);
          border: none; border-radius: 13px;
          display: flex; flex-direction: column;
          align-items: center; justify-content: center; gap: 5px;
          cursor: pointer;
          box-shadow: 0 4px 20px rgba(124,58,237,0.5);
          transition: transform 0.15s;
        }
        .sb2-burger:hover { transform: scale(1.06); }
        .sb2-bar {
          width: 20px; height: 2px;
          background: white; border-radius: 2px;
          transform-origin: center; display: block;
        }
      `}</style>

      {/* Hamburger */}
      <button className="sb2-burger" ref={burgerRef} onClick={toggleSidebar} aria-label="Toggle menu">
        <span className="sb2-bar" ref={bar1} />
        <span className="sb2-bar" ref={bar2} />
        <span className="sb2-bar" ref={bar3} />
      </button>

      {/* Overlay */}
      <div className="sb2-overlay" ref={overlayRef} onClick={toggleSidebar} />

      {/* Drawer */}
      <div className="sb2-drawer" ref={drawerRef}>
        <div className="sb2-grid" />

        {/* Aurora top strip */}
        <div className="sb2-aurora" ref={auroraRef} />

        {/* Logo */}
        <div className="sb2-logo-area" ref={logoRef}>
          <div className="sb2-logo-gem">💜</div>
          <div>
            <div className="sb2-app-name">MindfulSpace</div>
            <div className="sb2-app-tagline">Your wellness companion</div>
          </div>
        </div>

        {/* User pill */}
        <div className="sb2-user-pill">
          <div className="sb2-avatar">
            {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
          </div>
          <div style={{ overflow: 'hidden' }}>
            <div className="sb2-user-name">Welcome, {user?.name || 'Friend'}!</div>
            <div className="sb2-user-email">{user?.email || ''}</div>
          </div>
        </div>

        {/* Navigation */}
        <div className="sb2-nav">
          {NAV.map((group, gi) => (
            <div key={gi}>
              <div className="sb2-section-label">{group.section}</div>
              {group.items.map((item, ii) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === '/'}
                  ref={el => itemsRef.current.push(el)}
                  className={({ isActive }) =>
                    `sb2-item ${item.emergency ? 'sb2-emergency' : ''} ${isActive ? 'sb2-active' : ''}`
                  }
                  onClick={() => { if (!open) toggleSidebar(); }}
                >
                  <span className="sb2-item-icon">{item.icon}</span>
                  {item.text}
                </NavLink>
              ))}
            </div>
          ))}
        </div>

        {/* Bottom actions */}
        <div className="sb2-bottom">
          <button className="sb2-bottom-btn" onClick={() => navigate('/profile-settings')}>
            <span style={{ fontSize: '1rem' }}>👤</span> Profile & Settings
          </button>
          <button className="sb2-bottom-btn">
            <span style={{ fontSize: '1rem' }}>🌙</span> Dark Mode
          </button>
          <button className="sb2-bottom-btn sb2-logout" onClick={handleLogout}>
            <span style={{ fontSize: '1rem' }}>🚪</span> Logout
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;