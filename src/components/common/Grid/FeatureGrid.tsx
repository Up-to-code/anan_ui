 
import { ReactNode } from 'react';

interface FeatureGridProps {
  children: ReactNode;
  layout?: 'equal' | 'featured' | 'staggered';
  columns?: 2 | 3;
}

export default function FeatureGrid({
  children,
  layout = 'equal',
  columns = 3
}: FeatureGridProps) {
  const layoutClasses = {
    equal: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    featured: `
      grid-cols-1 lg:grid-cols-3
      [&>*:first-child]:lg:col-span-2 [&>*:first-child]:lg:row-span-2
    `,
    staggered: `
      grid-cols-1 md:grid-cols-2
      [&>*:nth-child(3n+1)]:md:col-span-2
    `
  };

  return (
    <div className={`
      grid gap-8 ${layoutClasses[layout]}
    `}>
      {children}
    </div>
  );
}