'use client';

import { ReactNode, useState } from 'react';

interface SettingsLayoutProps {
  children: ReactNode;
  activeSection?: string;
  onSectionChange?: (section: string) => void;
}

interface SettingsSection {
  id: string;
  label: string;
  icon: string;
  description: string;
}

export default function SettingsLayout({
  children,
  activeSection = 'general',
  onSectionChange
}: SettingsLayoutProps) {
  const sections: SettingsSection[] = [
    {
      id: 'general',
      label: 'عام',
      icon: '⚙️',
      description: 'الإعدادات الأساسية للتطبيق'
    },
    {
      id: 'profile',
      label: 'الملف الشخصي',
      icon: '👤',
      description: 'معلومات حسابك الشخصي'
    },
    {
      id: 'security',
      label: 'الأمان',
      icon: '🔒',
      description: 'كلمة المرور والمصادقة'
    },
    {
      id: 'notifications',
      label: 'الإشعارات',
      icon: '🔔',
      description: 'إعدادات التنبيهات والإشعارات'
    },
    {
      id: 'privacy',
      label: 'الخصوصية',
      icon: '👁️',
      description: 'إعدادات الخصوصية والبيانات'
    },
    {
      id: 'integrations',
      label: 'التكاملات',
      icon: '🔗',
      description: 'التطبيقات والخدمات المتصلة'
    },
    {
      id: 'billing',
      label: 'الفوترة',
      icon: '💳',
      description: 'الاشتراكات والمدفوعات'
    },
    {
      id: 'advanced',
      label: 'متقدم',
      icon: '🔧',
      description: 'الإعدادات المتقدمة'
    }
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      
      {/* Sidebar */}
      <div className="w-80 bg-white border-l border-gray-200 p-6">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">الإعدادات</h1>
          <p className="text-gray-600">إدارة إعدادات حسابك والتطبيق</p>
        </div>

        <nav className="space-y-2">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => onSectionChange?.(section.id)}
              className={`w-full text-right flex items-center gap-3 p-3 rounded-lg transition-colors ${
                activeSection === section.id
                  ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-600'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <span className="text-xl">{section.icon}</span>
              <div className="flex-1">
                <div className="font-medium">{section.label}</div>
                <div className="text-sm text-gray-500">{section.description}</div>
              </div>
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        {children}
      </div>

    </div>
  );
}