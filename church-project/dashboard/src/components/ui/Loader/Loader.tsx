import React from "react";
import styles from "./loader.module.css";

type LoaderProps = {
  active?: boolean;
  size?: number;
};

const Loader: React.FC<LoaderProps> = ({ active = true, size = 48 }) => {
  if (!active) return null;

  return (
    <div className={styles.backdrop}>
      <div
        className={styles.spinner}
        style={{ width: size, height: size, borderWidth: size / 8 }}
      ></div>
    </div>
  );
};

export default Loader;
