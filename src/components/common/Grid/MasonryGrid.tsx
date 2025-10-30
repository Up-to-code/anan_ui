'use client';

import { ReactNode } from 'react';

interface MasonryGridProps {
  children: ReactNode;
  columns?: 2 | 3 | 4;
  gap?: 'sm' | 'md' | 'lg';
}

export default function MasonryGrid({
  children,
  columns = 3,
  gap = 'md'
}: MasonryGridProps) {
  const columnClasses = {
    2: 'md:columns-2',
    3: 'md:columns-3',
    4: 'md:columns-4'
  };

  const gapClasses = {
    sm: 'gap-4',
    md: 'gap-6',
    lg: 'gap-8'
  };

  return (
    <div className={`
      columns-1 ${columnClasses[columns]} ${gapClasses[gap]}
    `}>
      {children}
    </div>
  );
}

// Masonry Item Component
export function MasonryItem({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className={`break-inside-avoid mb-6 ${className}`}>
      {children}
    </div>
  );
}