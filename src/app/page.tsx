// app/dui-docs/page.tsx
'use client';

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useState } from 'react';

// Live Preview Components
const ToastPreview = () => {
  const [toasts, setToasts] = useState([]);
  
  const addToast = (type: string) => {
    const newToast = {
      id: Date.now(),
      type,
      title: type === 'success' ? 'تم الحفظ بنجاح' : 
             type === 'error' ? 'حدث خطأ' :
             type === 'warning' ? 'تحذير' : 'معلومة',
      message: 'هذه رسالة تجريبية من النظام'
    };
    setToasts(prev => [...prev, newToast]);
    
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== newToast.id));
    }, 3000);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        <button 
          onClick={() => addToast('success')}
          className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm"
        >
          نجاح
        </button>
        <button 
          onClick={() => addToast('error')}
          className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm"
        >
          خطأ
        </button>
        <button 
          onClick={() => addToast('warning')}
          className="px-4 py-2 bg-yellow-600 text-white rounded-lg text-sm"
        >
          تحذير
        </button>
        <button 
          onClick={() => addToast('info')}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm"
        >
          معلومات
        </button>
      </div>
      
      <div className="fixed top-4 left-4 space-y-2">
        {toasts.map(toast => (
          <div key={toast.id} className={`p-4 rounded-lg shadow-lg border-r-4 ${
            toast.type === 'success' ? 'bg-green-50 border-green-500' :
            toast.type === 'error' ? 'bg-red-50 border-red-500' :
            toast.type === 'warning' ? 'bg-yellow-50 border-yellow-500' :
            'bg-blue-50 border-blue-500'
          }`}>
            <div className="flex items-center">
              <span className="ml-2">
                {toast.type === 'success' ? '✅' :
                 toast.type === 'error' ? '❌' :
                 toast.type === 'warning' ? '⚠️' : 'ℹ️'}
              </span>
              <div>
                <p className="font-medium text-gray-900">{toast.title}</p>
                <p className="text-sm text-gray-600">{toast.message}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const FileUploadPreview = () => {
  const [files, setFiles] = useState([]);
  
  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files).map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      name: file.name,
      size: (file.size / 1024 / 1024).toFixed(2),
      progress: 0
    }));
    
    setFiles(prev => [...prev, ...selectedFiles]);
    
    // Simulate upload progress
    selectedFiles.forEach(file => {
      let progress = 0;
      const interval = setInterval(() => {
        progress += 20;
        setFiles(prev => prev.map(f => 
          f.id === file.id ? { ...f, progress: Math.min(progress, 100) } : f
        ));
        if (progress >= 100) clearInterval(interval);
      }, 200);
    });
  };

  return (
    <div className="space-y-4">
      <div className="border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center">
        <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <span className="text-2xl text-blue-600">📁</span>
        </div>
        <p className="text-gray-600 mb-4">اسحب الملفات هنا أو انقر للرفع</p>
        <input 
          type="file" 
          multiple 
          onChange={handleFileChange}
          className="hidden" 
          id="file-upload"
        />
        <label 
          htmlFor="file-upload"
          className="bg-blue-600 text-white px-6 py-2 rounded-lg cursor-pointer inline-block"
        >
          اختر الملفات
        </label>
      </div>
      
      {files.length > 0 && (
        <div className="space-y-2">
          {files.map(file => (
            <div key={file.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
              <div className="flex items-center">
                <span className="text-lg ml-2">📄</span>
                <div>
                  <p className="font-medium text-sm">{file.name}</p>
                  <p className="text-xs text-gray-500">{file.size} MB</p>
                </div>
              </div>
              <div className="w-24 bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all"
                  style={{ width: `${file.progress}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const DashboardPreview = () => {
  const [collapsed, setCollapsed] = useState(false);
  
  return (
    <div className="border border-gray-200 rounded-2xl overflow-hidden">
      <div className="flex h-64">
        {/* Sidebar */}
        <div className={`bg-gray-900 text-white transition-all ${collapsed ? 'w-16' : 'w-48'}`}>
          <div className="p-4 border-b border-gray-700">
            {!collapsed && <h3 className="font-bold">لوحة التحكم</h3>}
          </div>
          <div className="p-2 space-y-1">
            {['الرئيسية', 'المستخدمين', 'الإعدادات', 'التقارير'].map(item => (
              <div key={item} className="flex items-center p-3 rounded-lg hover:bg-gray-800 cursor-pointer">
                <span className="ml-2">🎯</span>
                {!collapsed && <span className="text-sm">{item}</span>}
              </div>
            ))}
          </div>
        </div>
        
        {/* Main Content */}
        <div className="flex-1 bg-white p-4">
          <div className="flex items-center justify-between mb-4">
            <button 
              onClick={() => setCollapsed(!collapsed)}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              ☰
            </button>
            <h3 className="font-bold">مرحباً باللوحة الرئيسية</h3>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <p className="text-sm text-blue-600">إحصائيات اليوم</p>
              <p className="text-xl font-bold">1,234</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <p className="text-sm text-green-600">المستخدمين النشطين</p>
              <p className="text-xl font-bold">567</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function DUIDocs() {
  const [activeTab, setActiveTab] = useState('preview');

  const components = [
    {
      name: 'نظام الإشعارات',
      icon: '💬',
      description: 'إشعارات عائمة مع دعم لأنواع متعددة وأوقات تلقائية',
      preview: <ToastPreview />,
      code: `// components/ui/ToastContext.tsx
'use client';

import React, { createContext, useContext, useState } from 'react';

export interface Toast {
  id: string;
  title: string;
  message?: string;
  type: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
}

interface ToastContextType {
  toasts: Toast[];
  addToast: (toast: Omit<Toast, 'id'>) => void;
  removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = (toast: Omit<Toast, 'id'>) => {
    const id = Math.random().toString(36).substr(2, 9);
    const newToast = { ...toast, id };
    setToasts(prev => [...prev, newToast]);

    if (toast.duration !== 0) {
      setTimeout(() => removeToast(id), toast.duration || 5000);
    }
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) throw new Error('useToast must be used within ToastProvider');
  return context;
}

// components/ui/ToastContainer.tsx
'use client';

import { useToast } from './ToastContext';

export default function ToastContainer() {
  const { toasts, removeToast } = useToast();

  return (
    <div className="fixed top-4 left-4 z-50 space-y-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={\`p-4 rounded-lg shadow-lg border-r-4 max-w-sm \${
            toast.type === 'success' ? 'bg-green-50 border-green-500' :
            toast.type === 'error' ? 'bg-red-50 border-red-500' :
            toast.type === 'warning' ? 'bg-yellow-50 border-yellow-500' :
            'bg-blue-50 border-blue-500'
          }\`}
        >
          <div className="flex items-start">
            <span className="ml-2 text-lg">
              {toast.type === 'success' ? '✅' :
               toast.type === 'error' ? '❌' :
               toast.type === 'warning' ? '⚠️' : 'ℹ️'}
            </span>
            <div className="flex-1">
              <p className="font-medium text-gray-900">{toast.title}</p>
              {toast.message && (
                <p className="text-sm text-gray-600 mt-1">{toast.message}</p>
              )}
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}`,
      usage: `// الاستخدام في التطبيق
import { ToastProvider, useToast } from '@/components/ui/ToastContext';
import ToastContainer from '@/components/ui/ToastContainer';

function App() {
  return (
    <ToastProvider>
      <YourApp />
      <ToastContainer />
    </ToastProvider>
  );
}

// في المكونات
function MyComponent() {
  const { addToast } = useToast();

  const handleAction = () => {
    addToast({
      title: 'تم الحفظ بنجاح',
      message: 'تم حفظ البيانات في النظام',
      type: 'success',
      duration: 5000
    });
  };

  return <button onClick={handleAction}>حفظ</button>;
}`
    },
    {
      name: 'رفع الملفات',
      icon: '📁',
      description: 'مكون متقدم لرفع الملفات مع سحب وإفلات وتتبع التقدم',
      preview: <FileUploadPreview />,
      code: `// components/common/FileUploader.tsx
'use client';

import { useState, useRef } from 'react';

interface UploadedFile {
  id: string;
  file: File;
  progress: number;
  status: 'uploading' | 'completed' | 'error';
}

interface FileUploaderProps {
  onUploadComplete?: (files: File[]) => void;
  acceptedTypes?: string;
  maxSize?: number; // in MB
}

export default function FileUploader({ 
  onUploadComplete,
  acceptedTypes = ".pdf,.jpg,.png,.doc,.docx",
  maxSize = 10 
}: FileUploaderProps) {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (files: FileList | null) => {
    if (!files) return;

    const validFiles = Array.from(files).filter(file => {
      const sizeValid = file.size <= maxSize * 1024 * 1024;
      if (!sizeValid) {
        alert(\`الملف \${file.name} يتجاوز الحجم المسموح (\${maxSize}MB)\`);
      }
      return sizeValid;
    });

    const newFiles: UploadedFile[] = validFiles.map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      file,
      progress: 0,
      status: 'uploading'
    }));

    setUploadedFiles(prev => [...prev, ...newFiles]);
    onUploadComplete?.(validFiles);

    // Simulate upload
    newFiles.forEach(file => simulateUpload(file.id));
  };

  const simulateUpload = (fileId: string) => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 20;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        setUploadedFiles(prev => prev.map(f => 
          f.id === fileId ? { ...f, progress: 100, status: 'completed' } : f
        ));
      } else {
        setUploadedFiles(prev => prev.map(f => 
          f.id === fileId ? { ...f, progress } : f
        ));
      }
    }, 200);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFileSelect(e.dataTransfer.files);
  };

  const removeFile = (fileId: string) => {
    setUploadedFiles(prev => prev.filter(f => f.id !== fileId));
  };

  return (
    <div className="w-full">
      <div
        className={\`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-colors \${
          isDragging ? 'border-blue-400 bg-blue-50' : 'border-gray-300 bg-white hover:border-blue-400'
        }\`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <span className="text-2xl text-blue-600">📁</span>
        </div>
        
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          اسحب وأفلت الملفات هنا
        </h3>
        
        <p className="text-gray-600 mb-4">
          أو انقر لاختيار الملفات من جهازك
        </p>
        
        <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          اختر الملفات
        </button>
        
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept={acceptedTypes}
          className="hidden"
          onChange={(e) => handleFileSelect(e.target.files)}
        />
        
        <p className="text-sm text-gray-500 mt-4">
          {acceptedTypes} - حتى {maxSize}MB
        </p>
      </div>

      {uploadedFiles.length > 0 && (
        <div className="mt-6 space-y-3">
          {uploadedFiles.map((file) => (
            <div key={file.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center">
                <span className="text-lg ml-3">📄</span>
                <div>
                  <p className="font-medium text-sm">{file.file.name}</p>
                  <p className="text-xs text-gray-500">
                    {(file.file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-4 space-x-reverse">
                <div className="w-32 bg-gray-200 rounded-full h-2">
                  <div
                    className={\`h-2 rounded-full transition-all \${
                      file.status === 'completed' ? 'bg-green-500' :
                      file.status === 'error' ? 'bg-red-500' : 'bg-blue-500'
                    }\`}
                    style={{ width: \`\${file.progress}%\` }}
                  ></div>
                </div>

                <button
                  onClick={() => removeFile(file.id)}
                  className="text-gray-400 hover:text-red-500 transition-colors"
                >
                  ✕
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}`,
      usage: `// الاستخدام الأساسي
import FileUploader from '@/components/common/FileUploader';

function UploadPage() {
  return (
    <div className="p-6">
      <FileUploader />
    </div>
  );
}

// مع الخصائص المخصصة
<FileUploader
  acceptedTypes=".pdf,.jpg,.png"
  maxSize={5}
  onUploadComplete={(files) => console.log(files)}
/>`
    },
    {
      name: 'لوحة التحكم',
      icon: '📊',
      description: 'هيكل متكامل للوحة التحكم بشريط جانبي قابل للطي',
      preview: <DashboardPreview />,
      code: `// components/Dashboard.tsx
'use client';

import { useState } from 'react';

export interface SidebarItem {
  id: string;
  label: string;
  icon?: string;
  href?: string;
  children?: SidebarItem[];
  badge?: string;
}

interface DashboardProps {
  sidebarData: SidebarItem[];
  children: React.ReactNode;
}

export default function Dashboard({ sidebarData, children }: DashboardProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-50" dir="rtl">
      {/* Sidebar */}
      <div className={\`bg-white border-l border-gray-200 transition-all \${
        sidebarOpen ? 'w-64' : 'w-20'
      }\`}>
        <div className="p-4 border-b border-gray-200">
          {sidebarOpen && (
            <h1 className="text-xl font-bold text-gray-900">لوحة التحكم</h1>
          )}
        </div>
        
        <nav className="p-4 space-y-2">
          {sidebarData.map((item) => (
            <div key={item.id} className="flex items-center p-3 rounded-lg hover:bg-gray-100 cursor-pointer">
              <span className="text-lg">{item.icon}</span>
              {sidebarOpen && (
                <span className="mr-2 text-sm font-medium">{item.label}</span>
              )}
            </div>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-lg hover:bg-gray-100"
            >
              ☰
            </button>
            
            <div className="flex items-center space-x-4 space-x-reverse">
              <button className="p-2 rounded-lg hover:bg-gray-100">
                🔔
              </button>
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm">User</span>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}`,
      usage: `// استخدام لوحة التحكم
import Dashboard from '@/components/Dashboard';

const sidebarData = [
  {
    id: 'dashboard',
    label: 'الرئيسية',
    icon: '🏠',
    href: '/dashboard'
  },
  {
    id: 'users',
    label: 'المستخدمين',
    icon: '👥',
    children: [
      {
        id: 'all-users',
        label: 'جميع المستخدمين',
        href: '/users'
      }
    ]
  }
];

function AdminPanel() {
  return (
    <Dashboard sidebarData={sidebarData}>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">مرحباً باللوحة الرئيسية</h1>
        {/* محتوى الصفحة */}
      </div>
    </Dashboard>
  );
}`
    }
  ];

  const installationCode = `// تثبيت المكتبات المطلوبة
npm install react-syntax-highlighter

// هيكل المشروع الموصى به
src/
  components/
    common/
      FileUploader.tsx
    ui/
      ToastContext.tsx
      ToastContainer.tsx
    Dashboard.tsx
  app/
    layout.tsx
    page.tsx

// إعداد ملف layout.tsx
import { ToastProvider } from '@/components/ui/ToastContext';
import ToastContainer from '@/components/ui/ToastContainer';

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl">
      <body>
        <ToastProvider>
          {children}
          <ToastContainer />
        </ToastProvider>
      </body>
    </html>
  );
}`;

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4 space-x-reverse">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-sm">DUI</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">مكتبة DUI</h1>
                <p className="text-sm text-gray-500">مكونات React جاهزة للاستخدام</p>
              </div>
            </div>
            
            <nav className="flex items-center space-x-8 space-x-reverse text-sm">
              <a href="#المكونات" className="text-gray-600 hover:text-blue-600 transition-colors">المكونات</a>
              <a href="#التثبيت" className="text-gray-600 hover:text-blue-600 transition-colors">التثبيت</a>
              <a href="#الاستخدام" className="text-gray-600 hover:text-blue-600 transition-colors">الاستخدام</a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            مكتبة مكونات React
            <br />
            <span className="text-blue-100">جاهزة للإنتاج</span>
          </h1>
          
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto leading-relaxed">
            مجموعة متكاملة من المكونات المعيارية مع دعم كامل للغة العربية، 
            مصممة لتسريع تطوير تطبيقات الويب الحديثة
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 space-x-reverse">
            <a 
              href="#المكونات" 
              className="bg-white text-blue-600 px-8 py-3 rounded-lg hover:bg-blue-50 font-semibold transition-colors"
            >
              استعرض المكونات
            </a>
            <a 
              href="#التثبيت" 
              className="border border-white text-white px-8 py-3 rounded-lg hover:bg-white/10 font-semibold transition-colors"
            >
              ابدأ الآن
            </a>
          </div>
        </div>
      </section>

      {/* Components Section */}
      <section id="المكونات" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">المكونات المتاحة</h2>
            <p className="text-lg text-gray-600">جميع المكونات جاهزة للنسخ والاستخدام الفوري</p>
          </div>

          <div className="space-y-12">
            {components.map((component, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-4 space-x-reverse">
                      <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                        <span className="text-xl">{component.icon}</span>
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">{component.name}</h3>
                        <p className="text-gray-600 mt-1">{component.description}</p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => navigator.clipboard.writeText(component.code)}
                        className="text-gray-400 hover:text-blue-600 transition-colors px-3 py-1 rounded-lg border border-gray-300 hover:border-blue-600 text-sm"
                      >
                        نسخ الكود
                      </button>
                    </div>
                  </div>
                </div>

                <div className="border-b border-gray-200">
                  <div className="flex border-b border-gray-200">
                    <button
                      onClick={() => setActiveTab('preview')}
                      className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                        activeTab === 'preview' 
                          ? 'border-blue-600 text-blue-600' 
                          : 'border-transparent text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      معاينة مباشرة
                    </button>
                    <button
                      onClick={() => setActiveTab('code')}
                      className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                        activeTab === 'code' 
                          ? 'border-blue-600 text-blue-600' 
                          : 'border-transparent text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      الكود المصدري
                    </button>
                    <button
                      onClick={() => setActiveTab('usage')}
                      className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                        activeTab === 'usage' 
                          ? 'border-blue-600 text-blue-600' 
                          : 'border-transparent text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      طريقة الاستخدام
                    </button>
                  </div>

                  <div className="p-6">
                    {activeTab === 'preview' && (
                      <div className="flex justify-center">
                        {component.preview}
                      </div>
                    )}
                    
                    {activeTab === 'code' && (
                      <div className="rounded-lg overflow-hidden border border-gray-200">
                        <SyntaxHighlighter 
                          language="tsx" 
                          style={oneDark}
                          customStyle={{ 
                            padding: '1.5rem',
                            margin: 0,
                            fontSize: '0.85rem',
                            direction: 'ltr'
                          }}
                        >
                          {component.code}
                        </SyntaxHighlighter>
                      </div>
                    )}
                    
                    {activeTab === 'usage' && (
                      <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
                        <SyntaxHighlighter 
                          language="tsx" 
                          style={oneDark}
                          customStyle={{ 
                            padding: '1rem',
                            margin: 0,
                            fontSize: '0.85rem',
                            direction: 'ltr',
                            background: 'transparent'
                          }}
                        >
                          {component.usage}
                        </SyntaxHighlighter>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Installation Section */}
      <section id="التثبيت" className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">التثبيت والإعداد</h2>
            <p className="text-lg text-gray-600">خطوات بسيطة لتجهيز المكتبة في مشروعك</p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 bg-gray-50 border-b border-gray-200">
              <span className="text-sm font-medium text-gray-900">دليل التثبيت</span>
              <button 
                onClick={() => navigator.clipboard.writeText(installationCode)}
                className="text-gray-400 hover:text-blue-600 transition-colors text-sm"
              >
                نسخ الكود
              </button>
            </div>
            <SyntaxHighlighter 
              language="bash" 
              style={oneDark}
              customStyle={{ 
                padding: '1.5rem',
                margin: 0,
                fontSize: '0.9rem',
                direction: 'ltr'
              }}
            >
              {installationCode}
            </SyntaxHighlighter>
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="py-16 bg-gradient-to-br from-blue-500 to-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-12">مبنية بأفضل التقنيات</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { name: 'React 18', icon: '⚛️', desc: 'أحدث إصدار' },
              { name: 'TypeScript', icon: '📘', desc: 'نوعية آمنة' },
              { name: 'Tailwind CSS', icon: '🎨', desc: 'تصميم متجاوب' },
              { name: 'RTL Support', icon: '📱', desc: 'دعم العربية' }
            ].map((tech, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl mb-4">{tech.icon}</div>
                <div className="font-bold text-lg mb-2">{tech.name}</div>
                <div className="text-blue-100 text-sm">{tech.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4">
            <span className="font-bold">DUI</span>
          </div>
          
          <p className="text-gray-400 mb-6">
            مكتبة مكونات واجهة المستخدم المخصصة لتطبيقات React
          </p>
          
          <div className="flex items-center justify-center space-x-6 space-x-reverse text-gray-400 text-sm mb-6">
            <a href="#" className="hover:text-white transition-colors">التوثيق</a>
            <a href="#" className="hover:text-white transition-colors">الأمثلة</a>
            <a href="#" className="hover:text-white transition-colors">الدعم</a>
            <a href="#" className="hover:text-white transition-colors">GitHub</a>
          </div>
          
          <div className="border-t border-gray-800 pt-8 text-gray-400 text-sm">
            <p>© 2024 مكتبة DUI. جميع الحقوق محفوظة.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}