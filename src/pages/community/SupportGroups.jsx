// src/pages/community/SupportGroups.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';

const GROUP_ICONS = {
  anxiety:      '🫁',
  depression:   '🌧️',
  grief:        '🕊️',
  mindfulness:  '🧘',
  relationships:'💞',
  addiction:    '🌱',
  default:      '🤝',
};

const GROUP_GRADIENTS = [
  'linear-gradient(135deg,rgba(251,191,36,0.15),rgba(217,119,6,0.08))',
  'linear-gradient(135deg,rgba(16,185,129,0.12),rgba(5,150,105,0.06))',
  'linear-gradient(135deg,rgba(99,102,241,0.12),rgba(79,70,229,0.06))',
  'linear-gradient(135deg,rgba(236,72,153,0.1),rgba(219,39,119,0.05))',
  'linear-gradient(135deg,rgba(249,115,22,0.12),rgba(234,88,12,0.06))',
  'linear-gradient(135deg,rgba(20,184,166,0.12),rgba(13,148,136,0.06))',
];

const GroupCard = ({ group, index }) => {
  const iconKey = Object.keys(GROUP_ICONS).find(k => group.title?.toLowerCase().includes(k)) || 'default';
  const icon = GROUP_ICONS[iconKey];
  const grad = GROUP_GRADIENTS[index % GROUP_GRADIENTS.length];

  return (
    <div style={{
      background: '#fff',
      border: '1px solid rgba(120,53,15,0.09)',
      borderRadius: 20, overflow: 'hidden',
      boxShadow: '0 2px 16px rgba(120,53,15,0.05)',
      transition: 'box-shadow 0.22s, transform 0.22s',
      cursor: 'pointer',
    }}
      onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 30px rgba(120,53,15,0.1)'; }}
      onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)';   e.currentTarget.style.boxShadow = '0 2px 16px rgba(120,53,15,0.05)'; }}
    >
      {/* Card top accent */}
      <div style={{ background: grad, padding: '22px 22px 16px', borderBottom: '1px solid rgba(120,53,15,0.06)' }}>
        <div style={{ fontSize: '2rem', marginBottom: 8 }}>{icon}</div>
        <h3 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: '1.05rem', fontWeight: 700,
          color: '#1c1408', margin: 0,
        }}>{group.title}</h3>
      </div>

      <div style={{ padding: '14px 22px 18px' }}>
        <p style={{ fontSize: '0.82rem', color: '#78716c', lineHeight: 1.65, margin: '0 0 14px' }}>
          {group.description || 'A safe space to share, listen, and grow together.'}
        </p>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ fontSize: '0.75rem', color: '#a8a29e' }}>👥</span>
            <span style={{ fontSize: '0.75rem', color: '#a8a29e', fontWeight: 600 }}>
              {group.members?.toLocaleString() || '—'} members
            </span>
          </div>

          {group.tag && (
            <span style={{
              background: 'rgba(217,119,6,0.1)', color: '#b45309',
              fontSize: '0.65rem', fontWeight: 700,
              padding: '3px 10px', borderRadius: 100,
              textTransform: 'lowercase', letterSpacing: '0.04em',
            }}>#{group.tag}</span>
          )}
        </div>

        <button style={{
          marginTop: 14, width: '100%',
          padding: '9px 0', borderRadius: 12,
          background: 'linear-gradient(135deg, #d97706, #b45309)',
          color: '#fff', border: 'none', cursor: 'pointer',
          fontSize: '0.8rem', fontWeight: 700,
          fontFamily: "'DM Sans', sans-serif",
          boxShadow: '0 3px 12px rgba(217,119,6,0.25)',
          transition: 'opacity 0.18s',
        }}
          onMouseEnter={e => e.currentTarget.style.opacity = '0.88'}
          onMouseLeave={e => e.currentTarget.style.opacity = '1'}
        >
          Join Group →
        </button>
      </div>
    </div>
  );
};

const SupportGroups = () => {
  const { getAuthHeader } = useAuth();
  const [groups, setGroups]   = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);
  const [search, setSearch]   = useState('');

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch('/api/community', { headers: getAuthHeader() });
        if (!res.ok) throw new Error('Failed to load groups');
        const data = await res.json();
        setGroups(data.groups || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const filtered = groups.filter(g =>
    !search || g.title?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Playfair+Display:wght@700&display=swap');
        .sg-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 18px;
          margin-top: 20px;
        }
        .sg-search {
          width: 100%; max-width: 380px;
          border: 1px solid rgba(120,53,15,0.15);
          border-radius: 12px; padding: 10px 16px;
          font-size: 0.85rem; font-family: 'DM Sans', sans-serif;
          color: #1c1408; background: #faf6f0; outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
          box-sizing: border-box;
        }
        .sg-search:focus {
          border-color: #d97706;
          box-shadow: 0 0 0 3px rgba(217,119,6,0.1);
        }
        .sg-skeleton {
          background: linear-gradient(90deg,#f5ede2 25%,#fdf8f2 50%,#f5ede2 75%);
          background-size: 200% 100%;
          animation: sg-shimmer 1.5s infinite;
          border-radius: 20px;
        }
        @keyframes sg-shimmer {
          0%   { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>

      <div style={{ fontFamily: "'DM Sans', sans-serif" }}>
        <div style={{ marginBottom: 6 }}>
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: '1.4rem', fontWeight: 700, color: '#1c1408',
            margin: '0 0 4px',
          }}>Support Groups</h2>
          <p style={{ fontSize: '0.84rem', color: '#78716c', margin: '0 0 18px' }}>
            Find your tribe — communities built around shared experiences.
          </p>

          <input
            className="sg-search"
            placeholder="🔍  Search groups…"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>

        {loading ? (
          <div className="sg-grid">
            {[1,2,3,4,5,6].map(i => (
              <div key={i} className="sg-skeleton" style={{ height: 220 }} />
            ))}
          </div>
        ) : error ? (
          <p style={{ color: '#dc2626', fontSize: '0.85rem', marginTop: 20 }}>⚠️ {error}</p>
        ) : filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '50px 20px', color: '#a8a29e' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: 10 }}>🤝</div>
            <p style={{ fontSize: '0.9rem', fontWeight: 600, color: '#78716c' }}>No groups found</p>
            <p style={{ fontSize: '0.8rem' }}>Try a different search term.</p>
          </div>
        ) : (
          <div className="sg-grid">
            {filtered.map((g, i) => <GroupCard key={g._id || i} group={g} index={i} />)}
          </div>
        )}
      </div>
    </>
  );
};

export default SupportGroups;