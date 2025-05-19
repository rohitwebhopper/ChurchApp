import React from "react";
import { HiOutlineBell, HiOutlineUserCircle } from "react-icons/hi";

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-30 bg-white/80 backdrop-blur border-b border-gray-200 shadow-sm px-6 py-4 flex items-center justify-between">
      {/* Title */}
      <h1 className="text-xl font-bold text-primary tracking-tight">
        Dashboard
      </h1>

      {/* Right-side utilities */}
      <div className="flex items-center gap-4 text-gray-600">
        {/* Notification icon */}
        <button className="relative hover:text-primary transition">
          <HiOutlineBell className="text-xl" />
          {/* Notification dot */}
          <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-primary animate-ping opacity-75"></span>
        </button>

        {/* Profile */}
        <div className="flex items-center gap-2">
          <HiOutlineUserCircle className="text-2xl" />
          <span className="text-sm font-medium hidden sm:inline">Admin</span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
