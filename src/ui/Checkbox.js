'use client';

const colorClasses = {
  primary: 'border-primary outline-primary accent-primary',
  secondary: 'border-secondary outline-secondary accent-secondary',
  success: 'border-success outline-success accent-success',
  warning: 'border-warning outline-warning accent-warning',
  error: 'border-error outline-error accent-error',
  ghost: 'border-ghost focus:border-base-300 outline-none',
};

const baseClasses= 'w-full border rounded-md transition-all duration-200 focus:shadow-lg bg-base-200 border-base-300 flex'

function Checkbox({checked=false, size='m', color='primary', label, onChange, className, wrapperClass, sx, ...props}){
  var sizeClasses = {
    xs: !label ? 'h-3 w-3' : 'p-0.5 text-xs',
    s: !label ? 'h-4 w-4' : 'p-1 text-sm',
    m: !label ? 'h-5 w-5' : 'p-1.5 text-base',
    l: !label ? 'h-6 w-6' : 'p-2 text-lg',
    xl: !label ? 'h-7 w-7' : 'p-3 text-xl',
  };

  return (<>
  {
    label 
    ?
    <div className={wrapperClass} style={sx}>
      <label className={`${baseClasses} ${sizeClasses[size]}`}>
        <input 
          type="checkbox" 
          checked={checked} 
          className={`${colorClasses[color]} ${className}`}
          onChange={onChange}
          {...props}
        />
        <span className="ml-2">{label}</span>
      </label>
    </div> 
    :
    <input type="checkbox" className={`${colorClasses[color]} ${className} ${sizeClasses[size]}`} checked={checked} onChange={onChange} style={sx} {...props} />
  }
  </>)
}

export default Checkbox
