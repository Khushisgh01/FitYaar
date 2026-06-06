// import React from 'react';
// import CrisesLines from './CrisesLines'; // Adjust path as needed
// import { PhoneIcon, ChatBubbleLeftEllipsisIcon, MicrophoneIcon } from '@heroicons/react/24/outline';

// // Data derived from your images
// const resourcesData = [
//   {
//     icon: <PhoneIcon />,
//     title: '988 Suicide & Crisis Lifeline',
//     isPriority: true,
//     description: '24/7 free and confidential support for people in distress',
//     contactDisplay: '988',
//     callNumber: '988',
//     // textNumber: '988', // 988 also supports texting
//     hours: '24/7',
//     languages: 'English, Spanish, 200+ languages via interpreter',
//     services: ['Crisis counseling', 'Suicide prevention', 'Emotional support']
//   },
//   {
//     icon: <ChatBubbleLeftEllipsisIcon />,
//     title: 'Crisis Text Line',
//     isPriority: true,
//     description: 'Free crisis support via text message',
//     contactDisplay: 'Text HOME to 741741',
//     callNumber: '988', // "Call Now" button can default to 988
//     // textNumber: '741741',
//     hours: '24/7',
//     languages: 'English, Spanish',
//     services: ['Text-based crisis support', 'De-escalation', 'Resource referrals']
//   },
//   {
//     icon: <MicrophoneIcon />,
//     title: 'National Alliance on Mental Illness',
//     isPriority: false,
//     description: 'Information, support, and referrals',
//     contactDisplay: '1-800-950-NAMI (6264)',
//     callNumber: '1-800-950-6264',
//     textNumber: null, // No text button
//     hours: 'Mon-Fri 10am-10pm ET',
//     languages: 'English, Spanish',
//     services: ['Information', 'Support groups', 'Treatment referrals']
//   },
//   {
//     icon: <MicrophoneIcon />,
//     title: 'SAMHSA National Helpline',
//     isPriority: false,
//     description: 'Treatment referral and information service',
//     contactDisplay: '1-800-662-HELP (4357)',
//     callNumber: '1-800-662-4357',
//     textNumber: null, // No text button
//     hours: '24/7',
//     languages: 'English, Spanish',
//     services: ['Treatment locator', 'Information', 'Referrals']
//   }
// ];

// const CrisesContent = () => {
//   return (
//     <div className="space-y-6">
//       {resourcesData.map((resource) => (
//         <CrisesLines key={resource.title} {...resource} />
//       ))}
//     </div>
//   );
// };

// export default CrisesContent;
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { PhoneIcon, ChatBubbleLeftEllipsisIcon, MicrophoneIcon, ClockIcon, LanguageIcon } from '@heroicons/react/24/outline';

const resourcesData = [
  {
    icon: '📞',
    title: '988 Suicide & Crisis Lifeline',
    isPriority: true,
    description: '24/7 free and confidential support for people in distress, prevention and crisis resources.',
    contactDisplay: '988',
    callNumber: '988',
    hours: '24 / 7 — Always Open',
    languages: 'English, Spanish + 200 languages via interpreter',
    services: ['Crisis counseling', 'Suicide prevention', 'Emotional support', 'Resource referrals'],
  },
  {
    icon: '💬',
    title: 'Crisis Text Line',
    isPriority: true,
    description: 'Free crisis counseling via text message — no talking required.',
    contactDisplay: 'Text HOME to 741741',
    callNumber: '988',
    hours: '24 / 7 — Always Open',
    languages: 'English, Spanish',
    services: ['Text-based support', 'De-escalation', 'Resource referrals'],
  },
  {
    icon: '🤝',
    title: 'National Alliance on Mental Illness',
    isPriority: false,
    description: 'Information, support groups, and treatment referrals for mental illness.',
    contactDisplay: '1-800-950-NAMI (6264)',
    callNumber: '1-800-950-6264',
    hours: 'Mon–Fri, 10 AM–10 PM ET',
    languages: 'English, Spanish',
    services: ['Information & education', 'Support groups', 'Treatment referrals'],
  },
  {
    icon: '🏥',
    title: 'SAMHSA National Helpline',
    isPriority: false,
    description: 'Free, confidential treatment referral and information service for substance use and mental disorders.',
    contactDisplay: '1-800-662-HELP (4357)',
    callNumber: '1-800-662-4357',
    hours: '24 / 7 — Always Open',
    languages: 'English, Spanish',
    services: ['Treatment locator', 'General information', 'Local referrals'],
  },
];

const ResourceCard = ({ data, index }) => {
  const cardRef = useRef(null);

  const handleEnter = () => gsap.to(cardRef.current, { y: -4, scale: 1.005, duration: 0.3, ease: 'power2.out' });
  const handleLeave = () => gsap.to(cardRef.current, { y: 0, scale: 1, duration: 0.4, ease: 'elastic.out(1,0.5)' });

  return (
    <div
      ref={cardRef}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      style={{
        background: data.isPriority
          ? 'linear-gradient(135deg, rgba(239,68,68,0.1), rgba(239,68,68,0.05))'
          : 'rgba(255,255,255,0.04)',
        border: `1px solid ${data.isPriority ? 'rgba(239,68,68,0.2)' : 'rgba(255,255,255,0.08)'}`,
        borderLeft: `4px solid ${data.isPriority ? '#ef4444' : 'rgba(124,58,237,0.4)'}`,
        borderRadius: 20, overflow: 'hidden',
        cursor: 'default', transition: 'box-shadow 0.3s',
      }}
    >
      {/* Header */}
      <div style={{ padding: '20px 24px 16px', borderBottom: `1px solid ${data.isPriority ? 'rgba(239,68,68,0.12)' : 'rgba(255,255,255,0.06)'}` }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
          <span style={{ fontSize: '1.5rem' }}>{data.icon}</span>
          <h3 style={{
            fontFamily: 'Fraunces, serif', fontSize: '1.1rem', fontWeight: 700,
            color: data.isPriority ? '#fca5a5' : '#fff', flex: 1,
          }}>
            {data.title}
          </h3>
          {data.isPriority && (
            <span style={{
              background: 'rgba(239,68,68,0.2)', color: '#fca5a5',
              fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.08em',
              textTransform: 'uppercase', padding: '3px 10px', borderRadius: 100,
              border: '1px solid rgba(239,68,68,0.3)',
            }}>Priority</span>
          )}
        </div>
        <p style={{ fontSize: '0.83rem', color: 'rgba(255,255,255,0.45)', marginTop: 8, marginLeft: 44 }}>
          {data.description}
        </p>
      </div>

      {/* Body */}
      <div style={{ padding: '18px 24px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
        {/* Contact info */}
        <div>
          <p style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: 10 }}>Contact</p>
          <p style={{ fontFamily: 'Fraunces, serif', fontSize: '1.5rem', fontWeight: 700, color: data.isPriority ? '#fca5a5' : '#a78bfa', marginBottom: 10 }}>
            {data.contactDisplay}
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 7, color: 'rgba(255,255,255,0.4)', fontSize: '0.8rem', marginBottom: 6 }}>
            <ClockIcon style={{ width: 14, height: 14 }} />
            {data.hours}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 7, color: 'rgba(255,255,255,0.4)', fontSize: '0.8rem' }}>
            <LanguageIcon style={{ width: 14, height: 14 }} />
            {data.languages}
          </div>
        </div>

        {/* Services */}
        <div>
          <p style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: 10 }}>Services</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {data.services.map(s => (
              <div key={s} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ width: 5, height: 5, borderRadius: '50%', background: data.isPriority ? '#ef4444' : '#7c3aed', flexShrink: 0 }} />
                <span style={{ fontSize: '0.83rem', color: 'rgba(255,255,255,0.55)' }}>{s}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div style={{ padding: '0 24px 20px', display: 'flex', gap: 10 }}>
        <a
          href={`tel:${data.callNumber}`}
          style={{
            flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            padding: '12px 20px', borderRadius: 14, textDecoration: 'none',
            background: data.isPriority
              ? 'linear-gradient(135deg, #ef4444, #dc2626)'
              : 'linear-gradient(135deg, #7c3aed, #9d5cf0)',
            color: 'white', fontSize: '0.9rem', fontWeight: 700,
            fontFamily: 'Instrument Sans, sans-serif',
            boxShadow: data.isPriority ? '0 4px 16px rgba(239,68,68,0.35)' : '0 4px 16px rgba(124,58,237,0.3)',
            transition: 'all 0.2s',
          }}
          onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.02)'; }}
          onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; }}
        >
          📞 Call Now
        </a>
      </div>
    </div>
  );
};

const CrisesContent = () => {
  const cardsRef = useRef([]);

  useEffect(() => {
    gsap.fromTo(
      cardsRef.current.filter(Boolean),
      { opacity: 0, y: 40, scale: 0.96 },
      { opacity: 1, y: 0, scale: 1, stagger: 0.1, duration: 0.65, ease: 'power3.out' }
    );
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,300;0,600;0,700;1,300&family=Instrument+Sans:wght@400;500;600;700&display=swap');
      `}</style>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div style={{ marginBottom: 8 }}>
          <h2 style={{ fontFamily: 'Fraunces, serif', fontSize: '1.4rem', fontWeight: 700, color: '#fff', marginBottom: 6 }}>
            Crisis Hotlines
          </h2>
          <p style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.4)' }}>
            All lines are free, confidential, and available to everyone.
          </p>
        </div>
        {resourcesData.map((r, i) => (
          <div key={r.title} ref={el => cardsRef.current[i] = el}>
            <ResourceCard data={r} index={i} />
          </div>
        ))}
      </div>
    </>
  );
};

export default CrisesContent;