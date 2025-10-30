'use client';

type PillOption = {
  value: string;
  label: string;
};

interface PillSelectorProps {
  options?: PillOption[];
  value?: string;
  onChange: (value: string) => void;
}

export default function PillSelector({ 
  options = [],
  value,
  onChange 
}: PillSelectorProps) {
  return (
    <div className="flex gap-1 bg-gray-100 rounded-lg p-1">
      {options.map(option => (
        <button
          key={option.value}
          onClick={() => onChange(option.value)}
          className={`px-4 py-2 rounded-md transition-all ${
            value === option.value
              ? 'bg-white shadow-sm text-blue-600'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}