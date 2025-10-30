'use client';

import { useState } from 'react';
import Alert from '../../../components/common/Alert/Alert';
import BannerAlert from '../../../components/common/Alert/BannerAlert';
import InlineAlert from '../../../components/common/Alert/InlineAlert';
import ActionAlert from '../../../components/common/Alert/ActionAlert';
import { useAlerts } from '../../../hooks/useAlerts';
import { AlertContainer } from '../../../components/common/Alert/AlertContainer';

export default function AlertsPage() {
  const [showBanner, setShowBanner] = useState(true);
  const { addAlert } = useAlerts();

  const handleShowSuccess = () => {
    addAlert('تم حفظ البيانات بنجاح!', 'success');
  };

  const handleShowError = () => {
    addAlert('حدث خطأ أثناء المعالجة. يرجى المحاولة مرة أخرى.', 'error');
  };

  const handleShowWarning = () => {
    addAlert('هذا الإجراء لا يمكن التراجع عنه.', 'warning');
  };

  const handleShowInfo = () => {
    addAlert('تم تحديث النظام إلى الإصدار الجديد.', 'info');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12" dir="rtl">
      <div className="container mx-auto px-6 space-y-8">

        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">مكونات التنبيهات</h1>
          <p className="text-gray-600 text-lg">أنواع مختلفة من التنبيهات والإشعارات</p>
        </div>

        {/* Banner Alert */}
        {showBanner && (
          <BannerAlert
            message="نظام الصيانة المجدول سيعمل يوم الجمعة من الساعة 2-4 صباحاً"
            variant="warning"
            onClose={() => setShowBanner(false)}
            action={{
              label: 'عرض التفاصيل',
              onClick: () => console.log('View details clicked')
            }}
          />
        )}

        {/* Basic Alerts */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">تنبيهات أساسية</h2>
          <div className="grid grid-cols-1 gap-4 max-w-2xl">
            <Alert
              message="تم تحديث ملفك الشخصي بنجاح."
              variant="success"
            />
            <Alert
              title="خطأ في المصادقة"
              message="كلمة المرور التي أدخلتها غير صحيحة. يرجى المحاولة مرة أخرى."
              variant="error"
            />
            <Alert
              title="تنبيه أمني"
              message="تم تسجيل الدخول من جهاز جديد. يرجى التحقق من النشاط."
              variant="warning"
            />
            <Alert
              message="هناك تحديث جديد متاح للنظام."
              variant="info"
            />
          </div>
        </section>

        {/* Inline Alerts */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">تنبيهات مدمجة</h2>
          <div className="grid grid-cols-1 gap-3 max-w-2xl">
            <InlineAlert
              message="تم إرسال رسالة التحقق إلى بريدك الإلكتروني."
              variant="success"
              size="sm"
            />
            <InlineAlert
              message="الحقل مطلوب ولا يمكن تركه فارغاً."
              variant="error"
              size="md"
            />
            <InlineAlert
              message="سيتم حذف هذه البيانات بشكل دائم."
              variant="warning"
              size="lg"
            />
          </div>
        </section>

        {/* Action Alerts */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">تنبيهات بالإجراءات</h2>
          <div className="grid grid-cols-1 gap-4 max-w-2xl">
            <ActionAlert
              title="حذف الحساب"
              message="هل أنت متأكد من رغبتك في حذف حسابك؟ لا يمكن التراجع عن هذا الإجراء."
              variant="error"
              actions={{
                primary: {
                  label: 'حذف الحساب',
                  onClick: () => console.log('Delete account')
                },
                secondary: {
                  label: 'إلغاء',
                  onClick: () => console.log('Cancel')
                }
              }}
            />
            <ActionAlert
              title="تحديث النظام"
              message="يتوفر تحديث جديد للنظام. يوصى بالتحديث للحصول على الميزات الجديدة وإصلاحات الأمان."
              variant="info"
              actions={{
                primary: {
                  label: 'تحديث الآن',
                  onClick: () => console.log('Update now')
                }
              }}
            />
          </div>
        </section>

        {/* Alert Triggers */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">تجربة التنبيهات</h2>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={handleShowSuccess}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              عرض نجاح
            </button>
            <button
              onClick={handleShowError}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              عرض خطأ
            </button>
            <button
              onClick={handleShowWarning}
              className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors"
            >
              عرض تحذير
            </button>
            <button
              onClick={handleShowInfo}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              عرض معلومة
            </button>
          </div>
        </section>

        {/* Alert Container for Toasts */}
        <AlertContainer />

      </div>
    </div>
  );
}