'use client';

import CompactTable from './CompactTable';

interface StatusTableRow {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  // You may add more fields as needed
}

interface StatusTableProps {
  data: StatusTableRow[];
  onStatusChange?: (id: string, newStatus: string) => void;
}

export default function StatusTable({ data, onStatusChange }: StatusTableProps) {
  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      active: 'bg-green-100 text-green-800',
      pending: 'bg-yellow-100 text-yellow-800',
      inactive: 'bg-gray-100 text-gray-800',
      rejected: 'bg-red-100 text-red-800',
      completed: 'bg-blue-100 text-blue-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const columns = [
    {
      key: 'id',
      label: 'رقم',
      // width: '80px' // CompactTable has no width prop, but could add extra class if needed
    },
    {
      key: 'name',
      label: 'الاسم'
    },
    {
      key: 'email',
      label: 'البريد الإلكتروني'
    },
    {
      key: 'role',
      label: 'الدور'
    },
    {
      key: 'status',
      label: 'الحالة',
      render: (value: unknown, row: StatusTableRow) => (
        <select
          value={String(value)}
          onChange={(e) => onStatusChange?.(row.id, e.target.value)}
          className={`
            px-2 py-1 rounded-full text-xs font-medium border-0 focus:ring-2 focus:ring-blue-500
            ${getStatusColor(String(value))}
          `}
        >
          <option value="active">نشط</option>
          <option value="pending">قيد الانتظار</option>
          <option value="inactive">غير نشط</option>
          <option value="completed">مكتمل</option>
        </select>
      )
    },
    {
      key: 'actions',
      label: 'الإجراءات',
      render: (_: unknown, row: StatusTableRow) => (
        <div className="flex gap-2">
          <button className="text-blue-600 hover:text-blue-800 text-sm">
            تعديل
          </button>
          <button className="text-red-600 hover:text-red-800 text-sm">
            حذف
          </button>
        </div>
      )
    }
  ];

  return <CompactTable columns={columns} data={data} />;
}