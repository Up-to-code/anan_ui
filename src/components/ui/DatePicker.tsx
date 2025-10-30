'use client';

import { useState } from 'react';

interface CustomCalendarProps {
  value?: string;
  onChange: (date: string) => void;
}

export default function CustomCalendar({ value, onChange }: CustomCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(
    value ? new Date(value) : null
  );

  // Arabic month names
  const monthNames = [
    'يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو',
    'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'
  ];

  // Arabic day names
  const dayNames = ['أحد', 'إثنين', 'ثلاثاء', 'أربعاء', 'خميس', 'جمعة', 'سبت'];

  // Get days in month
  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  // Get first day of month
  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  // Handle date selection
  const handleDateSelect = (day: number) => {
    const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    setSelectedDate(newDate);
    onChange(newDate.toISOString().split('T')[0]);
  };

  // Navigate months
  const navigateMonth = (direction: number) => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + direction, 1));
  };

  // Check if date is today
  const isToday = (day: number) => {
    const today = new Date();
    return (
      day === today.getDate() &&
      currentDate.getMonth() === today.getMonth() &&
      currentDate.getFullYear() === today.getFullYear()
    );
  };

  // Check if date is selected
  const isSelected = (day: number) => {
    if (!selectedDate) return false;
    return (
      day === selectedDate.getDate() &&
      currentDate.getMonth() === selectedDate.getMonth() &&
      currentDate.getFullYear() === selectedDate.getFullYear()
    );
  };

  const daysInMonth = getDaysInMonth(currentDate);
  const firstDay = getFirstDayOfMonth(currentDate);

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 w-80">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => navigateMonth(-1)}
          className="w-8 h-8 rounded hover:bg-gray-100 flex items-center justify-center text-gray-600"
        >
          ‹
        </button>
        
        <div className="text-center">
          <div className="font-medium text-gray-900">
            {monthNames[currentDate.getMonth()]}
          </div>
          <div className="text-sm text-gray-500">
            {currentDate.getFullYear()}
          </div>
        </div>

        <button
          onClick={() => navigateMonth(1)}
          className="w-8 h-8 rounded hover:bg-gray-100 flex items-center justify-center text-gray-600"
        >
          ›
        </button>
      </div>

      {/* Day Names */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {dayNames.map((day) => (
          <div
            key={day}
            className="text-center text-xs text-gray-500 py-2 font-medium"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1">
        {/* Empty cells for days before first day of month */}
        {Array.from({ length: firstDay }).map((_, index) => (
          <div key={`empty-${index}`} className="h-8" />
        ))}

        {/* Days of the month */}
        {Array.from({ length: daysInMonth }, (_, i) => {
          const day = i + 1;
          const today = isToday(day);
          const selected = isSelected(day);

          return (
            <button
              key={day}
              onClick={() => handleDateSelect(day)}
              className={`
                h-8 rounded text-sm transition-colors
                ${selected
                  ? 'bg-blue-500 text-white'
                  : today
                  ? 'bg-blue-50 text-blue-600 border border-blue-200'
                  : 'text-gray-700 hover:bg-gray-100'
                }
              `}
            >
              {day}
            </button>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="flex gap-2 mt-4 pt-4 border-t border-gray-100">
        <button
          onClick={() => {
            const today = new Date();
            setCurrentDate(new Date(today.getFullYear(), today.getMonth(), 1));
            setSelectedDate(today);
            onChange(today.toISOString().split('T')[0]);
          }}
          className="flex-1 py-2 text-xs text-blue-600 hover:bg-blue-50 rounded transition-colors"
        >
          اليوم
        </button>
        <button
          onClick={() => {
            const tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            setCurrentDate(new Date(tomorrow.getFullYear(), tomorrow.getMonth(), 1));
            setSelectedDate(tomorrow);
            onChange(tomorrow.toISOString().split('T')[0]);
          }}
          className="flex-1 py-2 text-xs text-gray-600 hover:bg-gray-50 rounded transition-colors"
        >
          غداً
        </button>
      </div>
    </div>
  );
}