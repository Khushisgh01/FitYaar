import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { useTheme } from '../../context/ThemeContext';

const ThemeToggle = ({ compact = false }) => {
  const { isDark, toggleTheme } = useTheme();
  const btnRef = useRef(null);
  const iconRef = useRef(null);

  const handleToggle = () => {
    gsap.timeline()
      .to(btnRef.current, { scale: 0.88, duration: 0.1, ease: 'power2.in' })
      .to(iconRef.current, { rotation: 360, duration: 0.45, ease: 'back.out(1.5)' }, 0)
      .to(btnRef.current, { scale: 1, duration: 0.3, ease: 'back.out(2)' }, 0.1);
    toggleTheme();
  };

  if (compact) {
    // Used inside sidebar bottom area
    return (
      <button
        ref={btnRef}
        onClick={handleToggle}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          padding: '8px 12px',
          borderRadius: 11,
          cursor: 'pointer',
          border: 'none',
          background: 'none',
          fontFamily: 'Instrument Sans, sans-serif',
          fontSize: '0.82rem',
          fontWeight: 500,
          color: 'var(--sidebar-bottom-btn-color)',
          transition: 'all 0.18s',
          width: '100%',
          textAlign: 'left',
        }}
        onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; e.currentTarget.style.color = 'var(--text-primary)'; }}
        onMouseLeave={e => { e.currentTarget.style.background = 'none'; e.currentTarget.style.color = 'var(--sidebar-bottom-btn-color)'; }}
      >
        <span style={{ fontSize: '1rem' }} ref={iconRef}>{isDark ? '☀️' : '🌙'}</span>
        <span>{isDark ? 'Light Mode' : 'Dark Mode'}</span>

        {/* Mini toggle track */}
        <div style={{
          marginLeft: 'auto',
          width: 36, height: 20,
          borderRadius: 100,
          background: isDark
            ? 'linear-gradient(135deg, #7c3aed, #a855f7)'
            : 'var(--toggle-track-off)',
          border: `1.5px solid ${isDark ? 'transparent' : 'rgba(0,0,0,0.1)'}`,
          position: 'relative',
          transition: 'background 0.3s',
          flexShrink: 0,
        }}>
          <div style={{
            position: 'absolute',
            top: 2,
            left: isDark ? 17 : 2,
            width: 14, height: 14,
            borderRadius: '50%',
            background: 'white',
            boxShadow: '0 1px 4px rgba(0,0,0,0.3)',
            transition: 'left 0.3s cubic-bezier(0.34,1.56,0.64,1)',
          }} />
        </div>
      </button>
    );
  }

  // Floating button
  return (
    <button
      ref={btnRef}
      onClick={handleToggle}
      title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      style={{
        position: 'fixed',
        bottom: 28,
        right: 28,
        zIndex: 9999,
        width: 52,
        height: 52,
        borderRadius: '50%',
        border: `1.5px solid ${isDark ? 'rgba(167,139,250,0.3)' : 'rgba(124,58,237,0.2)'}`,
        background: isDark
          ? 'linear-gradient(135deg, rgba(124,58,237,0.3), rgba(192,38,211,0.2))'
          : 'rgba(255,255,255,0.9)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '1.3rem',
        boxShadow: isDark
          ? '0 4px 24px rgba(124,58,237,0.4), 0 0 0 1px rgba(167,139,250,0.1)'
          : '0 4px 24px rgba(0,0,0,0.12), 0 1px 0 rgba(255,255,255,1) inset',
        transition: 'border-color 0.3s, background 0.3s, box-shadow 0.3s',
      }}
      onMouseEnter={e => {
        gsap.to(e.currentTarget, { scale: 1.1, duration: 0.2, ease: 'back.out(2)' });
      }}
      onMouseLeave={e => {
        gsap.to(e.currentTarget, { scale: 1, duration: 0.3, ease: 'elastic.out(1,0.5)' });
      }}
    >
      <span ref={iconRef} style={{ display: 'block', lineHeight: 1 }}>
        {isDark ? '☀️' : '🌙'}
      </span>
    </button>
  );
};

export default ThemeToggle;