import React from "react"
import { type InputProps, sizeClasses, variantClasses, baseClasses } from "../types/InputProps"


const Input: React.FC<InputProps> = ({
  label,
  size = "md",
  variant = "primary",
  type = "text",
  required,
  className = "",
  wrapperClass = "",
  labelClass = "",
  labelTextClass = "",
  sx,
  ...props
}) => {
  return (
    <div className={wrapperClass} style={sx}>
      <label className={`flex flex-col items-start ${labelClass}`}>
        {label && (
          <span className={`text-sm px-0.5 ${labelTextClass}`}>
            {label} {required && <span className="text-error">*</span>}
          </span>
        )}
        <input
          type={type}
          className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
          required={required}
          {...props}
        />
      </label>
    </div>
  )
}

export default Input

