// import React from 'react';
// import { NavLink } from 'react-router-dom';

// const CommunityNavBar = () => {
//   const baseClasses = "flex-1 text-center py-2 px-4 rounded-full transition-colors duration-200 font-medium";
//   const activeClasses = "bg-white text-gray-900 shadow-md";
//   const inactiveClasses = "text-gray-600 hover:bg-gray-200";

//   return (
//     <nav className="w-full max-w-6xl mx-auto p-1 bg-gray-100 rounded-full">
//       <div className="flex justify-around items-center space-x-1">
        
//         {/* Community Feed (Index Route) */}
//         <NavLink 
//           to="/community-support" 
//           end 
//           className={({ isActive }) => 
//             `${baseClasses} ${isActive ? activeClasses : inactiveClasses}`
//           }
//         >
//           Community Feed
//         </NavLink>

//         {/* Support Groups */}
//         <NavLink 
//           to="/community-support/support-groups"
//           className={({ isActive }) => 
//             `${baseClasses} ${isActive ? activeClasses : inactiveClasses}`
//           }
//         >
//           Support Groups
//         </NavLink>

//         {/* Weekly Topics */}
//         <NavLink 
//           to="/community-support/weekly-topics"
//           className={({ isActive }) => 
//             `${baseClasses} ${isActive ? activeClasses : inactiveClasses}`
//           }
//         >
//           Weekly Topics
//         </NavLink>

//         {/* Guidelines */}
//         <NavLink 
//           to="/community-support/guidelines"
//           className={({ isActive }) => 
//             `${baseClasses} ${isActive ? activeClasses : inactiveClasses}`
//           }
//         >
//           Guidelines
//         </NavLink>
//       </div>
//     </nav>
//   );
// };

// export default CommunityNavBar;
import React from 'react';
import { NavLink } from 'react-router-dom';

const CommunityNavBar = () => (
  <>
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@500;600;700&display=swap');
      .cn2-wrap {
        display: inline-flex; gap: 2px;
        background: rgba(120,53,15,0.06);
        border: 1px solid rgba(120,53,15,0.12);
        border-radius: 18px; padding: 5px;
        margin-bottom: 28px;
        box-shadow: 0 2px 12px rgba(120,53,15,0.05);
        flex-wrap: wrap;
      }
      .cn2-link {
        padding: 9px 20px; border-radius: 13px;
        font-size: 0.855rem; font-weight: 600;
        text-decoration: none; transition: all 0.22s;
        color: #78716c; white-space: nowrap;
        font-family: 'DM Sans', sans-serif;
      }
      .cn2-link:hover { background: rgba(120,53,15,0.07); color: #92400e; }
      .cn2-link.cn2-active {
        background: linear-gradient(135deg, #d97706, #b45309);
        color: white;
        box-shadow: 0 4px 14px rgba(217,119,6,0.35);
      }
    `}</style>
    <nav className="cn2-wrap">
      <NavLink to="/community-support" end className={({ isActive }) => `cn2-link${isActive ? ' cn2-active' : ''}`}>
        🌿 Community Feed
      </NavLink>
      <NavLink to="/community-support/support-groups" className={({ isActive }) => `cn2-link${isActive ? ' cn2-active' : ''}`}>
        🤝 Support Groups
      </NavLink>
      <NavLink to="/community-support/weekly-topics" className={({ isActive }) => `cn2-link${isActive ? ' cn2-active' : ''}`}>
        💡 Weekly Topics
      </NavLink>
      <NavLink to="/community-support/guidelines" className={({ isActive }) => `cn2-link${isActive ? ' cn2-active' : ''}`}>
        🛡️ Guidelines
      </NavLink>
    </nav>
  </>
);

export default CommunityNavBar;