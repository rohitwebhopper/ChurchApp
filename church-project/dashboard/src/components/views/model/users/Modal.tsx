import React, { useEffect, useState } from "react";
import Button from "@/components/ui/Button/Index";
import { FormInput } from "@/components/ui/Form/Index";
import Grid from "@/components/ui/Grid/Index";
import Modal from "@/components/ui/Modal/Index";
import ProfileImageUpload from "@/components/ui/ProfileUpload/Index";
import type { AddEditInterface } from "@/components/interface/ModalInterface";

const AddEditUser: React.FC<AddEditInterface> = ({ open, close, data }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phonenumber: "",
    address: "",
  });

  useEffect(() => {
    if (data) {
      // Populate form fields with data
    }
  }, [data]);
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitted data:", formData);
  };

  const handleImageChange = (file: File) => {
    console.log("Selected image:", file);
  };

  // const handleDocChange = (file: File | null) => {
  //   console.log("Selected document:", file);
  // };

  return (
    <Modal
      title={data ? "Edit User " : "Add User"}
      size="medium"
      isOpen={open}
      onClose={close}
      actions={
        <>
          <Button variant="negative" size="small" onClick={close}>
            Cancel
          </Button>
          <Button variant="positive" size="small" onClick={handleSubmit}>
            Save
          </Button>
        </>
      }
    >
      <form onSubmit={handleSubmit}>
        <Grid gap="lg">
          <Grid.Row>
            <Grid.Column
              className="mb-4"
              span={{ base: 12, md: 12 }}
              justify="center"
            >
              <ProfileImageUpload
                currentImage=""
                onChange={handleImageChange}
              />
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column span={{ base: 12, md: 12 }}>
              <FormInput
                size="small"
                label="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter church name"
                required
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column span={{ base: 12, md: 12 }}>
              <FormInput
                size="small"
                label="Phone Number"
                name="phonenumber"
                value={formData.phonenumber}
                onChange={handleChange}
                placeholder="Enter phone number"
                required
              />
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column span={{ base: 12, md: 12 }}>
              <FormInput
                size="small"
                label="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter registration number"
                required
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column span={{ base: 12, md: 12 }}>
              <FormInput
                size="small"
                label="Address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Enter location"
                required
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </form>
    </Modal>
  );
};

export default AddEditUser;
