'use client';

interface CTACardProps {
  title: string;
  description: string;
  buttonText: string;
  onButtonClick: () => void;
  variant?: 'primary' | 'secondary' | 'success';
  icon?: string;
}

export default function CTACard({
  title,
  description,
  buttonText,
  onButtonClick,
  variant = 'primary',
  icon = '🚀'
}: CTACardProps) {
  const variantStyles = {
    primary: {
      card: 'bg-gradient-to-br from-blue-500 to-blue-600',
      button: 'bg-white text-blue-600 hover:bg-gray-100'
    },
    secondary: {
      card: 'bg-gradient-to-br from-gray-800 to-gray-900',
      button: 'bg-white text-gray-800 hover:bg-gray-100'
    },
    success: {
      card: 'bg-gradient-to-br from-green-500 to-green-600',
      button: 'bg-white text-green-600 hover:bg-gray-100'
    }
  };

  return (
    <div className={`rounded-2xl p-8 text-white ${variantStyles[variant].card}`}>
      <div className="flex items-start gap-4 mb-6">
        <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center text-xl">
          {icon}
        </div>
        <div>
          <h3 className="text-2xl font-bold mb-2">{title}</h3>
          <p className="text-blue-100 text-lg leading-relaxed">{description}</p>
        </div>
      </div>

      <button
        onClick={onButtonClick}
        className={`
          px-8 py-3 rounded-lg font-semibold transition-colors
          ${variantStyles[variant].button}
        `}
      >
        {buttonText}
      </button>
    </div>
  );
}