import { useState } from "react";
import styles from "./card.module.css";

const prayerCounts = {
  monthly: 52,
  quarterly: 134,
  yearly: 498,
};

type FilterOption = keyof typeof prayerCounts;

const requests = [
  { name: "Emma", text: "Please pray for my father’s health." },
  { name: "Noah", text: "Guidance in my job transition." },
  { name: "Olivia", text: "Healing from anxiety and stress." },
  { name: "Liam", text: "Peace in our church leadership." },
  { name: "Ava", text: "A breakthrough in finances." },
];

const filterOptions = ["monthly", "quarterly", "yearly"];

export default function PrayerStatsCard() {
  const [filter, setFilter] = useState<FilterOption>("monthly");

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h2 className={styles.title}>Recent Prayer Requests</h2>
        <select
          className={styles.filter}
          value={filter}
          onChange={(e) => setFilter(e.target.value as FilterOption)}
        >
          {filterOptions.map((opt) => (
            <option key={opt} value={opt}>
              {opt.charAt(0).toUpperCase() + opt.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.count}>
        {prayerCounts[filter].toLocaleString()} Total
      </div>

      <div className={styles.requestList}>
        {requests.map((req, index) => (
          <div key={index} className={styles.requestItem}>
            <div className={styles.requestName}>{req.name}</div>
            <div className={styles.requestText}>{req.text}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
