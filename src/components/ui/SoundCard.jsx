import React, { useState } from 'react';

const SoundCard = ({ title, description, duration, tags, initialIsPlaying = false }) => {
  const [isPlaying, setIsPlaying] = useState(initialIsPlaying);

  const handleTogglePlay = () => {
    setIsPlaying(!isPlaying);
    // console.log(`${title} is now ${isPlaying ? 'paused' : 'playing'}.`);
  };

  // Determine tag colors for visual variety
  const tagColorMap = {
    'Nature': 'bg-green-100 text-green-700/80',
    'Cozy': 'bg-yellow-100 text-yellow-700/80',
    'Urban': 'bg-blue-100 text-blue-700/80',
    'Meditation': 'bg-purple-100 text-purple-700/80',
    'Focus': 'bg-indigo-100 text-indigo-700/80',
    'Reduces anxiety': 'bg-green-200 text-green-800/80', 
    'Improves focus': 'bg-lime-200 text-lime-800/80',
    'Sleep aid': 'bg-gray-200 text-gray-700/80',
    'Deep relaxation': 'bg-fuchsia-200 text-fuchsia-800/80',
    'Stress relief': 'bg-cyan-200 text-cyan-800/80',
    'Mindfulness': 'bg-rose-200 text-rose-800/80',
    'Creativity': 'bg-orange-200 text-orange-800/80',
    'Mood boost': 'bg-pink-200 text-pink-800/80',
    'Energy': 'bg-red-200 text-red-800/80',
    'Positivity': 'bg-yellow-300 text-yellow-800/80',
    'Warmth': 'bg-orange-100 text-orange-700/80',
    'Relaxation': 'bg-purple-200 text-purple-800/80',
    'Productivity': 'bg-teal-200 text-teal-800/80',
    'Concentration': 'bg-lime-200 text-lime-700/80',
    'Sleep': 'bg-slate-200 text-slate-700/80',
    'Noise masking': 'bg-zinc-200 text-zinc-700/80',
    'Nature connection': 'bg-emerald-200 text-emerald-700/80',
    'Deep meditation': 'bg-sky-200 text-sky-700/80',
    'Spiritual connection': 'bg-indigo-200 text-indigo-700/80',
    'Inner peace': 'bg-amber-200 text-amber-700/80',
  };

  const getTagClass = (tag) => tagColorMap[tag] || 'bg-gray-100 text-gray-700';

  return (
    <div className={`flex flex-col bg-white rounded-2xl shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-[1.01] cursor-pointer ${isPlaying ? 'border-2 border-violet-500' : ''}`}>
      
      <div className="p-5 flex flex-col flex-grow">
        
        <div className="flex flex-wrap justify-end gap-2 mb-3 -mt-2">
          {tags.map((tag, index) => (
            <span key={index} className={`text-xs font-medium px-2 py-0.5 rounded-full ${getTagClass(tag)}`}>
              {tag}
            </span>
          ))}
        </div>

        <h3 className="text-lg font-bold text-gray-800">{title}</h3>
        <p className="text-sm text-gray-600 mb-2">{description}</p>
        
        <div className="flex items-center text-sm text-gray-500 mb-4">
          <span className="mr-1">🕒</span>
          <span>Duration: {duration}</span>
        </div>

        <div className="mt-auto">
          {isPlaying ? (
            <button 
              className="w-full py-2 px-4 bg-violet-500 text-white font-semibold rounded-xl hover:bg-violet-600 transition-colors duration-200 flex items-center justify-center"
              onClick={handleTogglePlay}
            >
              <span className="mr-2">◼</span>
              Stop Playing
            </button>
          ) : (
            <button 
              className="w-full py-2 px-4 bg-white text-violet-600 font-semibold border-2 border-gray-200 rounded-xl hover:bg-gray-100 transition-colors duration-200 flex items-center justify-center"
              onClick={handleTogglePlay}
            >
              <span className="mr-2">▶</span>
              Play
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SoundCard;