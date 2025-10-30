/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  FiHome,
  FiUsers,
  FiBarChart2,
  FiSettings,
  FiFileText,
  FiChevronRight,
  FiChevronLeft,
  FiUser,
  FiLogOut,
  FiMessageSquare,
  FiEdit,
  FiTrash2,
  FiDownload,
  FiSearch,
  FiFilter,
  FiCalendar,
  FiPlus,
  FiCpu,
  FiEye,
  FiCopy,
} from 'react-icons/fi';

// Button Components
export const Button = {
  Primary: ({ children, onClick, className = '', ...props }: any) => (
    <button
      type="button"
      onClick={onClick}
      className={`bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl transition-colors duration-200 font-medium text-sm ${className}`}
      {...props}
    >
      {children}
    </button>
  ),
  Secondary: ({ children, onClick, className = '', ...props }: any) => (
    <button
      type="button"
      onClick={onClick}
      className={`bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-xl transition-colors duration-200 font-medium text-sm ${className}`}
      {...props}
    >
      {children}
    </button>
  ),
  Danger: ({ children, onClick, className = '', ...props }: any) => (
    <button
      type="button"
      onClick={onClick}
      className={`bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl transition-colors duration-200 font-medium text-sm ${className}`}
      {...props}
    >
      {children}
    </button>
  ),
  Outline: ({ children, onClick, className = '', ...props }: any) => (
    <button
      type="button"
      onClick={onClick}
      className={`border border-gray-300 hover:border-gray-400 text-gray-700 px-6 py-3 rounded-xl transition-colors duration-200 font-medium text-sm ${className}`}
      {...props}
    >
      {children}
    </button>
  ),
  Icon: ({ children, onClick, icon: Icon, className = '', ...props }: any) => (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center space-x-2 space-x-reverse bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl transition-colors duration-200 font-medium text-sm ${className}`}
      {...props}
    >
      {Icon && <Icon size={16} />}
      <span>{children}</span>
    </button>
  ),
};

// Input Components
export const Input = {
  Text: ({ label, placeholder, value, onChange, className = '', ...props }: any) => (
    <div className={`flex flex-col space-y-2 ${className}`}>
      {label && <label className="text-sm font-medium text-gray-700">{label}</label>}
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
        {...props}
      />
    </div>
  ),

  Search: ({ placeholder, value, onChange, className = '', ...props }: any) => (
    <div className={`relative ${className}`}>
      <FiSearch className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full px-12 py-3 bg-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all duration-200 text-sm"
        {...props}
      />
    </div>
  ),

  Select: ({ label, value, onChange, options, className = '', ...props }: any) => (
    <div className={`flex flex-col space-y-2 ${className}`}>
      {label && <label className="text-sm font-medium text-gray-700">{label}</label>}
      <select
        value={value}
        onChange={onChange}
        className="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white"
        {...props}
      >
        {options && Array.isArray(options) && options.map((option: any) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  ),
};

// Card Components
export const Card = {
  Basic: ({ children, className = '', ...props }: any) => (
    <div className={`bg-white rounded-xl border border-gray-200 p-6 ${className}`} {...props}>
      {children}
    </div>
  ),
  WithHeader: ({ title, action, children, className = '', ...props }: any) => (
    <div className={`bg-white rounded-xl border border-gray-200 ${className}`} {...props}>
      <div className="flex items-center justify-between p-6 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        {action ? <div>{action}</div> : null}
      </div>
      <div className="p-6">{children}</div>
    </div>
  ),
  Stat: ({ title, value, change, icon: Icon, className = '', ...props }: any) => (
    <div className={`bg-white rounded-xl border border-gray-200 p-6 ${className}`} {...props}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-2">{value}</p>
          {change && (
            <p className={`text-sm mt-1 ${change.type === 'positive' ? 'text-green-600' : 'text-red-600'}`}>
              {change.value}
            </p>
          )}
        </div>
        {Icon && (
          <div className="p-3 bg-blue-50 rounded-xl">
            <Icon size={24} className="text-blue-600" />
          </div>
        )}
      </div>
    </div>
  ),
};

// Table Component
export const Table = {
  Basic: ({ headers, data, className = '', ...props }: any) => (
    <div className={`bg-white rounded-xl border border-gray-200 overflow-hidden ${className}`}>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              {headers &&
                headers.map((header: string, index: number) => (
                  <th key={index} className="px-6 py-4 text-right text-sm font-medium text-gray-700">
                    {header}
                  </th>
                ))}
            </tr>
          </thead>
          <tbody>
            {data &&
              data.map((row: any[], rowIndex: number) => (
                <tr key={rowIndex} className="border-b border-gray-200 hover:bg-gray-50 transition-colors duration-150">
                  {row.map((cell: any, cellIndex: number) => (
                    <td key={cellIndex} className="px-6 py-4 text-sm text-gray-600">
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
};

// Badge Component
export const Badge = {
  Primary: ({ children, className = '' }: any) => (
    <span className={`bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium ${className}`}>{children}</span>
  ),
  Success: ({ children, className = '' }: any) => (
    <span className={`bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-medium ${className}`}>{children}</span>
  ),
  Warning: ({ children, className = '' }: any) => (
    <span className={`bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-xs font-medium ${className}`}>{children}</span>
  ),
  Danger: ({ children, className = '' }: any) => (
    <span className={`bg-red-100 text-red-800 px-3 py-1 rounded-full text-xs font-medium ${className}`}>{children}</span>
  ),
};

// Main Layout Component
export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileDropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  const navigation = [
    {
      name: 'لوحة التحكم',
      href: '/dashboard',
      icon: FiHome,
      isActive: pathname === '/dashboard',
    },
    {
      name: 'العملاء',
      href: '/dashboard/clients',
      icon: FiUsers,
      isActive: pathname === '/dashboard/clients',
    },
    {
      name: 'العقارات',
      href: '/dashboard/properties',
      icon: FiBarChart2,
      isActive: pathname === '/dashboard/properties',
    },
    {
      name: 'القوالب',
      href: '/dashboard/templates',
      icon: FiFileText,
      isActive: pathname === '/dashboard/templates',
    },
    {
      name: 'الإعدادات',
      href: '/dashboard/settings',
      icon: FiSettings,
      isActive: pathname === '/dashboard/settings',
    },
  ];

  // Close profile dropdown when clicking outside
  useEffect(() => {
    if (!isProfileOpen) return;

    const handleClick = (e: MouseEvent) => {
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(e.target as Node)) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClick, true);
    return () => document.removeEventListener('mousedown', handleClick, true);
  }, [isProfileOpen]);

  return (
    <div className="flex h-screen bg-gray-50" dir="rtl">
      {/* Sidebar */}
      <div
        className={`${
          isSidebarOpen ? 'w-72' : 'w-20'
        } bg-white border-l border-gray-200 transition-all duration-300 flex flex-col`}
      >
        {/* Logo Section */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          {isSidebarOpen ? (
            <div className="flex items-center space-x-3 space-x-reverse">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">و</span>
              </div>
              <div>
                <span className="text-xl font-bold text-gray-900 block">الواتساب العقاري</span>
                <span className="text-blue-600 text-xs font-medium">نظام البوت الذكي</span>
              </div>
            </div>
          ) : (
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center mx-auto">
              <span className="text-white font-bold text-lg">و</span>
            </div>
          )}
          <button
            type="button"
            onClick={() => setIsSidebarOpen((prev) => !prev)}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-500 hover:text-gray-700"
            aria-label={isSidebarOpen ? 'إغلاق القائمة الجانبية' : 'فتح القائمة الجانبية'}
          >
            {isSidebarOpen ? <FiChevronRight size={20} /> : <FiChevronLeft size={20} />}
          </button>
        </div>

        {/* Navigation Section */}
        <nav className="flex-1 px-4 py-6">
          <ul className="space-y-2">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={`flex items-center space-x-3 space-x-reverse p-4 rounded-xl transition-all duration-200 ${
                      item.isActive
                        ? 'bg-blue-50 text-blue-600 border-r-4 border-blue-600'
                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                    }`}
                  >
                    <Icon size={20} className="flex-shrink-0" />
                    {isSidebarOpen && <span className="font-medium text-sm">{item.name}</span>}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* User Profile Section */}
        <div className="p-4 border-t border-gray-200 bg-gray-50">
          <div className="flex items-center space-x-3 space-x-reverse p-3 rounded-lg hover:bg-white transition-colors cursor-pointer">
            <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
              <FiUser size={18} className="text-white" />
            </div>
            {isSidebarOpen && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-900 truncate">مدير النظام</p>
                <p className="text-xs text-gray-500 truncate">Admin</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-gray-200">
          <div className="flex items-center justify-between px-8 py-5">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-1">نظام الواتساب العقاري</h1>
              <p className="text-gray-600 text-sm">إدارة العملاء والعقارات والرسائل التلقائية</p>
            </div>

            <div className="flex items-center space-x-5 space-x-reverse">
              {/* Profile Dropdown */}
              <div className="relative" ref={profileDropdownRef}>
                <button
                  type="button"
                  onClick={() => setIsProfileOpen((prev) => !prev)}
                  className="flex items-center space-x-3 space-x-reverse p-2 rounded-xl hover:bg-gray-100 transition-colors"
                  aria-haspopup="true"
                  aria-expanded={isProfileOpen}
                  aria-label="القائمة الشخصية"
                >
                  <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                    <FiUser size={16} className="text-white" />
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">مدير النظام</p>
                    <p className="text-xs text-gray-500">Admin</p>
                  </div>
                </button>

                {/* Profile Dropdown Menu */}
                {isProfileOpen && (
                  <div className="absolute left-0 mt-2 w-56 bg-white rounded-xl border border-gray-200 py-2 z-50 shadow-lg">
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900">مدير النظام</p>
                      <p className="text-sm text-gray-500 truncate">admin@whatsapp-property.com</p>
                    </div>
                    <button
                      type="button"
                      className="flex items-center space-x-3 space-x-reverse w-full px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      <FiUser size={16} />
                      <span>الملف الشخصي</span>
                    </button>
                    <button
                      type="button"
                      className="flex items-center space-x-3 space-x-reverse w-full px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      <FiSettings size={16} />
                      <span>الإعدادات</span>
                    </button>
                    <div className="border-t border-gray-100 mt-2 pt-2">
                      <button
                        type="button"
                        className="flex items-center space-x-3 space-x-reverse w-full px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <FiLogOut size={16} />
                        <span>تسجيل الخروج</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto bg-gray-50 p-8">
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
}

// Export all page components we created
export { default as ClientsPage } from './clients/page';
export { default as ClientHistoryPage } from './clients/[id]/history/page';
export { default as PropertiesPage } from './properties/page';
export { default as AddPropertyPage } from './properties/add/page';
export { default as TemplatesPage } from './templates/page';