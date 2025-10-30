'use client';

import { FiSearch, FiEye, FiEyeOff, FiLock } from 'react-icons/fi';
import { useState } from 'react';
import { BaseComponentProps } from '.';

interface InputBaseProps extends BaseComponentProps {
  label?: string;
  name?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  error?: string;
  disabled?: boolean;
  required?: boolean;
  icon?: React.ComponentType<{ className?: string }>;
  direction?: 'rtl' | 'ltr';
  type?: string; // Added type prop to base interface
}

interface InputTextProps extends InputBaseProps {
  type?: 'text' | 'email' | 'number' | 'tel' | 'url' | 'password' | 'search';
}

interface InputSelectProps extends InputBaseProps {
  options: { value: string; label: string }[];
}

interface InputTextareaProps extends InputBaseProps {
  rows?: number;
}

export const Input = {
  Text: ({
    label,
    name,
    placeholder,
    value,
    onChange,
    error,
    disabled = false,
    className = '',
    type = 'text',
    required,
    icon: Icon,
    direction = 'rtl',
    ...props
  }: InputTextProps) => (
    <div className={`flex flex-col space-y-2 ${className}`} dir={direction}>
      {label && (
        <label htmlFor={name} className="text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500 mr-1">*</span>}
        </label>
      )}
      <div className="relative">
        <input
          type={type}
          id={name}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          required={required}
          className={`
            w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all duration-200
            ${Icon ? (direction === 'rtl' ? 'pr-12' : 'pl-12') : ''}
            ${error
              ? 'border-red-500 focus:ring-red-500 focus:border-transparent'
              : 'border-gray-300 focus:ring-blue-500 focus:border-transparent'
            }
            ${disabled ? 'bg-gray-100 cursor-not-allowed opacity-60' : 'bg-white'}
            ${direction === 'rtl' ? 'text-right' : 'text-left'}
          `}
          {...props}
        />
        {Icon && (
          <Icon
            className={`absolute top-1/2 transform -translate-y-1/2 text-gray-400 
            ${direction === 'rtl' ? 'right-4' : 'left-4'}`} 
          />
        )}
      </div>
      {error && <p className="text-red-500 text-sm" role="alert">{error}</p>}
    </div>
  ),

  Email: (props: InputBaseProps) => (
    <Input.Text {...props} type="email" />
  ),

  Password: ({
    label,
    name,
    placeholder,
    value,
    onChange,
    error,
    disabled = false,
    className = '',
    required,
    icon: Icon = FiLock,
    direction = 'rtl',
    ...props
  }: InputBaseProps) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
      <div className={`flex flex-col space-y-2 ${className}`} dir={direction}>
        {label && (
          <label htmlFor={name} className="text-sm font-medium text-gray-700">
            {label}
            {required && <span className="text-red-500 mr-1">*</span>}
          </label>
        )}
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            id={name}
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            disabled={disabled}
            required={required}
            className={`
              w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all duration-200
              ${direction === 'rtl' ? 'pr-24' : 'pl-24'}
              ${error
                ? 'border-red-500 focus:ring-red-500 focus:border-transparent'
                : 'border-gray-300 focus:ring-blue-500 focus:border-transparent'
              }
              ${disabled ? 'bg-gray-100 cursor-not-allowed opacity-60' : 'bg-white'}
              ${direction === 'rtl' ? 'text-right' : 'text-left'}
            `}
            {...props}
          />
          {Icon && (
            <Icon
              className={`absolute top-1/2 transform -translate-y-1/2 text-gray-400 
              ${direction === 'rtl' ? 'right-12' : 'left-12'}`}
            />
          )}
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            disabled={disabled}
            tabIndex={-1}
            className={`absolute top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors
              ${direction === 'rtl' ? 'left-4' : 'right-4'}
              ${disabled ? 'cursor-not-allowed opacity-50' : ''}
            `}
            aria-label={showPassword ? "إخفاء كلمة المرور" : "إظهار كلمة المرور"}
            aria-pressed={showPassword}
          >
            {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
          </button>
        </div>
        {error && <p className="text-red-500 text-sm" role="alert">{error}</p>}
      </div>
    );
  },

  Search: ({
    placeholder,
    name,
    value,
    onChange,
    className = '',
    direction = 'rtl',
    ...props
  }: InputBaseProps) => (
    <div className={`relative ${className}`} dir={direction}>
      <FiSearch
        className={`absolute top-1/2 transform -translate-y-1/2 text-gray-400 
        ${direction === 'rtl' ? 'right-4' : 'left-4'}`}
        size={18}
      />
      <input
        type="search"
        id={name}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`
          w-full px-12 py-3 bg-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all duration-200 text-sm
          ${direction === 'rtl' ? 'text-right' : 'text-left'}
        `}
        {...props}
      />
    </div>
  ),

  Select: ({
    label,
    name,
    value,
    onChange,
    options,
    error,
    disabled = false,
    className = '',
    required,
    direction = 'rtl',
    ...props
  }: InputSelectProps) => (
    <div className={`flex flex-col space-y-2 ${className}`} dir={direction}>
      {label && (
        <label htmlFor={name} className="text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500 mr-1">*</span>}
        </label>
      )}
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        required={required}
        className={`
          px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200
          ${error
            ? 'border-red-500 focus:ring-red-500'
            : 'border-gray-300 focus:ring-blue-500'
          }
          ${disabled ? 'bg-gray-100 cursor-not-allowed opacity-60' : 'bg-white'}
          ${direction === 'rtl' ? 'text-right' : 'text-left'}
        `}
        {...props}
      >
        <option value="">اختر...</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="text-red-500 text-sm" role="alert">{error}</p>}
    </div>
  ),

  Textarea: ({
    label,
    name,
    placeholder,
    value,
    onChange,
    error,
    disabled = false,
    rows = 4,
    className = '',
    required,
    direction = 'rtl',
    ...props
  }: InputTextareaProps) => (
    <div className={`flex flex-col space-y-2 ${className}`} dir={direction}>
      {label && (
        <label htmlFor={name} className="text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500 mr-1">*</span>}
        </label>
      )}
      <textarea
        id={name}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        rows={rows}
        required={required}
        className={`
          px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all duration-200 resize-vertical
          ${error
            ? 'border-red-500 focus:ring-red-500 focus:border-transparent'
            : 'border-gray-300 focus:ring-blue-500 focus:border-transparent'
          }
          ${disabled ? 'bg-gray-100 cursor-not-allowed opacity-60' : 'bg-white'}
          ${direction === 'rtl' ? 'text-right' : 'text-left'}
        `}
        {...props}
      />
      {error && <p className="text-red-500 text-sm" role="alert">{error}</p>}
    </div>
  ),
};