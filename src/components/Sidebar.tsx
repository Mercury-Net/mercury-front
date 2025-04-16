import React from 'react';
import { NavLink } from 'react-router-dom'; // Import NavLink for active state styling

// TODO: Add actual navigation paths
const Sidebar: React.FC = () => {
  const activeClassName = "text-cyan-400 bg-cyan-900/30 font-semibold";
  const baseLinkClassName = "block px-3 py-2 rounded-md hover:bg-gray-700 hover:text-cyan-300 transition-colors duration-150";

  return (
    <div className="w-64 h-screen bg-black text-gray-300 p-4 fixed top-0 left-0 border-r border-cyan-500/30 shadow-[4px_0px_15px_-3px_rgba(6,182,212,0.3)]">
      <h2 className="text-xl font-bold mb-8 text-center bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
        Fintax
      </h2>
      <nav>
        <ul>
          {/* Use NavLink for styling active links */}
          <li className="mb-3">
            <NavLink
              to="/dashboard" // Example path
              className={({ isActive }) =>
                `${baseLinkClassName} ${isActive ? activeClassName : ''}`
              }
            >
              首页
            </NavLink>
          </li>
          <li className="mb-3">
            <NavLink
              to="/points" // Example path
              className={({ isActive }) =>
                `${baseLinkClassName} ${isActive ? activeClassName : ''}`
              }
            >
              个人积分
            </NavLink>
          </li>
          <li className="mb-3">
            <NavLink
              to="/settings" // Example path
              className={({ isActive }) =>
                `${baseLinkClassName} ${isActive ? activeClassName : ''}`
              }
            >
              设置
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar; 