import type React from "react"

export const sizeClasses = {
  xs: "p-0.5 text-xs",
  sm: "p-1 text-sm",
  md: "p-1.5 pl-2 text-base",
  lg: "p-2 pl-2.5 text-lg",
  xl: "p-3 pl-4 text-xl",
} as const

export const variantClasses = {
  primary: "border-primary outline-primary accent-primary",
  secondary: "border-secondary outline-secondary accent-secondary",
  success: "border-success outline-success accent-success",
  warning: "border-warning outline-warning accent-warning",
  error: "border-error outline-error accent-error",
  ghost: "focus:outline-none",
} as const

export const bgColorClasses = {
  primary: "bg-primary",
  secondary: "bg-secondary",
  success: "bg-success",
  warning: "bg-warning",
  error: "bg-error",
  ghost: "bg-base-300",
} as const

export type RadioSize = keyof typeof sizeClasses
export type RadioVariant = keyof typeof variantClasses

export interface RadioProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  checked?: boolean
  size?: RadioSize
  variant?: RadioVariant
  label?: string
  wrapperClass?: string
  sx?: React.CSSProperties
  isButton?: boolean
}

