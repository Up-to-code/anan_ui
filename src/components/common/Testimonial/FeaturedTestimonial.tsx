'use client';

interface FeaturedTestimonialProps {
  testimonial: {
    name: string;
    role: string;
    company: string;
    content: string;
    rating: number;
    avatar?: string;
  };
  variant?: 'default' | 'brand' | 'minimal';
}

export default function FeaturedTestimonial({
  testimonial,
  variant = 'default'
}: FeaturedTestimonialProps) {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span
        key={i}
        className={`text-xl ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
      >
        ★
      </span>
    ));
  };

  if (variant === 'brand') {
    return (
      <div className="bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-2xl p-8">
        <div className="text-6xl mb-4">❝</div>
        
        <p className="text-xl leading-relaxed mb-8 text-blue-100">
          &quot;{testimonial.content}&quot;
        </p>

        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center text-white font-bold text-xl backdrop-blur-sm">
            {testimonial.name.charAt(0)}
          </div>
          <div>
            <div className="font-semibold text-lg">{testimonial.name}</div>
            <div className="text-blue-200">
              {testimonial.role} • {testimonial.company}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (variant === 'minimal') {
    return (
      <div className="text-center max-w-2xl mx-auto">
        <div className="flex justify-center gap-1 text-2xl mb-6">
          {renderStars(testimonial.rating)}
        </div>
        
        <blockquote className="text-2xl font-light text-gray-700 leading-relaxed mb-8">
          &quot;{testimonial.content}&quot;
        </blockquote>

        <div>
          <div className="font-semibold text-gray-900 text-lg">{testimonial.name}</div>
          <div className="text-gray-600">
            {testimonial.role} • {testimonial.company}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
      <div className="flex gap-2 text-2xl mb-6">
        {renderStars(testimonial.rating)}
      </div>

      <p className="text-gray-700 text-lg leading-relaxed mb-8">
        &quot;{testimonial.content}&quot;
      </p>

      <div className="flex items-center gap-4">
        <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
          {testimonial.name.charAt(0)}
        </div>
        <div>
          <div className="font-semibold text-gray-900 text-lg">{testimonial.name}</div>
          <div className="text-gray-600">
            {testimonial.role} • {testimonial.company}
          </div>
        </div>
      </div>
    </div>
  );
}