import React from 'react';
import CrisesLines from './CrisesLines'; // Adjust path as needed
import { PhoneIcon, ChatBubbleLeftEllipsisIcon, MicrophoneIcon } from '@heroicons/react/24/outline';

// Data derived from your images
const resourcesData = [
  {
    icon: <PhoneIcon />,
    title: '988 Suicide & Crisis Lifeline',
    isPriority: true,
    description: '24/7 free and confidential support for people in distress',
    contactDisplay: '988',
    callNumber: '988',
    // textNumber: '988', // 988 also supports texting
    hours: '24/7',
    languages: 'English, Spanish, 200+ languages via interpreter',
    services: ['Crisis counseling', 'Suicide prevention', 'Emotional support']
  },
  {
    icon: <ChatBubbleLeftEllipsisIcon />,
    title: 'Crisis Text Line',
    isPriority: true,
    description: 'Free crisis support via text message',
    contactDisplay: 'Text HOME to 741741',
    callNumber: '988', // "Call Now" button can default to 988
    // textNumber: '741741',
    hours: '24/7',
    languages: 'English, Spanish',
    services: ['Text-based crisis support', 'De-escalation', 'Resource referrals']
  },
  {
    icon: <MicrophoneIcon />,
    title: 'National Alliance on Mental Illness',
    isPriority: false,
    description: 'Information, support, and referrals',
    contactDisplay: '1-800-950-NAMI (6264)',
    callNumber: '1-800-950-6264',
    textNumber: null, // No text button
    hours: 'Mon-Fri 10am-10pm ET',
    languages: 'English, Spanish',
    services: ['Information', 'Support groups', 'Treatment referrals']
  },
  {
    icon: <MicrophoneIcon />,
    title: 'SAMHSA National Helpline',
    isPriority: false,
    description: 'Treatment referral and information service',
    contactDisplay: '1-800-662-HELP (4357)',
    callNumber: '1-800-662-4357',
    textNumber: null, // No text button
    hours: '24/7',
    languages: 'English, Spanish',
    services: ['Treatment locator', 'Information', 'Referrals']
  }
];

const CrisesContent = () => {
  return (
    <div className="space-y-6">
      {resourcesData.map((resource) => (
        <CrisesLines key={resource.title} {...resource} />
      ))}
    </div>
  );
};

export default CrisesContent;