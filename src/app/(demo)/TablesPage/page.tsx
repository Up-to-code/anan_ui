'use client';

import CompactTable from "@/components/common/Table/CompactTable";
import DataTable from "@/components/common/Table/DataTable";
import StatusTable from "@/components/common/Table/StatusTable";

type User = {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
  joinDate: string;
};

type Product = {
  id: string;
  name: string;
  category: string;
  price: string;
  stock: number;
  status: string;
};

// Helper: Convert User[] to StatusTableRow[] (id: string)
function convertUsersToStatusRows(users: User[]) {
  return users.map((u) => ({
    ...u,
    id: String(u.id),
  }));
}

export default function TablesPage() {
  // Sample data
  const users: User[] = [
    {
      id: 1,
      name: 'أحمد محمد',
      email: 'ahmed@example.com',
      role: 'مدير',
      status: 'active',
      joinDate: '2024-01-15'
    },
    {
      id: 2,
      name: 'فاطمة علي',
      email: 'fatima@example.com',
      role: 'مستخدم',
      status: 'pending',
      joinDate: '2024-02-01'
    },
    {
      id: 3,
      name: 'خالد عبدالله',
      email: 'khaled@example.com',
      role: 'مشرف',
      status: 'inactive',
      joinDate: '2024-01-20'
    },
    {
      id: 4,
      name: 'سارة أحمد',
      email: 'sara@example.com',
      role: 'مستخدم',
      status: 'active',
      joinDate: '2024-03-10'
    }
  ];

  const products: Product[] = [
    {
      id: 'P001',
      name: 'لابتوب ديل',
      category: 'إلكترونيات',
      price: '٢٥٠٠ ر.س',
      stock: 15,
      status: 'متوفر'
    },
    {
      id: 'P002',
      name: 'هاتف سامسونج',
      category: 'إلكترونيات',
      price: '١٨٠٠ ر.س',
      stock: 0,
      status: 'غير متوفر'
    },
    {
      id: 'P003',
      name: 'كرسي مكتب',
      category: 'أثاث',
      price: '٤٥٠ ر.س',
      stock: 8,
      status: 'متوفر'
    }
  ];

  // Basic columns, used for BasicTable (removed BasicTable since it doesn't exist)
  const basicColumns = [
    { key: 'name', label: 'الاسم' },
    { key: 'email', label: 'البريد الإلكتروني' },
    { key: 'role', label: 'الدور' },
    { key: 'joinDate', label: 'تاريخ الانضمام' }
  ];

  const dataTableColumns = [
    {
      key: 'name',
      label: 'الاسم',
      sortable: true
    },
    {
      key: 'email',
      label: 'البريد الإلكتروني',
      sortable: true
    },
    {
      key: 'role',
      label: 'الدور',
      sortable: true
    },
    {
      key: 'status',
      label: 'الحالة',
      render: (value: unknown) => {
        const v = String(value);
        let color = 'bg-gray-100 text-gray-800';
        let text = 'غير نشط';
        if (v === 'active') {
          color = 'bg-green-100 text-green-800';
          text = 'نشط';
        } else if (v === 'pending') {
          color = 'bg-yellow-100 text-yellow-800';
          text = 'قيد الانتظار';
        }
        return (
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${color}`}
          >
            {text}
          </span>
        );
      }
    }
  ];

  const compactColumns = [
    { key: 'id', label: 'رقم المنتج' },
    { key: 'name', label: 'اسم المنتج' },
    { key: 'category', label: 'الفئة' },
    { key: 'price', label: 'السعر' },
    { key: 'stock', label: 'المخزون' },
    {
      key: 'status',
      label: 'الحالة',
      render: (value: unknown, _row: Product) => (
        <span
          className={`
            px-2 py-1 rounded text-xs font-medium
            ${String(value) === 'متوفر' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}
          `}
        >
          {String(value)}
        </span>
      )
    }
  ];

  const handleStatusChange = (id: string, newStatus: string) => {
    console.log(`Change status of ${id} to ${newStatus}`);
  };

  // Fix: convert users' id to string for StatusTable
  const statusTableRows = convertUsersToStatusRows(users);

  return (
    <div className="min-h-screen bg-gray-50 py-12" dir="rtl">
      <div className="max-w-7xl mx-auto px-6 space-y-12">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">الجداول</h1>
          <p className="text-gray-600 text-lg">مكونات جداول متنوعة لتنظيم البيانات</p>
        </div>

        {/* Data Table with Features (uses same columns as BasicTable) */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">جدول أساسي</h2>
          <DataTable
            columns={basicColumns}
            data={users}
            title="بيانات المستخدمين"
            searchable={false}
            pagination={false}
          />
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">جدول متقدم</h2>
          <DataTable
            columns={dataTableColumns}
            data={users}
            title="المستخدمين"
            searchable={true}
            pagination={true}
            pageSize={3}
          />
        </section>

        {/* Compact Table */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">جدول مضغوط</h2>
          <CompactTable
            columns={compactColumns}
            data={products}
            striped={true}
            size="sm"
          />
        </section>

        {/* Status Table */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">جدول الحالات</h2>
          <StatusTable
            data={statusTableRows}
            onStatusChange={handleStatusChange}
          />
        </section>
      </div>
    </div>
  );
}