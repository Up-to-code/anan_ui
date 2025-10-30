'use client';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: string;
  features: string[];
  variant?: 'default' | 'highlight';
  onClick?: () => void;
}

export default function FeatureCard({
  title,
  description,
  icon,
  features,
  variant = 'default',
  onClick
}: FeatureCardProps) {
  return (
    <div 
      onClick={onClick}
      className={`
        rounded-xl p-6 border transition-all duration-300 cursor-pointer
        ${variant === 'highlight' 
          ? 'bg-gradient-to-br from-blue-500 to-blue-600 text-white border-blue-500 hover:shadow-lg' 
          : 'bg-white border-gray-200 hover:border-blue-300 hover:shadow-md'
        }
      `}
    >
      {/* Icon */}
      <div className={`
        w-12 h-12 rounded-lg flex items-center justify-center text-lg mb-4
        ${variant === 'highlight' ? 'bg-white/20' : 'bg-blue-100 text-blue-600'}
      `}>
        {icon}
      </div>

      {/* Content */}
      <h3 className={`
        font-semibold text-lg mb-2
        ${variant === 'highlight' ? 'text-white' : 'text-gray-900'}
      `}>
        {title}
      </h3>
      
      <p className={`
        text-sm mb-4 leading-relaxed
        ${variant === 'highlight' ? 'text-blue-100' : 'text-gray-600'}
      `}>
        {description}
      </p>

      {/* Features List */}
      <ul className="space-y-2">
        {features.map((feature, index) => (
          <li 
            key={index}
            className={`
              flex items-center text-sm
              ${variant === 'highlight' ? 'text-blue-100' : 'text-gray-600'}
            `}
          >
            <span className={`
              w-1 h-1 rounded-full mr-3
              ${variant === 'highlight' ? 'bg-blue-200' : 'bg-blue-400'}
            `} />
            {feature}
          </li>
        ))}
      </ul>
    </div>
  );
}