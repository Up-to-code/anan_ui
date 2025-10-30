'use client';

interface MinimalGridHeroProps {
  title: string;
  subtitle: string;
  action: {
    label: string;
    onClick: () => void;
  };
}

export default function MinimalGridHero({
  title,
  subtitle,
  action
}: MinimalGridHeroProps) {
  return (
    <div className="min-h-screen w-full bg-white relative">
      
      {/* Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#f0f4f8_1px,transparent_1px),linear-gradient(to_bottom,#f0f4f8_1px,transparent_1px)] bg-[size:64px_64px]" />
      
      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-6">
        <div className="max-w-2xl mx-auto text-center">
          
          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {title}
          </h1>
          
          {/* Subtitle */}
          <p className="text-lg text-gray-600 mb-10 leading-relaxed">
            {subtitle}
          </p>
          
          {/* Action */}
          <button
            onClick={action.onClick}
            className="px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold text-lg"
          >
            {action.label}
          </button>
          
        </div>
      </div>
      
    </div>
  );
}