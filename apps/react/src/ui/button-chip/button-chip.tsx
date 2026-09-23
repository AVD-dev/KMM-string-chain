import type { ReactNode } from "react";
import "./button-chip.scss";

export type ButtonChipProps = {
  children?: string;
  severity?: "danger";
  outlined?: boolean;
  icon?: ReactNode;
  className?: string;
  disabled?: boolean;
  onClick: () => void;
};

export function ButtonChip({
  children,
  severity,
  outlined = false,
  className = "",
  disabled = false,
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
    <button
      disabled={disabled}
      type="button"
      className={classes}
      onClick={onClick}
    >
      {icon}
      {children}
    </button>
  );
}
