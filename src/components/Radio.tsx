import React from 'react';

const sizeClasses = {
  xs: 'p-0.5 text-xs',
  s: 'p-1 text-sm',
  m: 'p-1.5 text-base',
  l: 'p-2 text-lg',
  xl: 'p-3 text-xl',
} as const;

const colorClasses = {
  primary: 'border-primary outline-primary accent-primary',
  secondary: 'border-secondary outline-secondary accent-secondary',
  success: 'border-success outline-success accent-success',
  warning: 'border-warning outline-warning accent-warning',
  error: 'border-error outline-error accent-error',
  ghost: 'border-ghost focus:border-base-300 outline-none',
} as const;

const bgColorClasses = {
  primary: 'bg-primary',
  secondary: 'bg-secondary',
  success: 'bg-success',
  warning: 'bg-warning',
  error: 'bg-error',
  ghost: 'bg-base-300',
} as const;

const baseClasses = 'w-full border rounded-md transition-all duration-200 focus:shadow-lg bg-base-200 border-base-300 flex items-center';

type RadioSize = keyof typeof sizeClasses;
type RadioColor = keyof typeof colorClasses;

interface RadioProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  checked?: boolean;
  size?: RadioSize;
  color?: RadioColor;
  label?: string;
  wrapperClass?: string;
  sx?: React.CSSProperties;
  isButton?: boolean;
}

const Radio: React.FC<RadioProps> = ({
  checked = false,
  size = 'm',
  color = 'primary',
  label,
  onChange,
  className = '',
  wrapperClass = '',
  sx,
  isButton = false,
  ...props
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e);
    }
  };

  if (isButton) {
    return (
      <label className={`${baseClasses} ${sizeClasses[size]} ${colorClasses[color]} ${checked ? bgColorClasses[color] : ''} ${className} cursor-pointer`} style={sx}>
        <input 
          type="radio" 
          checked={checked}
          onChange={handleChange}
          className="sr-only"
          {...props}
        />
        <span className={`w-full text-center ${checked ? 'text-white' : ''}`}>{label}</span>
      </label>
    );
  }

  if (label) {
    return (
      <div className={wrapperClass} style={sx}>
        <label className={`${baseClasses} ${sizeClasses[size]} ${checked ? bgColorClasses[color] : ''}`}>
          <input 
            type="radio" 
            checked={checked}
            onChange={handleChange}
            className={`${colorClasses[color]} ${className}`}
            {...props}
          />
          <span className={`ml-2 ${checked ? 'text-white' : ''}`}>{label}</span>
        </label>
      </div>
    );
  }

  return (
    <input 
      type="radio" 
      className={`${colorClasses[color]} ${className} ${checked ? bgColorClasses[color] : ''}`} 
      checked={checked} 
      onChange={handleChange} 
      style={sx} 
      {...props} 
    />
  );
};

export default Radio;

