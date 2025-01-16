import React from 'react';
import { CheckboxProps, colorClasses, sizeClasses, baseClasses } from '../types/CheckboxProps';

const Checkbox: React.FC<CheckboxProps> = ({
  checked = false,
  size = 'm',
  color = 'primary',
  label,
  onChange,
  className = '',
  wrapperClass = '',
  sx,
  ...props
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e);
    }
  };

  if (label) {
    return (
      <div className={wrapperClass} style={sx}>
        <label className={`${baseClasses} ${sizeClasses[size]} cursor-pointer`}>
          <input 
            type="checkbox" 
            checked={checked}
            onChange={handleChange}
            className={`${colorClasses[color]} ${className}`}
            {...props}
          />
          {label && <span className="ml-2">{label}</span>}
        </label>
      </div>
    );
  }

  return (
    <input 
      type="checkbox" 
      checked={checked}
      onChange={handleChange}
      className={`${colorClasses[color]} ${className} ${sizeClasses[size]}`} 
      style={sx} 
      {...props} 
    />
  );
};

export default Checkbox;

