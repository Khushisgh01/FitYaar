import React from 'react';
import { ShieldCheckIcon, SparklesIcon, XCircleIcon } from '@heroicons/react/24/outline'; 

const GuidelinesContent = () => {
  // Parsed content from your request
  const coreValues = [
    'Kindness and empathy in all interactions',
    'Respect for diverse experiences and perspectives',
    'Anonymous sharing for safety and comfort',
    'Evidence-based support and encouragement'
  ];

  const safetyFirst = [
    'No personal information sharing',
    'Crisis situations should contact professional help',
    'Report harmful or inappropriate content',
    'Moderated environment with trained volunteers'
  ];

  const whatToShare = [
    'Coping strategies that have worked for you',
    'Words of encouragement and hope',
    'Progress celebrations, no matter how small',
    'Questions about mental health techniques'
  ];

  const whatNotToShare = [
    'Specific medication advice',
    'Graphic descriptions of self-harm',
    'Political or religious debates',
    'Commercial promotions or spam'
  ];

  return (
    <div className="space-y-8">
      {/* Community Guidelines Header (From image_29f01f.png) */}
      <div className="flex items-center gap-3">
        <ShieldCheckIcon className="w-8 h-8 text-gray-800" />
        <h2 className="text-2xl font-bold text-gray-800">Community Guidelines</h2>
      </div>
      <hr className='mb-4'/>
      
      {/* Core Values Section */}
      <div className="mb-8">
          <h3 className="text-xl font-bold text-gray-800 mb-2">
            <span className="text-2xl mr-2">✨</span>
            Our Core Values
          </h3>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            {coreValues.map((value, index) => (
              <li key={index}>{value}</li>
            ))}
          </ul>
      </div>

      {/* Safety First Section */}
      <div className="mb-8">
          <h3 className="text-xl font-bold text-gray-800 mb-2">
            <span className="text-2xl mr-2">🛡️</span>
            Safety First
          </h3>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            {safetyFirst.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
      </div>

      {/* What to Share (Placeholder structure) */}
      <div className="mb-8">
          <h3 className="text-xl font-bold text-gray-800 mb-2">
            <span className="text-2xl mr-2">💫</span>
            What to Share
          </h3>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            {whatToShare.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
      </div>
      
      {/* What Not to Share (Placeholder structure) */}
      <div className="mb-8">
          <h3 className="text-xl font-bold text-gray-800 mb-2">
            <span className="text-2xl mr-2">🚫</span>
            What Not to Share
          </h3>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            {whatNotToShare.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
      </div>

      {/* Reminder at the bottom */}
      <div className="p-4 bg-yellow-50 border-l-4 border-yellow-500 text-yellow-800 rounded-lg">
        <p className="font-semibold">Remember:</p>
        <p className="text-sm mt-1">
          This community provides peer support, not professional therapy. If you're experiencing a mental health crisis, please contact a mental health professional or crisis helpline immediately.
        </p>
      </div>
    </div>
  );
};

export default GuidelinesContent;