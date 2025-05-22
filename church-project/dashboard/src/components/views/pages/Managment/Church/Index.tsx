import Button from "@/components/ui/Button/Index";
import AddEditChurch from "@/components/views/model/church/Index";
import ChurchManagementTable from "@views/tables/churchList/Table";
import { useState } from "react";

const UserManagement = () => {
    const [openModal, SetOpenModal] = useState(true);
    const handleClose = () => SetOpenModal(false);
  return (
    <>
      <div className="flex justify-end mb-4">
        <Button size="small" variant="primary">
          Add Church
        </Button>
      </div>
      <ChurchManagementTable />
      <AddEditChurch openModal={openModal} handleClose={handleClose} />
    </>
  );
};

export default UserManagement;
