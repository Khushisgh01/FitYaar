import React, { useState } from 'react';
import { ShieldCheckIcon } from '@heroicons/react/24/outline'; // Make sure you have heroicons installed: npm install @heroicons/react

const SafetyPlan = () => {
  // Use separate state for each input field for simplicity
  const [warningSigns, setWarningSigns] = useState('');
  const [copingStrategies, setCopingStrategies] = useState('');
  const [supportPeople, setSupportPeople] = useState('');
  const [therapist, setTherapist] = useState('');
  const [doctor, setDoctor] = useState('');
  const [safeEnvironment, setSafeEnvironment] = useState('');

  // Function to download the plan as a text file
  const handleDownloadPlan = () => {
    // 1. Combine all the state values into a single text string
    const planText = `
Personal Safety Plan
=======================

Step 1: Warning Signs
What thoughts, feelings, or situations warn you that a crisis might be developing?
Your Plan:
${warningSigns || 'No plan entered yet.'}

-----------------------

Step 2: Coping Strategies
What can you do on your own to help yourself feel better?
Your Plan:
${copingStrategies || 'No plan entered yet.'}

-----------------------

Step 3: Support People
Who can you call when you need support?
Your Plan:
${supportPeople || 'No plan entered yet.'}

-----------------------

Step 4: Professional Contacts
Mental health professionals and emergency contacts
- Therapist: ${therapist || 'Not specified'}
- Doctor: ${doctor || 'Not specified'}
- Crisis Line: 988
- Emergency: 911

-----------------------

Step 5: Safe Environment
How can you make your environment safer during a crisis?
Your Plan:
${safeEnvironment || 'No plan entered yet.'}

=======================
Remember: You are not alone. Help is always available.
    `.trim(); // .trim() removes any extra whitespace at the start or end

    // 2. Create a "blob" (a file-like object) from the text
    const blob = new Blob([planText], { type: 'text/plain;charset=utf-8' });

    // 3. Create a temporary URL for the blob
    const href = URL.createObjectURL(blob);

    // 4. Create a hidden link element
    const link = document.createElement('a');
    link.href = href;
    link.download = 'MyPersonalSafetyPlan.txt'; // This is the name of the file

    // 5. Click the link to trigger the download
    document.body.appendChild(link);
    link.click();

    // 6. Clean up by removing the link and the URL object
    document.body.removeChild(link);
    URL.revokeObjectURL(href);
    setWarningSigns('');
    setCopingStrategies('');
    setSupportPeople('');
    setTherapist('');
    setDoctor('');
    setSafeEnvironment('');

  };

  return (
    <div>
      {/* Header Section */}
      <div className="flex items-center gap-3 mb-2">
        <ShieldCheckIcon className="w-8 h-8 text-violet-600" />
        <h2 className="text-2xl font-bold text-gray-800">Personal Safety Plan</h2>
      </div>
      <p className="text-gray-600 mt-1 mb-8">
        Create a personalized plan for managing crisis situations
      </p>

      {/* Safety Plan Sections */}
      <div className="space-y-6">
        
        {/* --- Step 1 --- */}
        <div className="bg-white rounded-lg shadow-sm p-5 border border-gray-200">
          <h3 className="text-xl font-bold text-gray-800 mb-2">
            Step 1: Warning Signs
          </h3>
          <p className="text-gray-700 font-medium mb-2">What thoughts, feelings, or situations warn you that a crisis might be developing?</p>
          <p className="text-sm text-gray-500 mb-4">Examples: Feeling hopeless, can't sleep, isolating from others</p>
          <textarea
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-violet-500 focus:border-violet-500 text-gray-700 resize-y min-h-[90px]"
            value={warningSigns}
            onChange={(e) => setWarningSigns(e.target.value)}
            placeholder="Write your personalized plan here..."
          ></textarea>
        </div>

        {/* --- Step 2 --- */}
        <div className="bg-white rounded-lg shadow-sm p-5 border border-gray-200">
          <h3 className="text-xl font-bold text-gray-800 mb-2">
            Step 2: Coping Strategies
          </h3>
          <p className="text-gray-700 font-medium mb-2">What can you do on your own to help yourself feel better?</p>
          <p className="text-sm text-gray-500 mb-4">Examples: Listen to music, take a bath, exercise, practice breathing</p>
          <textarea
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-violet-500 focus:border-violet-500 text-gray-700 resize-y min-h-[90px]"
            value={copingStrategies}
            onChange={(e) => setCopingStrategies(e.target.value)}
            placeholder="Write your personalized plan here..."
          ></textarea>
        </div>

        {/* --- Step 3 --- */}
        <div className="bg-white rounded-lg shadow-sm p-5 border border-gray-200">
          <h3 className="text-xl font-bold text-gray-800 mb-2">
            Step 3: Support People
          </h3>
          <p className="text-gray-700 font-medium mb-2">Who can you call when you need support? (List at least 3 people)</p>
          <p className="text-sm text-gray-500 mb-4">Examples: Family member, close friend, mentor, counselor</p>
          <textarea
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-violet-500 focus:border-violet-500 text-gray-700 resize-y min-h-[90px]"
            value={supportPeople}
            onChange={(e) => setSupportPeople(e.target.value)}
            placeholder="Write your personalized plan here..."
          ></textarea>
        </div>

        {/* --- Step 4 --- */}
        <div className="bg-white rounded-lg shadow-sm p-5 border border-gray-200">
          <h3 className="text-xl font-bold text-gray-800 mb-2">
            Step 4: Professional Contacts
          </h3>
          <p className="text-gray-700 font-medium mb-4">
            Mental health professionals and emergency contacts
          </p>
          <div className="space-y-2 text-gray-700">
            <p>• Therapist: <input 
                type="text" 
                className="inline-block border-b border-gray-300 focus:border-violet-500 focus:outline-none px-1"
                value={therapist}
                onChange={(e) => setTherapist(e.target.value)}
                aria-label="Therapist contact"
              /></p>
            <p>• Doctor: <input 
                type="text" 
                className="inline-block border-b border-gray-300 focus:border-violet-500 focus:outline-none px-1"
                value={doctor}
                onChange={(e) => setDoctor(e.target.value)}
                aria-label="Doctor contact"
              /></p>
            <p>• Crisis Line: 988</p>
            <p>• Emergency: 911</p>
          </div>
        </div>

        {/* --- Step 5 --- */}
        <div className="bg-white rounded-lg shadow-sm p-5 border border-gray-200">
          <h3 className="text-xl font-bold text-gray-800 mb-2">
            Step 5: Safe Environment
          </h3>
          <p className="text-gray-700 font-medium mb-2">How can you make your environment safer during a crisis?</p>
          <p className="text-sm text-gray-500 mb-4">Examples: Remove harmful objects, ask someone to stay with you</p>
          <textarea
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-violet-500 focus:border-violet-500 text-gray-700 resize-y min-h-[90px]"
            value={safeEnvironment}
            onChange={(e) => setSafeEnvironment(e.target.value)}
            placeholder="Write your personalized plan here..."
          ></textarea>
        </div>
      </div>

      {/* Download Button */}
      <div className="text-center mt-10">
        <button
          onClick={handleDownloadPlan}
          className="px-8 py-3 bg-violet-600 text-white font-semibold rounded-lg 
                     shadow-md hover:bg-violet-700 transition-colors focus:outline-none 
                     focus:ring-2 focus:ring-violet-400 focus:ring-offset-2"
        >
          Download Safety Plan
        </button>
        <p className="text-sm text-gray-500 mt-2">Print this plan and keep it somewhere accessible</p>
      </div>
    </div>
  );
};

export default SafetyPlan;