import { useState } from "react";
import ModernTable from "@components/ui/Table/Index";
import type { Column, ActionButton } from "@components/ui/Table/Index";

type Church = {
  id: number;
  name: string;
  location: string;
  donation: string;
  message: string;
  address: string;
  status: "Active" | "Inactive" | "Pending";
};

export default function ChurchManagement() {
  const [churches, setChurches] = useState<Church[]>([
    {
      id: 1,
      name: "Grace Church",
      location: "NY",
      status: "Active",
      donation: "20",
      message: "The Message the let be chect to content ricid rej",
      address: "The Message the let be chect to content ricid rej",
    },
    {
      id: 2,
      name: "Hope Church",
      location: "LA",
      status: "Pending",
      donation: "20",
      message: "The Message the let be chect to content ricid rej",
      address: "The Message the let be chect to content ricid rej",
    },
    {
      id: 3,
      name: "Faith Church",
      location: "TX",
      status: "Inactive",
      donation: "20",
      message: "The Message the let be chect to content ricid rej",
      address: "The Message the let be chect to content ricid rej",
    },
  ]);

  const columns: Column<Church>[] = [
    { key: "name", label: "Church Name" },
    { key: "location", label: "Location" },
    { key: "donation", label: "Donation" },
    { key: "message", label: "Message" },
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
      show: (church) => church.status !== "Inactive",
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
