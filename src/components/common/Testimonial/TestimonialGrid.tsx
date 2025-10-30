'use client';

interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  avatar?: string;
}

interface TestimonialGridProps {
  testimonials?: Testimonial[];
  columns?: 1 | 2 | 3;
  variant?: 'default' | 'card' | 'minimal';
}

export default function TestimonialGrid({
  testimonials = defaultTestimonials,
  columns = 3,
  variant = 'default'
}: TestimonialGridProps) {
  const gridColumns = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
  };

  return (
    <div className={`grid ${gridColumns[columns]} gap-6`}>
      {testimonials.map((testimonial) => (
        <TestimonialCard
          key={testimonial.id}
          testimonial={testimonial}
          variant={variant}
        />
      ))}
    </div>
  );
}

function TestimonialCard({ testimonial, variant }: { testimonial: Testimonial; variant: string }) {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span
        key={i}
        className={i < rating ? 'text-yellow-400' : 'text-gray-300'}
      >
        ★
      </span>
    ));
  };

  if (variant === 'minimal') {
    return (
      <div className="bg-white rounded-lg p-6 border border-gray-200 hover:shadow-md transition-shadow">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
            {testimonial.name.charAt(0)}
          </div>
          <div>
            <div className="font-semibold text-gray-900">{testimonial.name}</div>
            <div className="text-gray-600 text-sm">{testimonial.role}</div>
          </div>
        </div>
        <p className="text-gray-600 text-sm leading-relaxed">&quot;{testimonial.content}&quot;</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-300">
      {/* Rating */}
      <div className="flex gap-1 text-lg mb-4">
        {renderStars(testimonial.rating)}
      </div>

      {/* Content */}
      <p className="text-gray-700 leading-relaxed mb-6">&quot;{testimonial.content}&quot;</p>

      {/* Author */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
          {testimonial.name.charAt(0)}
        </div>
        <div>
          <div className="font-semibold text-gray-900">{testimonial.name}</div>
          <div className="text-gray-600 text-sm">
            {testimonial.role} • {testimonial.company}
          </div>
        </div>
      </div>
    </div>
  );
}

const defaultTestimonials: Testimonial[] = [
  {
    id: '1',
    name: 'أحمد محمد',
    role: 'مدير تقنية',
    company: 'شركة التقنية',
    content: 'منصة عنان غيرت طريقة عملنا بالكامل. الدقة والسرعة في التحليلات فائقة.',
    rating: 5
  },
  {
    id: '2',
    name: 'فاطمة علي',
    role: 'محللة بيانات',
    company: 'مؤسسة النمو',
    content: 'سهولة الاستخدام مع قوة الأداء. أفضل قرار استثماري اتخذناه هذا العام.',
    rating: 5
  },
  {
    id: '3',
    name: 'خالد عبدالله',
    role: 'رئيس قسم',
    company: 'مجموعة الأعمال',
    content: 'الدعم الفني متميز والمنصة تتطور باستمرار. نوصي بها بشدة.',
    rating: 4
  },
  {
    id: '4',
    name: 'سارة أحمد',
    role: 'مديرة مشاريع',
    company: 'شركة الحلول',
    content: 'وفرت علينا وقت وجهد كبيرين. التقارير دقيقة وسهلة الفهم.',
    rating: 5
  },
  {
    id: '5',
    name: 'محمد حسن',
    role: 'مؤسس شركة',
    company: 'ستارت أب تك',
    content: 'مناسبة للشركات الناشئة. الأسعار معقولة والميزات رائعة.',
    rating: 5
  },
  {
    id: '6',
    name: 'نورة الكندري',
    role: 'خبيرة بيانات',
    company: 'مركز الأبحاث',
    content: 'الأداء يتجاوز التوقعات. تحليلات متقدمة بسهولة استخدام بسيطة.',
    rating: 4
  }
];