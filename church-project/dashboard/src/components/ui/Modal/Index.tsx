// Modal.tsx
import React from "react";
import styles from "./index.module.css";
import classNames from "classnames";
import type { ModalProps } from "@/components/interface/ModalProps";

const Modal: React.FC<ModalProps> = ({
  isOpen,
  title,
  onClose,
  children,
  actions,
  size = "medium",
}) => {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={classNames(styles.modal, styles[size])}>
        <div className={styles.header}>
          <h2 className={styles.title}>{title}</h2>
          <button className={styles.closeButton} onClick={onClose}>
            &times;
          </button>
        </div>

        <div className={styles.content}>{children}</div>

        {actions && <div className={styles.actions}>{actions}</div>}
      </div>
    </div>
  );
};

export default Modal;
