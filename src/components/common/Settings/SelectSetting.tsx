'use client';

interface SelectSettingProps {
  label: string;
  description?: string;
  value: string;
  options: { label: string; value: string }[];
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function SelectSetting({
  label,
  description,
  value,
  options,
  onChange,
  placeholder = 'اختر...'
}: SelectSettingProps) {
  return (
    <div className="flex items-center justify-between py-4 border-b border-gray-100">
      
      <div className="flex-1">
        <div className="font-medium text-gray-900">{label}</div>
        {description && (
          <div className="text-gray-600 text-sm mt-1">{description}</div>
        )}
      </div>

      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-48 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      >
        <option value="">{placeholder}</option>
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

    </div>
  );
}