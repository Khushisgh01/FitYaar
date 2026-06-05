import React, { useState } from 'react';
import ChecklistItem from './ChecklistItem'; // Adjust path
import { PhoneIcon } from '@heroicons/react/24/solid';

// The list of warning signs
const initialWarningSigns = [
  { id: 1, text: 'Thoughts of suicide or self-harm', isChecked: false },
  { id: 2, text: 'Feeling hopeless or trapped', isChecked: false },
  { id: 3, text: 'Extreme mood swings', isChecked: false },
  { id: 4, text: 'Increased use of alcohol or drugs', isChecked: false },
  { id: 5, text: 'Withdrawing from friends and family', isChecked: false },
  { id: 6, text: 'Sleeping too much or too little', isChecked: false },
  { id: 7, text: 'Taking dangerous risks', isChecked: false },
  { id: 8, text: 'Feeling like a burden to others', isChecked: false },
  { id: 9, text: 'Giving away possessions', isChecked: false },
  { id: 10, text: 'Saying goodbye as if for the last time', isChecked: false },
];

const WarningSigns = () => {
  const [items, setItems] = useState(initialWarningSigns);
  
  // Calculate the checked count
  const checkedCount = items.filter(item => item.isChecked).length;
  const isWarning = checkedCount >= 3;

  // Function to toggle a checkbox
  const handleToggle = (id) => {
    setItems(currentItems =>
      currentItems.map(item =>
        item.id === id ? { ...item, isChecked: !item.isChecked } : item
      )
    );
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800">Crisis Warning Signs Checklist</h2>
      <p className="text-gray-600 mt-1 mb-6">
        Check any signs you've experienced recently. 
        {/* Conditional warning text */}
        {isWarning ? (
          <span className="font-bold text-red-600"> Please reach out for support immediately.</span>
        ) : (
          " If you check 3 or more, please reach out for support immediately."
        )}
      </p>

      {/* Checklist Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {items.map(item => (
          <ChecklistItem
            key={item.id}
            label={item.text}
            isChecked={item.isChecked}
            onToggle={() => handleToggle(item.id)}
          />
        ))}
      </div>

      {/* Footer with Counter and Call Button */}
      <div className="flex flex-col sm:flex-row justify-between items-center mt-8 gap-4">
        <p className={`text-lg font-semibold ${isWarning ? 'text-red-600' : 'text-gray-700'}`}>
          Checked signs: {checkedCount} / 10
        </p>
        
        <a 
          href="tel:988"
          className="flex items-center justify-center w-full sm:w-auto px-6 py-3 
                     bg-red-600 text-white font-bold rounded-lg 
                     shadow-md hover:bg-red-700 transition-colors"
        >
          <PhoneIcon className="w-5 h-5 mr-2" />
          Call 988 Crisis Line
        </a>
      </div>
    </div>
  );
};

export default WarningSigns;