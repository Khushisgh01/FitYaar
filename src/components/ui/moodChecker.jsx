import React from 'react';
import EmojiButton from './emoji'; // Adjust path if needed

// 1. Accept the onMoodSelect prop from Home.js
const MoodChecker = ({ onMoodSelect }) => {

  const handleMoodClick = (moodText, emojiChar) => {
    // 2. Call the prop, which will trigger the navigation
    onMoodSelect(moodText, emojiChar);
  };

  return (
    <div className='text-center mb-4 bg-white rounded-2xl shadow-md'>
      <h2 className='text-2xl font-semibold mb-4 pt-4'>How are you feeling today?</h2>
      <p>Select your current mood</p>
      <div className="flex flex-wrap justify-center gap-4 p-4">
        
        {/* 3. Each button now just calls handleMoodClick */}
        <EmojiButton 
          emoji="😢" 
          onClick={() => handleMoodClick('Very-Sad', '😢')} 
        />
        
        <EmojiButton 
          emoji="😊" 
          onClick={() => handleMoodClick('Happy', '😊')} 
        />

        <EmojiButton 
          emoji="😠" 
          onClick={() => handleMoodClick('Angry', '😠')} 
        />
        <EmojiButton 
          emoji="😐" 
          onClick={() => handleMoodClick('Neutral', '😐')} 
        />
        <EmojiButton 
          emoji="😞" 
          onClick={() => handleMoodClick('Sad', '😞')} 
        />
      </div>
      {/* We don't need the <p> tag showing the mood, 
          since we are navigating away immediately. */}
    </div>
  );
};

export default MoodChecker;