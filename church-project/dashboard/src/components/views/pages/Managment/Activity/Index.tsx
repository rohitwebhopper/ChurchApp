import styles from './index.module.css';

type SubEvent = {
  time: string;
  status: 'success' | 'failure';
  text: string;
};

type Activity = {
  date: string;
  icon: string;
  title: string;
  subEvents: SubEvent[];
};

const activities: Activity[] = [
  {
    date: '20-04-2025',
    icon: '👦',
    title: 'Sub Admin Jolly',
    subEvents: [
      { time: '4:37 pm', status: 'success', text: 'Reply the Contact us Form' },
      { time: '4:37 pm', status: 'failure', text: 'Delete The User Washin' },
    ],
  },
  {
    date: '20-05-2025',
    icon: '👦',
    title: 'Sub Admin Rahul',
    subEvents: [
      { time: '4:37 pm', status: 'success', text: 'Reply to prayer request' },
      { time: '4:27 pm', status: 'success', text: 'Prayer Request approve' },
      { time: '4:27 pm', status: 'success', text: 'Received Project Donation' },
    ],
  },
  
    {
    date: '23-05-2025',
    icon: '👦',
    title: 'Sub Admin Mridual',
    subEvents: [
      { time: '4:37 pm', status: 'success', text: 'Received Offering Donation' },
      { time: '4:27 pm', status: 'success', text: 'Received Tithes Donation ' },
      { time: '4:27 pm', status: 'success', text: 'Add Upcoming Event' },
    ],
  },
];

export default function ActivityLog() {
  return (
    <>
      <h2 className={styles.title}>Activity Log</h2>
    <div className={styles.container}>
      <div className={styles.timeline}>
        {activities.map((activity, i) => (
          <div key={i} className={styles.block}>
            <div className={styles.time}>
              <span >{activity.date}</span>
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
                      event.status === 'success' ? styles.success : styles.failure
                    }`}
                  />
                  <div className={styles.text}>{event.text}</div>
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
