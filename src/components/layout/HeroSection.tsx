// components/layout/HeroSection.tsx
'use client';

export default function HeroSection() {
  return (
    <section className="py-20 bg-gradient-to-br from-blue-600 to-blue-800 text-white">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h1 className="text-5xl font-bold mb-6 leading-tight">
          منصة عنان للذكاء الاصطناعي
          <br />
          <span className="text-blue-200">تحويل البيانات إلى رؤى ذكية</span>
        </h1>
        
        <p className="text-xl text-blue-100 mb-12 max-w-3xl mx-auto leading-relaxed">
          منصة متكاملة تستخدم أحدث تقنيات الذكاء الاصطناعي لتحليل بياناتك واستخراج 
          الرؤى القيمة التي تساعد في اتخاذ القرارات الاستراتيجية
        </p>

        <div className="flex items-center justify-center space-x-6 space-x-reverse">
          <button className="bg-white text-blue-600 px-8 py-4 rounded-2xl hover:bg-blue-50 transition-colors font-semibold text-lg">
            ابدأ الآن مجاناً
          </button>
          <button className="border-2 border-white text-white px-8 py-4 rounded-2xl hover:bg-white hover:text-blue-600 transition-colors font-semibold text-lg">
            شاهد العرض التوضيحي
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="text-4xl font-bold mb-2">٩٩٫٩٪</div>
            <div className="text-blue-200">دقة التحليل</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold mb-2">٥٠٠+</div>
            <div className="text-blue-200">مستخدم نشط</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold mb-2">١٠٠٠٠+</div>
            <div className="text-blue-200">تحليل مكتمل</div>
          </div>
        </div>
      </div>
    </section>
  );
}