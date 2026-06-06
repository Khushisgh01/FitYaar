// import React from 'react';
// import { NavLink } from 'react-router-dom';

// const SidebarItem = ({ icon, text, to, isEmergency, isAdvanced }) => {
//   const baseClasses = "flex items-center p-3 rounded-xl cursor-pointer transition-colors duration-200 text-sm font-medium";

//   return (
//     <NavLink
//       to={to}
//       className={({ isActive }) => {
//         if (isActive) return `${baseClasses} bg-violet-600 text-white shadow-lg`;
//         if (isEmergency) return `${baseClasses} text-red-600 bg-red-100 hover:bg-red-200`;
//         return `${baseClasses} text-gray-700 hover:bg-gray-100`;
//       }}
//     >
//       <span className="mr-3 text-lg">{icon}</span>
//       <span>{text}</span>
//     </NavLink>
//   );
// };

// export default SidebarItem;
import React, { useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { gsap } from 'gsap';

const SidebarItem = ({ icon, text, to, isSelected, isEmergency, onClick }) => {
  const itemRef = useRef(null);

  const handleMouseEnter = () => {
    if (!isSelected) {
      gsap.to(itemRef.current, { x: 4, duration: 0.2, ease: 'power2.out' });
    }
  };
  const handleMouseLeave = () => {
    if (!isSelected) {
      gsap.to(itemRef.current, { x: 0, duration: 0.3, ease: 'elastic.out(1, 0.5)' });
    }
  };

  return (
    <>
      <style>{`
        .sidebar-item {
          display: flex;
          align-items: center;
          padding: 9px 12px;
          border-radius: 12px;
          cursor: pointer;
          transition: background 0.15s;
          text-decoration: none;
          margin-bottom: 2px;
          font-family: 'Satoshi', sans-serif;
          font-size: 0.875rem;
          font-weight: 500;
        }

        .sidebar-item.active {
          background: linear-gradient(135deg, #7c3aed, #9333ea);
          box-shadow: 0 4px 20px rgba(124,58,237,0.35);
          color: white !important;
        }

        .sidebar-item.emergency {
          background: rgba(254,226,226,0.7);
          color: #dc2626;
        }

        .sidebar-item.emergency:hover {
          background: rgba(254,202,202,0.9);
        }

        .sidebar-item.normal {
          color: #4b5563;
        }

        .sidebar-item.normal:hover {
          background: rgba(124,58,237,0.06);
          color: #7c3aed;
        }

        .sidebar-item-icon {
          font-size: 1.1rem;
          margin-right: 10px;
          width: 22px;
          text-align: center;
          flex-shrink: 0;
        }

        .sidebar-item-active-dot {
          margin-left: auto;
          width: 6px; height: 6px;
          border-radius: 50%;
          background: rgba(255,255,255,0.7);
        }
      `}</style>

      <NavLink
        to={to}
        ref={itemRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={onClick}
        className={({ isActive }) =>
          `sidebar-item ${isActive ? 'active' : isEmergency ? 'emergency' : 'normal'}`
        }
      >
        <span className="sidebar-item-icon">{icon}</span>
        <span>{text}</span>
        {isSelected && <span className="sidebar-item-active-dot" />}
      </NavLink>
    </>
  );
};

export default SidebarItem;