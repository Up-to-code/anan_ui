// app/dashboard/properties/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { FiPlus, FiSearch, FiEdit, FiTrash2, FiHome, FiMapPin, FiArrowLeft, FiArrowRight } from 'react-icons/fi';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';

interface Property {
  id: number;
  title: string;
  type: string;
  price: number;
  location: string;
  image: string;
}

export default function PropertiesPage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setProperties([
        {
          id: 1,
          title: 'شقة فاخرة في الرياض',
          type: 'شقة',
          price: 750000,
          location: 'الرياض، حي الصحافة',
          image: '/api/placeholder/300/200'
        },
        {
          id: 2,
          title: 'فيلا حديثة في جدة',
          type: 'فيلا',
          price: 1200000,
          location: 'جدة، حي السلامة',
          image: '/api/placeholder/300/200'
        },
        {
          id: 3,
          title: 'منزل عائلي في الدمام',
          type: 'منزل',
          price: 950000,
          location: 'الدمام، حي الراكة',
          image: '/api/placeholder/300/200'
        },
        {
          id: 4,
          title: 'شقة دوبلكس في المدينة',
          type: 'شقة',
          price: 650000,
          location: 'المدينة المنورة',
          image: '/api/placeholder/300/200'
        },
        {
          id: 5,
          title: 'فيلا راقية في الطائف',
          type: 'فيلا',
          price: 1800000,
          location: 'الطائف، حي الردف',
          image: '/api/placeholder/300/200'
        },
        {
          id: 6,
          title: 'شقة مفروشة في الخبر',
          type: 'شقة',
          price: 550000,
          location: 'الخبر، حي الثقبة',
          image: '/api/placeholder/300/200'
        },
      ]);
      setLoading(false);
    };

    loadData();
  }, []);

  const filteredProperties = properties.filter(property =>
    property.title.includes(searchTerm) || property.location.includes(searchTerm)
  );

  const totalPages = Math.ceil(filteredProperties.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProperties = filteredProperties.slice(startIndex, startIndex + itemsPerPage);

  const handleDelete = (id: number) => {
    if (confirm('هل أنت متأكد من الحذف؟')) {
      setProperties(properties.filter(p => p.id !== id));
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">جاري تحميل العقارات...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">العقارات</h1>
          <p className="text-gray-600">إدارة عقاراتك</p>
        </div>
        <Link 
          href="/dashboard/properties/add"
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg"
        >
          <FiPlus size={18} />
          إضافة عقار
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border border-gray-200">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{properties.length}</div>
            <div className="text-gray-600">إجمالي العقارات</div>
          </CardContent>
        </Card>
        <Card className="border border-gray-200">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">
              {properties.filter(p => p.type === 'شقة').length}
            </div>
            <div className="text-gray-600">شقق</div>
          </CardContent>
        </Card>
        <Card className="border border-gray-200">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-orange-600">
              {(properties.reduce((sum, p) => sum + p.price, 0) / 1000000).toFixed(1)}M
            </div>
            <div className="text-gray-600">القيمة الإجمالية</div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card className="border border-gray-200">
        <CardContent className="p-4">
          <div className="relative">
            <FiSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="ابحث في العقارات..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full px-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
        </CardContent>
      </Card>

      {/* Properties Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {currentProperties.map((property) => (
          <Card key={property.id} className="border border-gray-200">
            <img 
              src={property.image} 
              alt={property.title}
              className="w-full h-48 object-cover"
            />
            
            <CardContent className="p-4">
              <h3 className="font-bold text-lg mb-2">{property.title}</h3>
              
              <div className="flex items-center gap-2 text-gray-600 mb-2">
                <FiMapPin size={14} />
                <span className="text-sm">{property.location}</span>
              </div>
              
              <div className="flex justify-between items-center mb-4">
                <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-sm">
                  {property.type}
                </span>
                <div className="text-lg font-bold text-green-600">
                  {property.price.toLocaleString()} ريال
                </div>
              </div>
              
              <div className="flex gap-2">
                <Link 
                  href={`/dashboard/properties/edit/${property.id}`}
                  className="flex-1 py-2 bg-blue-600 text-white rounded-lg text-center"
                >
                  تعديل
                </Link>
                <button 
                  onClick={() => handleDelete(property.id)}
                  className="p-2 text-red-600 rounded-lg"
                >
                  <FiTrash2 size={16} />
                </button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* No Results */}
      {filteredProperties.length === 0 && (
        <Card className="border border-gray-200">
          <CardContent className="text-center py-12">
            <FiHome className="mx-auto text-gray-400 mb-3" size={48} />
            <div className="text-gray-500 text-lg">لا توجد عقارات</div>
            <Link 
              href="/dashboard/properties/add"
              className="inline-block mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg"
            >
              إضافة أول عقار
            </Link>
          </CardContent>
        </Card>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <Card className="border border-gray-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="flex items-center gap-2 px-4 py-2 text-gray-600 disabled:opacity-50"
              >
                <FiArrowRight size={16} />
                السابق
              </button>
              
              <div className="flex gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`w-8 h-8 rounded ${
                      currentPage === page 
                        ? 'bg-blue-600 text-white' 
                        : 'text-gray-600'
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>
              
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="flex items-center gap-2 px-4 py-2 text-gray-600 disabled:opacity-50"
              >
                التالي
                <FiArrowLeft size={16} />
              </button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Simple Actions */}
      <div className="flex gap-2">
        <Link 
          href="/dashboard"
          className="flex-1 py-2 text-center border border-gray-300 rounded-lg"
        >
          العودة
        </Link>
        <button 
          onClick={() => window.print()}
          className="flex-1 py-2 border border-gray-300 rounded-lg"
        >
          طباعة
        </button>
      </div>
    </div>
  );
}