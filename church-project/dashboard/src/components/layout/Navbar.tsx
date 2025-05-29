import styles from "./index.module.css";
import { useNavigate } from "react-router-dom";
import logo from "@/assets/profile/profile.jpg";
import NotificationDropdown from "@/components/ui/NotificationDropDown/Index";
import Tooltip from "@/components/ui/ToolTip/Index";
import { useTranslation } from "react-i18next";
import { FaGlobe } from "react-icons/fa";

const languages = [
  { code: "en", label: "EN" },
  { code: "fr", label: "FR" },
];

const Navbar = () => {
  const { t } = useTranslation();
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const currentLang = i18n.language;

  const changeLanguage = (lang: string) => {
    if (lang !== currentLang) {
      i18n.changeLanguage(lang);
    }
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.languageSwitcher}>
        <FaGlobe className={styles.globeIcon} />
        <div className={styles.languageButtons}>
          <div
            className={styles.activeIndicator}
            style={{
              transform: `translateX(${
                languages.findIndex((l) => l.code === currentLang) * 100
              }%)`,
            }}
          />
          {languages.map((lang) => (
            <button
              key={lang.code}
              className={`${styles.langBtn} ${
                currentLang === lang.code ? styles.active : ""
              }`}
              onClick={() => changeLanguage(lang.code)}
            >
              {lang.label}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.rightUtilities}>
        <NotificationDropdown />
        <Tooltip text={t("translate.viewprofile")} position="bottom">
          <div
            className={styles.profile}
            onClick={() => navigate("/profile/view")}
          >
            <img className={styles.profileimg} src={logo} alt="profile" />
            <span className={styles.profileName}>Admin</span>
          </div>
        </Tooltip>
      </div>
    </nav>
  );
};

export default Navbar;
