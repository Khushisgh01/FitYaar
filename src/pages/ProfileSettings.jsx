import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/ui/Sidebar';
import HeroSection from '../components/ui/heroSection';
import SettingsNavbar from '../components/ui/SettingsNavbar'; // NEW IMPORT

const ProfileSettings = () => {
    return (
        <div className='flex min-h-screen bg-gray-50'>
            <Sidebar initialActiveItem="Profile & Settings" />
            <div className='flex-1 p-8 overflow-y-auto'>
                
                {/* Header Section */}
                <div className='mb-8 text-left flex items-center gap-4'>
                    <span className="text-violet-600 text-4xl">👤</span>
                    <HeroSection 
                        heading="Profile & Settings" 
                        subheading="Customize your MindfulSpace experience" 
                    />
                </div>
                
                {/* Navigation Tabs (Preferences, Notifications, Privacy, About) */}
                <SettingsNavbar />
                
                {/* Content based on Route (Outlet) */}
                <div className="mt-8 p-6 bg-white rounded-2xl shadow-xl">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default ProfileSettings;