import React from "react";
import styles from "./index.module.css";

interface TooltipProps {
  text: string;
  children: React.ReactNode;
  position?: "top" | "bottom" | "left" | "right";
}

const Tooltip: React.FC<TooltipProps> = ({ text, children, position = "top" }) => {
  return (
    <div className={`${styles.tooltipWrapper} ${styles[position]}`}>
      {children}
      <span className={styles.tooltipText}>{text}</span>
    </div>
  );
};

export default Tooltip;
