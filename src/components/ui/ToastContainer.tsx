// components/ui/ToastContainer.tsx
'use client';

import { useToast } from './ToastContext';

export default function ToastContainer() {
  const { toasts, removeToast } = useToast();

  const getToastStyles = (type: string) => {
    const baseStyles = "max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5";
    
    switch (type) {
      case 'success':
        return `${baseStyles} border-r-4 border-green-500`;
      case 'error':
        return `${baseStyles} border-r-4 border-red-500`;
      case 'warning':
        return `${baseStyles} border-r-4 border-yellow-500`;
      case 'info':
        return `${baseStyles} border-r-4 border-blue-500`;
      default:
        return baseStyles;
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'success':
        return '✅';
      case 'error':
        return '❌';
      case 'warning':
        return '⚠️';
      case 'info':
        return 'ℹ️';
      default:
        return '💡';
    }
  };

  return (
    <div className="fixed top-4 left-4 z-50 flex flex-col space-y-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={getToastStyles(toast.type)}
        >
          <div className="flex-1 w-0 p-4">
            <div className="flex items-start">
              <div className="flex-shrink-0 text-lg ml-3">
                {getIcon(toast.type)}
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">
                  {toast.title}
                </p>
                {toast.message && (
                  <p className="mt-1 text-sm text-gray-500">
                    {toast.message}
                  </p>
                )}
              </div>
            </div>
          </div>
          <div className="flex border-l border-gray-200">
            <button
              onClick={() => removeToast(toast.id)}
              className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-gray-600 hover:text-gray-800 focus:outline-none"
            >
              ✕
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}