'use client';

import { FiChevronRight, FiChevronLeft, FiMoreHorizontal } from 'react-icons/fi';
import { BaseComponentProps } from '.';

interface PaginationProps extends BaseComponentProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  showNumbers?: boolean;
  showInfo?: boolean;
  totalItems?: number;
  itemsPerPage?: number;
}

export const Pagination = {
  // Basic Pagination
  Basic: ({ 
    currentPage, 
    totalPages, 
    onPageChange,
    showNumbers = true,
    showInfo = false,
    totalItems,
    itemsPerPage = 10,
    className = '' 
  }: PaginationProps) => {
    const getPageNumbers = () => {
      const delta = 2;
      const range = [];
      const rangeWithDots = [];

      for (
        let i = Math.max(2, currentPage - delta);
        i <= Math.min(totalPages - 1, currentPage + delta);
        i++
      ) {
        range.push(i);
      }

      if (currentPage - delta > 2) {
        rangeWithDots.push(1, '...');
      } else {
        rangeWithDots.push(1);
      }

      rangeWithDots.push(...range);

      if (currentPage + delta < totalPages - 1) {
        rangeWithDots.push('...', totalPages);
      } else {
        rangeWithDots.push(totalPages);
      }

      return rangeWithDots;
    };

    const startItem = (currentPage - 1) * itemsPerPage + 1;
    const endItem = Math.min(currentPage * itemsPerPage, totalItems || 0);

    return (
      <div className={`flex flex-col sm:flex-row items-center justify-between gap-4 ${className}`}>
        {showInfo && totalItems && (
          <div className="text-sm text-gray-600">
            عرض {startItem}-{endItem} من {totalItems} عنصر
          </div>
        )}
        
        <div className="flex items-center space-x-1 space-x-reverse">
          {/* Previous Button */}
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="p-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <FiChevronRight size={16} />
          </button>

          {/* Page Numbers */}
          {showNumbers && getPageNumbers().map((page, index) => (
            <button
              key={index}
              onClick={() => typeof page === 'number' && onPageChange(page)}
              disabled={page === '...'}
              className={`
                min-w-[40px] px-3 py-2 rounded-lg border text-sm font-medium transition-colors
                ${
                  page === currentPage
                    ? 'bg-blue-600 border-blue-600 text-white'
                    : page === '...'
                    ? 'border-transparent text-gray-500 cursor-default'
                    : 'border-gray-300 text-gray-600 hover:bg-gray-50'
                }
              `}
            >
              {page === '...' ? <FiMoreHorizontal size={16} /> : page}
            </button>
          ))}

          {/* Next Button */}
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="p-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <FiChevronLeft size={16} />
          </button>
        </div>
      </div>
    );
  }
};