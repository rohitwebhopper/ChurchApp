import { useState } from "react";
import { FaChurch } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import Button from "@/components/ui/Button/Index";
import Grid from "@/components/ui/Grid/Index";
import SearchInput from "@/components/ui/SearchInput/Index";
import AddEditChurch from "@/components/views/model/church/Modal";
import ChurchManagementTable from "@/components/views/tables/church/Table";

const ChurchManagment = () => {
  const { t } = useTranslation();
  const [openModal, SetOpenModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handleClose = () => SetOpenModal(false);
  return (
    <>
      <div className="mb-6">
        <div
          className="flex items-center gap-2 mb-4"
          style={{ color: "var(--primary)" }}
        >
          <FaChurch className="text-2xl text-primary" />
          <h2
            className="text-xl"
            style={{ fontFamily: "var( --font-marcellus)", fontWeight: "600" }}
          >
            {t("translate.church")}
          </h2>
        </div>

        <Grid gap="md">
          <Grid.Row className="items-center">
            <Grid.Column span={{ base: 12, md: 6 }}>
              <SearchInput
                value={searchTerm}
                onChange={setSearchTerm}
                placeholder={t("translate.searchChurch")}
              />
            </Grid.Column>

            <Grid.Column
              span={{ base: 12, md: 6 }}
              className="flex justify-end mt-3 md:mt-0"
            >
              <Button
                size="small"
                variant="primary"
                onClick={() => SetOpenModal(true)}
              >
                {t("translate.addChurch")}
              </Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
      <ChurchManagementTable />
      <AddEditChurch open={openModal} close={handleClose} />
    </>
  );
};

export default ChurchManagment;
