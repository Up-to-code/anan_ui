'use client';

type TabOption = {
  value: string;
  label: string;
};

interface TabSelectorProps {
  tabs?: TabOption[];
  activeTab?: string;
  onChange: (value: string) => void;
}

export default function TabSelector({ 
  tabs = [],
  activeTab,
  onChange 
}: TabSelectorProps) {
  return (
    <div className="flex border-b border-gray-200">
      {tabs.map(tab => (
        <button
          key={tab.value}
          onClick={() => onChange(tab.value)}
          className={`px-4 py-3 border-b-2 transition-colors ${
            activeTab === tab.value 
              ? 'border-blue-500 text-blue-600' 
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
          type="button"
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}