import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import permissions from '@/data/permissions.json';
import styles from './index.module.css';
import type { Role } from '@/components/interface/RoleInterface';
import { FormInput, FormTextArea } from '@/components/ui/Form/Index';
import Grid from '@/components/ui/Grid/Index';
import Button from '@/components/ui/Button/Index';

const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
};

const CreateEditRolePage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [roles, setRoles] = useState<Role[]>([]);
  const [role, setRole] = useState<Omit<Role, 'id'>>({
    name: '',
    description: '',
    permissions: []
  });

  useEffect(() => {
    if (id) {
      const found = roles.find((r) => r.id === id);
      if (found) {
        const { name, description, permissions } = found;
        setRole({ name, description, permissions });
      }
    }
  }, [id, roles]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setRole({ ...role, [e.target.name]: e.target.value });
  };

  const handlePermissionChange = (perm: string, checked: boolean) => {
    setRole((prev) => ({
      ...prev,
      permissions: checked
        ? [...prev.permissions, perm]
        : prev.permissions.filter((p) => p !== perm)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (id) {
      setRoles((prev) =>
        prev.map((r) => (r.id === id ? { id, ...role } : r))
      );
    } else {
      const newRole: Role = { id: generateId(), ...role };
      setRoles((prev) => [...prev, newRole]);
    }
    navigate('/roles');
  };

  return (
    <div className='flex justify-center'>

    <div className={styles.container} >
      <h2 className={styles.pageTitle}>{id ? 'Edit Role' : 'Create New Role'}</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        <Grid gap='md'>
          <Grid.Row>
            <Grid.Column span={{ base: 12, md: 12 }}>
              <FormInput
                size='medium'
                label='Role Name'
                name='name'
                value={role.name}
                onChange={handleChange}
                placeholder='Enter role name'
                required
              />
              <FormTextArea
                size='medium'
                label='Role Description'
                name='description'
                value={role.description}
                onChange={handleChange}
                placeholder='Enter role description'
                required
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>

        <div className={styles.permissionGroup}>
          <h3 className={styles.sectionTitle}>Assign Permissions</h3>
          {Object.entries(permissions).map(([group, perms]) => (
            <div key={group} className={styles.permissionCategory}>
              <h4 className={styles.permissionCategoryTitle}>{group}</h4>
              <div className={styles.permissionGrid}>
                {perms.map((perm) => (
                  <label key={perm} className={styles.permissionItem}>
                    <input
                      type='checkbox'
                      checked={role.permissions.includes(perm)}
                      onChange={(e) => handlePermissionChange(perm, e.target.checked)}
                    />
                    <span className={styles.permissionLabelText}>{perm}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className={styles.buttonContainer}>
          <Button variant='positive'>
            {id ? 'Update Role' : 'Create Role'}
          </Button>
        </div>
      </form>
      </div>
    </div>


  );
};

export default CreateEditRolePage;
