'use client';

export default function SimpleProcess({ activeStep = '1' }) {
  const steps = [
    { id: '1', title: 'إدخال البيانات', desc: 'أدخل المعلومات المطلوبة' },
    { id: '2', title: 'معالجة ذكية', desc: 'تحليل بالذكاء الاصطناعي' },
    { id: '3', title: 'نتائج فورية', desc: 'الحصول على التحليلات' }
  ];

  return (
    <div className="w-full max-w-lg mx-auto p-6">
      <div className="space-y-4">
        {steps.map((step, index) => {
          const isActive = step.id === activeStep;
          const isCompleted = parseInt(activeStep) > parseInt(step.id);

          return (
            <div key={step.id} className="flex items-start gap-4">
              {/* Step Number */}
              <div className={`
                w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium
                transition-all duration-300 flex-shrink-0
                ${isCompleted ? 'bg-green-500 text-white' : 
                  isActive ? 'bg-blue-500 text-white ring-4 ring-blue-100' : 
                  'bg-gray-100 text-gray-400'}
              `}>
                {isCompleted ? '✓' : index + 1}
              </div>

              {/* Step Content */}
              <div className={`
                flex-1 pb-4 transition-colors
                ${index < steps.length - 1 ? 'border-b border-gray-100' : ''}
              `}>
                <h3 className={`
                  font-medium transition-colors
                  ${isActive || isCompleted ? 'text-gray-900' : 'text-gray-500'}
                `}>
                  {step.title}
                </h3>
                <p className="text-sm text-gray-400 mt-1">
                  {step.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}