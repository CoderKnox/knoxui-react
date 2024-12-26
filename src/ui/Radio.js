'use client';

const sizeClasses = {
  xs: 'p-0.5 text-xs',
  s: 'p-1 text-sm',
  m: 'p-1.5 text-base',
  l: 'p-2 text-lg',
  xl: 'p-3 text-xl',
};

const colorClasses = {
  primary: 'border-primary outline-primary accent-primary',
  secondary: 'border-secondary outline-secondary accent-secondary',
  success: 'border-success outline-success accent-success',
  warning: 'border-warning outline-warning accent-warning',
  error: 'border-error outline-error accent-error',
  ghost: 'border-ghost focus:border-base-300 outline-none',
};

const bgColorClasses = {
  primary: 'bg-primary',
  secondary: 'bg-secondary',
  success: 'bg-success',
  warning: 'bg-warning',
  error: 'bg-error',
  ghost: 'bg-base-300',
};

const baseClasses = 'w-full border rounded-md transition-all duration-200 focus:shadow-lg bg-base-200 border-base-300 flex items-center'

function Radio({checked=false, size='m', color='primary', label, onChange, className, wrapperClass, sx, isButton=false, ...props}){
  if (isButton) {
    return (
      <label className={`${baseClasses} ${sizeClasses[size]} ${colorClasses[color]} ${checked ? bgColorClasses[color] : ''} ${className} cursor-pointer`} style={sx}>
        <input 
          type="radio" 
          checked={checked} 
          onChange={onChange}
          className="sr-only"
          {...props}
        />
        <span className={`w-full text-center ${checked ? 'text-white' : ''}`}>{label}</span>
      </label>
    )
  }

  return (
    <>
    {
      label ?
      <div className={wrapperClass} style={sx}>
        <label className={`${baseClasses} ${sizeClasses[size]} ${checked ? bgColorClasses[color] : ''}`}>
          <input 
            type="radio" 
            checked={checked} 
            className={`${colorClasses[color]} ${className}`}
            onChange={onChange}
            {...props}
          />
          <span className={`ml-2 ${checked ? 'text-white' : ''}`}>{label}</span>
        </label>
      </div> :
      <input 
        type="radio" 
        className={`${colorClasses[color]} ${className} ${checked ? bgColorClasses[color] : ''}`} 
        checked={checked} 
        onChange={onChange} 
        style={sx} 
        {...props} 
      />
    }
    </>
  )
}

export default Radio
