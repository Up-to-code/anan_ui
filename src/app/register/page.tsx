// app/register/page.tsx
'use client';

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center" dir="rtl">
      <div className="max-w-md w-full mx-4">
        <div className="bg-white rounded-2xl p-8 border border-blue-100">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-semibold text-2xl">ع</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900">أنشئ حساب جديد</h1>
            <p className="text-gray-600 mt-2">انضم إلى منصة عنان للذكاء الاصطناعي</p>
          </div>

          {/* Register Form */}
          <form className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  الاسم الأول
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="الاسم الأول"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  الاسم الأخير
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="الاسم الأخير"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                البريد الإلكتروني
              </label>
              <input
                type="email"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="ادخل بريدك الإلكتروني"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                كلمة المرور
              </label>
              <input
                type="password"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="اختر كلمة مرور قوية"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                تأكيد كلمة المرور
              </label>
              <input
                type="password"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="أعد إدخال كلمة المرور"
              />
            </div>

            <label className="flex items-start">
              <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 mt-1 ml-2" />
              <span className="text-sm text-gray-600">
                أوافق على <a href="#" className="text-blue-600 hover:text-blue-700">الشروط والأحكام</a> و <a href="#" className="text-blue-600 hover:text-blue-700">سياسة الخصوصية</a>
              </span>
            </label>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
            >
              إنشاء حساب
            </button>
          </form>

          {/* Footer */}
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              لديك حساب بالفعل؟{' '}
              <a href="/login" className="text-blue-600 hover:text-blue-700 font-semibold">
                سجل الدخول
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}