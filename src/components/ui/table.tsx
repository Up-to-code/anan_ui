'use client';

import { FiEdit, FiTrash2, FiMoreVertical } from 'react-icons/fi';
import { useState } from 'react';
import { BaseComponentProps } from '.';

interface TableBaseProps extends BaseComponentProps {
  headers: string[];
  data: React.ReactNode[][];
}

interface TableWithActionsProps extends TableBaseProps {
  onEdit: (index: number) => void;
  onDelete: (index: number) => void;
}

interface TableLoadingProps {
  headers: string[];
  rows?: number;
  className?: string;
}

export const Table = {
  // Basic Table
  Basic: ({ headers, data, className = '', ...props }: TableBaseProps) => (
    <div className={`bg-white rounded-xl border border-gray-200 overflow-hidden ${className}`}>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              {headers.map((header, index) => (
                <th
                  key={index}
                  className="px-6 py-4 text-right text-sm font-medium text-gray-700"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className="border-b border-gray-200 hover:bg-gray-50 transition-colors duration-150"
              >
                {row.map((cell, cellIndex) => (
                  <td
                    key={cellIndex}
                    className="px-6 py-4 text-sm text-gray-600"
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  ),

  // Table with Actions
  WithActions: ({ headers, data, onEdit, onDelete, className = '', ...props }: TableWithActionsProps) => {
    const [actionMenu, setActionMenu] = useState<number | null>(null);

    return (
      <div className={`bg-white rounded-xl border border-gray-200 overflow-hidden ${className}`}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                {headers.map((header, index) => (
                  <th
                    key={index}
                    className="px-6 py-4 text-right text-sm font-medium text-gray-700"
                  >
                    {header}
                  </th>
                ))}
                <th className="px-6 py-4 text-right text-sm font-medium text-gray-700">الإجراءات</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  className="border-b border-gray-200 hover:bg-gray-50 transition-colors duration-150"
                >
                  {row.map((cell, cellIndex) => (
                    <td
                      key={cellIndex}
                      className="px-6 py-4 text-sm text-gray-600"
                    >
                      {cell}
                    </td>
                  ))}
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end space-x-2 space-x-reverse">
                      <button
                        onClick={() => onEdit(rowIndex)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="تعديل"
                      >
                        <FiEdit size={16} />
                      </button>
                      <button
                        onClick={() => onDelete(rowIndex)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="حذف"
                      >
                        <FiTrash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  },

  // Empty State Table
  Empty: ({ message = "لا توجد بيانات", className = '' }: { message?: string; className?: string }) => (
    <div className={`bg-white rounded-xl border border-gray-200 p-12 text-center ${className}`}>
      <div className="text-gray-400 mb-4">
        <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2M4 13h2m8-8V4a1 1 0 00-1-1h-2a1 1 0 00-1 1v1M9 7h6" />
        </svg>
      </div>
      <p className="text-gray-500 text-lg">{message}</p>
    </div>
  ),

  // Loading Table
  Loading: ({ headers, rows = 5, className = '' }: TableLoadingProps) => (
    <div className={`bg-white rounded-xl border border-gray-200 overflow-hidden ${className}`}>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              {headers.map((header, index) => (
                <th
                  key={index}
                  className="px-6 py-4 text-right text-sm font-medium text-gray-700"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: rows }).map((_, rowIndex) => (
              <tr key={rowIndex} className="border-b border-gray-200">
                {headers.map((_, cellIndex) => (
                  <td key={cellIndex} className="px-6 py-4">
                    <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
};