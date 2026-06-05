import React, { useState } from 'react';
import Sidebar from '../components/ui/Sidebar.jsx';
// Import new components and data
import SoundCard from '../components/ui/SoundCard.jsx';
import PresetCard from '../components/ui/PresetCard.jsx';
import FilterButton from '../components/ui/FilterButton.jsx';
import MasterControls from '../components/ui/MasterControls.jsx';
import { soundscapeData, presetData, tabs, filterCategories } from '../data/SoundscapeData.js';


const Soundscapes = () => {
  const [activeTab, setActiveTab] = useState('Soundscapes'); 
  const [selectedFilter, setSelectedFilter] = useState('All');
  
  const filteredSoundscapes = soundscapeData.filter(sound => {
    if (selectedFilter === 'All') return true;
    
    // Check if any of the sound's tags include the selected filter category (case-insensitive)
    return sound.tags.some(tag => tag.toLowerCase().includes(selectedFilter.toLowerCase()));
  });

  // Since initialIsPlaying is hardcoded as false in the data, playingCount will be 0.
  // In a real app, this count would come from global state.
  const playingCount = soundscapeData.filter(s => s.initialIsPlaying).length;


  return (
    <div className='flex min-h-screen bg-gray-50'>
      <Sidebar initialActiveItem="Soundscapes" /> 
      
      {/* Main Content Area */}
      <div className='flex-1 p-8 overflow-y-auto'> 
        
        {/* Header Section */}
        <div className='flex justify-between items-center mb-6'>
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Soundscapes & Audio</h1>
            <p className='text-gray-500'>Create your perfect ambient environment for focus, relaxation, and sleep</p>
          </div>
          <div className="flex items-center text-sm font-medium text-gray-600">
            <span className="mr-1">🎶</span>
            <span>{playingCount} playing</span>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className='flex border-b border-gray-200 mb-8'>
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-2 px-4 text-lg font-semibold transition-colors duration-200 ${
                activeTab === tab 
                  ? 'text-violet-600 border-b-2 border-violet-600' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* --- Dynamic Content based on Active Tab --- */}
        {activeTab === 'Soundscapes' && (
          <>
            <MasterControls />

            {/* Filter Buttons */}
            <div className="flex space-x-3 mb-8 overflow-x-auto">
              {filterCategories.map(cat => (
                <FilterButton 
                  key={cat}
                  category={cat}
                  selected={selectedFilter === cat}
                  onClick={setSelectedFilter}
                />
              ))}
            </div>

            {/* Soundscape Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredSoundscapes.map((sound, index) => (
                <SoundCard 
                  key={index}
                  title={sound.title}
                  description={sound.description}
                  duration={sound.duration}
                  tags={sound.tags}
                  initialIsPlaying={sound.initialIsPlaying}
                />
              ))}
            </div>
          </>
        )}

        {/* --- Presets Tab Content --- */}
        {activeTab === 'Presets' && (
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                {presetData.map((preset, index) => (
                    <PresetCard
                        key={index}
                        title={preset.title}
                        description={preset.description}
                        sounds={preset.sounds}
                    />
                ))}
             </div>
        )}

        {/* --- Mixer Tab Content Placeholder --- */}
        {activeTab === 'Mixer' && (
            <div className='bg-white rounded-2xl shadow-md p-6 text-center'>
                <h3 className='text-xl font-semibold text-gray-700'>Mixer Controls Coming Soon!</h3>
                <p className='text-gray-500 mt-2'>Create your own custom sound blends here.</p>
            </div>
        )}

      </div>
    </div>
  );
};

export default Soundscapes;