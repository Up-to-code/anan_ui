'use client';

interface MinimalCenteredHeroProps {
  title: string;
  subtitle: string;
  action: {
    label: string;
    onClick: () => void;
  };
}

export default function MinimalCenteredHero({
  title,
  subtitle,
  action
}: MinimalCenteredHeroProps) {
  return (
    <div className="min-h-screen w-full bg-white relative overflow-hidden">
      
      {/* Simple Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(229,231,235,0.5)_1px,transparent_1px),linear-gradient(to_bottom,rgba(229,231,235,0.5)_1px,transparent_1px)] bg-[size:64px_64px]" />
      
      {/* Content */}
      <section className="relative z-10 py-24 px-4 flex flex-col items-center justify-center min-h-screen">
        <div className="container max-w-2xl mx-auto text-center">
          
          {/* Headline */}
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
            {title}
          </h1>
          
          {/* Description */}
          <p className="text-gray-600 text-lg max-w-md mx-auto mb-10 leading-relaxed">
            {subtitle}
          </p>
          
          {/* CTA */}
          <button
            onClick={action.onClick}
            className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            {action.label}
          </button>
          
        </div>
      </section>
    </div>
  );
}