'use client';

import Link from 'next/link';
import { FiChevronLeft, FiHome } from 'react-icons/fi';
import { BaseComponentProps } from '.';

interface BreadcrumbItem {
  label: string;
  href?: string;
  icon?: React.ComponentType<{ size?: number; className?: string }>;
}

interface BreadcrumbProps extends BaseComponentProps {
  items: BreadcrumbItem[];
  separator?: 'slash' | 'chevron' | 'arrow';
}

export const Breadcrumb = {
  // Basic Breadcrumb
  Basic: ({ items, separator = 'slash', className = '' }: BreadcrumbProps) => {
    const separators = {
      slash: '/',
      chevron: <FiChevronLeft size={14} className="text-gray-400" />,
      arrow: '→'
    };

    const Separator = separators[separator];

    return (
      <nav className={`flex items-center space-x-2 space-x-reverse text-sm ${className}`}>
        {/* Home Icon */}
        <Link
          href="/"
          className="flex items-center text-gray-500 hover:text-gray-700 transition-colors"
        >
          <FiHome size={16} />
        </Link>

        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          const Icon = item.icon;

          return (
            <div key={index} className="flex items-center space-x-2 space-x-reverse">
              <span className="text-gray-400">{Separator}</span>
              
              {isLast ? (
                <span className="flex items-center space-x-1 space-x-reverse text-gray-900 font-medium">
                  {Icon && <Icon size={16} className="flex-shrink-0" />}
                  <span>{item.label}</span>
                </span>
              ) : (
                item.href ? (
                  <Link
                    href={item.href}
                    className="flex items-center space-x-1 space-x-reverse text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    {Icon && <Icon size={16} className="flex-shrink-0" />}
                    <span>{item.label}</span>
                  </Link>
                ) : (
                  <span className="flex items-center space-x-1 space-x-reverse text-gray-500">
                    {Icon && <Icon size={16} className="flex-shrink-0" />}
                    <span>{item.label}</span>
                  </span>
                )
              )}
            </div>
          );
        })}
      </nav>
    );
  }
};