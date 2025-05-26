import type React from "react";
import { useEffect, useState } from "react";
import Modal from "@/components/ui/Modal/Index";
import Button from "@/components/ui/Button/Index";
import Grid from "@/components/ui/Grid/Index";
import { FormInput, FormTextArea } from "@/components/ui/Form/Index";

interface ProjectData {
  name: string;
  description: string;
  setAmount: number;
  receiveAmount: number;
  active: boolean;
}

interface AddEditProjectsProps {
  open: boolean;
  close: () => void;
  data?: ProjectData;
}

const AddEditProjects: React.FC<AddEditProjectsProps> = ({ open, close, data }) => {
  const [formData, setFormData] = useState<ProjectData>({
    name: "",
    description: "",
    setAmount: 0,
    receiveAmount: 0,
    active: false,
  });

  useEffect(() => {
    if (data) {
      setFormData(data);
    }
  }, [data]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitted data:", formData);
  };

  return (
    <Modal
      title={data ? "Edit Church" : "Add Church"}
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
            <Grid.Column span={{ base: 12, md: 6 }}>
              <FormInput
                size="small"
                label="Church Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter Project name"
                required
              />
            </Grid.Column>
            <Grid.Column span={{ base: 12, md: 6 }}>
              <FormTextArea
                size="medium"
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Enter description"
                required
              />
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column span={{ base: 12, md: 6 }}>
              <FormInput
                size="small"
                label="Set Amount"
                name="setAmount"
                type="number"
                // value={formData.setAmount}
                onChange={handleChange}
                placeholder="Enter set amount"
              />
            </Grid.Column>
            <Grid.Column span={{ base: 12, md: 6 }}>
              <FormInput
                size="small"
                label="Receive Amount"
                name="receiveAmount"
                type="number"
                // value={formData.receiveAmount}
                onChange={handleChange}
                placeholder="Enter received amount"
              />
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column span={{ base: 12, md: 6 }}>
              <label style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <input
                  type="checkbox"
                  name="active"
                  checked={formData.active}
                  onChange={handleChange}
                />
                Active Project
              </label>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </form>
    </Modal>
  );
};

export default AddEditProjects;
