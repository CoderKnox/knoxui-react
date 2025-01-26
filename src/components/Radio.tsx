import React from "react"
import { type RadioProps, bgColorClasses, sizeClasses, variantClasses } from "../types/RadioProps"


const baseClasses = "w-full border rounded-md transition-all duration-200 focus:shadow-lg bg-base-200 border-base-300 flex items-center"

type RadioSize = keyof typeof sizeClasses
type RadioVariant = keyof typeof variantClasses


const Radio: React.FC<RadioProps> = ({
  checked = false,
  size = "md",
  variant = "primary",
  label,
  onChange,
  className = "",
  wrapperClass = "",
  sx,
  isButton = false,
  ...props
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e)
    }
  }

  const variantClass = variantClasses[variant]

  if (isButton) {
    return (
      <label
        className={`${baseClasses} ${sizeClasses[size]} ${variantClass} ${checked && variant !== "ghost" ? bgColorClasses[variant] : "!bg-transparent"} ${className} cursor-pointer`}
        style={sx}
      >
        <input type="radio" checked={checked} onChange={handleChange} className="sr-only" {...props} />
        <span className={`w-full text-center ${checked && variant !== "ghost" ? "text-white" : ""}`}>{label}</span>
      </label>
    )
  }

  if (label) {
    return (
      <div className={wrapperClass} style={sx}>
        <label
          className={`${baseClasses} ${sizeClasses[size]} ${checked && variant !== "ghost" ? bgColorClasses[variant] : ""}`}
        >
          <input
            type="radio"
            checked={checked}
            onChange={handleChange}
            className={`${variantClass} ${className} ${checked && variant !== "ghost" ? bgColorClasses[variant] : ""}`}
            {...props}
          />
          <span className={`ml-2 ${checked ? "text-white" : ""}`}>{label}</span>
        </label>
      </div>
    )
  }

  return (
    <input
      type="radio"
      className={`${variantClass} ${className} ${checked && variant !== "ghost" ? bgColorClasses[variant] : ""}`}
      checked={checked}
      onChange={handleChange}
      style={sx}
      {...props}
    />
  )
}

export default Radio

