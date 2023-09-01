import { faEye, faEyeSlash, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { forwardRef, useImperativeHandle, useRef } from "react";
import { Button } from "../button/index";
import { classNames } from "../helpers/utils";
import styles from "./Input.module.scss";
import { InputProps } from "./input.types";

const Input = (
  {
    id,
    value,
    onChange,
    onClear,
    icon,
    color = "none",
    borderMode = "outline",
    containerClassname,
    type = "text",
    showPassword = false,
    onShowPassword,
    className,
    style = {},
    ...otherAttributes
  }: InputProps,
  ref: React.ForwardedRef<HTMLInputElement>
): JSX.Element => {
  const inputRef = useRef<HTMLInputElement>(null);

  useImperativeHandle(ref, () => inputRef.current as HTMLInputElement);

  const containerClass = classNames(styles.input__container, {
    color: styles[color],
    mode: styles[borderMode],
    className: containerClassname || false
  });

  const disabled = color === "disabled";

  return (
    <span className={containerClass}>
      {icon || null}
      <input
        {...otherAttributes}
        id={id}
        className={`${styles.input} ${icon ? "pl-s" : ""}  ${className || ""}`}
        onChange={onChange}
        value={value}
        disabled={disabled}
        ref={inputRef}
        type={type}
        style={type === "number" ? { paddingRight: 0, ...style } : style}
      />
      {value && !disabled ? (
        <Button
          aria-label="Clear"
          color="i-primary"
          size="i-xs"
          className="my-auto mr-xs"
          onClick={(
            e:
              | React.MouseEvent<HTMLButtonElement>
              | React.KeyboardEvent<HTMLButtonElement>
          ) => {
            if (onClear) {
              onClear(e);
            } else if (inputRef.current) {
              const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
                window.HTMLInputElement.prototype,
                "value"
              );
              if (nativeInputValueSetter && nativeInputValueSetter.set) {
                nativeInputValueSetter.set.call(inputRef.current, "");
                const inputEvent = new Event("input", { bubbles: true });
                inputRef.current.dispatchEvent(inputEvent);
              }
            }
          }}
        >
          <FontAwesomeIcon
            icon={faTimes}
            className={styles.input__close}
            size="1x"
          />
        </Button>
      ) : null}
      {showPassword ? (
        <Button
          aria-label="Show password"
          color="i-primary"
          size="i-xs"
          onClick={onShowPassword}
          className="my-auto mr-s"
        >
          <FontAwesomeIcon
            icon={type !== "password" ? faEyeSlash : faEye}
            className={`${styles.input__close}`}
            size="1x"
          />
        </Button>
      ) : null}
    </span>
  );
};

export default forwardRef(Input);
