import React from "react";
import styles from "./Button.module.scss";

export interface ButtonGroupProps
  extends React.ButtonHTMLAttributes<HTMLDivElement> {
  className?: string;
  style?: React.CSSProperties;
  children: JSX.Element[] | JSX.Element;
}

export default function ButtonGroup({
  children,
  className,
  ...otherAttributes
}: ButtonGroupProps): JSX.Element {
  return (
    <div
      role="group"
      className={`${styles["btn-group"]} ${className ? children : ""}`}
      {...otherAttributes}
    >
      {children}
    </div>
  );
}
