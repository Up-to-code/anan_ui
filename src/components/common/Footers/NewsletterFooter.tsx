'use client';

import { useState } from 'react';

export default function NewsletterFooter() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Newsletter subscription:', email);
    setEmail('');
  };

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-6 py-12">
        
        {/* Newsletter Section */}
        <div className="text-center mb-12">
          <h3 className="text-2xl font-bold mb-4">ابقَ على اطلاع</h3>
          <p className="text-gray-400 mb-6 max-w-md mx-auto">
            اشترك في نشرتنا البريدية لتصلك آخر التحديثات والميزات الجديدة.
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="بريدك الإلكتروني"
              className="flex-1 px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
              required
            />
            <button
              type="submit"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              اشتراك
            </button>
          </form>
        </div>

        {/* Links Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          {[
            {
              title: 'المنصة',
              links: ['الميزات', 'الأسعار', 'التكاملات', 'التوثيق']
            },
            {
              title: 'الشركة', 
              links: ['عننا', 'المدونة', 'الوظائف', 'الأخبار']
            },
            {
              title: 'الدعم',
              links: ['المساعدة', 'التواصل', 'المجتمع', 'الحالة']
            },
            {
              title: 'القانوني',
              links: ['الخصوصية', 'الشروط', 'الكوكيز', 'التراخيص']
            }
          ].map((section, index) => (
            <div key={index}>
              <h4 className="font-semibold mb-4 text-white">{section.title}</h4>
              <ul className="space-y-2 text-sm">
                {section.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-gray-400 text-sm">
              © ٢٠٢٤ عنان. شكراً لاستخدامك منصتنا.
            </div>
            <div className="flex gap-6 text-gray-400 text-sm">
              {['Twitter', 'LinkedIn', 'GitHub', 'YouTube'].map((social) => (
                <a 
                  key={social}
                  href="#" 
                  className="hover:text-white transition-colors"
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