import { useState } from "react";
import SearchInput from "@/components/ui/SearchInput/Index";
import Grid from "@/components/ui/Grid/Index";
import type { DonationType as DonationTypeInterface } from "@/components/interface/Donation";
import DonationTable from "@/components/views/tables/donation/type/Table";
import Dropdown from "@/components/ui/Dropdown/Index";
import { FaHandHoldingUsd } from "react-icons/fa";

const donations: DonationTypeInterface[] = [
  {
    id: 1,
    donor: "John Doe",
    amount: 1000,
    date: "2025-05-01",
    description: "Monthly tithe",
    type: "Tithe",
  },
  {
    id: 2,
    donor: "Jane Smith",
    amount: 500,
    date: "2025-05-02",
    description: "Special Offering",
    type: "Offering",
  },
  {
    id: 3,
    donor: "Rahul Sharma",
    amount: 1500,
    date: "2025-05-05",
    description: "Church Roof Repair",
    type: "Project",
    projectName: "Roof Repair",
  },
];

const DonationType = () => {
  const [activeType, setActiveType] = useState<string>(""); // empty means no filter
  const [search, setSearch] = useState("");

  // Filter donations by type if activeType selected; else show all
  const filteredDonations = donations.filter(
    (d) =>
      (activeType === "" || d.type === activeType) && // filter by type or show all
      (d.donor.toLowerCase().includes(search.toLowerCase()) ||
        d.description.toLowerCase().includes(search.toLowerCase()))
  );

  const options = [
    { label: "Select Type", value: "" }, // empty value for no filter
    { label: "Tithe", value: "Tithe" },
    { label: "Offering", value: "Offering" },
    { label: "Project", value: "Project" },
  ];

  return (
    <Grid gap="lg">
      <Grid.Row>
        <Grid.Column span={{ base: 12 }}>
          <div
            className="flex items-center gap-2 mb-4"
            style={{ color: "var(--secondary_black)" }}
          >
            <FaHandHoldingUsd className="text-2xl text-primary" />
            <h2
              className="text-xl"
              style={{
                fontFamily: "var( --font-marcellus)",
                fontWeight: "600",
              }}
            >
              Donations
            </h2>
          </div>
        </Grid.Column>
      </Grid.Row>

      <Grid.Row>
        <Grid.Column span={{ base: 6 }}>
          <SearchInput
            value={search}
            onChange={setSearch}
            placeholder={`Search donor...`}
          />
        </Grid.Column>

        <Grid.Column className="flex justify-end" span={{ base: 6 }}>
          <div className="w-50">
            <Dropdown
              options={options}
              value={activeType}
              onChange={setActiveType}
              variant="underline"
            />
          </div>
        </Grid.Column>
      </Grid.Row>

      <Grid.Row>
        <Grid.Column className="mt-7" span={{ base: 12 }}>
          <DonationTable data={filteredDonations} />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default DonationType;
