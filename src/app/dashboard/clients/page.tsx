// app/dashboard/clients/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { FiPlus, FiSearch, FiEdit, FiTrash2, FiUser, FiPhone, FiMail, FiArrowLeft, FiArrowRight } from 'react-icons/fi';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';

// Enums matching Prisma schema
enum ClientPlanType {
  FREE = 'FREE',
  MONTHLY = 'MONTHLY',
  YEARLY = 'YEARLY'
}

enum ClientStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  TRIAL = 'TRIAL',
  SUSPENDED = 'SUSPENDED'
}

interface Client {
  id: string;
  phoneNumber: string;
  name?: string;
  profileImage?: string;
  planType: ClientPlanType;
  messageLimit: number;
  messagesUsed: number;
  status: ClientStatus;
  createdAt: string;
  lastInteraction?: string;
}

interface ClientStats {
  totalClients: number;
  activeClients: number;
  trialClients: number;
  monthlyClients: number;
  yearlyClients: number;
  freeClients: number;
}

export default function ClientsPage() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [planFilter, setPlanFilter] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Load mock data
  useEffect(() => {
    const loadMockData = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockClients: Client[] = [
        {
          id: '1',
          phoneNumber: '+966501234567',
          name: 'أحمد محمد',
          planType: ClientPlanType.MONTHLY,
          messageLimit: 1000,
          messagesUsed: 245,
          status: ClientStatus.ACTIVE,
          createdAt: '2024-01-15',
          lastInteraction: '2024-03-20'
        },
        {
          id: '2',
          phoneNumber: '+966501234568',
          name: 'سارة عبدالله',
          planType: ClientPlanType.YEARLY,
          messageLimit: 5000,
          messagesUsed: 1200,
          status: ClientStatus.ACTIVE,
          createdAt: '2024-01-10',
          lastInteraction: '2024-03-19'
        },
        {
          id: '3',
          phoneNumber: '+966501234569',
          name: 'خالد العلي',
          planType: ClientPlanType.FREE,
          messageLimit: 100,
          messagesUsed: 85,
          status: ClientStatus.INACTIVE,
          createdAt: '2024-01-05',
          lastInteraction: '2024-03-15'
        },
        {
          id: '4',
          phoneNumber: '+966501234570',
          name: 'فاطمة أحمد',
          planType: ClientPlanType.MONTHLY,
          messageLimit: 1000,
          messagesUsed: 650,
          status: ClientStatus.TRIAL,
          createdAt: '2024-01-01',
          lastInteraction: '2024-03-20'
        },
        {
          id: '5',
          phoneNumber: '+966501234571',
          name: 'محمد حسن',
          planType: ClientPlanType.FREE,
          messageLimit: 100,
          messagesUsed: 100,
          status: ClientStatus.SUSPENDED,
          createdAt: '2023-12-20',
          lastInteraction: '2024-03-10'
        },
        {
          id: '6',
          phoneNumber: '+966501234572',
          name: 'نورة السعد',
          planType: ClientPlanType.YEARLY,
          messageLimit: 5000,
          messagesUsed: 3200,
          status: ClientStatus.ACTIVE,
          createdAt: '2024-02-01',
          lastInteraction: '2024-03-21'
        }
      ];
      
      setClients(mockClients);
      setLoading(false);
    };

    loadMockData();
  }, []);

  // Calculate statistics
  const calculateStats = (): ClientStats => ({
    totalClients: clients.length,
    activeClients: clients.filter(c => c.status === ClientStatus.ACTIVE).length,
    trialClients: clients.filter(c => c.status === ClientStatus.TRIAL).length,
    monthlyClients: clients.filter(c => c.planType === ClientPlanType.MONTHLY).length,
    yearlyClients: clients.filter(c => c.planType === ClientPlanType.YEARLY).length,
    freeClients: clients.filter(c => c.planType === ClientPlanType.FREE).length,
  });

  // Filter clients based on search and filters
  const filteredClients = clients.filter(client => {
    const matchesSearch = 
      client.name?.includes(searchTerm) || 
      client.phoneNumber.includes(searchTerm);
    const matchesStatus = statusFilter === 'all' || client.status === statusFilter;
    const matchesPlan = planFilter === 'all' || client.planType === planFilter;
    
    return matchesSearch && matchesStatus && matchesPlan;
  });

  // Pagination calculations
  const totalPages = Math.ceil(filteredClients.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentClients = filteredClients.slice(startIndex, startIndex + itemsPerPage);

  // Event handlers
  const handleDelete = (id: string) => {
    if (confirm('هل أنت متأكد من حذف هذا العميل؟')) {
      setClients(clients.filter(client => client.id !== id));
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  // Helper functions
  const getStatusColor = (status: ClientStatus): string => {
    const statusColors = {
      [ClientStatus.ACTIVE]: 'bg-green-100 text-green-800',
      [ClientStatus.INACTIVE]: 'bg-yellow-100 text-yellow-800',
      [ClientStatus.TRIAL]: 'bg-blue-100 text-blue-800',
      [ClientStatus.SUSPENDED]: 'bg-red-100 text-red-800',
    };
    return statusColors[status] || 'bg-gray-100 text-gray-800';
  };

  const getStatusText = (status: ClientStatus): string => {
    const statusTexts = {
      [ClientStatus.ACTIVE]: 'نشط',
      [ClientStatus.INACTIVE]: 'غير نشط',
      [ClientStatus.TRIAL]: 'تجريبي',
      [ClientStatus.SUSPENDED]: 'موقوف',
    };
    return statusTexts[status] || status;
  };

  const getPlanColor = (planType: ClientPlanType): string => {
    const planColors = {
      [ClientPlanType.FREE]: 'bg-gray-100 text-gray-800',
      [ClientPlanType.MONTHLY]: 'bg-blue-100 text-blue-800',
      [ClientPlanType.YEARLY]: 'bg-green-100 text-green-800',
    };
    return planColors[planType] || 'bg-gray-100 text-gray-800';
  };

  const getPlanText = (planType: ClientPlanType): string => {
    const planTexts = {
      [ClientPlanType.FREE]: 'مجاني',
      [ClientPlanType.MONTHLY]: 'شهري',
      [ClientPlanType.YEARLY]: 'سنوي',
    };
    return planTexts[planType] || planType;
  };

  const getUsagePercentage = (used: number, limit: number): number => {
    return Math.min((used / limit) * 100, 100);
  };

  const getUsageColor = (percentage: number): string => {
    if (percentage >= 90) return 'bg-red-500';
    if (percentage >= 75) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const stats = calculateStats();

  // Loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">جاري تحميل العملاء...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">إدارة العملاء</h1>
          <p className="text-gray-600">إدارة حسابات العملاء والاشتراكات</p>
        </div>
        <Link 
          href="/dashboard/clients/add"
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors w-full sm:w-auto justify-center"
        >
          <FiPlus size={18} />
          <span>إضافة عميل</span>
        </Link>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <StatCard value={stats.totalClients} label="إجمالي العملاء" color="blue" />
        <StatCard value={stats.activeClients} label="نشط" color="green" />
        <StatCard value={stats.trialClients} label="تجريبي" color="blue" />
        <StatCard value={stats.monthlyClients} label="شهري" color="purple" />
        <StatCard value={stats.yearlyClients} label="سنوي" color="green" />
        <StatCard value={stats.freeClients} label="مجاني" color="gray" />
      </div>

      {/* Filters Section */}
      <FiltersSection 
        searchTerm={searchTerm}
        onSearchChange={(value) => {
          setSearchTerm(value);
          setCurrentPage(1);
        }}
        statusFilter={statusFilter}
        onStatusFilterChange={(value) => {
          setStatusFilter(value);
          setCurrentPage(1);
        }}
        planFilter={planFilter}
        onPlanFilterChange={(value) => {
          setPlanFilter(value);
          setCurrentPage(1);
        }}
      />

      {/* Clients Grid */}
      <ClientsGrid 
        clients={currentClients}
        onDelete={handleDelete}
        getStatusColor={getStatusColor}
        getStatusText={getStatusText}
        getPlanColor={getPlanColor}
        getPlanText={getPlanText}
        getUsagePercentage={getUsagePercentage}
        getUsageColor={getUsageColor}
      />

      {/* Empty State */}
      {filteredClients.length === 0 && (
        <EmptyState />
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination 
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          totalItems={filteredClients.length}
          itemsPerPage={itemsPerPage}
          startIndex={startIndex}
        />
      )}
    </div>
  );
}

// Component for statistic cards
interface StatCardProps {
  value: number;
  label: string;
  color: 'blue' | 'green' | 'purple' | 'gray';
}

function StatCard({ value, label, color }: StatCardProps) {
  const colorClasses = {
    blue: 'text-blue-600',
    green: 'text-green-600',
    purple: 'text-purple-600',
    gray: 'text-gray-600'
  };

  return (
    <Card className="border border-gray-200">
      <CardContent className="p-4 text-center">
        <div className={`text-2xl font-bold ${colorClasses[color]}`}>{value}</div>
        <div className="text-gray-600 text-sm">{label}</div>
      </CardContent>
    </Card>
  );
}

// Component for filters section
interface FiltersSectionProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  statusFilter: string;
  onStatusFilterChange: (value: string) => void;
  planFilter: string;
  onPlanFilterChange: (value: string) => void;
}

function FiltersSection({
  searchTerm,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  planFilter,
  onPlanFilterChange
}: FiltersSectionProps) {
  return (
    <Card className="border border-gray-200">
      <CardContent className="p-4">
        <div className="flex flex-col lg:flex-row lg:items-center gap-4">
          {/* Search Input */}
          <div className="relative flex-1">
            <FiSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="ابحث بالاسم أو رقم الجوال..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full px-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => onStatusFilterChange(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option value="all">جميع الحالات</option>
            <option value={ClientStatus.ACTIVE}>نشط</option>
            <option value={ClientStatus.INACTIVE}>غير نشط</option>
            <option value={ClientStatus.TRIAL}>تجريبي</option>
            <option value={ClientStatus.SUSPENDED}>موقوف</option>
          </select>

          {/* Plan Filter */}
          <select
            value={planFilter}
            onChange={(e) => onPlanFilterChange(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option value="all">جميع الخطط</option>
            <option value={ClientPlanType.FREE}>مجاني</option>
            <option value={ClientPlanType.MONTHLY}>شهري</option>
            <option value={ClientPlanType.YEARLY}>سنوي</option>
          </select>
        </div>
      </CardContent>
    </Card>
  );
}

// Component for clients grid
interface ClientsGridProps {
  clients: Client[];
  onDelete: (id: string) => void;
  getStatusColor: (status: ClientStatus) => string;
  getStatusText: (status: ClientStatus) => string;
  getPlanColor: (planType: ClientPlanType) => string;
  getPlanText: (planType: ClientPlanType) => string;
  getUsagePercentage: (used: number, limit: number) => number;
  getUsageColor: (percentage: number) => string;
}

function ClientsGrid({
  clients,
  onDelete,
  getStatusColor,
  getStatusText,
  getPlanColor,
  getPlanText,
  getUsagePercentage,
  getUsageColor
}: ClientsGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {clients.map((client) => {
        const usagePercentage = getUsagePercentage(client.messagesUsed, client.messageLimit);
        
        return (
          <Card key={client.id} className="border border-gray-200">
            <CardContent className="p-6">
              {/* Client Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    {client.profileImage ? (
                      <img 
                        src={client.profileImage} 
                        alt={client.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                    ) : (
                      <FiUser className="text-blue-600" size={20} />
                    )}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {client.name || 'بدون اسم'}
                    </h3>
                    <div className="flex items-center gap-1 text-gray-600 text-sm">
                      <FiPhone size={12} />
                      <span>{client.phoneNumber}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Status & Plan */}
              <div className="flex gap-2 mb-4">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(client.status)}`}>
                  {getStatusText(client.status)}
                </span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPlanColor(client.planType)}`}>
                  {getPlanText(client.planType)}
                </span>
              </div>

              {/* Usage Progress */}
              <div className="mb-4">
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>استخدام الرسائل</span>
                  <span>{client.messagesUsed} / {client.messageLimit}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-300 ${getUsageColor(usagePercentage)}`}
                    style={{ width: `${usagePercentage}%` }}
                  ></div>
                </div>
              </div>

              {/* Dates */}
              <div className="text-sm text-gray-600 space-y-1 mb-4">
                <div>تاريخ التسجيل: {new Date(client.createdAt).toLocaleDateString('ar-SA')}</div>
                {client.lastInteraction && (
                  <div>آخر تفاعل: {new Date(client.lastInteraction).toLocaleDateString('ar-SA')}</div>
                )}
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <Link 
                  href={`/dashboard/clients/edit/${client.id}`}
                  className="flex-1 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-center text-sm transition-colors"
                >
                  تعديل
                </Link>
                <button 
                  onClick={() => onDelete(client.id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  aria-label="حذف العميل"
                >
                  <FiTrash2 size={16} />
                </button>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}

// Component for empty state
function EmptyState() {
  return (
    <Card className="border border-gray-200">
      <CardContent className="text-center py-12">
        <FiUser className="mx-auto text-gray-400 mb-3" size={48} />
        <div className="text-gray-500 text-lg">لا توجد عملاء</div>
        <Link 
          href="/dashboard/clients/add"
          className="inline-block mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          إضافة أول عميل
        </Link>
      </CardContent>
    </Card>
  );
}

// Component for pagination
interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  totalItems: number;
  itemsPerPage: number;
  startIndex: number;
}

function Pagination({ 
  currentPage, 
  totalPages, 
  onPageChange, 
  totalItems, 
  itemsPerPage, 
  startIndex 
}: PaginationProps) {
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);

  return (
    <Card className="border border-gray-200">
      <CardContent className="p-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Page Info */}
          <div className="text-sm text-gray-600">
            عرض {startIndex + 1}-{endIndex} من أصل {totalItems} عميل
          </div>
          
          {/* Pagination Controls */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="flex items-center gap-2 px-4 py-2 text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 rounded-lg transition-colors"
            >
              <FiArrowRight size={16} />
              السابق
            </button>
            
            {/* Page Numbers */}
            <div className="flex gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  onClick={() => onPageChange(page)}
                  className={`w-8 h-8 rounded transition-colors ${
                    currentPage === page 
                      ? 'bg-blue-600 text-white' 
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>
            
            <button
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="flex items-center gap-2 px-4 py-2 text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 rounded-lg transition-colors"
            >
              التالي
              <FiArrowLeft size={16} />
            </button>
          </div>

          {/* Page Indicator */}
          <div className="text-sm text-gray-600">
            الصفحة {currentPage} من {totalPages}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}