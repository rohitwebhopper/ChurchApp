import styles from "./index.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <p>
          &copy; {new Date().getFullYear()}{" "}
          <span className={styles.brand}>Mon Eglise</span>. WebHopers All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
