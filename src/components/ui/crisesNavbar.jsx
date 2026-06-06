// import React from 'react';
// import { NavLink } from 'react-router-dom';

// const CrisesNavBar = () => {

//   // --- Tailwind Class Strings ---
//   const baseClasses = "flex-1 text-center py-2 px-4 rounded-full transition-colors duration-200 font-medium";
//   const activeClasses = "bg-white text-gray-900 shadow-md";
//   const inactiveClasses = "text-gray-600 hover:bg-gray-200";

//   return (
//     <nav className="w-full max-w-6xl mx-auto p-1 bg-gray-100 rounded-full">
//       <div className="flex justify-around items-center space-x-1">
        
//         {/* Crisis Lines (Index Route) */}
//         <NavLink 
//           to="/crises-support" // This is the base path
//           end 
//           className={({ isActive }) => 
//             `${baseClasses} ${isActive ? activeClasses : inactiveClasses}`
//           }
//         >
//           Crisis Lines
//         </NavLink>

//         {/* --- FIXED LINKS --- */}
//         {/* Immediate Help */}
//         <NavLink 
//           to="/crises-support/immediate-help" // Was /crisis/immediate-help
//           className={({ isActive }) => 
//             `${baseClasses} ${isActive ? activeClasses : inactiveClasses}`
//           }
//         >
//           Immediate Help
//         </NavLink>

//         {/* Warning Signs */}
//         <NavLink 
//           to="/crises-support/warning-signs" // Was /crisis/warning-signs
//           className={({ isActive }) => 
//             `${baseClasses} ${isActive ? activeClasses : inactiveClasses}`
//           }
//         >
//           Warning Signs
//         </NavLink>

//         {/* Safety Plan */}
//         <NavLink 
//           to="/crises-support/safety-plan" // Was /crisis/safety-plan
//           className={({ isActive }) => 
//             `${baseClasses} ${isActive ? activeClasses : inactiveClasses}`
//           }
//         >
//           Safety Plan
//         </NavLink>
        
//       </div>
//     </nav>
//   );
// };

// export default CrisesNavBar;
import React from 'react';
import { NavLink } from 'react-router-dom';

const CrisesNavBar = () => (
  <>
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Instrument+Sans:wght@500;600;700&display=swap');
      .cn-wrap {
        display: inline-flex; gap: 4px;
        background: rgba(255,255,255,0.04);
        border: 1px solid rgba(255,255,255,0.08);
        border-radius: 18px; padding: 5px;
        margin-bottom: 28px;
        backdrop-filter: blur(8px);
        flex-wrap: wrap;
      }
      .cn-link {
        padding: 9px 20px; border-radius: 13px;
        font-size: 0.855rem; font-weight: 600;
        text-decoration: none; transition: all 0.22s;
        color: rgba(255,255,255,0.45); white-space: nowrap;
        font-family: 'Instrument Sans', sans-serif;
      }
      .cn-link:hover { color: rgba(255,255,255,0.75); background: rgba(255,255,255,0.06); }
      .cn-link.cn-active {
        background: linear-gradient(135deg, #ef4444, #dc2626);
        color: white;
        box-shadow: 0 4px 16px rgba(239,68,68,0.35);
      }
    `}</style>
    <nav className="cn-wrap">
      <NavLink to="/crises-support" end className={({ isActive }) => `cn-link${isActive ? ' cn-active' : ''}`}>
        📞 Crisis Lines
      </NavLink>
      <NavLink to="/crises-support/immediate-help" className={({ isActive }) => `cn-link${isActive ? ' cn-active' : ''}`}>
        ⚡ Immediate Help
      </NavLink>
      <NavLink to="/crises-support/warning-signs" className={({ isActive }) => `cn-link${isActive ? ' cn-active' : ''}`}>
        ⚠️ Warning Signs
      </NavLink>
      <NavLink to="/crises-support/safety-plan" className={({ isActive }) => `cn-link${isActive ? ' cn-active' : ''}`}>
        🛡️ Safety Plan
      </NavLink>
    </nav>
  </>
);

export default CrisesNavBar;