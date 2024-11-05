import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'tertiary' | 'dashed';
  isAvailable?: boolean;
}

const getButtonClassNames = (variant?: string, isAvailable?: boolean) => {
  switch (variant) {
    case 'primary':
      return `bg-white text-primary`;
    case 'secondary':
      return 'bg-black text-white';
    case 'tertiary':
      return ` ${isAvailable ? 'bg-primary' : 'bg-gray'} text-white`;
    case 'dashed':
      return 'border-2 border-dotted bg-gray_soft text-primary';
    default:
      return 'bg-white text-primary';
  }
};

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', isAvailable = true, children, ...props }, ref) => {
    const className = getButtonClassNames(variant, isAvailable);

    return (
      <button
        disabled={!isAvailable}
        ref={ref}
        className={`${className} align-center flex w-full justify-center rounded-2xl py-4 font-bold`}
        {...props}
      >
        {children}
      </button>
    );
  },
);

Button.displayName = 'Button';

export default Button;
