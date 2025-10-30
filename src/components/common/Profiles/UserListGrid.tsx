'use client';

interface UserListGridProps {
  users: Array<{
    id: string;
    name: string;
    email: string;
    role: string;
    avatar?: string;
    status: 'active' | 'inactive' | 'pending';
    lastActive: string;
  }>;
  onUserClick?: (userId: string) => void;
  onEdit?: (userId: string) => void;
  onMessage?: (userId: string) => void;
}

export default function UserListGrid({
  users,
  onUserClick,
  onEdit,
  onMessage
}: UserListGridProps) {
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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {users.map((user) => (
        <div
          key={user.id}
          className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md transition-shadow cursor-pointer"
          onClick={() => onUserClick?.(user.id)}
        >
          
          {/* Header */}
          <div className="flex items-center gap-3 mb-4">
            
            {/* Avatar */}
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                {user.name.charAt(0)}
              </div>
              <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${statusColors[user.status]}`} />
            </div>

            {/* User Info */}
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900">{user.name}</h3>
              <p className="text-gray-600 text-sm">{user.role}</p>
            </div>

          </div>

          {/* Details */}
          <div className="space-y-2 mb-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">البريد:</span>
              <span className="text-gray-900">{user.email}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">الحالة:</span>
              <span className={`px-2 py-1 rounded-full text-xs ${statusColors[user.status]}`}>
                {statusText[user.status]}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">آخر نشاط:</span>
              <span className="text-gray-900">{user.lastActive}</span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2 pt-4 border-t border-gray-200">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onEdit?.(user.id);
              }}
              className="flex-1 py-1.5 px-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
            >
              تعديل
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onMessage?.(user.id);
              }}
              className="flex-1 py-1.5 px-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium"
            >
              رسالة
            </button>
          </div>

        </div>
      ))}
    </div>
  );
}