import React from "react"
import { type CheckboxProps, colorClasses, sizeClasses, baseClasses, labelSizeClasses } from "../types/CheckboxProps"

const Checkbox: React.FC<CheckboxProps> = ({
  checked = false,
  size = "md",
  variant = "primary",
  label,
  onChange,
  className = "",
  wrapperClass = "",
  sx,
  ...props
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e)
    }
  }

  if (label) {
    return (
      <div className={wrapperClass} style={sx}>
        <label className={`${baseClasses} ${className} ${labelSizeClasses[size]} cursor-pointer`}>
          <input
            type="checkbox" 
            checked={checked}
            onChange={handleChange}
            className={`${colorClasses[variant]} ${sizeClasses[size]}`}
            {...props}
          />
          <span className={`${sizeClasses[size].split(" ").slice(-1)[0]}`}>{label}</span>
        </label>
      </div>
    )
  }

  return (
    <input
      type="checkbox"
      checked={checked}
      onChange={handleChange}
      className={`${colorClasses[variant]} ${className} ${sizeClasses[size]}`}
      style={sx}
      {...props}
    />
  )
}

export default Checkbox

