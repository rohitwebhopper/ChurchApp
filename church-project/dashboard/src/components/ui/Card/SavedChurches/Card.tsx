import styles from "./card.module.css";
import { useTranslation } from "react-i18next";

const savedChurches = [
  { name: "Grace Fellowship", savedBy: 312 },
  { name: "Holy Trinity Church", savedBy: 276 },
  { name: "First Baptist", savedBy: 243 },
  { name: "St. Peter's Cathedral", savedBy: 199 },
  { name: "New Hope Community", savedBy: 185 },
];

export default function SavedChurchesCard() {
  const { t } = useTranslation();
  return (
    <div className={styles.card}>
      <h2 className={styles.title}>{t("translate.savedChurches")}</h2>
      <div className={styles.churchList}>
        {savedChurches.map((church, index) => (
          <div key={index} className={styles.churchItem}>
            <div className={styles.churchName}>
              {index + 1}. {church.name}
            </div>
            <div className={styles.userCount}>
              {church.savedBy.toLocaleString()} {t("translate.users")}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
