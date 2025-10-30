'use client';

interface PricingCardProps {
  title: string;
  price: string;
  period?: string;
  features: string[];
  buttonText: string;
  onButtonClick: () => void;
  popular?: boolean;
  description?: string;
}

export default function PricingCard({
  title,
  price,
  period = '/شهر',
  features,
  buttonText,
  onButtonClick,
  popular = false,
  description
}: PricingCardProps) {
  return (
    <div className={`
      relative rounded-2xl p-8 border-2 transition-all duration-300
      ${popular 
        ? 'bg-white border-blue-500 shadow-lg scale-105' 
        : 'bg-white border-gray-200 hover:border-blue-300 hover:shadow-md'
      }
    `}>
      {/* Popular Badge */}
      {popular && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
          <div className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium">
            الأكثر شيوعاً
          </div>
        </div>
      )}

      {/* Header */}
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
        {description && (
          <p className="text-gray-600 text-sm mb-4">{description}</p>
        )}
        <div className="flex items-baseline justify-center gap-1">
          <span className="text-3xl font-bold text-gray-900">{price}</span>
          <span className="text-gray-600 text-sm">{period}</span>
        </div>
      </div>

      {/* Features */}
      <ul className="space-y-3 mb-8">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center text-sm text-gray-600">
            <span className="w-1 h-1 bg-blue-400 rounded-full ml-3" />
            {feature}
          </li>
        ))}
      </ul>

      {/* Button */}
      <button
        onClick={onButtonClick}
        className={`
          w-full py-3 rounded-lg font-semibold transition-colors
          ${popular 
            ? 'bg-blue-500 text-white hover:bg-blue-600' 
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }
        `}
      >
        {buttonText}
      </button>
    </div>
  );
}