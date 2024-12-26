"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { ChevronDown, X } from "lucide-react";

const sizeClasses = {
  xs: "text-xs",
  s: "text-sm",
  m: "text-base",
  l: "text-lg",
  xl: "text-xl",
};

const colorClasses = {
  primary: "border-primary focus:border-primary",
  secondary: "border-secondary focus:border-secondary",
  success: "border-success focus:border-success",
  warning: "border-warning focus:border-warning",
  error: "border-error focus:border-error",
  ghost: "border-ghost focus:border-base-300",
};

const baseClasses =
  "w-full border rounded-md transition-all duration-200 focus:shadow-lg bg-base-200 border-base-300";

function Select({
  options = [],
  placeholder = "Select an option",
  multiple = false,
  onChange,
  label,
  size = "m",
  color,
  required,
  className,
  wrapperClass,
  labelClass,
  labelTextClass,
  sx,
  renderOption,
  hideSearch = false,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const selectRef = useRef(null);

  // Filtered options with memoization
  const filteredOptions = useMemo(
    () =>
      options.filter((option) =>
        option.label.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    [options, searchTerm]
  );

  // Toggle selected option
  const toggleOption = (option) => {
    if (multiple) {
      const updatedSelection = selectedOptions.includes(option)
        ? selectedOptions.filter((item) => item !== option)
        : [...selectedOptions, option];
      setSelectedOptions(updatedSelection);
      if (onChange) {
         onChange(updatedSelection);
      }
    } else {
      setSelectedOptions([option]);
      setIsOpen(false);
      if (onChange) {
         onChange(option);
      }
    }
  };

  // Remove selected option
  const removeOption = (option) => {
    const updatedSelection = selectedOptions.filter((item) => item !== option);
    setSelectedOptions(updatedSelection);
    if (onChange) {
      onChange(updatedSelection);
    }
  };

  // Handle outside click
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  // Handle keyboard navigation
  const handleKeyDown = (e) => {
    if (!isOpen) return;

    if (e.key === "ArrowDown") {
      setFocusedIndex((prev) => Math.min(prev + 1, filteredOptions.length - 1));
    } else if (e.key === "ArrowUp") {
      setFocusedIndex((prev) => Math.max(prev - 1, 0));
    } else if (e.key === "Enter" && focusedIndex >= 0) {
      toggleOption(filteredOptions[focusedIndex]);
    } else if (e.key === "Escape") {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      setFocusedIndex(-1);
    }
  }, [isOpen]);

  return (
    <div className={wrapperClass} style={sx}>
      <label className={`flex flex-col items-start ${labelClass}`}>
        {label && (
          <span className={`text-sm ${labelTextClass}`}>
            {label} {required && <span className="text-error">*</span>}
          </span>
        )}
        <div
          className={`relative w-full ${baseClasses} ${sizeClasses[size]} ${
            colorClasses[color]
          } ${className}`}
          ref={selectRef}
          onKeyDown={handleKeyDown}
          tabIndex={0}
        >
          <div
            className="flex items-center justify-between w-full p-2 cursor-pointer"
            onClick={() => setIsOpen(!isOpen)}
          >
            <div className="flex flex-wrap gap-1">
              {selectedOptions.length > 0 ? (
                multiple ? (
                  selectedOptions.map((option) => (
                    <span
                      key={option.value}
                      className="px-2 py-1 text-sm bg-gray-200 rounded-md flex items-center"
                    >
                      {option.label}
                      <X
                        size={14}
                        className="ml-1 cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeOption(option);
                        }}
                      />
                    </span>
                  ))
                ) : (
                  <span>{selectedOptions[0].label}</span>
                )
              ) : (
                <span className="text-gray-400">{placeholder}</span>
              )}
            </div>
            <ChevronDown size={20} />
          </div>
          {isOpen && (
            <div className="absolute z-10 w-full mt-1 bg-base-100 border rounded-md shadow-lg">
              {!hideSearch && (
                <div className="p-1">
                  <input
                    type="text"
                    className="w-full p-2 border-b bg-base-200"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              )}
              <ul className="max-h-60 overflow-auto">
                {filteredOptions.map((option, index) => (
                  <li
                    key={option.value}
                    className={`p-2 cursor-pointer hover:bg-base-200 ${
                      selectedOptions.includes(option) ? "bg-base-300" : ""
                    } ${focusedIndex === index ? "bg-base-300" : ""}`}
                    onClick={() => toggleOption(option)}
                  >
                    {renderOption ? renderOption(option) : option.label}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </label>
    </div>
  );
};

export default Select;
