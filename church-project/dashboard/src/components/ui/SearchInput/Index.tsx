import React, { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import styles from "./index.module.css";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onChange,
  placeholder,
}) => {
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    if (value.trim() === "") {
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    const timeout = setTimeout(() => setIsSearching(false), 1000); // 1s debounce
    return () => clearTimeout(timeout);
  }, [value]);

  return (
    <div className={styles.searchWrapper}>
      <input
        type="text"
        className={styles.searchInput}
        placeholder={placeholder || "Search..."}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <FiSearch
        className={`${styles.searchIcon} ${
          isSearching ? styles.searching : ""
        }`}
      />
    </div>
  );
};

export default SearchInput;
