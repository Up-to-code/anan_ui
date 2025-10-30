'use client';

import { useState } from 'react';
import { BaseComponentProps } from '.';

interface TabsProps extends BaseComponentProps {
  tabs: {
    id: string;
    label: string;
    content: React.ReactNode;
    icon?: React.ComponentType<{ size?: number; className?: string }>;
  }[];
  defaultTab?: string;
}

export const Tabs = {
  // Basic Tabs
  Basic: ({ tabs, defaultTab, className = '' }: TabsProps) => {
    const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id);

    return (
      <div className={className}>
        {/* Tab Headers */}
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 space-x-reverse" aria-label="Tabs">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    flex items-center space-x-2 space-x-reverse py-4 px-1 border-b-2 font-medium text-sm transition-colors
                    ${
                      isActive
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }
                  `}
                >
                  {Icon && <Icon size={18} className="flex-shrink-0" />}
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="mt-4">
          {tabs.find((tab) => tab.id === activeTab)?.content}
        </div>
      </div>
    );
  },

  // Pills Tabs
  Pills: ({ tabs, defaultTab, className = '' }: TabsProps) => {
    const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id);

    return (
      <div className={className}>
        {/* Tab Headers */}
        <div className="flex space-x-2 space-x-reverse">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  flex items-center space-x-2 space-x-reverse px-4 py-2 rounded-full font-medium text-sm transition-colors
                  ${
                    isActive
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }
                `}
              >
                {Icon && <Icon size={16} className="flex-shrink-0" />}
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        <div className="mt-4">
          {tabs.find((tab) => tab.id === activeTab)?.content}
        </div>
      </div>
    );
  }
};