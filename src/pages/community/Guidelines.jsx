// src/pages/community/Guidelines.jsx
import React, { useState } from 'react';

const guidelines = [
  {
    icon: '🌱',
    title: 'Be Kind & Respectful',
    color: '#d97706',
    points: [
      'Treat every member with compassion and empathy — remember that real people with real feelings are behind every post.',
      'Disagreements are okay; personal attacks, insults, or harassment are never acceptable.',
      'Avoid dismissive language like "just get over it" or "others have it worse."',
    ],
  },
  {
    icon: '🔒',
    title: 'Protect Privacy',
    color: '#b45309',
    points: [
      'Never share another member\'s personal information outside this space.',
      'What\'s shared in the community stays in the community — do not screenshot or redistribute.',
      'Use first names or usernames only. Avoid revealing identifying details about others.',
    ],
  },
  {
    icon: '🤝',
    title: 'Support, Don\'t Advise',
    color: '#92400e',
    points: [
      'Offer support and solidarity rather than unsolicited advice or diagnoses.',
      'Share your own experience using "I" statements rather than telling others what they should do.',
      'Avoid recommending stopping medications or professional treatment.',
    ],
  },
  {
    icon: '⚠️',
    title: 'Content Sensitivity',
    color: '#d97706',
    points: [
      'Use content warnings (CW:) before posts that discuss crisis situations, trauma, or triggering topics.',
      'Detailed descriptions of self-harm or suicidal methods are not permitted.',
      'If someone appears to be in immediate danger, encourage them to contact emergency services.',
    ],
  },
  {
    icon: '🚫',
    title: 'Zero Tolerance',
    color: '#b45309',
    points: [
      'Discrimination of any kind — including racism, sexism, homophobia, or ableism — will result in immediate removal.',
      'Spam, advertising, and self-promotion are not allowed.',
      'Deliberately triggering or "trolling" other members is strictly prohibited.',
    ],
  },
  {
    icon: '🛡️',
    title: 'Moderation',
    color: '#92400e',
    points: [
      'Moderators reserve the right to remove content or members that violate these guidelines.',
      'If you see a post that concerns you, use the report button rather than engaging publicly.',
      'Appeals to moderation decisions can be made through the support channel.',
    ],
  },
];

const pledge = [
  'I will listen with an open heart.',
  'I will speak with kindness and care.',
  'I will protect the privacy of others.',
  'I will seek help when I need it.',
  'I will help keep this space safe.',
];

export default function Guidelines() {
  const [agreed, setAgreed] = useState(false);
  const [expanded, setExpanded] = useState(null);

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", paddingBottom: 60 }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Lora:ital,wght@0,600;1,400&display=swap');

        .gl-hero {
          background: linear-gradient(135deg, rgba(217,119,6,0.08) 0%, rgba(180,83,9,0.05) 100%);
          border: 1px solid rgba(217,119,6,0.15);
          border-radius: 20px;
          padding: 36px 32px;
          margin-bottom: 32px;
          text-align: center;
        }
        .gl-hero-icon { font-size: 3rem; margin-bottom: 12px; }
        .gl-hero-title {
          font-family: 'Lora', serif;
          font-size: 1.75rem;
          font-weight: 600;
          color: #78350f;
          margin: 0 0 10px;
        }
        .gl-hero-sub {
          color: #92400e;
          font-size: 0.95rem;
          line-height: 1.7;
          max-width: 520px;
          margin: 0 auto;
        }

        .gl-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 16px;
          margin-bottom: 32px;
        }

        .gl-card {
          background: #fffbf5;
          border: 1px solid rgba(120,53,15,0.1);
          border-radius: 16px;
          overflow: hidden;
          transition: box-shadow 0.2s, transform 0.2s;
          cursor: pointer;
        }
        .gl-card:hover {
          box-shadow: 0 6px 24px rgba(120,53,15,0.1);
          transform: translateY(-2px);
        }

        .gl-card-header {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 18px 20px;
        }
        .gl-card-icon {
          font-size: 1.5rem;
          width: 44px; height: 44px;
          border-radius: 12px;
          display: flex; align-items: center; justify-content: center;
          background: rgba(217,119,6,0.1);
          flex-shrink: 0;
        }
        .gl-card-title {
          font-weight: 700;
          font-size: 1rem;
          color: #78350f;
          flex: 1;
        }
        .gl-card-chevron {
          color: #d97706;
          font-size: 0.8rem;
          transition: transform 0.25s;
        }
        .gl-card-chevron.open { transform: rotate(180deg); }

        .gl-card-body {
          padding: 0 20px;
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.35s ease, padding 0.2s;
        }
        .gl-card-body.open {
          max-height: 300px;
          padding-bottom: 18px;
        }
        .gl-card-body ul {
          margin: 0;
          padding-left: 18px;
          list-style: none;
        }
        .gl-card-body ul li {
          position: relative;
          padding-left: 16px;
          font-size: 0.875rem;
          color: #57534e;
          line-height: 1.7;
          margin-bottom: 8px;
        }
        .gl-card-body ul li::before {
          content: '•';
          position: absolute;
          left: 0;
          color: #d97706;
          font-weight: 700;
        }
        .gl-divider {
          height: 1px;
          background: rgba(217,119,6,0.15);
          margin: 0 20px;
        }

        .gl-pledge {
          background: linear-gradient(135deg, #78350f 0%, #92400e 100%);
          border-radius: 20px;
          padding: 32px;
          color: white;
          margin-bottom: 24px;
        }
        .gl-pledge-title {
          font-family: 'Lora', serif;
          font-size: 1.3rem;
          font-weight: 600;
          margin: 0 0 20px;
          opacity: 0.95;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .gl-pledge-list {
          list-style: none;
          padding: 0; margin: 0 0 24px;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .gl-pledge-list li {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 0.9rem;
          opacity: 0.9;
          line-height: 1.5;
        }
        .gl-pledge-list li span.check {
          width: 22px; height: 22px;
          border-radius: 50%;
          background: rgba(255,255,255,0.15);
          display: flex; align-items: center; justify-content: center;
          font-size: 0.75rem;
          flex-shrink: 0;
        }

        .gl-agree-btn {
          width: 100%;
          padding: 14px;
          border-radius: 12px;
          border: none;
          font-size: 0.95rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.25s;
          font-family: 'DM Sans', sans-serif;
        }
        .gl-agree-btn.pending {
          background: rgba(255,255,255,0.15);
          color: white;
          border: 2px solid rgba(255,255,255,0.3);
        }
        .gl-agree-btn.pending:hover {
          background: rgba(255,255,255,0.25);
        }
        .gl-agree-btn.done {
          background: rgba(255,255,255,0.95);
          color: #78350f;
        }

        .gl-note {
          background: rgba(217,119,6,0.06);
          border: 1px solid rgba(217,119,6,0.15);
          border-radius: 12px;
          padding: 16px 20px;
          font-size: 0.85rem;
          color: #92400e;
          line-height: 1.6;
          text-align: center;
        }
      `}</style>

      {/* Hero */}
      <div className="gl-hero">
        <div className="gl-hero-icon">🛡️</div>
        <h2 className="gl-hero-title">Community Guidelines</h2>
        <p className="gl-hero-sub">
          FitYaar is a safe, judgment-free space for everyone. These guidelines exist to protect and nurture
          every member of our community. Please read them carefully.
        </p>
      </div>

      {/* Accordion cards */}
      <div className="gl-grid">
        {guidelines.map((g, i) => (
          <div
            key={i}
            className="gl-card"
            onClick={() => setExpanded(expanded === i ? null : i)}
          >
            <div className="gl-card-header">
              <div className="gl-card-icon">{g.icon}</div>
              <span className="gl-card-title">{g.title}</span>
              <span className={`gl-card-chevron ${expanded === i ? 'open' : ''}`}>▼</span>
            </div>
            <div className="gl-divider" />
            <div className={`gl-card-body ${expanded === i ? 'open' : ''}`}>
              <ul style={{ marginTop: 14 }}>
                {g.points.map((p, j) => <li key={j}>{p}</li>)}
              </ul>
            </div>
          </div>
        ))}
      </div>

      {/* Community Pledge */}
      <div className="gl-pledge">
        <div className="gl-pledge-title">🤲 The Community Pledge</div>
        <ul className="gl-pledge-list">
          {pledge.map((item, i) => (
            <li key={i}>
              <span className="check">{agreed ? '✓' : (i + 1)}</span>
              {item}
            </li>
          ))}
        </ul>
        <button
          className={`gl-agree-btn ${agreed ? 'done' : 'pending'}`}
          onClick={() => setAgreed(!agreed)}
        >
          {agreed ? '✓ Pledge Accepted — Welcome to the Community!' : 'I Agree to These Guidelines'}
        </button>
      </div>

      {/* Footer note */}
      <div className="gl-note">
        💬 These guidelines are reviewed regularly. If you have questions or concerns, reach out to a moderator.
        By participating in FitYaar Community, you agree to uphold these standards.
      </div>
    </div>
  );
}