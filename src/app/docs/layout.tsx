// app/dui-docs/layout.tsx
import Link from 'next/link';

export default function DUIDocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
      <body className="antialiased">
        <div className="min-h-screen bg-gray-50 flex">
          <DocsSidebar />
          <div className="flex-1">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}

function DocsSidebar() {
  // Remove installation and quickstart links
  const links = [
    { id: 'introduction', name: 'مقدمة', icon: '🚀', href: '/docs' },

    { id: 'alert', name: 'التنبيهات', icon: '🔔', href: '/docs/Alert' },
    { id: 'cards-page', name: 'صفحة البطاقات', icon: '🎴', href: '/docs/CardsPage' },
    { id: 'date-demo', name: 'عرض التاريخ', icon: '📅', href: '/docs/DateDemo' },
    { id: 'faq-page', name: 'الأسئلة الشائعة', icon: '❓', href: '/docs/FAQPage' },
    { id: 'flowchart-demo', name: 'عرض المخططات', icon: '📈', href: '/docs/FlowChartDemo' },
    { id: 'footers', name: 'التذييلات', icon: '🦶', href: '/docs/Footers' },
    { id: 'grid', name: 'الشبكة', icon: '🔳', href: '/docs/Grid' },
    { id: 'heros', name: 'البطولات', icon: '🌟', href: '/docs/heros' },
    { id: 'modals', name: 'النوافذ المنبثقة (جديد)', icon: '🪟', href: '/docs/Modals' },
    { id: 'profile', name: 'الملف الشخصي', icon: '👤', href: '/docs/profile' },
    { id: 'selector-demo', name: 'عرض المحددات', icon: '🎯', href: '/docs/SelectorDemo' },
    { id: 'settings', name: 'الإعدادات', icon: '⚙️', href: '/docs/settings' },
    { id: 'tables-page', name: 'صفحة الجداول', icon: '📋', href: '/docs/TablesPage' },
    { id: 'testimonial', name: 'الشهادات', icon: '🗣️', href: '/docs/Testimonial' },
    { id: 'timeline-page', name: 'صفحة الجدول الزمني', icon: '⏳', href: '/docs/TimelinePage' },
    { id: 'examples', name: 'أمثلة متكاملة', icon: '💡', href: '/docs/examples' },
    { id: 'templates', name: 'قوالب جاهزة', icon: '🎨', href: '/docs/templates' },
    { id: 'api', name: 'مرجع API', icon: '🔧', href: '/docs/api' },
    { id: 'theming', name: 'التخصيص', icon: '🎨', href: '/docs/theming' },
    { id: 'faq', name: 'الأسئلة الشائعة', icon: '❓', href: '/docs/faq' },
  ];

  return (
    <div className="w-64 bg-white border-l border-gray-200 h-screen overflow-y-auto sticky top-0">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3 mb-2">
          <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">DUI</span>
          </div>
          <div>
            <h1 className="font-bold text-gray-900">المستندات</h1>
            <p className="text-xs text-gray-500">DUI v1.0</p>
          </div>
        </div>
        <div className="mt-4">
          <Link
            href="/docs"
            className="block text-center bg-blue-500 text-white py-2 px-4 rounded-lg text-sm font-bold hover:bg-blue-600 transition-colors"
          >
            ابدأ الاستخدام
          </Link>
        </div>
      </div>

      {/* Navigation */}
      <nav className="p-4">
        <ul className="space-y-1">
          {links.map((item) => (
            <li key={item.id || item.href}>
              <Link
                href={item.href}
                className="w-full text-right flex items-center justify-between p-3 rounded-lg text-sm transition-colors hover:bg-gray-50 text-gray-700 font-medium"
              >
                <span className="flex items-center">
                  <span className="ml-2">{item.icon}</span>
                  <span>{item.name}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer Links */}
      <div className="p-4 border-t border-gray-200 mt-8">
        <div className="space-y-2">
          <Link href="/" className="block text-sm text-gray-600 hover:text-gray-900 font-medium text-center py-2 hover:bg-gray-50 rounded-lg transition-colors">
            ← العودة للرئيسية
          </Link>
          <a href="https://github.com" className="block text-sm text-gray-600 hover:text-gray-900 font-medium text-center py-2 hover:bg-gray-50 rounded-lg transition-colors">
            ⭐ تقديم نجمة
          </a>
        </div>
      </div>
    </div>
  );
}
