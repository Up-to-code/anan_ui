'use client';

import { FiPlus, FiEdit, FiTrash2, FiDownload, FiSearch, FiX } from 'react-icons/fi';
import { BaseComponentProps } from '.';

interface ButtonBaseProps extends BaseComponentProps {
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

interface ButtonIconProps extends ButtonBaseProps {
  icon: React.ComponentType<{ size?: number; className?: string }>;
}

export const Button = {
  // Primary Button
  Primary: ({ 
    children, 
    onClick, 
    disabled = false, 
    loading = false, 
    className = '', 
    type = 'button',
    ...props 
  }: ButtonBaseProps) => (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`
        bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed
        text-white px-6 py-3 rounded-xl transition-all duration-200 
        font-medium text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
        ${loading ? 'opacity-70 cursor-wait' : ''}
        ${className}
      `}
      {...props}
    >
      {loading ? (
        <div className="flex items-center justify-center space-x-2 space-x-reverse">
          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          <span>جاري التحميل...</span>
        </div>
      ) : (
        children
      )}
    </button>
  ),

  // Secondary Button
  Secondary: ({ 
    children, 
    onClick, 
    disabled = false, 
    className = '', 
    type = 'button',
    ...props 
  }: ButtonBaseProps) => (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        bg-gray-100 hover:bg-gray-200 disabled:bg-gray-100 disabled:cursor-not-allowed
        text-gray-700 px-6 py-3 rounded-xl transition-all duration-200
        font-medium text-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  ),

  // Danger Button
  Danger: ({ 
    children, 
    onClick, 
    disabled = false, 
    loading = false, 
    className = '', 
    type = 'button',
    ...props 
  }: ButtonBaseProps) => (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`
        bg-red-600 hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed
        text-white px-6 py-3 rounded-xl transition-all duration-200
        font-medium text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2
        ${loading ? 'opacity-70 cursor-wait' : ''}
        ${className}
      `}
      {...props}
    >
      {loading ? (
        <div className="flex items-center justify-center space-x-2 space-x-reverse">
          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          <span>جاري الحذف...</span>
        </div>
      ) : (
        children
      )}
    </button>
  ),

  // Outline Button
  Outline: ({ 
    children, 
    onClick, 
    disabled = false, 
    className = '', 
    type = 'button',
    ...props 
  }: ButtonBaseProps) => (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        border border-gray-300 hover:border-gray-400 disabled:border-gray-200
        text-gray-700 hover:text-gray-900 disabled:text-gray-400
        px-6 py-3 rounded-xl transition-all duration-200
        font-medium text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  ),

  // Icon Button
  Icon: ({ 
    children, 
    onClick, 
    icon: Icon, 
    disabled = false, 
    className = '', 
    type = 'button',
    ...props 
  }: ButtonIconProps) => (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        flex items-center justify-center space-x-2 space-x-reverse
        bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed
        text-white px-4 py-2 rounded-xl transition-all duration-200
        font-medium text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
        ${className}
      `}
      {...props}
    >
      {Icon && <Icon size={16} className="flex-shrink-0" />}
      <span>{children}</span>
    </button>
  ),

  // Ghost Button (minimal style)
  Ghost: ({ 
    children, 
    onClick, 
    disabled = false, 
    className = '', 
    type = 'button',
    ...props 
  }: ButtonBaseProps) => (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        text-gray-600 hover:text-gray-900 hover:bg-gray-100
        disabled:text-gray-400 disabled:cursor-not-allowed
        px-4 py-2 rounded-lg transition-all duration-200
        font-medium text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  ),

  // Action Buttons with common icons
  Add: ({ 
    children = "إضافة جديد", 
    onClick, 
    ...props 
  }: ButtonBaseProps) => (
    <Button.Icon icon={FiPlus} onClick={onClick} {...props}>
      {children}
    </Button.Icon>
  ),

  Edit: ({ 
    children = "تعديل", 
    onClick, 
    ...props 
  }: ButtonBaseProps) => (
    <Button.Ghost onClick={onClick} className="text-blue-600 hover:text-blue-700 hover:bg-blue-50" {...props}>
      <FiEdit size={16} className="ml-1" />
      {children}
    </Button.Ghost>
  ),

  Delete: ({ 
    children = "حذف", 
    onClick, 
    ...props 
  }: ButtonBaseProps) => (
    <Button.Ghost onClick={onClick} className="text-red-600 hover:text-red-700 hover:bg-red-50" {...props}>
      <FiTrash2 size={16} className="ml-1" />
      {children}
    </Button.Ghost>
  ),

  Download: ({ 
    children = "تحميل", 
    onClick, 
    ...props 
  }: ButtonBaseProps) => (
    <Button.Icon icon={FiDownload} onClick={onClick} {...props}>
      {children}
    </Button.Icon>
  ),

  Search: ({ 
    children = "بحث", 
    onClick, 
    ...props 
  }: ButtonBaseProps) => (
    <Button.Icon icon={FiSearch} onClick={onClick} {...props}>
      {children}
    </Button.Icon>
  ),

  Close: ({ 
    children = "إغلاق", 
    onClick, 
    ...props 
  }: ButtonBaseProps) => (
    <Button.Ghost onClick={onClick} className="text-gray-600 hover:text-gray-900" {...props}>
      <FiX size={16} className="ml-1" />
      {children}
    </Button.Ghost>
  )
};