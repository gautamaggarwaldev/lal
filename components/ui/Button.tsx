'use client';

import { ButtonHTMLAttributes, forwardRef } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'whatsapp';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', fullWidth = false, className = '', children, ...props }, ref) => {
    const baseStyles =
      'inline-flex items-center justify-center font-body font-medium rounded-sm transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-gold cursor-pointer';

    const variants = {
      primary:
        'bg-brand-green text-white border border-brand-gold/40 hover:bg-brand-gold hover:text-text-primary hover:scale-[1.02] active:scale-[0.98]',
      secondary:
        'bg-transparent text-brand-green border border-brand-green hover:bg-brand-green hover:text-white hover:scale-[1.02] active:scale-[0.98]',
      ghost:
        'bg-transparent text-text-primary hover:text-brand-gold hover:scale-[1.02] active:scale-[0.98]',
      whatsapp:
        'bg-whatsapp-green text-white hover:bg-[#1ebe5d] hover:scale-[1.02] active:scale-[0.98]',
    };

    const sizes = {
      sm: 'px-4 py-2 text-sm',
      md: 'px-6 py-3 text-base',
      lg: 'px-8 py-4 text-lg',
    };

    return (
      <button
        ref={ref}
        className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${fullWidth ? 'w-full' : ''} ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
