'use client';

import { useState } from 'react';
import ModernFlow from '../../../components/test/ModernFlow';
import SimpleProcess from '../../../components/test/SimpleProcess';
import ProgressSteps from '../../../components/test/ProgressSteps';

// Define step names using TypeScript for better type-safety
type StepKey = 'upload' | 'process' | 'analyze' | 'result';

const stepNames: Record<StepKey, string> = {
  upload: 'رفع الملفات',
  process: 'معالجة البيانات',
  analyze: 'التحليل الذكي',
  result: 'النتائج',
};

function getStepName(step: StepKey) {
  return stepNames[step] || step;
}

export default function Home() {
  const [activeStep, setActiveStep] = useState<StepKey>('upload');
  const [currentStep, setCurrentStep] = useState(1);

  const steps: StepKey[] = ['upload', 'process', 'analyze', 'result'];

  const nextStep = () => {
    const currentIndex = steps.indexOf(activeStep);
    if (currentIndex < steps.length - 1) {
      setActiveStep(steps[currentIndex + 1]);
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    const currentIndex = steps.indexOf(activeStep);
    if (currentIndex > 0) {
      setActiveStep(steps[currentIndex - 1]);
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="min-h-screen bg-white p-6" dir="rtl">
      <div className="max-w-2xl mx-auto">

        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <span className="text-white text-2xl">ع</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">سير العمل</h1>
          <p className="text-gray-500">تابع تقدمك في النظام</p>
        </div>

        {/* Modern Flow */}
        <div className="mb-12">
          <ModernFlow activeStep={activeStep} />
        </div>

        {/* Simple Process */}
        <div className="mb-12">
          <SimpleProcess activeStep={currentStep.toString()} />
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <ProgressSteps currentStep={currentStep} totalSteps={steps.length} />
        </div>

        {/* Controls */}
        <div className="flex gap-3 justify-center">
          <button
            onClick={prevStep}
            disabled={currentStep === 1}
            className="px-6 py-3 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            السابق
          </button>
          <button
            onClick={nextStep}
            disabled={currentStep === steps.length}
            className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            التالي
          </button>
        </div>

        {/* Current Step Info */}
        <div className="text-center mt-8 p-4 bg-blue-50 rounded-lg">
          <p className="text-blue-600 font-medium">
            الخطوة الحالية: {getStepName(activeStep)}
          </p>
          <p className="text-sm text-blue-500 mt-1">
            {currentStep} من {steps.length}
          </p>
        </div>

      </div>
    </div>
  );
}