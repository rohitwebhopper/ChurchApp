import FinanceCard from "@/components/ui/Card/Finance/Card";
import PrayerRequestsCard from "@/components/ui/Card/Prayers/Card";
import ActiveProjectsCard from "@/components/ui/Card/Projects/Card";
import SavedChurchesCard from "@/components/ui/Card/SavedChurches/Card";
import { FaUsers, FaChurch } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import styles from "./index.module.css";
import { MdEventNote } from "react-icons/md";
import UserCard from "@/components/ui/Card/User/Card";


const DashboardComponent = () => {
  const { t } = useTranslation();
  return (
    <div>
      <div className={styles.cardGrid}>
        <UserCard
          icon={FaUsers}
          count="1,050"
          label={t("translate.totalUsers")}
          iconWrapperClass="iconWrapperUsers"
        />
        <UserCard
          icon={FaChurch}
          count="150"
          label={t("translate.totalChurches")}
          iconWrapperClass="iconWrapperChurches"
        />
        <UserCard
          icon={MdEventNote}
          count="150"
          label={t("translate.totalevents")}
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
