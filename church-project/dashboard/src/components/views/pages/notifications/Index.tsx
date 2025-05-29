import { useState } from "react";
import { useTranslation } from "react-i18next";
import styles from "./index.module.css";
import type { Option } from "@/components/ui/Dropdown/Index";
import Dropdown from "@/components/ui/Dropdown/Index";

type TargetMode =
  | "all"
  | "allChurches"
  | "allUsers"
  | "selectedChurches"
  | "selectedUsers";

type User = {
  id: string;
  name: string;
  church: string;
};

const mockChurches = ["Church A", "Church B", "Church C"];
const mockUsers: User[] = [
  { id: "1", name: "John Doe", church: "Church A" },
  { id: "2", name: "Jane Smith", church: "Church B" },
  { id: "3", name: "David Kim", church: "Church A" },
  { id: "4", name: "Sarah Lee", church: "Church C" },
];

const NotificationsPage = () => {
  const { t } = useTranslation();

  const [targetMode, setTargetMode] = useState<TargetMode>("all");
  const [selectedChurches, setSelectedChurches] = useState<string[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");

  const filteredUsers = mockUsers.filter((user) =>
    selectedChurches.includes(user.church)
  );

  const churchOptions: Option[] = mockChurches.map((c) => ({
    label: c,
    value: c,
  }));

  const userOptions: Option[] = filteredUsers.map((u) => ({
    label: `${u.name} (${u.church})`,
    value: u.id,
  }));

  const handleSend = () => {
    const payload = {
      title,
      message,
      target: {
        mode: targetMode,
        selectedChurches,
        selectedUsers,
      },
    };
    console.log("Sending Notification:", payload);
    alert(t("notificationSentAlert"));
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.pageTitle}>{t("translate.sendNotification")}</h2>

      <div className={styles.formGroup}>
        <label className={styles.label}>{t("translate.title")}</label>
        <input
          className={styles.input}
          placeholder={t("translate.enterNotificationTitle")}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>{t("translate.message")}</label>
        <textarea
          className={styles.textarea}
          placeholder={t("translate.writeYourMessageHere")}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>{t("translate.sendTo")}</label>
        <select
          className={styles.select}
          value={targetMode}
          onChange={(e) => {
            setTargetMode(e.target.value as TargetMode);
            setSelectedChurches([]);
            setSelectedUsers([]);
          }}
        >
          <option value="all">{t("translate.allChurchesUsers")}</option>
          <option value="allChurches">{t("translate.allChurches")}</option>
          <option value="allUsers">{t("translate.allUsers")}</option>
          <option value="selectedChurches">
            {t("translate.selectedChurches")}
          </option>
          <option value="selectedUsers">
            {t("translate.selectedUsersOfSelectedChurches")}
          </option>
        </select>
      </div>

      {(targetMode === "selectedChurches" ||
        targetMode === "selectedUsers") && (
        <div className={styles.formGroup}>
          <label className={styles.label}>
            {t("translate.selectChurches")}
          </label>
          <Dropdown
            options={churchOptions}
            value={selectedChurches}
            onChange={(val) => setSelectedChurches(val as string[])}
            isMulti
            variant="default"
            placeholder={t("translate.selectChurchesPlaceholder")}
          />
        </div>
      )}

      {targetMode === "selectedUsers" && selectedChurches.length > 0 && (
        <div className={styles.formGroup}>
          <label className={styles.label}>{t("translate.selectUsers")}</label>
          <Dropdown
            options={userOptions}
            value={selectedUsers}
            onChange={(val) => setSelectedUsers(val as string[])}
            isMulti
            variant="default"
            placeholder={t("translate.selectUsersPlaceholder")}
          />
        </div>
      )}

      <button className={styles.sendButton} onClick={handleSend}>
        {t("translate.sendNotification")}
      </button>
    </div>
  );
};

export default NotificationsPage;
