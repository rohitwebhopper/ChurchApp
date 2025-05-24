import styles from "./index.module.css";

type Props = {
  onChange: (file: File) => void;
  label?: string;
};

export default function ImageUpload({ onChange, label = "Upload Image" }: Props) {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      onChange(e.target.files[0]);
    }
  };

  return (
    <div className={styles.wrapper}>
      {label && <label className={styles.label}>{label}</label>}
      <input type="file" accept="image/*" onChange={handleFileChange} className={styles.input} />
    </div>
  );
}
