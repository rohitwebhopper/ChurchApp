import { useEffect, useState } from "react";
import type { ChurchEvent } from "@/components/interface/ChurchEvent";
import Button from "@/components/ui/Button/Index";
import { FormInput } from "@/components/ui/Form/Index";
import Grid from "@/components/ui/Grid/Index";
import Modal from "@/components/ui/Modal/Index";
import styles from "./index.module.css";
import ImageUpload from "@/components/ui/ImageUpload/Index";
import MapPicker from "@/components/ui/Mappicker/Index";

type Props = {
  open: boolean;
  close: () => void;
  data?: ChurchEvent | null;
};

const EventModal = ({ open, close, data }: Props) => {
  const [formData, setFormData] = useState<ChurchEvent>({
    id: "",
    image: "",
    title: "",
    event_date: "",
    event_time: "",
    location: "",
    church_id: "",
    description: "",
    upcoming: false,
    latitude: 0,
    longitude: 0,
    status: "Active",
  });

  useEffect(() => {
    if (data) {
      setFormData(data);
    }
  }, [data]);

const handleChange = (
  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
) => {
  const { name, value, type } = e.target;

  const newValue =
    type === "checkbox"
      ? (e.target as HTMLInputElement).checked
      : value;

  setFormData((prev) => ({
    ...prev,
    [name]: newValue,
  }));
};

  const handleImageChange = (file: File) => {
    setFormData((prev) => ({
      ...prev,
      image: URL.createObjectURL(file),
    }));
  };

  const handleLocationSelect = (lat: number, lng: number) => {
    setFormData((prev) => ({
      ...prev,
      latitude: lat,
      longitude: lng,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitted data:", formData);
    close();
  };

  return (
    <Modal
      title={data ? "Edit Event" : "Add Event"}
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
      <form onSubmit={handleSubmit} className={styles.form}>
        <Grid gap="lg">
          <Grid.Row>
            <Grid.Column className="mb-4" span={{ base: 12 }}>
              <ImageUpload onChange={handleImageChange} label="Event Image" />
              {formData.image && (
                <img src={formData.image} alt="Preview" className={styles.preview} />
              )}
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column  span={{ base: 12, md: 6 }}>
              <FormInput
                size="small"
                label="Title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter event title"
                required
              />
            </Grid.Column>
            <Grid.Column span={{ base: 12, md: 6 }}>
              <FormInput
                size="small"
                label="Church Name"
                name="church_id"
                value={formData.church_id}
                onChange={handleChange}
                placeholder="Enter host name"
                required
              />
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column span={{ base: 12, md: 6 }}>
              <FormInput
                type="date"
                size="small"
                label="Event Date"
                name="event_date"
                value={formData.event_date}
                onChange={handleChange}
                required
              />
            </Grid.Column>
            <Grid.Column span={{ base: 12, md: 6 }}>
              <FormInput
                type="time"
                size="small"
                label="Event Time"
                name="event_time"
                value={formData.event_time}
                onChange={handleChange}
                required
              />
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column span={{ base: 12 }}>
              <FormInput
                size="small"
                label="Address"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Enter event address"
              />
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column span={{ base: 12 }}>
              <FormInput
                size="small"
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Write about the event"
              />
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column span={{ base: 12 }}>
              <label className={styles.checkbox}>
                <input
                  type="checkbox"
                  name="upcoming"
                  checked={formData.upcoming}
                  onChange={handleChange}
                />
                Mark as Upcoming Event
              </label>
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column span={{ base: 12 }}>
              <MapPicker onLocationChange={handleLocationSelect} />
              <p className={styles.coords}>
                📍 Latitude: {formData.latitude} | Longitude: {formData.longitude}
              </p>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </form>
    </Modal>
  );
};

export default EventModal;
