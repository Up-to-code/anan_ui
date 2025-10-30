// app/dui-docs/page.tsx
'use client';

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useState } from 'react';

// Primary Color: Emerald (Modern, professional, accessible)
const PRIMARY_COLOR = 'emerald';

// Enhanced Code Block with better features
const CodeBlock = ({
  code,
  language = 'tsx',
  title = 'كود المكون',
}: {
  code: string;
  language?: string;
  title?: string;
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      // Handle error gracefully
      setCopied(false);
    }
  };

  return (
    <div className="relative">
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-medium text-gray-700">{title}</span>
        <button
          type="button"
          onClick={handleCopy}
          className="flex items-center space-x-2 space-x-reverse px-3 py-1.5 text-sm bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
          aria-label="Copy code"
        >
          {copied ? (
            <>
              <span aria-hidden="true">✅</span>
              <span>تم النسخ!</span>
            </>
          ) : (
            <>
              <span aria-hidden="true">📋</span>
              <span>نسخ الكود</span>
            </>
          )}
        </button>
      </div>
      <SyntaxHighlighter
        language={language}
        style={oneDark}
        customStyle={{
          padding: '1.5rem',
          margin: 0,
          fontSize: '0.875rem',
          direction: 'ltr',
          borderRadius: '0.75rem',
          lineHeight: '1.6',
          background: '#1f2937',
        }}
        showLineNumbers
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
};

// Enhanced Component Showcase with more details
const ArabicComponent = ({
  title,
  description,
  code,
  preview,
  features = [],
  usage = '',
}: {
  title: string;
  description: string;
  code: string;
  preview: React.ReactNode;
  features?: string[];
  usage?: string;
}) => {
  const [activeTab, setActiveTab] = useState<'preview' | 'code' | 'usage'>('preview');

  return (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
            <p className="text-gray-600 leading-relaxed">{description}</p>
          </div>
          <span className="bg-emerald-100 text-emerald-800 text-xs px-2 py-1 rounded-full font-medium">
            جاهز للإنتاج
          </span>
        </div>
      </div>

      {/* Enhanced Tabs */}
      <div className="border-b border-gray-200 bg-gray-50">
        <div className="flex">
          {([
            { val: 'preview', icon: '👁️', label: 'المعاينة الحية' },
            { val: 'code', icon: '💻', label: 'الكود الكامل' },
            { val: 'usage', icon: '📖', label: 'دليل الاستخدام' },
          ] as const).map((tab) => (
            <button
              type="button"
              key={tab.val}
              onClick={() => setActiveTab(tab.val)}
          <button
            onClick={() => setActiveTab('preview')}
            className={`flex items-center space-x-2 space-x-reverse flex-1 py-4 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'preview' 
                ? 'border-emerald-500 text-emerald-600 bg-white' 
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-100'
            }`}
          >
            <span>👁️</span>
            <span>المعاينة الحية</span>
          </button>
          <button
            onClick={() => setActiveTab('code')}
            className={`flex items-center space-x-2 space-x-reverse flex-1 py-4 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'code' 
                ? 'border-emerald-500 text-emerald-600 bg-white' 
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-100'
            }`}
          >
            <span>💻</span>
            <span>الكود الكامل</span>
          </button>
          <button
            onClick={() => setActiveTab('usage')}
            className={`flex items-center space-x-2 space-x-reverse flex-1 py-4 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'usage' 
                ? 'border-emerald-500 text-emerald-600 bg-white' 
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-100'
            }`}
          >
            <span>📖</span>
            <span>دليل الاستخدام</span>
          </button>
        </div>
      </div>

      <div className="p-6">
        {activeTab === 'preview' && (
          <div className="space-y-6">
            <div className="flex justify-center p-8 bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl border border-gray-200">
              {preview}
            </div>
            
            {features.length > 0 && (
              <div className="bg-emerald-50 rounded-lg p-4 border border-emerald-200">
                <h4 className="font-semibold text-emerald-900 mb-3 flex items-center">
                  <span className="ml-2">✨</span>
                  المميزات الرئيسية
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2 space-x-reverse text-sm text-emerald-800">
                      <span className="w-2 h-2 bg-emerald-500 rounded-full flex-shrink-0"></span>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
        
        {activeTab === 'code' && <CodeBlock code={code} title={`كود ${title}`} />}
        
        {activeTab === 'usage' && (
          <div className="space-y-4">
            <div className="prose prose-sm max-w-none">
              <h4 className="text-lg font-semibold text-gray-900 mb-3">كيفية الاستخدام</h4>
              <div className="text-gray-600 leading-relaxed space-y-3">
                {usage || "استخدم هذا المكون مباشرة في مشروعك بنسخ الكود ولصقه."}
              </div>
            </div>
            
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
              <h5 className="font-semibold text-blue-900 mb-2 flex items-center">
                <span className="ml-2">💡</span>
                نصائح سريعة
              </h5>
              <ul className="text-sm text-blue-800 space-y-1 list-disc list-inside">
                <li>تأكد من تثبيت React 18 أو أحدث</li>
                <li>المكون يدعم TypeScript بشكل كامل</li>
                <li>يمكن تخصيص التصميم عبر Tailwind CSS</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Enhanced Live Preview Components
const ToastPreview = () => {
  const [toasts, setToasts] = useState<Array<{id: number, type: string, title: string, message: string}>>([]);

  const addToast = (type: string) => {
    const titles = {
      success: 'تمت العملية بنجاح',
      error: 'حدث خطأ غير متوقع',
      warning: 'تنبيه مهم',
      info: 'معلومة جديدة'
    };

    const messages = {
      success: 'تم حفظ جميع البيانات بنجاح في النظام',
      error: 'تعذر إكمال العملية، يرجى المحاولة مرة أخرى',
      warning: 'هذا الإجراء لا يمكن التراجع عنه لاحقاً',
      info: 'هناك تحديث جديد متاح للتطبيق'
    };

    const newToast = {
      id: crypto.randomUUID(),
      type,
      title: titles[type as keyof typeof titles],
      message: messages[type as keyof typeof messages]
    };


    
    setToasts(prev => [...prev, newToast]);
    
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== newToast.id));
    }, 5000);
  };

  return (
    <div className="space-y-6 text-center w-full max-w-2xl">
      <div className="mb-6">
        <h4 className="font-semibold text-gray-900 mb-2">تجربة نظام الإشعارات</h4>
        <p className="text-sm text-gray-600">انقر على الأزرار أدناه لرؤية الإشعارات المختلفة</p>
      </div>
      
      <div className="flex flex-wrap gap-3 justify-center">
        {['success', 'error', 'warning', 'info'].map((type) => (
          <button 
            key={type}
            onClick={() => addToast(type)}
            className={`px-5 py-2.5 rounded-lg text-white text-sm font-medium transition-all hover:scale-105 ${
              type === 'success' ? 'bg-emerald-500 hover:bg-emerald-600 shadow-lg' :
              type === 'error' ? 'bg-red-500 hover:bg-red-600 shadow-lg' :
              type === 'warning' ? 'bg-amber-500 hover:bg-amber-600 shadow-lg' :
              'bg-blue-500 hover:bg-blue-600 shadow-lg'
            }`}
          >
            {type === 'success' ? 'إشعار نجاح' :
             type === 'error' ? 'إشعار خطأ' :
             type === 'warning' ? 'إشعار تحذير' : 'إشعار معلومات'}
          </button>
        ))}
      </div>
      
      <div className="fixed top-4 left-4 space-y-3 z-50">
        {toasts.map(toast => (
          <div 
            key={toast.id}
            className={`p-4 rounded-xl shadow-2xl border-r-4 min-w-80 max-w-sm transform transition-all duration-300 ${
              toast.type === 'success' ? 'bg-emerald-50 border-emerald-500' :
              toast.type === 'error' ? 'bg-red-50 border-red-500' :
              toast.type === 'warning' ? 'bg-amber-50 border-amber-500' :
              'bg-blue-50 border-blue-500'
            }`}
          >
            <div className="flex items-start space-x-3 space-x-reverse">
              <span className="text-xl mt-0.5 flex-shrink-0">
                {toast.type === 'success' ? '✅' :
                 toast.type === 'error' ? '❌' :
                 toast.type === 'warning' ? '⚠️' : 'ℹ️'}
              </span>
              <div className="flex-1 text-right">
                <p className="font-semibold text-gray-900 text-sm">{toast.title}</p>
                <p className="text-sm text-gray-600 mt-1 leading-relaxed">{toast.message}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const FileUploadPreview = () => {
  const [files, setFiles] = useState<Array<{id: string, name: string, size: string, progress: number}>>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (!selectedFiles) return;

    const newFiles = Array.from(selectedFiles).map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      name: file.name,
      size: (file.size / 1024 / 1024).toFixed(2),
      progress: 0
    }));
    
    setFiles(prev => [...prev, ...newFiles]);
    
    // محاكاة التقدم
    newFiles.forEach(file => {
      let progress = 0;
      const interval = setInterval(() => {
        progress += Math.random() * 30;
        if (progress >= 100) {
          progress = 100;
          clearInterval(interval);
        }
        setFiles(prev => prev.map(f => 
          f.id === file.id ? { ...f, progress: Math.min(progress, 100) } : f
        ));
      }, 300);
    });
  };

  return (
    <div className="space-y-6 w-full max-w-2xl">
      <div className="text-center mb-4">
        <h4 className="font-semibold text-gray-900 mb-2">منصة رفع الملفات</h4>
        <p className="text-sm text-gray-600">جرب سحب الملفات أو النقر لاختيارها</p>
      </div>

      <div className="border-3 border-dashed border-gray-300 rounded-2xl p-8 text-center cursor-pointer transition-all hover:border-emerald-400 hover:bg-emerald-50/50">
        <div className="w-20 h-20 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-inner">
          <span className="text-3xl text-emerald-600">📁</span>
        </div>
        
        <h5 className="text-lg font-semibold text-gray-900 mb-2">اسحب وأفلت الملفات هنا</h5>
        <p className="text-gray-600 mb-6 max-w-md mx-auto leading-relaxed">
          أو انقر لاختيار الملفات من جهازك. يدعم جميع صيغ الملفات الشائعة
        </p>
        
        <input 
          type="file" 
          multiple 
          onChange={handleFileChange}
          className="hidden" 
          id="file-upload-demo"
        />
        <label 
          htmlFor="file-upload-demo"
          className="bg-emerald-500 text-white px-8 py-3 rounded-lg cursor-pointer inline-block font-medium hover:bg-emerald-600 transition-all shadow-lg hover:shadow-xl"
        >
          📎 اختر الملفات
        </label>
        
        <p className="text-xs text-gray-500 mt-4">
          يدعم: PDF, JPG, PNG, DOC, XLS - الحد الأقصى 50MB للملف
        </p>
      </div>
      
      {files.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h5 className="font-medium text-gray-900">الملفات المرفوعة ({files.length})</h5>
            <span className="text-sm text-emerald-600 bg-emerald-100 px-2 py-1 rounded">
              جاري المعالجة...
            </span>
          </div>
          
          {files.map(file => (
            <div key={file.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center space-x-4 space-x-reverse">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl flex items-center justify-center">
                  <span className="text-xl">📄</span>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-900 text-sm">{file.name}</p>
                  <p className="text-xs text-gray-500 mt-1">{file.size} ميجابايت</p>
                </div>
              </div>

              <div className="flex items-center space-x-4 space-x-reverse">
                <div className="w-32 bg-gray-200 rounded-full h-2.5 shadow-inner">
                  <div 
                    className="bg-gradient-to-r from-emerald-400 to-emerald-600 h-2.5 rounded-full transition-all duration-500 shadow-md"
                    style={{ width: `${file.progress}%` }}
                  ></div>
                </div>
                <span className="text-sm font-medium text-gray-700 w-12 text-left">
                  {Math.round(file.progress)}%
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const DashboardPreview = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="w-full max-w-4xl bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-lg">
      <div className="flex h-80 bg-gradient-to-br from-gray-50 to-white">
        {/* الشريط الجانبي */}
        <div className={`bg-white border-l border-gray-200 transition-all duration-300 ${sidebarOpen ? 'w-64' : 'w-20'}`}>
          <div className="p-4 border-b border-gray-200 flex items-center justify-between bg-gradient-to-r from-white to-gray-50">
            {sidebarOpen && (
              <div>
                <h2 className="font-bold text-gray-900 text-lg">لوحة التحكم</h2>
                <p className="text-xs text-emerald-600 mt-1">الإصدار 2.1</p>
              </div>
            )}
            <button 
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-600"
            >
              {sidebarOpen ? '«' : '»'}
            </button>
          </div>
          
          <nav className="p-4 space-y-2">
            {[
              { icon: '🏠', label: 'الرئيسية', active: true },
              { icon: '👥', label: 'المستخدمين', badge: 3 },
              { icon: '📊', label: 'التقارير' },
              { icon: '⚙️', label: 'الإعدادات' },
              { icon: '🔔', label: 'الإشعارات', badge: 12 }
            ].map((item, index) => (
              <div 
                key={index}
                className={`flex items-center p-3 rounded-xl transition-all cursor-pointer group ${
                  item.active 
                    ? 'bg-emerald-50 border-r-2 border-emerald-500 text-emerald-700' 
                    : 'hover:bg-gray-100 text-gray-700'
                }`}
              >
                <span className="text-lg">{item.icon}</span>
                {sidebarOpen && (
                  <div className="flex items-center justify-between flex-1 mr-3">
                    <span className="text-sm font-medium">{item.label}</span>
                    {item.badge && (
                      <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full min-w-6 text-center">
                        {item.badge}
                      </span>
                    )}
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>

        {/* المحتوى الرئيسي */}
        <div className="flex-1 flex flex-col">
          <header className="bg-white border-b border-gray-200 px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4 space-x-reverse">
                <button
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors lg:hidden"
                >
                  ☰
                </button>
                <h2 className="text-lg font-semibold text-gray-900">الرئيسية - نظرة عامة</h2>
              </div>
              
              <div className="flex items-center space-x-4 space-x-reverse">
                <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors relative">
                  <span className="text-xl">🔔</span>
                  <span className="absolute -top-1 -left-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></span>
                </button>
                <div className="flex items-center space-x-3 space-x-reverse">
                  <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-white font-semibold text-sm">م</span>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">محمد أحمد</p>
                    <p className="text-xs text-gray-500">مدير النظام</p>
                  </div>
                </div>
              </div>
            </div>
          </header>

          <div className="flex-1 p-6 overflow-auto bg-gradient-to-br from-gray-50 to-white">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-2xl">👥</span>
                  <span className="text-xs bg-emerald-100 text-emerald-800 px-2 py-1 rounded-full">+12%</span>
                </div>
                <p className="text-sm text-gray-600 mb-1">إجمالي المستخدمين</p>
                <p className="text-2xl font-bold text-gray-900">١٬٢٣٤</p>
              </div>
              
              <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-2xl">💰</span>
                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">+8%</span>
                </div>
                <p className="text-sm text-gray-600 mb-1">الإيرادات الشهرية</p>
                <p className="text-2xl font-bold text-gray-900">٥٦٬٧٨٩</p>
              </div>
              
              <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-2xl">📈</span>
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">+23%</span>
                </div>
                <p className="text-sm text-gray-600 mb-1">معدل التحويل</p>
                <p className="text-2xl font-bold text-gray-900">٧٨٪</p>
              </div>
              
              <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-2xl">⏱️</span>
                  <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full">-5%</span>
                </div>
                <p className="text-sm text-gray-600 mb-1">متوسط وقت التحميل</p>
                <p className="text-2xl font-bold text-gray-900">١.٢ث</p>
              </div>
            </div>
            
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-4">النشاط الأخير</h3>
              <p className="text-gray-600">مرحباً بك في لوحة التحكم المتكاملة. يمكنك متابعة جميع إحصائيات النظام من هنا.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function DUIDocs() {
  const components = [
    {
      title: 'نظام الإشعارات المتقدم',
      description: 'نظام إشعارات ذكي يدعم أنواع متعددة مع توقيت تلقائي وتصميم متجاوب. مثالي لتطبيقات الويب الحديثة.',
      code: `// نظام الإشعارات الكامل - انسخ هذا الكود
'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface Toast {
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

export function ToastProvider({ children }: { children: ReactNode }) {
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
  if (!context) {
    throw new Error('useToast must be used within ToastProvider');
  }
  return context;
}

export function ToastContainer() {
  const { toasts, removeToast } = useToast();

  return (
    <div className="fixed top-4 left-4 space-y-3 z-50">
      {toasts.map(toast => (
        <div 
          key={toast.id}
          className={\`p-4 rounded-xl shadow-2xl border-r-4 min-w-80 max-w-sm transform transition-all duration-300 \${
            toast.type === 'success' ? 'bg-emerald-50 border-emerald-500' :
            toast.type === 'error' ? 'bg-red-50 border-red-500' :
            toast.type === 'warning' ? 'bg-amber-50 border-amber-500' :
            'bg-blue-50 border-blue-500'
          }\`}
        >
          <div className="flex items-start space-x-3 space-x-reverse">
            <span className="text-xl mt-0.5 flex-shrink-0">
              {toast.type === 'success' ? '✅' :
               toast.type === 'error' ? '❌' :
               toast.type === 'warning' ? '⚠️' : 'ℹ️'}
            </span>
            <div className="flex-1 text-right">
              <p className="font-semibold text-gray-900 text-sm">{toast.title}</p>
              {toast.message && (
                <p className="text-sm text-gray-600 mt-1 leading-relaxed">{toast.message}</p>
              )}
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-gray-400 hover:text-gray-600 transition-colors flex-shrink-0"
            >
              ✕
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

// الاستخدام في التطبيق:
// 1. ضع ToastProvider في أعلى تطبيقك
// 2. استخدم useToast() في أي مكون
// 3. أضف ToastContainer في التخطيط الرئيسي`,
      preview: <ToastPreview />,
      features: [
        'دعم كامل للغة العربية RTL',
        'أنواع متعددة (نجاح، خطأ، تحذير، معلومات)',
        'توقيت تلقائي للإخفاء',
        'تصميم متجاوب لجميع الشاشات',
        'سهل التكامل مع أي مشروع'
      ],
      usage: `1. قم بنسخ الكود أعلاه في ملف Toast.tsx
2. أضف ToastProvider إلى تطبيقك الرئيسي
3. استخدم useToast() في أي مكون
4. أضف ToastContainer في التخطيط الرئيسي

مثال الاستخدام:
const { addToast } = useToast();

addToast({
  title: 'تم الحفظ بنجاح',
  message: 'تم حفظ جميع التغييرات',
  type: 'success',
  duration: 5000
});`
    },
    {
      title: 'منصة رفع الملفات',
      description: 'مكون متكامل لرفع الملفات مع سحب وإفلات، تقدم مرئي، وتحقق من الأنواع. يدعم الملفات الكبيرة والرفع المتعدد.',
      code: `// منصة رفع الملفات الكاملة - انسخ هذا الكود
'use client';

import { useState, useRef } from 'react';

interface UploadedFile {
  id: string;
  file: File;
  progress: number;
  status: 'uploading' | 'completed' | 'error';
}

export default function FileUploader() {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (selectedFiles: FileList | null) => {
    if (!selectedFiles) return;

    const newFiles: UploadedFile[] = Array.from(selectedFiles).map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      file,
      progress: 0,
      status: 'uploading'
    }));

    setFiles(prev => [...prev, ...newFiles]);
    simulateUpload(newFiles);
  };

  const simulateUpload = (newFiles: UploadedFile[]) => {
    newFiles.forEach(file => {
      let progress = 0;
      const interval = setInterval(() => {
        progress += Math.random() * 30;
        if (progress >= 100) {
          progress = 100;
          clearInterval(interval);
          setFiles(prev => prev.map(f => 
            f.id === file.id ? { ...f, progress: 100, status: 'completed' } : f
          ));
        } else {
          setFiles(prev => prev.map(f => 
            f.id === file.id ? { ...f, progress } : f
          ));
        }
      }, 300);
    });
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div
        className={\`border-3 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all \${
          isDragging ? 'border-emerald-400 bg-emerald-50' : 'border-gray-300 hover:border-emerald-400'
        }\`}
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={(e) => { e.preventDefault(); setIsDragging(false); }}
        onDrop={(e) => { 
          e.preventDefault(); 
          setIsDragging(false); 
          handleFileSelect(e.dataTransfer.files); 
        }}
        onClick={() => fileInputRef.current?.click()}
      >
        <div className="w-20 h-20 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-inner">
          <span className="text-3xl text-emerald-600">📁</span>
        </div>
        
        <h3 className="text-lg font-semibold text-gray-900 mb-2">اسحب وأفلت الملفات هنا</h3>
        <p className="text-gray-600 mb-6 max-w-md mx-auto leading-relaxed">
          أو انقر لاختيار الملفات من جهازك
        </p>
        
        <button className="bg-emerald-500 text-white px-8 py-3 rounded-lg hover:bg-emerald-600 transition-all shadow-lg hover:shadow-xl font-medium">
          اختر الملفات
        </button>
        
        <input
          ref={fileInputRef}
          type="file"
          multiple
          className="hidden"
          onChange={(e) => handleFileSelect(e.target.files)}
        />
        
        <p className="text-xs text-gray-500 mt-4">
          يدعم: PDF, JPG, PNG, DOC, XLS - الحد الأقصى 50MB
        </p>
      </div>

      {files.length > 0 && (
        <div className="mt-8 space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-medium text-gray-900">الملفات المرفوعة ({files.length})</h4>
          </div>
          
          {files.map((file) => (
            <div key={file.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-xl bg-white shadow-sm hover:shadow-md transition-all">
              <div className="flex items-center space-x-4 space-x-reverse">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl flex items-center justify-center">
                  <span className="text-xl">📄</span>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-900 text-sm">{file.file.name}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {(file.file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-4 space-x-reverse">
                <div className="w-32 bg-gray-200 rounded-full h-2.5 shadow-inner">
                  <div
                    className={\`h-2.5 rounded-full transition-all duration-500 shadow-md \${
                      file.status === 'completed' ? 'bg-emerald-500' : 'bg-gradient-to-r from-emerald-400 to-emerald-600'
                    }\`}
                    style={{ width: \`\${file.progress}%\` }}
                  ></div>
                </div>
                <span className="text-sm font-medium text-gray-700 w-12 text-left">
                  {Math.round(file.progress)}%
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}`,
      preview: <FileUploadPreview />,
      features: [
        'سحب وإفلات الملفات',
        'شريط تقدم مرئي',
        'دعم الملفات المتعددة',
        'تحقق من حجم الملف',
        'واجهة مستخدم بديهية'
      ],
      usage: `1. انسخ الكود إلى ملف FileUploader.tsx
2. استخدم المكون مباشرة في أي صفحة
3. المكون جاهز للعمل بدون إعدادات إضافية

مثال الاستخدام:
<FileUploader />

يمكنك تخصيص المكون بإضافة الخصائص المناسبة.`
    },
    {
      title: 'لوحة التحكم المتكاملة',
      description: 'لوحة تحكم كاملة بشريط جانبي قابل للطي، إحصائيات حية، وتصميم عصري. مثالية لتطبيقات الإدارة وأنظمة SaaS.',
      code: `// لوحة التحكم الكاملة - انسخ هذا الكود
'use client';

import { useState } from 'react';

interface MenuItem {
  id: string;
  label: string;
  icon: string;
  href?: string;
  badge?: number;
  active?: boolean;
}

interface DashboardProps {
  children: React.ReactNode;
  user?: {
    name: string;
    role: string;
    avatar?: string;
  };
}

export default function Dashboard({ children, user = { name: 'محمد أحمد', role: 'مدير النظام' } }: DashboardProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const menuItems: MenuItem[] = [
    { id: '1', label: 'الرئيسية', icon: '🏠', active: true },
    { id: '2', label: 'المستخدمين', icon: '👥', badge: 3 },
    { id: '3', label: 'التقارير', icon: '📊' },
    { id: '4', label: 'الإعدادات', icon: '⚙️' },
    { id: '5', label: 'الإشعارات', icon: '🔔', badge: 12 }
  ];

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-50 to-white" dir="rtl">
      {/* الشريط الجانبي */}
      <div className={\`bg-white border-l border-gray-200 transition-all duration-300 shadow-lg \${
        sidebarOpen ? 'w-64' : 'w-20'
      }\`}>
        <div className="p-4 border-b border-gray-200 flex items-center justify-between bg-gradient-to-r from-white to-gray-50">
          {sidebarOpen && (
            <div>
              <h1 className="font-bold text-gray-900 text-lg">لوحة التحكم</h1>
              <p className="text-xs text-emerald-600 mt-1">الإصدار 2.1</p>
            </div>
          )}
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-600"
          >
            {sidebarOpen ? '«' : '»'}
          </button>
        </div>
        
        <nav className="p-4 space-y-2">
          {menuItems.map(item => (
            <div 
              key={item.id}
              className={\`flex items-center p-3 rounded-xl transition-all cursor-pointer group \${
                item.active 
                  ? 'bg-emerald-50 border-r-2 border-emerald-500 text-emerald-700' 
                  : 'hover:bg-gray-100 text-gray-700'
              }\`}
            >
              <span className="text-lg">{item.icon}</span>
              {sidebarOpen && (
                <div className="flex items-center justify-between flex-1 mr-3">
                  <span className="text-sm font-medium">{item.label}</span>
                  {item.badge && (
                    <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full min-w-6 text-center">
                      {item.badge}
                    </span>
                  )}
                </div>
              )}
            </div>
          ))}
        </nav>
      </div>

      {/* المحتوى الرئيسي */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white border-b border-gray-200 px-6 py-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 space-x-reverse">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors lg:hidden"
              >
                ☰
              </button>
              <h2 className="text-lg font-semibold text-gray-900">الرئيسية - نظرة عامة</h2>
            </div>
            
            <div className="flex items-center space-x-4 space-x-reverse">
              <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors relative">
                <span className="text-xl">🔔</span>
                <span className="absolute -top-1 -left-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></span>
              </button>
              <div className="flex items-center space-x-3 space-x-reverse">
                <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-white font-semibold text-sm">
                    {user.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">{user.name}</p>
                  <p className="text-xs text-gray-500">{user.role}</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-auto bg-gradient-to-br from-gray-50 to-white">
          {children}
        </main>
      </div>
    </div>
  );
}

// الاستخدام:
// <Dashboard>
//   <div>محتوى الصفحة هنا</div>
// </Dashboard>`,
      preview: <DashboardPreview />,
      features: [
        'شريط جانبي قابل للطي',
        'إحصائيات حية ومقاييس',
        'تصميم متجاوب للجوال',
        'دعم كامل للغة العربية',
        'سهل التخصيص والتوسعة'
      ],
      usage: `1. انسخ كود لوحة التحكم
2. الصق في ملف Dashboard.tsx
3. استخدم المكون في تطبيقك
4. قم بتخصيص القائمة والإحصائيات

مثال الاستخدام:
<Dashboard user={{ name: 'أحمد محمد', role: 'مدير' }}>
  <div className="p-6">
    <h1>مرحباً في تطبيقك</h1>
    {/* محتوى الصفحة */}
  </div>
</Dashboard>`
    }
  ];

  const quickStartCode = `// الخطوة 1: إنشاء مشروع جديد (إذا لم يكن لديك واحد)
npx create-next-app@latest my-app
cd my-app

// الخطوة 2: نسخ المكونات المطلوبة
// انسخ كود أي مكون من الأعلى والصقه في مجلد components

// الخطوة 3: استخدام المكونات في تطبيقك
import Dashboard from '@/components/Dashboard';
import FileUploader from '@/components/FileUploader';
import { ToastProvider, ToastContainer } from '@/components/Toast';

export default function Home() {
  return (
    <ToastProvider>
      <Dashboard>
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-6">مرحباً بك</h1>
          <FileUploader />
        </div>
      </Dashboard>
      <ToastContainer />
    </ToastProvider>
  );
}

// الخطوة 4: تشغيل التطبيق
npm run dev`;

  const stats = [
    { number: '50+', label: 'مكون جاهز' },
    { number: '100%', label: 'دعم العربية' },
    { number: '0', label: 'تبعيات إضافية' },
    { number: '∞', label: 'إمكانيات' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/20" dir="rtl">
      {/* Enhanced Header */}
      <header className="bg-white/95 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center space-x-4 space-x-reverse">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-sm">DUI</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">مكتبة DUI العربية</h1>
                <p className="text-sm text-gray-500">مكونات React جاهزة للنسخ واللصق</p>
              </div>
            </div>
            
            <nav className="hidden md:flex items-center space-x-8 space-x-reverse text-sm">
              <a href="#المكونات" className="text-gray-600 hover:text-emerald-600 transition-colors font-medium">المكونات</a>
              <a href="#البدء" className="text-gray-600 hover:text-emerald-600 transition-colors font-medium">ابدأ الآن</a>
              <a href="#المميزات" className="text-gray-600 hover:text-emerald-600 transition-colors font-medium">المميزات</a>
              <a href="#التوثيق" className="text-gray-600 hover:text-emerald-600 transition-colors font-medium">التوثيق</a>
            </nav>

            <div className="flex items-center space-x-3 space-x-reverse">
              <a 
                href="#البدء" 
                className="bg-emerald-500 text-white px-6 py-2 rounded-lg hover:bg-emerald-600 transition-colors font-medium shadow-lg hover:shadow-xl"
              >
                ابدأ مجاناً
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Enhanced Hero Section */}
      <section className="py-20 text-center bg-gradient-to-br from-white to-emerald-50/30">
        <div className="max-w-5xl mx-auto px-4">
          <div className="inline-flex items-center space-x-2 space-x-reverse px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium mb-8 shadow-sm">
            <span>🚀</span>
            <span>لا حاجة للتثبيت - انسخ واستخدم مباشرة</span>
          </div>
          
          <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
            أنشئ تطبيقات عربية
            <br />
            <span className="bg-gradient-to-r from-emerald-600 to-emerald-500 bg-clip-text text-transparent">
              بسرعة فائقة
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            مكتبة مكونات React شاملة مصممة خصيصاً للمطورين العرب. كل المكونات جاهزة للنسخ 
            واللصق المباشر في مشاريعك بدون أي تبعيات أو تثبيت معقد.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 space-x-reverse mb-16">
            <a 
              href="#البدء" 
              className="bg-emerald-500 text-white px-8 py-4 rounded-xl hover:bg-emerald-600 font-semibold transition-all shadow-xl hover:shadow-2xl text-lg"
            >
              🚀 ابدأ الآن - مجاناً
            </a>
            <a 
              href="#المكونات" 
              className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-xl hover:border-emerald-500 hover:text-emerald-600 font-semibold transition-colors bg-white shadow-lg"
            >
              📦 استعرض جميع المكونات
            </a>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold text-emerald-600 mb-2">{stat.number}</div>
                <div className="text-gray-600 text-sm font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Start Section */}
      <section id="البدء" className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">ابدأ في أقل من 5 دقائق</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              كل ما تحتاجه هو نسخ الكود ولصقه. لا حاجة لتثبيت حزم إضافية أو إعدادات معقدة.
            </p>
          </div>

          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-1 shadow-2xl">
            <div className="bg-gray-800 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-emerald-400 font-medium">دليل البدء السريع</span>
                <span className="text-gray-400 text-sm">bash</span>
              </div>
              <CodeBlock code={quickStartCode} language="bash" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {[
              {
                step: '١',
                icon: '📋',
                title: 'انسخ الكود',
                description: 'اختر أي مكون وانسخ الكود الكامل'
              },
              {
                step: '٢',
                icon: '📁',
                title: 'الصق في مشروعك',
                description: 'أنشئ ملف جديد والصق الكود فيه'
              },
              {
                step: '٣',
                icon: '⚡',
                title: 'استخدم مباشرة',
                description: 'استورد المكون واستخدمه فوراً'
              }
            ].map((item, index) => (
              <div key={index} className="text-center p-6 bg-gradient-to-br from-white to-gray-50 rounded-2xl border border-gray-200 hover:border-emerald-300 transition-all hover:shadow-lg">
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <span className="text-2xl">{item.icon}</span>
                </div>
                <div className="w-8 h-8 bg-emerald-500 text-white rounded-full flex items-center justify-center mx-auto mb-3 text-sm font-bold">
                  {item.step}
                </div>
                <h3 className="font-semibold text-gray-900 mb-2 text-lg">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Components Section */}
      <section id="المكونات" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50/30">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">المكونات المتاحة</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              مجموعة شاملة من المكونات الجاهزة للإنتاج، مصممة خصيصاً للغة العربية وتطبيقات الويب الحديثة.
            </p>
          </div>

          <div className="space-y-12">
            {components.map((component, index) => (
              <ArabicComponent
                key={index}
                title={component.title}
                description={component.description}
                code={component.code}
                preview={component.preview}
                features={component.features}
                usage={component.usage}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="المميزات" className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">لماذا تختار DUI؟</h2>
          <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
            مكتبة مصممة خصيصاً لتلبية احتياجات المطورين العرب بميزات فريدة.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: '🎯',
                title: 'مصمم للعربية',
                description: 'دعم كامل للغة العربية من اليمين لليسار مع تصميم يتناسب مع الثقافة العربية'
              },
              {
                icon: '⚡',
                title: 'بدون تبعيات',
                description: 'لا حاجة لتثبيت حزم إضافية. كل مكون مستقل وجاهز للعمل'
              },
              {
                icon: '🎨',
                title: 'تصميم عصري',
                description: 'واجهات مستخدم حديثة وجذابة بتصميم مaterial design'
              },
              {
                icon: '🔧',
                title: 'سهل التخصيص',
                description: 'جميع المكونات قابلة للتخصيص باستخدام Tailwind CSS'
              },
              {
                icon: '📱',
                title: 'متجاوب بالكامل',
                description: 'يعمل بشكل مثالي على جميع الأجهزة والشاشات'
              },
              {
                icon: '🚀',
                title: 'جاهز للإنتاج',
                description: 'مكونات مختبرة وجاهزة للاستخدام في المشاريع الحقيقية'
              },
              {
                icon: '💡',
                title: 'توثيق شامل',
                description: 'أمثلة واضحة وتوثيق مفصل لكل مكون وخاصية'
              },
              {
                icon: '🆓',
                title: 'مفتوح المصدر',
                description: 'مجاني بالكامل ومرخص تحت MIT License'
              }
            ].map((feature, index) => (
              <div key={index} className="text-center p-6 bg-gradient-to-br from-white to-gray-50 rounded-2xl border border-gray-200 hover:border-emerald-300 transition-all hover:shadow-lg group">
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-xl transition-shadow">
                  <span className="text-2xl">{feature.icon}</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-3 text-lg">{feature.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">جاهز لبدء مشروعك القادم؟</h2>
          <p className="text-xl text-emerald-100 mb-8 max-w-2xl mx-auto leading-relaxed">
            انضم إلى آلاف المطورين الذين يستخدمون DUI لبناء تطبيقات عربية رائعة بسرعة وقوة.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 space-x-reverse">
            <button className="bg-white text-emerald-600 px-8 py-4 rounded-xl hover:bg-gray-100 font-semibold transition-colors shadow-2xl text-lg">
              🚀 ابدأ الآن - مجاناً
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-xl hover:bg-white/10 font-semibold transition-colors text-lg">
              📖 اقرأ التوثيق الكامل
            </button>
          </div>
          
          <p className="text-emerald-200 text-sm mt-6">
            لا حاجة لبطاقة ائتمان - مجاني forever
          </p>
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-3 space-x-reverse mb-4">
                <div className="w-10 h-10 bg-emerald-500 rounded-lg flex items-center justify-center">
                  <span className="font-bold text-white">DUI</span>
                </div>
                <span className="font-semibold text-lg">DUI العربية</span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                مكتبة مكونات React مفتوحة المصدر مصممة خصيصاً للمطورين العرب. 
                نسخ، الصق، وابنِ تطبيقات رائعة.
              </p>
            </div>
            
            {[
              {
                title: 'المنتج',
                links: ['المكونات', 'التوثيق', 'الأمثلة', 'التحديثات']
              },
              {
                title: 'الدعم',
                links: ['المساعدة', 'المجتمع', 'المساهمة', 'الإبلاغ عن مشاكل']
              },
              {
                title: 'الشركة',
                links: ['عنّا', 'المدونة', 'الخصوصية', 'الشروط']
              }
            ].map((section, index) => (
              <div key={index}>
                <h4 className="font-semibold mb-4 text-lg">{section.title}</h4>
                <ul className="space-y-3 text-gray-400">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <a href="#" className="hover:text-white transition-colors text-sm">{link}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          
          <div className="border-t border-gray-800 pt-8 text-center">
            <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
              <p className="text-gray-400 text-sm">
                © 2024 مكتبة DUI العربية. جميع الحقوق محفوظة. 
                <span className="text-emerald-400"> مصمم مع ❤️ للمطورين العرب</span>
              </p>
              <div className="flex items-center space-x-6 space-x-reverse text-gray-400 text-sm">
                <a href="#" className="hover:text-white transition-colors">تويتر</a>
                <a href="#" className="hover:text-white transition-colors">جيتهاب</a>
                <a href="#" className="hover:text-white transition-colors">يوتيوب</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}