import { useTranslation } from "react-i18next";
import styles from "./index.module.css";

type SubEvent = {
  time: string;
  status: "success" | "failure";
  text: string;
  name?: string; // optional for dynamic placeholder
};

type Activity = {
  time: string;
  date: string;
  icon: string;
  title: string;
  subEvents: SubEvent[];
};

const activities: Activity[] = [
  {
    date: "20-04-2025",
    time: "4:37 pm",
    icon: "👦",
    title: "Sub Admin Jolly",
    subEvents: [
      { time: "4:37 pm", status: "success", text: "replyContactForm" },
      {
        time: "4:37 pm",
        status: "failure",
        text: "deleteUser",
        name: "Washin",
      },
    ],
  },
  {
    date: "20-05-2025",
    time: "4:27 pm",
    icon: "👦",
    title: "Sub Admin Rahul",
    subEvents: [
      { time: "4:37 pm", status: "success", text: "replyPrayerRequest" },
      { time: "4:27 pm", status: "success", text: "approvePrayerRequest" },
      { time: "4:27 pm", status: "success", text: "receivedProjectDonation" },
    ],
  },
  {
    date: "23-05-2025",
    time: "4:27 pm",
    icon: "👦",
    title: "Sub Admin Mridual",
    subEvents: [
      { time: "4:37 pm", status: "success", text: "receivedOfferingDonation" },
      { time: "4:27 pm", status: "success", text: "receivedTithesDonation" },
      { time: "4:27 pm", status: "success", text: "addUpcomingEvent" },
    ],
  },
];

export default function ActivityLog() {
  const { t } = useTranslation();

  return (
    <>
      <h2 className={styles.title}>{t("translate.activityLog")}</h2>
      <div className={styles.container}>
        <div >
          {activities.map((activity, i) => (
            <div key={i} className={styles.block}>
              <div className={styles.time}>
                <span>{activity.date}</span>
              </div>
              <div className={styles.icon}>{activity.icon}</div>
              <div className={styles.content}>
                <div className={styles.heading}>{activity.title}</div>
                {activity.subEvents.map((event, j) => (
                  <div key={j} className={styles.eventBox}>
                    <div className={styles.subTime}>
                      {activity.date} {event.time}
                    </div>
                    <div
                      className={`${styles.status} ${
                        event.status === "success"
                          ? styles.success
                          : styles.failure
                      }`}
                    />
                    <div className={styles.text}>
                      {event.name
                        ? t(`translate.${event.text}`, { name: event.name })
                        : t(`translate.${event.text}`)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
