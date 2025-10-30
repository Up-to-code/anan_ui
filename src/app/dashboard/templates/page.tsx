/* eslint-disable @typescript-eslint/no-explicit-any */
// app/dashboard/templates/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { FiPlus, FiSearch, FiEdit, FiTrash2, FiMessageSquare } from 'react-icons/fi';
import { Card, CardContent } from '@/components/ui/card';

interface Template {
  id: string;
  name: string;
  language: string;
  content: string;
  isActive: boolean;
  createdAt: string;
}

export default function TemplatesPage() {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<Template | null>(null);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 800));
      
      setTemplates([
        {
          id: '1',
          name: 'رسالة ترحيب',
          language: 'ar',
          content: 'مرحباً {اسم}!\nشكراً لتواصلك معنا. نحن متخصصون في العقارات ونساعدك في العثور على المنزل المثالي.',
          isActive: true,
          createdAt: '2024-01-01T00:00:00Z'
        },
        {
          id: '2',
          name: 'تفاصيل العقار',
          language: 'ar',
          content: 'العقار: {عنوان_العقار}\nالنوع: {نوع_العقار}\nالمساحة: {المساحة} م²\nالسعر: {السعر} {العملة}',
          isActive: true,
          createdAt: '2024-01-02T00:00:00Z'
        },
        {
          id: '3',
          name: 'Welcome Message',
          language: 'en',
          content: 'Hello {name}!\nThank you for contacting us. We specialize in real estate and help you find the perfect home.',
          isActive: true,
          createdAt: '2024-01-03T00:00:00Z'
        },
        {
          id: '4',
          name: 'Property Details',
          language: 'en',
          content: 'Property: {property_title}\nType: {property_type}\nArea: {area} m²\nPrice: {price} {currency}',
          isActive: false,
          createdAt: '2024-01-04T00:00:00Z'
        },
        {
          id: '5',
          name: 'تأكيد الحجز',
          language: 'ar',
          content: 'تم تأكيد حجزك!\n\nالتفاصيل:\nالعقار: {عنوان_العقار}\nالتاريخ: {تاريخ_الزيارة}\nالوقت: {وقت_الزيارة}',
          isActive: true,
          createdAt: '2024-01-05T00:00:00Z'
        },
        {
          id: '6',
          name: 'متابعة',
          language: 'ar',
          content: 'مرحباً {اسم},\n\nنأمل أن تكون بخير. هل لا زلت مهتماً بالعقار الذي ناقشناه؟',
          isActive: true,
          createdAt: '2024-01-06T00:00:00Z'
        }
      ]);
      setLoading(false);
    };

    loadData();
  }, []);

  const filteredTemplates = templates.filter(template =>
    template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    template.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (id: string) => {
    if (confirm('هل أنت متأكد من حذف هذا القالب؟')) {
      setTemplates(templates.filter(template => template.id !== id));
    }
  };

  const handleToggleStatus = (id: string) => {
    setTemplates(templates.map(template => 
      template.id === id 
        ? { ...template, isActive: !template.isActive }
        : template
    ));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">جاري تحميل القوالب...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-4">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">القوالب</h1>
          <p className="text-gray-600">إدارة قوالب الرسائل</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg"
        >
          <FiPlus size={18} />
          <span>إضافة قالب</span>
        </button>
      </div>

      {/* Search */}
      <Card className="border border-gray-200">
        <CardContent className="p-4">
          <div className="relative">
            <FiSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="ابحث في القوالب..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
        </CardContent>
      </Card>

      {/* Templates List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTemplates.map((template) => (
          <Card key={template.id} className="border border-gray-200">
            <CardContent className="p-4">
              {/* Template Header */}
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-semibold text-gray-900">{template.name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      template.language === 'ar' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                    }`}>
                      {template.language === 'ar' ? 'عربي' : 'English'}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      template.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {template.isActive ? 'نشط' : 'غير نشط'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Template Content Preview */}
              <div className="mb-4">
                <p className="text-gray-600 text-sm line-clamp-3">
                  {template.content}
                </p>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <button
                  onClick={() => setEditingTemplate(template)}
                  className="flex-1 py-2 bg-blue-600 text-white rounded-lg text-sm"
                >
                  تعديل
                </button>
                <button
                  onClick={() => handleDelete(template.id)}
                  className="p-2 text-red-600 rounded-lg"
                >
                  <FiTrash2 size={16} />
                </button>
              </div>

              {/* Quick Actions */}
              <div className="flex gap-2 mt-3">
                <button
                  onClick={() => handleToggleStatus(template.id)}
                  className={`flex-1 py-1 text-xs rounded ${
                    template.isActive 
                      ? 'bg-red-100 text-red-700' 
                      : 'bg-green-100 text-green-700'
                  }`}
                >
                  {template.isActive ? 'تعطيل' : 'تفعيل'}
                </button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* No Results */}
      {filteredTemplates.length === 0 && (
        <Card className="border border-gray-200">
          <CardContent className="text-center py-12">
            <FiMessageSquare className="mx-auto text-gray-400 mb-3" size={48} />
            <div className="text-gray-500 text-lg">لا توجد قوالب</div>
            <button 
              onClick={() => setShowAddModal(true)}
              className="inline-block mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg"
            >
              إضافة أول قالب
            </button>
          </CardContent>
        </Card>
      )}

      {/* Add/Edit Modal */}
      {(showAddModal || editingTemplate) && (
        <TemplateModal
          template={editingTemplate}
          onClose={() => {
            setShowAddModal(false);
            setEditingTemplate(null);
          }}
          onSave={(templateData) => {
            if (editingTemplate) {
              setTemplates(templates.map(t => 
                t.id === editingTemplate.id 
                  ? { ...t, ...templateData }
                  : t
              ));
            } else {
              const newTemplate = {
                ...templateData,
                id: Math.random().toString(),
                createdAt: new Date().toISOString()
              };
              setTemplates([...templates, newTemplate]);
            }
            setShowAddModal(false);
            setEditingTemplate(null);
          }}
        />
      )}
    </div>
  );
}

// Template Modal Component
function TemplateModal({ template, onClose, onSave }: { 
  template?: Template | null; 
  onClose: () => void; 
  onSave: (data: any) => void;
}) {
  const [formData, setFormData] = useState({
    name: template?.name || '',
    language: template?.language || 'ar',
    content: template?.content || '',
    isActive: template?.isActive ?? true
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg w-full max-w-md">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-bold text-gray-900">
            {template ? 'تعديل قالب' : 'إضافة قالب جديد'}
          </h2>
        </div>
        
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm text-gray-700 mb-1">اسم القالب</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded text-sm"
            />
          </div>

          {/* Language */}
          <div>
            <label className="block text-sm text-gray-700 mb-1">اللغة</label>
            <select
              value={formData.language}
              onChange={(e) => setFormData({ ...formData, language: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded text-sm"
            >
              <option value="ar">العربية</option>
              <option value="en">English</option>
            </select>
          </div>

          {/* Content */}
          <div>
            <label className="block text-sm text-gray-700 mb-1">المحتوى</label>
            <textarea
              required
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              rows={4}
              className="w-full p-2 border border-gray-300 rounded text-sm resize-none"
            />
          </div>

          {/* Status */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={formData.isActive}
              onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
              className="rounded border-gray-300 text-blue-600"
            />
            <span className="text-sm text-gray-700">نشط</span>
          </div>

          {/* Buttons */}
          <div className="flex gap-2 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2 text-center border border-gray-300 rounded text-gray-600 text-sm"
            >
              إلغاء
            </button>
            <button
              type="submit"
              className="flex-1 py-2 bg-blue-600 text-white rounded text-sm"
            >
              {template ? 'تحديث' : 'إضافة'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}