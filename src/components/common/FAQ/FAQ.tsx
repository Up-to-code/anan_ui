'use client';

import { useState } from 'react';

interface FAQItemType {
  id: string;
  question: string;
  answer: string;
}

interface FAQProps {
  items?: FAQItemType[];
  title?: string;
}

export default function FAQ({
  items = defaultFAQItems,
  title = "الأسئلة الشائعة"
}: FAQProps) {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggleItem = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">{title}</h2>
        <p className="text-gray-500">إجابات على الأسئلة الأكثر شيوعاً</p>
      </div>

      {/* FAQ Items */}
      <div className="space-y-3">
        {items.map((item) => (
          <FAQSingleItem
            key={item.id}
            item={item}
            isOpen={openId === item.id}
            onToggle={() => toggleItem(item.id)}
          />
        ))}
      </div>
    </div>
  );
}

interface FAQSingleItemProps {
  item: FAQItemType;
  isOpen: boolean;
  onToggle: () => void;
}

function FAQSingleItem({ item, isOpen, onToggle }: FAQSingleItemProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200">
      <button
        type="button"
        onClick={onToggle}
        className="w-full px-6 py-4 text-right flex justify-between items-center hover:bg-gray-50 transition-colors"
        aria-expanded={isOpen}
        aria-controls={`faq-panel-${item.id}`}
      >
        <span className="font-medium text-gray-900 text-sm">{item.question}</span>
        <span
          className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
          aria-hidden="true"
        >
          ▼
        </span>
      </button>

      {isOpen && (
        <div className="px-6 pb-4" id={`faq-panel-${item.id}`}>
          <div className="border-t border-gray-100 pt-4">
            <p className="text-gray-600 text-sm leading-relaxed">{item.answer}</p>
          </div>
        </div>
      )}
    </div>
  );
}

const defaultFAQItems: FAQItemType[] = [
  {
    id: '1',
    question: 'كيف يمكنني البدء في استخدام المنصة؟',
    answer: 'يمكنك البدء بإنشاء حساب جديد ثم اتباع الخطوات الإرشادية لإعداد حسابك ورفع بياناتك الأولى.'
  },
  {
    id: '2',
    question: 'ما هي أنواع الملفات المدعومة؟',
    answer: 'ندعم الصور بجميع الصيغ الشائعة، ملفات PDF، ومستندات النصوص. الحد الأقصى لحجم الملف هو 10MB.'
  },
  {
    id: '3',
    question: 'هل بياناتي آمنة ومحمية؟',
    answer: 'نعم، نستخدم أحدث تقنيات التشفير ونلتزم بأعلى معايير الأمان لحماية بياناتك.'
  },
  {
    id: '4',
    question: 'كيف يمكنني التواصل مع الدعم؟',
    answer: 'يتوفر فريق الدعم على مدار الساعة عبر البريد الإلكتروني والدردشة المباشرة من داخل المنصة.'
  }
];