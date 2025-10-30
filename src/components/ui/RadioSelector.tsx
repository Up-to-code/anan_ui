'use client';

type RadioOption = {
  value: string;
  label: string;
};

interface RadioSelectorProps {
  options?: RadioOption[];
  value?: string;
  onChange: (value: string) => void;
}

export default function RadioSelector({ 
  options = [],
  value,
  onChange 
}: RadioSelectorProps) {
  return (
    <div className="space-y-2">
      {options.map(option => (
        <label
          key={option.value}
          className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer"
        >
          <input
            type="radio"
            className="hidden"
            checked={value === option.value}
            onChange={() => onChange(option.value)}
            value={option.value}
            name="radio-selector"
          />
          <div
            className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
              value === option.value
                ? 'border-blue-500 bg-blue-500'
                : 'border-gray-300'
            }`}
          >
            {value === option.value && (
              <div className="w-2 h-2 bg-white rounded-full" />
            )}
          </div>
          <span className="text-gray-700">{option.label}</span>
        </label>
      ))}
    </div>
  );
}