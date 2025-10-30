'use client';

import { useState } from 'react';

interface SimpleFAQItem {
  id: string;
  question: string;
  answer: string;
}

interface SimpleFAQProps {
  items?: SimpleFAQItem[];
}

export default function SimpleFAQ({ items = simpleFAQItems }: SimpleFAQProps) {
  const [openId, setOpenId] = useState<string | null>(null);

  const handleToggle = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="w-full max-w-xl mx-auto">
      <div className="space-y-2">
        {items.map((item) => (
          <div key={item.id} className="border-b border-gray-100 pb-2">
            <button
              type="button"
              onClick={() => handleToggle(item.id)}
              className="w-full py-3 text-right flex justify-between items-center"
              aria-expanded={openId === item.id}
              aria-controls={`faq-panel-${item.id}`}
            >
              <span className="text-sm text-gray-700">{item.question}</span>
              <span className="text-gray-400 text-sm" aria-hidden="true">
                {openId === item.id ? '−' : '+'}
              </span>
            </button>
            
            {openId === item.id && (
              <p
                className="text-gray-500 text-sm pb-3 pr-4 leading-relaxed"
                id={`faq-panel-${item.id}`}
              >
                {item.answer}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

const simpleFAQItems: SimpleFAQItem[] = [
  {
    id: '1',
    question: 'هل يمكنني إلغاء الاشتراك في أي وقت؟',
    answer: 'نعم، يمكنك إلغاء اشتراكك في أي وقت وسيظل لديك إمكانية الوصول حتى نهاية فترة الفوترة.'
  },
  {
    id: '2',
    question: 'ما هي سياسة الاسترجاع؟',
    answer: 'نقدم استرجاع كامل للمبلغ خلال 14 يوماً من الاشتراك إذا لم تكن راضياً عن الخدمة.'
  },
  {
    id: '3',
    question: 'هل تدعم اللغة العربية بشكل كامل؟',
    answer: 'نعم، المنصة تدعم اللغة العربية بشكل كامل في الواجهة ومعالجة النصوص.'
  }
];