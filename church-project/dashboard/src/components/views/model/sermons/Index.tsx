import React, { useState, useEffect, useRef } from "react";
import Modal from "@/components/ui/Modal/Index";
import Grid from "@/components/ui/Grid/Index";
import { FormInput, FormTextArea } from "@/components/ui/Form/Index";
import styles from "./index.module.css";
import Button from "@/components/ui/Button/Index";
import Dropdown from "@/components/ui/Dropdown/Index";

const churchOptions = [
  { label: "Grace Community Church", value: "Grace Community Church" },
  { label: "Holy Trinity Chapel", value: "Holy Trinity Chapel" },
  { label: "New Life Ministries", value: "New Life Ministries" },
];

interface VideoData {
  id: number;
  title: string;
  description: string;
  file: string;
  previewImage: string;
  churchName: string;
}

interface UploadModalProps {
  isModalOpen: boolean;
  onClose: () => void;
  onAddVideo: (video: VideoData) => void;
  lastId: number;
}

interface FormData {
  title: string;
  description: string;
  videoFile: File | null;
  thumbnailFile: File | null;
  churchName: string;
}

const UploadModal: React.FC<UploadModalProps> = ({
  isModalOpen,
  onClose,
  onAddVideo,
  lastId,
}) => {
  const [formData, setFormData] = useState<FormData>({
    title: "",
    description: "",
    videoFile: null,
    thumbnailFile: null,
    churchName: "",
  });

  const [thumbnailPreviewURL, setThumbnailPreviewURL] = useState<string | null>(
    null
  );
  const [videoPreviewURL, setVideoPreviewURL] = useState<string | null>(null);
  const [error, setError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (formData.videoFile) {
      const url = URL.createObjectURL(formData.videoFile);
      setVideoPreviewURL(url);
      return () => URL.revokeObjectURL(url);
    }
    setVideoPreviewURL(null);
  }, [formData.videoFile]);

  useEffect(() => {
    if (formData.thumbnailFile) {
      const url = URL.createObjectURL(formData.thumbnailFile);
      setThumbnailPreviewURL(url);
      return () => URL.revokeObjectURL(url);
    }
    setThumbnailPreviewURL(null);
  }, [formData.thumbnailFile]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      const validTypes = ["video/mp4", "video/3gpp"];
      if (!validTypes.includes(file.type)) {
        setError("Only MP4 and 3GP video files are allowed.");
        setFormData((prev) => ({ ...prev, videoFile: null }));
        return;
      }
      setError("");
      setFormData((prev) => ({ ...prev, videoFile: file }));
    }
  };

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData((prev) => ({ ...prev, thumbnailFile: file }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { title, description, videoFile, thumbnailFile, churchName } =
      formData;

    if (!title || !description || !videoFile || !thumbnailFile) {
      setError("Please fill all fields and select files.");
      return;
    }

    const newVideo: VideoData = {
      id: lastId + 1,
      title: title.trim(),
      description: description.trim(),
      file: URL.createObjectURL(videoFile),
      previewImage: URL.createObjectURL(thumbnailFile),
      churchName: churchName,
    };

    onAddVideo(newVideo);
    onClose();
  };

  return (
    <Modal
      isOpen={isModalOpen}
      title="Upload New Video"
      onClose={onClose}
      size="medium"
    >
      <form onSubmit={handleSubmit} className={styles.form}>
        <Grid gap="sm">
          <Grid.Row>
            <Grid.Column span={{ base: 12 }}>
              <FormInput
                size="small"
                label="Video Title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter video title"
                required
              />
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column span={{ base: 12 }}>
              <FormTextArea
                size="small"
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Enter video description"
                required
              />
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column className="mb-4" span={{ base: 12 }}>
              <label className={styles.label}>
                Select Church <span className="text-red-500">*</span>
              </label>
              <Dropdown
                options={churchOptions}
                value={formData.churchName}
                onChange={(value) => {
                  if (Array.isArray(value)) {
                    setFormData((prev) => ({
                      ...prev,
                      churchName: value[0] ?? "",
                    }));
                  } else {
                    setFormData((prev) => ({ ...prev, churchName: value }));
                  }
                }}
                placeholder="Choose a church"
                variant="default"
              />
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column span={{ base: 12 }}>
              <label className={styles.label}>
                Thumbnail Image <span className="text-red-500">*</span>
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleThumbnailChange}
                required
                className={styles.input}
              />
              {thumbnailPreviewURL && (
                <img
                  src={thumbnailPreviewURL}
                  alt="Thumbnail Preview"
                  className={styles.thumbnailPreview}
                />
              )}
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column span={{ base: 12 }}>
              <label className={styles.label}>
                Video File (mp4, 3gp) <span className="text-red-500">*</span>
              </label>
              <div className={styles.fileUploadWrapper}>
                <Button
                  size="small"
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                >
                  Choose Video File
                </Button>
                <span className={styles.fileName}>
                  {formData.videoFile?.name || "No file chosen"}
                </span>
                <input
                  type="file"
                  accept=".mp4, .3gp, video/mp4, video/3gpp"
                  onChange={handleVideoChange}
                  ref={fileInputRef}
                  required
                  className={styles.hiddenInput}
                />
              </div>
              {videoPreviewURL && (
                <video
                  controls
                  src={videoPreviewURL}
                  className={styles.videoPreview}
                />
              )}
            </Grid.Column>
          </Grid.Row>

          {error && (
            <Grid.Row>
              <Grid.Column span={{ base: 12 }}>
                <p className={styles.error}>{error}</p>
              </Grid.Column>
            </Grid.Row>
          )}

          <Grid.Row>
            <Grid.Column span={{ base: 12 }}>
              <div className={styles.btnlyt}>
                <Button variant="negative" type="button" onClick={onClose}>
                  Cancel
                </Button>
                <Button type="submit">Upload</Button>
              </div>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </form>
    </Modal>
  );
};

export default UploadModal;
