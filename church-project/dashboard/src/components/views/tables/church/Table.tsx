import { useState } from "react";
import ModernTable from "@components/ui/Table/Index";
import type { Column, ActionButton } from "@components/ui/Table/Index";
import type { Church } from "@/components/interface/ChurchInterface";
import AddEditChurch from "../../model/church/Modal";
import Pagination from "@/components/ui/Pagination/Index";

export default function ChurchManagement() {
  const [churches, setChurches] = useState<Church[]>([
    {
      id: 1,
      name: "Grace Community Church",
      email: "gracechurch@example.com",
      phone: 1234567890,
      regNo: "REG-001",
      bankname: "First National Bank",
      accno: 1234567890,
      isccode: "FNB12345",
      status: "Pending",
      payeename: "Grace Church",
      location: "123 Faith St, Springfield",
      churchrule: "Rulebook v1.0",
    },
    {
      id: 2,
      name: "Holy Trinity Chapel",
      email: "trinitychapel@example.com",
      phone: 9876543210,
      regNo: "REG-002",
      bankname: "Unity Bank",
      accno: 9876543210,
      status: "Active",
      isccode: "UBK56789",
      payeename: "Trinity Chapel",
      location: "456 Worship Way, Riverdale",
      churchrule: "Guidelines 2024",
    },
    {
      id: 3,
      name: "New Life Ministries",
      email: "newlife@example.com",
      phone: 5551234567,
      regNo: "REG-003",
      bankname: "Kingdom Trust Bank",
      accno: 1122334455,
      status: "Pending",
      isccode: "KTB43210",
      payeename: "New Life Church",
      location: "789 Renewal Rd, Centerville",
      churchrule: "Bylaws Rev. 3",
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
    { key: "name", label: "Church Name" },
    { key: "email", label: "Email" },
    { key: "phone", label: "Phone" },
    { key: "regNo", label: "Reg No" },
    { key: "bankname", label: "Bank Name" },
    { key: "accno", label: "Account No" },
    { key: "isccode", label: "IFSC" },
    { key: "payeename", label: "Payee Name" },
    { key: "location", label: "Location" },
    { key: "churchrule", label: "Church Rule" },

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
      onClick:handleEdit,
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

  const handlePageChange = ()=>{

  }

  return (
    <div>
      <ModernTable
        columns={columns}
        data={churches}
        actions={actions}
        keyField="id"
      />
      <Pagination currentPage={1} totalPages={5} onPageChange={handlePageChange}/>
      <AddEditChurch open={openModal} close={handleClose} data={selectedChurch} />
    </div>
  );
}
