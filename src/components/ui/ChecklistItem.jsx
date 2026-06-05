import React from 'react';

const ChecklistItem = ({ label, isChecked, onToggle }) => {
  return (
    // The wrapper div makes the whole area clickable
    <div
      onClick={onToggle}
      className="flex items-center p-4 bg-white border border-gray-200 
                 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
    >
      <input
        type="checkbox"
        checked={isChecked}
        onChange={onToggle} // Ensures it's accessible and works with keyboard
        className="w-5 h-5 text-violet-600 border-gray-300 rounded 
                   focus:ring-violet-500 focus:ring-2"
      />
      <label className="ml-3 text-gray-700 select-none">
        {label}
      </label>
    </div>
  );
};

export default ChecklistItem;