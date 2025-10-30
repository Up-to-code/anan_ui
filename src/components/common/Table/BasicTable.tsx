'use client';

interface Column {
  key: string;
  label: string;
  width?: string;
  align?: 'right' | 'left' | 'center';
}

// Use a generic type for rows, defaulting to Record<string, unknown>
interface BasicTableProps<T = Record<string, unknown>> {
  columns: Column[];
  data: T[];
  className?: string;
  onRowClick?: (row: T) => void;
}

export default function BasicTable<T = Record<string, unknown>>({
  columns,
  data,
  className = '',
  onRowClick
}: BasicTableProps<T>) {
  return (
    <div className={`bg-white rounded-lg border border-gray-200 overflow-hidden ${className}`}>
      <div className="overflow-x-auto">
        <table className="w-full">
          {/* Header */}
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={`
                    px-6 py-3 text-right text-sm font-medium text-gray-700
                    ${column.align === 'center' ? 'text-center' : ''}
                    ${column.align === 'left' ? 'text-left' : ''}
                  `}
                  style={{ width: column.width }}
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>

          {/* Body */}
          <tbody className="divide-y divide-gray-200">
            {data.map((row, index) => (
              <tr
                key={index}
                onClick={() => onRowClick?.(row)}
                className={`
                  transition-colors
                  ${onRowClick ? 'cursor-pointer hover:bg-gray-50' : ''}
                `}
              >
                {columns.map((column) => (
                  <td
                    key={column.key}
                    className={`
                      px-6 py-4 text-sm text-gray-900
                      ${column.align === 'center' ? 'text-center' : ''}
                      ${column.align === 'left' ? 'text-left' : ''}
                    `}
                  >
                    {
                      // Use bracket notation access and check if value is undefined
                      (row as Record<string, unknown>)[column.key] !== undefined
                        ? (row as Record<string, unknown>)[column.key] as React.ReactNode
                        : null
                    }
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Empty State */}
      {data.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 text-lg">لا توجد بيانات</div>
          <div className="text-gray-500 text-sm mt-2">لم يتم العثور على سجلات</div>
        </div>
      )}
    </div>
  );
}