'use client';

interface CleanCenteredHeroProps {
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

export default function CleanCenteredHero({
  title,
  subtitle,
  primaryAction,
  secondaryAction
}: CleanCenteredHeroProps) {
  return (
    <div className="min-h-screen w-full bg-white relative overflow-hidden">
      
      {/* Minimal Gradient Background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(229,231,235,0.8) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(229,231,235,0.8) 1px, transparent 1px),
            radial-gradient(circle 500px at 20% 100%, rgba(139,92,246,0.1), transparent),
            radial-gradient(circle 500px at 100% 80%, rgba(59,130,246,0.1), transparent)
          `,
          backgroundSize: "48px 48px, 48px 48px, 100% 100%, 100% 100%",
        }}
      />
      
      {/* Content */}
      <section className="relative z-10 py-24 px-4 flex flex-col items-center justify-center min-h-screen">
        <div className="container max-w-3xl mx-auto text-center">
          
          {/* Tagline */}
          <div className="mb-8 flex justify-center animate-fade-in">
            <div className="flex items-center gap-2 text-blue-600 font-medium px-4 py-1.5">
              <div className="h-1.5 w-1.5 bg-blue-600 rounded-full" />
              الذكاء الاصطناعي • النمو • التميز
            </div>
          </div>
          
          {/* Headline */}
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 animate-fade-in-up">
            {title}
            <br />
            <span className="text-blue-600">للنمو الذكي</span>
          </h1>
          
          {/* Description */}
          <p className="text-gray-600 text-lg max-w-xl mx-auto mb-10 animate-fade-in-up delay-100">
            {subtitle}
          </p>
          
          {/* CTAs */}
          <div className="flex flex-col sm:flex-row justify-center gap-3 animate-fade-in-up delay-200">
            <button
              onClick={primaryAction.onClick}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center gap-2 justify-center"
            >
              {primaryAction.label}
              <span>→</span>
            </button>
            
            {secondaryAction && (
              <button
                onClick={secondaryAction.onClick}
                className="px-6 py-3 bg-white text-gray-700 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors font-medium"
              >
                {secondaryAction.label}
              </button>
            )}
          </div>
          
          {/* Social Proof */}
          <div className="mt-16 bg-gray-50 rounded-xl p-5 max-w-md mx-auto animate-fade-in-up delay-300">
            <div className="flex items-center justify-center gap-4">
              
              {/* Avatars */}
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div 
                    key={i} 
                    className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full border-2 border-white flex items-center justify-center text-white text-xs font-bold"
                  >
                    {i}
                  </div>
                ))}
              </div>
              
              {/* Ratings */}
              <div className="text-right">
                <div className="flex items-center gap-1 justify-end">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-400 text-sm">★</span>
                  ))}
                  <span className="font-bold text-gray-900 mr-1">٤.٩</span>
                </div>
                <p className="text-gray-600 text-sm">٢٥٠+ شركة ناجحة</p>
              </div>
              
            </div>
          </div>
          
        </div>
      </section>
    </div>
  );
}