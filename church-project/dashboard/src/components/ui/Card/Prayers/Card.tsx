import { useState } from "react";
import styles from "./card.module.css";
import { useTranslation } from "react-i18next";

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

export default function PrayerStatsCard() {
  const { t } = useTranslation();
  const [filter, setFilter] = useState<FilterOption>("monthly");
  const filterOptions = [
    t("translate.monthly"),
    t("translate.quarterly"),
    t("translate.yearly"),
  ];
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h2 className={styles.title}>{t("translate.recentPrayerRequests")}</h2>
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
        {prayerCounts[filter].toLocaleString()} {t("translate.total")}
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
