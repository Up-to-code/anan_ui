'use client';

interface StatsTestimonialProps {
  testimonial: {
    name: string;
    role: string;
    company: string;
    content: string;
    stats: {
      value: string;
      label: string;
    }[];
  };
}

export default function StatsTestimonial({
  testimonial
}: StatsTestimonialProps) {
  return (
    <div className="bg-white rounded-2xl p-8 border border-gray-200">
      
      {/* Content */}
      <div className="mb-8">
        <p className="text-gray-700 text-lg leading-relaxed mb-6">
          &quot;{testimonial.content}&quot;
        </p>

        {/* Author */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold">
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

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-200">
        {testimonial.stats.map((stat, index) => (
          <div key={index} className="text-center">
            <div className="text-2xl font-bold text-blue-600 mb-1">
              {stat.value}
            </div>
            <div className="text-gray-600 text-sm">
              {stat.label}
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}