'use client';

import { ReactNode } from 'react';

interface SettingItemProps {
  label: string;
  description?: string;
  children: ReactNode;
  action?: ReactNode;
}

export default function SettingItem({
  label,
  description,
  children,
  action
}: SettingItemProps) {
  return (
    <div className="flex items-center justify-between py-4 border-b border-gray-100 last:border-b-0">
      
      {/* Label and Description */}
      <div className="flex-1">
        <div className="font-medium text-gray-900">{label}</div>
        {description && (
          <div className="text-gray-600 text-sm mt-1">{description}</div>
        )}
      </div>

      {/* Control */}
      <div className="flex items-center gap-4">
        {children}
        {action}
      </div>

    </div>
  );
}