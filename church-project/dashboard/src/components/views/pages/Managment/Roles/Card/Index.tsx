import React from 'react';
import { FaUserShield, FaEdit, FaTrash } from 'react-icons/fa';
import styles from './index.module.css';
import type { Role } from '@/components/interface/RoleInterface';

interface Props {
  role: Role;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const RoleCard: React.FC<Props> = ({ role, onEdit, onDelete }) => {
  const maxVisible = 5;
  const visiblePermissions = role.permissions.slice(0, maxVisible);
  const hiddenCount = role.permissions.length - maxVisible;

  return (
    <div className={styles.card}>
      <div className={styles.icon}>
        <FaUserShield size={28} />
      </div>

      <div className={styles.content}>
        <div className={styles.header}>
          <h3>{role.name}</h3>
          <p>{role.description}</p>
        </div>

        <div className={styles.permissions}>
          {visiblePermissions.map((perm) => (
            <div key={perm} className={styles.circle} title={perm}>
              {perm[0].toUpperCase()}
            </div>
          ))}
          {hiddenCount > 0 && (
            <div className={styles.circle}>+{hiddenCount}</div>
          )}
        </div>

          <div className={styles.actions}>
        <button onClick={() => onEdit(role.id)} title="Edit">
          <FaEdit />
        </button>
        <button onClick={() => onDelete(role.id)} title="Delete">
          <FaTrash />
        </button>
      </div>
      </div>

    
    </div>
  );
};

export default RoleCard;
