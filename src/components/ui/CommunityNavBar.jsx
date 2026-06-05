import React from 'react';
import { NavLink } from 'react-router-dom';

const CommunityNavBar = () => {
  const baseClasses = "flex-1 text-center py-2 px-4 rounded-full transition-colors duration-200 font-medium";
  const activeClasses = "bg-white text-gray-900 shadow-md";
  const inactiveClasses = "text-gray-600 hover:bg-gray-200";

  return (
    <nav className="w-full max-w-6xl mx-auto p-1 bg-gray-100 rounded-full">
      <div className="flex justify-around items-center space-x-1">
        
        {/* Community Feed (Index Route) */}
        <NavLink 
          to="/community-support" 
          end 
          className={({ isActive }) => 
            `${baseClasses} ${isActive ? activeClasses : inactiveClasses}`
          }
        >
          Community Feed
        </NavLink>

        {/* Support Groups */}
        <NavLink 
          to="/community-support/support-groups"
          className={({ isActive }) => 
            `${baseClasses} ${isActive ? activeClasses : inactiveClasses}`
          }
        >
          Support Groups
        </NavLink>

        {/* Weekly Topics */}
        <NavLink 
          to="/community-support/weekly-topics"
          className={({ isActive }) => 
            `${baseClasses} ${isActive ? activeClasses : inactiveClasses}`
          }
        >
          Weekly Topics
        </NavLink>

        {/* Guidelines */}
        <NavLink 
          to="/community-support/guidelines"
          className={({ isActive }) => 
            `${baseClasses} ${isActive ? activeClasses : inactiveClasses}`
          }
        >
          Guidelines
        </NavLink>
      </div>
    </nav>
  );
};

export default CommunityNavBar;