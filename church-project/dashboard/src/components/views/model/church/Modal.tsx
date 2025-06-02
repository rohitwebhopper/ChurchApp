import React, { useEffect, useState } from "react";
import Button from "@/components/ui/Button/Index";
import FileUpload from "@/components/ui/FileUpload/Index";
import { FormInput } from "@/components/ui/Form/Index";
import Grid from "@/components/ui/Grid/Index";
import Modal from "@/components/ui/Modal/Index";
import ProfileImageUpload from "@/components/ui/ProfileUpload/Index";
import type { AddEditInterface } from "@/components/interface/ModalInterface";
import { useTranslation } from "react-i18next";

const AddEditChurch: React.FC<AddEditInterface> = ({ open, close, data }) => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    bankname: "",
    accno: "",
    isccode: "",
    payeename: "",
    address: "",
    churchrule: "",
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

  const handleDocChange = (file: File | null) => {
    console.log("Selected document:", file);
  };

  return (
    <Modal
      title={data ? "Edit Church " : "Add Church"}
      size="large"
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
            <Grid.Column span={{ base: 12, md: 6 }}>
              <FormInput
                size="small"
                label={t("translate.churchName")}
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter church name"
                required
              />
            </Grid.Column>
            <Grid.Column span={{ base: 12, md: 6 }}>
              <FormInput
                size="small"
                label="Email"
                name="phonenumber"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter phone number"
                required
              />
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column span={{ base: 12, md: 6 }}>
              <FormInput
                size="small"
                label="Phone Number"
                name="registrationnumber"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter registration number"
                required
              />
            </Grid.Column>
            <Grid.Column span={{ base: 12, md: 6 }}>
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

          <Grid.Row>
            <Grid.Column span={{ base: 12, md: 6 }}>
              <FormInput
                size="small"
                label="Bank Name"
                name="bankname"
                value={formData.bankname}
                onChange={handleChange}
                placeholder="Enter bank name"
                required
              />
            </Grid.Column>
            <Grid.Column span={{ base: 12, md: 6 }}>
              <FormInput
                size="small"
                label="Bank Account No"
                name="accountno"
                value={formData.accno}
                onChange={handleChange}
                placeholder="Enter account number"
                required
              />
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column span={{ base: 12, md: 6 }}>
              <FormInput
                size="small"
                label="SWIFT Code"
                name="isccode"
                value={formData.isccode}
                onChange={handleChange}
                placeholder="Enter IFSC code"
                required
              />
            </Grid.Column>
            <Grid.Column span={{ base: 12, md: 6 }}>
              <FormInput
                size="small"
                label="Church Rule"
                name="churchrule"
                value={formData.churchrule}
                onChange={handleChange}
                placeholder="Enter church rule"
              />
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column span={{ base: 12 }}>
              <FileUpload
                label="Agreement (Ministry of Interior approval document upload)"
                onChange={handleDocChange}
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </form>
    </Modal>
  );
};

export default AddEditChurch;
