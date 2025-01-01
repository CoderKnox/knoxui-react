import React from 'react';

export const sizeClasses = {
  xs: 'p-0.5 text-xs',
  s: 'p-1 text-sm',
  m: 'p-1.5 text-base',
  l: 'p-2 text-lg',
  xl: 'p-3 text-xl',
} as const;

export const colorClasses = {
  primary: 'border-primary outline-primary accent-primary',
  secondary: 'border-secondary outline-secondary accent-secondary',
  success: 'border-success outline-success accent-success',
  warning: 'border-warning outline-warning accent-warning',
  error: 'border-error outline-error accent-error',
  ghost: 'border-ghost focus:border-base-300 outline-none',
} as const;

export const bgColorClasses = {
  primary: 'bg-primary',
  secondary: 'bg-secondary',
  success: 'bg-success',
  warning: 'bg-warning',
  error: 'bg-error',
  ghost: 'bg-base-300',
} as const;

export type RadioSize = keyof typeof sizeClasses;
export type RadioColor = keyof typeof colorClasses;

export interface RadioProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  checked?: boolean;
  size?: RadioSize;
  color?: RadioColor;
  label?: string;
  wrapperClass?: string;
  sx?: React.CSSProperties;
  isButton?: boolean;
}

