import React from 'react';
import { UsersIcon, ClockIcon } from '@heroicons/react/24/outline'; 

const SupportGroupsPlaceholder = () => {

    const GroupCard = ({ title, description, members, lastActive, tag, tagColor }) => (
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-5 flex flex-col justify-between min-h-[180px]">
            <div>
                <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-gray-800">{title}</h3>
                    <span className={`px-3 py-1 text-xs font-medium rounded-full ${tagColor}`}>{tag}</span>
                </div>
                <p className="text-gray-600 mb-4">{description}</p>
            </div>
            
            <div>
                <div className="flex items-center text-sm text-gray-500 mb-3">
                    <UsersIcon className='w-4 h-4 mr-1' />
                    <span>{members.toLocaleString()} members</span>
                    <ClockIcon className='w-4 h-4 ml-4 mr-1' />
                    <span>Last active: {lastActive}</span>
                </div>
                <button className="w-full py-2 px-4 bg-violet-600 text-white font-semibold rounded-xl hover:bg-violet-700 transition-colors duration-200">
                    Join Group
                </button>
            </div>
        </div>
    );

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <GroupCard 
                title="Anxiety Support Circle"
                description="A safe space to share experiences and coping strategies for anxiety"
                members={1247}
                lastActive="5 min ago"
                tag="Anxiety"
                tagColor="bg-yellow-100 text-yellow-700"
            />
            <GroupCard 
                title="Depression Warriors"
                description="Supporting each other through the ups and downs of depression"
                members={892}
                lastActive="12 min ago"
                tag="Depression"
                tagColor="bg-red-100 text-red-700"
            />
            <GroupCard 
                title="Mindfulness Beginners"
                description="Learning mindfulness practices together, one breath at a time"
                members={350}
                lastActive="1 hour ago"
                tag="Mindfulness"
                tagColor="bg-green-100 text-green-700"
            />
            <GroupCard 
                title="Student Mental Health"
                description="Academic stress, social pressures, and mental wellbeing for students"
                members={2100}
                lastActive="30 min ago"
                tag="Students"
                tagColor="bg-blue-100 text-blue-700"
            />
        </div>
    );
};

export default SupportGroupsPlaceholder;