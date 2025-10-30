'use client';

interface Stat {
  value: string;
  label: string;
}

interface StatsHeroProps {
  title: string;
  subtitle: string;
  stats: Stat[];
  primaryAction: {
    label: string;
    onClick: () => void;
  };
}

export default function StatsHero({
  title,
  subtitle,
  stats,
  primaryAction
}: StatsHeroProps) {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          
          {/* Content */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            {title}
          </h1>
          
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
            {subtitle}
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600 text-sm">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* Action */}
          <button
            onClick={primaryAction.onClick}
            className="px-8 py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-semibold text-lg"
          >
            {primaryAction.label}
          </button>

        </div>
      </div>
    </div>
  );
}