// app/dui-docs/page.tsx

'use client';

export default function DocsWelcome() {
  return (
    <main className="max-w-3xl mx-auto py-12 px-6 bg-white rounded border border-gray-200 my-10 shadow">
      <div className="mb-7 flex flex-col items-center">
        <div className="w-12 h-12 bg-blue-600 flex items-center justify-center rounded mb-3">
          <span className="text-white font-bold text-2xl">DUI</span>
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2 text-center">مكتبة مكونات DUI - التوثيق</h1>
        <div className="text-gray-600 text-base text-center">
          فقط انسخ الكود والصق — بدون أي تثبيت أو إعداد!
        </div>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-3 text-right">ما هي مكتبة DUI؟</h2>
        <ul className="text-gray-700 text-base list-disc pr-5 space-y-1 mb-3 text-right">
          <li>مكتبة مكونات React عربية بالكامل.</li>
          <li>لا حاجة لأي <span className="font-bold text-blue-600">تثبيت</span>، ولا إعدادات.</li>
          <li>جميع المكونات جاهزة للنسخ-اللصق (Copy &amp; Paste Use).</li>
          <li>تصميم بسيط وسهل التخصيص ويدعم الاتجاه من اليمين لليسار.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-2 text-right">كيف أستخدم المكونات؟</h2>
        <ol className="list-decimal list-inside text-right mb-3 text-gray-700 text-base space-y-1">
          <li>اختر المكون الذي تريد من هذه الوثائق.</li>
          <li>قم بنسخ الكود الخاص به.</li>
          <li>الصق الكود مباشرةً في أي ملف React عندك (JSX/TSX/JS/TS).</li>
          <li className="font-bold text-green-600">شاهد المكون يعمل فوراً! 🚀</li>
        </ol>
      </section>

      <section className="mb-10">
        <h3 className="font-bold text-gray-700 mb-2 mt-4 text-md text-right">مثال سريع (نسخ-لصق):</h3>
        <div className="bg-gray-900 rounded text-left text-xs overflow-x-auto mb-3 shadow-sm">
          <pre className="text-gray-100 p-4 leading-relaxed whitespace-pre">
{`function Alert({ children }) {
  return (
    <div style={{
      background: "#dcfce7",
      color: "#166534",
      borderRadius: 8,
      padding: "12px 20px",
      margin: "16px 0",
      fontWeight: "bold"
    }}>
      {children}
    </div>
  );
}

// استخدمه في أي مكان:
<Alert>تم النسخ واللصق!</Alert>
`}
          </pre>
        </div>
        <div className="rounded py-3 bg-gray-50 text-center font-mono text-sm text-gray-700 mb-1">
          <span className="inline-block bg-green-100 text-green-700 px-4 py-2 rounded">تم النسخ واللصق!</span>
        </div>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-gray-800 mb-2 text-right">دليل الأقسام:</h2>
        <ul className="list-disc pr-5 text-gray-700 text-base space-y-2 text-right">
          <li>تصفح من الشريط الجانبي للعثور على أي مكون أو مثال تريده.</li>
          <li>كل صفحة تحتوي على كود جاهز للنسخ والاستخدام.</li>
          <li>لا داعي لأي أمر <span className="font-semibold text-blue-600">npm install</span> أو أي إعدادات بناء.</li>
        </ul>
      </section>

      <div className="mt-12 text-xs text-gray-400 text-center">
        DUI - مكتبة للمطور العربي • بدون تثبيت • فقط نسخ - لصق • يدعم العربية
      </div>
    </main>
  );
}