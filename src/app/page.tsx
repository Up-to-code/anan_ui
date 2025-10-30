'use client';

import Header from '@/components/layout/Header';
import HeroSection from '@/components/layout/HeroSection';
import FeaturesGrid from '@/components/layout/FeaturesGrid';
import StatsSection from '@/components/layout/StatsSection';
import Footer from '@/components/layout/Footer';
import FileUploader from '../components/common/FileUploader';
import ToastContainer from '../components/ui/ToastContainer';
import { ToastProvider } from '../components/ui/ToastContext';

export default function AdminDashboard() {
  return (
    <ToastProvider>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50" dir="rtl">
        <Header />
        <HeroSection />

        {/* File Uploader Section */}
        <section className="py-12">
          <div className="max-w-4xl mx-auto text-right mb-8 px-6">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              رفع الملفات
            </h2>
            <p className="text-gray-600 text-lg">
              قم برفع ملفاتك بسهولة وأمان للحصول على تحليلات ذكية فورية
            </p>
          </div>
          <FileUploader />
        </section>

        <FeaturesGrid />
        <StatsSection />
        <Footer />
        <ToastContainer />
      </div>
    </ToastProvider>
  );
}