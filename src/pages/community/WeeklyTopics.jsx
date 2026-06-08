// src/pages/community/WeeklyTopics.jsx
import React, { useState } from 'react';

const TOPICS = [
  {
    week: 'This Week',
    emoji: '🌿',
    title: 'Sitting with Uncertainty',
    prompt: 'Life often pulls us into situations we can\'t control. How do you find peace when everything feels unknown? Share a ritual, a phrase, or a moment that has helped you sit with the discomfort of not knowing.',
    tags: ['anxiety', 'mindfulness', 'coping'],
    replies: 47,
    featured: true,
  },
  {
    week: 'Last Week',
    emoji: '🌧️',
    title: 'The Kindest Thing You Did for Yourself',
    prompt: 'Self-compassion is a practice, not a destination. What is one small or large thing you did for yourself recently that felt like a true act of kindness? It can be as simple as sleeping in or as profound as asking for help.',
    tags: ['self-care', 'compassion'],
    replies: 83,
    featured: false,
  },
  {
    week: '2 Weeks Ago',
    emoji: '🕊️',
    title: 'Grief Has No Timeline',
    prompt: 'Whether you are grieving a person, a relationship, a version of yourself, or a dream — your grief is valid. What has helped you carry it? What do you wish people understood about the grief you hold?',
    tags: ['grief', 'loss', 'healing'],
    replies: 61,
    featured: false,
  },
  {
    week: '3 Weeks Ago',
    emoji: '✨',
    title: 'Small Wins, Big Energy',
    prompt: 'Progress is not always dramatic. Sometimes it is making the call you dreaded, eating a full meal, or getting out of bed. What\'s a small win you\'ve had that felt enormous in the context of where you\'ve been?',
    tags: ['progress', 'hope', 'recovery'],
    replies: 112,
    featured: false,
  },
];

const TopicCard = ({ topic }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div style={{
      background: topic.featured
        ? 'linear-gradient(135deg,#fff 0%,#fdf5e6 100%)'
        : '#fff',
      border: topic.featured
        ? '1.5px solid rgba(217,119,6,0.25)'
        : '1px solid rgba(120,53,15,0.09)',
      borderRadius: 20,
      padding: '22px 24px',
      boxShadow: topic.featured
        ? '0 6px 30px rgba(217,119,6,0.1)'
        : '0 2px 14px rgba(120,53,15,0.05)',
      position: 'relative', overflow: 'hidden',
      transition: 'box-shadow 0.22s, transform 0.22s',
    }}
      onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = topic.featured ? '0 10px 40px rgba(217,119,6,0.14)' : '0 6px 24px rgba(120,53,15,0.09)'; }}
      onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)';   e.currentTarget.style.boxShadow = topic.featured ? '0 6px 30px rgba(217,119,6,0.1)' : '0 2px 14px rgba(120,53,15,0.05)'; }}
    >
      {/* Featured ribbon */}
      {topic.featured && (
        <div style={{
          position: 'absolute', top: 14, right: -28,
          background: 'linear-gradient(135deg,#d97706,#b45309)',
          color: '#fff', fontSize: '0.62rem', fontWeight: 800,
          letterSpacing: '0.08em', textTransform: 'uppercase',
          padding: '4px 36px', transform: 'rotate(35deg)',
          boxShadow: '0 2px 8px rgba(217,119,6,0.3)',
        }}>Live</div>
      )}

      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
        <div style={{
          width: 48, height: 48, borderRadius: 14, flexShrink: 0,
          background: 'linear-gradient(135deg,rgba(234,179,8,0.15),rgba(217,119,6,0.08))',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '1.5rem',
        }}>{topic.emoji}</div>

        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
            <span style={{
              fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase',
              letterSpacing: '0.08em',
              color: topic.featured ? '#d97706' : '#a8a29e',
            }}>{topic.week}</span>
            <span style={{ color: '#d4c5b0', fontSize: '0.65rem' }}>·</span>
            <span style={{ fontSize: '0.65rem', color: '#a8a29e' }}>💬 {topic.replies} replies</span>
          </div>

          <h3 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: '1.05rem', fontWeight: 700,
            color: '#1c1408', margin: '0 0 10px',
            lineHeight: 1.3,
          }}>{topic.title}</h3>

          <p style={{
            fontSize: '0.84rem', color: '#57534e', lineHeight: 1.7,
            margin: '0 0 14px',
            display: expanded ? 'block' : '-webkit-box',
            WebkitLineClamp: expanded ? 'unset' : 3,
            WebkitBoxOrient: 'vertical',
            overflow: expanded ? 'visible' : 'hidden',
          }}>{topic.prompt}</p>

          <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 8 }}>
            {/* Tags */}
            <div style={{ display: 'flex', gap: 5 }}>
              {topic.tags.map(tag => (
                <span key={tag} style={{
                  background: 'rgba(120,53,15,0.07)', color: '#78350f',
                  fontSize: '0.65rem', fontWeight: 600,
                  padding: '2px 9px', borderRadius: 100,
                }}>#{tag}</span>
              ))}
            </div>

            <div style={{ marginLeft: 'auto', display: 'flex', gap: 8 }}>
              <button
                onClick={() => setExpanded(v => !v)}
                style={{
                  padding: '6px 14px', borderRadius: 10,
                  border: '1px solid rgba(120,53,15,0.15)',
                  background: 'transparent', cursor: 'pointer',
                  fontSize: '0.76rem', fontWeight: 600, color: '#78716c',
                  fontFamily: "'DM Sans', sans-serif",
                  transition: 'all 0.18s',
                }}
              >{expanded ? 'Show less' : 'Read more'}</button>

              {topic.featured && (
                <button style={{
                  padding: '6px 16px', borderRadius: 10,
                  background: 'linear-gradient(135deg,#d97706,#b45309)',
                  color: '#fff', border: 'none', cursor: 'pointer',
                  fontSize: '0.76rem', fontWeight: 700,
                  fontFamily: "'DM Sans', sans-serif",
                  boxShadow: '0 3px 10px rgba(217,119,6,0.3)',
                  transition: 'opacity 0.18s',
                }}
                  onMouseEnter={e => e.currentTarget.style.opacity = '0.88'}
                  onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                >
                  Share your response →
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const WeeklyTopics = () => (
  <>
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Playfair+Display:ital,wght@0,700;1,400&display=swap');
    `}</style>

    <div style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <h2 style={{
        fontFamily: "'Playfair Display', serif",
        fontSize: '1.4rem', fontWeight: 700, color: '#1c1408',
        margin: '0 0 4px',
      }}>Weekly Topics</h2>
      <p style={{ fontSize: '0.84rem', color: '#78716c', margin: '0 0 24px' }}>
        Every week, a new prompt to spark reflection and connection.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {TOPICS.map((t, i) => <TopicCard key={i} topic={t} />)}
      </div>
    </div>
  </>
);

export default WeeklyTopics;