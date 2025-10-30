'use client';

interface UserProfileCardProps {
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
    avatar?: string;
    joinDate: string;
    status: 'active' | 'inactive' | 'pending';
    phone?: string;
    department?: string;
  };
  showActions?: boolean;
  onEdit?: () => void;
  onMessage?: () => void;
}

export default function UserProfileCard({
  user,
  showActions = true,
  onEdit,
  onMessage
}: UserProfileCardProps) {
  const statusColors = {
    active: 'bg-green-100 text-green-800',
    inactive: 'bg-gray-100 text-gray-800',
    pending: 'bg-yellow-100 text-yellow-800'
  };

  const statusText = {
    active: 'نشط',
    inactive: 'غير نشط',
    pending: 'قيد الانتظار'
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
      
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        
        {/* Avatar */}
        <div className="relative">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
            {user.name.charAt(0)}
          </div>
          
          {/* Status Indicator */}
          <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-white ${statusColors[user.status]}`} />
        </div>

        {/* User Info */}
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h2 className="text-xl font-bold text-gray-900">{user.name}</h2>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[user.status]}`}>
              {statusText[user.status]}
            </span>
          </div>
          <p className="text-gray-600 mb-1">{user.email}</p>
          <p className="text-gray-500 text-sm">{user.role}</p>
        </div>

      </div>

      {/* Details */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <label className="text-sm text-gray-500 block mb-1">رقم الهاتف</label>
          <p className="text-gray-900 font-medium">{user.phone || 'غير متوفر'}</p>
        </div>
        <div>
          <label className="text-sm text-gray-500 block mb-1">القسم</label>
          <p className="text-gray-900 font-medium">{user.department || 'غير محدد'}</p>
        </div>
        <div>
          <label className="text-sm text-gray-500 block mb-1">تاريخ الانضمام</label>
          <p className="text-gray-900 font-medium">{user.joinDate}</p>
        </div>
        <div>
          <label className="text-sm text-gray-500 block mb-1">الحالة</label>
          <p className="text-gray-900 font-medium">{statusText[user.status]}</p>
        </div>
      </div>

      {/* Actions */}
      {showActions && (
        <div className="flex gap-2 pt-4 border-t border-gray-200">
          <button
            onClick={onEdit}
            className="flex-1 py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            تعديل
          </button>
          <button
            onClick={onMessage}
            className="flex-1 py-2 px-4 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
          >
            رسالة
          </button>
        </div>
      )}

    </div>
  );
}