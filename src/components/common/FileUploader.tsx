// components/common/FileUploader.tsx
'use client';

import { useState, useRef } from 'react';
import { useToast } from '../ui/ToastContext';

interface UploadedFile {
  id: string;
  file: File;
  progress: number;
  status: 'uploading' | 'completed' | 'error';
  url?: string;
}

export default function FileUploader() {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { addToast } = useToast();

  const handleFileSelect = (files: FileList | null) => {
    if (!files) return;

    const newFiles: UploadedFile[] = Array.from(files).map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      file,
      progress: 0,
      status: 'uploading'
    }));

    setUploadedFiles(prev => [...prev, ...newFiles]);

    // Simulate upload process
    newFiles.forEach(file => {
      simulateUpload(file.id);
    });

    addToast({
      title: 'تم رفع الملفات',
      message: `تم بدء رفع ${files.length} ملف`,
      type: 'success'
    });
  };

  const simulateUpload = (fileId: string) => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 20;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        
        setUploadedFiles(prev => prev.map(f => 
          f.id === fileId 
            ? { ...f, progress: 100, status: 'completed' }
            : f
        ));

        addToast({
          title: 'اكتمال الرفع',
          message: 'تم رفع الملف بنجاح',
          type: 'success'
        });
      } else {
        setUploadedFiles(prev => prev.map(f => 
          f.id === fileId ? { ...f, progress } : f
        ));
      }
    }, 200);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFileSelect(e.dataTransfer.files);
  };

  const removeFile = (fileId: string) => {
    setUploadedFiles(prev => prev.filter(f => f.id !== fileId));
    addToast({
      title: 'تم الحذف',
      message: 'تم إزالة الملف',
      type: 'info'
    });
  };

  const getStatusColor = (status: UploadedFile['status']) => {
    switch (status) {
      case 'uploading': return 'bg-blue-500';
      case 'completed': return 'bg-green-500';
      case 'error': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusText = (status: UploadedFile['status']) => {
    switch (status) {
      case 'uploading': return 'جاري الرفع';
      case 'completed': return 'مكتمل';
      case 'error': return 'خطأ';
      default: return 'معلق';
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-6">
      {/* Upload Area */}
      <div
        className={`
          border-2 border-dashed rounded-2xl p-12 text-center transition-colors cursor-pointer
          ${isDragging 
            ? 'border-blue-400 bg-blue-50' 
            : 'border-gray-300 bg-white hover:border-blue-400 hover:bg-blue-50'
          }
        `}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <div className="w-20 h-20 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <span className="text-3xl text-blue-600">📁</span>
        </div>
        
        <h3 className="text-2xl font-bold text-gray-900 mb-3">
          اسحب وأفلت الملفات هنا
        </h3>
        
        <p className="text-gray-600 mb-6">
          أو انقر لاختيار الملفات من جهازك
        </p>
        
        <button
          className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
          onClick={(e) => {
            e.stopPropagation();
            fileInputRef.current?.click();
          }}
        >
          اختر الملفات
        </button>
        
        <input
          ref={fileInputRef}
          type="file"
          multiple
          className="hidden"
          onChange={(e) => handleFileSelect(e.target.files)}
        />
        
        <p className="text-sm text-gray-500 mt-4">
          PNG, JPG, PDF, DOCX حتى 10MB
        </p>
      </div>

      {/* Uploaded Files List */}
      {uploadedFiles.length > 0 && (
        <div className="mt-8 bg-white rounded-2xl border border-gray-200 p-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">
            الملفات المرفوعة ({uploadedFiles.length})
          </h4>
          
          <div className="space-y-4">
            {uploadedFiles.map((file) => (
              <div
                key={file.id}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
              >
                <div className="flex items-center flex-1">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center ml-4">
                    <span className="text-lg">📄</span>
                  </div>
                  
                  <div className="flex-1">
                    <p className="font-medium text-gray-900 text-sm">
                      {file.file.name}
                    </p>
                    <p className="text-gray-500 text-xs">
                      {(file.file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-4 space-x-reverse">
                  <div className="text-right ml-4">
                    <span className={`inline-block w-3 h-3 rounded-full ${getStatusColor(file.status)} ml-2`}></span>
                    <span className="text-sm text-gray-600">
                      {getStatusText(file.status)}
                    </span>
                  </div>

                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all ${getStatusColor(file.status)}`}
                      style={{ width: `${file.progress}%` }}
                    ></div>
                  </div>

                  <button
                    onClick={() => removeFile(file.id)}
                    className="text-gray-400 hover:text-red-500 transition-colors p-2"
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}