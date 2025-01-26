import type React from "react"

export const labelSizeClasses = {
  xs: "p-0.5 text-xs",
  sm: "p-1 text-sm",
  md: "p-1.5 text-base",
  lg: "p-2 text-lg",
  xl: "p-3 text-xl",
} as const

export const colorClasses = {
  primary: "border-primary outline-primary accent-primary",
  secondary: "border-secondary outline-secondary accent-secondary",
  success: "border-success outline-success accent-success",
  warning: "border-warning outline-warning accent-warning",
  error: "border-error outline-error accent-error",
  ghost: "border-ghost focus:border-base-300 outline-none",
} as const

export const baseClasses = "w-full border rounded-md transition-all duration-200 focus:shadow-lg bg-base-200 border-base-300 flex items-center gap-2"

export const sizeClasses = {
  xs: "h-3 w-3 text-xs",
  sm: "h-4 w-4 text-sm",
  md: "h-5 w-5 text-base",
  lg: "h-6 w-6 text-lg",
  xl: "h-7 w-7 text-xl",
} as const

export type CheckboxSize = keyof typeof sizeClasses
export type CheckboxVariant = keyof typeof colorClasses

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  checked?: boolean
  size?: CheckboxSize
  variant?: CheckboxVariant
  label?: string
  wrapperClass?: string
  sx?: React.CSSProperties
}

