import { useState } from "react";
import Grid from "@/components/ui/Grid/Index";
import Dropdown from "@/components/ui/Dropdown/Index";
import SearchInput from "@/components/ui/SearchInput/Index";
import ReportsTable from "@/components/views/tables/donation/reports/Table";
import type { DonationRep } from "@/components/interface/DonationReports";
import { MdReport } from "react-icons/md";

// Mock donation data
const donations: DonationRep[] = [
  {
    id: 1,
    donor: "John Doe",
    amount: 1000,
    date: "2025-05-01",
    description: "Monthly tithe",
    type: "Tithe",
    churchId: "church-1",
    churchName: "Grace Church",
  },
  {
    id: 2,
    donor: "Jane Smith",
    amount: 500,
    date: "2025-05-02",
    description: "Special Offering",
    type: "Offering",
    churchId: "church-2",
    churchName: "Hope Church",
  },
  {
    id: 3,
    donor: "Rahul Sharma",
    amount: 1500,
    date: "2025-05-05",
    description: "Church Roof Repair",
    type: "Project",
    churchId: "church-1",
    churchName: "Grace Church",
    projectName: "Roof Repair",
  },
];

// Dropdown options
const churchOptions = [
  { label: "All Churches", value: "" },
  { label: "Grace Church", value: "church-1" },
  { label: "Hope Church", value: "church-2" },
];

const DonationReports = () => {
  const [selectedChurch, setSelectedChurch] = useState("");
  const [search, setSearch] = useState("");

  const filteredDonations = donations.filter((donation) => {
    const matchesChurch =
      !selectedChurch || donation.churchId === selectedChurch;

    const matchesSearch =
      donation.donor.toLowerCase().includes(search.toLowerCase()) ||
      donation.description.toLowerCase().includes(search.toLowerCase()) ||
      donation.churchName.toLowerCase().includes(search.toLowerCase());

    return matchesChurch && matchesSearch;
  });

  return (
    <Grid gap="lg">
      <Grid.Row>
        <Grid.Column span={{ base: 12 }}>
          <div
            className="flex items-center gap-2 mb-4"
            style={{ color: "var(--secondary_black)" }}
          >
            <MdReport className="text-2xl text-primary" />
            <h2
              className="text-xl"
              style={{
                fontFamily: "var( --font-marcellus)",
                fontWeight: "600",
              }}
            >
              Reports
            </h2>
          </div>
        </Grid.Column>
      </Grid.Row>

      <Grid.Row>
        <Grid.Column span={{ base: 6 }}>
          <SearchInput
            value={search}
            onChange={setSearch}
            placeholder="Search Church..."
          />
        </Grid.Column>

        <Grid.Column className="flex justify-end" span={{ base: 6 }}>
          <div className="w-50">
            <Dropdown
              options={churchOptions}
              value={selectedChurch}
              // onChange={setSelectedChurch}
              onChange={(value) => {
                if (Array.isArray(value)) {
                  setSelectedChurch(value[0] ?? ""); 
                } else {
                  setSelectedChurch(value);
                }
              }}
              variant="underline"
            />
          </div>
        </Grid.Column>
      </Grid.Row>

      <Grid.Row>
        <Grid.Column className="mt-7" span={{ base: 12 }}>
          <ReportsTable data={filteredDonations} />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default DonationReports;
