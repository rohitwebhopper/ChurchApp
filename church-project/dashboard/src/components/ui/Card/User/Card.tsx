import styles from "./card.module.css";
import type  { IconType } from "react-icons";

interface CardProps {
  icon: IconType;
  count: string;
  label: string;
  iconWrapperClass: string;
}

export default function UserCard({ icon: Icon, count, label, iconWrapperClass }: CardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.summaryItem}>
        <div className={styles[iconWrapperClass]}>
          <Icon size={24} />
        </div>
        <div>
          <div className={styles.count}>{count}</div>
          <div className={styles.label}>{label}</div>
        </div>
      </div>
    </div>
  );
}
