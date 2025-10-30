'use client';

import { useState } from 'react';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { BaseComponentProps } from '.';

interface AccordionItem {
  id: string;
  title: string;
  content: React.ReactNode;
  icon?: React.ComponentType<{ size?: number; className?: string }>;
}

interface AccordionProps extends BaseComponentProps {
  items: AccordionItem[];
  multiple?: boolean;
  defaultOpen?: string[];
}

export const Accordion = {
  // Basic Accordion
  Basic: ({ items, multiple = false, defaultOpen = [], className = '' }: AccordionProps) => {
    const [openItems, setOpenItems] = useState<string[]>(defaultOpen);

    const toggleItem = (itemId: string) => {
      if (multiple) {
        setOpenItems(prev =>
          prev.includes(itemId)
            ? prev.filter(id => id !== itemId)
            : [...prev, itemId]
        );
      } else {
        setOpenItems(prev =>
          prev.includes(itemId) ? [] : [itemId]
        );
      }
    };

    return (
      <div className={`space-y-2 ${className}`}>
        {items.map((item) => {
          const isOpen = openItems.includes(item.id);
          const Icon = item.icon;

          return (
            <div key={item.id} className="border border-gray-200 rounded-xl overflow-hidden">
              <button
                onClick={() => toggleItem(item.id)}
                className="flex items-center justify-between w-full p-4 text-right hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center space-x-3 space-x-reverse">
                  {Icon && <Icon size={18} className="text-gray-500 flex-shrink-0" />}
                  <span className="font-medium text-gray-900">{item.title}</span>
                </div>
                {isOpen ? <FiChevronUp size={18} /> : <FiChevronDown size={18} />}
              </button>
              
              {isOpen && (
                <div className="px-4 pb-4 border-t border-gray-200">
                  {item.content}
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
  },

  // Bordered Accordion
  Bordered: ({ items, multiple = false, defaultOpen = [], className = '' }: AccordionProps) => {
    const [openItems, setOpenItems] = useState<string[]>(defaultOpen);

    const toggleItem = (itemId: string) => {
      if (multiple) {
        setOpenItems(prev =>
          prev.includes(itemId)
            ? prev.filter(id => id !== itemId)
            : [...prev, itemId]
        );
      } else {
        setOpenItems(prev =>
          prev.includes(itemId) ? [] : [itemId]
        );
      }
    };

    return (
      <div className={`border border-gray-200 rounded-xl divide-y divide-gray-200 ${className}`}>
        {items.map((item) => {
          const isOpen = openItems.includes(item.id);
          const Icon = item.icon;

          return (
            <div key={item.id}>
              <button
                onClick={() => toggleItem(item.id)}
                className="flex items-center justify-between w-full p-4 text-right hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center space-x-3 space-x-reverse">
                  {Icon && <Icon size={18} className="text-gray-500 flex-shrink-0" />}
                  <span className="font-medium text-gray-900">{item.title}</span>
                </div>
                {isOpen ? <FiChevronUp size={18} /> : <FiChevronDown size={18} />}
              </button>
              
              {isOpen && (
                <div className="px-4 pb-4 bg-gray-50">
                  {item.content}
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
  }
};