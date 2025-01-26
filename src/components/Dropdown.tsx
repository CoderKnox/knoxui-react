import React, { useState, useRef, useEffect } from "react";
import { DropdownProps, DropdownItem } from "../types/DropdownProps";

const sizeClasses = {
  xs: "px-2 py-1 text-xs",
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2 text-base",
  lg: "px-5 py-2.5 text-lg",
  xl: "px-6 py-3 text-xl",
};

const variantClasses = {
  primary: "bg-primary text-white hover:bg-primary-600",
  secondary: "bg-secondary text-white hover:bg-secondary-600",
  success: "bg-success text-white hover:bg-success-600",
  warning: "bg-warning text-white hover:bg-warning-600",
  error: "bg-error text-white hover:bg-error-600",
  ghost: "bg-transparent text-gray-800 hover:bg-gray-100",
};

const DropdownItemComponent: React.FC<{
  item: DropdownItem;
  depth: number;
  onItemClick: () => void;
}> = ({ item, depth, onItemClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const hasChildren = item.children && item.children.length > 0;

  const handleClick = (e: React.MouseEvent) => {
    if (hasChildren) {
      e.preventDefault();
      setIsOpen(!isOpen);
    } else {
      onItemClick();
    }
  };

  return (
    <>
      <li>
        <a
          href={item.href || "#"}
          className={`flex items-center px-4 py-2 hover:bg-gray-100 ${
            depth > 0 ? "pl-8" : ""
          }`}
          onClick={handleClick}
        >
          {item.icon && <span className="mr-2">{item.icon}</span>}
          <span>{item.label}</span>
          {hasChildren && (
            <svg
              className={`ml-auto h-4 w-4 transform transition-transform ${
                isOpen ? "rotate-180" : ""
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          )}
        </a>
        {hasChildren && isOpen && (
          <ul className="ml-4">
            {item.children!.map((child, index) => (
              <DropdownItemComponent
                key={index}
                item={child}
                depth={depth + 1}
                onItemClick={onItemClick}
              />
            ))}
          </ul>
        )}
      </li>
    </>
  );
};

const Dropdown: React.FC<DropdownProps> = ({
  items,
  label,
  variant = "primary",
  size = "md",
  className = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const closeDropdown = () => setIsOpen(false);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        type="button"
        className={`inline-flex items-center justify-center rounded-md ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
        onClick={toggleDropdown}
      >
        {label}
        <svg
          className="ml-2 h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <ul className="py-1">
            {items.map((item, index) => (
              <DropdownItemComponent
                key={index}
                item={item}
                depth={0}
                onItemClick={closeDropdown}
              />
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
