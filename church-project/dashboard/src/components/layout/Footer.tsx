import styles from "./index.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <p className={styles.text}>
          &copy; {new Date().getFullYear()}{" "}
          <span className={styles.brand}>Mon Eglise</span>. All rights reserved.
          Developed by{" "}
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
