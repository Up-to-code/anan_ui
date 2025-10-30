/* eslint-disable @typescript-eslint/no-explicit-any */
// app/dashboard/users/page.tsx
'use client';

import { useState } from 'react';
import { FiPlus, FiSearch, FiEdit, FiTrash2, FiUser, FiMail } from 'react-icons/fi';
import { Card, CardHeader, CardContent } from '@/components/ui/card';

// Simple User Type
interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([
    { id: 1, name: 'أحمد محمد', email: 'ahmed@company.com', role: 'مدير النظام' },
    { id: 2, name: 'سارة عبدالله', email: 'sara@company.com', role: 'مشرف' },
    { id: 3, name: 'خالد العلي', email: 'khaled@company.com', role: 'مستخدم' },
    { id: 4, name: 'فاطمة أحمد', email: 'fatima@company.com', role: 'محلل بيانات' },
  ]);

  const [roles] = useState<string[]>([
    'مدير النظام',
    'مشرف', 
    'محلل بيانات',
    'مستخدم'
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [showAddUser, setShowAddUser] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  // Filter users based on search and role
  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.includes(searchTerm) || user.email.includes(searchTerm);
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    
    return matchesSearch && matchesRole;
  });

  const handleDeleteUser = (userId: number) => {
    if (confirm('هل أنت متأكد من حذف هذا المستخدم؟')) {
      setUsers(users.filter(user => user.id !== userId));
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">إدارة المستخدمين</h1>
          <p className="text-gray-600">إدارة حسابات المستخدمين</p>
        </div>
        <button 
          onClick={() => setShowAddUser(true)}
          className="flex items-center space-x-2 space-x-reverse px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <FiPlus size={18} />
          <span>إضافة مستخدم</span>
        </button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="py-4">
          <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 space-x-reverse">
            {/* Search */}
            <div className="relative">
              <FiSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="ابحث بالاسم أو البريد..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-80 px-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            {/* Role Filter */}
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="all">جميع الأدوار</option>
              {roles.map(role => (
                <option key={role} value={role}>{role}</option>
              ))}
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold text-gray-900">قائمة المستخدمين</h2>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-right py-3 px-4 text-sm font-medium text-gray-600">المستخدم</th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-gray-600">البريد الإلكتروني</th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-gray-600">الدور</th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-gray-600">الإجراءات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-3 space-x-reverse">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <FiUser className="text-blue-600" size={18} />
                        </div>
                        <div className="font-medium text-gray-900">{user.name}</div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <FiMail className="text-gray-400" size={16} />
                        <span className="text-gray-900">{user.email}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                        {user.role}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <button 
                          onClick={() => setEditingUser(user)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                        >
                          <FiEdit size={16} />
                        </button>
                        <button 
                          onClick={() => handleDeleteUser(user.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors"
                        >
                          <FiTrash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredUsers.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                لا توجد نتائج مطابقة للبحث
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Add/Edit User Modal */}
      {(showAddUser || editingUser) && (
        <UserModal
          user={editingUser}
          roles={roles}
          onClose={() => {
            setShowAddUser(false);
            setEditingUser(null);
          }}
          onSave={(userData) => {
            if (editingUser) {
              setUsers(users.map(u => u.id === editingUser.id ? { ...u, ...userData } : u));
            } else {
              const newUser = {
                ...userData,
                id: Math.max(...users.map(u => u.id)) + 1,
              };
              setUsers([...users, newUser]);
            }
            setShowAddUser(false);
            setEditingUser(null);
          }}
        />
      )}
    </div>
  );
}

// User Modal Component
function UserModal({ user, roles, onClose, onSave }: { 
  user?: User | null; 
  roles: string[];
  onClose: () => void; 
  onSave: (data: any) => void;
}) {
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    role: user?.role || 'مستخدم',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg w-full max-w-md">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">
            {user ? 'تعديل مستخدم' : 'إضافة مستخدم جديد'}
          </h2>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">الاسم الكامل</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">البريد الإلكتروني</label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">الدور</label>
            <select
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              {roles.map(role => (
                <option key={role} value={role}>{role}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center justify-end space-x-3 space-x-reverse pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              إلغاء
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              {user ? 'تحديث' : 'إضافة'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}