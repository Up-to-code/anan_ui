'use client';

export default function FeaturesGrid() {
  const features = [
    {
      icon: "⚡",
      title: "سرعة فائقة",
      description: "معالجة فورية للبيانات باستخدام أحدث التقنيات"
    },
    {
      icon: "🔒",
      title: "أمان متكامل",
      description: "حماية شاملة لبياناتك بأعلى معايير الأمان"
    },
    {
      icon: "📊",
      title: "تحليلات ذكية",
      description: "تقارير وتحليلات متقدمة لاتخاذ قرارات أفضل"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl">
      {features.map((feature, index) => (
        <div key={index} className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-blue-100">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
            <span className="text-blue-600 text-xl">{feature.icon}</span>
          </div>
          <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
          <p className="text-gray-600 text-sm">{feature.description}</p>
        </div>
      ))}
    </div>
  );
}