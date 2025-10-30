'use client';

interface SettingsGroupProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
}

export default function SettingsGroup({
  title,
  description,
  children,
  actions
}: SettingsGroupProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-200">
      
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-gray-200">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          {description && (
            <p className="text-gray-600 text-sm mt-1">{description}</p>
          )}
        </div>
        {actions && (
          <div className="flex gap-2">
            {actions}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        {children}
      </div>

    </div>
  );
}