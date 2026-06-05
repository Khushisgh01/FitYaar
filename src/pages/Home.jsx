import React from 'react';
// 1. Import useNavigate to handle navigation
import { useNavigate } from 'react-router-dom';

// Your component imports
import HeroSection from '../components/ui/heroSection.jsx';
import MoodChecker from '../components/ui/moodChecker.jsx';
import Sidebar from '../components/ui/Sidebar.jsx';
import InsightfulThoughts from '../components/ui/insightfulThoughts.jsx';

const Home = () => {
  // 2. Initialize the navigate function
  const navigate = useNavigate();

  // 3. This function catches the mood from MoodChecker
  //    and navigates the user to the new entry page.
  const handleMoodSelectAndNavigate = (moodText, emojiChar) => {
    navigate('/journel/new-entry', { 
      state: {
        selectedMood: moodText,
        selectedEmoji: emojiChar
      } 
    });
  };

  return (
    <div className='flex bg-blue-50 min-h-screen'>
      <Sidebar /> 
      <div className='flex-1 p-8 bg-gray-50'> 
        
        {/* Header Section */}
        <div className='mb-8 text-center'> 
          <HeroSection heading="Good evening!" subheading="Welcome to your mindful space. How can we support you today?"/>
        </div>

        {/* Main Content Grid */}
        <div className='grid grid-cols-3 gap-6'>
          
          {/* MoodChecker (Spans 2 columns) */}
          <div className='col-span-2'>
            {/* 4. Pass the navigation function as a prop */}
            <MoodChecker onMoodSelect={handleMoodSelectAndNavigate} />
          </div>

          {/* Progress/Achievements (Spans 1 column) */}
          <div className='col-span-1 bg-white rounded-2xl shadow-md p-4'>
            <h3 className='text-xl font-semibold text-orange-500 mb-2'>🔥 Your Progress</h3>
            <div className='text-center'>
              <p className='text-5xl my-4 font-bold'>5</p>
              <p className='text-sm text-gray-500'>day streak</p>
              <div className='mt-4 p-3'>
                <h4 className='font-medium text-gray-700 mb-2'>Weekly Goal</h4>
                <div className='h-2 bg-gray-200 rounded-full mt-1'>
                  <div className='w-[70%] h-2 bg-purple-500 rounded-full'></div>
                </div>
                <p className='text-xs text-gray-500 mt-1'>5/7 days</p>
              </div>
            </div>
          </div>
          
          {/* Insightful Thoughts Section */}
          <div className='col-span-3'>
              <InsightfulThoughts /> 
          </div>

        </div>
      </div>
    </div>
  );
}

export default Home;