'use client';

interface MinimalHeroProps {
  title: string;
  subtitle: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export default function MinimalHero({
  title,
  subtitle,
  action
}: MinimalHeroProps) {
  return (
    <div className="min-h-[70vh] bg-white flex items-center justify-center px-6">
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          {title}
        </h1>
        
        <p className="text-lg text-gray-600 mb-8 leading-relaxed">
          {subtitle}
        </p>

        {action && (
          <button
            onClick={action.onClick}
            className="px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-medium"
          >
            {action.label}
          </button>
        )}
      </div>
    </div>
  );
}