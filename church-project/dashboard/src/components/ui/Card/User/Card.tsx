import styles from "./card.module.css";
import { Users, Church } from "lucide-react";

export default function UserCard() {
  return (
    <div className={styles.card}>
      <div >
        <div className={styles.summaryItem}>
          <div className={styles.iconWrapperUsers}>
            <Users size={24} />
          </div>
          <div>
            <div className={styles.count}>1,050</div>
            <div className={styles.label}>Total Users</div>
          </div>
        </div>
        <div className={styles.separator} />
        <div className={styles.summaryItem}>
          <div className={styles.iconWrapperChurches}>
            <Church size={24} />
          </div>
          <div>
            <div className={styles.count}>150</div>
            <div className={styles.label}>Total Churches</div>
          </div>
        </div>
      </div>
    </div>
  );
}
