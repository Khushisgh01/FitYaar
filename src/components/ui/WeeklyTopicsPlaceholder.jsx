import React from 'react';
import { LightBulbIcon } from '@heroicons/react/24/outline'; 

const WeeklyTopicsPlaceholder = () => {

    const TopicCard = ({ period, title, description, participants, icon }) => (
        <div className="bg-white rounded-lg border border-gray-200 shadow-md p-6 mb-6">
            <div className="flex justify-between items-start mb-4">
                <span className="px-3 py-1 text-xs font-semibold rounded-full bg-gray-200 text-gray-700">{period}</span>
                <p className="text-4xl font-bold text-gray-800">{participants}</p>
            </div>
            
            <div className="flex items-center mb-2">
                <span className="text-xl mr-2">{icon}</span>
                <h3 className="text-xl font-bold text-gray-800">{title}</h3>
            </div>
            <p className="text-gray-600 mb-4">{description}</p>

            <div className="flex justify-end items-center">
                <p className="text-sm text-gray-500 mr-4">participants</p>
                <button className="py-2 px-6 bg-violet-600 text-white font-semibold rounded-xl hover:bg-violet-700 transition-colors duration-200">
                    Join Discussion
                </button>
            </div>
        </div>
    );

    return (
        <div className="space-y-6 max-w-xl mx-auto">
            {/* Current Week Topic (Based on image_29f058.png) */}
            <div className="bg-violet-50 rounded-lg shadow-lg p-6">
                <div className="flex justify-between items-start mb-4">
                    <span className="px-3 py-1 text-xs font-semibold rounded-full bg-violet-200 text-violet-700">This Week</span>
                    <p className="text-4xl font-bold text-gray-800">234</p>
                </div>
                
                <div className="flex items-center mb-2">
                    <LightBulbIcon className="w-5 h-5 mr-2 text-violet-600" />
                    <h3 className="text-xl font-bold text-gray-800">Self-Compassion</h3>
                </div>
                <p className="text-gray-600 mb-6">Treating yourself with the same kindness you'd show a good friend</p>

                <div className="text-right">
                    <button className="w-full py-3 px-6 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition-colors duration-200">
                        Join Discussion
                    </button>
                </div>
            </div>

            {/* Last Week Topic */}
            <TopicCard 
                period="Last Week"
                title="Gratitude Practice"
                description="Focusing on the good things in life, no matter how small, to boost mood"
                participants={189}
                icon="🙏"
            />
            
            {/* Upcoming Topic */}
            <TopicCard 
                period="Next Week"
                title="Setting Healthy Boundaries"
                description="Learning how to say no and protect your emotional energy"
                participants={0}
                icon="🔒"
            />
        </div>
    );
};

export default WeeklyTopicsPlaceholder;