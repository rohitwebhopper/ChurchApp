import { useState } from "react";
import styles from "./card.module.css";
import { Users, Church } from "lucide-react";

type FilterType = "all" | "churches" | "members";

const data: Record<FilterType, number> = {
  all: 1200,
  churches: 150,
  members: 1050,
};

const options: { label: string; key: FilterType }[] = [
  { label: "All", key: "all" },
  { label: "Churches", key: "churches" },
  { label: "Church Members", key: "members" },
];

export default function UserCard() {
  const [filter, setFilter] = useState<FilterType>("all");

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div>
          <h2 className={styles.title}>Total Users</h2>
          <p className={styles.label}>
            {options.find((opt) => opt.key === filter)?.label}
          </p>
        </div>
        <select
          className={styles.filter}
          value={filter}
          onChange={(e) => setFilter(e.target.value as FilterType)}
        >
          {options.map((opt) => (
            <option key={opt.key} value={opt.key}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <div className={styles.icon}>
          {filter === "churches" ? <Church size={24} /> : <Users size={24} />}
        </div>
        <div>
          <div className={styles.count}>{data[filter].toLocaleString()}</div>
          <div className={styles.label}>Users</div>
        </div>
      </div>
    </div>
  );
}
