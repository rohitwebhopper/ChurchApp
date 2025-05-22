import React from "react";
import styles from "./Index.module.css";
import type { IconType } from "react-icons";
import { FaTrash, FaEdit, FaToggleOn, FaToggleOff } from "react-icons/fa";

export type Column<T> = {
  key: keyof T;
  label: string;
  width?: string;
  render?: (item: T) => React.ReactNode;
  hideIfEmpty?: boolean;
};

export type ActionType = "update" | "delete" | "toggle";

export type ActionButton<T> = {
  type: ActionType;
  onClick: (item: T) => void;
  show?: (item: T) => boolean;
};

export type ModernTableProps<T> = {
  columns: Column<T>[];
  data: T[];
  keyField: keyof T;
  actions?: ActionButton<T>[];
};

function Table<T extends Record<string, any>>({
  columns,
  data,
  actions,
  keyField,
}: ModernTableProps<T>) {
  const visibleColumns = columns.filter(({ hideIfEmpty, key }) => {
    if (!hideIfEmpty) return true;
    return data.some((item) => {
      const val = item[key];
      return val !== null && val !== undefined && val !== "";
    });
  });

  const effectiveActions = actions?.map((action) =>
    action.type === "delete" ? { ...action, show: undefined } : action
  );

  const actionIcons: Record<
    ActionType,
    { icon: IconType; tooltip: string; getActive?: (item: T) => boolean }
  > = {
    update: { icon: FaEdit, tooltip: "Edit" },
    delete: { icon: FaTrash, tooltip: "Delete" },
    toggle: {
      icon: FaToggleOn,
      tooltip: "Toggle",
      getActive: (item) => Boolean(item.status === "Active" || item.active),
    },
  };

  const renderActionButton = (
    action: ActionButton<T>,
    item: T,
    idx: number
  ) => {
    if (action.show && !action.show(item)) return null;
    const { icon: Icon, tooltip, getActive } = actionIcons[action.type];
    const isActive = getActive ? getActive(item) : true;

    return (
      <button
        key={idx}
        className={`${styles.actionBtn} ${
          action.type === "delete"
            ? styles.danger
            : action.type === "update"
            ? styles.primary
            : isActive
            ? styles.active
            : styles.inactive
        }`}
        onClick={() => action.onClick(item)}
        aria-label={tooltip}
      >
        {action.type === "toggle" && !isActive ? <FaToggleOff /> : <Icon />}
        <span className={styles.tooltip}>{tooltip}</span>
      </button>
    );
  };

  return (
    <div className={styles.tableWrapper}>
      <div className={styles.tableScrollWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              {visibleColumns.map(({ label, key, width }, index) => (
                <th
                  key={String(key)}
                  style={{ width }}
                  className={index === 0 ? styles.leftSticky : ""}
                >
                  {label}
                </th>
              ))}
              {effectiveActions?.length ? (
                <th
                  className={`${styles.fixedCell} ${styles.rightSticky}`}
                  style={{ width: "120px" }}
                >
                  Actions
                </th>
              ) : null}
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td
                  colSpan={visibleColumns.length + (effectiveActions ? 1 : 0)}
                >
                  No data found
                </td>
              </tr>
            ) : (
              data.map((item) => (
                <tr key={String(item[keyField])}>
                  {visibleColumns.map(({ key, render }, index) => (
                    <td
                      key={String(key)}
                      className={index === 0 ? styles.leftSticky : ""}
                    >
                      {render ? render(item) : item[key]}
                    </td>
                  ))}
                  {effectiveActions?.length ? (
                    <td className={`${styles.fixedCell} ${styles.rightSticky}`}>
                      <div className={styles.actionsContainer}>
                        {effectiveActions.map((action, idx) =>
                          renderActionButton(action, item, idx)
                        )}
                      </div>
                    </td>
                  ) : null}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Table;
