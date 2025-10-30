'use client';

interface ModernFooterProps {
  companyName?: string;
  tagline?: string;
}

export default function ModernFooter({ 
  companyName = "عنان",
  tagline = "منصة الذكاء الاصطناعي الرائدة"
}: ModernFooterProps) {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="container mx-auto px-6 py-12">
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          {/* Brand Column */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">ع</span>
              </div>
              <div>
                <div className="text-xl font-bold text-gray-900">{companyName}</div>
                <div className="text-blue-600 text-sm">{tagline}</div>
              </div>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              منصة متكاملة للذكاء الاصطناعي تساعد الشركات على تحليل البيانات واتخاذ قرارات أفضل.
            </p>
          </div>

          {/* Links Column 1 */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">المنصة</h3>
            <ul className="space-y-3 text-sm">
              {['الميزات', 'الأسعار', 'الاستخدامات', 'التكاملات'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Links Column 2 */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">الدعم</h3>
            <ul className="space-y-3 text-sm">
              {['المركز المساعد', 'التواصل معنا', 'الوثائق', 'الفيديوات'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Links Column 3 */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">الشركة</h3>
            <ul className="space-y-3 text-sm">
              {['عن الشركة', 'المدونة', 'الوظائف', 'الخصوصية'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-gray-600 text-sm">
              © ٢٠٢٤ {companyName}. جميع الحقوق محفوظة.
            </div>
            <div className="flex gap-6 text-gray-400">
              {['Twitter', 'LinkedIn', 'GitHub'].map((social) => (
                <a 
                  key={social}
                  href="#" 
                  className="hover:text-blue-600 transition-colors"
                >
                  {social}
                </a>
              ))}
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}