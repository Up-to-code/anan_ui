'use client';

interface SimpleHeroProps {
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

export default function SimpleHero({
  title,
  subtitle,
  primaryAction,
  secondaryAction
}: SimpleHeroProps) {
  return (
    <div className="min-h-screen w-full bg-white">
      
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-100 opacity-50" />
      
      {/* Content */}
      <div className="relative z-10 py-24 px-4 flex items-center justify-center min-h-screen">
        <div className="max-w-3xl mx-auto text-center">
          
          {/* Badge */}
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 bg-white rounded-full px-4 py-2 border border-blue-200 shadow-sm">
              <div className="w-2 h-2 bg-blue-500 rounded-full" />
              <span className="text-blue-600 font-medium text-sm">منصة عنان للذكاء الاصطناعي</span>
            </div>
          </div>
          
          {/* Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            {title}
          </h1>
          
          {/* Subtitle */}
          <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            {subtitle}
          </p>
          
          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <button
              onClick={primaryAction.onClick}
              className="px-8 py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-semibold text-lg flex items-center gap-2 justify-center"
            >
              {primaryAction.label}
              <span>→</span>
            </button>
            
            {secondaryAction && (
              <button
                onClick={secondaryAction.onClick}
                className="px-8 py-4 bg-white text-blue-600 rounded-xl border border-blue-200 hover:bg-blue-50 transition-colors font-semibold text-lg"
              >
                {secondaryAction.label}
              </button>
            )}
          </div>
          
          {/* Social Proof */}
          <div className="bg-white rounded-2xl p-6 max-w-md mx-auto border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between">
              
              {/* Avatars */}
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div 
                    key={i} 
                    className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full border-2 border-white flex items-center justify-center text-white text-sm font-bold"
                  >
                    {i}
                  </div>
                ))}
              </div>
              
              {/* Ratings */}
              <div className="text-right">
                <div className="flex items-center gap-1 justify-end mb-1">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-400">★</span>
                  ))}
                  <span className="font-bold text-gray-900 mr-2">٤.٩</span>
                </div>
                <p className="text-gray-600 text-sm">٢٥٠+ شركة واثقة</p>
              </div>
              
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}