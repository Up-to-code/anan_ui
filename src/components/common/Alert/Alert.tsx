'use client';

import { ReactNode } from 'react';

interface AlertProps {
  title?: string;
  message: string | ReactNode;
  variant?: 'success' | 'error' | 'warning' | 'info';
  onClose?: () => void;
  showIcon?: boolean;
  className?: string;
}

export default function Alert({
  title,
  message,
  variant = 'info',
  onClose,
  showIcon = true,
  className = ''
}: AlertProps) {
  const alertConfig = {
    success: {
      bg: 'bg-green-50 border-green-200',
      text: 'text-green-800',
      icon: '✅',
      title: 'نجاح'
    },
    error: {
      bg: 'bg-red-50 border-red-200',
      text: 'text-red-800',
      icon: '❌',
      title: 'خطأ'
    },
    warning: {
      bg: 'bg-yellow-50 border-yellow-200',
      text: 'text-yellow-800',
      icon: '⚠️',
      title: 'تحذير'
    },
    info: {
      bg: 'bg-blue-50 border-blue-200',
      text: 'text-blue-800',
      icon: 'ℹ️',
      title: 'معلومة'
    }
  };

  const config = alertConfig[variant];

  return (
    <div className={`
      rounded-lg border p-4 ${config.bg} ${config.text}
      ${className}
    `}>
      <div className="flex items-start gap-3">
        
        {/* Icon */}
        {showIcon && (
          <div className="flex-shrink-0 text-lg">
            {config.icon}
          </div>
        )}

        {/* Content */}
        <div className="flex-1">
          {title && (
            <h4 className="font-semibold mb-1">
              {title}
            </h4>
          )}
          <div className="text-sm leading-relaxed">
            {message}
          </div>
        </div>

        {/* Close Button */}
        {onClose && (
          <button
            onClick={onClose}
            className="flex-shrink-0 w-5 h-5 rounded hover:bg-black/10 flex items-center justify-center transition-colors"
          >
            <span className="text-sm">×</span>
          </button>
        )}

      </div>
    </div>
  );
}