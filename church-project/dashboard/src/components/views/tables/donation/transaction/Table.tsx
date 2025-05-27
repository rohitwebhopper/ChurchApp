import type { DonorTransact } from "@/components/interface/DonorTransaction";
import Pagination from "@/components/ui/Pagination/Index";
import Table from "@/components/ui/Table/Index";
import type { ActionButton, Column } from "@components/ui/Table/Index";

interface Props {
  data: DonorTransact[];
}

const TransactionTable: React.FC<Props> = ({ data }) => {
  const columns: Column<DonorTransact>[] = [
    { key: "donor", label: "Donor" },
    { key: "amount", label: "Amount" },
    { key: "transactionNumber", label: "Txn No:" },
    { key: "paymentMethod", label: "Payment Method" },
    { key: "date", label: "Date" },
  ];
    
    
        const actions: ActionButton<DonorTransact>[] = [
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

export default TransactionTable;
