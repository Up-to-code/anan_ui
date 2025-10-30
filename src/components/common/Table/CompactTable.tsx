'use client';

import React from 'react';

// Use generic types to avoid `any` and allow type safety and flexibility
interface Column<T = Record<string, unknown>> {
  key: string;
  label: string;
  render?: (value: unknown, row: T) => React.ReactNode;
}

interface CompactTableProps<T = Record<string, unknown>> {
  columns: Column<T>[];
  data: T[];
  striped?: boolean;
  size?: 'sm' | 'md';
}

export default function CompactTable<T = Record<string, unknown>>({
  columns,
  data,
  striped = true,
  size = 'md'
}: CompactTableProps<T>) {
  const sizeStyles: Record<'sm' | 'md', string> = {
    sm: 'px-3 py-2 text-xs',
    md: 'px-4 py-3 text-sm'
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={`${sizeStyles[size]} text-right font-medium text-gray-700`}
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {data.map((row, index) => (
              <tr
                key={index}
                className={`
                  transition-colors hover:bg-gray-50
                  ${striped && index % 2 === 0 ? 'bg-gray-50' : ''}
                `}
              >
                {columns.map((column) => (
                  <td
                    key={column.key}
                    className={`${sizeStyles[size]} text-gray-900`}
                  >
                    {column.render
                      ? column.render(
                          (row as Record<string, unknown>)[column.key],
                          row
                        )
                      : ((row as Record<string, unknown>)[column.key] !== undefined && (row as Record<string, unknown>)[column.key] !== null
                          ? (row as Record<string, unknown>)[column.key] as React.ReactNode
                          : null)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {data.length === 0 && (
        <div className="text-center py-8">
          <div className="text-gray-400 text-sm">لا توجد بيانات</div>
        </div>
      )}
    </div>
  );
}