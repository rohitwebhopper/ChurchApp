import DatePicker from "react-datepicker";
import { MdClear } from "react-icons/md";
import styles from "./index.module.css";
import { useTranslation } from "react-i18next";

interface DateRangeFilterProps {
  startDate: Date | null;
  endDate: Date | null;
  onChange: (dates: [Date | null, Date | null]) => void;
}

const DateRangeFilter = ({
  startDate,
  endDate,
  onChange,
}: DateRangeFilterProps) => {
  const { t } = useTranslation();
  const handleClear = () => {
    onChange([null, null]);
  };

  return (
    <div className={styles.container}>
      <DatePicker
        selected={startDate}
        onChange={(dates) => onChange(dates as [Date | null, Date | null])}
        startDate={startDate}
        endDate={endDate}
        selectsRange
        inline={false}
        placeholderText={t("translate.selectDateRange")}
        className={styles.datePickerInput}
        showMonthDropdown
        showYearDropdown
        dropdownMode="select"
      />
      {(startDate || endDate) && (
        <button
          className={styles.clearButton}
          onClick={handleClear}
          aria-label="Clear date range"
          type="button"
        >
          <MdClear />
        </button>
      )}
    </div>
  );
};

export default DateRangeFilter;
