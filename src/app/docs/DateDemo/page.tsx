'use client';

import ModernDatePicker from '@/components/ui/DatePicker';
import { useState } from 'react';
 
export default function Home() {
  const [selectedDate, setSelectedDate] = useState('');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-8" dir="rtl">
      <div className="max-w-md mx-auto">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">منصة عنان</h1>
          <p className="text-gray-600">اختر التاريخ المناسب لمهمتك</p>
        </div>

        {/* Date Picker */}
        <div className="space-y-4">
          <label className="text-gray-700 font-medium">تاريخ البدء</label>
          <ModernDatePicker
            value={selectedDate}
            onChange={setSelectedDate}
          />
        </div>

        {/* Selected Date Display */}
        {selectedDate && (
          <div className="mt-8 p-4 bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="text-center">
              <p className="text-gray-600 mb-2">التاريخ المحدد:</p>
              <p className="text-2xl font-bold text-blue-600">
                {new Date(selectedDate).toLocaleDateString('ar-EG', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}