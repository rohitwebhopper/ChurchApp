import Button from "@/components/ui/Button/Index";
import { FormInput } from "@/components/ui/Form/Index";
import Grid from "@/components/ui/Grid/Index";
import Modal from "@/components/ui/Modal/Index";
import { useEffect, useState } from "react";

type ChurchType = {
  id?: string;
  name: string;
};

type Props = {
  open: boolean;
  close: () => void;
  data?: ChurchType | null;
};

const PrayerTypeModal = ({ open, close, data }: Props) => {
  const [formData, setFormData] = useState<ChurchType>({ id: "", name: "" });

  useEffect(() => {
    if (data) {
      setFormData(data);
    } else {
      setFormData({ id: "", name: "" });
    }
  }, [data]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Modal
      title={data ? "Edit Prayer Type" : "Add Prayer Type"}
      size="small"
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
                label="Title"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter Prayer Type"
                required
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </form>
    </Modal>
  );
};

export default PrayerTypeModal;
