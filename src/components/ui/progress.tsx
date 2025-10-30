'use client';

import { BaseComponentProps } from '.';

interface ProgressProps extends BaseComponentProps {
  value: number;
  max?: number;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  labelPosition?: 'inside' | 'outside';
  color?: 'blue' | 'green' | 'red' | 'yellow' | 'gray';
}

export const Progress = {
  // Basic Progress Bar
  Bar: ({ 
    value, 
    max = 100, 
    size = 'md', 
    showLabel = false, 
    labelPosition = 'outside',
    color = 'blue',
    className = '' 
  }: ProgressProps) => {
    const percentage = Math.min((value / max) * 100, 100);
    
    const sizeClasses = {
      sm: 'h-2',
      md: 'h-3',
      lg: 'h-4'
    };

    const colorClasses = {
      blue: 'bg-blue-600',
      green: 'bg-green-600',
      red: 'bg-red-600',
      yellow: 'bg-yellow-600',
      gray: 'bg-gray-600'
    };

    return (
      <div className={`space-y-2 ${className}`}>
        {(showLabel && labelPosition === 'outside') && (
          <div className="flex justify-between text-sm text-gray-600">
            <span>التقدم</span>
            <span>{percentage.toFixed(0)}%</span>
          </div>
        )}
        
        <div className={`bg-gray-200 rounded-full overflow-hidden ${sizeClasses[size]}`}>
          <div
            className={`h-full rounded-full transition-all duration-300 ${colorClasses[color]} ${
              showLabel && labelPosition === 'inside' ? 'flex items-center justify-center' : ''
            }`}
            style={{ width: `${percentage}%` }}
          >
            {showLabel && labelPosition === 'inside' && (
              <span className="text-xs text-white font-medium">
                {percentage.toFixed(0)}%
              </span>
            )}
          </div>
        </div>
      </div>
    );
  },

  // Circular Progress
  Circular: ({ value, max = 100, size = 'md', showLabel = true, className = '' }: ProgressProps) => {
    const percentage = Math.min((value / max) * 100, 100);
    const radius = 45;
    const circumference = 2 * Math.PI * radius;
    const strokeDasharray = circumference;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    const sizeClasses = {
      sm: 'w-16 h-16',
      md: 'w-24 h-24',
      lg: 'w-32 h-32'
    };

    return (
      <div className={`relative inline-flex items-center justify-center ${sizeClasses[size]} ${className}`}>
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
          {/* Background circle */}
          <circle
            cx="50"
            cy="50"
            r={radius}
            stroke="#e5e7eb"
            strokeWidth="8"
            fill="transparent"
          />
          {/* Progress circle */}
          <circle
            cx="50"
            cy="50"
            r={radius}
            stroke="#3b82f6"
            strokeWidth="8"
            fill="transparent"
            strokeLinecap="round"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            className="transition-all duration-300"
          />
        </svg>
        
        {showLabel && (
          <div className="absolute flex flex-col items-center justify-center">
            <span className="text-lg font-bold text-gray-900">{percentage.toFixed(0)}%</span>
            <span className="text-xs text-gray-500">مكتمل</span>
          </div>
        )}
      </div>
    );
  }
};