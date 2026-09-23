import "./card.scss";

import type { ReactNode } from "react";

export type CardProps = {
  header?: ReactNode;
  subheader?: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
  className?: string;
};

export function Card({
  header,
  subheader,
  children,
  footer,
  className = "",
}: CardProps) {
  return (
    <div className={`card ${className}`}>
      {header && <header className="card__header">{header}</header>}
      {subheader && <p>{subheader}</p>}
      {children}
      {footer && <footer className="card__footer">{footer}</footer>}
    </div>
  );
}
