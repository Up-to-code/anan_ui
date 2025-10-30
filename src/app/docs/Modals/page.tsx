'use client';

import BasicModal from '@/components/common/Modal/BasicModal';
import ConfirmModal from '@/components/common/Modal/ConfirmModal';
import FormModal from '@/components/common/Modal/FormModal';
import FullscreenModal from '@/components/common/Modal/FullscreenModal';
import SuccessModal from '@/components/common/Modal/SuccessModal';
import { useModal } from '@/hooks/useModal';
import { useState } from 'react';


export default function ModalsPage() {
  // Basic Modal
  const basicModal = useModal();

  // Confirm Modal
  const confirmModal = useModal();
  const [confirmAction, setConfirmAction] = useState<'delete' | 'update' | ''>('');

  // Form Modal
  const formModal = useModal();
  const [formData, setFormData] = useState<{ name: string; email: string }>({ name: '', email: '' });
  const [loading, setLoading] = useState(false);

  // Success Modal
  const successModal = useModal();

  // Fullscreen Modal
  const fullscreenModal = useModal();

  const handleConfirm = () => {
    // handle the confirmation logic
    if (confirmAction) {
      // Replace console.log and simulate a real use
      // For example, you might want to delete or update something here
      // For now, just log the action
      console.log('Confirmed action:', confirmAction);
    }
    confirmModal.close();
    successModal.open();
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // In a real app, you may send formData to the server here
      console.log('Form submitted:', formData);
      // Reset the form (optional):
      setFormData({ name: '', email: '' });
      formModal.close();
      successModal.open();
    } finally {
      setLoading(false);
    }
  };

  const openDeleteConfirm = () => {
    setConfirmAction('delete');
    confirmModal.open();
  };

  const openUpdateConfirm = () => {
    setConfirmAction('update');
    confirmModal.open();
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12" dir="rtl">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">مكونات النوافذ</h1>
          <p className="text-gray-600 text-lg">أنواع مختلفة من النوافذ المنبثقة</p>
        </div>

        {/* Modal Triggers */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {/* Basic Modal Trigger */}
          <button
            onClick={basicModal.open}
            className="p-6 bg-white rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all text-right"
            type="button"
          >
            <div className="text-2xl mb-2">📄</div>
            <h3 className="font-semibold text-gray-900 mb-2">نافذة أساسية</h3>
            <p className="text-gray-600 text-sm">نافذة عادية لعرض المحتوى</p>
          </button>

          {/* Confirm Modal Trigger */}
          <button
            onClick={openDeleteConfirm}
            className="p-6 bg-white rounded-xl border border-gray-200 hover:border-red-300 hover:shadow-md transition-all text-right"
            type="button"
          >
            <div className="text-2xl mb-2">🗑️</div>
            <h3 className="font-semibold text-gray-900 mb-2">نافذة تأكيد</h3>
            <p className="text-gray-600 text-sm">لتأكيد الإجراءات المهمة</p>
          </button>

          {/* Form Modal Trigger */}
          <button
            onClick={formModal.open}
            className="p-6 bg-white rounded-xl border border-gray-200 hover:border-green-300 hover:shadow-md transition-all text-right"
            type="button"
          >
            <div className="text-2xl mb-2">📝</div>
            <h3 className="font-semibold text-gray-900 mb-2">نافذة نموذج</h3>
            <p className="text-gray-600 text-sm">لإدخال البيانات والمعلومات</p>
          </button>

          {/* Success Modal Trigger */}
          <button
            onClick={successModal.open}
            className="p-6 bg-white rounded-xl border border-gray-200 hover:border-green-300 hover:shadow-md transition-all text-right"
            type="button"
          >
            <div className="text-2xl mb-2">✅</div>
            <h3 className="font-semibold text-gray-900 mb-2">نافذة نجاح</h3>
            <p className="text-gray-600 text-sm">عرض رسائل النجاح</p>
          </button>

          {/* Fullscreen Modal Trigger */}
          <button
            onClick={fullscreenModal.open}
            className="p-6 bg-white rounded-xl border border-gray-200 hover:border-purple-300 hover:shadow-md transition-all text-right"
            type="button"
          >
            <div className="text-2xl mb-2">📱</div>
            <h3 className="font-semibold text-gray-900 mb-2">نافذة كاملة</h3>
            <p className="text-gray-600 text-sm">للمحتوى الطويل والمعقد</p>
          </button>
        </div>

        {/* Basic Modal */}
        <BasicModal
          isOpen={basicModal.isOpen}
          onClose={basicModal.close}
          title="نافذة أساسية"
        >
          <div className="space-y-4">
            <p className="text-gray-600">
              هذه نافذة أساسية يمكن استخدامها لعرض أي نوع من المحتوى.
              تتميز بتصميم بسيط ونظيف.
            </p>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-gray-600">
                يمكن إضافة نماذج، صور، نصوص، أو أي عناصر أخرى هنا.
              </p>
            </div>
          </div>
        </BasicModal>

        {/* Confirm Modal */}
        <ConfirmModal
          isOpen={confirmModal.isOpen}
          onClose={confirmModal.close}
          onConfirm={handleConfirm}
          title={
            confirmAction === 'delete'
              ? 'تأكيد الحذف'
              : confirmAction === 'update'
              ? 'تأكيد التحديث'
              : 'تأكيد'
          }
          message={
            confirmAction === 'delete'
              ? 'هل أنت متأكد من رغبتك في حذف هذا العنصر؟ لا يمكن التراجع عن هذا الإجراء.'
              : confirmAction === 'update'
              ? 'هل تريد حفظ التغييرات التي أجريتها؟'
              : 'هل أنت متأكد من المتابعة؟'
          }
          confirmText={
            confirmAction === 'delete'
              ? 'حذف'
              : confirmAction === 'update'
              ? 'تحديث'
              : 'تأكيد'
          }
          variant={
            confirmAction === 'delete'
              ? 'danger'
              : confirmAction === 'update'
              ? 'warning'
              : 'info'
          }
        />

        {/* Form Modal */}
        <FormModal
          isOpen={formModal.isOpen}
          onClose={formModal.close}
          onSubmit={handleFormSubmit}
          title="نموذج جديد"
          loading={loading}
        >
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="name-input">
                الاسم
              </label>
              <input
                id="name-input"
                type="text"
                value={formData.name}
                onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="أدخل اسمك"
                autoComplete="off"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="email-input">
                البريد الإلكتروني
              </label>
              <input
                id="email-input"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="أدخل بريدك الإلكتروني"
                autoComplete="email"
              />
            </div>
          </div>
        </FormModal>

        {/* Success Modal */}
        <SuccessModal
          isOpen={successModal.isOpen}
          onClose={successModal.close}
          title="تم بنجاح!"
          message="تم تنفيذ العملية بنجاح. يمكنك متابعة استخدام التطبيق."
        />

        {/* Fullscreen Modal */}
        <FullscreenModal
          isOpen={fullscreenModal.isOpen}
          onClose={fullscreenModal.close}
          title="نافذة كاملة الشاشة"
        >
          <div className="p-6 space-y-6">
            <p className="text-gray-600">
              هذه نافذة كاملة الشاشة مناسبة للمحتوى الطويل أو المعقد.
            </p>

            {Array.from({ length: 10 }, (_, i) => (
              <div key={i} className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-2">قسم {i + 1}</h4>
                <p className="text-gray-600 text-sm">
                  محتوى تجريبي لقسم من أقسام النافذة الكاملة.
                </p>
              </div>
            ))}
          </div>
        </FullscreenModal>
      </div>
    </div>
  );
}