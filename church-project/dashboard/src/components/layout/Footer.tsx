import styles from "./index.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <p className={styles.text}>
          &copy; {new Date().getFullYear()}{" "}
          <span className={styles.brand}>Mon Eglise</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
