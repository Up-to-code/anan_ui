'use client';

import { useToast, Toast } from './ToastContext';

export default function ToastContainer() {
  const { toasts, hideToast } = useToast();

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="bg-white border border-gray-200 rounded-lg shadow-lg p-3 min-w-64 animate-in slide-in-from-right"
        >
          <div className="flex items-start gap-3">
            <span className="text-lg">{getIcon(toast.type)}</span>
            <div className="flex-1">
              <p className="text-sm text-gray-800">{toast.message}</p>
            </div>
            <button 
              onClick={() => hideToast(toast.id)}
              className="text-gray-400 hover:text-gray-600 text-lg"
              aria-label="إغلاق التنبيه"
            >
              ×
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

// Use Toast["type"] for stricter typing and fix TS error
function getIcon(type: Toast["type"]) {
  const icons: Record<Toast["type"], string> = {
    success: '✅',
    error: '❌',
    warning: '⚠️',
    info: '💡'
  };
  return icons[type] ?? '💡';
}