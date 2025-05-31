import { useState } from "react";
import { FiUsers } from "react-icons/fi";
// import Button from "@/components/ui/Button/Index";
import SearchInput from "@/components/ui/SearchInput/Index";
import AddEditUser from "@/components/views/model/users/Modal";
import UserTable from "@/components/views/tables/users/Table";
import Grid from "@/components/ui/Grid/Index";
import { useTranslation } from "react-i18next";
import Dropdown from "@/components/ui/Dropdown/Index";

const UserManagement = () => {
  const { t } = useTranslation();

  const [openModal, SetOpenModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeType, setActiveType] = useState<string>("");

  const handleClose = () => SetOpenModal(false);
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
          <FiUsers className="text-2xl text-primary" />
          <h2
            className="text-xl"
            style={{ fontFamily: "var( --font-marcellus)", fontWeight: "600" }}
          >
            {t("translate.users")}
          </h2>
        </div>

        <Grid gap="md">
          <Grid.Row className="items-center">
            <Grid.Column span={{ base: 12, md: 6 }}>
              <SearchInput
                value={searchTerm}
                onChange={setSearchTerm}
                placeholder={t("translate.searchUsersPlaceholder")}
              />
            </Grid.Column>
            <Grid.Column className="flex justify-end" span={{ base: 12, md: 6 }}>
              <div className="w-50 ">
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

      <UserTable />
      <AddEditUser open={openModal} close={handleClose} />
    </>
  );
};

export default UserManagement;
