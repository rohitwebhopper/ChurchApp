import { useState } from "react";
import { useTranslation } from "react-i18next";
import Grid from "@/components/ui/Grid/Index";
import type { DonorTransact } from "@/components/interface/DonorTransaction";
import TransactionTable from "@/components/views/tables/donation/transaction/Table";
import DateRangeFilter from "@/components/ui/DateRange/Index";
import { FaHistory } from "react-icons/fa";
import Dropdown from "@/components/ui/Dropdown/Index";

const transactions: DonorTransact[] = [
  {
    id: "1",
    donor: "John Doe",
    churchName: "Grace Community Church",
    amount: 1000,
    transactionNumber: "TXN001",
    paymentMethod: "Paystack",
    date: "2025-05-31",
    type: "Tithe",
    churchSharePercentage: 80,
    adminSharePercentage: 20,
  },
  {
    id: "2",
    donor: "Jane Smith",
    churchName: "Holy Trinity Chapel",
    amount: 500,
    transactionNumber: "TXN002",
    paymentMethod: "Paystack",
    date: "2025-05-30",
    type: "Offering",
    churchSharePercentage: 70,
    adminSharePercentage: 30,
  },
];

const DonorTransactions = () => {
  const { t } = useTranslation();

  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([
    null,
    null,
  ]);
  const [startDate, endDate] = dateRange;
  const [activeType, setActiveType] = useState<string>("");

  const filtered = transactions.filter((t) => {
    const transactionDate = new Date(t.date);
    const start = startDate ? new Date(startDate) : null;
    const end = endDate ? new Date(endDate) : null;

    const withinDateRange =
      (!start || transactionDate >= start) && (!end || transactionDate <= end);

    return withinDateRange;
  });
  const options = [
    { label: t("translate.selectChurch"), value: "" },
    { label: "Grace Community Church", value: "Grace Community Church" },
    { label: "Holy Trinity Chapel", value: "Holy Trinity Chapel" },
    { label: "New Life Ministries", value: "New Life Ministries" },
  ];
  return (
    <Grid gap="lg">
      <Grid.Row>
        <Grid.Column span={{ base: 12 }}>
          <div
            className="flex items-center gap-2 mb-4"
            style={{ color: "var(--primary)" }}
          >
            <FaHistory className="text-2xl text-primary" />
            <h2
              className="text-xl"
              style={{
                fontFamily: "var( --font-marcellus)",
                fontWeight: "600",
              }}
            >
              {t("translate.donorTransaction")}
            </h2>
          </div>
        </Grid.Column>
      </Grid.Row>

      <Grid.Row>
        <Grid.Column className="flex justify-end" span={{ base: 12 }}>
          <div className="w-50 me-4 ">
            <Dropdown
              options={options}
              value={activeType}
              // onChange={setActiveType}
              onChange={(value) => {
                if (Array.isArray(value)) {
                  setActiveType(value[0] ?? "");
                } else {
                  setActiveType(value);
                }
              }}
              variant="underline"
            />
          </div>

          <div className="mt-1" >
            <DateRangeFilter
              startDate={startDate}
              endDate={endDate}
              onChange={setDateRange}
            />
          </div>
        </Grid.Column>
      </Grid.Row>

      <Grid.Row>
        <Grid.Column className="mt-6" span={{ base: 12 }}>
          <TransactionTable data={filtered} />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default DonorTransactions;
