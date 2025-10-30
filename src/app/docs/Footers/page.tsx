'use client';

import ModernFooter from '@/components/common/Footers/ModernFooter';
import SimpleFooter from '@/components/common/Footers/SimpleFooter';
import MinimalFooter from '@/components/common/Footers/MinimalFooter';
import BrandFooter from '@/components/common/Footers/BrandFooter';
import NewsletterFooter from '@/components/common/Footers/NewsletterFooter';

export default function Home() {
  return (
    <div className="min-h-screen bg-white" dir="rtl">
      
      {/* Main Content */}
      <main className="flex-1">
        <div className="container mx-auto px-6 py-20 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">مكونات التذييل</h1>
          <p className="text-gray-600 text-lg">اختر التذييل الذي يناسب تصميمك</p>
        </div>
      </main>

      {/* Footer Examples */}
      <div className="space-y-8">
        
        {/* Modern Footer */}
        <section>
          <div className="container mx-auto px-6 mb-4">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">تذييل عصري</h2>
            <p className="text-gray-600 text-sm">مثالي للمواقع التجارية والشركات</p>
          </div>
          <ModernFooter />
        </section>

        {/* Simple Footer */}
        <section>
          <div className="container mx-auto px-6 mb-4">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">تذييل بسيط</h2>
            <p className="text-gray-600 text-sm">مناسب للمواقع الشخصية والمشاريع الصغيرة</p>
          </div>
          <SimpleFooter />
        </section>

        {/* Minimal Footer */}
        <section>
          <div className="container mx-auto px-6 mb-4">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">تذييل مصغر</h2>
            <p className="text-gray-600 text-sm">للتصميمات البسيطة والحديثة</p>
          </div>
          <MinimalFooter />
        </section>

        {/* Brand Footer */}
        <section>
          <div className="container mx-auto px-6 mb-4">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">تذييل العلامة التجارية</h2>
            <p className="text-gray-600 text-sm">يبرز الهوية البصرية للشركة</p>
          </div>
          <BrandFooter />
        </section>

        {/* Newsletter Footer */}
        <section>
          <div className="container mx-auto px-6 mb-4">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">تذييل بالنشرة البريدية</h2>
            <p className="text-gray-600 text-sm">مثالي لجمع العملاء المحتملين</p>
          </div>
          <NewsletterFooter />
        </section>

      </div>

    </div>
  );
}