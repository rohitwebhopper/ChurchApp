import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./index.module.css";
import RoleCard from "./Card/Index";
import type { Role } from "@/components/interface/RoleInterface";
import Button from "@/components/ui/Button/Index";
import { FaUserShield } from "react-icons/fa6";
import { useTranslation } from "react-i18next";

const RolesPage: React.FC = () => {
  const { t } = useTranslation();

  const [roles, setRoles] = useState<Role[]>([
    {
      id: "1",
      name: "Admin",
      description: "Has full access to all features and settings.",
      permissions: ["edit", "delete", "read"],
    },
    {
      id: "2",
      name: "Sub Admin",
      description: "Limited access to manage users and content.",
      permissions: ["read", "edit"],
    },
  ]);

  const navigate = useNavigate();

  const handleDelete = (id: string) => {
    setRoles((prev) => prev.filter((r) => r.id !== id));
  };

  const handleEdit = (id: string) => {
    navigate(`/management/roles/create/${id}`);
  };

  return (
    <div className={styles.container}>
      <div className={styles.topBar}>
        <div className="flex items-center gap-2 mb-4">
          <FaUserShield
            className="text-2xl"
            style={{ color: "var(--secondary_black)" }}
          />
          <h2
            className="text-xl"
            style={{ fontFamily: "var( --font-marcellus)", fontWeight: "600" }}
          >
            {t("translate.roles")}
          </h2>
        </div>

        <Button
          size="small"
          onClick={() => navigate("/management/roles/create")}
        >
          {t("translate.createNewRole")}
        </Button>
      </div>

      <div className={styles.grid}>
        {roles.map((role) => (
          <RoleCard
            key={role.id}
            role={role}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default RolesPage;
