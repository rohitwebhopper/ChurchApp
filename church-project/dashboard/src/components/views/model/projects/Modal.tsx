import type React from "react";
import { useEffect, useState } from "react";
import Modal from "@/components/ui/Modal/Index";
import Button from "@/components/ui/Button/Index";
import Grid from "@/components/ui/Grid/Index";
import { FormInput, FormTextArea } from "@/components/ui/Form/Index";
import type { ProjectData } from "@/components/interface/Projects";



interface AddEditProjectsProps {
  open: boolean;
  close: () => void;
  data?: ProjectData | null;
}

const AddEditProjects: React.FC<AddEditProjectsProps> = ({ open, close, data }) => {
  const [formData, setFormData] = useState<ProjectData>({
    name: "",
    description: "",
    setAmount: 0,
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
    const { name, type, value } = e.target;
    const newValue =
      type === "checkbox"
        ? (e.target as HTMLInputElement).checked
        : type === "number"
        ? Number(value)
        : value;

    setFormData((prev) => ({ ...prev, [name]: newValue }));
  };
  

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitted data:", formData);
  };

  return (
    <Modal
      title={data ? "Edit Project" : "Add Project"}
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
        <Grid gap="sm">
          <Grid.Row>
            <Grid.Column span={{ base: 12, md: 12 }}>
              <FormInput
                size="small"
                label="Project Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter Project name"
                required
              />
            </Grid.Column>
            <Grid.Column span={{ base: 12, md: 12 }}>
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
            <Grid.Column span={{ base: 12, md: 12 }}>
              <FormInput
                size="small"
                label="Set Amount"
                name="setAmount"
                type="number"
                value={formData.setAmount.toString()}
                onChange={handleChange}
                placeholder="Enter set amount"
              />
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column span={{ base: 12, md: 6 }}>
              <label
                style={{ display: "flex", alignItems: "center", gap: "10px" }}
              >
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
