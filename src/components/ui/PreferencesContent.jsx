// import React, { useState } from 'react';

// const ToggleSwitch = ({ isChecked, onToggle }) => (
//     <button 
//         onClick={onToggle}
//         className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${isChecked ? 'bg-violet-600' : 'bg-gray-200'}`}
//     >
//         <span 
//             className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${isChecked ? 'translate-x-6' : 'translate-x-1'}`}
//         />
//     </button>
// );

// const PreferencesContent = () => {
//     // State to simulate settings management
//     const [isDarkMode, setIsDarkMode] = useState(false);
//     const [soundEffects, setSoundEffects] = useState(true);
//     const [reminderTime, setReminderTime] = useState('9:00 AM');
//     const [checkInFrequency, setCheckInFrequency] = useState('Daily');

//     // Simple placeholder for Dark Mode button
//     const DarkModeButton = () => (
//         <button className="px-3 py-1 text-sm font-medium rounded-full border border-gray-300 text-gray-700 bg-white">
//             <span className="mr-1">🌙</span> Dark
//         </button>
//     );

//     // Simple placeholder for dropdowns
//     const DropdownPlaceholder = ({ value }) => (
//         <div className="flex items-center text-gray-700">
//             <span>{value}</span>
//             <span className="ml-2 text-gray-400">🔽</span>
//         </div>
//     );

//     return (
//         <div className="space-y-8">
            
//             {/* Appearance Section */}
//             <div className="p-4 bg-gray-50 rounded-xl">
//                 <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
//                     <span className="text-xl mr-2">✨</span> Appearance
//                 </h3>

//                 {/* Dark Mode */}
//                 <div className="flex justify-between items-center py-4 border-b border-gray-200">
//                     <div>
//                         <p className="font-semibold text-gray-700">Dark Mode</p>
//                         <p className="text-sm text-gray-500">Toggle between light and dark themes</p>
//                     </div>
//                     <DarkModeButton />
//                 </div>
//             </div>

//             {/* General Preferences Section */}
//             <div className="p-4 bg-gray-50 rounded-xl">
//                 <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
//                     <span className="text-xl mr-2">⚙️</span> General Preferences
//                 </h3>

//                 {/* Sound Effects */}
//                 <div className="flex justify-between items-center py-4 border-b border-gray-200">
//                     <div>
//                         <p className="font-semibold text-gray-700">Sound Effects</p>
//                         <p className="text-sm text-gray-500">Play sounds for notifications and interactions</p>
//                     </div>
//                     <ToggleSwitch isChecked={soundEffects} onToggle={() => setSoundEffects(!soundEffects)} />
//                 </div>

//                 {/* Daily Reminder Time */}
//                 <div className="flex justify-between items-center py-4 border-b border-gray-200">
//                     <div>
//                         <p className="font-semibold text-gray-700">Daily Reminder Time</p>
//                     </div>
//                     <DropdownPlaceholder value={reminderTime} />
//                 </div>
                
//                 {/* Check-in Frequency */}
//                 <div className="flex justify-between items-center py-4">
//                     <div>
//                         <p className="font-semibold text-gray-700">Check-in Frequency</p>
//                     </div>
//                     <DropdownPlaceholder value={checkInFrequency} />
//                 </div>
//             </div>
            
//             {/* Save Button Placeholder */}
//             <div className='text-center pt-4'>
//                 <button 
//                     className="px-8 py-3 bg-violet-600 text-white font-semibold rounded-lg 
//                                  shadow-md hover:bg-violet-700 transition-colors"
//                 >
//                     Save Changes
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default PreferencesContent;
import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';

/* ── animated toggle ── */
const Toggle = ({ checked, onChange, color = '#a78bfa' }) => {
  const knobRef = useRef(null);

  useEffect(() => {
    gsap.to(knobRef.current, {
      x: checked ? 22 : 2,
      duration: 0.3,
      ease: 'back.out(2)',
    });
  }, [checked]);

  return (
    <div
      onClick={onChange}
      style={{
        width: 50, height: 28, borderRadius: 100,
        background: checked
          ? `linear-gradient(135deg, ${color}, ${color}99)`
          : 'rgba(255,255,255,0.06)',
        border: `1.5px solid ${checked ? color : 'rgba(255,255,255,0.1)'}`,
        cursor: 'pointer', position: 'relative',
        boxShadow: checked ? `0 0 16px ${color}50` : 'none',
        transition: 'background 0.3s, border-color 0.3s, box-shadow 0.3s',
        flexShrink: 0,
      }}
    >
      <div
        ref={knobRef}
        style={{
          position: 'absolute', top: 3,
          width: 20, height: 20, borderRadius: '50%',
          background: checked ? '#fff' : 'rgba(255,255,255,0.3)',
          boxShadow: checked ? '0 2px 8px rgba(0,0,0,0.3)' : 'none',
        }}
      />
    </div>
  );
};

/* ── row component ── */
const SettingRow = ({ icon, title, desc, color, children, idx }) => {
  const rowRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(rowRef.current,
      { opacity: 0, x: -24 },
      { opacity: 1, x: 0, duration: 0.5, delay: 0.1 * idx, ease: 'power3.out' }
    );
  }, []);

  return (
    <div
      ref={rowRef}
      style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '18px 22px',
        background: 'rgba(255,255,255,0.025)',
        border: '1px solid rgba(255,255,255,0.06)',
        borderRadius: 16, gap: 16,
        transition: 'background 0.2s, border-color 0.2s',
      }}
      onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.borderColor = `${color}30`; }}
      onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.025)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'; }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        <div style={{
          width: 42, height: 42, borderRadius: 12, flexShrink: 0,
          background: `${color}18`,
          border: `1px solid ${color}30`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '1.2rem',
        }}>
          {icon}
        </div>
        <div>
          <div style={{ fontWeight: 600, color: '#e2e8f0', fontSize: '0.9rem', marginBottom: 2 }}>{title}</div>
          {desc && <div style={{ fontSize: '0.76rem', color: 'rgba(148,163,184,0.6)' }}>{desc}</div>}
        </div>
      </div>
      {children}
    </div>
  );
};

/* ── section wrapper ── */
const Section = ({ title, icon, color, children, idx }) => {
  const secRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(secRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.6, delay: 0.15 * idx, ease: 'power3.out' }
    );
  }, []);

  return (
    <div ref={secRef}>
      <div style={{
        display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14,
      }}>
        <div style={{
          width: 32, height: 32, borderRadius: 10,
          background: `linear-gradient(135deg, ${color}40, ${color}20)`,
          border: `1px solid ${color}40`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '0.95rem',
        }}>{icon}</div>
        <span style={{
          fontFamily: "'Sora', sans-serif",
          fontSize: '1rem', fontWeight: 700, color: '#e9d5ff', letterSpacing: '-0.01em',
        }}>{title}</span>
        <div style={{ flex: 1, height: 1, background: `linear-gradient(90deg, ${color}30, transparent)` }} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {children}
      </div>
    </div>
  );
};

/* ── dropdown ── */
const Dropdown = ({ value, options, onChange, color }) => (
  <div style={{ position: 'relative' }}>
    <select
      value={value}
      onChange={onChange}
      style={{
        appearance: 'none', background: `${color}15`,
        border: `1.5px solid ${color}30`, borderRadius: 100,
        color: '#e2e8f0', padding: '8px 36px 8px 16px',
        fontSize: '0.82rem', fontWeight: 600, cursor: 'pointer',
        outline: 'none', fontFamily: 'inherit',
        transition: 'border-color 0.2s, box-shadow 0.2s',
      }}
      onFocus={e => { e.target.style.borderColor = color; e.target.style.boxShadow = `0 0 0 3px ${color}20`; }}
      onBlur={e => { e.target.style.borderColor = `${color}30`; e.target.style.boxShadow = 'none'; }}
    >
      {options.map(o => <option key={o} value={o} style={{ background: '#1a0a3d' }}>{o}</option>)}
    </select>
    <span style={{
      position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)',
      pointerEvents: 'none', color, fontSize: '0.7rem',
    }}>▼</span>
  </div>
);

/* ── save button ── */
const SaveButton = ({ onClick }) => {
  const btnRef = useRef(null);
  const [saved, setSaved] = useState(false);

  const handleClick = () => {
    gsap.timeline()
      .to(btnRef.current, { scale: 0.93, duration: 0.1 })
      .to(btnRef.current, { scale: 1.05, duration: 0.25, ease: 'back.out(2)' })
      .to(btnRef.current, { scale: 1, duration: 0.2 });
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
    onClick?.();
  };

  return (
    <button
      ref={btnRef}
      onClick={handleClick}
      style={{
        padding: '14px 40px', borderRadius: 100, border: 'none',
        background: saved
          ? 'linear-gradient(135deg, #34d399, #10b981)'
          : 'linear-gradient(135deg, #7c3aed, #a855f7)',
        color: 'white', fontSize: '0.9rem', fontWeight: 700,
        cursor: 'pointer', fontFamily: 'inherit',
        boxShadow: saved
          ? '0 4px 24px rgba(52,211,153,0.4)'
          : '0 4px 24px rgba(124,58,237,0.4)',
        transition: 'background 0.4s, box-shadow 0.4s',
        display: 'flex', alignItems: 'center', gap: 8,
      }}
    >
      {saved ? '✓ Saved!' : '💾 Save Changes'}
    </button>
  );
};

const PreferencesContent = () => {
  const [darkMode,    setDarkMode]    = useState(false);
  const [soundFX,     setSoundFX]     = useState(true);
  const [haptics,     setHaptics]     = useState(true);
  const [animations,  setAnimations]  = useState(true);
  const [reminderTime, setReminderTime] = useState('9:00 AM');
  const [frequency,   setFrequency]   = useState('Daily');
  const [language,    setLanguage]    = useState('English');

  const wrapRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(wrapRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.4, ease: 'power2.out' }
    );
  }, []);

  return (
    <>
      <style>{`
        .pref-root * { box-sizing: border-box; margin: 0; padding: 0; }
        .pref-root option { background: #1a0a3d; color: #e2e8f0; }
      `}</style>

      <div ref={wrapRef} className="pref-root" style={{ display: 'flex', flexDirection: 'column', gap: 36 }}>

        <Section title="Appearance" icon="✨" color="#a78bfa" idx={0}>
          <SettingRow icon="🌙" title="Dark Mode" desc="Switch between light and dark theme" color="#a78bfa" idx={0}>
            <Toggle checked={darkMode} onChange={() => setDarkMode(v => !v)} color="#a78bfa" />
          </SettingRow>
          <SettingRow icon="🎬" title="Animations" desc="Enable smooth page transitions and effects" color="#a78bfa" idx={1}>
            <Toggle checked={animations} onChange={() => setAnimations(v => !v)} color="#a78bfa" />
          </SettingRow>
        </Section>

        <Section title="General Preferences" icon="⚙️" color="#60a5fa" idx={1}>
          <SettingRow icon="🔊" title="Sound Effects" desc="Play sounds for notifications and interactions" color="#60a5fa" idx={0}>
            <Toggle checked={soundFX} onChange={() => setSoundFX(v => !v)} color="#60a5fa" />
          </SettingRow>
          <SettingRow icon="📳" title="Haptic Feedback" desc="Vibration feedback on mobile devices" color="#60a5fa" idx={1}>
            <Toggle checked={haptics} onChange={() => setHaptics(v => !v)} color="#60a5fa" />
          </SettingRow>
          <SettingRow icon="⏰" title="Daily Reminder Time" desc="When to receive your daily check-in nudge" color="#60a5fa" idx={2}>
            <Dropdown
              value={reminderTime}
              options={['6:00 AM','7:00 AM','8:00 AM','9:00 AM','10:00 AM','12:00 PM','6:00 PM','9:00 PM']}
              onChange={e => setReminderTime(e.target.value)}
              color="#60a5fa"
            />
          </SettingRow>
          <SettingRow icon="📅" title="Check-in Frequency" desc="How often you'd like to be prompted" color="#60a5fa" idx={3}>
            <Dropdown
              value={frequency}
              options={['Daily','Every 2 Days','Weekly','Off']}
              onChange={e => setFrequency(e.target.value)}
              color="#60a5fa"
            />
          </SettingRow>
          <SettingRow icon="🌐" title="Language" desc="App display language" color="#60a5fa" idx={4}>
            <Dropdown
              value={language}
              options={['English','Spanish','French','German','Hindi','Portuguese']}
              onChange={e => setLanguage(e.target.value)}
              color="#60a5fa"
            />
          </SettingRow>
        </Section>

        <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 8 }}>
          <SaveButton />
        </div>

      </div>
    </>
  );
};

export default PreferencesContent;