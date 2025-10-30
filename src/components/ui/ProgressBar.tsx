// components/ProgressBar.tsx
export function ProgressBar({ value, max = 100, color = 'blue' }: { value: number; max?: number; color?: string }) {
    const percentage = (value / max) * 100;
    
    return (
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className={`h-2 rounded-full bg-${color}-500 transition-all duration-300`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    );
  }