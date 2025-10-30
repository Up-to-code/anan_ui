'use client';

export default function Header() {
  return (
    <header className="bg-white/80 backdrop-blur-sm border-b border-blue-100">
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-3 space-x-reverse">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center">
              <span className="text-white font-semibold text-lg">ع</span>
            </div>
            <div>
              <span className="text-xl font-bold text-gray-900">عنان</span>
              <span className="text-blue-600 text-sm mr-2">AI</span>
            </div>
          </div>
          <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            دخول
          </button>
        </div>
      </div>
    </header>
  );
}