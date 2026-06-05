import React from 'react';

// This component receives one 'entry' object as a prop.
// We destructure it immediately to get the properties.
const JournalEntry = ({ emoji, mood, date, text, tags }) => {
  return (
    <div className="bg-white p-4 rounded-lg">
      <div className="flex items-start mb-2">
        {/* Emoji */}
        <span className="text-3xl mr-3">{emoji}</span>
        
        {/* Mood and Date */}
        <div className="flex-grow">
          <h2 className="text-xl font-bold text-gray-800">{mood}</h2>
          <p className="text-sm text-gray-500">{date}</p>
        </div>
      </div>
      
      {/* Entry Text */}
      <p className="text-gray-700 my-3">{text}</p>
      
      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span 
            key={tag} 
            className="bg-indigo-100 text-indigo-700 text-xs font-semibold px-3 py-1 rounded-full"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default JournalEntry;