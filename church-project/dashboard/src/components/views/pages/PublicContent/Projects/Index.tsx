import Button from "@/components/ui/Button/Index";
import { useTranslation } from "react-i18next";
import Grid from "@/components/ui/Grid/Index";
import SearchInput from "@/components/ui/SearchInput/Index";
import AddEditProjects from "@/components/views/model/projects/Modal";
import ProjectTable from "@/components/views/tables/projects/Table";
import { useState } from "react";
import { GoProjectSymlink } from "react-icons/go";
import Dropdown from "@/components/ui/Dropdown/Index";

const ProjectsPage = () => {
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
          <GoProjectSymlink className="text-2xl text-primary" />
          <h2
            className="text-xl "
            style={{
              fontFamily: "var( --font-marcellus)",
              fontWeight: "600",
            }}
          >
            {t("translate.projects")}
          </h2>
        </div>

        <Grid gap="md">
          <Grid.Row className="items-center">
            <Grid.Column span={{ base: 12, md: 6 }}>
              <SearchInput
                value={searchTerm}
                onChange={setSearchTerm}
                placeholder={t("translate.searchProjects")}
              />
            </Grid.Column>
            <Grid.Column
              span={{ base: 12, md: 5 }}
              className="flex justify-end mt-3 md:mt-0"
            >
              <Button
                size="small"
                variant="primary"
                onClick={() => SetOpenModal(true)}
              >
                {t("translate.addProject")}
              </Button>
            </Grid.Column>
            <Grid.Column span={{ base: 12, md: 1 }}>
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
      <AddEditProjects open={openModal} close={handleClose} />
      <ProjectTable />
    </>
  );
};

export default ProjectsPage;
