import React from 'react';
import { AcademicCapIcon, HeartIcon, EyeIcon, ClipboardDocumentCheckIcon } from '@heroicons/react/24/outline'; 

// Helper component for rendering each therapy card
const TherapyCard = ({ icon, title, description, bestFor }) => (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 flex flex-col">
        <div className="flex items-center gap-3 mb-4">
            {/* Using React.cloneElement to apply shared styles to the icon */}
            {React.cloneElement(icon, { className: "w-6 h-6 text-violet-600" })}
            <h3 className="text-xl font-bold text-gray-800">{title}</h3>
        </div>
        <p className="text-gray-600 mb-4 flex-grow">{description}</p>
        
        <h4 className="font-bold text-gray-700 mb-2">Best for treating:</h4>
        <div className="flex flex-wrap gap-2">
            {bestFor.map(topic => (
                <span key={topic} className="text-xs font-medium bg-violet-100 text-violet-700 px-3 py-1 rounded-full">
                    {topic}
                </span>
            ))}
        </div>
    </div>
);

const TherapyTypesContent = () => {
    // Data extracted from image_b0e5bc.png
    const therapyData = [
        {
            // Using AcademicCapIcon for CBT (Cognitive)
            icon: <AcademicCapIcon />,
            title: 'Cognitive Behavioral Therapy (CBT)',
            description: 'Focuses on changing negative thought patterns and behaviors',
            bestFor: ['Anxiety', 'Depression', 'PTSD', 'OCD']
        },
        {
            // Using HeartIcon for DBT (Dialectical Behavior/Emotional)
            icon: <HeartIcon />,
            title: 'Dialectical Behavior Therapy (DBT)',
            description: 'Teaches skills for managing emotions and improving relationships',
            bestFor: ['Borderline Personality', 'Self-harm', 'Emotional regulation']
        },
        {
            // Using EyeIcon for EMDR (Eye Movement)
            icon: <EyeIcon />,
            title: 'Eye Movement Desensitization (EMDR)',
            description: 'Processes traumatic memories through guided eye movements',
            bestFor: ['PTSD', 'Trauma', 'Panic disorder'] 
        },
        {
            // Using ClipboardDocumentCheckIcon for ACT (Commitment)
            icon: <ClipboardDocumentCheckIcon />,
            title: 'Acceptance and Commitment Therapy (ACT)',
            description: 'Focuses on accepting thoughts and committing to values-based actions',
            bestFor: ['Chronic pain', 'Addiction', 'Life transitions']
        }
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {therapyData.map(therapy => (
                <TherapyCard key={therapy.title} {...therapy} />
            ))}
        </div>
    );
};

export default TherapyTypesContent;