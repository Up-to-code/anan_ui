'use client';

import { LoadingProps } from '.';

export const Loading = {
  // Spinner
  Spinner: ({ size = 'md', className = '' }: LoadingProps) => {
    const sizeClasses = {
      sm: 'w-4 h-4',
      md: 'w-8 h-8',
      lg: 'w-12 h-12'
    };

    return (
      <div className={`border-2 border-blue-600 border-t-transparent rounded-full animate-spin ${sizeClasses[size]} ${className}`}></div>
    );
  },

  // Page Loader
  Page: ({ text = "جاري التحميل...", className = '' }: LoadingProps) => (
    <div className={`flex flex-col items-center justify-center min-h-[400px] space-y-4 ${className}`}>
      <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      {text && <p className="text-gray-600">{text}</p>}
    </div>
  ),

  // Content Loader
  Content: ({ className = '' }: { className?: string }) => (
    <div className={`animate-pulse ${className}`}>
      <div className="space-y-3">
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        <div className="h-4 bg-gray-200 rounded"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6"></div>
      </div>
    </div>
  )
};