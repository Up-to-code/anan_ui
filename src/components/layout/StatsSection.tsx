// components/layout/StatsSection.tsx
'use client';

const stats = [
  { value: '٩٩٫٩٪', label: 'رضا العملاء' },
  { value: '٥٠٠+', label: 'مشروع مكتمل' },
  { value: '١٠٠٠٠+', label: 'ساعة تحليل' },
  { value: '٢٤/٧', label: 'دعم فني' }
];

export default function StatsSection() {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            أرقام تتحدث عنا
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            ثقة المئات من العملاء في منصتنا لتحليل بياناتهم واتخاذ قرارات أكثر ذكاءً
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-5xl font-bold text-blue-400 mb-4">
                {stat.value}
              </div>
              <div className="text-xl text-gray-300">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}