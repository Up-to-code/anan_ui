'use client';

interface PrimaryCardProps {
  title: string;
  description: string;
  icon?: string;
  onClick?: () => void;
  variant?: 'default' | 'outline' | 'filled';
  className?: string;
}

export default function PrimaryCard({
  title,
  description,
  icon = '⭐',
  onClick,
  variant = 'default',
  className = ''
}: PrimaryCardProps) {
  const baseStyles = "rounded-xl p-6 transition-all duration-300 cursor-pointer";
  
  const variants = {
    default: "bg-white border border-gray-200 hover:border-blue-300 hover:shadow-md",
    outline: "border-2 border-blue-200 bg-white hover:border-blue-300 hover:bg-blue-50",
    filled: "bg-gradient-to-br from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700"
  };

  return (
    <div 
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      <div className="flex items-start gap-4">
        <div className={`
          w-12 h-12 rounded-lg flex items-center justify-center text-lg
          ${variant === 'filled' ? 'bg-white/20' : 'bg-blue-100 text-blue-600'}
        `}>
          {icon}
        </div>
        <div className="flex-1">
          <h3 className={`
            font-semibold text-lg mb-2
            ${variant === 'filled' ? 'text-white' : 'text-gray-900'}
          `}>
            {title}
          </h3>
          <p className={`
            text-sm leading-relaxed
            ${variant === 'filled' ? 'text-blue-100' : 'text-gray-600'}
          `}>
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}