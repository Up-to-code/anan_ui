'use client';

import { useState } from 'react';

interface TestimonialCarouselProps {
  testimonials?: Testimonial[];
  autoPlay?: boolean;
  interval?: number;
}

interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
}

export default function TestimonialCarousel({
  testimonials = defaultCarouselTestimonials,
  autoPlay = true,
  interval = 5000
}: TestimonialCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToTestimonial = (index: number) => {
    setCurrentIndex(index);
  };

  // Auto-play
  if (autoPlay) {
    setTimeout(nextTestimonial, interval);
  }

  const currentTestimonial = testimonials[currentIndex];

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

  return (
    <div className="w-full max-w-4xl mx-auto">
      
      {/* Testimonial Content */}
      <div className="bg-white rounded-2xl p-8 border border-gray-200 text-center mb-8">
        
        {/* Quote Icon */}
        <div className="text-4xl text-blue-600 mb-6">❞</div>

        {/* Rating */}
        <div className="flex justify-center gap-1 text-xl mb-6">
          {renderStars(currentTestimonial.rating)}
        </div>

        {/* Content */}
        <p className="text-gray-700 text-lg leading-relaxed mb-8">
          &quot;{currentTestimonial.content}&quot;
        </p>

        {/* Author */}
        <div>
          <div className="font-semibold text-gray-900 text-lg">
            {currentTestimonial.name}
          </div>
          <div className="text-gray-600">
            {currentTestimonial.role} • {currentTestimonial.company}
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-4">
        
        {/* Previous Button */}
        <button
          onClick={prevTestimonial}
          className="w-10 h-10 rounded-full border border-gray-300 hover:border-blue-500 hover:bg-blue-50 flex items-center justify-center transition-colors"
        >
          <span className="text-gray-600">←</span>
        </button>

        {/* Dots */}
        <div className="flex gap-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goToTestimonial(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentIndex ? 'bg-blue-600' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>

        {/* Next Button */}
        <button
          onClick={nextTestimonial}
          className="w-10 h-10 rounded-full border border-gray-300 hover:border-blue-500 hover:bg-blue-50 flex items-center justify-center transition-colors"
        >
          <span className="text-gray-600">→</span>
        </button>

      </div>
    </div>
  );
}

const defaultCarouselTestimonials: Testimonial[] = [
  {
    id: '1',
    name: 'أحمد محمد',
    role: 'مدير تقنية',
    company: 'شركة التقنية',
    content: 'منصة عنان غيرت طريقة عملنا بالكامل. الدقة والسرعة في التحليلات فائقة. ساعدتنا في اتخاذ قرارات استراتيجية مهمة.',
    rating: 5
  },
  {
    id: '2',
    name: 'فاطمة علي',
    role: 'محللة بيانات',
    company: 'مؤسسة النمو',
    content: 'سهولة الاستخدام مع قوة الأداء. أفضل قرار استثماري اتخذناه هذا العام. وفرت علينا مئات الساعات من العمل.',
    rating: 5
  },
  {
    id: '3',
    name: 'خالد عبدالله',
    role: 'رئيس قسم',
    company: 'مجموعة الأعمال',
    content: 'الدعم الفني متميز والمنصة تتطور باستمرار. نوصي بها بشدة لأي شركة تريد التحول الرقمي.',
    rating: 4
  }
];