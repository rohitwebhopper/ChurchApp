import Grid from "@/components/ui/Grid/Index";
import SearchInput from "@/components/ui/SearchInput/Index";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import Button from "@/components/ui/Button/Index";
import PrayerTable from "@/components/views/tables/prayerType/Table";
import PrayerTypeModal from "@/components/views/model/prayer/Modal";
import { MdOutlineVolunteerActivism } from "react-icons/md";




type PrayerType = {
  id: string;
  name: string;
};

const PrayerTypePage = () => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [selectedPrayer, setSelectedPrayer] = useState<PrayerType | null>(null);
  const [prayerTypes, setPrayerTypes] = useState<PrayerType[]>([
    { id: "1", name: "Thanks Giving Prayer" },
    { id: "2", name: "Prayer for death people" },
    { id: "3", name: "Help assistance prayer" },
    { id: "4", name: "Prayer for protection" },
    { id: "5", name: "Others" },
  ]);

  const filteredPrayers = prayerTypes.filter((prayer) =>
    prayer.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAdd = () => {
    setSelectedPrayer(null);
    setOpenModal(true);
  };

  const handleEdit = (prayer: PrayerType) => {
    setSelectedPrayer(prayer);
    setOpenModal(true);
  };

  const handleDelete = (prayer: PrayerType) => {
    setPrayerTypes((prev) => prev.filter((p) => p.id !== prayer.id));
  };

  //   const handleSave = (formData: PrayerType) => {
  //     if (formData.id) {
  //       setPrayerTypes((prev) =>
  //         prev.map((p) => (p.id === formData.id ? { ...formData } : p))
  //       );
  //     } else {
  //       const newPrayer: PrayerType = {
  //         id: Date.now().toString(),
  //         name: formData.name,
  //       };
  //       setPrayerTypes((prev) => [...prev, newPrayer]);
  //     }
  //     setOpenModal(false);
  //     setSelectedPrayer(null);
  //   };

  return (
    <>
      <div className="mb-6">
        <div
          className="flex items-center gap-2 mb-4"
          style={{ color: "var(--secondary_black)" }}
        >
          <MdOutlineVolunteerActivism className="text-2xl text-primary" />
          <h2
            className="text-xl"
            style={{
              fontFamily: "var(--font-marcellus)",
              fontWeight: "600",
            }}
          >
            {t("translate.prayertype")}
          </h2>
        </div>

        <Grid gap="md">
          <Grid.Row className="items-center justify-between">
            <Grid.Column span={{ base: 12, md: 6 }}>
              <SearchInput
                value={searchTerm}
                onChange={setSearchTerm}
                placeholder={t("translate.searchPrayerType")}
              />
            </Grid.Column>
            <Grid.Column
              className="flex justify-end"
              span={{ base: 12, md: 6 }}
            >
              <Button variant="primary" size="small" onClick={handleAdd}>
                {t("translate.addType")}
              </Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>

        <PrayerTypeModal
          open={openModal}
          close={() => setOpenModal(false)}
          data={selectedPrayer}
        />
      </div>
      <PrayerTable
        data={filteredPrayers}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </>
  );
};

export default PrayerTypePage;
