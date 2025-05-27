import Table from "@/components/ui/Table/Index";
import type { ActionButton, Column } from "@components/ui/Table/Index";
import type { DonationType } from "@/components/interface/Donation";
import Pagination from "@/components/ui/Pagination/Index";

interface Props {
  data: DonationType[];
}

const DonationTable: React.FC<Props> = ({ data }) => {
  const columns: Column<DonationType>[] = [
    { key: "donor", label: "Donor" },
    { key: "amount", label: "Amount" },
    { key: "type", label: "Type" },
    { key: "date", label: "Date" },
    { key: "description", label: "Description" },
  ];

  const actions: ActionButton<DonationType>[] = [
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

export default DonationTable;
