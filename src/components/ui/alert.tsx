'use client';

import { FiAlertCircle, FiCheckCircle, FiInfo, FiXCircle, FiX } from 'react-icons/fi';
import { BaseComponentProps } from '.';

interface AlertProps extends BaseComponentProps {
  type?: 'success' | 'error' | 'warning' | 'info';
  title?: string;
  message: string;
  onClose?: () => void;
  closable?: boolean;
}

export const Alert = {
  // Basic Alert
  Basic: ({ type = 'info', title, message, onClose, closable = true, className = '' }: AlertProps) => {
    const icons = {
      success: FiCheckCircle,
      error: FiXCircle,
      warning: FiAlertCircle,
      info: FiInfo
    };

    const styles = {
      success: 'bg-green-50 border-green-200 text-green-800',
      error: 'bg-red-50 border-red-200 text-red-800',
      warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
      info: 'bg-blue-50 border-blue-200 text-blue-800'
    };

    const Icon = icons[type];

    return (
      <div className={`flex items-start p-4 border rounded-xl ${styles[type]} ${className}`}>
        <Icon size={20} className={`flex-shrink-0 mt-0.5 mr-3 ${styles[type].split(' ')[2]}`} />
        <div className="flex-1">
          {title && <h4 className="font-semibold text-sm mb-1">{title}</h4>}
          <p className="text-sm">{message}</p>
        </div>
        {closable && onClose && (
          <button
            onClick={onClose}
            className="flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors mr-2"
          >
            <FiX size={16} />
          </button>
        )}
      </div>
    );
  },

  // Inline Alert
  Inline: ({ type = 'info', message, className = '' }: Omit<AlertProps, 'title' | 'closable'>) => {
    const styles = {
      success: 'bg-green-100 text-green-700',
      error: 'bg-red-100 text-red-700',
      warning: 'bg-yellow-100 text-yellow-700',
      info: 'bg-blue-100 text-blue-700'
    };

    return (
      <div className={`px-3 py-2 rounded-lg text-sm ${styles[type]} ${className}`}>
        {message}
      </div>
    );
  },

  // Banner Alert
  Banner: ({ type = 'info', title, message, onClose, closable = true, className = '' }: AlertProps) => {
    const styles = {
      success: 'bg-green-600 text-white',
      error: 'bg-red-600 text-white',
      warning: 'bg-yellow-600 text-white',
      info: 'bg-blue-600 text-white'
    };

    return (
      <div className={`flex items-center justify-between p-4 ${styles[type]} ${className}`}>
        <div className="flex items-center space-x-3 space-x-reverse">
          <div className="flex-1">
            {title && <h4 className="font-semibold text-sm mb-1">{title}</h4>}
            <p className="text-sm opacity-90">{message}</p>
          </div>
        </div>
        {closable && onClose && (
          <button
            onClick={onClose}
            className="flex-shrink-0 opacity-80 hover:opacity-100 transition-opacity"
          >
            <FiX size={16} />
          </button>
        )}
      </div>
    );
  }
};