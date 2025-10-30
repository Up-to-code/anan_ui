// components/layout/FeaturesGrid.tsx
'use client';

const features = [
  {
    icon: '🤖',
    title: 'ذكاء اصطناعي متقدم',
    description: 'تقنيات الذكاء الاصطناعي الأكثر تطوراً لتحليل بياناتك بدقة فائقة'
  },
  {
    icon: '⚡',
    title: 'معالجة فورية',
    description: 'نتائج فورية خلال ثوانٍ مع قدرة على معالجة كميات هائلة من البيانات'
  },
  {
    icon: '🔒',
    title: 'أمان متكامل',
    description: 'حماية كاملة لبياناتك مع تشفير متقدم ونظم أمان متعددة الطبقات'
  },
  {
    icon: '📊',
    title: 'تقارير تفاعلية',
    description: 'لوحات تحكم وتقارير تفاعلية تساعدك في فهم بياناتك بشكل أفضل'
  },
  {
    icon: '🔄',
    title: 'تكامل سهل',
    description: 'تكامل سلس مع أنظمتك الحالية عبر واجهات برمجة تطبيقات متطورة'
  },
  {
    icon: '🎯',
    title: 'نتائج دقيقة',
    description: 'دقة تحليل تتجاوز 99% مع تحديث مستمر للخوارزميات والنماذج'
  }
];

export default function FeaturesGrid() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            ميزات منصة عنان
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            اكتشف القوة الكاملة لمنصتنا مع مجموعة متكاملة من الميزات المصممة 
            لتحويل بياناتك إلى فرص حقيقية
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-100 hover:border-blue-200 transition-colors group"
            >
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <span className="text-2xl">{feature.icon}</span>
              </div>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                {feature.title}
              </h3>
              
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}