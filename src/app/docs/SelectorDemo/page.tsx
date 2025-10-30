'use client';

import { useState } from 'react';
import Selector from '../../../components/ui/Selector';
import SimpleSelect from '../../../components/ui/SimpleSelect';
import RadioSelector from '../../../components/ui/RadioSelector';
import TabSelector from '../../../components/ui/TabSelector';
import PillSelector from '../../../components/ui/PillSelector';

export default function SelectorDemo() {
  const [selectValue, setSelectValue] = useState('');
  const [simpleValue, setSimpleValue] = useState('');
  const [radioValue, setRadioValue] = useState('');
  const [tabValue, setTabValue] = useState('tab1');
  const [pillValue, setPillValue] = useState('');

  const options = [
    { value: 'opt1', label: 'الخيار الأول' },
    { value: 'opt2', label: 'الخيار الثاني' },
    { value: 'opt3', label: 'الخيار الثالث' },
  ];

  const tabs = [
    { value: 'tab1', label: 'تبويب ١' },
    { value: 'tab2', label: 'تبويب ٢' },
    { value: 'tab3', label: 'تبويب ٣' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-8" dir="rtl">
      <div className="max-w-md mx-auto space-y-8">
        
        {/* Advanced Selector */}
        <div>
          <h3 className="text-lg font-medium mb-2">محدد متقدم</h3>
          <Selector
            options={options}
            value={selectValue}
            onChange={setSelectValue}
          />
        </div>

        {/* Simple Select */}
        <div>
          <h3 className="text-lg font-medium mb-2">محدد بسيط</h3>
          <SimpleSelect
            options={options}
            value={simpleValue}
            onChange={setSimpleValue}
          />
        </div>

        {/* Radio Selector */}
        <div>
          <h3 className="text-lg font-medium mb-2">محدد راديو</h3>
          <RadioSelector
            options={options}
            value={radioValue}
            onChange={setRadioValue}
          />
        </div>

        {/* Tab Selector */}
        <div>
          <h3 className="text-lg font-medium mb-2">محدد تبويبات</h3>
          <TabSelector
            tabs={tabs}
            activeTab={tabValue}
            onChange={setTabValue}
          />
        </div>

        {/* Pill Selector */}
        <div>
          <h3 className="text-lg font-medium mb-2">محدد حبوب</h3>
          <PillSelector
            options={options}
            value={pillValue}
            onChange={setPillValue}
          />
        </div>

        {/* Selected Values Display */}
        <div className="bg-white p-4 rounded-lg border">
          <h4 className="font-medium mb-2">القيم المحددة:</h4>
          <div className="text-sm text-gray-600 space-y-1">
            <div>محدد متقدم: {selectValue}</div>
            <div>محدد بسيط: {simpleValue}</div>
            <div>راديو: {radioValue}</div>
            <div>تبويب: {tabValue}</div>
            <div>حبوب: {pillValue}</div>
          </div>
        </div>

      </div>
    </div>
  );
}