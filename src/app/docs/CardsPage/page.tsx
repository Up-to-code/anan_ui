'use client';

import PrimaryCard from '@/components/common/Cards/PrimaryCard';
import StatsCard from '@/components/common/Cards/StatsCard';
import FeatureCard from '@/components/common/Cards/FeatureCard';
import CTACard from '@/components/common/Cards/CTACard';
import SimpleCard from '@/components/common/Cards/SimpleCard';
import PricingCard from '@/components/common/Cards/PricingCard';

export default function CardsPage() {
  const handleCardClick = () => {
    console.log('Card clicked!');
  };

  const handleCTAClick = () => {
    console.log('CTA clicked!');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12" dir="rtl">
      <div className="max-w-7xl mx-auto px-6 space-y-12">
        
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">المكونات</h1>
          <p className="text-gray-600 text-lg">مجموعة متنوعة من البطاقات لمختلف الاستخدامات</p>
        </div>

        {/* Primary Cards */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">بطاقات أساسية</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <PrimaryCard
              title="بطاقة عادية"
              description="هذه بطاقة عادية يمكن استخدامها لعرض المحتوى"
              icon="📦"
              onClick={handleCardClick}
            />
            <PrimaryCard
              title="بطاقة محددة"
              description="بطاقة بإطار ملون لجذب الانتباه"
              icon="🎯"
              variant="outline"
              onClick={handleCardClick}
            />
            <PrimaryCard
              title="بطاقة مملوءة"
              description="بطاقة بخلفية ملونة لتسليط الضوء"
              icon="⭐"
              variant="filled"
              onClick={handleCardClick}
            />
          </div>
        </section>

        {/* Stats Cards */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">إحصائيات</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatsCard
              title="المستخدمين النشطين"
              value="١٢٬٤٥٦"
              change="+12%"
              trend="up"
              icon="👥"
            />
            <StatsCard
              title="معدل النجاح"
              value="٩٨٫٥٪"
              change="+2.1%"
              trend="up"
              icon="📈"
            />
            <StatsCard
              title="وقت الاستجابة"
              value="١٫٢ث"
              change="-0.3s"
              trend="down"
              icon="⚡"
            />
            <StatsCard
              title="رضا العملاء"
              value="٤٫٨"
              icon="⭐"
            />
          </div>
        </section>

        {/* Feature Cards */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">ميزات</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FeatureCard
              title="سرعة فائقة"
              description="معالجة سريعة للبيانات بأحدث التقنيات"
              icon="⚡"
              features={['معالجة فورية', 'أداء عالي', 'نتائج دقيقة']}
              onClick={handleCardClick}
            />
            <FeatureCard
              title="الميزة المميزة"
              description="هذه الميزة الأكثر طلباً بين المستخدمين"
              icon="🏆"
              features={['ميزة حصرية', 'دعم كامل', 'تحديثات مستمرة']}
              variant="highlight"
              onClick={handleCardClick}
            />
            <FeatureCard
              title="أمان متكامل"
              description="حماية شاملة لبياناتك بمستوى أمان عالي"
              icon="🔒"
              features={['تشفير متقدم', 'نسخ احتياطي', 'مراقبة مستمرة']}
              onClick={handleCardClick}
            />
          </div>
        </section>

        {/* CTA Cards */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">دعوات للعمل</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <CTACard
              title="ابدأ رحلتك الآن"
              description="انضم إلى الآلاف من المستخدمين الراضين عن خدماتنا"
              buttonText="إنشاء حساب"
              onButtonClick={handleCTAClick}
              variant="primary"
              icon="🚀"
            />
            <CTACard
              title="جرب مجاناً"
              description="استكشف جميع الميزات بدون أي التزام لمدة 14 يوماً"
              buttonText="تجربة مجانية"
              onButtonClick={handleCTAClick}
              variant="success"
              icon="🎯"
            />
          </div>
        </section>

        {/* Simple Cards */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">صناديق بسيطة</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <SimpleCard padding="lg" hover>
              <h3 className="font-semibold text-gray-900 mb-3">محتوى عادي</h3>
              <p className="text-gray-600 leading-relaxed">
                هذه بطاقة بسيطة يمكن استخدامها لعرض أي نوع من المحتوى. 
                تتميز بتصميم نظيف ومرن.
              </p>
            </SimpleCard>
            
            <SimpleCard padding="md">
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-blue-600 text-2xl">📄</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">محتوى مركزي</h3>
                <p className="text-gray-600 text-sm">
                  بطاقة بمحتوى مركزي ومنظم
                </p>
              </div>
            </SimpleCard>
          </div>
        </section>

        {/* Pricing Cards */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">الباقات</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <PricingCard
              title="الأساسية"
              price="٠"
              period="/شهر"
              features={[
                '١٠ تحليلات شهرياً',
                'دعم عبر البريد',
                'تخزين ١ جيجابايت',
                'تقارير أساسية'
              ]}
              buttonText="ابدأ مجاناً"
              onButtonClick={handleCTAClick}
              description="مناسبة للأفراد والبدايات"
            />
            
            <PricingCard
              title="المتقدمة"
              price="٩٩"
              period="/شهر"
              features={[
                'تحليلات غير محدودة',
                'دعم فني مخصص',
                'تخزين ١٠٠ جيجابايت',
                'تقارير متقدمة',
                'تصدير البيانات',
                'دمج مع أدوات أخرى'
              ]}
              buttonText="اشترك الآن"
              onButtonClick={handleCTAClick}
              popular={true}
              description="الخيار الأمثل للفرق"
            />
            
            <PricingCard
              title="الشركات"
              price="٢٩٩"
              period="/شهر"
              features={[
                'كل ميزات المتقدمة',
                'دعم على مدار الساعة',
                'تخزين غير محدود',
                'تقارير مخصصة',
                'API متكامل',
                'تدريب الفريق'
              ]}
              buttonText="اتصل بنا"
              onButtonClick={handleCTAClick}
              description="للشركات والمؤسسات الكبيرة"
            />
          </div>
        </section>

      </div>
    </div>
  );
}