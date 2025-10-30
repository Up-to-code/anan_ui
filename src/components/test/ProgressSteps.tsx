'use client';

export default function ProgressSteps({ currentStep = 1, totalSteps = 4 }) {
  return (
    <div className="w-full max-w-md mx-auto p-6">
      <div className="flex items-center justify-between mb-8">
        {Array.from({ length: totalSteps }, (_, i) => {
          const step = i + 1;
          const isActive = step === currentStep;
          const isCompleted = step < currentStep;

          return (
            <div key={step} className="flex flex-col items-center">
              {/* Step Circle */}
              <div className={`
                w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium
                transition-all duration-300
                ${isCompleted ? 'bg-green-500 text-white' : 
                  isActive ? 'bg-blue-500 text-white' : 
                  'bg-gray-200 text-gray-400'}
              `}>
                {isCompleted ? '✓' : step}
              </div>

              {/* Connector Line */}
              {step < totalSteps && (
                <div className={`
                  flex-1 h-0.5 mt-5 transition-colors
                  ${isCompleted ? 'bg-green-500' : 'bg-gray-200'}
                `} />
              )}
            </div>
          );
        })}
      </div>

      {/* Step Labels */}
      <div className="flex justify-between text-xs text-gray-500 px-2">
        <span>بداية</span>
        <span>نهاية</span>
      </div>
    </div>
  );
}