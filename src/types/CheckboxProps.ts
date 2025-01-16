import React from 'react';

export const colorClasses = {
  primary:   'border-primary outline-primary accent-primary',
  secondary: 'border-secondary outline-secondary accent-secondary',
  success:   'border-success outline-success accent-success',
  warning:   'border-warning outline-warning accent-warning',
  error:     'border-error outline-error accent-error',
  ghost:     'border-ghost focus:border-base-300 outline-none',
} as const;

export const baseClasses = 'w-full border rounded-md transition-all duration-200 focus:shadow-lg bg-base-200 border-base-300 flex';

export const sizeClasses = {
  xs: 'h-3 w-3',
  s: 'h-4 w-4',
  m: 'h-5 w-5',
  l: 'h-6 w-6',
  xl: 'h-7 w-7',
} as const;

export type CheckboxSize = keyof typeof sizeClasses;
export type CheckboxColor = keyof typeof colorClasses;

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  checked?: boolean;
  size?: CheckboxSize;
  color?: CheckboxColor;
  label?: string;
  wrapperClass?: string;
  sx?: React.CSSProperties;
}

