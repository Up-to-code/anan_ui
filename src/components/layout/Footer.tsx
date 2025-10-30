// components/layout/Footer.tsx
'use client';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="md:col-span-2">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center">
                <span className="text-white font-semibold text-xl">ع</span>
              </div>
              <div className="mr-4">
                <h3 className="text-2xl font-bold">عنان</h3>
                <p className="text-gray-400">منصة الذكاء الاصطناعي</p>
              </div>
            </div>
            <p className="text-gray-400 mb-6 max-w-md">
              منصة عنان توفر حلول الذكاء الاصطناعي المتقدمة لتحويل البيانات 
              إلى رؤى قابلة للتنفيذ تساعد في نمو أعمالك.
            </p>
            <div className="flex space-x-4 space-x-reverse">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                تويتر
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                فيسبوك
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                لينكد إن
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6">روابط سريعة</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">الرئيسية</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">الميزات</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">الأسعار</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">المساعدة</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-6">اتصل بنا</h4>
            <ul className="space-y-3 text-gray-400">
              <li>البريد الإلكتروني: info@enan.com</li>
              <li>الهاتف: +966 123 456 789</li>
              <li>العنوان: الرياض، المملكة العربية السعودية</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>© 2024 منصة عنان. جميع الحقوق محفوظة.</p>
        </div>
      </div>
    </footer>
  );
}