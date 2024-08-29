// src/components/Header.jsx
import { AlignJustify, ArrowLeft, X } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const HeaderAdmin = ({ onMenuClick, showMenu }) => {
  return (
    <header className="fixed top-0 right-0 w-full bg-gray-800 text-white p-4 z-10 flex items-center justify-between lg:justify-start">
      <Link to="/home">
        <ArrowLeft />
      </Link>
      <h1 className="text-xl font-bold hidden lg:block left-2 m-3 ">
        Kickzone
      </h1>

      <button
        className="lg:hidden text-2xl"
        onClick={onMenuClick}
        aria-label={showMenu ? "Close menu" : "Open menu"}
      >
        {showMenu ? <X /> : <AlignJustify />}
      </button>
    </header>
  );
};

export default HeaderAdmin;
