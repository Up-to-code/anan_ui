'use client';

interface ToastAlertProps {
  message: string;
  variant?: 'success' | 'error' | 'warning' | 'info';
  onClose: () => void;
  duration?: number;
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
}

export default function ToastAlert({
  message,
  variant = 'info',
  onClose,
  duration = 5000,
  position = 'top-right'
}: ToastAlertProps) {
  const alertConfig = {
    success: {
      bg: 'bg-green-500',
      icon: '✅'
    },
    error: {
      bg: 'bg-red-500',
      icon: '❌'
    },
    warning: {
      bg: 'bg-yellow-500',
      icon: '⚠️'
    },
    info: {
      bg: 'bg-blue-500',
      icon: 'ℹ️'
    }
  };

  const positionClasses = {
    'top-right': 'top-4 left-4',
    'top-left': 'top-4 right-4',
    'bottom-right': 'bottom-4 left-4',
    'bottom-left': 'bottom-4 right-4'
  };

  // Auto close after duration
  setTimeout(onClose, duration);

  const config = alertConfig[variant];

  return (
    <div className={`
      fixed ${positionClasses[position]} z-50
      animate-slide-in
    `}>
      <div className={`
        ${config.bg} text-white rounded-lg shadow-lg p-4 min-w-80
        flex items-center gap-3
      `}>
        
        <span className="text-lg">{config.icon}</span>
        
        <span className="flex-1 text-sm">{message}</span>
        
        <button
          onClick={onClose}
          className="w-5 h-5 rounded hover:bg-white/20 flex items-center justify-center transition-colors"
        >
          <span className="text-sm">×</span>
        </button>

      </div>
    </div>
  );
}