'use client';
import { forwardRef, ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'accent' | 'ghost' | 'outline' | 'danger' | 'premium';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

const variants = {
  primary: 'bg-green-500 hover:bg-green-600 text-white shadow-lg shadow-green-500/20 hover:shadow-green-500/30',
  accent: 'bg-orange-500 hover:bg-orange-600 text-white shadow-lg shadow-orange-500/20',
  ghost: 'bg-transparent hover:bg-white/5 text-slate-300 hover:text-white',
  outline: 'bg-transparent border border-white/15 hover:border-white/30 text-slate-300 hover:text-white hover:bg-white/5',
  danger: 'bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-400 hover:text-red-300',
  premium: 'bg-yellow-500 hover:bg-yellow-600 text-black font-semibold shadow-lg shadow-yellow-500/20',
};

const sizes = {
  sm: 'h-8 px-3 text-sm rounded-lg gap-1.5',
  md: 'h-10 px-4 text-sm rounded-xl gap-2',
  lg: 'h-12 px-6 text-base rounded-xl gap-2',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(({
  variant = 'primary', size = 'md', loading, leftIcon, rightIcon, fullWidth, className, children, disabled, ...props
}, ref) => (
  <button
    ref={ref}
    disabled={disabled || loading}
    className={cn(
      'inline-flex items-center justify-center font-medium transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed select-none',
      variants[variant], sizes[size], fullWidth && 'w-full', className
    )}
    {...props}
  >
    {loading ? <Loader2 className="animate-spin" size={size === 'sm' ? 14 : 16} /> : leftIcon}
    {children}
    {!loading && rightIcon}
  </button>
));
Button.displayName = 'Button';
