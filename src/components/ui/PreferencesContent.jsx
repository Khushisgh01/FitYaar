import React, { useState } from 'react';

const ToggleSwitch = ({ isChecked, onToggle }) => (
    <button 
        onClick={onToggle}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${isChecked ? 'bg-violet-600' : 'bg-gray-200'}`}
    >
        <span 
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${isChecked ? 'translate-x-6' : 'translate-x-1'}`}
        />
    </button>
);

const PreferencesContent = () => {
    // State to simulate settings management
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [soundEffects, setSoundEffects] = useState(true);
    const [reminderTime, setReminderTime] = useState('9:00 AM');
    const [checkInFrequency, setCheckInFrequency] = useState('Daily');

    // Simple placeholder for Dark Mode button
    const DarkModeButton = () => (
        <button className="px-3 py-1 text-sm font-medium rounded-full border border-gray-300 text-gray-700 bg-white">
            <span className="mr-1">🌙</span> Dark
        </button>
    );

    // Simple placeholder for dropdowns
    const DropdownPlaceholder = ({ value }) => (
        <div className="flex items-center text-gray-700">
            <span>{value}</span>
            <span className="ml-2 text-gray-400">🔽</span>
        </div>
    );

    return (
        <div className="space-y-8">
            
            {/* Appearance Section */}
            <div className="p-4 bg-gray-50 rounded-xl">
                <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                    <span className="text-xl mr-2">✨</span> Appearance
                </h3>

                {/* Dark Mode */}
                <div className="flex justify-between items-center py-4 border-b border-gray-200">
                    <div>
                        <p className="font-semibold text-gray-700">Dark Mode</p>
                        <p className="text-sm text-gray-500">Toggle between light and dark themes</p>
                    </div>
                    <DarkModeButton />
                </div>
            </div>

            {/* General Preferences Section */}
            <div className="p-4 bg-gray-50 rounded-xl">
                <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                    <span className="text-xl mr-2">⚙️</span> General Preferences
                </h3>

                {/* Sound Effects */}
                <div className="flex justify-between items-center py-4 border-b border-gray-200">
                    <div>
                        <p className="font-semibold text-gray-700">Sound Effects</p>
                        <p className="text-sm text-gray-500">Play sounds for notifications and interactions</p>
                    </div>
                    <ToggleSwitch isChecked={soundEffects} onToggle={() => setSoundEffects(!soundEffects)} />
                </div>

                {/* Daily Reminder Time */}
                <div className="flex justify-between items-center py-4 border-b border-gray-200">
                    <div>
                        <p className="font-semibold text-gray-700">Daily Reminder Time</p>
                    </div>
                    <DropdownPlaceholder value={reminderTime} />
                </div>
                
                {/* Check-in Frequency */}
                <div className="flex justify-between items-center py-4">
                    <div>
                        <p className="font-semibold text-gray-700">Check-in Frequency</p>
                    </div>
                    <DropdownPlaceholder value={checkInFrequency} />
                </div>
            </div>
            
            {/* Save Button Placeholder */}
            <div className='text-center pt-4'>
                <button 
                    className="px-8 py-3 bg-violet-600 text-white font-semibold rounded-lg 
                                 shadow-md hover:bg-violet-700 transition-colors"
                >
                    Save Changes
                </button>
            </div>
        </div>
    );
};

export default PreferencesContent;