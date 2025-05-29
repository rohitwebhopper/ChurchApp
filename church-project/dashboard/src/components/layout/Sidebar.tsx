import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";
import { HiOutlineMenu, HiOutlineX, HiChevronDown } from "react-icons/hi";
import { navItems } from "./Navigation/navmenu";
import { useNavigate } from "react-router-dom";
import styles from "./sidebar.module.css";
import logo from "@/assets/churchlogo.svg";
import { FiLogOut } from "react-icons/fi";

const Sidebar: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const location = useLocation();

  const isChildActive = (children: { to: string }[]) =>
    children.some((child) => location.pathname.startsWith(child.to));

  const toggleDropdown = (label: string) =>
    setOpenDropdown(openDropdown === label ? null : label);

  useEffect(() => {
    const activeDropdown = navItems.find(
      (item) => item.type === "dropdown" && isChildActive(item.children)
    );
    if (activeDropdown) {
      setOpenDropdown(activeDropdown.label);
    } else {
      setOpenDropdown(null);
    }

    // Close sidebar on mobile route change
    if (window.innerWidth < 768) {
      setSidebarOpen(false);
    }
  }, [location.pathname]);

  const handleLogout = () => {
    // localStorage.clear();
    navigate("/login");
  };

  

  return (
    <>
      {/* Mobile Menu Button */}
      <div className={styles.mobileToggle}>
        {!sidebarOpen && (
          <button
            onClick={() => setSidebarOpen(true)}
            className={styles.menuButton}
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
        <div className={styles.header}>
          <div className={styles.logoContainer}>
            <img src={logo} alt="Logo" className={styles.logoImage} />
            <h1 className={styles.logoText}>Mon Eglise</h1>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className={styles.closeButton}
          >
            <HiOutlineX />
          </button>
        </div>

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
                  <span>
                    {t(
                      `nav.${item.label
                        .toLowerCase()
                        .replace(/[^a-z0-9]/g, "")}`
                    )}
                  </span>
                </Link>
              );
            }

            if (item.type === "dropdown") {
              const Icon = item.icon;
              const childActive = isChildActive(item.children);
              const isOpen = openDropdown === item.label || childActive;

              return (
                <div key={index} className={styles.dropdownSection}>
                  <button
                    onClick={() => toggleDropdown(item.label)}
                    className={`${styles.dropdownToggle} ${
                      childActive ? styles.activeLink : ""
                    }`}
                  >
                    <span className={styles.dropdownLabel}>
                      <Icon className={styles.linkIcon} />
                      {t(
                        `nav.${item.label
                          .toLowerCase()
                          .replace(/[^a-z0-9]/g, "")}`
                      )}
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
                      overflow: "hidden",
                      transition: "max-height 0.3s ease",
                    }}
                  >
                    <ul>
                      {item.children.map((child, childIndex) => {
                        const ChildIcon = child.icon;
                        const isChildCurrent = location.pathname === child.to;

                        return (
                          <li key={childIndex}>
                            <Link
                              to={child.to}
                              className={`${styles.dropdownItem} ${
                                isChildCurrent ? styles.activeChild : ""
                              }`}
                            >
                              <ChildIcon className={styles.childIcon} />
                              {t(
                                `nav.${child.label
                                  .toLowerCase()
                                  .replace(/[^a-z0-9]/g, "")}`
                              )}
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

        {/* === Log Out Button === */}
        <div className={styles.logoutSection}>
          <div onClick={handleLogout} className={styles.logoutButton}>
            <span className={styles.logouticon}>
              <FiLogOut />
            </span>
            <span>{t("nav.logout")}</span>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
