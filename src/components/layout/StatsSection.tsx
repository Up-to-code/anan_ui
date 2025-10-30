'use client';

export default function StatsSection() {
  const stats = [
    { value: "٩٩.٩٪", label: "دقة النتائج" },
    { value: "٢٤/٧", label: "عمل مستمر" },
    { value: "١٠٠٪", label: "خصوصية" },
    { value: "⚡", label: "سرعة عالية" }
  ];

  return (
    <div className="bg-white/50 border-t border-blue-100 py-12">
      <div className="max-w-4xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, index) => (
            <div key={index}>
              <div className="text-2xl font-bold text-blue-600 mb-2">{stat.value}</div>
              <div className="text-gray-600 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}