import React, { useState } from "react";
import styles from "./index.module.css";
import Grid from "@/components/ui/Grid/Index";
import ProfileImageUpload from "@/components/ui/ProfileUpload/Index";
import { FormInput } from "@/components/ui/Form/Index";
import Button from "@/components/ui/Button/Index";
import logo from "@/assets/profile/profile.jpg";
import { useTranslation } from "react-i18next";

const ProfilePage = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    newPassword: "",
    confirmPassword: "",
    gender: "",
    dob: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (file: File) => {
    console.log("Profile image selected:", file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <div className={styles.profilePage}>
      <h2 className={styles.title}>Mon Eglise</h2>

      <form onSubmit={handleSubmit} className={styles.form}>
        <Grid className={styles.container}>
          <Grid.Row>
            <Grid.Column
              span={{ base: 12, md: 4 }}
              className={styles.imageWrapper}
            >
              <ProfileImageUpload
                fallbackImage={logo}
                onChange={handleImageChange}
              />
            </Grid.Column>

            <Grid.Column span={{ base: 12, md: 8 }}>
              <div className="flex justify-between">
                <div className="w-85">
                  <FormInput
                    size="small"
                    label={t("translate.fullName")}
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Admin"
                  />
                </div>
                <div className="w-85">
                  <FormInput
                    size="small"
                    label={t("translate.emailAddress")}
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    type="email"
                    placeholder="admin@gmail.com"
                    required
                  />
                </div>
              </div>
              <div className="flex justify-between">
                <div className="w-85">
                  <FormInput
                    size="small"
                    label={t("translate.phoneNumber")}
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    type="tel"
                    placeholder="*****"
                    required
                  />
                </div>
                <div className="w-85">
                  <FormInput
                    size="small"
                    label="Gender"
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    type="tel"
                  />
                </div>
              </div>
              <div className="w-85">
                <FormInput
                  size="small"
                  label="D.O.B"
                  name="gender"
                  value={formData.dob}
                  onChange={handleChange}
                  type="date"
                />
              </div>
                <div className={styles.buttonWrapper}>
                  <Button size="small" type="submit">
                    {t("translate.saveChanges")}
                  </Button>
                </div>
            </Grid.Column>
          </Grid.Row>

          {/* <hr className={styles.divider} />

          <Grid.Row>
            <Grid.Column span={{ base: 12, md: 4 }}>
              <FormInput
                size="small"
                label="Current Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                type="password"
              />
            </Grid.Column>
            <Grid.Column span={{ base: 12, md: 4 }}>
              <FormInput
                size="small"
                label="New Password"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                type="password"
              />
            </Grid.Column>
            <Grid.Column span={{ base: 12, md: 4 }}>
              <FormInput
                size="small"
                label="Confirm Password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                type="password"
              />
            </Grid.Column>
          </Grid.Row> */}
        </Grid>
      </form>
    </div>
  );
};

export default ProfilePage;
