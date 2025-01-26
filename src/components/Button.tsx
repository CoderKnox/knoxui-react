import React from "react"
import type { MouseEvent } from "react"
import { type ButtonProps, sizeClasses, variantClasses, clickEffects } from "../types/ButtonProps"


const Button: React.FC<ButtonProps> = ({
  children,
  size = "md",
  variant = "primary",
  clickEffect = "ripple",
  isLoading = false,
  className = "",
  disabled = false,
  onClick,
  ...props
}) => {
  const baseClasses = `font-semibold rounded-md transition-colors duration-400 h-min select-none border duration-200 transition-all hover:shadow-lg ${variant !== "ghost" ? "focus:shadow-lg" : ""} ${disabled && "opacity-90 cursor-not-allowed"} ${className}`
  const sizeClass = sizeClasses[size]
  const colorClass = variantClasses[variant]
  const effectClass = clickEffects[clickEffect]

  const buttonClasses = `${baseClasses} ${sizeClass} ${colorClass} ${effectClass} ${isLoading ? "opacity-90 cursor-progress" : ""}`

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    if (clickEffect === "ripple" && !isLoading && !disabled) {
      const button = event.currentTarget
      const ripple = document.createElement("span")
      ripple.className = "absolute bg-white opacity-25 rounded-full animate-ripple"

      const rect = button.getBoundingClientRect()
      const size = Math.max(rect.width, rect.height)
      const left = event.clientX - rect.left - size / 2
      const top = event.clientY - rect.top - size / 2

      ripple.style.width = ripple.style.height = `${size}px`
      ripple.style.left = `${left}px`
      ripple.style.top = `${top}px`

      button.appendChild(ripple)

      setTimeout(() => {
        ripple.remove()
      }, 600)
    }

    if (onClick && !isLoading && !disabled) {
      onClick(event)
    }
  }

  return (
    <button className={buttonClasses} onClick={handleClick} disabled={disabled || isLoading} {...props}>
      {isLoading ? (
        <span className="flex items-center justify-center">
          <svg
            className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          Loading...
        </span>
      ) : (
        children
      )}
    </button>
  )
}

export default Button

