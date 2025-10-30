'use client';

import { useState, useCallback, useRef } from 'react';
import { useToast } from '../ui/ToastContext';

export default function FileUploader() {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const { showToast } = useToast();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFiles = useCallback((files: File[]) => {
    const validFiles = files.filter(file =>
      file.type.startsWith('image/') ||
      file.type.startsWith('application/pdf') ||
      file.type.includes('text')
    );

    if (validFiles.length > 0) {
      setUploadedFiles(prev => [...prev, ...validFiles]);
      showToast(`تم رفع ${validFiles.length} ملف بنجاح`, 'success');
    } else {
      showToast('يرجى اختيار ملفات صالحة (صور، PDF، نصوص)', 'error');
    }
  }, [showToast]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  }, [handleFiles]);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    handleFiles(files);
  }, [handleFiles]);

  const removeFile = useCallback((index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
    showToast('تم حذف الملف', 'info');
  }, [showToast]);

  return (
    <div className="w-full max-w-lg mx-auto">
      <div
        className={`border border-blue-200/70 rounded-2xl bg-white shadow-sm p-0 transition relative group
        ${isDragging ? 'ring-2 ring-blue-400' : 'hover:border-blue-400'}`}
        dir="rtl"
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <button
          type="button"
          className="w-full flex flex-col items-center justify-center pt-10 pb-7 px-5 bg-gradient-to-bl from-white to-blue-50 rounded-t-2xl cursor-pointer transition outline-none border-none"
          onClick={() => inputRef.current?.click()}
          tabIndex={0}
        >
          <span className="flex items-center justify-center w-14 h-14 mb-3 rounded-full bg-blue-50 border border-blue-100">
            <svg className="w-7 h-7 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 16v-8m-4 4h8" />
            </svg>
          </span>
          <span className="text-base font-semibold text-blue-800 mb-2">اسحب أو اختر ملفًا للرفع</span>
          <span className="text-xs text-gray-500 mb-3">png, jpg, pdf, txt, doc (الحد الأقصى: 10MB)</span>
          <span className="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md text-sm hover:bg-blue-700 transition-colors">
            اختيار الملفات
          </span>
        </button>
        <input
          ref={inputRef}
          type="file"
          multiple
          onChange={handleFileInput}
          className="sr-only"
          id="file-upload"
          accept="image/*,.pdf,.txt,.doc,.docx"
        />
      </div>

      {uploadedFiles.length > 0 && (
        <div className="mt-7">
          <div className="rounded-xl border border-blue-100 bg-blue-50/30 p-5 overflow-hidden">
            <h4 className="text-sm font-semibold text-blue-800 mb-3">الملفات المرفوعة</h4>
            <div className="flex flex-col gap-2">
              {uploadedFiles.map((file, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between py-2 px-3 rounded-lg bg-white border border-blue-100/70 group"
                >
                  <div className="flex items-center gap-2 flex-1 min-w-0">
                    <div className="flex items-center justify-center bg-blue-50 border border-blue-100 rounded-full w-7 h-7 mr-2">
                      <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M7 17V7a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v10M7 17H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h2m0 12v2a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-2"
                        />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0 text-right">
                      <div className="text-sm text-blue-900 truncate">{file.name}</div>
                      <div className="text-xs text-gray-500 mt-0.5">{(file.size / 1024 / 1024).toFixed(2)} MB</div>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFile(index)}
                    className="ml-3 text-red-400 hover:text-red-600 transition-colors p-1"
                    aria-label="حذف الملف"
                    tabIndex={0}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 7h12M9 7V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3m-7 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v3m1 0v12a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V7z" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}