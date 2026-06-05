// import React from 'react';

// // Data for the insightful thoughts cards
// const thoughtsData = [
//   {
//     icon: '🧘',
//     title: 'Practice Mindfulness',
//     description: 'Pause for one minute to notice five things you can see, four things you can touch, three things you can hear, two things you can smell, and one thing you can taste.',
//     color: 'bg-green-100'
//   },
//   {
//     icon: '💧',
//     title: 'Stay Hydrated',
//     description: 'Remember that physical health directly impacts mental clarity. Drinking enough water can reduce fatigue and improve focus.',
//     color: 'bg-blue-100'
//   },
//   {
//     icon: '🚫',
//     title: 'Limit Comparison',
//     description: 'Social media highlights are not reality. Focus on your own journey, progress, and growth rather than comparing yourself to others.',
//     color: 'bg-red-100'
//   },
//   {
//     icon: '😴',
//     title: 'Prioritize Sleep',
//     description: 'Ensure you get 7-9 hours of quality sleep. It is essential for emotional regulation and cognitive function.',
//     color: 'bg-purple-100'
//   }
// ];

// // Updated InsightCard component to make the icon/emoji larger
// const InsightCard = ({ icon, title, description, color }) => (
//   <div className="flex flex-col bg-white rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
//     {/* Increased the size of the icon container and the text size for a larger visual focus */}
//     <div className={`p-4 w-20 h-20 flex items-center justify-center rounded-full self-start ${color} mb-4`}>
//       <span className="text-4xl">{icon}</span> 
//     </div>
//     <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
//     <p className="text-base text-gray-600">{description}</p>
//   </div>
// );

// const InsightfulThoughts = () => {
//   return (
//     <div className='bg-white rounded-2xl shadow-md p-6'>
//       <h2 className='text-3xl font-bold mb-6 text-gray-800'>🧠 Insightful Thoughts</h2>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
//         {thoughtsData.map((thought, index) => (
//           <InsightCard 
//             key={index}
//             icon={thought.icon}
//             title={thought.title}
//             description={thought.description}
//             color={thought.color}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default InsightfulThoughts;
import React from 'react';

// --- SVG Components (Visual Placeholders for Images) ---
// Note: These SVGs replace the emojis for a more graphical look.
const MeditationIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-green-600">
    <circle cx="12" cy="7" r="3" fill="currentColor"/>
    <path fillRule="evenodd" clipRule="evenodd" d="M15 11.5C15 10.9477 14.5523 10.5 14 10.5H10C9.44772 10.5 9 10.9477 9 11.5V13.5C9 14.0523 9.44772 14.5 10 14.5H14C14.5523 14.5 15 14.0523 15 13.5V11.5Z" fill="currentColor"/>
    <path d="M18 15C18 15.5523 17.5523 16 17 16H7C6.44772 16 6 15.5523 6 15V11C6 10.4477 6.44772 10 7 10H17C17.5523 10 18 10.4477 18 11V15Z" fill="currentColor" opacity="0.3"/>
    <rect x="5" y="14" width="14" height="8" rx="4" fill="currentColor" opacity="0.1"/>
  </svg>
);

const WaterDropIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-blue-600">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C7.58172 2 4 5.58172 4 10C4 16 12 22 12 22C12 22 20 16 20 10C20 5.58172 16.4183 2 12 2ZM12 16C10.8954 16 10 15.1046 10 14C10 12.8954 12 10 12 10C12 10 14 12.8954 14 14C14 15.1046 13.1046 16 12 16Z" fill="currentColor"/>
  </svg>
);

const NoComparisonIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-red-600">
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none"/>
    <path d="M15 9L9 15" stroke="currentColor" strokeWidth="2"/>
    <path d="M9 9L15 15" stroke="currentColor" strokeWidth="2" opacity="0.3"/>
    <path d="M2 2L22 22" stroke="currentColor" strokeWidth="2"/>
  </svg>
);

const SleepIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-purple-600">
    <path d="M12 2C16.4183 2 20 5.58172 20 10C20 11.7584 19.4182 13.3986 18.4419 14.7335C16.9234 14.881 15.1979 15 12 15C8.80205 15 7.07663 14.881 5.55806 14.7335C4.58178 13.3986 4 11.7584 4 10C4 5.58172 7.58172 2 12 2Z" fill="currentColor"/>
    <path d="M12 15V22M10 20L12 22L14 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// Data mapping the thought to its corresponding SVG component
const thoughtsData = [
  {
    iconComponent: <MeditationIcon />,
    title: 'Practice Mindfulness',
    description: 'Pause for one minute to notice five things you can see, four things you can touch, three things you can hear, two things you can smell, and one thing you can taste.',
    color: 'bg-green-100/50' // Lighter background for less contrast
  },
  {
    iconComponent: <WaterDropIcon />,
    title: 'Stay Hydrated',
    description: 'Remember that physical health directly impacts mental clarity. Drinking enough water can reduce fatigue and improve focus.',
    color: 'bg-blue-100/50'
  },
  {
    iconComponent: <NoComparisonIcon />,
    title: 'Limit Comparison',
    description: 'Social media highlights are not reality. Focus on your own journey, progress, and growth rather than comparing yourself to others.',
    color: 'bg-red-100/50'
  },
  {
    iconComponent: <SleepIcon />,
    title: 'Prioritize Sleep',
    description: 'Ensure you get 7-9 hours of quality sleep. It is essential for emotional regulation and cognitive function.',
    color: 'bg-purple-100/50'
  }
];

// Updated InsightCard component with top/bottom section split
const InsightCard = ({ iconComponent, title, description, color }) => (
  <div className="flex flex-col bg-white rounded-2xl shadow-lg transition-all duration-300 hover:shadow-xl overflow-hidden min-h-[300px]">
    
    {/* Upper Half: Image/Icon Section */}
    <div className={`flex items-center justify-center p-6 flex-grow-[0.8] ${color}`}>
      {/* Container for the SVG to ensure it's large and centered */}
      <div className="w-24 h-24 p-2 bg-white rounded-full flex items-center justify-center shadow-inner">
        {iconComponent} 
      </div>
    </div>
    
    {/* Lower Half: Text/Description Section */}
    <div className="p-5 flex flex-col justify-end flex-grow-[1]">
      <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  </div>
);

const InsightfulThoughts = () => {
  return (
    <div className='bg-white rounded-2xl shadow-md p-6'>
      <h2 className='text-3xl font-bold mb-6 text-gray-800'>🧠 Insightful Thoughts</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {thoughtsData.map((thought, index) => (
          <InsightCard 
            key={index}
            iconComponent={thought.iconComponent} // Pass the component, not the emoji
            title={thought.title}
            description={thought.description}
            color={thought.color}
          />
        ))}
      </div>
    </div>
  );
};

export default InsightfulThoughts;
