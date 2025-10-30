'use client';

interface ProgressStep {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  current?: boolean;
}

interface ProgressTimelineProps {
  steps?: ProgressStep[];
  currentStep?: number;
}

export default function ProgressTimeline({ 
  steps = defaultSteps,
  currentStep = 2 
}: ProgressTimelineProps) {
  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      
      {/* Header */}
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">مراحل التقدم</h2>
        <p className="text-gray-600">تابع تقدمك في إنجاز المهام</p>
      </div>

      {/* Progress Bar */}
      <div className="mb-12">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-medium text-gray-700">التقدم العام</span>
          <span className="text-sm font-medium text-blue-600">
            {Math.round((currentStep / steps.length) * 100)}%
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div 
            className="bg-blue-600 h-3 rounded-full transition-all duration-500"
            style={{ width: `${(currentStep / steps.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Steps */}
      <div className="space-y-6">
        {steps.map((step, index) => (
          <ProgressStepComponent 
            key={step.id}
            step={step}
            stepNumber={index + 1}
            isCurrent={index + 1 === currentStep}
          />
        ))}
      </div>

    </div>
  );
}

function ProgressStepComponent({ 
  step, 
  stepNumber, 
  isCurrent 
}: { 
  step: ProgressStep; 
  stepNumber: number; 
  isCurrent: boolean; 
}) {
  return (
    <div className="flex items-start gap-4 p-4 bg-white rounded-xl border-2 transition-all duration-300 hover:shadow-md"
      style={{
        borderColor: isCurrent ? '#2563eb' : step.completed ? '#10b981' : '#e5e7eb'
      }}
    >
      
      {/* Step Number */}
      <div className={`
        w-10 h-10 rounded-full flex items-center justify-center font-semibold text-white
        ${step.completed ? 'bg-green-500' : 
          isCurrent ? 'bg-blue-500' : 'bg-gray-400'}
      `}>
        {step.completed ? '✓' : stepNumber}
      </div>

      {/* Content */}
      <div className="flex-1">
        <div className="flex items-center gap-3 mb-2">
          <h3 className="text-lg font-semibold text-gray-900">{step.title}</h3>
          {isCurrent && (
            <span className="px-2 py-1 bg-blue-100 text-blue-600 rounded-full text-xs font-medium">
              جاري العمل
            </span>
          )}
          {step.completed && (
            <span className="px-2 py-1 bg-green-100 text-green-600 rounded-full text-xs font-medium">
              مكتمل
            </span>
          )}
        </div>
        <p className="text-gray-600 text-sm leading-relaxed">
          {step.description}
        </p>
      </div>

    </div>
  );
}

const defaultSteps: ProgressStep[] = [
  {
    id: '1',
    title: 'التسجيل وإنشاء الحساب',
    description: 'إكمال عملية التسجيل وإنشاء الحساب الشخصي على المنصة.',
    completed: true
  },
  {
    id: '2',
    title: 'إعداد البيانات الأولية',
    description: 'رفع وتنظيم البيانات الأساسية المطلوبة لبدء التحليل.',
    completed: true,
    current: true
  },
  {
    id: '3',
    title: 'تهيئة النظام',
    description: 'تخصيص الإعدادات وتكوين النظام حسب احتياجاتك الخاصة.',
    completed: false
  },
  {
    id: '4',
    title: 'بدء التحليل',
    description: 'تشغيل أول عملية تحليل والحصول على النتائج الأولية.',
    completed: false
  },
  {
    id: '5',
    title: 'مراجعة النتائج',
    description: 'تحليل النتائج واتخاذ القرارات بناءً على التقارير المقدمة.',
    completed: false
  }
];