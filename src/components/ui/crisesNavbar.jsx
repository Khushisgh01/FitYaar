import React from 'react';
import { NavLink } from 'react-router-dom';

const CrisesNavBar = () => {

  // --- Tailwind Class Strings ---
  const baseClasses = "flex-1 text-center py-2 px-4 rounded-full transition-colors duration-200 font-medium";
  const activeClasses = "bg-white text-gray-900 shadow-md";
  const inactiveClasses = "text-gray-600 hover:bg-gray-200";

  return (
    <nav className="w-full max-w-6xl mx-auto p-1 bg-gray-100 rounded-full">
      <div className="flex justify-around items-center space-x-1">
        
        {/* Crisis Lines (Index Route) */}
        <NavLink 
          to="/crises-support" // This is the base path
          end 
          className={({ isActive }) => 
            `${baseClasses} ${isActive ? activeClasses : inactiveClasses}`
          }
        >
          Crisis Lines
        </NavLink>

        {/* --- FIXED LINKS --- */}
        {/* Immediate Help */}
        <NavLink 
          to="/crises-support/immediate-help" // Was /crisis/immediate-help
          className={({ isActive }) => 
            `${baseClasses} ${isActive ? activeClasses : inactiveClasses}`
          }
        >
          Immediate Help
        </NavLink>

        {/* Warning Signs */}
        <NavLink 
          to="/crises-support/warning-signs" // Was /crisis/warning-signs
          className={({ isActive }) => 
            `${baseClasses} ${isActive ? activeClasses : inactiveClasses}`
          }
        >
          Warning Signs
        </NavLink>

        {/* Safety Plan */}
        <NavLink 
          to="/crises-support/safety-plan" // Was /crisis/safety-plan
          className={({ isActive }) => 
            `${baseClasses} ${isActive ? activeClasses : inactiveClasses}`
          }
        >
          Safety Plan
        </NavLink>
        
      </div>
    </nav>
  );
};

export default CrisesNavBar;