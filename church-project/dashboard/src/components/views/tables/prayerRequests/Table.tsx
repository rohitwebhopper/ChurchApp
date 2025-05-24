import { useState } from "react";
import ModernTable from "@components/ui/Table/Index";
import type { Column, ActionButton } from "@components/ui/Table/Index";
import type { PrayerRequest } from "@/components/interface/PrayerRequest";
import Pagination from "@/components/ui/Pagination/Index";


const PrayerRequestTable = () => {
  const [requests, setRequests] = useState<PrayerRequest[]>([
    {
      id: 1,
      name: "John Doe",
      phone: 9876543210,
      email: "john@example.com",
      typeOfPrayer: "Healing",
      offering: "₹500",
      description: "Praying for recovery from surgery.",
      createdAt: "2025-05-20",
    },
    {
      id: 2,
      name: "Jane Smith",
      phone: 9123456780,
      email: "jane@example.com",
      typeOfPrayer: "Family",
      offering: "₹300",
      description: "Blessings for family unity.",
      createdAt: "2025-05-21",
    },
    {
      id: 3,
      name: "Rahul Sharma",
      phone: 9988776655,
      email: "rahul@example.com",
      typeOfPrayer: "Guidance",
      offering: "₹0",
      description: "Seeking wisdom for career decisions.",
      createdAt: "2025-05-22",
    },
  ]);

  const columns: Column<PrayerRequest>[] = [
    { key: "name", label: "Name" },
    { key: "phone", label: "Phone" },
    { key: "email", label: "Email" },
    { key: "typeOfPrayer", label: "Type of Prayer" },
    { key: "offering", label: "Offering" },
    { key: "description", label: "Description" },
    { key: "createdAt", label: "Created At" },
  ];

  const actions: ActionButton<PrayerRequest>[] = [
 
    {
      type: "delete",
      onClick: (req) =>
        setRequests((prev) => prev.filter((r) => r.id !== req.id)),
    },
  ];


    const handlePageChange = ()=>{

  }
  return (
    <div>
      <ModernTable
        columns={columns}
        data={requests}
        actions={actions}
        keyField="id"
      />
            <Pagination currentPage={1} totalPages={5} onPageChange={handlePageChange}/>
      
    </div>
  );
};

export default PrayerRequestTable;
