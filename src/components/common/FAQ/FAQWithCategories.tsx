'use client';

import { useState } from 'react';

type FAQItem = {
  id: string;
  question: string;
  answer: string;
};

type CategoryKey = 'general' | 'technical' | 'billing';

type CategoriesType = {
  general: {
    title: string;
    items: FAQItem[];
  };
  technical: {
    title: string;
    items: FAQItem[];
  };
  billing: {
    title: string;
    items: FAQItem[];
  };
};

const categories: CategoriesType = {
  general: {
    title: 'عام',
    items: [
      {
        id: 'gen1',
        question: 'ما هي منصة عنان؟',
        answer: 'منصة عنان هي نظام ذكاء اصطناعي متكامل لتحليل البيانات وتقديم رؤى ذكية.'
      },
      {
        id: 'gen2',
        question: 'كيف أبدأ الاستخدام؟',
        answer: 'يمكنك البدء بالتسجيل وإنشاء حساب، ثم اتباع الدليل الإرشادي.'
      }
    ]
  },
  technical: {
    title: 'تقني',
    items: [
      {
        id: 'tech1',
        question: 'ما هي المتطلبات التقنية؟',
        answer: 'تعمل المنصة على جميع المتصفحات الحديثة ولا تحتاج إلى تثبيت أي برامج.'
      },
      {
        id: 'tech2',
        question: 'هل هناك تطبيق جوال؟',
        answer: 'نعم، تتوفر تطبيقات لكل من iOS و Android.'
      }
    ]
  },
  billing: {
    title: 'الدفع والاشتراك',
    items: [
      {
        id: 'bill1',
        question: 'ما هي طرق الدفع المتاحة؟',
        answer: 'نقبل الدفع بالبطاقات الائتمانية، PayPal، والتحويل البنكي.'
      }
    ]
  }
};

export default function FAQWithCategories() {
  const [activeCategory, setActiveCategory] = useState<CategoryKey>('general');
  const [openItem, setOpenItem] = useState<string>('');

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      {/* Categories */}
      <div className="flex gap-2 mb-8 overflow-x-auto">
        {Object.entries(categories).map(([key, category]) => (
          <button
            key={key}
            onClick={() => setActiveCategory(key as CategoryKey)}
            className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
              activeCategory === key
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {category.title}
          </button>
        ))}
      </div>

      {/* FAQ Items */}
      <div className="space-y-3">
        {categories[activeCategory].items.map((item: FAQItem) => (
          <div key={item.id} className="bg-white rounded-lg border border-gray-200">
            <button
              onClick={() => setOpenItem(openItem === item.id ? '' : item.id)}
              className="w-full px-6 py-4 text-right flex justify-between items-center hover:bg-gray-50"
            >
              <span className="font-medium text-gray-900">{item.question}</span>
              <span className="text-gray-400">{openItem === item.id ? '−' : '+'}</span>
            </button>

            {openItem === item.id && (
              <div className="px-6 pb-4">
                <p className="text-gray-600 leading-relaxed">{item.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}