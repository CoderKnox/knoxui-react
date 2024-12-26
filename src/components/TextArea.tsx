import React from 'react';

interface SizeClasses {
  [key: string]: string;
}

interface ColorClasses {
  [key: string]: string;
}

interface TextAreaProps {
  label?: string;
  size?: keyof SizeClasses;
  color?: keyof ColorClasses;
  required?: boolean;
  className?: string;
  wrapperClass?: string;
  labelClass?: string;
  labelTextClass?: string;
  sx?: React.CSSProperties;
  rows?: number;
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  [key: string]: any;
}

const sizeClasses: SizeClasses = {
  xs: 'p-0.5 text-xs',
  s: 'p-1 text-sm',
  m: 'p-1.5 text-base',
  l: 'p-2 text-lg',
  xl: 'p-3 text-xl',
};

const colorClasses: ColorClasses = {
  primary: 'border-primary outline-primary',
  secondary: 'border-secondary outline-secondary',
  success: 'border-success outline-success',
  warning: 'border-warning outline-warning',
  error: 'border-error outline-error',
  ghost: 'border-ghost focus:border-base-300 outline-none',
};

const baseClasses = 'w-full border rounded-md transition-all duration-200 focus:shadow-lg bg-base-200 border-base-300';

const TextArea: React.FC<TextAreaProps> = ({
  label,
  size = 'm',
  color,
  required,
  className = '',
  wrapperClass = '',
  labelClass = '',
  labelTextClass = '',
  sx,
  rows = 1,
  onChange,
  ...props
}) => {
  return (
    <div className={wrapperClass} style={sx}>
      <label className={`flex flex-col items-start ${labelClass}`}>
        <span className={`text-sm ${labelTextClass}`}>
          {label} {required && <span className='text-error'>*</span>}
        </span>
        <textarea 
          className={`${baseClasses} ${sizeClasses[size]} ${color ? colorClasses[color] : ''} ${className}`} 
          required={required}
          rows={rows}
          onChange={onChange}
          {...props} 
        />
      </label>
    </div>
  );
};

export default TextArea;

