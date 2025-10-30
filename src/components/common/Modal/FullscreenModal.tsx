'use client';

import { ReactNode } from 'react';

interface FullscreenModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

export default function FullscreenModal({
  isOpen,
  onClose,
  title,
  children
}: FullscreenModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-white">
      
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-gray-200">
        <h2 className="text-2xl font-semibold text-gray-900">{title}</h2>
        <button
          onClick={onClose}
          className="w-10 h-10 rounded-lg hover:bg-gray-100 flex items-center justify-center transition-colors"
        >
          <span className="text-2xl text-gray-500">×</span>
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto">
        {children}
      </div>

    </div>
  );
}