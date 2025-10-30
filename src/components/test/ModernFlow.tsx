'use client';

export default function ModernFlow({ activeStep = 'upload' }) {
  const steps = [
    { id: 'upload', title: 'رفع الملف', icon: '📁' },
    { id: 'process', title: 'معالجة', icon: '⚡' },
    { id: 'analyze', title: 'تحليل', icon: '📊' },
    { id: 'result', title: 'النتيجة', icon: '✅' }
  ];

  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-8">
      <div className="relative">
        {/* Progress Line */}
        <div className="absolute top-6 left-4 right-4 h-0.5 bg-gray-200" />
        
        {/* Filled Progress */}
        <div 
          className="absolute top-6 h-0.5 bg-blue-500 transition-all duration-500"
          style={{
            width: `${(steps.findIndex(s => s.id === activeStep) + 1) * (100 / steps.length)}%`
          }}
        />

        {/* Steps */}
        <div className="relative flex justify-between">
          {steps.map((step, index) => {
            const isActive = step.id === activeStep;
            const isCompleted = steps.findIndex(s => s.id === activeStep) >= index;
            
            return (
              <div key={step.id} className="flex flex-col items-center">
                {/* Step Circle */}
                <div className={`
                  w-12 h-12 rounded-full flex items-center justify-center mb-2
                  transition-all duration-300
                  ${isCompleted ? 'bg-blue-500 text-white' : 'bg-white text-gray-400'}
                  ${isActive ? 'ring-4 ring-blue-100 scale-110' : ''}
                `}>
                  {isCompleted ? '✓' : step.icon}
                </div>

                {/* Step Title */}
                <span className={`
                  text-sm font-medium transition-colors
                  ${isCompleted ? 'text-blue-600' : 'text-gray-500'}
                `}>
                  {step.title}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}