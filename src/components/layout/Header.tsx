// components/layout/Header.tsx
'use client';

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center">
              <span className="text-white font-semibold text-xl">ع</span>
            </div>
            <div className="mr-4">
              <h1 className="text-2xl font-bold text-gray-900">عنان</h1>
              <p className="text-gray-600 text-sm">منصة الذكاء الاصطناعي</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex items-center space-x-8 space-x-reverse">
            <a href="#" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              الرئيسية
            </a>
            <a href="#" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              الميزات
            </a>
            <a href="#" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              الأسعار
            </a>
            <a href="#" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              المساعدة
            </a>
          </nav>

          {/* Auth Buttons */}
          <div className="flex items-center space-x-4 space-x-reverse">
            <a
              href="/login"
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              تسجيل الدخول
            </a>
            <a
              href="/register"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
            >
              إنشاء حساب
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}