'use client';

interface BannerAlertProps {
  message: string;
  variant?: 'success' | 'error' | 'warning' | 'info';
  onClose?: () => void;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export default function BannerAlert({
  message,
  variant = 'info',
  onClose,
  action
}: BannerAlertProps) {
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

  const config = alertConfig[variant];

  return (
    <div className={`
      ${config.bg} text-white px-4 py-3
    `}>
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          
          <div className="flex items-center gap-3">
            <span className="text-lg">{config.icon}</span>
            <span className="font-medium">{message}</span>
          </div>

          <div className="flex items-center gap-3">
            {action && (
              <button
                onClick={action.onClick}
                className="px-3 py-1 bg-white/20 rounded hover:bg-white/30 transition-colors text-sm font-medium"
              >
                {action.label}
              </button>
            )}
            
            {onClose && (
              <button
                onClick={onClose}
                className="w-6 h-6 rounded hover:bg-white/20 flex items-center justify-center transition-colors"
              >
                <span className="text-sm">×</span>
              </button>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}