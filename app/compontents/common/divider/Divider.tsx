import React from "react";
import styles from "./Divider.module.scss";

enum Color {
  white = "white",
  light = "light",
  dark = "dark"
}

interface DividerProps {
  color?: "white" | "light" | "dark";
}

function Divider({ color = "light" }: DividerProps): JSX.Element {
  return (
    <hr className={`${styles.divider} ${styles[`divider_${Color[color]}`]}`} />
  );
}

export default Divider;
