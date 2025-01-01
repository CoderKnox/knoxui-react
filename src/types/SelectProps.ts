import React from 'react';

export const sizeClasses = {
  xs: "text-xs",
  s: "text-sm",
  m: "text-base",
  l: "text-lg",
  xl: "text-xl",
} as const;

export const colorClasses = {
  primary: "border-primary focus:border-primary",
  secondary: "border-secondary focus:border-secondary",
  success: "border-success focus:border-success",
  warning: "border-warning focus:border-warning",
  error: "border-error focus:border-error",
  ghost: "border-ghost focus:border-base-300",
} as const;

export const baseClasses = "w-full border rounded-md transition-all duration-200 focus:shadow-lg bg-base-200 border-base-300";

export type SelectSize = keyof typeof sizeClasses;
export type SelectColor = keyof typeof colorClasses;

export interface Option {
  value: string | number;
  label: string;
}

export interface SelectProps {
  options: Option[];
  placeholder?: string;
  multiple?: boolean;
  onChange?: (selectedOption: Option | Option[]) => void;
  label?: string;
  size?: SelectSize;
  color?: SelectColor;
  required?: boolean;
  className?: string;
  wrapperClass?: string;
  labelClass?: string;
  labelTextClass?: string;
  sx?: React.CSSProperties;
  renderOption?: (option: Option) => React.ReactNode;
  hideSearch?: boolean;
}

