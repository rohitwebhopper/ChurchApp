import styles from "./card.module.css";

const savedChurches = [
  { name: "Grace Fellowship", savedBy: 312 },
  { name: "Holy Trinity Church", savedBy: 276 },
  { name: "First Baptist", savedBy: 243 },
  { name: "St. Peter's Cathedral", savedBy: 199 },
  { name: "New Hope Community", savedBy: 185 },
];

export default function SavedChurchesCard() {
  return (
    <div className={styles.card}>
      <h2 className={styles.title}>Most Saved Churches</h2>
      <div className={styles.churchList}>
        {savedChurches.map((church, index) => (
          <div key={index} className={styles.churchItem}>
            <div className={styles.churchName}>
              {index + 1}. {church.name}
            </div>
            <div className={styles.userCount}>
              {church.savedBy.toLocaleString()} users
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
