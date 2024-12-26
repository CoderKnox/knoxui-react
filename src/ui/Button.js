const sizeClasses = {
  xs: 'px-2 py-0.5 text-xs',
  s: 'px-3 py-1 text-sm',
  m: 'px-4 py-1.5 text-base',
  l: 'px-5 py-2 text-lg',
  xl: 'px-6 py-2.5 text-xl',
};

const colorClasses = {
  primary: 'bg-primary border-primary hover:bg-primary/50 text-white',
  secondary: 'bg-secondary border-secondary hover:bg-secondary-600 text-white',
  success: 'bg-success border-success hover:bg-success-600 text-white',
  warning: 'bg-warning border-warning hover:bg-warning-600 text-white',
  error: 'bg-error border-error hover:bg-error-600 text-white',
  ghost: 'bg-ghost border-ghost hover:bg-gray-100 text-gray-800 dark:text-gray-100 dark:hover:bg-gray-800/50',
};

const clickEffects = {
  ripple: 'overflow-hidden relative',
  push: 'transform active:scale-90 transition-transform',
  none: '',
};

const Button = ({
  children,
  size = 'm',
  color = 'primary',
  clickEffect = 'ripple',
  isLoading = false,
  className = '',
  disabled = false,
  ...props
}) => {
  var baseClasses = `font-semibold rounded-md transition-colors duration-400 h-min select-none border duration-200 transition-all hover:shadow-lg focus:shadow-lg ${disabled && 'opacity-90 cursor-not-allowed'} ${className}`; ;
  const sizeClass = sizeClasses[size] || sizeClasses.m;
  const colorClass = colorClasses[color] || colorClasses.primary;
  const effectClass = clickEffects[clickEffect] || clickEffects.ripple;

  if (isLoading) {
    baseClasses = `${baseClasses} opacity-90 cursor-progress`;
  }

  const handleClick = (event) => {
    if (clickEffect === 'ripple' && !isLoading) {
      const button = event.currentTarget;
      const ripple = button.querySelector('.new-ripple');
      
      // Calculate position
      const rect = button.getBoundingClientRect();
      const left = event.clientX - rect.left;
      const top = event.clientY - rect.top;
      const circleSize = Math.max(rect.width, rect.height);
      
      // Set position and add ripple effect
      ripple.style.left = `${left-(circleSize/4)}px`;
      ripple.style.top = `${top-(circleSize/4)}px`;
      ripple.style.width = `${circleSize/2}px`;
      ripple.style.height = `${circleSize/2}px`;
      ripple.classList.remove('hidden');
      ripple.classList.add('animate-ripple');

      // Remove ripple effect after animation
      setTimeout(() => {
        ripple.classList.remove('animate-ripple');
        ripple.classList.add('hidden');
      }, 600);
    }

    if (props.onClick) {
      props.onClick(event);
    }
  };

  return (
    <button
      className={`${baseClasses} ${sizeClass} ${colorClass} ${effectClass} ${className}`}
      onClick={handleClick}
      disabled={disabled || isLoading}
      {...props}
    >
      {clickEffect === 'ripple' && <span className="animate-ripple new-ripple absolute bg-white opacity-25 rounded-full hidden"></span>}
      {isLoading ? (
        <span className="flex items-center justify-center">
          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Loading...
        </span>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;

