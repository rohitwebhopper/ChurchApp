import React from "react";
import styles from "./index.module.css";
import { FaPlus } from "react-icons/fa6";

interface Props {
  onClick: () => void;
}

const FloatingUploadButton: React.FC<Props> = ({ onClick }) => {
  return (
    <button className={styles.floatingButton} onClick={onClick} >
      <FaPlus className="text-2xl"/>
    </button>
  );
};

export default FloatingUploadButton;
