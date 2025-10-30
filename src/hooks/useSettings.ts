'use client';

import { useState, useCallback } from 'react';

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

interface UseSettingsProps {
  initialSettings: Record<string, FieldValue>;
  onSave?: (data: Record<string, FieldValue>) => Promise<void> | void;
}

export function useSettings({ initialSettings, onSave }: UseSettingsProps) {
  const [settings, setSettings] = useState<Record<string, FieldValue>>(initialSettings);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const updateSetting = useCallback((key: string, value: FieldValue) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  }, []);

  const updateSettings = useCallback((newSettings: Record<string, FieldValue>) => {
    setSettings(prev => ({
      ...prev,
      ...newSettings
    }));
  }, []);

  const validateField = useCallback((field: SettingField, value: FieldValue): string | null => {
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
        return 'هذا الحقل مطلوب';
      }
    }

    if (field.validation) {
      return field.validation(value);
    }

    return null;
  }, []);

  const validateFields = useCallback((fields: SettingField[], values: Record<string, FieldValue>) => {
    const newErrors: Record<string, string> = {};

    fields.forEach(field => {
      const error = validateField(field, values[field.id]);
      if (error) {
        newErrors[field.id] = error;
      }
    });

    return newErrors;
  }, [validateField]);

  const saveSettings = useCallback(async (data: Record<string, FieldValue>, fields?: SettingField[]) => {
    if (fields) {
      const validationErrors = validateFields(fields, data);
      
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return false;
      }
    }

    setLoading(true);
    setErrors({});

    try {
      if (onSave) {
        await onSave(data);
      }
      updateSettings(data);
      return true;
    } catch (error) {
      console.error('Failed to save settings:', error);
      setErrors({ submit: 'فشل في حفظ الإعدادات' });
      return false;
    } finally {
      setLoading(false);
    }
  }, [onSave, updateSettings, validateFields]);

  const resetSettings = useCallback(() => {
    setSettings(initialSettings);
    setErrors({});
  }, [initialSettings]);

  const clearErrors = useCallback(() => {
    setErrors({});
  }, []);

  return {
    settings,
    loading,
    errors,
    updateSetting,
    updateSettings,
    saveSettings,
    resetSettings,
    clearErrors,
    validateField,
    validateFields
  };
}