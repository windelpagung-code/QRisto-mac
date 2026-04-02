import { cn } from '@/lib/utils';
import { HTMLAttributes } from 'react';

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'primary' | 'accent' | 'premium' | 'success' | 'warning' | 'danger' | 'muted';
  size?: 'sm' | 'md';
}

const variants = {
  default: 'bg-white/10 text-slate-300 border-white/15',
  primary: 'bg-green-500/15 text-green-400 border-green-500/25',
  accent: 'bg-orange-500/15 text-orange-400 border-orange-500/25',
  premium: 'bg-yellow-500/15 text-yellow-400 border-yellow-500/25',
  success: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/25',
  warning: 'bg-amber-500/15 text-amber-400 border-amber-500/25',
  danger: 'bg-red-500/15 text-red-400 border-red-500/25',
  muted: 'bg-slate-700/50 text-slate-400 border-slate-600/50',
};

export function Badge({ variant = 'default', size = 'sm', className, children, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 font-medium border rounded-full',
        size === 'sm' && 'px-2 py-0.5 text-xs',
        size === 'md' && 'px-3 py-1 text-sm',
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
