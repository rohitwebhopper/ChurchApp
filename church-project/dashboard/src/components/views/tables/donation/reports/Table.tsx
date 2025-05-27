import type { DonationRep } from "@/components/interface/DonationReports";
import Pagination from "@/components/ui/Pagination/Index";
import Table from "@/components/ui/Table/Index";
import type { ActionButton, Column } from "@components/ui/Table/Index";

interface Props {
  data: DonationRep[];
}

const ReportsTable: React.FC<Props> = ({ data }) => {
    const columns: Column<DonationRep>[] = [
      { key: "donor", label: "Donor" },
      { key: "amount", label: "Amount" },
      { key: "churchName", label: "Church Name" },
      { key: "date", label: "Date" },
      { key: "description", label: "Description" },
    ];

    const actions: ActionButton<DonationRep>[] = [
      {
        type: "delete",
        onClick: (record) => alert(`Delete ${record.donor}`),
      },
    ];

  const handlePageChange = () => {};

  return (
    <>
      <Table columns={columns} data={data} keyField="id" actions={actions} />
      <Pagination
        currentPage={1}
        totalPages={5}
        onPageChange={handlePageChange}
      />
    </>
  );
};

export default ReportsTable;
