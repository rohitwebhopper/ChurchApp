import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./index.module.css";
import { BiSolidSelectMultiple } from "react-icons/bi";
import { MdOutlineDeselect } from "react-icons/md";
import Button from "@/components/ui/Button/Index";
import { FormInput, FormTextArea } from "@/components/ui/Form/Index";
import Grid from "@/components/ui/Grid/Index";
import type { Role } from "@/components/interface/RoleInterface";
import { formatPermission } from "@/utils/formatPermission";

const CreateEditRolePage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [permissionsData, setPermissionsData] = useState<
    Record<string, string[]>
  >({});
  const [role, setRole] = useState<Omit<Role, "id">>({
    name: "",
    description: "",
    permissions: [],
  });
  const [selectedPermissions, setSelectedPermissions] = useState<
    Record<string, string[]>
  >({});

  useEffect(() => {
    // Simulate fetching permissions from static file or API
    import("@/data/permissions.json").then((res) =>
      setPermissionsData(res.default)
    );
  }, []);

  useEffect(() => {
    if (id) {
      // Load existing role for edit (stub)
      const existingRole: Role = JSON.parse(
        localStorage.getItem("role-" + id) || "{}"
      );
      if (existingRole?.permissions) {
        const grouped: Record<string, string[]> = {};
        existingRole.permissions.forEach((perm) => {
          for (const [group, actions] of Object.entries(permissionsData)) {
            if (actions.includes(perm)) {
              if (!grouped[group]) grouped[group] = [];
              grouped[group].push(perm);
            }
          }
        });
        setSelectedPermissions(grouped);
        setRole({
          name: existingRole.name,
          description: existingRole.description,
          permissions: existingRole.permissions,
        });
      }
    }
  }, [id, permissionsData]);

  const handlePermissionToggle = (group: string, action: string) => {
    setSelectedPermissions((prev) => {
      const current = prev[group] || [];
      const updated = current.includes(action)
        ? current.filter((a) => a !== action)
        : [...current, action];
      return { ...prev, [group]: updated };
    });
  };

  const handleSelectAllGroup = (group: string, actions: string[]) => {
    setSelectedPermissions((prev) => ({ ...prev, [group]: actions }));
  };

  const handleDeselectAllGroup = (group: string) => {
    setSelectedPermissions((prev) => ({ ...prev, [group]: [] }));
  };

  const handleSelectAll = () => {
    const all: Record<string, string[]> = {};
    Object.entries(permissionsData).forEach(([group, actions]) => {
      all[group] = [...actions];
    });
    setSelectedPermissions(all);
  };

  const handleDeselectAll = () => {
    setSelectedPermissions({});
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const flatPermissions = Object.values(selectedPermissions).flat();
    const finalRole: Role = {
      ...(id ? { id } : { id: Date.now().toString() }),
      name: role.name,
      description: role.description,
      permissions: flatPermissions,
    };

    localStorage.setItem(`role-${finalRole.id}`, JSON.stringify(finalRole));
    navigate("/roles");
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRole({ ...role, [e.target.name]: e.target.value });
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.pageTitle}>
        {id ? "Edit Role" : "Create New Role"}
      </h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        <Grid gap="md">
          <Grid.Row>
            <Grid.Column span={{ base: 12 }}>
              <FormInput
                size="medium"
                label="Role Name"
                name="name"
                value={role.name}
                onChange={handleInputChange}
                required
              />
              <FormTextArea
                size="medium"
                label="Description"
                name="description"
                value={role.description}
                onChange={handleInputChange}
                required
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>

        <div className={styles.permissionControls}>
          <BiSolidSelectMultiple
            onClick={handleSelectAll}
            title="Select All"
            className={styles.selectIcon}
          />
          <MdOutlineDeselect
            onClick={handleDeselectAll}
            title="Deselect All"
            className={styles.deselectIcon}
          />
        </div>

        <div className={styles.permissionGroup}>
          {Object.entries(permissionsData).map(([group, actions]) => (
            <div key={group} className={styles.permissionCategory}>
              <div className={styles.permissionHeader}>
                <h4 className={styles.permissionCategoryTitle}>
                  {formatPermission(group)}
                </h4>
                <div className="flex">
                  <BiSolidSelectMultiple
                    onClick={() => handleSelectAllGroup(group, actions)}
                    className={styles.selectIcon}
                  />
                  <MdOutlineDeselect
                    onClick={() => handleDeselectAllGroup(group)}
                    className={styles.deselectIcon}
                  />
                </div>
              </div>
              <div className={styles.permissionGrid}>
                {actions.map((action) => (
                  <label key={action} className={styles.permissionItem}>
                    <input
                      type="checkbox"
                      checked={
                        selectedPermissions[group]?.includes(action) || false
                      }
                      onChange={() => handlePermissionToggle(group, action)}
                    />
                    <span>{formatPermission(action)}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className={styles.buttonContainer}>
          <Button variant="positive">
            {id ? "Update Role" : "Create Role"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateEditRolePage;
