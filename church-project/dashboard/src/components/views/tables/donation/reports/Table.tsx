import type { DonationRep } from "@/components/interface/DonationReports";
import Pagination from "@/components/ui/Pagination/Index";
import Table from "@/components/ui/Table/Index";
import type { ActionButton, Column } from "@components/ui/Table/Index";
import { useTranslation } from "react-i18next";

interface Props {
  data: DonationRep[];
}

const ReportsTable: React.FC<Props> = ({ data }) => {
  const { t } = useTranslation();
    const columns: Column<DonationRep>[] = [
      { key: "donor", label: t("translate.donor") },
      { key: "amount", label: t("translate.amount") },
      { key: "churchName", label: t("translate.churchName") },
      { key: "date", label: t("translate.date") },
      { key: "description", label: t("translate.description") },
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
