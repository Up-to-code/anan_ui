'use client';

interface BrandHeroProps {
  title: string;
  subtitle: string;
  features: string[];
  primaryAction: {
    label: string;
    onClick: () => void;
  };
  secondaryAction?: {
    label: string;
    onClick: () => void;
  };
}

export default function BrandHero({
  title,
  subtitle,
  features,
  primaryAction,
  secondaryAction
}: BrandHeroProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-blue-600 text-white">
      <div className="container mx-auto px-6 py-20">
        <div className="max-w-6xl mx-auto">
          
          {/* Logo */}
          <div className="flex items-center gap-3 mb-16">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
              <span className="text-white font-bold text-xl">ع</span>
            </div>
            <div>
              <span className="text-xl font-bold">عنان</span>
              <span className="text-blue-200 text-lg mr-2">AI</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Content */}
            <div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                {title}
              </h1>
              
              <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                {subtitle}
              </p>

              {/* Features */}
              <div className="space-y-3 mb-8">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-white rounded-full" />
                    <span className="text-blue-100">{feature}</span>
                  </div>
                ))}
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={primaryAction.onClick}
                  className="px-8 py-4 bg-white text-blue-600 rounded-xl hover:bg-gray-100 transition-colors font-semibold text-lg flex items-center gap-2"
                >
                  {primaryAction.label}
                  <span>→</span>
                </button>
                
                {secondaryAction && (
                  <button
                    onClick={secondaryAction.onClick}
                    className="px-8 py-4 bg-transparent text-white rounded-xl border border-white/30 hover:bg-white/10 transition-colors font-semibold text-lg"
                  >
                    {secondaryAction.label}
                  </button>
                )}
              </div>
            </div>

            {/* Visual */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <div className="grid grid-cols-2 gap-4">
                {[1, 2, 3, 4].map((item) => (
                  <div key={item} className="bg-white/10 rounded-xl p-4 text-center">
                    <div className="text-2xl mb-2">📊</div>
                    <div className="text-blue-100 text-sm">ميزة {item}</div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}