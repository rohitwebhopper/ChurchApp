import { useState } from "react";
import { useTranslation } from "react-i18next";
import ModernTable from "@components/ui/Table/Index";
import type { Column, ActionButton } from "@components/ui/Table/Index";
import type { GetConnectedEntry } from "@/components/interface/GetConnected";
import Pagination from "@/components/ui/Pagination/Index";

export default function GetConnectedTable() {
  const { t } = useTranslation();
  const [entries, setEntries] = useState<GetConnectedEntry[]>([
    {
      id: "1",
      name: "David Johnson",
      phone: 9876543210,
      email: "david@example.com",
      address: "123 Main St, Springfield",
      churchName: "Grace Community Church",
      desctiption: "For Prayere Request",
      createdAt: "2025-05-20",
    },
    {
      id: "2",
      name: "Asha Patel",
      phone: 9123456789,
      email: "asha@example.com",
      address: "456 Church Rd, Mumbai",
      churchName: "Holy Trinity Chapel",
      desctiption: "I Want to Invest in projects",
      createdAt: "2025-05-21",
    },
    {
      id: "3",
      name: "Samuel Lee",
      phone: 9988776655,
      email: "samuel@example.com",
      address: "789 Faith Ave, Delhi",
      churchName: "New Life Ministries",
      desctiption: "Send Me location of church",
      createdAt: "2025-05-22",
    },
  ]);

  const columns: Column<GetConnectedEntry>[] = [
    { key: "name", label: t("translate.name") },
    { key: "email", label: t("translate.email") },
    { key: "phone", label: t("translate.phone") },
    { key: "address", label: t("translate.address") },
    { key: "churchName", label: t("translate.churchName") },
    { key: "desctiption", label: t("translate.description") },
    { key: "createdAt", label: "Date" },
  ];

  const actions: ActionButton<GetConnectedEntry>[] = [
    {
      type: "delete",
      onClick: (entry) =>
        setEntries((prev) => prev.filter((e) => e.id !== entry.id)),
    },
  ];

  const handlePageChange = () => {
    //  pagination logic here
  };

  return (
    <div>
      <ModernTable
        columns={columns}
        data={entries}
        actions={actions}
        keyField="id"
      />
      <Pagination
        currentPage={1}
        totalPages={5}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
