'use client';

import { useState } from 'react';

interface ModernFAQItemType {
  id: string;
  question: string;
  answer: string;
}

interface ModernFAQProps {
  items?: ModernFAQItemType[];
}

export default function ModernFAQ({ items = modernFAQItems }: ModernFAQProps) {
  const [openId, setOpenId] = useState<string>('1');

  return (
    <div className="w-full max-w-2xl mx-auto p-6">
      <div className="space-y-4">
        {items.map((item) => (
          <ModernFAQItem
            key={item.id}
            item={item}
            isOpen={openId === item.id}
            onToggle={() => setOpenId(openId === item.id ? '' : item.id)}
          />
        ))}
      </div>
    </div>
  );
}

interface ModernFAQItemProps {
  item: ModernFAQItemType;
  isOpen: boolean;
  onToggle: () => void;
}

function ModernFAQItem({ item, isOpen, onToggle }: ModernFAQItemProps) {
  return (
    <div className="bg-gray-50 rounded-xl p-4 transition-all duration-300 hover:bg-gray-100">
      <button
        type="button"
        onClick={onToggle}
        className="w-full text-right flex items-start gap-4"
        aria-expanded={isOpen}
        aria-controls={`modern-faq-panel-${item.id}`}
      >
        <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
          <span className="text-blue-600 text-sm">?</span>
        </div>
        
        <div className="flex-1">
          <h3 className="font-medium text-gray-900 text-sm mb-2">{item.question}</h3>
          {isOpen && (
            <p className="text-gray-600 text-sm leading-relaxed" id={`modern-faq-panel-${item.id}`}>
              {item.answer}
            </p>
          )}
        </div>

        <span className={`text-gray-400 transform transition-transform ${isOpen ? 'rotate-180' : ''}`}>
          ▼
        </span>
      </button>
    </div>
  );
}

const modernFAQItems: ModernFAQItemType[] = [
  {
    id: '1',
    question: 'ما هي مدة معالجة البيانات؟',
    answer: 'تستغرق المعالجة من بضع ثوانٍ إلى دقائق قليلة حسب حجم البيانات وتعقيد التحليل.'
  },
  {
    id: '2', 
    question: 'هل يمكنني استخدام المنصة مجاناً؟',
    answer: 'نعم، نقدم خطة مجانية تشمل الميزات الأساسية مع حدود معينة للاستخدام.'
  },
  {
    id: '3',
    question: 'كيف يتم احتساب التكلفة؟',
    answer: 'التكلفة تعتمد على حجم البيانات وعدد التحليلات المطلوبة. يمكنك الاطلاع على الأسعار من صفحة الاشتراكات.'
  }
];