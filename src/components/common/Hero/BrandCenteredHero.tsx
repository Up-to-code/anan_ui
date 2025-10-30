'use client';

interface BrandCenteredHeroProps {
  title: string;
  subtitle: string;
  primaryAction: {
    label: string;
    onClick: () => void;
  };
  secondaryAction?: {
    label: string;
    onClick: () => void;
  };
}

export default function BrandCenteredHero({
  title,
  subtitle,
  primaryAction,
  secondaryAction
}: BrandCenteredHeroProps) {
  return (
    <div className="min-h-screen w-full bg-white relative overflow-hidden">
      
      {/* Enhanced Grid Background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(59,130,246,0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(59,130,246,0.05) 1px, transparent 1px),
            radial-gradient(circle 400px at 10% 20%, rgba(59,130,246,0.08), transparent),
            radial-gradient(circle 400px at 90% 80%, rgba(139,92,246,0.08), transparent)
          `,
          backgroundSize: "56px 56px, 56px 56px, 100% 100%, 100% 100%",
        }}
      />
      
      {/* Content */}
      <section className="relative z-10 py-24 px-4 flex flex-col items-center justify-center min-h-screen">
        <div className="container max-w-4xl mx-auto text-center">
          
          {/* Brand Logo */}
          <div className="mb-12 flex justify-center animate-scale-in">
            <div className="flex items-center gap-3 bg-white/90 backdrop-blur-sm rounded-2xl px-6 py-4 border border-blue-100 shadow-sm">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-xl">ع</span>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-gray-900">عنان</div>
                <div className="text-blue-600 text-sm -mt-1">AI Platform</div>
              </div>
            </div>
          </div>
          
          {/* Tagline */}
          <div className="mb-8 flex justify-center animate-slide-down">
            <div className="flex items-center gap-2 text-blue-600 font-medium px-4 py-2 bg-blue-50 rounded-full border border-blue-200">
              <div className="h-2 w-2 bg-blue-600 rounded-full animate-pulse" />
              منصة المستقبل الذكي
            </div>
          </div>
          
          {/* Headline */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 text-gray-900 leading-tight animate-fade-in-up">
            {title}
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
              {subtitle}
            </span>
          </h1>
          
          {/* Description */}
          <p className="text-gray-600 text-xl max-w-2xl mx-auto mb-12 leading-relaxed animate-fade-in-up delay-100">
            حلول متكاملة تجمع بين الذكاء الاصطناعي والخبرة البشرية لتحقيق أقصى استفادة من بياناتك
          </p>
          
          {/* CTAs */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16 animate-fade-in-up delay-200">
            <button
              onClick={primaryAction.onClick}
              className="px-8 py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl flex items-center gap-3 justify-center transform hover:scale-105"
            >
              {primaryAction.label}
              <span className="text-xl">→</span>
            </button>
            
            {secondaryAction && (
              <button
                onClick={secondaryAction.onClick}
                className="px-8 py-4 bg-white text-blue-600 rounded-xl border-2 border-blue-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-300 font-semibold text-lg transform hover:scale-105"
              >
                {secondaryAction.label}
              </button>
            )}
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto animate-fade-in-up delay-300">
            {[
              { value: '٩٩.٩٪', label: 'دقة' },
              { value: '٢٤/٧', label: 'دعم' },
              { value: '١٠٠٪', label: 'أمان' },
              { value: '⚡', label: 'سرعة' }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-blue-600 mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600 text-sm">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
          
        </div>
      </section>
    </div>
  );
}