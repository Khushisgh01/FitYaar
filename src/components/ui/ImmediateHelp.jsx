import React from 'react';
import CopyingTechniqueCard from './CopyingTechniqueCard'; // Adjust path
// Import icons for each card
import { 
  HeartIcon, 
  PuzzlePieceIcon, 
  ArrowsRightLeftIcon 
} from '@heroicons/react/24/outline';

// Data for all the coping techniques
const techniques = [
  {
    id: 1,
    icon: <PuzzlePieceIcon />,
    title: '5-4-3-2-1 Grounding',
    time: '2-3 minutes',
    description: 'Use your senses to ground yourself in the present',
    steps: [
      '5 things you can see',
      '4 things you can touch',
      '3 things you can hear',
      '2 things you can smell',
      '1 thing you can taste'
    ]
  },
  {
    id: 2,
    icon: <ArrowsRightLeftIcon />,
    title: 'Box Breathing',
    time: '2-4 minutes',
    description: 'Slow, controlled breathing to calm your nervous system',
    steps: [
      'Inhale for 4 counts',
      'Hold for 4 counts',
      'Exhale for 4 counts',
      'Hold empty for 4 counts',
      'Repeat 4-6 times'
    ]
  },
  {
    id: 3,
    icon: <HeartIcon />,
    title: 'Temperature Shock',
    time: '30 seconds - 2 minutes',
    description: 'Cold water to activate your parasympathetic nervous system',
    steps: [
      'Hold ice cubes in your hands',
      'Splash cold water on your face',
      'Take a cold shower if possible',
      'Hold a cold drink against your wrists',
      'Step outside into cold air'
    ]
  }
];

const ImmediateHelp = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800">Crisis Coping Strategies</h2>
      <p className="text-gray-600 mt-1 mb-6">
        Quick techniques to help manage intense emotions and thoughts
      </p>

      {/* Render the list of cards */}
      <div className="space-y-6">
        {techniques.map((tech) => (
          <CopyingTechniqueCard
            key={tech.id}
            icon={tech.icon}
            title={tech.title}
            time={tech.time}
            description={tech.description}
            steps={tech.steps}
          />
        ))}
      </div>
    </div>
  );
};

export default ImmediateHelp;