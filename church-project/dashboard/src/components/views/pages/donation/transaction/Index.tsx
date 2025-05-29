import { useState } from "react";
import { useTranslation } from "react-i18next";
import Grid from "@/components/ui/Grid/Index";
import type { DonorTransact } from "@/components/interface/DonorTransaction";
import TransactionTable from "@/components/views/tables/donation/transaction/Table";
import DateRangeFilter from "@/components/ui/DateRange/Index";
import { FaHistory } from "react-icons/fa";

const transactions: DonorTransact[] = [
  {
    id: 1,
    transactionNumber: "TXN-20250501-001",
    donor: "John Doe",
    amount: 1000,
    date: "2025-05-01",
    description: "Monthly Tithe",
    type: "Tithe",
    churchName: "Grace Church",
    paymentMethod: "Paystack",
  },
  {
    id: 2,
    transactionNumber: "TXN-20250510-002",
    donor: "Jane Smith",
    amount: 500,
    date: "2025-05-10",
    description: "Special Offering",
    type: "Offering",
    churchName: "Hope Church",
    paymentMethod: "Bank Transfer",
  },
  {
    id: 3,
    transactionNumber: "TXN-20250515-003",
    donor: "Rahul Sharma",
    amount: 1500,
    date: "2025-05-15",
    description: "Roof Repair Donation",
    type: "Project",
    churchName: "Grace Church",
    paymentMethod: "Card",
  },
];
  
const DonorTransactions = () => {
  const { t } = useTranslation();

  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([
    null,
    null,
  ]);
  const [startDate, endDate] = dateRange;

  const filtered = transactions.filter((t) => {
    const transactionDate = new Date(t.date);
    const start = startDate ? new Date(startDate) : null;
    const end = endDate ? new Date(endDate) : null;

    const withinDateRange =
      (!start || transactionDate >= start) && (!end || transactionDate <= end);



    return withinDateRange 
  });

  return (
    <Grid gap="lg">
      <Grid.Row>
        <Grid.Column span={{ base: 12 }}>
          <div
            className="flex items-center gap-2 mb-4"
            style={{ color: "var(--secondary_black)" }}
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
        <Grid.Column span={{ base: 12 }}>
          <div className="flex justify-end">
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
