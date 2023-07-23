import React, { forwardRef } from "react";
import { classNames } from "../helpers/utils";
import styles from "./Button.module.scss";

export type BtnColors =
  | "primary"
  | "secondary"
  | "neutral"
  | "plain"
  | "text"
  | "r-primary"
  | "r-secondary"
  | "i-primary"
  | "i-primary-g"
  | "t-primary"
  | "t-secondary";

export type BtnSizes =
  | "s"
  | "m"
  | "l"
  | "i-xs"
  | "i-s"
  | "i-l"
  | "r-s"
  | "r-m"
  | "r-l";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  color?: BtnColors;
  disabled?: boolean;
  href?: string;
  onClick?: (
    e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement, MouseEvent>
  ) => void;
  tag?: "button" | "a";
  size?: BtnSizes;
  style?: React.CSSProperties;
  isActive?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

export default forwardRef(function Button(
  {
    disabled,
    className,
    color = "primary",
    tag = "button",
    size = "m",
    onClick,
    isActive = false,
    ...otherAttributes
  }: ButtonProps,
  ref: React.ForwardedRef<HTMLButtonElement | HTMLAnchorElement>
): JSX.Element {
  // eslint-disable-next-line consistent-return
  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (onClick) {
      return onClick(e);
    }
  };

  let classes = classNames(styles.btn, {
    className: className || false,
    size: styles[`btn_${size}`],
    color: styles[`btn_${color}`],
    active: isActive ? styles.active : false
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let Tag = "button" as any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const aObj = {} as any;

  if (otherAttributes.href && tag === "a") {
    Tag = "a";
    aObj.rel = "noopener noreferrer";
    aObj.type = "";
    classes += " d-inline-block";
  }

  return (
    <Tag
      type="button"
      tabIndex={0}
      role="button"
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...aObj}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...otherAttributes}
      onClick={handleClick}
      className={classes}
      aria-disabled={!!disabled}
      disabled={!!disabled}
      ref={ref}
    />
  );
});
