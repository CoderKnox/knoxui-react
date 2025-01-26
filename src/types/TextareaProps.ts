import type React from "react"

export const sizeClasses = {
  xs: "p-0.5 text-xs",
  sm: "p-1 text-sm",
  md: "p-1.5 text-base",
  lg: "p-2 text-lg",
  xl: "p-3 text-xl",
} as const

export const variantClasses = {
  primary: "border-primary outline-primary",
  secondary: "border-secondary outline-secondary",
  success: "border-success outline-success",
  warning: "border-warning outline-warning",
  error: "border-error outline-error",
  ghost: "border-ghost focus:border-base-300 outline-none",
} as const

export const baseClasses =
  "w-full border rounded-md transition-all duration-200 focus:shadow-lg bg-base-200 border-base-300"

export type TextareaSize = keyof typeof sizeClasses
export type TextareaVariant = keyof typeof variantClasses

export interface TextareaProps extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "size"> {
  label?: string
  size?: TextareaSize
  variant?: TextareaVariant
  required?: boolean
  wrapperClass?: string
  labelClass?: string
  labelTextClass?: string
  sx?: React.CSSProperties
}

