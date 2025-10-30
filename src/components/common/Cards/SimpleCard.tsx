'use client';

import { ReactNode } from 'react';

interface SimpleCardProps {
  children: ReactNode;
  className?: string;
  padding?: 'sm' | 'md' | 'lg';
  hover?: boolean;
  onClick?: () => void;
}

export default function SimpleCard({
  children,
  className = '',
  padding = 'md',
  hover = false,
  onClick
}: SimpleCardProps) {
  const paddingStyles = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8'
  };

  return (
    <div 
      onClick={onClick}
      className={`
        bg-white rounded-lg border border-gray-200
        ${paddingStyles[padding]}
        ${hover ? 'hover:shadow-md hover:border-gray-300 transition-all duration-300 cursor-pointer' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
}