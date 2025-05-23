import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { HiOutlineMenu, HiOutlineX, HiChevronDown } from "react-icons/hi";
import { navItems } from "./Navigation/navmenu";
import styles from "./sidebar.module.css";

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
        {!sidebarOpen && (
          <button
            onClick={() => setSidebarOpen(true)}
            className={styles.menuButton}
            aria-label="Open sidebar"
          >
            <HiOutlineMenu size={24} />
          </button>
        )}
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
          <h1 className={styles.logo}>Church</h1>
          <button
            onClick={() => setSidebarOpen(false)}
            className={styles.closeButton}
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
                  <Icon className={styles.linkIcon} />
                  <span>{item.label}</span>
                </Link>
              );
            }

            if (item.type === "dropdown") {
              const Icon = item.icon;
              const isOpen = openDropdown === item.label;

              return (
                <div key={index} className={styles.dropdownSection}>
                  <button
                    onClick={() => toggleDropdown(item.label)}
                    className={`${styles.dropdownToggle} ${
                      isActive(item.basePath) ? styles.activeLink : ""
                    }`}
                  >
                    <span className={styles.dropdownLabel}>
                      <Icon className={styles.linkIcon} />
                      {item.label}
                    </span>
                    <HiChevronDown
                      className={`${styles.chevronIcon} ${
                        isOpen ? styles.chevronOpen : ""
                      }`}
                    />
                  </button>

                  <div
                    className={styles.dropdownList}
                    style={{
                      maxHeight: isOpen ? "300px" : "0",
                    }}
                  >
                    <ul>
                      {item.children.map((child, childIndex) => {
                        const ChildIcon = child.icon;
                        return (
                          <li key={childIndex}>
                            <Link to={child.to} className={styles.dropdownItem}>
                              <ChildIcon className={styles.childIcon} />
                              {child.label}
                            </Link>
                          </li>
                        );
                      })}
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
