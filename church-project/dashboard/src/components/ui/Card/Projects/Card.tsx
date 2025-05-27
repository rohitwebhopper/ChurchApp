import styles from "./card.module.css";

const projects = [
  { projectName: "Youth Outreach", church: "Grace Church" },
  { projectName: "Food Drive", church: "First Baptist Church" },
  { projectName: "Community Choir", church: "St. Luke's Church" },
  { projectName: "Holiday Shelter", church: "Holy Trinity Church" },
  { projectName: "Sunday School Renovation", church: "New Hope Church" },
];

export default function ActiveProjectsCard() {
  return (
    <div className={styles.card}>
      <h2 className={styles.title}>Active Projects - Churches</h2>
      <div className={styles.projectList}>
        {projects.map((proj, index) => (
          <div key={index} className={styles.projectItem}>
            <div className={styles.projectName}>{proj.projectName}</div>
            <div className={styles.churchName}>by {proj.church}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
