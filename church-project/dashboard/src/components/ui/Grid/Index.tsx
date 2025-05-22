import React from "react";
import styles from "./index.module.css";

interface GridProps {
  children: React.ReactNode;
  gap?: "none" | "sm" | "md" | "lg";
  className?: string;
}

interface GridRowProps {
  children: React.ReactNode;
  className?: string;
}

interface GridColumnProps {
  children: React.ReactNode;
  span?: {
    base?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
  align?: "start" | "center" | "end";
  justify?: "start" | "center" | "end";
  className?: string;
}


export const Grid: React.FC<GridProps> & {
  Row: React.FC<GridRowProps>;
  Column: React.FC<GridColumnProps>;
} = ({ children, gap = "md", className }) => {
  return (
    <div className={`${styles.grid} ${styles[gap]} ${className || ""}`}>
      {children}
    </div>
  );
};

Grid.Row = ({ children, className }) => (
  <div className={`${styles.row} ${className || ""}`}>{children}</div>
);

Grid.Column = ({ children, span = {}, align, justify, className }) => {
  const spanClasses = [
    span.base && styles[`col-${span.base}`],
    span.sm && styles[`sm-col-${span.sm}`],
    span.md && styles[`md-col-${span.md}`],
    span.lg && styles[`lg-col-${span.lg}`],
    span.xl && styles[`xl-col-${span.xl}`],
  ]
    .filter(Boolean)
    .join(" ");

  const alignmentClasses = [
    align && styles[`align-${align}`],
    justify && styles[`justify-${justify}`],
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      className={`${styles.column} ${spanClasses} ${alignmentClasses} ${
        className || ""
      }`}
    >
      {children}
    </div>
  );
};


export default Grid;
