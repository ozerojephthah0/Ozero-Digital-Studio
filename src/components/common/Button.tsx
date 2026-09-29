import React from 'react';
import { logAction } from '../../utils/logger';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'success';
  size?: 'sm' | 'md' | 'lg';
  actionName?: string;
  actionPayload?: Record<string, unknown> | string | number | null;
  children: React.ReactNode;
  icon?: React.ReactNode;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  actionName,
  actionPayload,
  children,
  icon,
  iconLeft,
  iconRight,
  className = '',
  onClick,
  disabled,
  ...props
}) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const label = actionName || (typeof children === 'string' ? children : 'Button Clicked');
    logAction(label, actionPayload);
    if (onClick) {
      onClick(e);
    }
  };

  const baseStyles =
    'inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed select-none cursor-pointer whitespace-nowrap active:scale-[0.98]';

  const sizeStyles = {
    sm: 'text-xs px-3 py-1.5 rounded-lg gap-1.5',
    md: 'text-sm px-4 py-2 rounded-xl gap-2',
    lg: 'text-base px-6 py-3 rounded-xl gap-2.5'
  };

  const variantStyles = {
    primary:
      'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-semibold shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/30 border border-cyan-400/30',
    secondary:
      'bg-slate-900/90 hover:bg-slate-800 text-slate-100 border border-slate-700/80 hover:border-slate-600 shadow-sm',
    outline:
      'bg-transparent hover:bg-slate-800/40 text-slate-200 border border-slate-700 hover:border-cyan-500/50 hover:text-cyan-400',
    ghost:
      'bg-transparent hover:bg-slate-800/60 text-slate-300 hover:text-white',
    danger:
      'bg-rose-600 hover:bg-rose-500 text-white shadow-sm shadow-rose-900/40',
    success:
      'bg-emerald-600 hover:bg-emerald-500 text-white shadow-sm shadow-emerald-900/40'
  };

  return (
    <button
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      onClick={handleClick}
      disabled={disabled}
      {...props}
    >
      {(icon || iconLeft) && <span className="shrink-0">{icon || iconLeft}</span>}
      <span>{children}</span>
      {iconRight && <span className="shrink-0">{iconRight}</span>}
    </button>
  );
};
