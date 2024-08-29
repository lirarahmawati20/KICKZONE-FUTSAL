// src/components/Sidebar.jsx
import React from "react";

const Sidebar = ({ isVisible }) => {
  return (
    <aside
      className={`fixed top-20 left-0 w-64 h-full bg-gray-800 p-6 border-r border-gray-300 lg:w-64 lg:block ${
        isVisible ? "block" : "hidden"
      }`}
    >
      <nav>
        <ul className="space-y-8">
          <li>
            <a href="#" className="text-white hover:text-red-500">
              Home
            </a>
          </li>
          <li>
            <a href="#" className="text-white hover:text-white">
              Data Member
            </a>
          </li>
          <li>
            <a href="#" className="text-white hover:text-white">
              Data Lapangan
            </a>
          </li>
          <li>
            <a href="#" className="text-white hover:text-white">
              Data Pesanan
            </a>
          </li>
          <li>
            <a href="#" className="text-white hover:text-white">
              Data Data Admin
            </a>
          </li>

          <li>
            <a href="#" className="text-white hover:text-white">
              History Member
            </a>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
