import FinanceCard from "@/components/ui/Card/Finance/Card";
import PrayerRequestsCard from "@/components/ui/Card/Prayers/Card";
import ActiveProjectsCard from "@/components/ui/Card/Projects/Card";
import SavedChurchesCard from "@/components/ui/Card/SavedChurches/Card";
import UserCard from "@/components/ui/Card/User/Card";

import styles from "./index.module.css";

const DashboardComponent = () => {
  return (
    <div>
      <div className={styles.cardSmall}>
        <UserCard />
      </div>

      <div className={styles.bottomContainer}>
        <div className={styles.column}>
          <ActiveProjectsCard />
          <SavedChurchesCard />
        </div>
        <div className={styles.column}>
          <FinanceCard />
          <PrayerRequestsCard />
        </div>
      </div>
    </div>
  );
};

export default DashboardComponent;
