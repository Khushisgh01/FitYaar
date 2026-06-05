import React from 'react';
// Make sure you have heroicons installed: npm install @heroicons/react
import { 
  PhoneIcon, 
  ChatBubbleLeftEllipsisIcon, 
  ClockIcon, 
  LanguageIcon 
} from '@heroicons/react/24/outline';

const CrisesLines = ({
  icon,
  title,
  description,
  contactDisplay,
  callNumber,
  hours,
  languages,
  services = [],
  isPriority = false // This prop controls the color (red or purple)
}) => {

  // --- Determine styles based on priority ---
  const badgeClass = 'bg-red-100 text-red-700';
  const buttonClass = isPriority 
    ? 'bg-red-600 hover:bg-red-700' 
    : 'bg-violet-600 hover:bg-violet-700';
  const textButtonClass = isPriority 
    ? 'border-red-600 text-red-600 hover:bg-red-50' 
    : 'border-violet-600 text-violet-600 hover:bg-violet-50';
  const iconClass = isPriority ? 'text-red-600' : 'text-violet-600';
  const borderClass = isPriority ? 'border-red-200' : 'border-gray-200';

  return (
    <div className={`border ${borderClass} rounded-lg overflow-hidden`}>
      
      {/* --- Header: Title and Description --- */}
      <div className="p-4 bg-white">
        <div className="flex items-center gap-3">
          {/* Use React.cloneElement to add styles to the passed icon */}
          {React.cloneElement(icon, { className: `w-6 h-6 ${iconClass}` })}
          <h2 className="text-xl font-bold text-gray-800">{title}</h2>
          {isPriority && (
            <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${badgeClass}`}>
              Priority
            </span>
          )}
        </div>
        <p className="text-gray-600 mt-1 md:ml-9">{description}</p>
      </div>
      
      <hr />

      {/* --- Body: Contact and Services --- */}
      <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-6 bg-white">
        
        {/* Contact Information */}
        <div>
          <h3 className="text-lg font-semibold text-gray-700 mb-3">Contact Information</h3>
          <p className="text-2xl font-bold text-gray-900 mb-2">{contactDisplay}</p>
          <div className="flex items-center text-gray-500 gap-2 mb-1">
            <ClockIcon className="w-5 h-5" />
            <span>{hours}</span>
          </div>
          <div className="flex items-center text-gray-500 gap-2">
            <LanguageIcon className="w-5 h-5" />
            <span>{languages}</span>
          </div>
        </div>

        {/* Services */}
        <div>
          <h3 className="text-lg font-semibold text-gray-700 mb-3">Services</h3>
          <ul className="list-disc list-inside space-y-1 text-gray-700">
            {services.map((service) => (
              <li key={service}>{service}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* --- Footer: Action Buttons --- */}
      <div className="bg-gray-50 p-4 flex gap-3">
        <a 
          href={`tel:${callNumber}`} 
          className={`flex-1 flex items-center justify-center p-3 rounded-lg text-white font-semibold ${buttonClass} transition-colors`}
        >
          <PhoneIcon className="w-5 h-5 mr-2" />
          Call Now
        </a>
        
        
      </div>
    </div>
  );
};

export default CrisesLines;