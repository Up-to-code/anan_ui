'use client';

interface TimelineItem {
  id: string;
  title: string;
  description: string;
  date: string;
  icon?: string;
  status?: 'completed' | 'current' | 'upcoming';
}

interface ModernTimelineProps {
  items: TimelineItem[];
  title?: string;
}

export default function ModernTimeline({ 
  items = defaultTimelineItems,
  title = "خط الزمن"
}: ModernTimelineProps) {
  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      
      {/* Header */}
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">{title}</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          تتبع رحلتك خطوة بخطوة نحو النجاح
        </p>
      </div>

      {/* Timeline */}
      <div className="relative">
        
        {/* Vertical Line */}
        <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gray-200" />
        
        {/* Timeline Items */}
        <div className="space-y-12">
          {items.map((item, index) => (
            <TimelineItemComponent 
              key={item.id}
              item={item}
              index={index}
            />
          ))}
        </div>

      </div>
    </div>
  );
}

function TimelineItemComponent({ item, index }: { item: TimelineItem, index: number }) {
  const isEven = index % 2 === 0;
  
  const statusColors = {
    completed: 'bg-green-500',
    current: 'bg-blue-500',
    upcoming: 'bg-gray-300'
  };

  const statusIcons = {
    completed: '✅',
    current: '⚡',
    upcoming: '⏳'
  };

  return (
    <div className={`flex items-center gap-8 ${isEven ? 'flex-row' : 'flex-row-reverse'}`}>
      
      {/* Content */}
      <div className={`flex-1 ${isEven ? 'text-left' : 'text-right'}`}>
        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
          
          {/* Status Badge */}
          <div className="flex items-center gap-2 mb-3">
            <div className={`w-2 h-2 rounded-full ${statusColors[item.status || 'upcoming']}`} />
            <span className="text-sm font-medium text-gray-500">
              {item.status === 'completed' ? 'مكتمل' : 
               item.status === 'current' ? 'جاري' : 'قادم'}
            </span>
          </div>

          {/* Title & Date */}
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
            <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
              {item.date}
            </span>
          </div>

          {/* Description */}
          <p className="text-gray-600 leading-relaxed">
            {item.description}
          </p>

        </div>
      </div>

      {/* Icon & Connector */}
      <div className="relative flex flex-col items-center">
        
        {/* Icon Circle */}
        <div className={`
          w-12 h-12 rounded-full flex items-center justify-center text-white z-10
          ${item.status === 'completed' ? 'bg-green-500' : 
            item.status === 'current' ? 'bg-blue-500' : 'bg-gray-400'}
        `}>
          {item.icon || statusIcons[item.status || 'upcoming']}
        </div>

        {/* Connector Line (except last item) */}
        {index < defaultTimelineItems.length - 1 && (
          <div className="w-0.5 h-12 bg-gray-200 mt-2" />
        )}
        
      </div>

      {/* Spacer for alternating sides */}
      <div className="flex-1" />

    </div>
  );
}

const defaultTimelineItems: TimelineItem[] = [
  {
    id: '1',
    title: 'التخطيط والتحليل',
    description: 'تحليل متطلبات المشروع وتحديد الأهداف والموارد المطلوبة لضمان النجاح.',
    date: 'يناير ٢٠٢٤',
    status: 'completed',
    icon: '📋'
  },
  {
    id: '2',
    title: 'التصميم والتطوير',
    description: 'بناء الحلول التقنية وتصميم الواجهات مع مراعاة تجربة المستخدم.',
    date: 'مارس ٢٠٢٤',
    status: 'current',
    icon: '💻'
  },
  {
    id: '3',
    title: 'الاختبار والتحسين',
    description: 'فحص الجودة واختبار الأداء وتطبيق التحسينات اللازمة.',
    date: 'مايو ٢٠٢٤',
    status: 'upcoming',
    icon: '🧪'
  },
  {
    id: '4',
    title: 'الإطلاق والدعم',
    description: 'نشر المنتج النهائي وتقديم الدعم الفني والمتابعة المستمرة.',
    date: 'يوليو ٢٠٢٤',
    status: 'upcoming',
    icon: '🚀'
  }
];