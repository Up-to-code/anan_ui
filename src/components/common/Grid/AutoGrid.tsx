 

import { ReactNode } from 'react';

interface AutoGridProps {
  children: ReactNode;
  minWidth?: 'xs' | 'sm' | 'md' | 'lg';
  gap?: 'sm' | 'md' | 'lg';
}

export default function AutoGrid({
  children,
  minWidth = 'sm',
  gap = 'md'
}: AutoGridProps) {
  const minWidthClasses = {
    xs: 'grid-cols-[repeat(auto-fit,minmax(200px,1fr))]',
    sm: 'grid-cols-[repeat(auto-fit,minmax(250px,1fr))]',
    md: 'grid-cols-[repeat(auto-fit,minmax(300px,1fr))]',
    lg: 'grid-cols-[repeat(auto-fit,minmax(350px,1fr))]'
  };

  const gapClasses = {
    sm: 'gap-4',
    md: 'gap-6',
    lg: 'gap-8'
  };

  return (
    <div className={`
      grid ${minWidthClasses[minWidth]} ${gapClasses[gap]}
    `}>
      {children}
    </div>
  );
}