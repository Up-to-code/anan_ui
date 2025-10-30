"use client";

import FAQ from "@/components/common/FAQ/FAQ";
import FAQWithCategories from "@/components/common/FAQ/FAQWithCategories";
import ModernFAQ from "@/components/common/FAQ/ModernFAQ";
import SimpleFAQ from "@/components/common/FAQ/SimpleFAQ";

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12" dir="rtl">
      <div className="max-w-6xl mx-auto space-y-16">
        {/* Header */}
        <div className="text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <span className="text-white text-2xl">?</span>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            الأسئلة الشائعة
          </h1>
          <p className="text-gray-500 text-lg">
            إجابات على أسئلتك حول منصة عنان
          </p>
        </div>

        {/* Standard FAQ */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-8 text-center">
            أسئلة عامة
          </h2>
          <FAQ />
        </section>

        {/* Modern FAQ */}
        <section className="bg-white rounded-2xl p-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-8 text-center">
            أسئلة تقنية
          </h2>
          <ModernFAQ />
        </section>

        {/* Simple FAQ */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-8 text-center">
            أسئلة سريعة
          </h2>
          <SimpleFAQ />
        </section>

        {/* FAQ with Categories */}
        <section className="bg-white rounded-2xl p-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-8 text-center">
            أسئلة متنوعة
          </h2>
          <FAQWithCategories />
        </section>

        {/* Contact CTA */}
        <div className="text-center bg-blue-50 rounded-2xl p-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            لم تجد إجابتك؟
          </h3>
          <p className="text-gray-600 mb-4">
            فريق الدعم جاهز لمساعدتك على مدار الساعة
          </p>
          <button className="bg-blue-500 text-white px-8 py-3 rounded-lg hover:bg-blue-600 transition-colors">
            تواصل معنا
          </button>
        </div>
      </div>
    </div>
  );
}
