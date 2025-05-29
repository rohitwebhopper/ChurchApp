import type { DonorTransact } from "@/components/interface/DonorTransaction";
import Pagination from "@/components/ui/Pagination/Index";
import Table from "@/components/ui/Table/Index";
import type { ActionButton, Column } from "@components/ui/Table/Index";
import { useTranslation } from "react-i18next";
interface Props {
  data: DonorTransact[];
}

const TransactionTable: React.FC<Props> = ({ data }) => {
  const { t } = useTranslation();
  const columns: Column<DonorTransact>[] = [
    { key: "donor", label: t("translate.donor") },
    { key: "amount", label: t("translate.amount") },
    { key: "transactionNumber", label: t("translate.txnNo") }, 
    { key: "paymentMethod", label: t("translate.paymentMethod") },
    { key: "date", label: t("translate.date") },
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
