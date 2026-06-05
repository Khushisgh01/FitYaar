import React from 'react';

const EmojiButton = ({ emoji, onClick, isSelected }) => {
  const baseClasses = "flex items-center justify-center size-30 md:size-20 rounded-full border-2 transition-all duration-200 ease-in-out cursor-pointer";
  const selectedClasses = "border-blue-500 shadow-md"; // Example for when it's selected
  const defaultClasses = "border-gray-300 hover:border-blue-400"; // Default look

  return (
    <div
      className={`${baseClasses} ${isSelected ? selectedClasses : defaultClasses}`}
      onClick={onClick}
    >
      <span className="text-3xl md:text-4xl">
        {emoji}
      </span>
    </div>
  );
};

export default EmojiButton;