import { useEffect, useRef, useState } from "react";
import { HiOutlineBell, HiOutlineTrash } from "react-icons/hi";
import styles from "./index.module.css";

interface Notification {
  id: number;
  message: string;
  isNew: boolean;
}

const initialNotifications: Notification[] = [
  { id: 1, message: "New user registered", isNew: true },
  { id: 2, message: "New user registered", isNew: true },
  { id: 3, message: "New donation received", isNew: true },
  { id: 4, message: "New donation received", isNew: true },
  { id: 5, message: "New donation received", isNew: false },
  { id: 6, message: "New donation received", isNew: false },
  { id: 7, message: "New donation received", isNew: false },
  { id: 9, message: "New donation received", isNew: false },
  { id: 10, message: "New donation received", isNew: false },
  { id: 11, message: "New donation received", isNew: false },
  { id: 12, message: "New donation received", isNew: false },
  { id: 13, message: "New donation received", isNew: false },
  { id: 14, message: "New donation received", isNew: false },
];

const NotificationDropdown = () => {
  const [notifications, setNotifications] =
    useState<Notification[]>(initialNotifications);
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleToggle = () => setOpen((prev) => !prev);
  const handleRemove = (id: number) =>
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  const handleClearAll = () => setNotifications([]);

  const newCount = notifications.filter((n) => n.isNew).length;

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={styles.dropdownWrapper} ref={dropdownRef}>
      <div className={styles.notificationButton} onClick={handleToggle}>
        <HiOutlineBell
          className={`${styles.icon} ${open ? styles.iconActive : ""}`}
        />
        {newCount > 0 && (
          <>
            <span className={styles.notificationDot}></span>
            <span className={styles.notificationCount}>{newCount}</span>
          </>
        )}
      </div>

      {open && (
        <div className={styles.dropdown}>
          <div className={styles.dropdownHeader}>
            <span>Notifications</span>
            <button className={styles.clearBtn} onClick={handleClearAll}>
              Clear All
            </button>
          </div>

          {notifications.length === 0 ? (
            <div className={styles.empty}>You're all caught up! 🎉</div>
          ) : (
            <ul className={styles.notificationList}>
              {notifications.map((n) => (
                <li
                  key={n.id}
                  className={`${styles.notificationItem} ${
                    n.isNew ? styles.newNotification : ""
                  }`}
                >
                  <div className={styles.messageContent}>
                    {n.isNew && <span className={styles.newLabel}>NEW</span>}
                    <span>{n.message}</span>
                  </div>
                  <button
                    className={styles.removeBtn}
                    onClick={() => handleRemove(n.id)}
                  >
                    <HiOutlineTrash />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationDropdown;
