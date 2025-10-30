// app/dashboard/properties/add/page.tsx
'use client';

import { useState } from 'react';
import { FiPlus, FiHome, FiMapPin, FiX, FiUpload, FiDollarSign, FiSquare } from 'react-icons/fi';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// Enums matching Prisma schema
enum PropertyType {
  APARTMENT = 'APARTMENT',
  HOUSE = 'HOUSE',
  STUDIO = 'STUDIO',
  PENTHOUSE = 'PENTHOUSE',
  VILLA = 'VILLA'
}

enum PropertyStatus {
  AVAILABLE = 'AVAILABLE',
  RENTED = 'RENTED',
  MAINTENANCE = 'MAINTENANCE',
  UNAVAILABLE = 'UNAVAILABLE'
}

export default function AddPropertyPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  const [amenities, setAmenities] = useState<string[]>([]);
  const [currentAmenity, setCurrentAmenity] = useState('');
  
  const [formData, setFormData] = useState({
    // Basic Info
    title: '',
    description: '',
    propertyType: PropertyType.APARTMENT,
    status: PropertyStatus.AVAILABLE,
    
    // Location
    address: '',
    city: '',
    state: '',
    country: 'السعودية',
    zipCode: '',
    latitude: '',
    longitude: '',
    
    // Details
    bedrooms: '',
    bathrooms: '',
    area: '',
    floor: '',
    
    // Pricing
    price: '',
    currency: 'SAR',
    
    // Additional
    virtualTourUrl: ''
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newImages: string[] = [];
      Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.onload = (e) => {
          if (e.target?.result) {
            newImages.push(e.target.result as string);
            if (newImages.length === files.length) {
              setImages(prev => [...prev, ...newImages]);
            }
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const addAmenity = () => {
    if (currentAmenity.trim() && !amenities.includes(currentAmenity.trim())) {
      setAmenities(prev => [...prev, currentAmenity.trim()]);
      setCurrentAmenity('');
    }
  };

  const removeAmenity = (amenity: string) => {
    setAmenities(prev => prev.filter(a => a !== amenity));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Prepare data for API
    const propertyData = {
      ...formData,
      images,
      amenities,
      bedrooms: parseInt(formData.bedrooms) || 0,
      bathrooms: parseInt(formData.bathrooms) || 0,
      area: parseFloat(formData.area) || 0,
      floor: parseInt(formData.floor) || null,
      price: parseFloat(formData.price) || 0,
      latitude: parseFloat(formData.latitude) || null,
      longitude: parseFloat(formData.longitude) || null,
    };

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Property Data:', propertyData);
      
      // Redirect to properties list
      router.push('/dashboard/properties');
    } catch (error) {
      console.error('Error adding property:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const propertyTypeLabels = {
    [PropertyType.APARTMENT]: 'شقة',
    [PropertyType.HOUSE]: 'منزل',
    [PropertyType.STUDIO]: 'استوديو',
    [PropertyType.PENTHOUSE]: 'بنتهاوس',
    [PropertyType.VILLA]: 'فيلا'
  };

  const statusLabels = {
    [PropertyStatus.AVAILABLE]: 'متاح',
    [PropertyStatus.RENTED]: 'مؤجر',
    [PropertyStatus.MAINTENANCE]: 'تحت الصيانة',
    [PropertyStatus.UNAVAILABLE]: 'غير متاح'
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto p-4">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">إضافة عقار جديد</h1>
          <p className="text-gray-600">أضف عقاراً جديداً إلى النظام</p>
        </div>
        <Link 
          href="/dashboard/properties"
          className="flex items-center gap-2 px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
        >
          <FiX size={18} />
          <span>إلغاء</span>
        </Link>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Images Card */}
        <Card className="border border-gray-200 mb-6">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <FiUpload size={20} />
              صور العقار
            </h3>
            
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
              {images.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                  {images.map((image, index) => (
                    <div key={index} className="relative">
                      <img 
                        src={image} 
                        alt={`Property ${index + 1}`}
                        className="w-full h-32 object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-2 left-2 bg-red-600 text-white p-1 rounded-full"
                      >
                        <FiX size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <FiUpload className="mx-auto text-gray-400 mb-4" size={48} />
                  <p className="text-gray-600 mb-4">لا توجد صور مرفوعة بعد</p>
                </div>
              )}
              
              <label className="cursor-pointer">
                <span className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 inline-flex items-center gap-2">
                  <FiUpload size={16} />
                  {images.length > 0 ? 'إضافة المزيد من الصور' : 'رفع صور العقار'}
                </span>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
            </div>
          </CardContent>
        </Card>

        {/* Basic Information */}
        <Card className="border border-gray-200 mb-6">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <FiHome size={20} />
              المعلومات الأساسية
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">عنوان العقار *</label>
                <input
                  type="text"
                  name="title"
                  required
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">نوع العقار *</label>
                <select
                  name="propertyType"
                  value={formData.propertyType}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                >
                  {Object.values(PropertyType).map(type => (
                    <option key={type} value={type}>
                      {propertyTypeLabels[type]}
                    </option>
                  ))}
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">الوصف *</label>
                <textarea
                  name="description"
                  required
                  value={formData.description}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">الحالة *</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                >
                  {Object.values(PropertyStatus).map(status => (
                    <option key={status} value={status}>
                      {statusLabels[status]}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Location */}
        <Card className="border border-gray-200 mb-6">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <FiMapPin size={20} />
              الموقع
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">العنوان التفصيلي *</label>
                <input
                  type="text"
                  name="address"
                  required
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">المدينة *</label>
                <input
                  type="text"
                  name="city"
                  required
                  value={formData.city}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">المنطقة</label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">البلد *</label>
                <input
                  type="text"
                  name="country"
                  required
                  value={formData.country}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">الرمز البريدي</label>
                <input
                  type="text"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Property Details */}
        <Card className="border border-gray-200 mb-6">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <FiSquare size={20} />
              تفاصيل العقار
            </h3>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">غرف النوم *</label>
                <input
                  type="number"
                  name="bedrooms"
                  required
                  min="0"
                  value={formData.bedrooms}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">الحمامات *</label>
                <input
                  type="number"
                  name="bathrooms"
                  required
                  min="0"
                  value={formData.bathrooms}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">المساحة (م²) *</label>
                <input
                  type="number"
                  name="area"
                  required
                  min="0"
                  step="0.1"
                  value={formData.area}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">الطابق</label>
                <input
                  type="number"
                  name="floor"
                  min="0"
                  value={formData.floor}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Pricing */}
        <Card className="border border-gray-200 mb-6">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <FiDollarSign size={20} />
              التسعير
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">السعر (ريال) *</label>
                <input
                  type="number"
                  name="price"
                  required
                  min="0"
                  step="0.01"
                  value={formData.price}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">العملة *</label>
                <input
                  type="text"
                  name="currency"
                  required
                  value={formData.currency}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Amenities */}
        <Card className="border border-gray-200 mb-6">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">المرافق</h3>
            
            <div className="space-y-3">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={currentAmenity}
                  onChange={(e) => setCurrentAmenity(e.target.value)}
                  placeholder="أضف مرفقاً جديداً"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg"
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addAmenity())}
                />
                <button
                  type="button"
                  onClick={addAmenity}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg"
                >
                  إضافة
                </button>
              </div>
              
              {amenities.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {amenities.map((amenity, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                    >
                      {amenity}
                      <button
                        type="button"
                        onClick={() => removeAmenity(amenity)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <FiX size={14} />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Submit Button */}
        <Card className="border border-gray-200">
          <CardContent className="p-6">
            <div className="flex gap-4">
              <Link
                href="/dashboard/properties"
                className="flex-1 py-3 text-center border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50"
              >
                إلغاء
              </Link>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>جاري الإضافة...</span>
                  </>
                ) : (
                  <>
                    <FiPlus size={18} />
                    <span>إضافة العقار</span>
                  </>
                )}
              </button>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  );
}