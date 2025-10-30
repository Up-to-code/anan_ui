'use client';

import { ReactNode } from 'react';

interface InlineAlertProps {
  message: string | ReactNode;
  variant?: 'success' | 'error' | 'warning' | 'info';
  showIcon?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export default function InlineAlert({
  message,
  variant = 'info',
  showIcon = true,
  size = 'md'
}: InlineAlertProps) {
  const alertConfig = {
    success: {
      bg: 'bg-green-50',
      text: 'text-green-700',
      border: 'border-green-200',
      icon: '✅'
    },
    error: {
      bg: 'bg-red-50',
      text: 'text-red-700',
      border: 'border-red-200',
      icon: '❌'
    },
    warning: {
      bg: 'bg-yellow-50',
      text: 'text-yellow-700',
      border: 'border-yellow-200',
      icon: '⚠️'
    },
    info: {
      bg: 'bg-blue-50',
      text: 'text-blue-700',
      border: 'border-blue-200',
      icon: 'ℹ️'
    }
  };

  const sizeClasses = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-3 text-sm',
    lg: 'px-4 py-3 text-base'
  };

  const config = alertConfig[variant];

  return (
    <div className={`
      rounded-md border ${config.border} ${config.bg} ${config.text}
      ${sizeClasses[size]}
    `}>
      <div className="flex items-center gap-2">
        
        {showIcon && (
          <span className="flex-shrink-0">
            {config.icon}
          </span>
        )}
        
        <div className="flex-1">
          {message}
        </div>

      </div>
    </div>
  );
}