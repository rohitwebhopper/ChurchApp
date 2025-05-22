import React, { useRef, useState } from "react";
import { FaCamera } from "react-icons/fa";
import styles from "./index.module.css";
import profileimage from "@/assets/profile/profile.jpg";

interface Props {
  currentImage?: string;
  fallbackImage?: string;
  onChange?: (file: File) => void;
}

const ProfileImageUpload: React.FC<Props> = ({
  currentImage,
  fallbackImage = profileimage,
  onChange,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(currentImage || null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setPreview(URL.createObjectURL(file));
    onChange?.(file);
  };

  const handleClick = () => {
    inputRef.current?.click();
  };

  return (
    <div className={styles.container} onClick={handleClick}>
      <img src={preview || fallbackImage} alt="Profile" className={styles.image} />

      <div className={styles.overlay}>
        <FaCamera className={styles.icon} />
      </div>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        ref={inputRef}
        className={styles.hiddenInput}
      />
    </div>
  );
};

export default ProfileImageUpload;
