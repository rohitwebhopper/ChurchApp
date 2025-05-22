// InputComponent.tsx
import React from "react";
import styles from "./index.module.css";
import classNames from "classnames";

type Size = "mini" | "small" | "medium" | "large";

interface InputProps {
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
  size?: Size;
  error?: string;
}

export const FormInput: React.FC<InputProps> = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  required,
  size = "medium",
  error,
}) => (
  <div className={styles.formGroup}>
    <label htmlFor={name} className={styles.label}>
      {label}
      {required && <span className={styles.required}>*</span>}
    </label>
    <input
      type={type}
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      className={classNames(styles.input, styles[size], {
        [styles.errorInput]: !!error,
      })}
    />
    {error && <span className={styles.error}>{error}</span>}
  </div>
);

// Same additions apply for TextArea and Select below

interface TextAreaProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  required?: boolean;
  rows?: number;
  size?: Size;
  error?: string;
}

export const FormTextArea: React.FC<TextAreaProps> = ({
  label,
  name,
  value,
  onChange,
  placeholder,
  required,
  rows = 4,
  size = "medium",
  error,
}) => (
  <div className={styles.formGroup}>
    <label htmlFor={name} className={styles.label}>
      {label}
      {required && <span className={styles.required}>*</span>}
    </label>
    <textarea
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      rows={rows}
      required={required}
      className={classNames(styles.textarea, styles[size], {
        [styles.errorInput]: !!error,
      })}
    />
    {error && <span className={styles.error}>{error}</span>}
  </div>
);

interface SelectProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: { value: string; label: string }[];
  required?: boolean;
  size?: Size;
  error?: string;
}

export const FormSelect: React.FC<SelectProps> = ({
  label,
  name,
  value,
  onChange,
  options,
  required,
  size = "medium",
  error,
}) => (
  <div className={styles.formGroup}>
    <label htmlFor={name} className={styles.label}>
      {label}
      {required && <span className={styles.required}>*</span>}
    </label>
    <select
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      className={classNames(styles.input, styles[size], {
        [styles.errorInput]: !!error,
      })}
    >
      <option value="" disabled>
        Select {label}
      </option>
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
    {error && <span className={styles.error}>{error}</span>}
  </div>
);
