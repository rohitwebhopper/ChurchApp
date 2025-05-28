import React, { useState } from "react";
import styles from "./index.module.css";
import Grid from "@/components/ui/Grid/Index";
import ProfileImageUpload from "@/components/ui/ProfileUpload/Index";
import { FormInput } from "@/components/ui/Form/Index";
import Button from "@/components/ui/Button/Index";
import logo from "@/assets/profile/profile.jpg"

const ProfilePage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    newPassword: "",
    confirmPassword: "",
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
        <Grid gap="lg">
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
              <Grid gap="md">
                <Grid.Row>
                  <Grid.Column span={{ base: 12, md: 6 }}>
                    <FormInput
                      size="small"
                      label="Full Name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Admin"
                    />
                  </Grid.Column>
                  <Grid.Column span={{ base: 12, md: 6 }}>
                    <FormInput
                      size="small"
                      label="Email Address"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      type="email"
                      placeholder="admin@gmail.com"
                      required
                    />
                  </Grid.Column>
                </Grid.Row>

                <Grid.Row>
                  <Grid.Column span={{ base: 12, md: 6 }}>
                    <FormInput
                      size="small"
                      label="Phone Number"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      type="tel"
                      placeholder="*****"
                      required
                    />
                  </Grid.Column>
                </Grid.Row>
              </Grid>
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

        <div className={styles.buttonWrapper}>
          <Button size="small" type="submit" variant="positive">
            Save Changes
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ProfilePage;
