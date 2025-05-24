import { useState } from "react";
import { FiUsers } from "react-icons/fi";
import Button from "@/components/ui/Button/Index";
import SearchInput from "@/components/ui/SearchInput/Index";
import AddEditUser from "@/components/views/model/users/Modal";
import UserTable from "@/components/views/tables/users/Table";
import Grid from "@/components/ui/Grid/Index";

const UserManagment = () => {
  const [openModal, SetOpenModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handleClose = () => SetOpenModal(false);

  return (
    <>
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-4" style={{color:"var(--secondary_black)"}}>
          <FiUsers className="text-2xl text-primary" />
          <h2 className="text-xl " style={{fontFamily:"var( --font-marcellus)", fontWeight:"600"}}>Users</h2>
        </div>

        <Grid gap="md">
          <Grid.Row className="items-center">
            <Grid.Column span={{ base: 12, md: 6 }}>
              <SearchInput
                value={searchTerm}
                onChange={setSearchTerm}
                placeholder="Search users..."
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
                Add User
              </Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>

      <UserTable />
      <AddEditUser open={openModal} close={handleClose} />
    </>
  );
};

export default UserManagment;
