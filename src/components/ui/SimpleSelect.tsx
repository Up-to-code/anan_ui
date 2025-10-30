'use client';

import { useState, useRef, useEffect } from 'react';

type Option = {
  value: string;
  label: string;
};

interface SimpleSelectProps {
  options?: Option[];
  value?: string;
  onChange: (value: string) => void;
}

export default function SimpleSelect({
  options = [],
  value,
  onChange,
}: SimpleSelectProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Close dropdown on outside click
    function handleClick(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener('mousedown', handleClick);
    }
    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, [open]);

  const selected = options.find((o) => o.value === value);

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        className={`
          bg-gradient-to-tr from-white to-blue-50 
          rounded-xl px-4 py-2 w-full text-right 
          border border-blue-300/30 
          outline-none focus:ring-2 focus:ring-blue-300 flex items-center justify-between gap-2
          transition
        `}
        style={{ borderWidth: '0.3px' }}
      >
        <span className={`truncate ${selected ? 'text-gray-800' : 'text-gray-400'}`}>
          {selected?.label || 'اختر'}
        </span>
        <svg
          className={`h-4 w-4 ml-1 text-blue-400 transition-transform duration-150 ${open ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown motion: scale+fade */}
      {open && (
        <div
          className={`
            absolute top-full left-0 right-0 bg-white rounded-xl 
            mt-2 z-20 overflow-hidden border border-blue-300/30
            transition transform origin-top scale-100 opacity-100 animate-simple-select-open
          `}
          style={{ borderWidth: '0.3px' }}
        >
          {options.map((option) => (
            <button
              key={option.value}
              onClick={() => {
                onChange(option.value);
                setOpen(false);
              }}
              className={`
                w-full text-right px-4 py-2 transition
                hover:bg-blue-50 focus:bg-blue-100 
                ${value === option.value ? 'bg-blue-50 text-blue-600 font-semibold' : 'text-gray-700'}
              `}
              type="button"
            >
              {option.label}
            </button>
          ))}
        </div>
      )}

      {/* Inline motion keyframes */}
      <style jsx>{`
        @keyframes simple-select-open {
          0% { opacity: 0; transform: scaleY(0.96);}
          100% { opacity: 1; transform: scaleY(1);}
        }
        .animate-simple-select-open {
          animation: simple-select-open 0.18s cubic-bezier(.61,.3,.38,.95);
        }
      `}</style>
    </div>
  );
}