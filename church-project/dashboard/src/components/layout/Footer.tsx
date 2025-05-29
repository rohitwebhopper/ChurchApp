import styles from "./index.module.css";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <p className={styles.text}>
          &copy; {new Date().getFullYear()}{" "}
          <span className={styles.brand}>Mon Eglise</span>.{" "}
          {t("translate.allRights")} {t("translate.developedBy")}{" "}
          <a
            href="https://www.webhopers.com/"
            target="_blank"
            rel="noreferrer"
            className={styles.webhopersLink}
          >
            <span className={styles.web}>WEB</span>
            <span className={styles.hopers}>HOPERS</span>
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
