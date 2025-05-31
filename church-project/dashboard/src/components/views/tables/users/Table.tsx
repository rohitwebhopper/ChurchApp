import { useState } from "react";
import { useTranslation } from "react-i18next";
import ModernTable from "@components/ui/Table/Index";
import type { Column, ActionButton } from "@components/ui/Table/Index";
import AddEditUser from "@components/views/model/users/Modal";

type Church = {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  churchname: string;
  status: "Active" | "Inactive" | "Pending";
};

export default function UserTable() {

const { t } = useTranslation();
  const [churches, setChurches] = useState<Church[]>([
    {
      id: 1,
      name: "Grace Church",
      email: "gracechurch@gmail.com",
      status: "Active",
      phone: "9876543210",
      address: "Zirakpur",
      churchname: "Grace Community Church",
    },
    {
      id: 2,
      name: "Hope Church",
      email: "hopechurch@gmail.com",
      status: "Pending",
      phone: "9876543210",
      address: "Punjab",
      churchname: "Holy Trinity Chapel",
    },
    {
      id: 3,
      name: "Faith Church",
      email: "faithchurch@gmail.com",
      status: "Active",
      phone: "9876543210",
      address: "Chandigarh",
      churchname: "New Life Ministries",
    },
  ]);

  const [openModal, setOpenModal] = useState(false);
  const [selectedChurch, setSelectedChurch] = useState<Church | null>(null);

  const handleEdit = (church: Church) => {
    setSelectedChurch(church);
    setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false);
    setSelectedChurch(null);
  };

  const columns: Column<Church>[] = [
    { key: "name", label: t("translate.name") },
    { key: "email", label: t("translate.email") },
    { key: "phone", label: t("translate.phone") },
    { key: "address", label: t("translate.address") },
    { key: "churchname", label: t("translate.churchName") },
    {
      key: "status",
      label: "Status",
      render: (c) => (
        <span
          style={{
            padding: "4px 10px",
            borderRadius: 15,
            backgroundColor:
              c.status === "Active"
                ? "var(--positive)"
                : c.status === "Inactive"
                ? "var(--negative)"
                : "var(--warning)",
            color: "var(--primarywhite)",
            fontWeight: "600",
            fontSize: "12px",
            userSelect: "none",
          }}
        >
          {t(`translate.${c.status}`)}
        </span>
      ),
      hideIfEmpty: true,
    },
  ];

  const actions: ActionButton<Church>[] = [
    {
      type: "update",
      onClick: handleEdit,
    },
    {
      type: "delete",
      onClick: (church) => alert(`Delete ${church.name}`),
    },
    {
      type: "toggle",
      onClick: (church) =>
        setChurches((prev) =>
          prev.map((c) =>
            c.id === church.id
              ? {
                  ...c,
                  status: c.status === "Active" ? "Inactive" : "Active",
                }
              : c
          )
        ),
    },
  ];

  return (
    <div>
      <ModernTable
        columns={columns}
        data={churches}
        actions={actions}
        keyField="id"
      />
      <AddEditUser open={openModal} close={handleClose} data={selectedChurch} />
    </div>
  );
}
