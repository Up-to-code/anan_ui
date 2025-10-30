'use client';

import { ReactNode } from 'react';

interface ActionAlertProps {
  title?: string;
  message: string | ReactNode;
  variant?: 'success' | 'error' | 'warning' | 'info';
  actions?: {
    primary?: {
      label: string;
      onClick: () => void;
    };
    secondary?: {
      label: string;
      onClick: () => void;
    };
  };
  onClose?: () => void;
}

export default function ActionAlert({
  title,
  message,
  variant = 'info',
  actions,
  onClose
}: ActionAlertProps) {
  const alertConfig = {
    success: {
      bg: 'bg-green-50 border-green-200',
      text: 'text-green-800',
      icon: '✅',
      button: 'bg-green-600 hover:bg-green-700'
    },
    error: {
      bg: 'bg-red-50 border-red-200',
      text: 'text-red-800',
      icon: '❌',
      button: 'bg-red-600 hover:bg-red-700'
    },
    warning: {
      bg: 'bg-yellow-50 border-yellow-200',
      text: 'text-yellow-800',
      icon: '⚠️',
      button: 'bg-yellow-600 hover:bg-yellow-700'
    },
    info: {
      bg: 'bg-blue-50 border-blue-200',
      text: 'text-blue-800',
      icon: 'ℹ️',
      button: 'bg-blue-600 hover:bg-blue-700'
    }
  };

  const config = alertConfig[variant];

  return (
    <div className={`
      rounded-lg border p-4 ${config.bg} ${config.text}
    `}>
      <div className="flex items-start gap-3">
        
        {/* Icon */}
        <div className="flex-shrink-0 text-lg mt-0.5">
          {config.icon}
        </div>

        {/* Content */}
        <div className="flex-1">
          {title && (
            <h4 className="font-semibold mb-1">
              {title}
            </h4>
          )}
          <div className="text-sm mb-4">
            {message}
          </div>

          {/* Actions */}
          {(actions?.primary || actions?.secondary) && (
            <div className="flex gap-2">
              {actions.primary && (
                <button
                  onClick={actions.primary.onClick}
                  className={`px-3 py-1.5 text-white rounded text-sm font-medium transition-colors ${config.button}`}
                >
                  {actions.primary.label}
                </button>
              )}
              {actions.secondary && (
                <button
                  onClick={actions.secondary.onClick}
                  className="px-3 py-1.5 bg-gray-200 text-gray-700 rounded text-sm font-medium hover:bg-gray-300 transition-colors"
                >
                  {actions.secondary.label}
                </button>
              )}
            </div>
          )}
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