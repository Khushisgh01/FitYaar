import React, { useState } from 'react';

const MasterControls = () => {
  // 1. Initialize state for Volume (0 to 100) and Timer (15 to 120 minutes)
  // Sliders return strings, so the state is managed as strings.
  const [volume, setVolume] = useState("70");
  const [timer, setTimer] = useState("30");

  return (
    <div className='bg-white rounded-2xl shadow-md p-6 mb-8'>
      <h3 className='text-lg font-semibold text-gray-700 mb-4'>🔊 Master Controls</h3>
      <div className='space-y-4'>
        {/* Volume Slider */}
        <div className='flex items-center'>
          <span className='mr-4 text-2xl text-gray-500'>🔊</span>
          <input 
            type="range" 
            min="0" 
            max="100" 
            value={volume} // Use state value
            onChange={(e) => setVolume(e.target.value)} // Update state on change
            className="flex-1 h-2 bg-violet-500 rounded-full appearance-none cursor-pointer" 
          />
          <span className='ml-4 text-gray-600'>{volume}%</span> {/* Display state value */}
        </div>
        
        {/* Timer Control */}
        <div className='flex items-center'>
          <span className='mr-4 text-2xl text-gray-500'>⏱️</span>
          <input 
            type="range" 
            min="15" 
            max="120" 
            step="5" // Added step="5" for smoother minute control
            value={timer} // Use state value
            onChange={(e) => setTimer(e.target.value)} // Update state on change
            className="flex-1 h-2 bg-violet-500 rounded-full appearance-none cursor-pointer" 
          />
          <span className='ml-4 text-gray-600'>{timer} min</span> {/* Display state value */}
          <button className="ml-6 py-2 px-4 bg-violet-500 text-white font-semibold rounded-xl hover:bg-violet-700 transition-colors duration-200">
            Start Timer
          </button>
        </div>
      </div>
    </div>
  );
};

export default MasterControls;