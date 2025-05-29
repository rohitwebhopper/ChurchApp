import Table from "@/components/ui/Table/Index";
import type { ActionButton, Column } from "@components/ui/Table/Index";
import type { DonationType } from "@/components/interface/Donation";
import Pagination from "@/components/ui/Pagination/Index";
import { useTranslation } from "react-i18next";

interface Props {
  data: DonationType[];
}

const DonationTable: React.FC<Props> = ({ data }) => {
  const { t } = useTranslation();
  const columns: Column<DonationType>[] = [
    { key: "donor", label: t("translate.donor") },
    { key: "amount", label: t("translate.amount") },
    { key: "type", label: t("translate.type") },
    { key: "date", label: t("translate.date") },
    { key: "description", label: t("translate.description") },
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
