import type { ReactNode } from "react";
import "./button-chip.scss";

export type ButtonChipProps = {
  children?: string;
  severity?: "danger";
  outlined?: boolean;
  icon?: ReactNode;
  className?: string;
  onClick: () => void;
};

export function ButtonChip({
  children,
  severity,
  outlined = false,
  className = "",
  icon,
  onClick,
}: ButtonChipProps) {
  const classes = [
    "button-chip",
    severity && `button-chip--${severity}`,
    outlined && "button-chip--outlined",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button type="button" className={classes} onClick={onClick}>
      {icon}
      {children}
    </button>
  );
}
