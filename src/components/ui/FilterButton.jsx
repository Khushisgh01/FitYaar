import React from 'react';

const FilterButton = ({ category, selected, onClick }) => (
  <button
    onClick={() => onClick(category)}
    className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors duration-200 
      ${selected 
        ? 'bg-violet-500 text-white shadow-md' 
        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
      }`}
  >
    {category}
  </button>
);

export default FilterButton;