import React from 'react';
import { HeartIcon } from '@heroicons/react/24/outline'; // Default icon

const CopyingTechniqueCard = ({
  icon,
  title,
  time,
  description,
  steps = [] // Default to an empty array
}) => {
  return (
    // Main card container
    <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100">
      
      {/* Header Section */}
      <div className="flex justify-between items-start mb-4">
        {/* Icon, Title, Description */}
        <div className="flex items-start gap-3">
          <span className="flex-shrink-0 p-2 bg-violet-100 rounded-full">
            {/* Clone the passed icon to add Tailwind classes */}
            {React.cloneElement(icon, { className: "w-6 h-6 text-violet-600" })}
          </span>
          <div>
            <h3 className="text-xl font-bold text-gray-800">{title}</h3>
            <p className="text-gray-600">{description}</p>
          </div>
        </div>
        
        {/* Time Estimate */}
        <span className="flex-shrink-0 text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
          {time}
        </span>
      </div>

      {/* Steps List */}
      <div className="space-y-3 pl-1">
        {steps.map((step, index) => (
          <div key={index} className="flex items-center gap-3">
            <span 
              className="flex-shrink-0 flex items-center justify-center 
                         w-6 h-6 bg-violet-100 text-violet-700 
                         rounded-full font-semibold text-sm"
            >
              {index + 1}
            </span>
            <p className="text-gray-700">{step}</p>
          </div>
        ))}
      </div>

      {/* Mark as Complete Button */}
      <button 
        className="mt-6 w-full sm:w-auto px-6 py-2 bg-violet-600 text-white 
                   font-semibold rounded-lg shadow-md hover:bg-violet-700 
                   transition-colors focus:outline-none focus:ring-2 
                   focus:ring-violet-400 focus:ring-offset-2"
      >
        Mark as Complete
      </button>
    </div>
  );
};

// Provide a default icon in case one isn't passed
CopyingTechniqueCard.defaultProps = {
  icon: <HeartIcon />
};

export default CopyingTechniqueCard;