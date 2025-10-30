'use client';

import { useState } from 'react';

type Option = {
  value: string;
  label: string;
};

interface SelectorProps {
  options?: Option[];
  value?: string;
  onChange: (value: string) => void;
}

export default function Selector({
  options = [],
  value,
  onChange,
}: SelectorProps) {
  const [open, setOpen] = useState(false);
  const selected = options.find((o) => o.value === value);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full bg-gray-50 rounded-lg px-4 py-3 text-right flex justify-between items-center hover:bg-gray-100 transition-colors"
      >
        <span className="text-gray-700">{selected?.label || 'اختر'}</span>
        <span className="text-gray-400 transform transition-transform">{open ? '↑' : '↓'}</span>
      </button>

      {open && (
        <div className="absolute top-full left-0 right-0 bg-white rounded-lg shadow-lg mt-1 z-10">
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => {
                onChange(option.value);
                setOpen(false);
              }}
              className="w-full px-4 py-3 text-right hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg"
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}