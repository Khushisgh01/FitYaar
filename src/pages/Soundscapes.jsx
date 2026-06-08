// // import React, { useState } from 'react';
// // import Sidebar from '../components/ui/Sidebar.jsx';
// // // Import new components and data
// // import SoundCard from '../components/ui/SoundCard.jsx';
// // import PresetCard from '../components/ui/PresetCard.jsx';
// // import FilterButton from '../components/ui/FilterButton.jsx';
// // import MasterControls from '../components/ui/MasterControls.jsx';
// // import { soundscapeData, presetData, tabs, filterCategories } from '../data/SoundscapeData.js';


// // const Soundscapes = () => {
// //   const [activeTab, setActiveTab] = useState('Soundscapes'); 
// //   const [selectedFilter, setSelectedFilter] = useState('All');
  
// //   const filteredSoundscapes = soundscapeData.filter(sound => {
// //     if (selectedFilter === 'All') return true;
    
// //     // Check if any of the sound's tags include the selected filter category (case-insensitive)
// //     return sound.tags.some(tag => tag.toLowerCase().includes(selectedFilter.toLowerCase()));
// //   });

// //   // Since initialIsPlaying is hardcoded as false in the data, playingCount will be 0.
// //   // In a real app, this count would come from global state.
// //   const playingCount = soundscapeData.filter(s => s.initialIsPlaying).length;


// //   return (
// //     <div className='flex min-h-screen bg-gray-50'>
// //       <Sidebar initialActiveItem="Soundscapes" /> 
      
// //       {/* Main Content Area */}
// //       <div className='flex-1 p-8 overflow-y-auto'> 
        
// //         {/* Header Section */}
// //         <div className='flex justify-between items-center mb-6'>
// //           <div>
// //             <h1 className="text-3xl font-bold text-gray-800">Soundscapes & Audio</h1>
// //             <p className='text-gray-500'>Create your perfect ambient environment for focus, relaxation, and sleep</p>
// //           </div>
// //           <div className="flex items-center text-sm font-medium text-gray-600">
// //             <span className="mr-1">🎶</span>
// //             <span>{playingCount} playing</span>
// //           </div>
// //         </div>

// //         {/* Tab Navigation */}
// //         <div className='flex border-b border-gray-200 mb-8'>
// //           {tabs.map(tab => (
// //             <button
// //               key={tab}
// //               onClick={() => setActiveTab(tab)}
// //               className={`py-2 px-4 text-lg font-semibold transition-colors duration-200 ${
// //                 activeTab === tab 
// //                   ? 'text-violet-600 border-b-2 border-violet-600' 
// //                   : 'text-gray-500 hover:text-gray-700'
// //               }`}
// //             >
// //               {tab}
// //             </button>
// //           ))}
// //         </div>

// //         {/* --- Dynamic Content based on Active Tab --- */}
// //         {activeTab === 'Soundscapes' && (
// //           <>
// //             <MasterControls />

// //             {/* Filter Buttons */}
// //             <div className="flex space-x-3 mb-8 overflow-x-auto">
// //               {filterCategories.map(cat => (
// //                 <FilterButton 
// //                   key={cat}
// //                   category={cat}
// //                   selected={selectedFilter === cat}
// //                   onClick={setSelectedFilter}
// //                 />
// //               ))}
// //             </div>

// //             {/* Soundscape Grid */}
// //             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// //               {filteredSoundscapes.map((sound, index) => (
// //                 <SoundCard 
// //                   key={index}
// //                   title={sound.title}
// //                   description={sound.description}
// //                   duration={sound.duration}
// //                   tags={sound.tags}
// //                   initialIsPlaying={sound.initialIsPlaying}
// //                 />
// //               ))}
// //             </div>
// //           </>
// //         )}

// //         {/* --- Presets Tab Content --- */}
// //         {activeTab === 'Presets' && (
// //              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
// //                 {presetData.map((preset, index) => (
// //                     <PresetCard
// //                         key={index}
// //                         title={preset.title}
// //                         description={preset.description}
// //                         sounds={preset.sounds}
// //                     />
// //                 ))}
// //              </div>
// //         )}

// //         {/* --- Mixer Tab Content Placeholder --- */}
// //         {activeTab === 'Mixer' && (
// //             <div className='bg-white rounded-2xl shadow-md p-6 text-center'>
// //                 <h3 className='text-xl font-semibold text-gray-700'>Mixer Controls Coming Soon!</h3>
// //                 <p className='text-gray-500 mt-2'>Create your own custom sound blends here.</p>
// //             </div>
// //         )}

// //       </div>
// //     </div>
// //   );
// // };

// // export default Soundscapes;
// import React, { useEffect, useRef } from 'react';
// import { gsap } from 'gsap';
// import Sidebar from '../components/ui/Sidebar.jsx';
// import SoundCard from '../components/ui/SoundCard.jsx';
// import FilterButton from '../components/ui/FilterButton.jsx';
// import { soundscapeData, filterCategories } from '../data/SoundscapeData.js';

// const Soundscapes = () => {
//   const [selectedFilter, setSelectedFilter] = React.useState('All');
//   const heroRef = useRef(null);

//   // Apply entrance animation similar to Home page
//   useEffect(() => {
//     gsap.fromTo(heroRef.current, 
//       { opacity: 0, y: 30 }, 
//       { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
//     );
//   }, []);

//   const filteredSoundscapes = soundscapeData.filter(sound => {
//     if (selectedFilter === 'All') return true;
//     return sound.tags.some(tag => tag.toLowerCase().includes(selectedFilter.toLowerCase()));
//   });

//   return (
//     <div className='home-root'>
//       <Sidebar initialActiveItem="Soundscapes" />
      
//       <div className="home-main">
//         {/* Styled Hero Section to match Home.jsx */}
//         <div className="hero-section" ref={heroRef}>
//           <h1 className="hero-title">Soundscapes</h1>
//           <p className="hero-sub">
//             Create your perfect ambient environment. Select a sound to begin your journey to inner peace.
//           </p>
//         </div>

//         {/* Filter Buttons */}
//         <div className="flex space-x-3 mb-10 overflow-x-auto">
//           {filterCategories.map(cat => (
//             <FilterButton 
//               key={cat}
//               category={cat}
//               selected={selectedFilter === cat}
//               onClick={setSelectedFilter}
//             />
//           ))}
//         </div>

//         {/* Soundscape Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {filteredSoundscapes.map((sound, index) => (
//             <SoundCard 
//               key={index}
//               {...sound}
//             />
//           ))}
//         </div>
//       </div>

//       {/* Injecting shared styles for consistency */}
//       <style>{`
//         .home-root { min-height: 100vh; background: var(--bg-primary); padding-left: 80px; }
//         .home-main { padding: 44px 52px 60px 52px; max-width: 1440px; margin: 0 auto; }
//         .hero-section { padding-bottom: 44px; border-bottom: 1px solid var(--border-primary); margin-bottom: 40px; }
//         .hero-title { font-family: 'Sora', sans-serif; font-size: 3.5rem; font-weight: 800; color: var(--hero-title-color); margin-bottom: 18px; }
//         .hero-sub { font-size: 1.1rem; color: var(--hero-sub-color); max-width: 540px; }
//       `}</style>
//     </div>
//   );
// };

// export default Soundscapes;
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import Sidebar from '../components/ui/Sidebar.jsx';
import SoundCard from '../components/ui/SoundCard.jsx';
import FilterButton from '../components/ui/FilterButton.jsx';
import { soundscapeData, filterCategories } from '../data/SoundscapeData.js';

const Soundscapes = () => {
  const [selectedFilter, setSelectedFilter] = React.useState('All');
  const heroRef = useRef(null);

  // Apply entrance animation similar to Home page
  useEffect(() => {
    gsap.fromTo(heroRef.current, 
      { opacity: 0, y: 30 }, 
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
    );
  }, []);

  const filteredSoundscapes = soundscapeData.filter(sound => {
    if (selectedFilter === 'All') return true;
    return sound.tags.some(tag => tag.toLowerCase().includes(selectedFilter.toLowerCase()));
  });

  return (
    <div className='home-root'>
      <Sidebar initialActiveItem="Soundscapes" />
      
      <div className="home-main">
        {/* Styled Hero Section */}
        <div className="hero-section" ref={heroRef}>
          <h1 className="hero-title">Soundscapes</h1>
          <p className="hero-sub">
            Create your perfect ambient environment. Select a sound to begin your journey to inner peace.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex space-x-3 mb-10 overflow-x-auto">
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
              audioFile={sound.audioFile} 
            />
          ))}
        </div>
      </div>

      {/* Shared styles */}
      <style>{`
        .home-root { min-height: 100vh; background: var(--bg-primary); padding-left: 80px; }
        .home-main { padding: 44px 52px 60px 52px; max-width: 1440px; margin: 0 auto; }
        .hero-section { padding-bottom: 44px; border-bottom: 1px solid var(--border-primary); margin-bottom: 40px; }
        .hero-title { font-family: 'Sora', sans-serif; font-size: 3.5rem; font-weight: 800; color: var(--hero-title-color); margin-bottom: 18px; }
        .hero-sub { font-size: 1.1rem; color: var(--hero-sub-color); max-width: 540px; }
      `}</style>
    </div>
  );
};

export default Soundscapes;