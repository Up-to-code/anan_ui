'use client';

export default function BrandFooter() {
  return (
    <footer className="bg-gradient-to-br from-blue-600 to-blue-700 text-white">
      <div className="container mx-auto px-6 py-12">
        
        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                <span className="text-white font-bold text-xl">ع</span>
              </div>
              <div>
                <div className="text-2xl font-bold">عنان</div>
                <div className="text-blue-100 text-lg">AI Platform</div>
              </div>
            </div>
            <p className="text-blue-100 text-sm leading-relaxed max-w-md">
              منصة الذكاء الاصطناعي الرائدة في تحليل البيانات وتقديم الحلول الذكية للشركات والمؤسسات.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4 text-white">روابط سريعة</h3>
            <ul className="space-y-2 text-sm">
              {['الرئيسية', 'الميزات', 'الأسعار', 'المدونة'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-blue-100 hover:text-white transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4 text-white">التواصل</h3>
            <ul className="space-y-2 text-sm text-blue-100">
              <li>contact@enan.com</li>
              <li>+٩٦٦ ٥٠ ١٢٣ ٤٥٦٧</li>
              <li>الرياض، السعودية</li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-blue-500">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-blue-100 text-sm">
              © ٢٠٢٤ منصة عنان. جميع الحقوق محفوظة.
            </div>
            <div className="flex gap-4">
              {['Twitter', 'LinkedIn', 'YouTube'].map((social) => (
                <a 
                  key={social}
                  href="#" 
                  className="text-blue-100 hover:text-white transition-colors text-sm"
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