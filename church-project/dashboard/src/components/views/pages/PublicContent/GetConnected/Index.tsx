import Dropdown from "@/components/ui/Dropdown/Index";
import Grid from "@/components/ui/Grid/Index";
import SearchInput from "@/components/ui/SearchInput/Index";
import GetConnectedTable from "@/components/views/tables/getConnected/Table";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { MdOutlineConnectWithoutContact } from "react-icons/md";

const GetConnectedPage = () => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeType, setActiveType] = useState<string>("");

  const options = [
    { label: t("translate.selectChurch"), value: "" },
    { label: "Grace Community Church", value: "Grace Community Church" },
    { label: "Holy Trinity Chapel", value: "Holy Trinity Chapel" },
    { label: "New Life Ministries", value: "New Life Ministries" },
  ];
  return (
    <>
      <div className="mb-6">
        <div
          className="flex items-center gap-2 mb-4"
          style={{ color: "var(--primary)" }}
        >
          <MdOutlineConnectWithoutContact className="text-2xl text-primary" />
          <h2
            className="text-xl "
            style={{ fontFamily: "var( --font-marcellus)", fontWeight: "600" }}
          >
            {t("translate.getConnected")}
          </h2>
        </div>

        <Grid gap="md">
          <Grid.Row className="items-center">
            <Grid.Column span={{ base: 12, md: 6 }}>
              <SearchInput
                value={searchTerm}
                onChange={setSearchTerm}
                placeholder={t("translate.searchUsers")}
              />
            </Grid.Column>
            <Grid.Column className="flex justify-end" span={{ base: 12, md: 6 }}>
              <div className="w-50">
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
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
      <GetConnectedTable />
    </>
  );
};

export default GetConnectedPage;
