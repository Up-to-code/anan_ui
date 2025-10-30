'use client';

import { ReactNode } from 'react';

interface CardGridProps {
  children: ReactNode;
  columns?: 1 | 2 | 3 | 4;
  variant?: 'default' | 'feature' | 'compact';
}

export default function CardGrid({
  children,
  columns = 3,
  variant = 'default'
}: CardGridProps) {
  const gridColumns = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
  };

  const gaps = {
    default: 'gap-6',
    feature: 'gap-8',
    compact: 'gap-4'
  };

  return (
    <div className={`grid ${gridColumns[columns]} ${gaps[variant]}`}>
      {children}
    </div>
  );
}