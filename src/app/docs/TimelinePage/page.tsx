'use client';

import HorizontalTimeline from "@/components/common/Timeline/HorizontalTimeline";
import ModernTimeline from "@/components/common/Timeline/ModernTimeline";
import ProgressTimeline from "@/components/common/Timeline/ProgressTimeline";
import StoryTimeline from "@/components/common/Timeline/StoryTimeline";

// Temporary default data for ModernTimeline to fix missing prop error
const demoModernItems = [
  {
    id: '1',
    title: 'مرحلة الفكرة',
    date: 'يناير 2020',
    description: 'انطلاقة المشروع واستكشاف السوق.',
    icon: '💡',
  },
  {
    id: '2',
    title: 'إثبات المفهوم',
    date: 'يونيو 2020',
    description: 'تطوير النموذج الأولي واختباره.',
    icon: '🛠️',
  },
  {
    id: '3',
    title: 'الإطلاق الرسمي',
    date: 'مارس 2021',
    description: 'إطلاق الخدمة للجمهور.',
    icon: '🚀',
  },
  {
    id: '4',
    title: 'التوسع',
    date: 'ديسمبر 2021',
    description: 'توسيع الفريق وزيادة الشراكات.',
    icon: '🌍',
  },
];

export default function TimelinePage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12" dir="rtl">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">مكونات الخط الزمني</h1>
          <p className="text-gray-600 text-lg">عرض القصص والتقدم بطرق مرئية وجذابة</p>
        </div>

        {/* Modern Timeline */}
        <section>
          <ModernTimeline items={demoModernItems} />
        </section>

        {/* Story Timeline */}
        <section className="bg-white rounded-2xl p-8">
          <StoryTimeline />
        </section>

        {/* Progress Timeline */}
        <section>
          <ProgressTimeline />
        </section>

        {/* Horizontal Timeline */}
        <section className="bg-white rounded-2xl p-8">
          <HorizontalTimeline />
        </section>

      </div>
    </div>
  );
}