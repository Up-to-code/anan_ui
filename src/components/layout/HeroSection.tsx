'use client';

export default function HeroSection() {
  return (
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
      </div>
    </main>
  );
}