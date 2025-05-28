import FinanceCard from "@/components/ui/Card/Finance/Card";
import PrayerRequestsCard from "@/components/ui/Card/Prayers/Card";
import ActiveProjectsCard from "@/components/ui/Card/Projects/Card";
import SavedChurchesCard from "@/components/ui/Card/SavedChurches/Card";
import { FaUsers, FaChurch } from "react-icons/fa";

import styles from "./index.module.css";
import UserCard from "@/components/ui/Card/User/Card";

const DashboardComponent = () => {
  return (
    <div>
        <div className={styles.cardGrid}>
          <UserCard
            icon={FaUsers}
            count="1,050"
            label="Total Users"
            iconWrapperClass="iconWrapperUsers"
          />
          <UserCard
            icon={FaChurch}
            count="150"
            label="Total Churches"
            iconWrapperClass="iconWrapperChurches"
          />
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
