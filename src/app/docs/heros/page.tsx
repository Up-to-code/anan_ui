'use client';

import CleanCenteredHero from '@/components/common/Hero/Hero';
import BrandCenteredHero from '@/components/common/Hero/BrandCenteredHero';
import MinimalCenteredHero from '@/components/common/Hero/MinimalCenteredHero';

export default function Home() {
  const handleGetStarted = () => {
    console.log('Get started clicked');
    // Add your navigation logic
  };

  const handleContact = () => {
    console.log('Contact clicked');
    // Add your contact logic
  };

  return (
    <div dir="rtl">
      
      {/* Clean Centered Hero */}
      <CleanCenteredHero
        title="حلول متكاملة"
        subtitle="نقدم حلول ذكاء اصطناعي متكاملة تساعد شركتك على النمو والتفوق في السوق التنافسي"
        primaryAction={{
          label: "ابدأ الآن",
          onClick: handleGetStarted
        }}
        secondaryAction={{
          label: "تواصل معنا",
          onClick: handleContact
        }}
      />

      {/* Brand Centered Hero */}
      <BrandCenteredHero
        title="منصة عنان"
        subtitle="للذكاء الاصطناعي"
        primaryAction={{
          label: "جرب مجاناً",
          onClick: handleGetStarted
        }}
        secondaryAction={{
          label: "شاهد العرض",
          onClick: handleContact
        }}
      />

      {/* Minimal Centered Hero */}
      <MinimalCenteredHero
        title="البساطة هي الأساس"
        subtitle="تصميم يركز على الجوهر بدون تعقيد. حلول بسيطة وفعالة لتحقيق أهدافك"
        action={{
          label: "اكتشف المزيد",
          onClick: handleGetStarted
        }}
      />

    </div>
  );
}