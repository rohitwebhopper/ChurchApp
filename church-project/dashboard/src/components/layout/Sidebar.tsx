import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  HiOutlineMenu,
  HiOutlineX,
  HiOutlineHome,
  HiOutlineViewGrid,
  HiOutlineLockClosed,
  HiChevronDown,
} from "react-icons/hi";

const Sidebar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname.startsWith(path);

  return (
    <>
      {/* Mobile Toggle Button */}
      <div className="md:hidden p-4 bg-white shadow-sm">
        <button
          onClick={() => setSidebarOpen(true)}
          className="text-primary text-2xl"
        >
          <HiOutlineMenu />
        </button>
      </div>

      {/* Overlay (Mobile Only) */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-50 h-full w-64 bg-white border-r shadow-lg transform transition-transform duration-300 md:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-primary to-secondary text-white flex items-center justify-between">
          <h1 className="text-xl font-bold tracking-wide">MyChurch</h1>
          <button
            className="text-white text-xl md:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <HiOutlineX />
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-3 text-sm font-medium text-gray-700">
          <LinkItem
            to="/dashboard"
            icon={<HiOutlineHome />}
            label="Dashboard"
          />
          <LinkItem
            to="/layouts"
            icon={<HiOutlineViewGrid />}
            label="Layouts"
          />

          {/* Collapsible Auth Section */}
          <div>
            <button
              onClick={() => setAuthOpen(!authOpen)}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-all ${
                isActive("/auth")
                  ? "bg-gray-100 text-primary font-semibold"
                  : "hover:bg-gray-50"
              }`}
            >
              <span className="flex items-center gap-2">
                <HiOutlineLockClosed className="text-lg" />
                Authentication
              </span>
              <HiChevronDown
                className={`transform transition-transform duration-200 ${
                  authOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Animated dropdown */}
            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                authOpen ? "max-h-40 mt-2" : "max-h-0"
              }`}
            >
              <ul className="pl-10 space-y-1 text-gray-600">
                <li>
                  <Link
                    to="/auth/login"
                    className="block py-1 hover:text-primary"
                  >
                    • Login
                  </Link>
                </li>
                <li>
                  <Link
                    to="/auth/register"
                    className="block py-1 hover:text-primary"
                  >
                    • Register
                  </Link>
                </li>
                <li>
                  <Link
                    to="/auth/forgot-password"
                    className="block py-1 hover:text-primary"
                  >
                    • Forgot Password
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;

// Reusable Nav Link
const LinkItem = ({
  to,
  icon,
  label,
}: {
  to: string;
  icon: React.ReactNode;
  label: string;
}) => {
  const location = useLocation();
  const active = location.pathname === to;

  return (
    <Link
      to={to}
      className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 ${
        active
          ? "bg-gray-100 text-primary font-semibold"
          : "text-gray-700 hover:bg-gray-50"
      }`}
    >
      {icon}
      {label}
    </Link>
  );
};
