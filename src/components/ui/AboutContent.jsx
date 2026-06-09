import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const STATS = [
  { icon: '👥', value: '50K+', label: 'Active Users', color: '#a78bfa' },
  { icon: '💬', value: '1M+',  label: 'Chat Sessions', color: '#f472b6' },
  { icon: '📔', value: '500K+', label: 'Journal Entries', color: '#60a5fa' },
  { icon: '🧘', value: '2M+',  label: 'Exercises Done', color: '#34d399' },
];

const TEAM = [
  { name: 'Dr. Sarah Chen',    role: 'Chief Wellness Officer',   emoji: '🧠', color: '#a78bfa' },
  { name: 'Marcus Rivera',     role: 'Lead AI Engineer',         emoji: '🤖', color: '#60a5fa' },
  { name: 'Priya Patel',       role: 'UX & Accessibility Lead',  emoji: '✨', color: '#f472b6' },
  { name: 'James Oduya',       role: 'Community & Safety Lead',  emoji: '🛡️', color: '#34d399' },
];

const RESOURCES = [
  { name: '988 Suicide & Crisis Lifeline', number: '988',              color: '#f87171' },
  { name: 'Crisis Text Line',              number: 'Text HOME to 741741', color: '#fbbf24' },
  { name: 'NAMI Helpline',                 number: '1-800-950-6264',   color: '#a78bfa' },
  { name: 'SAMHSA Helpline',               number: '1-800-662-4357',   color: '#60a5fa' },
];

const AboutContent = () => {
  const wrapRef    = useRef(null);
  const logoRef    = useRef(null);
  const statsRef   = useRef([]);
  const teamRef    = useRef([]);
  const ringsRef   = useRef([]);

  useEffect(() => {
    gsap.fromTo(wrapRef.current, { opacity: 0 }, { opacity: 1, duration: 0.4 });

    /* logo entrance */
    gsap.fromTo(logoRef.current,
      { scale: 0, rotation: -120, opacity: 0 },
      { scale: 1, rotation: 0, opacity: 1, duration: 1, ease: 'back.out(1.5)', delay: 0.1 }
    );

    /* rings spin */
    ringsRef.current.forEach((r, i) => {
      if (r) gsap.to(r, { rotation: i % 2 === 0 ? 360 : -360, duration: 10 + i * 4, repeat: -1, ease: 'none', transformOrigin: 'center' });
    });

    /* logo float */
    gsap.to(logoRef.current, { y: -10, duration: 3, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 0.5 });

    /* stat cards */
    gsap.fromTo(statsRef.current.filter(Boolean),
      { opacity: 0, y: 40, scale: 0.9 },
      { opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.1, ease: 'back.out(1.4)', delay: 0.3 }
    );

    /* team cards */
    gsap.fromTo(teamRef.current.filter(Boolean),
      { opacity: 0, x: -20 },
      { opacity: 1, x: 0, duration: 0.45, stagger: 0.08, ease: 'power3.out', delay: 0.5 }
    );

    /* number count-up */
    statsRef.current.forEach((el, i) => {
      if (!el) return;
      const numEl = el.querySelector('.stat-num');
      if (!numEl) return;
      const target = STATS[i].value;
      const numPart = parseFloat(target.replace(/[^0-9.]/g, ''));
      const suffix = target.replace(/[0-9.]/g, '');
      gsap.fromTo({ val: 0 },
        { val: 0 },
        {
          val: numPart, duration: 1.8, ease: 'power2.out', delay: 0.5,
          onUpdate() {
            numEl.textContent = Math.round(this.targets()[0].val) + suffix;
          },
        }
      );
    });
  }, []);

  return (
    <>
      <style>{`
        .about-root { color: #e2e8f0; }
        .about-grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
        @media (max-width: 600px) { .about-grid-2 { grid-template-columns: 1fr; } }
        .about-stat-card:hover { transform: translateY(-4px) !important; }
      `}</style>

      <div ref={wrapRef} className="about-root" style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>

        {/* ── Hero logo ── */}
        <div style={{ textAlign: 'center', padding: '20px 0' }}>
          <div style={{ position: 'relative', display: 'inline-block', marginBottom: 20 }}>
            {/* rings */}
            {[100, 140, 180].map((size, i) => (
              <div key={i} ref={el => ringsRef.current[i] = el} style={{
                position: 'absolute',
                top: '50%', left: '50%',
                width: size, height: size,
                marginTop: -size/2, marginLeft: -size/2,
                borderRadius: '50%',
                border: `1px solid rgba(167,139,250,${0.2 - i * 0.05})`,
                pointerEvents: 'none',
              }} />
            ))}
            <div ref={logoRef} style={{
              width: 80, height: 80, borderRadius: '50%',
              background: 'linear-gradient(135deg, #7c3aed, #ec4899)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '2rem',
              boxShadow: '0 0 40px rgba(124,58,237,0.6), 0 0 80px rgba(244,114,182,0.3)',
              position: 'relative', zIndex: 1,
            }}>
              💜
            </div>
          </div>
          <h2 style={{
            fontFamily: "'Sora', sans-serif",
            fontSize: '1.8rem', fontWeight: 800, color: '#f0eeff',
            letterSpacing: '-0.03em', marginBottom: 8,
          }}>
            FitYaar <span style={{
              background: 'linear-gradient(135deg, #a78bfa, #f472b6)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>v1.0</span>
          </h2>
          <p style={{ color: 'rgba(148,163,184,0.7)', fontSize: '0.9rem', lineHeight: 1.6 }}>
            Your compassionate AI companion for mental wellness
          </p>
        </div>

        {/* ── Stats ── */}
        <div>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16,
          }}>
            <span style={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, color: '#e9d5ff', fontSize: '1rem' }}>
              By the Numbers
            </span>
            <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg, rgba(167,139,250,0.3), transparent)' }} />
          </div>
          <div className="about-grid-2">
            {STATS.map((s, i) => (
              <div
                key={i}
                ref={el => statsRef.current[i] = el}
                className="about-stat-card"
                style={{
                  background: `${s.color}10`, border: `1px solid ${s.color}25`,
                  borderRadius: 16, padding: '18px 20px',
                  display: 'flex', alignItems: 'center', gap: 14,
                  transition: 'transform 0.25s, box-shadow 0.25s',
                  cursor: 'default',
                }}
              >
                <div style={{
                  width: 44, height: 44, borderRadius: 12,
                  background: `${s.color}20`, border: `1px solid ${s.color}30`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '1.2rem', flexShrink: 0,
                }}>
                  {s.icon}
                </div>
                <div>
                  <div className="stat-num" style={{
                    fontFamily: "'Sora', sans-serif", fontWeight: 800, fontSize: '1.5rem',
                    color: s.color, letterSpacing: '-0.02em', lineHeight: 1,
                  }}>
                    {s.value}
                  </div>
                  <div style={{ fontSize: '0.72rem', color: 'rgba(148,163,184,0.6)', marginTop: 2, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                    {s.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Mission ── */}
        <div style={{
          background: 'rgba(124,58,237,0.08)', border: '1px solid rgba(124,58,237,0.2)',
          borderLeft: '3px solid #7c3aed', borderRadius: 16, padding: '20px 24px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
            <span style={{ fontSize: '1.1rem' }}>🎯</span>
            <span style={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, color: '#e9d5ff' }}>Our Mission</span>
          </div>
          <p style={{ fontSize: '0.9rem', color: 'rgba(203,213,225,0.7)', lineHeight: 1.7 }}>
            To provide a safe, accessible, and supportive digital space for mental health and emotional wellbeing. We believe everyone deserves access to tools that help them understand and improve their mental health — regardless of background or circumstance.
          </p>
        </div>

        {/* ── Team ── */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
            <span style={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, color: '#e9d5ff', fontSize: '1rem' }}>Meet the Team</span>
            <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg, rgba(244,114,182,0.3), transparent)' }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {TEAM.map((member, i) => (
              <div
                key={i}
                ref={el => teamRef.current[i] = el}
                style={{
                  display: 'flex', alignItems: 'center', gap: 14,
                  padding: '14px 18px',
                  background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.06)',
                  borderRadius: 14,
                  transition: 'background 0.2s',
                  cursor: 'default',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.025)'; }}
              >
                <div style={{
                  width: 40, height: 40, borderRadius: 12, flexShrink: 0,
                  background: `${member.color}18`, border: `1px solid ${member.color}30`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '1.1rem',
                }}>
                  {member.emoji}
                </div>
                <div>
                  <div style={{ fontWeight: 600, color: '#e2e8f0', fontSize: '0.875rem' }}>{member.name}</div>
                  <div style={{ fontSize: '0.75rem', color: member.color, fontWeight: 500 }}>{member.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Disclaimer ── */}
        <div style={{
          background: 'rgba(251,191,36,0.06)', border: '1px solid rgba(251,191,36,0.2)',
          borderLeft: '3px solid #fbbf24', borderRadius: 16, padding: '18px 22px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
            <span style={{ fontSize: '1rem' }}>⚠️</span>
            <span style={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, color: '#fbbf24', fontSize: '0.9rem' }}>Important Disclaimer</span>
          </div>
          <ul style={{ paddingLeft: 18, display: 'flex', flexDirection: 'column', gap: 6 }}>
            {[
              'This app provides general wellness information and is not a substitute for professional medical advice.',
              'If you\'re experiencing a mental health crisis, please contact emergency services immediately.',
              'AI responses are based on general principles and should not replace personalised therapy.',
            ].map((item, i) => (
              <li key={i} style={{ fontSize: '0.82rem', color: 'rgba(203,213,225,0.65)', lineHeight: 1.6 }}>{item}</li>
            ))}
          </ul>
        </div>

        {/* ── Crisis Resources ── */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
            <span style={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, color: '#e9d5ff', fontSize: '1rem' }}>🆘 Crisis Resources</span>
            <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg, rgba(248,113,113,0.3), transparent)' }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {RESOURCES.map((r, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8,
                padding: '14px 18px',
                background: `${r.color}08`, border: `1px solid ${r.color}20`,
                borderRadius: 12,
              }}>
                <span style={{ fontSize: '0.875rem', color: '#e2e8f0', fontWeight: 500 }}>{r.name}</span>
                <a href={`tel:${r.number.replace(/\s/g, '')}`} style={{
                  fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: '0.875rem',
                  color: r.color, textDecoration: 'none',
                  background: `${r.color}15`, border: `1px solid ${r.color}30`,
                  padding: '5px 14px', borderRadius: 100,
                  transition: 'background 0.2s',
                }}>
                  {r.number}
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* ── Version footer ── */}
        <div style={{ textAlign: 'center', paddingTop: 8, borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <span style={{ fontSize: '0.72rem', color: 'rgba(148,163,184,0.4)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            FitYaar v1.0.0 · Built with 💜 by Khushi· © {new Date().getFullYear()}
          </span>
        </div>

      </div>
    </>
  );
};

export default AboutContent;