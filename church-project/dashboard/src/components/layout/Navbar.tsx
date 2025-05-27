import styles from "./index.module.css";
import { useNavigate } from "react-router-dom";
import logo from "@/assets/churchlogo.svg";
import NotificationDropdown from "@/components/ui/NotificationDropDown/Index";
import Tooltip from "@/components/ui/ToolTip/Index";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className={styles.navbar}>
      <div className={styles.rightUtilities}>
        <NotificationDropdown />
        <Tooltip text="View Profile" position="bottom">
          <div
            className={styles.profile}
            onClick={() => navigate("/profile/view")}
          >
            <img className={styles.profileimg} src={logo} alt="profile" />
            <span className={styles.profileName}>Mon Eglise</span>
          </div>
        </Tooltip>
      </div>
    </nav>
  );
};

export default Navbar;
