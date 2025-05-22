import React from "react";
import styles from "./index.module.css";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "positive" | "negative";
  children: React.ReactNode;
  size?: "small" | "medium";
}

const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "medium",
  children,
  ...props
}) => {
  return (
    <button
      className={`${styles.button} ${styles[variant]} ${styles[size]} `}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
