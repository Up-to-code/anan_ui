// app/dui-docs/page.tsx
'use client';

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

export default function DUIDocs() {
  const components = [
    {
      name: 'نظام الإشعارات',
      icon: '💬',
      description: 'إشعارات عائمة مع دعم لأنواع متعددة وأوقات تلقائية',
      code: `import { useToast } from '@/components/ui/ToastContext'

function MyComponent() {
  const { addToast } = useToast()

  const handleSuccess = () => {
    addToast({
      title: 'تم الحفظ بنجاح',
      message: 'تم حفظ البيانات في النظام',
      type: 'success',
      duration: 5000
    })
  }

  return (
    <button 
      onClick={handleSuccess}
      className="bg-blue-600 text-white px-4 py-2 rounded"
    >
      حفظ البيانات
    </button>
  )
}`,
      usage: `// أنواع الإشعارات المتاحة
addToast({ title: 'نجاح', type: 'success' })
addToast({ title: 'خطأ', type: 'error' })
addToast({ title: 'تحذير', type: 'warning' })
addToast({ title: 'معلومة', type: 'info' })`
    },
    {
      name: 'رفع الملفات',
      icon: '📁',
      description: 'مكون متقدم لرفع الملفات مع سحب وإفلات وتتبع التقدم',
      code: `'use client'

import FileUploader from '@/components/common/FileUploader'

export default function UploadPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">رفع الملفات</h1>
      <FileUploader />
    </div>
  )
}`,
      usage: `// الخصائص المتاحة
<FileUploader
  maxSize={10} // بالـ MB
  acceptedTypes=".pdf,.jpg,.png"
  onUploadComplete={(files) => console.log(files)}
/>`
    },
    {
      name: 'لوحة التحكم',
      icon: '📊',
      description: 'هيكل متكامل للوحة التحكم بشريط جانبي قابل للطي',
      code: `import Dashboard from '@/components/Dashboard'

const sidebarData = [
  {
    id: 'home',
    label: 'الرئيسية',
    icon: '🏠',
    href: '/'
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
]

export default function AdminPage() {
  return (
    <Dashboard 
      sidebarData={sidebarData}
      sidebarProps={{
        logo: { text: 'تطبيقي', icon: '🎯' }
      }}
    >
      <div className="p-6">
        <h1>مرحباً في لوحة التحكم</h1>
        {/* محتوى الصفحة */}
      </div>
    </Dashboard>
  )
}`,
      usage: `// بيانات الشريط الجانبي
const sidebarData = [
  {
    id: 'unique-id',
    label: 'العنوان',
    icon: '🎯',
    href: '/path',
    badge: '5', // إشعار
    children: [] // قائمة فرعية
  }
]`
    },
    {
      name: 'نماذج الإدخال',
      icon: '📝',
      description: 'حقول إدخال مخصصة مع تحقق من الصحة وتصميم متجاوب',
      code: `import { useState } from 'react'

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('بيانات النموذج:', formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          الاسم الكامل
        </label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({...formData, name: e.target.value})}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="أدخل اسمك"
        />
      </div>

      <button 
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
      >
        إرسال
      </button>
    </form>
  )
}`,
      usage: `// أنواع الحقول المدعومة
<input type="text" placeholder="نص عادي" />
<input type="email" placeholder="بريد إلكتروني" />
<input type="password" placeholder="كلمة المرور" />
<textarea placeholder="نص طويل" rows={4} />`
    }
  ];

  const installationCode = `// 1. تثبيت المكتبات المطلوبة
npm install react-syntax-highlighter

// 2. استيراد المكونات في مشروعك
import { ToastProvider } from '@/components/ui/ToastContext'
import FileUploader from '@/components/common/FileUploader'
import Dashboard from '@/components/Dashboard'

// 3. استخدامها في التطبيق
function App() {
  return (
    <ToastProvider>
      <YourAppContent />
    </ToastProvider>
  )
}`;

  const quickStartCode = `// مثال سريع لبدء الاستخدام
'use client'

import { ToastProvider, useToast } from '@/components/ui/ToastContext'
import FileUploader from '@/components/common/FileUploader'

function Content() {
  const { addToast } = useToast()

  return (
    <div className="p-6 space-y-6">
      <button 
        onClick={() => addToast({ title: 'مرحباً!', type: 'success' })}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        عرض إشعار
      </button>
      
      <FileUploader />
    </div>
  )
}

export default function QuickStart() {
  return (
    <ToastProvider>
      <Content />
    </ToastProvider>
  )
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
              <a href="#البدء" className="text-gray-600 hover:text-blue-600 transition-colors">ابدأ الآن</a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6 backdrop-blur-sm">
            <span className="text-2xl">⚡</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            أنشئ تطبيقات رائعة
            <br />
            <span className="text-blue-100">بسرعة وسهولة</span>
          </h1>
          
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto leading-relaxed">
            مكتبة مكونات React مخصصة للوحات التحكم والتطبيقات الإدارية 
            بدعم كامل للغة العربية وتصميم عصري
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 space-x-reverse">
            <a 
              href="#البدء" 
              className="bg-white text-blue-600 px-8 py-3 rounded-lg hover:bg-blue-50 font-semibold transition-colors"
            >
              ابدأ الآن
            </a>
            <a 
              href="#المكونات" 
              className="border border-white text-white px-8 py-3 rounded-lg hover:bg-white/10 font-semibold transition-colors"
            >
              استعرض المكونات
            </a>
          </div>
        </div>
      </section>

      {/* Quick Start Section */}
      <section id="البدء" className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">ابدأ في 5 دقائق</h2>
            <p className="text-lg text-gray-600">انسخ والصق هذا الكود لبدء الاستخدام فوراً</p>
          </div>

          <div className="bg-gray-900 rounded-xl overflow-hidden shadow-xl">
            <div className="flex items-center justify-between px-6 py-4 bg-gray-800">
              <span className="text-sm text-gray-300">quick-start.jsx</span>
              <button 
                onClick={() => navigator.clipboard.writeText(quickStartCode)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                نسخ الكود
              </button>
            </div>
            <SyntaxHighlighter 
              language="jsx" 
              style={oneDark}
              customStyle={{ 
                padding: '1.5rem',
                margin: 0,
                fontSize: '0.9rem',
                direction: 'ltr'
              }}
            >
              {quickStartCode}
            </SyntaxHighlighter>
          </div>
        </div>
      </section>

      {/* Components Section */}
      <section id="المكونات" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">المكونات المتاحة</h2>
            <p className="text-lg text-gray-600">جميع المكونات جاهزة للنسخ والاستخدام</p>
          </div>

          <div className="space-y-8">
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
                    <button 
                      onClick={() => navigator.clipboard.writeText(component.code)}
                      className="text-gray-400 hover:text-blue-600 transition-colors px-3 py-1 rounded-lg border border-gray-300 hover:border-blue-600 text-sm"
                    >
                      نسخ الكود
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3 text-sm">مثال تطبيقي:</h4>
                    <div className="rounded-lg overflow-hidden border border-gray-200">
                      <SyntaxHighlighter 
                        language="jsx" 
                        style={oneDark}
                        customStyle={{ 
                          padding: '1rem',
                          margin: 0,
                          fontSize: '0.8rem',
                          direction: 'ltr'
                        }}
                      >
                        {component.code}
                      </SyntaxHighlighter>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3 text-sm">طريقة الاستخدام:</h4>
                    <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                      <SyntaxHighlighter 
                        language="javascript" 
                        style={oneDark}
                        customStyle={{ 
                          padding: '1rem',
                          margin: 0,
                          fontSize: '0.8rem',
                          direction: 'ltr',
                          background: 'transparent'
                        }}
                      >
                        {component.usage}
                      </SyntaxHighlighter>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Installation Section */}
      <section id="التثبيت" className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">التثبيت والإعداد</h2>
            <p className="text-lg text-gray-600">خطوات بسيطة لتجهيز المكتبة في مشروعك</p>
          </div>

          <div className="bg-gray-900 rounded-xl overflow-hidden shadow-xl">
            <div className="flex items-center justify-between px-6 py-4 bg-gray-800">
              <span className="text-sm text-gray-300">installation.md</span>
              <button 
                onClick={() => navigator.clipboard.writeText(installationCode)}
                className="text-gray-400 hover:text-white transition-colors"
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
              { name: 'React', icon: '⚛️', desc: 'الإصدار 18' },
              { name: 'TypeScript', icon: '📘', desc: 'نوعية آمنة' },
              { name: 'Tailwind CSS', icon: '🎨', desc: 'تصميم متجاوب' },
              { name: 'RTL', icon: '📱', desc: 'دعم العربية' }
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