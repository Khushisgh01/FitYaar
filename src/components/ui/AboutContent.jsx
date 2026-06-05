import React from 'react';
import { HeartIcon } from '@heroicons/react/24/outline';

const AboutContent = () => {
  return (
    <div className="space-y-6 max-w-xl mx-auto text-center">
      
      {/* App Version Info */}
      <div className="pt-4 pb-6 border-b border-gray-200">
        <div className="flex justify-center mb-4">
          <div className="p-4 w-20 h-20 flex items-center justify-center bg-violet-100 rounded-full">
            <HeartIcon className="w-10 h-10 text-violet-600" />
          </div>
        </div>
        <h3 className="text-2xl font-bold text-gray-800">MindfulSpace v1.0</h3>
        <p className="text-gray-600 mt-1">Your compassionate AI companion for mental wellness</p>
      </div>

      {/* Our Mission */}
      <div className="text-left">
        <h4 className="text-xl font-bold text-gray-800 mb-3">Our Mission</h4>
        <p className="text-gray-700">
          To provide a safe, accessible, and supportive digital space for mental health and emotional wellbeing. We believe everyone deserves access to tools that can help them understand and improve their mental health.
        </p>
      </div>

      {/* Important Disclaimers */}
      <div className="text-left">
        <h4 className="text-xl font-bold text-gray-800 mb-3">Important Disclaimers</h4>
        <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
          <li>This app provides general wellness information and is not a substitute for professional medical advice.</li>
          <li>If you're experiencing a mental health crisis, please contact emergency services or a mental health professional immediately.</li>
          <li>The AI responses are generated based on general mental health principles and should not be considered personalized therapy.</li>
        </ul>
      </div>

      {/* Crisis Resources */}
      <div className="text-left pt-2">
        <h4 className="text-xl font-bold text-gray-800 mb-3">Crisis Resources</h4>
        <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
          <li>National Suicide Prevention Lifeline: 988</li>
          <li>Crisis Text Line: Text HOME to 741741</li>
          <li>National Alliance on Mental Illness: 1-800-950-NAMI (6264)</li>
        </ul>
      </div>
      
    </div>
  );
};

export default AboutContent;