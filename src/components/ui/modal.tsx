'use client';

import { FiX } from 'react-icons/fi';
import { BaseComponentProps } from '.';

interface ModalBaseProps extends BaseComponentProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

interface ModalConfirmProps extends Omit<ModalBaseProps, 'children'> {
  onConfirm: () => void;
  message: string;
  confirmText?: string;
  cancelText?: string;
  loading?: boolean;
}

export const Modal = {
  // Basic Modal
  Basic: ({ isOpen, onClose, title, children, size = 'md', className = '' }: ModalBaseProps) => {
    if (!isOpen) return null;

    const sizeClasses = {
      sm: 'max-w-md',
      md: 'max-w-2xl',
      lg: 'max-w-4xl',
      xl: 'max-w-6xl'
    };

    return (
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen p-4">
          {/* Background overlay with opacity 30% */}
          <div 
            className="fixed inset-0 bg-black transition-opacity"
            style={{ opacity: '30%' }}
            onClick={onClose}
          ></div>

          {/* Centered Modal panel */}
          <div className={`relative w-full ${sizeClasses[size]} bg-white rounded-2xl text-right overflow-hidden shadow-xl transform transition-all ${className}`}>
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
              <button
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <FiX size={20} />
              </button>
            </div>

            {/* Content */}
            <div className="px-6 py-4">
              {children}
            </div>
          </div>
        </div>
      </div>
    );
  },

  // Confirm Modal
  Confirm: ({ 
    isOpen, 
    onClose, 
    onConfirm, 
    title, 
    message, 
    confirmText = "تأكيد", 
    cancelText = "إلغاء", 
    loading = false 
  }: ModalConfirmProps) => {
    return (
      <Modal.Basic isOpen={isOpen} onClose={onClose} title={title} size="sm">
        <div className="space-y-4">
          <p className="text-gray-600">{message}</p>
          <div className="flex items-center justify-end space-x-3 space-x-reverse pt-4">
            <button
              onClick={onClose}
              disabled={loading}
              className="px-6 py-2 text-gray-700 border border-gray-300 rounded-xl hover:bg-gray-50 disabled:opacity-50 transition-colors"
            >
              {cancelText}
            </button>
            <button
              onClick={onConfirm}
              disabled={loading}
              className="px-6 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 disabled:opacity-50 transition-colors"
            >
              {loading ? 'جاري التنفيذ...' : confirmText}
            </button>
          </div>
        </div>
      </Modal.Basic>
    );
  },

  // Fullscreen Modal
  Fullscreen: ({ isOpen, onClose, title, children, className = '' }: Omit<ModalBaseProps, 'size'>) => {
    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen p-4">
          {/* Background overlay with opacity 30% */}
          <div 
            className="fixed inset-0 bg-black transition-opacity"
            style={{ opacity: '30%' }}
            onClick={onClose}
          ></div>

          {/* Fullscreen Modal panel */}
          <div className={`relative w-full h-full max-h-[90vh] bg-white rounded-2xl text-right overflow-hidden shadow-xl transform transition-all flex flex-col ${className}`}>
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 flex-shrink-0">
              <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
              <button
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <FiX size={20} />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {children}
            </div>
          </div>
        </div>
      </div>
    );
  },

  // Custom Modal with no header
  Custom: ({ isOpen, onClose, children, size = 'md', className = '' }: Omit<ModalBaseProps, 'title'>) => {
    if (!isOpen) return null;

    const sizeClasses = {
      sm: 'max-w-md',
      md: 'max-w-2xl',
      lg: 'max-w-4xl',
      xl: 'max-w-6xl'
    };

    return (
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen p-4">
          {/* Background overlay with opacity 30% */}
          <div 
            className="fixed inset-0 bg-black transition-opacity"
            style={{ opacity: '30%' }}
            onClick={onClose}
          ></div>

          {/* Centered Modal panel */}
          <div className={`relative w-full ${sizeClasses[size]} bg-white rounded-2xl text-right overflow-hidden shadow-xl transform transition-all ${className}`}>
            {/* Close button only */}
            <button
              onClick={onClose}
              className="absolute left-4 top-4 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors z-10"
            >
              <FiX size={20} />
            </button>

            {/* Content */}
            <div className="p-6">
              {children}
            </div>
          </div>
        </div>
      </div>
    );
  },

  // Blur Background Modal
  Blur: ({ isOpen, onClose, title, children, size = 'md', className = '' }: ModalBaseProps) => {
    if (!isOpen) return null;

    const sizeClasses = {
      sm: 'max-w-md',
      md: 'max-w-2xl',
      lg: 'max-w-4xl',
      xl: 'max-w-6xl'
    };

    return (
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen p-4">
          {/* Background overlay with opacity 30% and blur effect */}
          <div 
            className="fixed inset-0 bg-black backdrop-blur-sm transition-opacity"
            style={{ opacity: '30%' }}
            onClick={onClose}
          ></div>

          {/* Centered Modal panel */}
          <div className={`relative w-full ${sizeClasses[size]} bg-white rounded-2xl text-right overflow-hidden shadow-xl transform transition-all ${className}`}>
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
              <button
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <FiX size={20} />
              </button>
            </div>

            {/* Content */}
            <div className="px-6 py-4">
              {children}
            </div>
          </div>
        </div>
      </div>
    );
  },

  // Minimal Modal
  Minimal: ({ isOpen, onClose, title, children, size = 'md', className = '' }: ModalBaseProps) => {
    if (!isOpen) return null;

    const sizeClasses = {
      sm: 'max-w-md',
      md: 'max-w-2xl',
      lg: 'max-w-4xl',
      xl: 'max-w-6xl'
    };

    return (
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen p-4">
          {/* Background overlay with opacity 30% */}
          <div 
            className="fixed inset-0 bg-black transition-opacity"
            style={{ opacity: '30%' }}
            onClick={onClose}
          ></div>

          {/* Centered Modal panel with minimal styling */}
          <div className={`relative w-full ${sizeClasses[size]} bg-white rounded-lg text-right overflow-hidden shadow-lg transform transition-all ${className}`}>
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-3 border-b border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
              <button
                onClick={onClose}
                className="p-1 text-gray-400 hover:text-gray-600 rounded transition-colors"
              >
                <FiX size={18} />
              </button>
            </div>

            {/* Content */}
            <div className="px-6 py-4">
              {children}
            </div>
          </div>
        </div>
      </div>
    );
  },

  // Transparent Modal with no background
  Transparent: ({ isOpen, onClose, title, children, size = 'md', className = '' }: ModalBaseProps) => {
    if (!isOpen) return null;

    const sizeClasses = {
      sm: 'max-w-md',
      md: 'max-w-2xl',
      lg: 'max-w-4xl',
      xl: 'max-w-6xl'
    };

    return (
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen p-4">
          {/* Background overlay with opacity 30% */}
          <div 
            className="fixed inset-0 bg-black transition-opacity"
            style={{ opacity: '30%' }}
            onClick={onClose}
          ></div>

          {/* Centered Modal panel with transparent background */}
          <div className={`relative w-full ${sizeClasses[size]} bg-transparent text-right transform transition-all ${className}`}>
            {/* Header with glass effect */}
            <div className="flex items-center justify-between px-6 py-4 mb-4 bg-white/80 backdrop-blur-md rounded-t-2xl border-b border-gray-200/50">
              <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
              <button
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100/50 rounded-lg transition-colors"
              >
                <FiX size={20} />
              </button>
            </div>

            {/* Content with glass effect */}
            <div className="bg-white/80 backdrop-blur-md rounded-b-2xl px-6 py-4">
              {children}
            </div>
          </div>
        </div>
      </div>
    );
  }
};