// import React from 'react';
// import { NavLink } from 'react-router-dom';

// const TherapistNavbar = () => {
//   const basePath = "/find-therapist"; 

//   // Tailwind Class Strings
//   const baseClasses = "flex-1 text-center py-2 px-4 rounded-t-lg transition-colors duration-200 font-medium";
//   const activeClasses = "bg-white text-gray-900 border-b-4 border-violet-600 font-bold";
//   const inactiveClasses = "text-gray-600 hover:text-violet-600 hover:bg-gray-100 border-b-4 border-transparent";

//   return (
//     <nav className="w-full max-w-6xl mx-auto p-1 bg-gray-100 rounded-t-lg shadow-md">
//       <div className="flex justify-around items-center space-x-1">
        
//         {/* Find Therapists (Index Route) */}
//         <NavLink 
//           to={basePath} 
//           end 
//           className={({ isActive }) => 
//             `${baseClasses} ${isActive ? activeClasses : inactiveClasses}`
//           }
//         >
//           Find Therapists
//         </NavLink>

//         {/* Types of Therapy */}
//         <NavLink 
//           to={`${basePath}/types-of-therapy`}
//           className={({ isActive }) => 
//             `${baseClasses} ${isActive ? activeClasses : inactiveClasses}`
//           }
//         >
//           Types of Therapy
//         </NavLink>

//         {/* Insurance & Costs */}
//         <NavLink 
//           to={`${basePath}/insurance-costs`}
//           className={({ isActive }) => 
//             `${baseClasses} ${isActive ? activeClasses : inactiveClasses}`
//           }
//         >
//           Insurance & Costs
//         </NavLink>
//       </div>
//     </nav>
//   );
// };

// export default TherapistNavbar;
import React from 'react';
import { NavLink } from 'react-router-dom';

const TherapistNavbar = () => {
  const basePath = '/find-therapist';

  return (
    <>
      <style>{`
        .tn-wrap {
          display: inline-flex;
          gap: 4px;
          background: rgba(255,255,255,0.65);
          backdrop-filter: blur(16px);
          border: 1px solid rgba(255,255,255,0.8);
          border-radius: 20px;
          padding: 6px;
          box-shadow: 0 4px 24px rgba(0,0,0,0.06);
          margin-bottom: 28px;
        }
        .tn-link {
          padding: 10px 24px;
          border-radius: 14px;
          font-size: 0.875rem;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.22s;
          color: #6b6474;
          white-space: nowrap;
          font-family: 'Instrument Sans', sans-serif;
        }
        .tn-link:hover {
          background: rgba(124,58,237,0.08);
          color: #6b3fd4;
        }
        .tn-link.active {
          background: linear-gradient(135deg, #7c3aed, #9d5cf0);
          color: white !important;
          box-shadow: 0 4px 16px rgba(124,58,237,0.32);
        }
      `}</style>
      <nav className="tn-wrap">
        <NavLink
          to={basePath}
          end
          className={({ isActive }) => `tn-link${isActive ? ' active' : ''}`}
        >
          🔍 Find Therapists
        </NavLink>
        <NavLink
          to={`${basePath}/types-of-therapy`}
          className={({ isActive }) => `tn-link${isActive ? ' active' : ''}`}
        >
          🧠 Types of Therapy
        </NavLink>
        <NavLink
          to={`${basePath}/insurance-costs`}
          className={({ isActive }) => `tn-link${isActive ? ' active' : ''}`}
        >
          💳 Insurance & Costs
        </NavLink>
      </nav>
    </>
  );
};

export default TherapistNavbar;