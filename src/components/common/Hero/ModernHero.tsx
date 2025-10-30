'use client';

interface ModernHeroProps {
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

export default function ModernHero({
  title,
  subtitle,
  primaryAction,
  secondaryAction
}: ModernHeroProps) {
  return (
    <div className="min-h-screen w-full bg-white relative overflow-hidden">
      
      {/* Grid Background */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,rgba(229,231,235,0.8)_1px,transparent_1px),linear-gradient(to_bottom,rgba(229,231,235,0.8)_1px,transparent_1px),radial-gradient(circle_500px_at_20%_100%,rgba(59,130,246,0.1),transparent),radial-gradient(circle_500px_at_100%_80%,rgba(59,130,246,0.1),transparent)] bg-[size:48px_48px,48px_48px,100%_100%,100%_100%]" />
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-20 w-4 h-4 bg-blue-400 rounded-full opacity-20 animate-pulse" />
      <div className="absolute bottom-40 right-32 w-6 h-6 bg-blue-300 rounded-full opacity-30 animate-bounce" />
      <div className="absolute top-1/2 left-1/4 w-3 h-3 bg-blue-500 rounded-full opacity-40 animate-ping" />
      
      {/* Content */}
      <section className="relative z-10 py-24 px-4 flex flex-col items-center justify-center min-h-screen">
        <div className="container max-w-4xl mx-auto text-center">
          
          {/* Brand Logo */}
          <div className="mb-12 flex justify-center animate-fade-in">
            <div className="flex items-center gap-3 bg-white/80 backdrop-blur-sm rounded-2xl px-6 py-4 border border-blue-100 shadow-sm">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-xl">ع</span>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-gray-900">عنان</div>
                <div className="text-blue-600 text-sm -mt-1">AI Platform</div>
              </div>
            </div>
          </div>
          
          {/* Badge */}
          <div className="mb-8 flex justify-center animate-slide-down">
            <div className="flex items-center gap-2 text-blue-600 font-medium px-4 py-2 bg-blue-50 rounded-full border border-blue-200">
              <div className="h-2 w-2 bg-blue-600 rounded-full animate-pulse" />
              منصة الذكاء الاصطناعي الرائدة
            </div>
          </div>
          
          {/* Headline */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 text-gray-900 leading-tight animate-fade-in-up">
            {title}
            <br />
            <span className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 bg-clip-text text-transparent">
              بالذكاء الاصطناعي
            </span>
          </h1>
          
          {/* Description */}
          <p className="text-gray-600 text-xl max-w-2xl mx-auto mb-12 leading-relaxed animate-fade-in-up delay-100">
            {subtitle}
          </p>
          
          {/* CTAs */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-20 animate-fade-in-up delay-200">
            <button
              onClick={primaryAction.onClick}
              className="px-10 py-5 bg-blue-600 text-white rounded-2xl hover:bg-blue-700 transition-all duration-300 font-semibold text-lg shadow-xl hover:shadow-2xl flex items-center gap-3 justify-center transform hover:scale-105"
            >
              {primaryAction.label}
              <span className="text-xl">→</span>
            </button>
            
            {secondaryAction && (
              <button
                onClick={secondaryAction.onClick}
                className="px-10 py-5 bg-white text-blue-600 rounded-2xl border-2 border-blue-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-300 font-semibold text-lg transform hover:scale-105"
              >
                {secondaryAction.label}
              </button>
            )}
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto animate-fade-in-up delay-300">
            {[
              { value: '٩٩.٩٪', label: 'دقة النتائج' },
              { value: '٢٤/٧', label: 'دعم فني' },
              { value: '١٠٠٪', label: 'أمان بيانات' },
              { value: '⚡', label: 'سرعة عالية' }
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