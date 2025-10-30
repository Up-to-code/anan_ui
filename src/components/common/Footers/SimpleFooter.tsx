'use client';

export default function SimpleFooter() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          
          {/* Copyright */}
          <div className="text-gray-600 text-sm">
            © ٢٠٢٤ منصة عنان. جميع الحقوق محفوظة.
          </div>

          {/* Links */}
          <div className="flex gap-6 text-sm text-gray-600">
            {['الخصوصية', 'الشروط', 'التواصل'].map((item) => (
              <a 
                key={item}
                href="#" 
                className="hover:text-blue-600 transition-colors"
              >
                {item}
              </a>
            ))}
          </div>

        </div>
      </div>
    </footer>
  );
}