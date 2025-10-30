'use client';

import { BaseComponentProps } from '.';

type BadgeProps = React.PropsWithChildren<{
  className?: string;
}> & BaseComponentProps;

export const Badge = {
  // Primary Badge
  Primary: ({ children, className = '', ...props }: BadgeProps) => (
    <span className={`bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium ${className}`} {...props}>
      {children}
    </span>
  ),

  // Success Badge
  Success: ({ children, className = '', ...props }: BadgeProps) => (
    <span className={`bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-medium ${className}`} {...props}>
      {children}
    </span>
  ),

  // Warning Badge
  Warning: ({ children, className = '', ...props }: BadgeProps) => (
    <span className={`bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-xs font-medium ${className}`} {...props}>
      {children}
    </span>
  ),

  // Danger Badge
  Danger: ({ children, className = '', ...props }: BadgeProps) => (
    <span className={`bg-red-100 text-red-800 px-3 py-1 rounded-full text-xs font-medium ${className}`} {...props}>
      {children}
    </span>
  ),

  // Gray Badge
  Gray: ({ children, className = '', ...props }: BadgeProps) => (
    <span className={`bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-xs font-medium ${className}`} {...props}>
      {children}
    </span>
  ),

  // Outline Badge
  Outline: ({ children, className = '', ...props }: BadgeProps) => (
    <span className={`border border-gray-300 text-gray-700 px-3 py-1 rounded-full text-xs font-medium ${className}`} {...props}>
      {children}
    </span>
  ),
};