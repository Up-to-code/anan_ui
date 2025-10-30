"use client";
// app/dashboard/page.tsx
import { useState } from 'react';
import { 
  FiUsers, 
  FiTrendingUp, 
  FiDollarSign, 
  FiShoppingCart, 
  FiPlus, 
  FiDownload, 
  FiFileText,
  FiCheck,
  FiUpload,
  FiImage,
  FiVideo,
  FiMusic,
  FiArchive,
  FiX
} from 'react-icons/fi';

export default function DashboardPage() {
  const stats = [
    {
      title: 'إجمالي المستخدمين',
      value: '١٢٬٤٨٦',
      change: '+١٢٪',
      trend: 'up',
      icon: FiUsers,
      color: 'blue'
    },
    {
      title: 'النشاط اليومي',
      value: '٣٬٢٤١',
      change: '+٨٪',
      trend: 'up',
      icon: FiTrendingUp,
      color: 'green'
    },
    {
      title: 'معدل التحويل',
      value: '٦٨٪',
      change: '+٣٪',
      trend: 'up',
      icon: FiTrendingUp,
      color: 'purple'
    },
    {
      title: 'الإيرادات',
      value: '٤٥٬٢٣٤ ر.س',
      change: '-٢٪',
      trend: 'down',
      icon: FiDollarSign,
      color: 'orange'
    },
  ];

  const quickActions = [
    {
      title: 'إضافة مستخدم جديد',
      description: 'إنشاء حساب لمستخدم جديد',
      icon: FiUsers,
      color: 'blue'
    },
    {
      title: 'إنشاء تقرير',
      description: 'إنشاء تقرير مفصل',
      icon: FiFileText,
      color: 'green'
    },
    {
      title: 'إدارة المنتجات',
      description: 'إضافة أو تعديل المنتجات',
      icon: FiShoppingCart,
      color: 'purple'
    },
    {
      title: 'تحميل البيانات',
      description: 'تصدير البيانات والتقارير',
      icon: FiDownload,
      color: 'orange'
    },
  ];

  // Steps component data
  const onboardingSteps = [
    { id: 1, title: 'إعداد الحساب', description: 'اكمل معلومات حسابك', completed: true },
    { id: 2, title: 'إضافة المنتجات', description: 'ابدأ بإضافة منتجاتك', completed: true },
    { id: 3, title: 'إعداد الدفع', description: 'ربط بوابة الدفع', completed: false },
    { id: 4, title: 'بدء البيع', description: 'ابدأ في استقبال الطلبات', completed: false },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-blue-600 rounded-lg p-6 text-white">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold mb-2">مرحباً بعودتك، محمد! 👋</h1>
            <p className="text-blue-100">
              هنا يمكنك متابعة أداء النظام وإدارة جميع الأنشطة بسهولة.
            </p>
          </div>
          <button className="bg-white text-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-blue-50 transition-colors flex items-center space-x-2 space-x-reverse">
            <FiPlus size={18} />
            <span>بدء مشروع جديد</span>
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="bg-white rounded-lg p-4 border border-gray-200"
            >
              <div className="flex items-center justify-between mb-3">
                <div className={`p-2 rounded-lg bg-${stat.color}-50`}>
                  <Icon size={20} className={`text-${stat.color}-600`} />
                </div>
                <span className={`text-sm font-medium ${
                  stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.change}
                </span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-1">{stat.value}</h3>
              <p className="text-gray-600 text-sm">{stat.title}</p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <h2 className="text-lg font-bold text-gray-900 mb-4">الإجراءات السريعة</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {quickActions.map((action, index) => {
                const Icon = action.icon;
                return (
                  <button
                    key={index}
                    className="flex items-center space-x-4 space-x-reverse p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-all duration-200 text-right"
                  >
                    <div className={`p-3 rounded-lg bg-${action.color}-50`}>
                      <Icon size={20} className={`text-${action.color}-600`} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900 mb-1">{action.title}</h3>
                      <p className="text-gray-600 text-sm">{action.description}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* File Upload Component */}
          <div className="bg-white rounded-lg p-6 border border-gray-200 mt-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">رفع الملفات</h2>
            <FileUploader />
          </div>
        </div>

        <div className="space-y-6">
          {/* Steps Component */}
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <h2 className="text-lg font-bold text-gray-900 mb-4">مراحل الإعداد</h2>
            <StepsComponent steps={onboardingSteps} />
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <h2 className="text-lg font-bold text-gray-900 mb-4">النشاط الأخير</h2>
            <div className="space-y-4">
              {[
                { user: 'أحمد محمد', action: 'أنشئ حساب جديد', time: 'منذ ٥ دقائق', icon: '👤' },
                { user: 'سارة عبدالله', action: 'قام بتحديث الملف الشخصي', time: 'منذ ١٥ دقيقة', icon: '📝' },
                { user: 'خالد العلي', action: 'أكمل عملية شراء', time: 'منذ ٣٠ دقيقة', icon: '🛒' },
                { user: 'فاطمة أحمد', action: 'سجل دخول', time: 'منذ ساعة', icon: '🔐' },
              ].map((activity, index) => (
                <div key={index} className="flex items-center space-x-3 space-x-reverse p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 text-xs">{activity.icon}</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">
                      {activity.user}
                    </p>
                    <p className="text-sm text-gray-600">{activity.action}</p>
                  </div>
                  <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">{activity.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Steps Component
function StepsComponent({ steps }: { steps: { id: number; title: string; description: string; completed: boolean }[] }) {
  return (
    <div className="space-y-4">
      {steps.map((step, index) => (
        <div key={step.id} className="flex items-start space-x-4 space-x-reverse">
          <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
            step.completed ? 'bg-green-500' : 'bg-gray-300'
          }`}>
            {step.completed ? (
              <FiCheck className="text-white" size={16} />
            ) : (
              <span className="text-white text-sm">{index + 1}</span>
            )}
          </div>
          <div className="flex-1">
            <h3 className={`font-medium ${step.completed ? 'text-green-600' : 'text-gray-900'}`}>
              {step.title}
            </h3>
            <p className="text-sm text-gray-600">{step.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

// File Uploader Component
function FileUploader() {
  const [files, setFiles] = useState<File[]>([]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const newFiles = Array.from(event.target.files);
      setFiles(prev => [...prev, ...newFiles]);
    }
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">
      {/* Drag and Drop Area */}
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors">
        <FiUpload className="mx-auto text-gray-400 mb-3" size={32} />
        <p className="text-gray-600 mb-2">اسحب الملفات هنا أو</p>
        <label htmlFor="file-upload" className="bg-blue-600 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-blue-700 transition-colors inline-block">
          اختر الملفات
        </label>
        <input
          id="file-upload"
          type="file"
          multiple
          className="hidden"
          onChange={handleFileChange}
        />
        <p className="text-gray-500 text-sm mt-2">الحد الأقصى 10MB لكل ملف</p>
      </div>

      {/* File Type Buttons */}
      <div className="flex flex-wrap gap-2">
        {[
          { type: 'image', label: 'صور', icon: FiImage, color: 'blue' },
          { type: 'video', label: 'فيديو', icon: FiVideo, color: 'green' },
          { type: 'audio', label: 'صوت', icon: FiMusic, color: 'purple' },
          { type: 'document', label: 'مستندات', icon: FiArchive, color: 'orange' },
        ].map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.type}
              className={`flex items-center space-x-2 space-x-reverse px-3 py-2 rounded-lg border border-gray-200 hover:bg-${item.color}-50 hover:border-${item.color}-300 transition-colors`}
            >
              <Icon size={16} className={`text-${item.color}-600`} />
              <span className="text-sm text-gray-700">{item.label}</span>
            </button>
          );
        })}
      </div>

      {/* Uploaded Files List */}
      {files.length > 0 && (
        <div className="border border-gray-200 rounded-lg">
          <div className="p-3 border-b border-gray-200">
            <h3 className="font-medium text-gray-900">الملفات المرفوعة ({files.length})</h3>
          </div>
          <div className="divide-y divide-gray-200">
            {files.map((file, index) => (
              <div key={index} className="flex items-center justify-between p-3">
                <div className="flex items-center space-x-3 space-x-reverse">
                  <FiFileText className="text-gray-400" size={20} />
                  <div>
                    <p className="text-sm font-medium text-gray-900">{file.name}</p>
                    <p className="text-xs text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                  </div>
                </div>
                <button
                  onClick={() => removeFile(index)}
                  className="text-red-600 hover:text-red-800 transition-colors"
                >
                  <FiX size={18} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}