'use client';

import { useState } from 'react';
import SettingsForm from '@/components/common/Settings/SettingsForm';
import { useSettings } from '@/hooks/useSettings';

// Re-declare the shared SettingField and FieldValue types for type safety
type FieldValue = string | number | boolean | File | undefined;

interface SettingField {
  id: string;
  label: string;
  type: 'text' | 'email' | 'password' | 'number' | 'textarea' | 'select' | 'toggle' | 'file';
  value: FieldValue;
  options?: { label: string; value: string }[];
  placeholder?: string;
  required?: boolean;
  description?: string;
  validation?: (value: FieldValue) => string | null;
}

interface AppSettings {
  // General Settings
  siteName: string;
  siteDescription: string;
  language: string;
  timezone: string;
  dateFormat: string;
  
  // Profile Settings
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  bio: string;
  
  // Notification Settings
  emailNotifications: boolean;
  pushNotifications: boolean;
  smsNotifications: boolean;
  marketingEmails: boolean;
  
  // Security Settings
  twoFactorAuth: boolean;
  loginAlerts: boolean;
  sessionTimeout: string;
}

export default function SettingsPage() {
  const [activeSection] = useState<string>('general');

  const initialSettings: Record<string, FieldValue> = {
    siteName: 'منصة عنان',
    siteDescription: 'منصة الذكاء الاصطناعي الرائدة',
    language: 'ar',
    timezone: 'Asia/Riyadh',
    dateFormat: 'dd/MM/yyyy',

    firstName: 'محمد',
    lastName: 'أحمد',
    email: 'mohamed@example.com',
    phone: '+966501234567',
    bio: 'مطور واجهات مستخدم ومهتم بالذكاء الاصطناعي',

    emailNotifications: true,
    pushNotifications: false,
    smsNotifications: true,
    marketingEmails: false,

    twoFactorAuth: true,
    loginAlerts: true,
    sessionTimeout: '30'
  };

  const {
    settings,
    loading,
    updateSetting,
    saveSettings
  } = useSettings({
    initialSettings,
    onSave: async (data: Record<string, FieldValue>) => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Settings saved:', data);
    }
  });

  // Type-safe field definitions
  const generalFields: SettingField[] = [
    {
      id: 'siteName',
      label: 'اسم الموقع',
      type: 'text',
      value: settings.siteName as string,
      required: true,
      description: 'الاسم الذي سيظهر في أعلى الصفحة',
    },
    {
      id: 'siteDescription',
      label: 'وصف الموقع',
      type: 'textarea',
      value: settings.siteDescription as string,
      description: 'وصف قصير عن منصتك'
    },
    {
      id: 'language',
      label: 'اللغة',
      type: 'select',
      value: settings.language as string,
      options: [
        { label: 'العربية', value: 'ar' },
        { label: 'English', value: 'en' },
        { label: 'Français', value: 'fr' }
      ]
    },
    {
      id: 'timezone',
      label: 'المنطقة الزمنية',
      type: 'select',
      value: settings.timezone as string,
      options: [
        { label: 'الرياض (UTC+3)', value: 'Asia/Riyadh' },
        { label: 'دبي (UTC+4)', value: 'Asia/Dubai' },
        { label: 'القاهرة (UTC+2)', value: 'Africa/Cairo' }
      ]
    }
  ];

  const profileFields: SettingField[] = [
    {
      id: 'firstName',
      label: 'الاسم الأول',
      type: 'text',
      value: settings.firstName as string,
      required: true
    },
    {
      id: 'lastName',
      label: 'اسم العائلة',
      type: 'text',
      value: settings.lastName as string,
      required: true
    },
    {
      id: 'email',
      label: 'البريد الإلكتروني',
      type: 'email',
      value: settings.email as string,
      required: true,
      validation: (value: FieldValue) => {
        if (typeof value !== 'string' || !value.includes('@')) {
          return 'يرجى إدخال بريد إلكتروني صحيح';
        }
        return null;
      }
    },
    {
      id: 'phone',
      label: 'رقم الهاتف',
      type: 'text',
      value: settings.phone as string,
      placeholder: '+966501234567'
    },
    {
      id: 'bio',
      label: 'نبذة شخصية',
      type: 'textarea',
      value: settings.bio as string,
      description: 'اكتب نبذة قصيرة عن نفسك'
    }
  ];

  // For notification and security settings, just display the content statically as old demo did
  const NotificationSection = () => (
    <div className="bg-white rounded-xl border border-gray-200 p-8 text-center">
      <div className="text-6xl mb-4">⚙️</div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">قيد التطوير</h3>
      <p className="text-gray-600">هذا القسم قيد التطوير وسيتوفر قريباً</p>
    </div>
  );

  const SecuritySection = NotificationSection;

  const renderSectionContent = () => {
    switch (activeSection) {
      case 'general':
        return (
          <SettingsForm
            title="الإعدادات العامة"
            description="إعدادات الموقع الأساسية والمظهر"
            fields={generalFields}
            onSubmit={(data: Record<string, FieldValue>) => saveSettings(data)}
            loading={loading}
          />
        );
      case 'profile':
        return (
          <SettingsForm
            title="الملف الشخصي"
            description="إدارة معلومات حسابك الشخصي"
            fields={profileFields}
            onSubmit={(data: Record<string, FieldValue>) => saveSettings(data)}
            loading={loading}
          />
        );
      case 'notifications':
        return <NotificationSection />;
      case 'security':
        return <SecuritySection />;
      default:
        return (
          <div className="bg-white rounded-xl border border-gray-200 p-8 text-center">
            <div className="text-6xl mb-4">⚙️</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">قيد التطوير</h3>
            <p className="text-gray-600">هذا القسم قيد التطوير وسيتوفر قريباً</p>
          </div>
        );
    }
  };

  return (
    <div>
      <div>
        {renderSectionContent()}
      </div>
    </div>
  );
}