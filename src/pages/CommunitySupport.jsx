import React from 'react';
import Sidebar from '../components/ui/Sidebar';
import HeroSection from '../components/ui/heroSection';
import CommunityNavBar from '../components/ui/CommunityNavBar';
import CommunityFeedPlaceholder from '../components/ui/CommunityFeedPlaceholder'; 
import SupportGroupsPlaceholder from '../components/ui/SupportGroupsPlaceholder';
import WeeklyTopicsPlaceholder from '../components/ui/WeeklyTopicsPlaceholder';
import GuidelinesContent from '../components/ui/GuidelinesContent';
import { Outlet } from 'react-router-dom';

const CommunitySupport = () => {
    return (
        <div className='flex min-h-screen bg-gray-50'>
            <Sidebar initialActiveItem="Community Support" /> 
            <div className='flex-1 p-8 overflow-y-auto'>
                
                {/* Header */}
                <div className='mb-8 text-center'>
                    <HeroSection 
                        heading="Community Support" 
                        subheading="Connect with others on similar journeys. Share encouragement, coping strategies, and celebrate progress together in our safe, moderated space." 
                    />
                </div>
                
                {/* Navigation Tabs */}
                <CommunityNavBar />
                
                {/* Content based on Route (Outlet) */}
                <div className="mt-8 p-6 bg-white rounded-2xl shadow-xl">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default CommunitySupport;