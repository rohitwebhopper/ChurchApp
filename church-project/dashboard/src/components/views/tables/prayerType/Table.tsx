import ModernTable from "@/components/ui/Table/Index";
import type { Column, ActionButton } from "@/components/ui/Table/Index";
import { useTranslation } from "react-i18next";

type PrayerType = {
  id: string;
  name: string;
};

type Props = {
  data: PrayerType[];
  onEdit: (item: PrayerType) => void;
  onDelete: (item: PrayerType) => void;
};

const PrayerTable = ({ data, onEdit, onDelete }: Props) => {
  const { t } = useTranslation();

  const columns: Column<PrayerType>[] = [
    { key: "name", label: t("translate.prayertype") || "Prayer Type" },
  ];

  const actions: ActionButton<PrayerType>[] = [
    { type: "update", onClick: onEdit },
    { type: "delete", onClick: onDelete },
  ];

  return (
    <ModernTable
      columns={columns}
      data={data}
      actions={actions}
      keyField="id"
    />
  );
};

export default PrayerTable;
