import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { HiOutlineMenu, HiOutlineX, HiChevronDown } from "react-icons/hi";
import { navItems } from "./Navigation/navmenu";
import styles from "./index.module.css";

const Sidebar: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const location = useLocation();

  const isActive = (path: string) => location.pathname.startsWith(path);
  const toggleDropdown = (label: string) =>
    setOpenDropdown(openDropdown === label ? null : label);

  return (
    <>
      {/* Mobile Toggle */}
      <div className={styles.mobileToggle}>
        <button
          onClick={() => setSidebarOpen(true)}
          className="text-primary text-2xl"
        >
          <HiOutlineMenu />
        </button>
      </div>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className={styles.mobileOverlay}
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`${styles.sidebarWrapper} ${
          sidebarOpen ? styles.sidebarOpen : ""
        }`}
      >
        {/* Header */}
        <div className={styles.header}>
          <h1 className="text-xl font-bold tracking-wide">Church</h1>
          <button
            onClick={() => setSidebarOpen(false)}
            className="text-white text-xl md:hidden"
          >
            <HiOutlineX />
          </button>
        </div>

        {/* Nav Items */}
        <nav className={styles.nav}>
          {navItems.map((item, index) => {
            if (item.type === "link") {
              const Icon = item.icon;
              const isCurrent = location.pathname === item.to;

              return (
                <Link
                  key={index}
                  to={item.to}
                  className={`${styles.navLink} ${
                    isCurrent ? styles.activeLink : ""
                  }`}
                >
                  <Icon className="text-lg" />
                  {item.label}
                </Link>
              );
            }

            if (item.type === "dropdown") {
              const Icon = item.icon;
              const isOpen = openDropdown === item.label;

              return (
                <div key={index}>
                  <button
                    onClick={() => toggleDropdown(item.label)}
                    className={`${styles.dropdownToggle} ${
                      isActive(item.basePath) ? styles.activeLink : ""
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <Icon className="text-lg" />
                      {item.label}
                    </span>
                    <HiChevronDown
                      className={`transform transition-transform duration-200 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  <div
                    className={styles.dropdownList}
                    style={{
                      maxHeight: isOpen ? "160px" : "0",
                      marginTop: isOpen ? "0.5rem" : "0",
                    }}
                  >
                    <ul>
                      {item.children.map((child, childIndex) => (
                        <li key={childIndex}>
                          <Link to={child.to} className={styles.dropdownItem}>
                            • {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            }

            return null;
          })}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
