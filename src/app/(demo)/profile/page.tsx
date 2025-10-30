'use client';

import { useState } from 'react';
import UserProfileCard from '@/components/common/Profiles/UserProfileCard';
import ProfileHeader from '@/components/common/Profiles/ProfileHeader';
import ProfileEditForm from '@/components/common/Profiles/ProfileEditForm';
import UserListGrid from '@/components/common/Profiles/UserListGrid';
import ProfileStats from '@/components/common/Profiles/ProfileStats';

interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: string;
  phone: string;
  department: string;
  joinDate: string;
  status: 'active' | 'inactive' | 'pending';
  bio: string;
  stats: {
    posts: number;
    followers: number;
    following: number;
  };
  performance: {
    completedTasks: number;
    inProgress: number;
    projects: number;
    hoursWorked: number;
    efficiency: number;
    rating: number;
  };
}

interface TeamUser {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive' | 'pending';
  lastActive: string;
}

export default function ProfilePage() {
  const [editing, setEditing] = useState(false);
  const [activeTab, setActiveTab] = useState<'profile' | 'team' | 'stats'>('profile');

  // Sample user data
  const currentUser: UserProfile = {
    id: '1',
    name: 'محمد أحمد',
    email: 'mohamed@example.com',
    role: 'مدير النظام',
    phone: '+966501234567',
    department: 'تطوير',
    joinDate: '١٠ يناير ٢٠٢٣',
    status: 'active',
    bio: 'مطور واجهات مستخدم بخبرة 5 سنوات في تطوير تطبيقات الويب الحديثة.',
    stats: {
      posts: 45,
      followers: 1245,
      following: 89,
    },
    performance: {
      completedTasks: 156,
      inProgress: 12,
      projects: 8,
      hoursWorked: 1240,
      efficiency: 92,
      rating: 4.8,
    }
  };

  const teamUsers: TeamUser[] = [
    {
      id: '2',
      name: 'فاطمة علي',
      email: 'fatima@example.com',
      role: 'مصممة واجهات',
      status: 'active',
      lastActive: 'منذ ساعتين'
    },
    {
      id: '3',
      name: 'خالد عبدالله',
      email: 'khaled@example.com',
      role: 'مطور Backend',
      status: 'active',
      lastActive: 'منذ 5 دقائق'
    },
    {
      id: '4',
      name: 'سارة محمد',
      email: 'sara@example.com',
      role: 'مديرة مشاريع',
      status: 'inactive',
      lastActive: 'منذ يومين'
    },
    {
      id: '5',
      name: 'أحمد حسن',
      email: 'ahmed@example.com',
      role: 'مطور تطبيقات',
      status: 'pending',
      lastActive: 'لم يسجل دخول'
    },
    {
      id: '6',
      name: 'نورة الكندري',
      email: 'noura@example.com',
      role: 'خبيرة بيانات',
      status: 'active',
      lastActive: 'منذ ساعة'
    }
  ];

  // This matches the required data shape for ProfileEditForm formData
  // Use the same types as in ProfileEditForm
  type UserProfileFormData = {
    name: string;
    email: string;
    phone: string;
    role: string;
    department: string;
    bio: string;
  };

  const handleSaveProfile = (data: UserProfileFormData) => {
    console.log('Saving profile:', data);
    setEditing(false);
    // Here update the currentUser state (if you lift it up)
    // For now, only logging as in original code
  };

  const handleEditUser = (userId: string) => {
    console.log('Edit user:', userId);
  };

  const handleMessageUser = (userId: string) => {
    console.log('Message user:', userId);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8" dir="rtl">
      <div className="container mx-auto px-6 space-y-8">

        {/* Profile Header */}
        <ProfileHeader
          user={currentUser}
          onEditProfile={() => setEditing(true)}
        />

        {/* Tabs */}
        <div className="bg-white rounded-xl border border-gray-200">
          <div className="border-b border-gray-200">
            <nav className="flex gap-8 px-6">
              {[
                { id: 'profile', label: 'الملف الشخصي' },
                { id: 'team', label: 'فريق العمل' },
                { id: 'stats', label: 'الإحصائيات' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as 'profile' | 'team' | 'stats')}
                  className={`py-4 px-2 border-b-2 font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">

            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div className="max-w-2xl">
                {editing ? (
                  <ProfileEditForm
                    user={currentUser}
                    onSave={handleSaveProfile}
                    onCancel={() => setEditing(false)}
                  />
                ) : (
                  <UserProfileCard
                    user={currentUser}
                    onEdit={() => setEditing(true)}
                    onMessage={() => console.log('Message user')}
                  />
                )}
              </div>
            )}

            {/* Team Tab */}
            {activeTab === 'team' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-900">فريق العمل</h2>
                  <span className="text-gray-600">{teamUsers.length} عضو</span>
                </div>
                <UserListGrid
                  users={teamUsers}
                  onEdit={handleEditUser}
                  onMessage={handleMessageUser}
                />
              </div>
            )}

            {/* Stats Tab */}
            {activeTab === 'stats' && (
              <div className="max-w-4xl">
                <ProfileStats stats={currentUser.performance} />
              </div>
            )}

          </div>
        </div>

      </div>
    </div>
  );
}