'use client';

import { useState, ChangeEvent, FormEvent } from 'react';

type FieldValue = string | number | boolean | File | undefined;

interface SettingField {
  id: string;
  label: string;
  type: 'text' | 'email' | 'password' | 'number' | 'textarea' | 'select' | 'toggle' | 'file';
  value: FieldValue;
  options?: { label: string; value: string }[];
  placeholder?: string;
  required?: boolean;
  description?: string;
  validation?: (value: FieldValue) => string | null;
}

interface SettingsFormProps {
  title: string;
  description?: string;
  fields: SettingField[];
  onSubmit: (data: Record<string, FieldValue>) => void;
  onCancel?: () => void;
  loading?: boolean;
}

export default function SettingsForm({
  title,
  description,
  fields,
  onSubmit,
  onCancel,
  loading = false,
}: SettingsFormProps) {
  const [formData, setFormData] = useState<Record<string, FieldValue>>(
    fields.reduce((acc, field) => {
      acc[field.id] = field.value;
      return acc;
    }, {} as Record<string, FieldValue>)
  );

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (fieldId: string, value: FieldValue) => {
    setFormData((prev) => ({
      ...prev,
      [fieldId]: value,
    }));

    if (errors[fieldId]) {
      setErrors((prev) => ({
        ...prev,
        [fieldId]: '',
      }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    fields.forEach((field) => {
      const value = formData[field.id];
      
      if (field.required) {
        if (
          field.type === 'file'
            ? !value
            : field.type === 'toggle'
            ? value !== true
            : value === undefined ||
              (typeof value === 'string' && value.trim() === '') ||
              (typeof value === 'number' && isNaN(value))
        ) {
          newErrors[field.id] = 'هذا الحقل مطلوب';
        }
      }
      
      if (field.validation && value !== undefined) {
        const error = field.validation(value);
        if (error) {
          newErrors[field.id] = error;
        }
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const renderField = (field: SettingField) => {
    const commonProps = {
      className: `w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
        errors[field.id] ? 'border-red-500' : 'border-gray-300'
      }`,
      placeholder: field.placeholder,
      required: field.required,
    };

    switch (field.type) {
      case 'textarea':
        return (
          <textarea
            {...commonProps}
            rows={4}
            value={formData[field.id] as string || ''}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
              handleChange(field.id, e.target.value)
            }
          />
        );
      
      case 'select':
        return (
          <select
            {...commonProps}
            value={formData[field.id] as string || ''}
            onChange={(e: ChangeEvent<HTMLSelectElement>) =>
              handleChange(field.id, e.target.value)
            }
          >
            <option value="">اختر...</option>
            {field.options?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );
      
      case 'toggle':
        return (
          <label className="inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={Boolean(formData[field.id])}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                handleChange(field.id, e.target.checked)
              }
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:right-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        );
      
      case 'file':
        return (
          <input
            type="file"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleChange(field.id, e.target.files?.[0])
            }
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        );
      
      default:
        return (
          <input
            type={field.type}
            {...commonProps}
            value={formData[field.id] as string || ''}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleChange(field.id, e.target.value)
            }
          />
        );
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900">{title}</h2>
        {description && <p className="text-gray-600 mt-1">{description}</p>}
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit}>
        <div className="space-y-6">
          {fields.map((field) => (
            <div key={field.id}>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {field.label}
                {field.required && <span className="text-red-500 mr-1">*</span>}
              </label>

              {renderField(field)}

              {field.description && (
                <p className="text-gray-500 text-sm mt-1">{field.description}</p>
              )}

              {errors[field.id] && (
                <p className="text-red-500 text-sm mt-1">{errors[field.id]}</p>
              )}
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="flex gap-3 justify-end mt-8 pt-6 border-t border-gray-200">
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
            >
              إلغاء
            </button>
          )}
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium flex items-center gap-2"
          >
            {loading && (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            )}
            حفظ الإعدادات
          </button>
        </div>
      </form>
    </div>
  );
}