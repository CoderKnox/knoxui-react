import type { ReactNode } from "react"

export interface DropdownItem {
  label: string
  href?: string
  icon?: ReactNode
  children?: DropdownItem[]
}

export interface DropdownProps {
  items: DropdownItem[]
  label: string
  variant?: "primary" | "secondary" | "success" | "warning" | "error" | "ghost"
  size?: "xs" | "sm" | "md" | "lg" | "xl"
  className?: string
}

