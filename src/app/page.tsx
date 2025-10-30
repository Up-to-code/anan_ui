// app/dui-docs/page.tsx
'use client';

import { useState, useRef, ChangeEvent } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

// Apple-inspired Code Block
const CodeBlock = ({ code, title, language = "tsx" }: { 
  code: string; 
  title: string;
  language?: string;
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code: ', err);
    }
  };

  return (
    <div className="relative">
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm text-gray-600 font-semibold">{title}</span>
        <button
          onClick={handleCopy}
          className="px-3 py-1.5 text-sm bg-gray-800 text-white rounded-lg border border-gray-700 hover:bg-gray-700 transition-colors font-medium"
        >
          {copied ? '✅ تم النسخ' : '📋 نسخ الكود'}
        </button>
      </div>

      <div className="rounded-xl overflow-hidden border border-gray-700">
        <div className="flex items-center px-4 py-3 bg-gray-800 border-b border-gray-700">
          <div className="flex space-x-2 mr-3">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          </div>
          <span className="text-gray-300 text-sm font-medium">index.tsx</span>
        </div>
        
        <SyntaxHighlighter 
          language={language}
          style={atomDark}
          customStyle={{ 
            margin: 0,
            padding: '1.5rem',
            fontSize: '0.875rem',
            lineHeight: '1.5',
            background: '#1a1a1a',
            border: 'none'
          }}
          showLineNumbers
        >
          {code}
        </SyntaxHighlighter>
      </div>
    </div>
  );
};

// Apple-inspired Component Showcase
const AppleComponent = ({ 
  title, 
  description, 
  code, 
  preview 
}: {
  title: string;
  description: string;
  code: string;
  preview: React.ReactNode;
}) => {
  const [activeTab, setActiveTab] = useState<'preview' | 'code'>('preview');

  return (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
      <div className="p-6 border-b border-gray-200 bg-gray-50">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600 font-medium">{description}</p>
      </div>

      <div className="border-b border-gray-200">
        <div className="flex">
          <button
            onClick={() => setActiveTab('preview')}
            className={`flex-1 py-4 text-sm font-bold border-b-2 transition-colors ${
              activeTab === 'preview' 
                ? 'border-blue-500 text-blue-600' 
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            👁️ المعاينة
          </button>
          <button
            onClick={() => setActiveTab('code')}
            className={`flex-1 py-4 text-sm font-bold border-b-2 transition-colors ${
              activeTab === 'code' 
                ? 'border-blue-500 text-blue-600' 
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            💻 الكود
          </button>
        </div>
      </div>

      <div className="p-6">
        {activeTab === 'preview' && (
          <div className="flex justify-center p-8 bg-gray-50 rounded-xl border border-gray-200">
            {preview}
          </div>
        )}
        {activeTab === 'code' && <CodeBlock code={code} title="الكود الكامل" />}
      </div>
    </div>
  );
};

// Preview Components with Apple UI style
const ToastPreview = () => {
  const [toasts, setToasts] = useState<Array<{id: number, type: string, title: string, message: string}>>([]);

  const addToast = (type: string) => {
    const newToast = {
      id: Date.now(),
      type,
      title: type === 'success' ? 'تم الحفظ بنجاح' : 
             type === 'error' ? 'حدث خطأ' :
             type === 'warning' ? 'تحذير' : 'معلومة',
      message: 'تمت العملية بنجاح في النظام'
    };
    setToasts(prev => [...prev, newToast]);
    
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== newToast.id));
    }, 4000);
  };

  return (
    <div className="space-y-6 text-center">
      <div className="flex flex-wrap gap-3 justify-center">
        <button 
          onClick={() => addToast('success')}
          className="px-4 py-2.5 bg-green-500 text-white rounded-xl text-sm font-bold hover:bg-green-600 transition-colors"
        >
          نجاح
        </button>
        <button 
          onClick={() => addToast('error')}
          className="px-4 py-2.5 bg-red-500 text-white rounded-xl text-sm font-bold hover:bg-red-600 transition-colors"
        >
          خطأ
        </button>
        <button 
          onClick={() => addToast('warning')}
          className="px-4 py-2.5 bg-yellow-500 text-white rounded-xl text-sm font-bold hover:bg-yellow-600 transition-colors"
        >
          تحذير
        </button>
      </div>
      
      <div className="fixed top-6 left-6 space-y-3 z-50">
        {toasts.map(toast => (
          <div 
            key={toast.id}
            className={`p-4 rounded-2xl border-l-4 max-w-sm backdrop-blur-sm ${
              toast.type === 'success' ? 'bg-green-50 border-green-500' :
              toast.type === 'error' ? 'bg-red-50 border-red-500' :
              'bg-yellow-50 border-yellow-500'
            }`}
          >
            <div className="text-right">
              <p className="font-bold text-gray-900 text-sm">{toast.title}</p>
              <p className="text-gray-600 text-sm mt-1 font-medium">{toast.message}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const FileUploadPreview = () => {
  const [files, setFiles] = useState<Array<{id: string, name: string, size: string, progress: number}>>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (!selectedFiles) return;

    const newFiles = Array.from(selectedFiles).map(file => ({
      id: Math.random().toString(36).substring(2, 9),
      name: file.name,
      size: (file.size / 1024 / 1024).toFixed(2),
      progress: 0
    }));
    
    setFiles(prev => [...prev, ...newFiles]);
    
    // Simulate upload progress
    newFiles.forEach(file => {
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
    <div className="space-y-6 text-center max-w-md mx-auto">
      <div 
        className="border-2 border-dashed border-gray-300 rounded-2xl p-8 cursor-pointer hover:border-blue-400 transition-colors bg-white"
        onClick={() => fileInputRef.current?.click()}
      >
        <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <span className="text-2xl text-blue-600">📁</span>
        </div>
        <p className="text-gray-600 mb-4 font-medium">اسحب الملفات هنا أو انقر للرفع</p>
        <button className="bg-blue-500 text-white px-6 py-3 rounded-xl text-sm font-bold hover:bg-blue-600 transition-colors">
          اختر الملفات
        </button>
        <input 
          ref={fileInputRef}
          type="file" 
          multiple 
          onChange={handleFileChange}
          className="hidden" 
        />
      </div>
      
      {files.length > 0 && (
        <div className="space-y-3">
          {files.map(file => (
            <div key={file.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-xl bg-white">
              <div className="flex items-center">
                <span className="ml-3 text-lg">📄</span>
                <div className="text-right">
                  <p className="font-bold text-sm text-gray-900">{file.name}</p>
                  <p className="text-xs text-gray-500 font-medium">{file.size} MB</p>
                </div>
              </div>
              <div className="w-24 bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-green-500 h-2 rounded-full transition-all"
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
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 max-w-md mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h4 className="font-bold text-gray-900 text-lg">لوحة التحكم</h4>
        <button 
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
        >
          ☰
        </button>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
          <p className="text-xs text-gray-600 font-medium">المستخدمين</p>
          <p className="text-xl font-bold text-gray-900">١,٢٣٤</p>
        </div>
        <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
          <p className="text-xs text-gray-600 font-medium">الإيرادات</p>
          <p className="text-xl font-bold text-gray-900">٥٦,٧٨٩</p>
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="flex items-center p-3 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors">
          <span className="ml-3">🏠</span>
          <span className="text-sm font-bold text-gray-700">الرئيسية</span>
        </div>
        <div className="flex items-center p-3 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors">
          <span className="ml-3">👥</span>
          <span className="text-sm font-bold text-gray-700">المستخدمين</span>
        </div>
        <div className="flex items-center p-3 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors">
          <span className="ml-3">⚙️</span>
          <span className="text-sm font-bold text-gray-700">الإعدادات</span>
        </div>
      </div>
    </div>
  );
};

const ModalPreview = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="text-center">
      <button 
        onClick={() => setIsOpen(true)}
        className="bg-purple-500 text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-purple-600 transition-colors"
      >
        فتح النافذة
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full border border-gray-200">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-gray-900">نافذة منبثقة</h3>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-gray-500 hover:text-gray-700 p-1 rounded-lg hover:bg-gray-100 transition-colors"
              >
                ✕
              </button>
            </div>
            <p className="text-gray-600 text-sm mb-6 font-medium">
              هذه نافذة منبثقة تجريبية. يمكنك إضافة أي محتوى هنا.
            </p>
            <div className="flex gap-3">
              <button 
                onClick={() => setIsOpen(false)}
                className="flex-1 bg-gray-500 text-white py-2.5 rounded-xl text-sm font-bold hover:bg-gray-600 transition-colors"
              >
                إغلاق
              </button>
              <button className="flex-1 bg-purple-500 text-white py-2.5 rounded-xl text-sm font-bold hover:bg-purple-600 transition-colors">
                موافق
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const FormPreview = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form data:', formData);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm text-gray-600 mb-2 font-bold">الاسم الكامل</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-xl text-sm font-medium focus:border-blue-500 focus:outline-none"
            placeholder="أدخل اسمك الكامل"
          />
        </div>
        
        <div>
          <label className="block text-sm text-gray-600 mb-2 font-bold">البريد الإلكتروني</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-xl text-sm font-medium focus:border-blue-500 focus:outline-none"
            placeholder="example@email.com"
          />
        </div>
        
        <div>
          <label className="block text-sm text-gray-600 mb-2 font-bold">الرسالة</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={4}
            className="w-full p-3 border border-gray-300 rounded-xl text-sm font-medium focus:border-blue-500 focus:outline-none"
            placeholder="اكتب رسالتك هنا..."
          />
        </div>
        
        <button 
          type="submit"
          className="w-full bg-green-500 text-white py-3 rounded-xl text-sm font-bold hover:bg-green-600 transition-colors"
        >
          إرسال الرسالة
        </button>
      </form>
    </div>
  );
};

const TablePreview = () => {
  const users = [
    { id: 1, name: 'أحمد محمد', email: 'ahmed@example.com', role: 'مدير' },
    { id: 2, name: 'فاطمة علي', email: 'fatima@example.com', role: 'مستخدم' },
    { id: 3, name: 'خالد عبدالله', email: 'khaled@example.com', role: 'محرر' }
  ];

  return (
    <div className="overflow-x-auto border border-gray-200 rounded-2xl">
      <table className="w-full">
        <thead>
          <tr className="bg-gray-50 border-b border-gray-200">
            <th className="p-4 text-sm font-bold text-gray-900 text-right">الاسم</th>
            <th className="p-4 text-sm font-bold text-gray-900 text-right">البريد</th>
            <th className="p-4 text-sm font-bold text-gray-900 text-right">الدور</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr 
              key={user.id} 
              className={`border-b border-gray-200 hover:bg-gray-50 transition-colors ${
                index === users.length - 1 ? 'border-b-0' : ''
              }`}
            >
              <td className="p-4 text-sm font-medium text-gray-900">{user.name}</td>
              <td className="p-4 text-sm font-medium text-gray-600">{user.email}</td>
              <td className="p-4 text-sm font-medium text-gray-600">{user.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const CardPreview = () => {
  return (
    <div className="max-w-sm mx-auto">
      <div className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-shadow">
        <div className="w-full h-48 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl mb-4 flex items-center justify-center">
          <span className="text-blue-600 text-4xl">📱</span>
        </div>
        <h3 className="font-bold text-xl text-gray-900 mb-2">تطبيق الجوال</h3>
        <p className="text-gray-600 text-sm mb-4 font-medium leading-relaxed">
          تطبيق متكامل لإدارة المهام اليومية مع واجهة مستخدم بديهية وتصميم عصري.
        </p>
        <div className="flex justify-between items-center">
          <span className="font-bold text-green-600 text-lg">٩٩ ر.س</span>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-blue-600 transition-colors">
            شراء الآن
          </button>
        </div>
      </div>
    </div>
  );
};

export default function DUIDocs() {
  const components = [
    {
      title: 'نظام الإشعارات',
      description: 'عرض رسائل تنبيه للمستخدم بأنواع مختلفة',
      code: `import { useState } from 'react';

interface Toast {
  id: number;
  type: string;
  title: string;
  message: string;
}

export function ToastSystem() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = (type: string) => {
    const newToast = {
      id: Date.now(),
      type,
      title: type === 'success' ? 'تم الحفظ بنجاح' : 'حدث خطأ',
      message: 'تمت العملية بنجاح في النظام'
    };
    setToasts(prev => [...prev, newToast]);
    
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== newToast.id));
    }, 4000);
  };

  return (
    <div className="space-y-4">
      <button 
        onClick={() => addToast('success')}
        className="bg-green-500 text-white px-4 py-2.5 rounded-xl text-sm font-bold hover:bg-green-600 transition-colors"
      >
        عرض إشعار نجاح
      </button>
      
      <div className="fixed top-6 left-6 space-y-3 z-50">
        {toasts.map(toast => (
          <div 
            key={toast.id}
            className={\`p-4 rounded-2xl border-l-4 max-w-sm backdrop-blur-sm \${
              toast.type === 'success' ? 'bg-green-50 border-green-500' : 'bg-red-50 border-red-500'
            }\`}
          >
            <div className="text-right">
              <p className="font-bold text-gray-900 text-sm">{toast.title}</p>
              <p className="text-gray-600 text-sm mt-1 font-medium">{toast.message}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}`,
      preview: <ToastPreview />
    },
    {
      title: 'منصة رفع الملفات',
      description: 'رفع ملفات متعددة مع متابعة التقدم',
      code: `import { useState, useRef, ChangeEvent } from 'react';

interface FileItem {
  id: string;
  name: string;
  size: string;
  progress: number;
}

export function FileUpload() {
  const [files, setFiles] = useState<FileItem[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (!selectedFiles) return;

    const newFiles: FileItem[] = Array.from(selectedFiles).map(file => ({
      id: Math.random().toString(36).substring(2, 9),
      name: file.name,
      size: (file.size / 1024 / 1024).toFixed(2),
      progress: 0
    }));
    
    setFiles(prev => [...prev, ...newFiles]);
    
    // محاكاة تقدم الرفع
    newFiles.forEach(file => {
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
    <div className="max-w-md mx-auto space-y-6">
      <div 
        className="border-2 border-dashed border-gray-300 rounded-2xl p-8 cursor-pointer hover:border-blue-400 transition-colors bg-white text-center"
        onClick={() => fileInputRef.current?.click()}
      >
        <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <span className="text-2xl text-blue-600">📁</span>
        </div>
        <p className="text-gray-600 mb-4 font-medium">اسحب الملفات هنا أو انقر للرفع</p>
        <button className="bg-blue-500 text-white px-6 py-3 rounded-xl text-sm font-bold hover:bg-blue-600 transition-colors">
          اختر الملفات
        </button>
        <input 
          ref={fileInputRef}
          type="file" 
          multiple 
          onChange={handleFileChange}
          className="hidden" 
        />
      </div>

      {files.length > 0 && (
        <div className="space-y-3">
          {files.map(file => (
            <div key={file.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-xl bg-white">
              <div className="flex items-center">
                <span className="ml-3 text-lg">📄</span>
                <div className="text-right">
                  <p className="font-bold text-sm text-gray-900">{file.name}</p>
                  <p className="text-xs text-gray-500 font-medium">{file.size} MB</p>
                </div>
              </div>
              <div className="w-24 bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-green-500 h-2 rounded-full transition-all"
                  style={{ width: \`\${file.progress}%\` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}`,
      preview: <FileUploadPreview />
    },
    {
      title: 'لوحة التحكم',
      description: 'هيكل متكامل لإدارة التطبيقات',
      code: `import { useState } from 'react';

interface MenuItem {
  id: number;
  label: string;
  icon: string;
}

export function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const menuItems: MenuItem[] = [
    { id: 1, label: 'الرئيسية', icon: '🏠' },
    { id: 2, label: 'المستخدمين', icon: '👥' },
    { id: 3, label: 'الإعدادات', icon: '⚙️' }
  ];

  return (
    <div className="flex bg-gray-50 min-h-64 rounded-2xl border border-gray-200 overflow-hidden">
      {/* الشريط الجانبي */}
      <div className={\`bg-white border-l border-gray-200 \${sidebarOpen ? 'w-64' : 'w-16'} transition-all\`}>
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          {sidebarOpen && <h2 className="font-bold text-gray-900">لوحة التحكم</h2>}
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
          >
            {sidebarOpen ? '«' : '»'}
          </button>
        </div>
        
        <nav className="p-4 space-y-2">
          {menuItems.map(item => (
            <div 
              key={item.id}
              className="flex items-center p-3 rounded-xl hover:bg-gray-100 cursor-pointer transition-colors"
            >
              <span className="ml-3 text-lg">{item.icon}</span>
              {sidebarOpen && <span className="text-sm font-bold text-gray-700">{item.label}</span>}
            </div>
          ))}
        </nav>
      </div>

      {/* المحتوى الرئيسي */}
      <div className="flex-1 p-6">
        <h1 className="text-xl font-bold text-gray-900 mb-6">مرحباً باللوحة الرئيسية</h1>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-xl border border-gray-200">
            <p className="text-sm text-gray-600 font-medium">المستخدمين</p>
            <p className="text-2xl font-bold text-gray-900">١,٢٣٤</p>
          </div>
          <div className="bg-white p-4 rounded-xl border border-gray-200">
            <p className="text-sm text-gray-600 font-medium">الإيرادات</p>
            <p className="text-2xl font-bold text-gray-900">٥٦,٧٨٩</p>
          </div>
        </div>
      </div>
    </div>
  );
}`,
      preview: <DashboardPreview />
    },
    {
      title: 'النوافذ المنبثقة',
      description: 'عرض محتوى مهم في نافذة ظاهرة',
      code: `import { useState } from 'react';

export function Modal() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button 
        onClick={() => setIsOpen(true)}
        className="bg-purple-500 text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-purple-600 transition-colors"
      >
        فتح النافذة
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full border border-gray-200">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-gray-900">نافذة منبثقة</h3>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-gray-500 hover:text-gray-700 p-1 rounded-lg hover:bg-gray-100 transition-colors"
              >
                ✕
              </button>
            </div>
            <p className="text-gray-600 text-sm mb-6 font-medium">
              هذه نافذة منبثقة تجريبية. يمكنك إضافة أي محتوى هنا.
            </p>
            <div className="flex gap-3">
              <button 
                onClick={() => setIsOpen(false)}
                className="flex-1 bg-gray-500 text-white py-2.5 rounded-xl text-sm font-bold hover:bg-gray-600 transition-colors"
              >
                إغلاق
              </button>
              <button className="flex-1 bg-purple-500 text-white py-2.5 rounded-xl text-sm font-bold hover:bg-purple-600 transition-colors">
                موافق
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}`,
      preview: <ModalPreview />
    },
    {
      title: 'نماذج الإدخال',
      description: 'نموذج متكامل لإدخال البيانات',
      code: `import { useState, ChangeEvent, FormEvent } from 'react';

interface FormData {
  name: string;
  email: string;
  message: string;
}

export function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log('Form data:', formData);
    // معالجة البيانات هنا
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
      <div>
        <label className="block text-sm text-gray-600 mb-2 font-bold">الاسم الكامل</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-xl text-sm font-medium focus:border-blue-500 focus:outline-none"
          placeholder="أدخل اسمك الكامل"
          required
        />
      </div>
      
      <div>
        <label className="block text-sm text-gray-600 mb-2 font-bold">البريد الإلكتروني</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-xl text-sm font-medium focus:border-blue-500 focus:outline-none"
          placeholder="example@email.com"
          required
        />
      </div>
      
      <div>
        <label className="block text-sm text-gray-600 mb-2 font-bold">الرسالة</label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={4}
          className="w-full p-3 border border-gray-300 rounded-xl text-sm font-medium focus:border-blue-500 focus:outline-none"
          placeholder="اكتب رسالتك هنا..."
          required
        />
      </div>
      
      <button 
        type="submit"
        className="w-full bg-green-500 text-white py-3 rounded-xl text-sm font-bold hover:bg-green-600 transition-colors"
      >
        إرسال الرسالة
      </button>
    </form>
  );
}`,
      preview: <FormPreview />
    },
    {
      title: 'جداول البيانات',
      description: 'عرض البيانات في جداول منظمة',
      code: `interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

export function UsersTable() {
  const users: User[] = [
    { id: 1, name: 'أحمد محمد', email: 'ahmed@example.com', role: 'مدير' },
    { id: 2, name: 'فاطمة علي', email: 'fatima@example.com', role: 'مستخدم' },
    { id: 3, name: 'خالد عبدالله', email: 'khaled@example.com', role: 'محرر' }
  ];

  return (
    <div className="overflow-x-auto border border-gray-200 rounded-2xl">
      <table className="w-full">
        <thead>
          <tr className="bg-gray-50 border-b border-gray-200">
            <th className="p-4 text-sm font-bold text-gray-900 text-right">الاسم</th>
            <th className="p-4 text-sm font-bold text-gray-900 text-right">البريد</th>
            <th className="p-4 text-sm font-bold text-gray-900 text-right">الدور</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr 
              key={user.id} 
              className={\`border-b border-gray-200 hover:bg-gray-50 transition-colors \${
                index === users.length - 1 ? 'border-b-0' : ''
              }\`}
            >
              <td className="p-4 text-sm font-medium text-gray-900">{user.name}</td>
              <td className="p-4 text-sm font-medium text-gray-600">{user.email}</td>
              <td className="p-4 text-sm font-medium text-gray-600">{user.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}`,
      preview: <TablePreview />
    },
    {
      title: 'البطاقات التفاعلية',
      description: 'عرض المحتوى في بطاقات جذابة',
      code: `export function ProductCard() {
  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-shadow">
      <div className="w-full h-48 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl mb-4 flex items-center justify-center">
        <span className="text-blue-600 text-4xl">📱</span>
      </div>
      <h3 className="font-bold text-xl text-gray-900 mb-2">تطبيق الجوال</h3>
      <p className="text-gray-600 text-sm mb-4 font-medium leading-relaxed">
        تطبيق متكامل لإدارة المهام اليومية مع واجهة مستخدم بديهية وتصميم عصري.
      </p>
      <div className="flex justify-between items-center">
        <span className="font-bold text-green-600 text-lg">٩٩ ر.س</span>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-blue-600 transition-colors">
          شراء الآن
        </button>
      </div>
    </div>
  );
}`,
      preview: <CardPreview />
    }
  ];

  const quickStartCode = `// الخطوة 1: انسخ كود أي مكون من الأعلى
// الخطوة 2: الصق في ملف في مشروعك
// الخطوة 3: استخدم مباشرة

// مثال استخدام نظام الإشعارات:
import { ToastSystem } from './components/Toast';

function App() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">تطبيقي</h1>
      <ToastSystem />
    </div>
  );
}

// مثال استخدام لوحة التحكم:
import { Dashboard } from './components/Dashboard';

function AdminPanel() {
  return (
    <Dashboard>
      <div className="p-6">
        <h2 className="text-xl font-bold">مرحباً في لوحة التحكم</h2>
      </div>
    </Dashboard>
  );
}`;

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">DUI</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">مكتبة DUI</h1>
                <p className="text-sm text-gray-500 font-medium">مكونات React عربية جاهزة</p>
              </div>
            </div>
            
            <nav className="flex items-center space-x-8 text-sm">
              <a href="#مكونات" className="text-gray-600 hover:text-blue-600 font-bold">المكونات</a>
              <a href="#بدأ" className="text-gray-600 hover:text-blue-600 font-bold">ابدأ الآن</a>
              <a href="#استخدام" className="text-gray-600 hover:text-blue-600 font-bold">كيفية الاستخدام</a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="py-16 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            مكتبة مكونات React
            <br />
            <span className="text-blue-600">جاهزة للنسخ والاستخدام</span>
          </h1>
          
          <p className="text-lg text-gray-600 mb-8 font-medium max-w-2xl mx-auto">
            كل المكونات مصممة خصيصاً للغة العربية وجاهزة للنسخ والصق مباشرة في مشروعك
          </p>
        </div>
      </section>

      {/* Quick Start */}
      <section id="بدأ" className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">ابدأ في دقائق</h2>
            <p className="text-gray-600 font-medium">انسخ الكود وابدأ فوراً</p>
          </div>

          <CodeBlock code={quickStartCode} title="دليل البدء السريع" language="tsx" />
        </div>
      </section>

      {/* Components */}
      <section id="مكونات" className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">المكونات المتاحة</h2>
            <p className="text-lg text-gray-600 font-medium max-w-2xl mx-auto">
              اختر أي مكون من القائمة أدناه وانسخ كوده للاستخدام المباشر
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {components.map((component, index) => (
              <AppleComponent
                key={index}
                title={component.title}
                description={component.description}
                code={component.code}
                preview={component.preview}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-12">لماذا تختار DUI؟</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'نسخ ولصق',
                description: 'لا حاجة للتثبيت'
              },
              {
                title: 'تصميم آبل',
                description: 'واجهة مستخدم حديثة'
              },
              {
                title: 'عربية بالكامل',
                description: 'مصممة للغة العربية'
              },
              {
                title: 'TypeScript',
                description: 'مدعومة بالكامل'
              },
              {
                title: 'متجاوبة',
                description: 'تعمل على جميع الأجهزة'
              },
              {
                title: 'مفتوحة المصدر',
                description: 'مجانية forever'
              }
            ].map((feature, index) => (
              <div key={index} className="text-center p-6">
                <h3 className="font-bold text-gray-900 text-lg mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm font-medium">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-lg">DUI</span>
          </div>
          <p className="text-gray-400 font-medium">
            مكتبة DUI - مكونات React عربية جاهزة
          </p>
          <p className="text-gray-500 text-sm mt-2 font-medium">
            انسخ، الصق، استخدم في أي مكان
          </p>
        </div>
      </footer>
    </div>
  );
}