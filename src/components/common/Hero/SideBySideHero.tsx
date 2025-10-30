'use client';

interface SideBySideHeroProps {
  title: string;
  subtitle: string;
  features: {
    icon: string;
    title: string;
    description: string;
  }[];
  primaryAction: {
    label: string;
    onClick: () => void;
  };
  image?: React.ReactNode;
}

export default function SideBySideHero({
  title,
  subtitle,
  features,
  primaryAction,
  image
}: SideBySideHeroProps) {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Content Side */}
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                {title}
              </h1>
              
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                {subtitle}
              </p>

              {/* Features */}
              <div className="space-y-6 mb-8">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <span className="text-blue-600 text-xl">{feature.icon}</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Action */}
              <button
                onClick={primaryAction.onClick}
                className="px-8 py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-semibold"
              >
                {primaryAction.label}
              </button>
            </div>

            {/* Visual Side */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-3xl p-8">
              {image || (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">🚀</div>
                  <div className="text-gray-600">صورة أو رسم توضيحي</div>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}