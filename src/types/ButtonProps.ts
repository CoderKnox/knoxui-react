import React from 'react';

const sizeClasses = {
  xs: 'px-2 py-0.5 text-xs',
  s: 'px-3 py-1 text-sm',
  m: 'px-4 py-1.5 text-base',
  l: 'px-5 py-2 text-lg',
  xl: 'px-6 py-2.5 text-xl',
} as const;

const colorClasses = {
  primary: 'bg-primary border-primary hover:bg-primary/50 text-white',
  secondary: 'bg-secondary border-secondary hover:bg-secondary-600 text-white',
  success: 'bg-success border-success hover:bg-success-600 text-white',
  warning: 'bg-warning border-warning hover:bg-warning-600 text-white',
  error: 'bg-error border-error hover:bg-error-600 text-white',
  ghost: 'bg-ghost border-ghost hover:bg-gray-100 text-gray-800 dark:text-gray-100 dark:hover:bg-gray-800/50',
} as const;

const clickEffects = {
  ripple: 'overflow-hidden relative',
  push: 'transform active:scale-90 transition-transform',
  none: '',
} as const;

export type ButtonSize = keyof typeof sizeClasses;
export type ButtonColor = keyof typeof colorClasses;
export type ButtonClickEffect = keyof typeof clickEffects;

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: ButtonSize;
  color?: ButtonColor;
  clickEffect?: ButtonClickEffect;
  isLoading?: boolean;
  className?: string;
}

export { sizeClasses, colorClasses, clickEffects };

