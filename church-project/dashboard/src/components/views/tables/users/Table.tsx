import { useState } from "react";
import ModernTable from "@components/ui/Table/Index";
import type { Column, ActionButton } from "@components/ui/Table/Index";

type Church = {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  status: "Active" | "Inactive" | "Pending";
};

export default function UserTable() {
  const [churches, setChurches] = useState<Church[]>([
    {
      id: 1,
      name: "Grace Church",
      email: "gracechurch@gmail.com",
      status: "Active",
      phone: "9876543210",
      address: "Zirkpur",
    },
    {
      id: 2,
      name: "Hope Church",
      email: "hopechurch@gmail.com",
      status: "Pending",
      phone: "9876543210",
      address: "Punjab",
    },
    {
      id: 3,
      name: "Faith Church",
      email: "faithchurch@gmail.com",
      status: "Active",
      phone: "9876543210",
      address: "Chandigarh",
    },
  ]);

  const columns: Column<Church>[] = [
    { key: "name", label: "Name" },
    { key: "phone", label: "Phone" },
    { key: "email", label: "Email" },
    { key: "address", label: "Address" },

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
                ? "rgba(0,128,0,0.15)"
                : c.status === "Inactive"
                ? "rgba(128,128,128,0.15)"
                : "rgba(255,165,0,0.15)",
            color:
              c.status === "Active"
                ? "green"
                : c.status === "Inactive"
                ? "gray"
                : "orange",
            fontWeight: "600",
            fontSize: "12px",
            userSelect: "none",
          }}
        >
          {c.status}
        </span>
      ),

      hideIfEmpty: true,
    },
  ];

  const actions: ActionButton<Church>[] = [
    {
      type: "update",
      onClick: (church) => alert(`Edit ${church.name}`),
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
    </div>
  );
}
