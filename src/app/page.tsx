// app/page.tsx
'use client';

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50" dir="rtl">
      {/* Elegant Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-blue-100">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3 space-x-reverse">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center">
                <span className="text-white font-semibold text-lg">ع</span>
              </div>
              <div>
                <span className="text-xl font-bold text-gray-900">عنان</span>
                <span className="text-blue-600 text-sm mr-2">AI</span>
              </div>
            </div>
            <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              دخول
            </button>
          </div>
        </div>
      </header>

      {/* Modern Hero Section */}
      <main className="max-w-4xl mx-auto px-6 py-16">
        <div className="text-right">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 space-x-reverse bg-blue-100 text-blue-700 rounded-full px-4 py-2 mb-8">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span className="text-sm font-medium">النظام جاهز للاستخدام</span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            مرحباً بك في
            <br />
            <span className="bg-gradient-to-l from-blue-600 to-blue-700 bg-clip-text text-transparent">
              منصة عنان
            </span>
          </h1>

          {/* Description */}
          <p className="text-xl text-gray-600 mb-12 max-w-2xl leading-relaxed">
            نظام متكامل للذكاء الاصطناعي يمنحك تحليلات ذكية 
            <br />
            وأدوات متقدمة لإدارة بياناتك بكفاءة وأمان
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-16">
            <button className="px-8 py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-semibold flex items-center justify-center space-x-2 space-x-reverse">
              <span>بدء الاستخدام الآن</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
            
            <button className="px-8 py-4 bg-white text-blue-600 border border-blue-200 rounded-xl hover:bg-blue-50 transition-colors font-semibold">
              مشاهدة العرض التوضيحي
            </button>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-blue-100">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-blue-600 text-xl">⚡</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">سرعة فائقة</h3>
              <p className="text-gray-600 text-sm">معالجة فورية للبيانات باستخدام أحدث التقنيات</p>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-blue-100">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-blue-600 text-xl">🔒</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">أمان متكامل</h3>
              <p className="text-gray-600 text-sm">حماية شاملة لبياناتك بأعلى معايير الأمان</p>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-blue-100">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-blue-600 text-xl">📊</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">تحليلات ذكية</h3>
              <p className="text-gray-600 text-sm">تقارير وتحليلات متقدمة لاتخاذ قرارات أفضل</p>
            </div>
          </div>
        </div>
      </main>

      {/* Stats Section */}
      <div className="bg-white/50 border-t border-blue-100 py-12">
        <div className="max-w-4xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-2xl font-bold text-blue-600 mb-2">٩٩.٩٪</div>
              <div className="text-gray-600 text-sm">دقة النتائج</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-600 mb-2">٢٤/٧</div>
              <div className="text-gray-600 text-sm">عمل مستمر</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-600 mb-2">١٠٠٪</div>
              <div className="text-gray-600 text-sm">خصوصية</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-600 mb-2">⚡</div>
              <div className="text-gray-600 text-sm">سرعة عالية</div>
            </div>
          </div>
        </div>
      </div>

      {/* Simple Footer */}
      <footer className="bg-white/80 border-t border-blue-100 py-8">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-gray-600">
            © ٢٠٢٤ منصة عنان للذكاء الاصطناعي. جميع الحقوق محفوظة.
          </p>
        </div>
      </footer>
    </div>
  );
}