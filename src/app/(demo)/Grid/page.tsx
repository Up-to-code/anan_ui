'use client';

import AutoGrid from '@/components/common/Grid/AutoGrid';
import FeatureGrid from '@/components/common/Grid/FeatureGrid';
import MasonryGrid, { MasonryItem } from '@/components/common/Grid/MasonryGrid';
import { GridItem, CardItem, FeatureItem } from '@/components/common/Grid/GridItems';

function FlexibleGrid({
  columns = 3,
  gap = 'md',
  children,
}: {
  columns?: 2 | 3 | 4;
  gap?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}) {
  const colCls =
    columns === 2
      ? 'grid-cols-1 md:grid-cols-2'
      : columns === 4
      ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
      : 'grid-cols-1 md:grid-cols-3';
  const gapCls =
    gap === 'sm' ? 'gap-4' : gap === 'lg' ? 'gap-8' : 'gap-6';
  return (
    <div className={`grid ${colCls} ${gapCls}`}>{children}</div>
  );
}

function CardGrid({
  columns = 3,
  variant = 'default',
  children,
}: {
  columns?: 2 | 3 | 4;
  variant?: 'default' | 'feature';
  children: React.ReactNode;
}) {
  const colCls =
    columns === 2
      ? 'grid-cols-1 md:grid-cols-2'
      : columns === 4
      ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
      : 'grid-cols-1 md:grid-cols-3';
  const gapCls = variant === 'feature' ? 'gap-8' : 'gap-6';
  return (
    <div className={`grid ${colCls} ${gapCls}`}>{children}</div>
  );
}

export default function GridsPage() {
  // Sample data
  const features = [
    { icon: '⚡', title: 'سرعة فائقة', description: 'معالجة فورية للبيانات باستخدام أحدث التقنيات' },
    { icon: '🔒', title: 'أمان متكامل', description: 'حماية شاملة لبياناتك بأعلى معايير الأمان' },
    { icon: '📊', title: 'تحليلات ذكية', description: 'تقارير وتحليلات متقدمة لاتخاذ قرارات أفضل' },
    { icon: '🔄', title: 'تحديثات مستمرة', description: 'تحسينات وتحديثات دورية للمنصة' },
    { icon: '🌐', title: 'دعم متعدد', description: 'دعم للغات والمناطق المختلفة' },
    { icon: '🚀', title: 'أداء عالي', description: 'أداء متميز حتى مع الأحمال الكبيرة' }
  ];

  const stats = [
    { value: '٩٩.٩٪', label: 'دقة النتائج' },
    { value: '٢٤/٧', label: 'دعم فني' },
    { value: '١٠٠٪', label: 'أمان بيانات' },
    { value: '⚡', label: 'سرعة عالية' },
    { value: '٥٠٠+', label: 'عميل راضي' },
    { value: '٣٠+', label: 'دولة' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12" dir="rtl">
      <div className="container mx-auto px-6 space-y-16">
        
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">مكونات الشبكات</h1>
          <p className="text-gray-600 text-lg">شبكات مرنة وقابلة للتكيف مع مختلف المحتويات</p>
        </div>

        {/* Flexible Grid Example */}
        <section>
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">شبكة مرنة</h2>
            <p className="text-gray-600">تتكيف مع مختلف أحجام الشاشات</p>
          </div>
          
          <FlexibleGrid columns={4} gap="md">
            {stats.map((stat, index) => (
              <CardItem key={index} hover>
                <div className="text-center p-4">
                  <div className="text-2xl font-bold text-blue-600 mb-2">{stat.value}</div>
                  <div className="text-gray-600 text-sm">{stat.label}</div>
                </div>
              </CardItem>
            ))}
          </FlexibleGrid>
        </section>

        {/* Card Grid Example */}
        <section>
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">شبكة البطاقات</h2>
            <p className="text-gray-600">مثالية لعرض الميزات والخدمات</p>
          </div>
          
          <CardGrid columns={3} variant="feature">
            {features.slice(0, 3).map((feature, index) => (
              <FeatureItem
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            ))}
          </CardGrid>
        </section>

        {/* Auto Grid Example */}
        <section>
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">شبكة تلقائية</h2>
            <p className="text-gray-600">تتغير تلقائياً حسب المساحة المتاحة</p>
          </div>
          
          <AutoGrid minWidth="sm" gap="md">
            {features.map((feature, index) => (
              <CardItem key={index} hover>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">{feature.title}</h3>
                    <p className="text-gray-600 text-sm">{feature.description}</p>
                  </div>
                </div>
              </CardItem>
            ))}
          </AutoGrid>
        </section>

        {/* Masonry Grid Example */}
        <section>
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">شبكة Mansonry</h2>
            <p className="text-gray-600">مثالية للمحتوى ذو الارتفاعات المختلفة</p>
          </div>
          
          <MasonryGrid columns={3} gap="md">
            {[
              { height: 'h-32', content: 'بطاقة قصيرة' },
              { height: 'h-48', content: 'بطاقة متوسطة الطول' },
              { height: 'h-64', content: 'بطاقة طويلة تحتوي على محتوى أكثر' },
              { height: 'h-40', content: 'بطاقة متوسطة' },
              { height: 'h-56', content: 'بطاقة شبه طويلة' },
              { height: 'h-36', content: 'بطاقة قصيرة نسبياً' },
              { height: 'h-52', content: 'بطاقة متوسطة الطول' },
              { height: 'h-44', content: 'بطاقة متوسطة' }
            ].map((item, index) => (
              <MasonryItem key={index}>
                <div className={`${item.height} bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow`}>
                  <div className="text-gray-900 font-medium">{item.content}</div>
                  <div className="text-gray-500 text-sm mt-2">محتوى تجريبي للعرض</div>
                </div>
              </MasonryItem>
            ))}
          </MasonryGrid>
        </section>

        {/* Feature Grid Examples */}
        <section>
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">شبكة الميزات</h2>
            <p className="text-gray-600">تصميمات متقدمة للمحتوى المميز</p>
          </div>

          {/* Equal Layout */}
          <div className="mb-12">
            <h3 className="text-lg font-medium text-gray-700 mb-4">تخطيط متساوي</h3>
            <FeatureGrid layout="equal">
              {features.slice(0, 3).map((feature, index) => (
                <FeatureItem
                  key={index}
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                />
              ))}
            </FeatureGrid>
          </div>

          {/* Featured Layout */}
          <div className="mb-12">
            <h3 className="text-lg font-medium text-gray-700 mb-4">تخطيط مميز</h3>
            <FeatureGrid layout="featured">
              <FeatureItem
                icon="🏆"
                title="الميزة الرئيسية"
                description="هذه الميزة الأكثر أهمية وتأخذ مساحة أكبر لعرض محتوى موسع ومفصل للمستخدمين."
                variant="highlight"
              />
              {features.slice(1, 3).map((feature, index) => (
                <FeatureItem
                  key={index}
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                />
              ))}
            </FeatureGrid>
          </div>

          {/* Staggered Layout */}
          <div>
            <h3 className="text-lg font-medium text-gray-700 mb-4">تخطيط متداخل</h3>
            <FeatureGrid layout="staggered" columns={2}>
              {features.slice(0, 4).map((feature, index) => (
                <FeatureItem
                  key={index}
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                />
              ))}
            </FeatureGrid>
          </div>
        </section>

        {/* Grid with Span Items */}
        <section>
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">عنوانات ممتدة</h2>
            <p className="text-gray-600">عناصر تمتد عبر عدة أعمدة</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <GridItem span={2}>
              <div className="bg-blue-500 text-white rounded-xl p-6 text-center">
                <h3 className="text-xl font-semibold mb-2">عنوان رئيسي</h3>
                <p>هذا العنصر يمتد عبر عمودين في الشاشات المتوسطة والكبيرة</p>
              </div>
            </GridItem>
            
            <GridItem span={1}>
              <div className="bg-white rounded-xl border border-gray-200 p-6 text-center">
                <h3 className="font-semibold text-gray-900 mb-2">عنوان جانبي</h3>
                <p className="text-gray-600">عنصر عادي بعمود واحد</p>
              </div>
            </GridItem>
            
            <GridItem span={1}>
              <div className="bg-white rounded-xl border border-gray-200 p-6 text-center">
                <h3 className="font-semibold text-gray-900 mb-2">بطاقة ١</h3>
                <p className="text-gray-600">محتوى البطاقة</p>
              </div>
            </GridItem>
            
            <GridItem span={2}>
              <div className="bg-green-500 text-white rounded-xl p-6 text-center">
                <h3 className="text-xl font-semibold mb-2">عنوان ممتد آخر</h3>
                <p>عنصر آخر يمتد عبر عمودين</p>
              </div>
            </GridItem>
          </div>
        </section>

      </div>
    </div>
  );
}