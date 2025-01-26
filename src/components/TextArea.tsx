import React from "react"
import { type TextareaProps, sizeClasses, variantClasses, baseClasses } from "../types/TextareaProps"

const Textarea: React.FC<TextareaProps> = ({
  label,
  size = "md",
  variant = "primary",
  required,
  className = "",
  wrapperClass = "",
  labelClass = "",
  labelTextClass = "",
  sx,
  rows = 3,
  ...props
}) => {
  return (
    <div className={wrapperClass} style={sx}>
      <label className={`flex flex-col items-start ${labelClass}`}>
        {label && (
          <span className={`text-sm ${labelTextClass}`}>
            {label} {required && <span className="text-error">*</span>}
          </span>
        )}
        <textarea
          className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
          required={required}
          rows={rows}
          {...props}
        />
      </label>
    </div>
  )
}

export default Textarea

