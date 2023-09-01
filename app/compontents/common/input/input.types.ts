/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { TagColors } from "../tag";

export interface BasicInputProps {
  id: string;
  icon?: React.ReactNode;
  color?: "error" | "disabled" | "none";
  borderMode?: "outline" | "underline";
  placeholder?: string;
  onClear?: (
    para:
      | React.MouseEvent<HTMLButtonElement>
      | React.KeyboardEvent<HTMLButtonElement>
  ) => void;
  type?: string;
  [key: string]: any;
}

export interface InputProps extends BasicInputProps {
  value?: string;
  className?: string;
  onChange: (para: React.ChangeEvent<HTMLInputElement>) => void;
  showPassword?: boolean;
  onShowPassword?: (
    para:
      | React.MouseEvent<HTMLButtonElement>
      | React.KeyboardEvent<HTMLButtonElement>
  ) => void;
}

export type MultiInputValueItem = {
  color: TagColors;
  label: string;
  value: string | number | boolean;
  onDelete: (para: string | number | boolean) => void;
};

export interface MultiInputProps extends BasicInputProps {
  value?: string[] | MultiInputValueItem[] | null;
  onChange: (para?: string) => void;
  onItemClear?: (para: string) => void;
}

export interface TextfieldProps extends BasicInputProps {
  className?: string;
  label?: string | React.ReactNode;
  helperText?: string;
  helperType?: "info" | "error" | "none";
  disabled?: boolean;
  multi?: boolean;
  multiValue?: string[];
  value?: string;
  onChange: (para: React.ChangeEvent<HTMLInputElement>) => void;
  onItemClear?: (
    para:
      | React.MouseEvent<HTMLButtonElement>
      | React.KeyboardEvent<HTMLButtonElement>
  ) => void;
}

export interface SearchProps extends BasicInputProps {
  placeholder?: string;
  value: string;
  multi?: boolean;
  multiValue?: string[];
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onItemClear?: (
    para:
      | React.MouseEvent<HTMLButtonElement>
      | React.KeyboardEvent<HTMLButtonElement>
  ) => void;
}

export interface TextareaProps {
  className?: string;
  id: string;
  label?: string;
  helperText?: string;
  helperType?: "info" | "error" | "none";
  wordCount?: string;
  wordCountType?: "info" | "error";
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  value: string;
  [key: string]: any;
}
