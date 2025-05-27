import React, { useState, useEffect } from "react";
import { MdClose } from "react-icons/md";
import styles from "./index.module.css";

export interface Option {
  label: string;
  value: string;
  disabled?: boolean;
}

interface DropdownProps {
  options: Option[];
  value: string | string[];
  onChange: (value: string | string[]) => void;
  variant?: "default" | "underline" | "filled";
  isMulti?: boolean;
  placeholder?: string;
}

const Dropdown: React.FC<DropdownProps> = ({
  options,
  value,
  onChange,
  variant = "default",
  isMulti = false,
  placeholder = "Select...",
}) => {
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const filteredOptions = options.filter((opt) =>
    opt.label.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelect = (val: string) => {
    if (isMulti) {
      const selectedValues = Array.isArray(value) ? value : [];
      if (selectedValues.includes(val)) {
        onChange(selectedValues.filter((v) => v !== val));
      } else {
        onChange([...selectedValues, val]);
      }
    } else {
      onChange(val);
      setIsOpen(false);
    }
  };

  const removeSelected = (val: string) => {
    if (isMulti && Array.isArray(value)) {
      onChange(value.filter((v) => v !== val));
    }
  };

  const isSelected = (val: string) => {
    return Array.isArray(value) ? value.includes(val) : value === val;
  };

  const displayValue = () => {
    if (isMulti && Array.isArray(value)) {
      if (value.length === 0) return placeholder;
      return ""; 
    }

    const selected = options.find((opt) => opt.value === value);
    return selected?.label || placeholder;
  };

  useEffect(() => {
    const handleClickOutside = () => setIsOpen(false);
    if (isOpen) {
      document.addEventListener("click", handleClickOutside);
    }
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isOpen]);

  return (
    <div
      className={`${styles.dropdown} ${styles[variant]}`}
      onClick={(e) => e.stopPropagation()}
    >
      <div className={styles.selectBox} onClick={() => setIsOpen(!isOpen)}>
        {/* For multi-select show tags */}
        {isMulti && Array.isArray(value) ? (
          <div className={styles.tagsContainer}>
            {value.length === 0 && (
              <span className={styles.placeholder}>{placeholder}</span>
            )}
            {value.map((val) => {
              const option = options.find((opt) => opt.value === val);
              if (!option) return null;
              return (
                <span key={val} className={styles.tag}>
                  {option.label}
                  <MdClose
                    className={styles.removeIcon}
                    onClick={(e) => {
                      e.stopPropagation();
                      removeSelected(val);
                    }}
                    title="Remove"
                  />
                </span>
              );
            })}
          </div>
        ) : (
          <>{displayValue()}</>
        )}
        <span className={styles.arrow}>▼</span>
      </div>

      {isOpen && (
        <div className={styles.dropdownMenu}>
          <input
            className={styles.searchInput}
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            autoFocus
          />
          <div className={styles.optionsList}>
            {filteredOptions.length > 0 ? (
              filteredOptions.map((opt) => (
                <div
                  key={opt.value}
                  className={`${styles.option} ${
                    isSelected(opt.value) ? styles.selected : ""
                  } ${opt.disabled ? styles.disabled : ""}`}
                  onClick={() => !opt.disabled && handleSelect(opt.value)}
                >
                  {opt.label}
                </div>
              ))
            ) : (
              <div className={styles.noOption}>No options found</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
