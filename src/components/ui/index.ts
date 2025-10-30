'use client';

export { Button } from './button';
export { Input } from './input';
export { Card } from './card';
export { Table } from './table';
export { Badge } from './badge';
export { Modal } from './modal';
export { Loading } from './loading';
 export { Alert } from './alert';
export { Tabs } from './tabs';
export { Accordion } from './accordion';
export { Progress } from './progress';
export { Tooltip } from './tooltip';
export { Pagination } from './pagination';
export { Breadcrumb } from './breadcrumb';

// Common types
export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
}

export interface LoadingProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
  className?: string;
}