import { HiOutlineBell, HiOutlineUserCircle } from "react-icons/hi";
import styles from "./index.module.css";

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      {/* Right utilities */}
      <div className={styles.rightUtilities}>
        {/* Notification icon */}
        <button className={styles.notificationButton}>
          <HiOutlineBell className={styles.icon} />
          <span className={styles.notificationDot}></span>
        </button>

        {/* Profile */}
        <div className={styles.profile}>
          <HiOutlineUserCircle className={styles.profileIcon} />
          <span className={styles.profileName}>Admin</span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
