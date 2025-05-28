import { useEffect, useRef, useState } from "react";
import { HiOutlineBell, HiOutlineTrash } from "react-icons/hi";
import { CiMail } from "react-icons/ci";
import { IoMailUnreadOutline } from "react-icons/io5";
import styles from "./index.module.css";

interface Notification {
  id: number;
  type: "donationReceived" | "register";
  user: string;
  isNew: boolean;
}

const initialNotifications: Notification[] = [
  { id: 1, type: "donationReceived", user: "John Doe", isNew: true },
  { id: 2, type: "register", user: "Jane Smith", isNew: true },
  { id: 3, type: "donationReceived", user: "Blessing M.", isNew: true },
  { id: 3, type: "donationReceived", user: "Blessing M.", isNew: true },
  { id: 4, type: "register", user: "Tolu A.", isNew: false },
  { id: 5, type: "donationReceived", user: "Michael D.", isNew: false },
  { id: 6, type: "donationReceived", user: "Michael D.", isNew: false },
  { id: 7, type: "donationReceived", user: "Michael D.", isNew: false },
  { id: 8, type: "donationReceived", user: "Michael D.", isNew: false },
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

  const renderMessage = (n: Notification) => {
    if (n.type === "donationReceived")
      return `Donation received from ${n.user}`;
    if (n.type === "register") return `${n.user} registered`;
    return "";
  };

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
                    {n.isNew ? (
                      <span className={styles.newLabel}>
                        <IoMailUnreadOutline />
                      </span>
                    ) : (
                      <CiMail className={styles.iconsize} />
                    )}
                    <span>{renderMessage(n)}</span>
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
