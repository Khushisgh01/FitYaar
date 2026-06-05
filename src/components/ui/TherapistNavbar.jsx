import React from 'react';
import { NavLink } from 'react-router-dom';

const TherapistNavbar = () => {
  const basePath = "/find-therapist"; 

  // Tailwind Class Strings
  const baseClasses = "flex-1 text-center py-2 px-4 rounded-t-lg transition-colors duration-200 font-medium";
  const activeClasses = "bg-white text-gray-900 border-b-4 border-violet-600 font-bold";
  const inactiveClasses = "text-gray-600 hover:text-violet-600 hover:bg-gray-100 border-b-4 border-transparent";

  return (
    <nav className="w-full max-w-6xl mx-auto p-1 bg-gray-100 rounded-t-lg shadow-md">
      <div className="flex justify-around items-center space-x-1">
        
        {/* Find Therapists (Index Route) */}
        <NavLink 
          to={basePath} 
          end 
          className={({ isActive }) => 
            `${baseClasses} ${isActive ? activeClasses : inactiveClasses}`
          }
        >
          Find Therapists
        </NavLink>

        {/* Types of Therapy */}
        <NavLink 
          to={`${basePath}/types-of-therapy`}
          className={({ isActive }) => 
            `${baseClasses} ${isActive ? activeClasses : inactiveClasses}`
          }
        >
          Types of Therapy
        </NavLink>

        {/* Insurance & Costs */}
        <NavLink 
          to={`${basePath}/insurance-costs`}
          className={({ isActive }) => 
            `${baseClasses} ${isActive ? activeClasses : inactiveClasses}`
          }
        >
          Insurance & Costs
        </NavLink>
      </div>
    </nav>
  );
};

export default TherapistNavbar;