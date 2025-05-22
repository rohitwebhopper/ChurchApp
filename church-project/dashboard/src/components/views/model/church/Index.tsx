import React from "react";
import Button from "@/components/ui/Button/Index";
import FileUpload from "@/components/ui/FileUpload/Index";
import { FormInput } from "@/components/ui/Form/Index";
import Grid from "@/components/ui/Grid/Index";
import Modal from "@/components/ui/Modal/Index";
import ProfileImageUpload from "@/components/ui/ProfileUpload/Index";
import { useState } from "react";

const AddEditChurch = React.FC<ModalProp> () => {


  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phonenumber: "",
    registrationnumber: "",
    bankname: "",
    accountno: "",
    isccode: "",
    payeename: "",
    location: "",
    churchrule: "",
  });

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
      title="Add Church"
      size="large"
      isOpen={openModal}
      onClose={handleClose}
      actions={
        <>
          <Button variant="negative" size="small" onClick={handleClose}>
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
            <Grid.Column className="mb-4" span={{ base: 12, md: 12 }} justify="center">
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
                label="Church Name"
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
            <Grid.Column span={{ base: 12, md: 6 }}>
              <FormInput
                size="small"
                label="Registration Number"
                name="registrationnumber"
                value={formData.registrationnumber}
                onChange={handleChange}
                placeholder="Enter registration number"
                required
              />
            </Grid.Column>
            <Grid.Column span={{ base: 12, md: 6 }}>
              <FormInput
                size="small"
                label="Location"
                name="location"
                value={formData.location}
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
                label="Bank Account No"
                name="accountno"
                value={formData.accountno}
                onChange={handleChange}
                placeholder="Enter account number"
                required
              />
            </Grid.Column>
            <Grid.Column span={{ base: 12, md: 6 }}>
              <FormInput
                size="small"
                label="IFSC Code"
                name="isccode"
                value={formData.isccode}
                onChange={handleChange}
                placeholder="Enter IFSC code"
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
                label="Payee Name"
                name="payeename"
                value={formData.payeename}
                onChange={handleChange}
                placeholder="Enter payee name"
                required
              />
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column span={{ base: 12 }}>
              <FormInput
                size="small"
                label="Church Rule"
                name="churchrule"
                value={formData.churchrule}
                onChange={handleChange}
                placeholder="Enter church rule"
                required
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
