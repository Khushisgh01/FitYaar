import React, { createContext, useState, useContext, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('FitYaar-theme');
    return saved ? saved === 'dark' : true; // dark by default
  });

  useEffect(() => {
    localStorage.setItem('FitYaar-theme', isDark ? 'dark' : 'light');
    const root = document.documentElement;

    if (isDark) {
      // ── DARK THEME ──────────────────────────────────────────────
      root.style.setProperty('--bg-primary',       '#0a0614');
      root.style.setProperty('--bg-secondary',     '#130920');
      root.style.setProperty('--bg-tertiary',      '#1a0a3d');
      root.style.setProperty('--bg-card',          'rgba(255,255,255,0.04)');
      root.style.setProperty('--bg-card-hover',    'rgba(255,255,255,0.07)');
      root.style.setProperty('--bg-input',         'rgba(255,255,255,0.06)');
      root.style.setProperty('--bg-overlay',       'rgba(10,6,20,0.85)');

      root.style.setProperty('--surface',          '#0e0e1f');
      root.style.setProperty('--surface2',         '#14142a');

      root.style.setProperty('--text-primary',     '#f0eeff');
      root.style.setProperty('--text-secondary',   '#cbd5e1');
      root.style.setProperty('--text-muted',       'rgba(148,163,184,0.6)');
      root.style.setProperty('--text-xmuted',      'rgba(148,163,184,0.35)');

      root.style.setProperty('--border-primary',   'rgba(167,139,250,0.15)');
      root.style.setProperty('--border-secondary', 'rgba(255,255,255,0.07)');
      root.style.setProperty('--border-card',      'rgba(255,255,255,0.08)');

      root.style.setProperty('--accent-violet',    '#7c3aed');
      root.style.setProperty('--accent-violet-lt', '#a78bfa');
      root.style.setProperty('--accent-pink',      '#f472b6');
      root.style.setProperty('--accent-mint',      '#34d399');
      root.style.setProperty('--accent-blue',      '#60a5fa');
      root.style.setProperty('--accent-orange',    '#f97316');

      root.style.setProperty('--shadow-card',      '0 4px 40px rgba(124,58,237,0.12)');
      root.style.setProperty('--shadow-glow',      '0 0 40px rgba(124,58,237,0.25)');

      root.style.setProperty('--sidebar-bg',       'linear-gradient(170deg,#0d0812 0%,#130920 45%,#0a0d20 100%)');
      root.style.setProperty('--sidebar-text',     'rgba(203,213,225,0.7)');
      root.style.setProperty('--sidebar-active-bg','linear-gradient(135deg,rgba(124,58,237,0.35),rgba(192,38,211,0.2))');
      root.style.setProperty('--sidebar-active-text','#e9d5ff');
      root.style.setProperty('--sidebar-section-label','rgba(148,163,184,0.3)');
      root.style.setProperty('--sidebar-border',  'rgba(139,108,244,0.1)');
      root.style.setProperty('--sidebar-bottom-btn-color','rgba(148,163,184,0.5)');

      root.style.setProperty('--page-bg',          '#0a0614');
      root.style.setProperty('--card-bg',          'rgba(255,255,255,0.04)');
      root.style.setProperty('--card-border',      'rgba(255,255,255,0.08)');
      root.style.setProperty('--card-radius',      '22px');

      root.style.setProperty('--input-bg',         'rgba(255,255,255,0.06)');
      root.style.setProperty('--input-border',     'rgba(167,139,250,0.2)');
      root.style.setProperty('--input-text',       '#f0eeff');
      root.style.setProperty('--input-placeholder','rgba(148,163,184,0.4)');

      root.style.setProperty('--nav-bg',           'rgba(255,255,255,0.04)');
      root.style.setProperty('--nav-border',       'rgba(255,255,255,0.08)');
      root.style.setProperty('--nav-link-color',   'rgba(255,255,255,0.45)');
      root.style.setProperty('--nav-link-hover',   'rgba(255,255,255,0.75)');

      root.style.setProperty('--orb-1-color',      'rgba(124,58,237,0.18)');
      root.style.setProperty('--orb-2-color',      'rgba(244,114,182,0.13)');
      root.style.setProperty('--orb-3-color',      'rgba(96,165,250,0.12)');
      root.style.setProperty('--grid-line',        'rgba(124,58,237,0.05)');

      root.style.setProperty('--stat-card-bg',     'rgba(255,255,255,0.04)');
      root.style.setProperty('--stat-card-border', 'rgba(255,255,255,0.07)');
      root.style.setProperty('--toggle-track-off', 'rgba(255,255,255,0.06)');

      root.style.setProperty('--hero-title-color', '#f0eeff');
      root.style.setProperty('--hero-sub-color',   'rgba(203,213,225,0.6)');

      root.setAttribute('data-theme', 'dark');
      document.body.style.background = '#0a0614';
    } else {
      // ── LIGHT THEME ─────────────────────────────────────────────
      root.style.setProperty('--bg-primary',       '#f8f4ff');
      root.style.setProperty('--bg-secondary',     '#f0eaff');
      root.style.setProperty('--bg-tertiary',      '#ede5ff');
      root.style.setProperty('--bg-card',          'rgba(255,255,255,0.9)');
      root.style.setProperty('--bg-card-hover',    'rgba(255,255,255,1)');
      root.style.setProperty('--bg-input',         'rgba(248,246,255,0.9)');
      root.style.setProperty('--bg-overlay',       'rgba(248,244,255,0.9)');

      root.style.setProperty('--surface',          '#ffffff');
      root.style.setProperty('--surface2',         '#f3f0ff');

      root.style.setProperty('--text-primary',     '#0f0722');
      root.style.setProperty('--text-secondary',   '#374151');
      root.style.setProperty('--text-muted',       '#6b7280');
      root.style.setProperty('--text-xmuted',      '#9ca3af');

      root.style.setProperty('--border-primary',   'rgba(124,58,237,0.15)');
      root.style.setProperty('--border-secondary', 'rgba(0,0,0,0.06)');
      root.style.setProperty('--border-card',      'rgba(124,58,237,0.08)');

      root.style.setProperty('--accent-violet',    '#7c3aed');
      root.style.setProperty('--accent-violet-lt', '#a78bfa');
      root.style.setProperty('--accent-pink',      '#ec4899');
      root.style.setProperty('--accent-mint',      '#10b981');
      root.style.setProperty('--accent-blue',      '#3b82f6');
      root.style.setProperty('--accent-orange',    '#f97316');

      root.style.setProperty('--shadow-card',      '0 4px 24px rgba(0,0,0,0.07), 0 1px 0 rgba(255,255,255,0.9) inset');
      root.style.setProperty('--shadow-glow',      '0 0 30px rgba(124,58,237,0.15)');

      root.style.setProperty('--sidebar-bg',       'linear-gradient(170deg,#ffffff 0%,#f8f4ff 50%,#f0eaff 100%)');
      root.style.setProperty('--sidebar-text',     '#4b5563');
      root.style.setProperty('--sidebar-active-bg','linear-gradient(135deg,rgba(124,58,237,0.12),rgba(168,85,247,0.08))');
      root.style.setProperty('--sidebar-active-text','#7c3aed');
      root.style.setProperty('--sidebar-section-label','#9ca3af');
      root.style.setProperty('--sidebar-border',  'rgba(124,58,237,0.1)');
      root.style.setProperty('--sidebar-bottom-btn-color','#6b7280');

      root.style.setProperty('--page-bg',          '#f8f4ff');
      root.style.setProperty('--card-bg',          '#ffffff');
      root.style.setProperty('--card-border',      'rgba(124,58,237,0.08)');
      root.style.setProperty('--card-radius',      '22px');

      root.style.setProperty('--input-bg',         '#ffffff');
      root.style.setProperty('--input-border',     'rgba(124,58,237,0.2)');
      root.style.setProperty('--input-text',       '#0f0722');
      root.style.setProperty('--input-placeholder','#9ca3af');

      root.style.setProperty('--nav-bg',           'rgba(255,255,255,0.8)');
      root.style.setProperty('--nav-border',       'rgba(124,58,237,0.1)');
      root.style.setProperty('--nav-link-color',   '#6b7280');
      root.style.setProperty('--nav-link-hover',   '#374151');

      root.style.setProperty('--orb-1-color',      'rgba(124,58,237,0.10)');
      root.style.setProperty('--orb-2-color',      'rgba(244,114,182,0.08)');
      root.style.setProperty('--orb-3-color',      'rgba(96,165,250,0.07)');
      root.style.setProperty('--grid-line',        'rgba(124,58,237,0.03)');

      root.style.setProperty('--stat-card-bg',     '#ffffff');
      root.style.setProperty('--stat-card-border', 'rgba(124,58,237,0.08)');
      root.style.setProperty('--toggle-track-off', 'rgba(0,0,0,0.08)');

      root.style.setProperty('--hero-title-color', '#0f0722');
      root.style.setProperty('--hero-sub-color',   '#6b7280');

      root.setAttribute('data-theme', 'light');
      document.body.style.background = '#f8f4ff';
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark(v => !v);

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};