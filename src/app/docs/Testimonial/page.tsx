'use client';

import TestimonialGrid from '@/components/common/Testimonial/TestimonialGrid';
import FeaturedTestimonial from '@/components/common/Testimonial/FeaturedTestimonial';
import TestimonialCarousel from '@/components/common/Testimonial/TestimonialCarousel';
import StatsTestimonial from '@/components/common/Testimonial/StatsTestimonial';

export default function TestimonialsPage() {
  const featuredTestimonial = {
    name: 'د. سعيد الغامدي',
    role: 'رئيس تنفيذي',
    company: 'مجموعة الأعمال المتكاملة',
    content: 'شريكنا الاستراتيجي في التحول الرقمي. منصة عنان لم تغير طريقة عملنا فحسب، بل غيرت ثقافة الشركة بأكملها نحو الاعتماد على البيانات في اتخاذ القرارات.',
    rating: 5
  };

  const statsTestimonial = {
    name: 'شركة التقنية المتقدمة',
    role: 'فريق البيانات',
    company: 'قسم التحليلات',
    content: 'بعد تطبيق منصة عنان، شهدنا تحسناً ملحوظاً في كفاءة العمليات ودقة القرارات. الأرقام تتحدث عن نفسها.',
    stats: [
      { value: '٨٥٪', label: 'توفير وقت' },
      { value: '٩٩٪', label: 'دقة النتائج' },
      { value: '٦٠٪', label: 'نمو الإنتاجية' }
    ]
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12" dir="rtl">
      <div className="container mx-auto px-6 space-y-16">
        
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">آراء عملائنا</h1>
          <p className="text-gray-600 text-lg">انضم إلى الآلاف من العملاء الراضين عن خدماتنا</p>
        </div>

        {/* Featured Testimonial */}
        <section>
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">رأي مميز</h2>
            <p className="text-gray-600">تجربة أحد عملائنا المميزين</p>
          </div>
          <div className="max-w-4xl mx-auto">
            <FeaturedTestimonial 
              testimonial={featuredTestimonial}
              variant="brand"
            />
          </div>
        </section>

        {/* Testimonial Grid */}
        <section>
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">آراء متنوعة</h2>
            <p className="text-gray-600">ماذا يقول عملاؤنا عن منصتنا</p>
          </div>
          <TestimonialGrid columns={3} variant="default" />
        </section>

        {/* Stats Testimonial */}
        <section>
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">نتائج ملموسة</h2>
            <p className="text-gray-600">الأرقام تتحدث عن تأثير منصتنا</p>
          </div>
          <div className="max-w-2xl mx-auto">
            <StatsTestimonial testimonial={statsTestimonial} />
          </div>
        </section>

        {/* Testimonial Carousel */}
        <section>
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">قصص النجاح</h2>
            <p className="text-gray-600">استمع إلى تجارب عملائنا</p>
          </div>
          <TestimonialCarousel autoPlay={true} interval={4000} />
        </section>

        {/* Minimal Testimonials */}
        <section>
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">آراء سريعة</h2>
            <p className="text-gray-600">تصميم بسيط وأنيق</p>
          </div>
          <TestimonialGrid columns={2} variant="minimal" />
        </section>

        {/* Another Featured Testimonial */}
        <section>
          <div className="max-w-3xl mx-auto">
            <FeaturedTestimonial 
              testimonial={{
                name: 'ليلى أحمد',
                role: 'مديرة تسويق',
                company: 'علامة تجارية عالمية',
                content: 'البساطة في التصميم مع القوة في الأداء. منصة عنان ساعدتنا في فهم عملائنا بشكل أعمق واتخاذ قرارات تسويقية أكثر ذكاءً.',
                rating: 5
              }}
              variant="minimal"
            />
          </div>
        </section>

      </div>
    </div>
  );
}