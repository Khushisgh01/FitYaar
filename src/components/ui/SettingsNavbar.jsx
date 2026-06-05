import React from 'react';
import { NavLink } from 'react-router-dom';

const SettingsNavbar = () => {
  // Base path for the settings page, matching the route in App.jsx
  const basePath = "/profile-settings"; 

  // Tailwind Class Strings
  const baseClasses = "flex-1 text-center py-2 px-4 transition-colors duration-200 font-medium";
  const activeClasses = "text-violet-600 border-b-2 border-violet-600";
  const inactiveClasses = "text-gray-600 hover:text-gray-800";

  return (
    <nav className="w-full max-w-6xl mx-auto">
      <div className="flex justify-start items-center space-x-8 border-b border-gray-200">
        
        {/* Preferences (Index Route) */}
        <NavLink 
          to={basePath} 
          end 
          className={({ isActive }) => 
            `${baseClasses} ${isActive ? activeClasses : inactiveClasses}`
          }
        >
          <span className="mr-2">⚙️</span> Preferences
        </NavLink>

        {/* Notifications */}
        <NavLink 
          to={`${basePath}/notifications`}
          className={({ isActive }) => 
            `${baseClasses} ${isActive ? activeClasses : inactiveClasses}`
          }
        >
          <span className="mr-2">🔔</span> Notifications
        </NavLink>

        {/* Privacy */}
        <NavLink 
          to={`${basePath}/privacy`}
          className={({ isActive }) => 
            `${baseClasses} ${isActive ? activeClasses : inactiveClasses}`
          }
        >
          <span className="mr-2">🛡️</span> Privacy
        </NavLink>

        {/* About */}
        <NavLink 
          to={`${basePath}/about`}
          className={({ isActive }) => 
            `${baseClasses} ${isActive ? activeClasses : inactiveClasses}`
          }
        >
          <span className="mr-2">ℹ️</span> About
        </NavLink>
      </div>
    </nav>
  );
};

export default SettingsNavbar;