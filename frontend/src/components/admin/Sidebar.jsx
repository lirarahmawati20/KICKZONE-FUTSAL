// src/components/Sidebar.jsx
import { CircleUserRound, ClipboardList, ClipboardPenLine, Clock, House, LogOut, SmilePlus } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

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
            <Link
              to="/admin/homeAdmin"
              className="text-white hover:text-red-500"
            >
              <div className="flex gap-3">
                {" "}
                <House />
                Home
              </div>
            </Link>
          </li>
          <li>
            <Link
              to="/admin/fieldList"
              className="text-white hover:text-red-500"
            >
              <div className="flex gap-3">
                {" "}
                <ClipboardPenLine /> Data Lapangan
              </div>
            </Link>
          </li>
          <li>
            <Link
              to="/admin/SewaList"
              className="text-white hover:text-red-500"
            >
              <div className="flex gap-3">
                {" "}
                <ClipboardList />
                Data Pemesan
              </div>
            </Link>
          </li>

          <li>
            <Link
              to="/admin/dataMember"
              className="text-white hover:text-red-500"
            >
              <div className="flex gap-3">
                <CircleUserRound /> Data Member
              </div>
            </Link>
          </li>
          <li>
            <Link to="/historyMember" className="text-white hover:text-red-500">
              <div className="flex gap-3">
                {" "}
                <Clock />
                History Member
              </div>
            </Link>
          </li>

          <li>
            <Link
              to="/admin/dataAdmin" 
              className="text-white hover:text-red-500"
            >
              <div className="flex gap-3">
                {" "}
                <SmilePlus />
                Data Admin
              </div>
            </Link>
          </li>
          <li>
            <Link to="/login" className="text-white hover:text-red-500">
              <div className="flex gap-3">
                <LogOut /> LogOut
              </div>
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
