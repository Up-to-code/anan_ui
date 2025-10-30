 
import { ReactNode } from 'react';

// Basic Grid Item
export function GridItem({ 
  children, 
  span = 1,
  className = '' 
}: { 
  children: ReactNode;
  span?: 1 | 2 | 3;
  className?: string;
}) {
  const spanClasses = {
    1: '',
    2: 'md:col-span-2',
    3: 'md:col-span-3'
  };

  return (
    <div className={`
      ${spanClasses[span]} ${className}
    `}>
      {children}
    </div>
  );
}

// Card Grid Item
export function CardItem({ 
  children,
  hover = true,
  className = ''
}: {
  children: ReactNode;
  hover?: boolean;
  className?: string;
}) {
  return (
    <div className={`
      bg-white rounded-xl border border-gray-200 p-6
      ${hover ? 'hover:shadow-md hover:border-gray-300 transition-all duration-300' : ''}
      ${className}
    `}>
      {children}
    </div>
  );
}

// Feature Grid Item
export function FeatureItem({ 
  children,
  icon,
  title,
  description,
  variant = 'default'
}: {
  children?: ReactNode;
  icon?: string;
  title: string;
  description: string;
  variant?: 'default' | 'highlight';
}) {
  return (
    <div className={`
      bg-white rounded-2xl p-6 border-2
      ${variant === 'highlight' 
        ? 'border-blue-500 bg-blue-50' 
        : 'border-gray-200 hover:border-blue-300'
      }
      transition-all duration-300 hover:shadow-md
    `}>
      {icon && (
        <div className={`
          w-12 h-12 rounded-xl flex items-center justify-center text-xl mb-4
          ${variant === 'highlight' 
            ? 'bg-blue-500 text-white' 
            : 'bg-blue-100 text-blue-600'
          }
        `}>
          {icon}
        </div>
      )}
      
      <h3 className={`
        font-semibold text-lg mb-2
        ${variant === 'highlight' ? 'text-blue-900' : 'text-gray-900'}
      `}>
        {title}
      </h3>
      
      <p className={`
        text-sm leading-relaxed
        ${variant === 'highlight' ? 'text-blue-700' : 'text-gray-600'}
      `}>
        {description}
      </p>
      
      {children}
    </div>
  );
}