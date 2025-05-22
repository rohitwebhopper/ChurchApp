import React, { useState } from "react";
import type { ChangeEvent } from "react";
import styles from "./index.module.css";
import Button from "../Button/Index";

interface FileUploadProps {
  label?: string;
  accept?: string;
  onChange?: (file: File | null) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({
  label = "Upload a document",
  accept = ".pdf,.doc,.docx,.txt",
  onChange,
}) => {
  const [file, setFile] = useState<File | null>(null);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);
    onChange?.(selectedFile);
  };

  const clearFile = () => {
    setFile(null);
    onChange?.(null);
  };

  return (
    <div className={styles.container}>
      <label className={styles.label}>{label}</label>
      <div className={styles.uploadBox}>
        <input
          type="file"
          accept={accept}
          onChange={handleInputChange}
          className={styles.input}
        />
        <span className={styles.button}>Choose File</span>
        {file && <span className={styles.fileName}>{file.name}</span>}
        {file && (
          <Button
            size="small"
            className={styles.clearButton}
            onClick={clearFile}
            type="button"
          >
            x
          </Button>
        )}
      </div>
    </div>
  );
};

export default FileUpload;
