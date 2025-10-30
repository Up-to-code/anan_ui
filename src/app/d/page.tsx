'use client';
import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Card } from '@/components/ui/card';
import { Table } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Modal } from '@/components/ui/modal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  FiUser,
  FiTrash2,
  FiEdit,
  FiEye,
  FiDownload,
  FiUpload,
} from 'react-icons/fi';

import {
  Alert,
  Tabs,
  Accordion,
  Progress,
  Tooltip,
  Pagination,
  Breadcrumb,
} from '@/components/ui';

interface User {
  id: number;
  name: string;
  email: string;
  status: 'active' | 'pending' | 'inactive';
  registrationDate: string;
  phone?: string;
  role: string;
}

interface UserFormData {
  name: string;
  email: string;
  password: string;
  phone: string;
  role: string;
}

const initialFormData: UserFormData = {
  name: '',
  email: '',
  password: '',
  phone: '',
  role: 'user',
};

// Mock users data, will be static unless you implement state for it.
const initialUsers: User[] = [
  {
    id: 1,
    name: 'أحمد محمد',
    email: 'ahmed@example.com',
    status: 'active',
    registrationDate: '2024-01-15',
    phone: '+966500000001',
    role: 'مدير',
  },
  {
    id: 2,
    name: 'فاطمة علي',
    email: 'fatima@example.com',
    status: 'pending',
    registrationDate: '2024-01-14',
    phone: '+966500000002',
    role: 'مستخدم',
  },
  {
    id: 3,
    name: 'خالد سعيد',
    email: 'khaled@example.com',
    status: 'active',
    registrationDate: '2024-01-13',
    phone: '+966500000003',
    role: 'مشرف',
  },
  {
    id: 4,
    name: 'نورة عبدالله',
    email: 'nora@example.com',
    status: 'inactive',
    registrationDate: '2024-01-12',
    phone: '+966500000004',
    role: 'مستخدم',
  },
];

function getStatusBadge(status: User['status']) {
  switch (status) {
    case 'active':
      return <Badge.Success>نشط</Badge.Success>;
    case 'pending':
      return <Badge.Warning>معلق</Badge.Warning>;
    case 'inactive':
      return <Badge.Danger>غير نشط</Badge.Danger>;
    default:
      return <Badge.Gray>غير محدد</Badge.Gray>;
  }
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [search, setSearch] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isFullscreenModalOpen, setIsFullscreenModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [formData, setFormData] = useState<UserFormData>(initialFormData);

  // FILTERING
  const filteredUsers = users.filter(
    user =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase())
  );

  // STATS
  const stats = {
    total: users.length,
    active: users.filter(u => u.status === 'active').length,
    pending: users.filter(u => u.status === 'pending').length,
    inactive: users.filter(u => u.status === 'inactive').length,
  };

  // HANDLERS
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  // Fix: Accept textarea events too for all input change handlers.
  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddUser = async (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.password) {
      alert('يرجى ملء جميع الحقول المطلوبة');
      return;
    }
    setIsLoading(true);
    try {
      await new Promise(rs => setTimeout(rs, 900));
      setUsers(prev => [
        ...prev,
        {
          id: prev.length ? Math.max(...prev.map(u => u.id)) + 1 : 1,
          name: formData.name,
          email: formData.email,
          status: 'active',
          registrationDate: new Date().toISOString().slice(0, 10),
          phone: formData.phone,
          role: formData.role === 'user'
            ? 'مستخدم'
            : formData.role === 'admin'
            ? 'مدير'
            : 'مشرف',
        },
      ]);
      setFormData(initialFormData);
      setIsAddModalOpen(false);
      setIsSuccessModalOpen(true);
    } catch {
      alert('حدث خطأ أثناء إضافة المستخدم');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      password: '',
      phone: user.phone || '',
      role:
        user.role === 'مستخدم'
          ? 'user'
          : user.role === 'مدير'
          ? 'admin'
          : 'supervisor',
    });
    setIsEditModalOpen(true);
  };

  const handleSaveEdit = async (e: FormEvent) => {
    e.preventDefault();
    if (!selectedUser) return;
    setIsLoading(true);
    try {
      await new Promise(rs => setTimeout(rs, 900));
      setUsers(prev =>
        prev.map(u =>
          u.id === selectedUser.id
            ? {
                ...u,
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                role:
                  formData.role === 'user'
                    ? 'مستخدم'
                    : formData.role === 'admin'
                    ? 'مدير'
                    : 'مشرف',
              }
            : u
        )
      );
      setIsEditModalOpen(false);
      setSelectedUser(null);
      setIsSuccessModalOpen(true);
    } catch {
      alert('حدث خطأ أثناء تعديل المستخدم');
    } finally {
      setIsLoading(false);
    }
  };

  const handleViewUser = (user: User) => {
    setSelectedUser(user);
    setIsViewModalOpen(true);
  };

  const handleDeleteUser = (user: User) => {
    setSelectedUser(user);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!selectedUser) return;
    setIsLoading(true);
    try {
      await new Promise(rs => setTimeout(rs, 700));
      setUsers(prev => prev.filter(u => u.id !== selectedUser.id));
      setIsDeleteModalOpen(false);
      setSelectedUser(null);
      setIsSuccessModalOpen(true);
    } catch {
      alert('حدث خطأ أثناء حذف المستخدم');
    } finally {
      setIsLoading(false);
    }
  };

  const handleImportUsers = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await new Promise(rs => setTimeout(rs, 1200));
      setIsImportModalOpen(false);
      setIsSuccessModalOpen(true);
    } catch {
      alert('حدث خطأ أثناء استيراد المستخدمين');
    } finally {
      setIsLoading(false);
    }
  };

  // CLEAN TABLE DATA
  const tableData = filteredUsers.map(user => [
    <div key={`name-${user.id}`} className="font-medium text-gray-900">
      {user.name}
    </div>,
    <div key={`email-${user.id}`} className="text-gray-600">
      {user.email}
    </div>,
    <div key={`role-${user.id}`} className="text-gray-600">
      {user.role}
    </div>,
    <div key={`status-${user.id}`}>{getStatusBadge(user.status)}</div>,
    <div key={`date-${user.id}`} className="text-gray-500">
      {user.registrationDate}
    </div>,
    <div
      key={`actions-${user.id}`}
      className="flex items-center justify-end space-x-2 space-x-reverse"
    >
      <Button.Ghost
        onClick={() => handleViewUser(user)}
        className="text-blue-600 hover:text-blue-700"
      >
        <FiEye size={14} />
      </Button.Ghost>
      <Button.Ghost
        onClick={() => handleEditUser(user)}
        className="text-green-600 hover:text-green-700"
      >
        <FiEdit size={14} />
      </Button.Ghost>
      <Button.Ghost
        onClick={() => handleDeleteUser(user)}
        className="text-red-600 hover:text-red-700"
      >
        <FiTrash2 size={14} />
      </Button.Ghost>
    </div>,
  ]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">إدارة المستخدمين</h1>
          <p className="text-gray-600 mt-1">إدارة وحسابات مستخدمي النظام</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <Input.Search
            placeholder="ابحث في المستخدمين..."
            value={search}
            onChange={(e) => handleSearchChange(e as React.ChangeEvent<HTMLInputElement>)}
            className="w-full sm:w-64"
          />
          <div className="flex gap-2">
            <Button.Outline onClick={() => setIsImportModalOpen(true)}>
              <FiUpload className="ml-1" size={16} />
              استيراد
            </Button.Outline>
            <Button.Add onClick={() => setIsAddModalOpen(true)}>
              إضافة مستخدم
            </Button.Add>
          </div>
        </div>
      </div>

      {/* NEW UI COMPONENTS EXAMPLES */}

      {/* Alert Examples */}
      <Alert.Basic type="success" title="نجح" message="تمت العملية بنجاح" />
      <Alert.Inline type="error" message="حدث خطأ ما" />
      <Alert.Banner type="info" message="إشعار مهم" />

      {/* Tabs Example */}
      <Tabs.Basic
        tabs={[
          { id: 'tab1', label: 'التبويب الأول', content: <div>محتوى ١</div> },
          { id: 'tab2', label: 'التبويب الثاني', content: <div>محتوى ٢</div> },
        ]}
      />

      {/* Progress Examples */}
      <Progress.Bar value={75} showLabel />
      <Progress.Circular value={60} size="lg" />

      {/* Tooltip Example */}
      <Tooltip.Basic content="هذه أداة تلميح" position="top">
        <button>مرر فوقي</button>
      </Tooltip.Basic>

      {/* Pagination Example */}
      <Pagination.Basic
        currentPage={1}
        totalPages={10}
        onPageChange={(page) => console.log(page)}
        showInfo
        totalItems={95}
      />

      {/* Breadcrumb Example */}
      <Breadcrumb.Basic
        items={[
          { label: 'المستخدمين', href: '/users' },
          { label: 'تفاصيل المستخدم' },
        ]}
      />

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card.Basic className="text-center hover:shadow-md transition-shadow">
          <div className="p-4">
            <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
            <p className="text-gray-600 text-sm">إجمالي المستخدمين</p>
          </div>
        </Card.Basic>
        <Card.Basic className="text-center hover:shadow-md transition-shadow">
          <div className="p-4">
            <p className="text-2xl font-bold text-green-600">{stats.active}</p>
            <p className="text-gray-600 text-sm">نشط</p>
          </div>
        </Card.Basic>
        <Card.Basic className="text-center hover:shadow-md transition-shadow">
          <div className="p-4">
            <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
            <p className="text-gray-600 text-sm">معلق</p>
          </div>
        </Card.Basic>
        <Card.Basic className="text-center hover:shadow-md transition-shadow">
          <div className="p-4">
            <p className="text-2xl font-bold text-red-600">{stats.inactive}</p>
            <p className="text-gray-600 text-sm">غير نشط</p>
          </div>
        </Card.Basic>
      </div>

      {/* Users Table */}
      <Card.WithHeader
        title="قائمة المستخدمين"
        subtitle={`عرض ${filteredUsers.length} من ${users.length} مستخدم`}
        action={
          <Button.Outline onClick={() => setIsFullscreenModalOpen(true)}>
            <FiDownload className="ml-1" size={16} />
            عرض كامل
          </Button.Outline>
        }
      >
        {filteredUsers.length ? (
          <Table.Basic
            headers={[
              'الاسم',
              'البريد الإلكتروني',
              'الدور',
              'الحالة',
              'تاريخ التسجيل',
              'الإجراءات',
            ]}
            data={tableData}
          />
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <svg
                className="w-16 h-16 mx-auto"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                />
              </svg>
            </div>
            <p className="text-gray-500 text-lg mb-2">لا توجد نتائج للبحث</p>
            <p className="text-gray-400 text-sm">جرب استخدام كلمات بحث مختلفة</p>
          </div>
        )}
      </Card.WithHeader>

      {/* Add Modal */}
      <Modal.Basic
        isOpen={isAddModalOpen}
        onClose={() => {
          setIsAddModalOpen(false);
          setFormData(initialFormData);
        }}
        title="إضافة مستخدم جديد"
        size="md"
      >
        <form onSubmit={handleAddUser} className="space-y-4">
          <Input.Text
            label="الاسم الكامل"
            placeholder="أدخل الاسم الكامل..."
            value={formData.name}
            onChange={handleInputChange}
            required
            name="name"
            disabled={isLoading}
          />
          <Input.Email
            label="البريد الإلكتروني"
            placeholder="أدخل البريد الإلكتروني..."
            value={formData.email}
            onChange={handleInputChange}
            required
            name="email"
            disabled={isLoading}
          />
          <Input.Password
            label="كلمة المرور"
            placeholder="أدخل كلمة المرور..."
            value={formData.password}
            onChange={handleInputChange}
            required
            name="password"
            disabled={isLoading}
          />
          <Input.Text
            label="رقم الهاتف"
            placeholder="أدخل رقم الهاتف..."
            value={formData.phone}
            onChange={handleInputChange}
            name="phone"
            disabled={isLoading}
          />
          <Input.Select
            label="الدور"
            value={formData.role}
            onChange={handleInputChange}
            options={[
              { value: 'user', label: 'مستخدم' },
              { value: 'admin', label: 'مدير' },
              { value: 'supervisor', label: 'مشرف' },
            ]}
            name="role"
            disabled={isLoading}
          />
          <div className="flex space-x-3 space-x-reverse justify-end pt-4 border-t border-gray-200">
            <Button.Outline
              type="button"
              onClick={() => {
                setIsAddModalOpen(false);
                setFormData(initialFormData);
              }}
              disabled={isLoading}
            >
              إلغاء
            </Button.Outline>
            <Button.Primary
              type="submit"
              loading={isLoading}
              disabled={isLoading}
            >
              {isLoading ? 'جاري الحفظ...' : 'حفظ المستخدم'}
            </Button.Primary>
          </div>
        </form>
      </Modal.Basic>

      {/* Edit Modal */}
      <Modal.Basic
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedUser(null);
        }}
        title="تعديل المستخدم"
        size="md"
      >
        <form className="space-y-4" onSubmit={handleSaveEdit}>
          <Input.Text
            label="الاسم الكامل"
            value={formData.name}
            onChange={handleInputChange}
            required
            name="name"
            disabled={isLoading}
          />
          <Input.Email
            label="البريد الإلكتروني"
            value={formData.email}
            onChange={handleInputChange}
            required
            name="email"
            disabled={isLoading}
          />
          <Input.Password
            label="كلمة المرور الجديدة"
            placeholder="اتركها فارغة للحفاظ على كلمة المرور الحالية"
            value={formData.password}
            onChange={handleInputChange}
            name="password"
            disabled={isLoading}
          />
          <Input.Text
            label="رقم الهاتف"
            value={formData.phone}
            onChange={handleInputChange}
            name="phone"
            disabled={isLoading}
          />
          <Input.Select
            label="الدور"
            value={formData.role}
            onChange={handleInputChange}
            options={[
              { value: 'user', label: 'مستخدم' },
              { value: 'admin', label: 'مدير' },
              { value: 'supervisor', label: 'مشرف' },
            ]}
            name="role"
            disabled={isLoading}
          />
          <div className="flex space-x-3 space-x-reverse justify-end pt-4 border-t border-gray-200">
            <Button.Outline
              type="button"
              onClick={() => {
                setIsEditModalOpen(false);
                setSelectedUser(null);
              }}
              disabled={isLoading}
            >
              إلغاء
            </Button.Outline>
            <Button.Primary
              type="submit"
              loading={isLoading}
              disabled={isLoading}
            >
              {isLoading ? 'جاري الحفظ...' : 'حفظ التغييرات'}
            </Button.Primary>
          </div>
        </form>
      </Modal.Basic>

      {/* Confirm Modal - Delete User */}
      <Modal.Confirm
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setSelectedUser(null);
        }}
        onConfirm={confirmDelete}
        title="تأكيد الحذف"
        message={`هل أنت متأكد من أنك تريد حذف المستخدم "${selectedUser?.name}"؟ لا يمكن التراجع عن هذا الإجراء.`}
        confirmText="نعم، احذف"
        cancelText="إلغاء"
        loading={isLoading}
      />

      {/* View Modal - User Details */}
      <Modal.Basic
        isOpen={isViewModalOpen}
        onClose={() => {
          setIsViewModalOpen(false);
          setSelectedUser(null);
        }}
        title="تفاصيل المستخدم"
        size="md"
      >
        {selectedUser && (
          <div className="space-y-4">
            <div className="flex items-center space-x-3 space-x-reverse">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                <FiUser className="text-blue-600 text-xl" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{selectedUser.name}</h3>
                <p className="text-gray-600">{selectedUser.email}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div>
                <label className="text-sm font-medium text-gray-700">رقم الهاتف</label>
                <p className="text-gray-900">{selectedUser.phone || 'غير محدد'}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">الدور</label>
                <p className="text-gray-900">{selectedUser.role}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">الحالة</label>
                <div className="mt-1">{getStatusBadge(selectedUser.status)}</div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">تاريخ التسجيل</label>
                <p className="text-gray-900">{selectedUser.registrationDate}</p>
              </div>
            </div>
          </div>
        )}
      </Modal.Basic>

      {/* Import Modal */}
      <Modal.Basic
        isOpen={isImportModalOpen}
        onClose={() => setIsImportModalOpen(false)}
        title="استيراد المستخدمين"
        size="lg"
      >
        <form onSubmit={handleImportUsers} className="space-y-4">
          <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center">
            <FiUpload className="mx-auto text-gray-400 text-3xl mb-4" />
            <p className="text-gray-600 mb-2">اسحب وأفلت ملف Excel هنا</p>
            <p className="text-gray-400 text-sm">أو</p>
            <Button.Outline type="button" className="mt-2">
              اختر ملف
            </Button.Outline>
          </div>
          <div className="bg-gray-50 rounded-xl p-4">
            <h4 className="font-medium text-gray-900 mb-2">تعليمات الاستيراد</h4>
            <ul className="text-sm text-gray-600 space-y-1 list-disc pr-4">
              <li>يجب أن يكون الملف بصيغة Excel (.xlsx)</li>
              <li>يجب أن يحتوي على الأعمدة: الاسم، البريد الإلكتروني، الدور</li>
              <li>الحد الأقصى لعدد المستخدمين في الملف: 1000 مستخدم</li>
            </ul>
          </div>
          <div className="flex space-x-3 space-x-reverse justify-end pt-4 border-t border-gray-200">
            <Button.Outline type="button" onClick={() => setIsImportModalOpen(false)}>
              إلغاء
            </Button.Outline>
            <Button.Primary type="submit" loading={isLoading}>
              {isLoading ? 'جاري الاستيراد...' : 'استيراد المستخدمين'}
            </Button.Primary>
          </div>
        </form>
      </Modal.Basic>

      {/* Success Modal */}
      <Modal.Custom
        isOpen={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
        size="sm"
      >
        <div className="text-center py-6">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">تمت العملية بنجاح</h3>
          <p className="text-gray-600 mb-6">تم تنفيذ العملية المطلوبة بنجاح</p>
          <Button.Primary onClick={() => setIsSuccessModalOpen(false)}>
            موافق
          </Button.Primary>
        </div>
      </Modal.Custom>

      {/* Fullscreen Modal */}
      <Modal.Fullscreen
        isOpen={isFullscreenModalOpen}
        onClose={() => setIsFullscreenModalOpen(false)}
        title="عرض كامل - جميع المستخدمين"
      >
        <div className="space-y-4">
          <Table.Basic
            headers={['الاسم', 'البريد الإلكتروني', 'الدور', 'الحالة', 'تاريخ التسجيل']}
            data={users.map(user => [
              user.name,
              user.email,
              user.role,
              getStatusBadge(user.status),
              user.registrationDate,
            ])}
          />
          <div className="flex justify-between items-center pt-4 border-t border-gray-200">
            <p className="text-gray-600">إجمالي {users.length} مستخدم</p>
            <Button.Outline onClick={() => setIsFullscreenModalOpen(false)}>
              إغلاق العرض
            </Button.Outline>
          </div>
        </div>
      </Modal.Fullscreen>

      {/* Blur Modal Example */}
      <Modal.Blur
        isOpen={false}
        onClose={() => {}}
        title="نافذة بتأثير ضبابي"
        size="md"
      >
        <div className="text-center py-8">
          <p className="text-gray-600">هذه نافذة مع تأثير ضبابي على الخلفية</p>
        </div>
      </Modal.Blur>
    </div>
  );
}