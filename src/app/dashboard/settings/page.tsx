// app/dashboard/settings/page.tsx
"use client";

import { useState } from "react";
import {
  FiUser,
  FiMail,
  FiPhone,
  FiLock,
  FiGlobe,
  FiBell,
  FiShield,
  FiLogOut,
  FiSave,
  FiEdit,
} from "react-icons/fi";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");
  const [isEditing, setIsEditing] = useState(false);

  const [userData, setUserData] = useState({
    name: "مدير النظام",
    email: "admin@whatsapp-property.com",
    phone: "+966500000000",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    language: "ar",
    notifications: {
      email: true,
      sms: false,
      push: true,
    },
    darkMode: false,
    autoUpdate: true,
  });

  // Fix: Save should clear password fields after successful save (security)
  // Fix: Security-specific save for password change
  // Fix: Save preferences should save preferences only
  // Fix: Ensure switches (night mode, auto-update) are state-controlled
  // Fix: Consistent edit/cancel of profile

  const handleProfileSave = () => {
    // Here you would typically send the data to your API
    console.log("Saving profile:", {
      name: userData.name,
      email: userData.email,
      phone: userData.phone,
    });
    setIsEditing(false);
    alert("تم حفظ التغييرات بنجاح");
  };

  const handlePasswordSave = () => {
    // Validate new passwords
    if (!userData.newPassword) {
      alert("يرجى إدخال كلمة المرور الجديدة");
      return;
    }
    if (userData.newPassword !== userData.confirmPassword) {
      alert("كلمتا المرور غير متطابقتين");
      return;
    }
    // Here you would typically handle password change logic
    console.log("Saving new password:", {
      currentPassword: userData.currentPassword,
      newPassword: userData.newPassword,
    });
    setUserData({
      ...userData,
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
    alert("تم تغيير كلمة المرور بنجاح");
  };

  const handleNotificationsSave = () => {
    // Save notification settings
    console.log("Saving notification preferences:", userData.notifications);
    alert("تم حفظ تفضيلات الإشعارات");
  };

  const handlePreferencesSave = () => {
    // Save preferences (language, darkMode, autoUpdate)
    console.log("Saving preferences:", {
      language: userData.language,
      darkMode: userData.darkMode,
      autoUpdate: userData.autoUpdate,
    });
    alert("تم حفظ الإعدادات");
  };

  const handleLogout = () => {
    if (confirm("هل أنت متأكد من تسجيل الخروج؟")) {
      console.log("Logging out...");
      window.location.href = "/login";
    }
  };

  const tabs = [
    { id: "profile", name: "الملف الشخصي", icon: FiUser },
    { id: "security", name: "الأمان", icon: FiShield },
    { id: "notifications", name: "الإشعارات", icon: FiBell },
    { id: "preferences", name: "التفضيلات", icon: FiGlobe },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">الإعدادات</h1>
          <p className="text-gray-600">إدارة إعدادات حسابك وتفضيلات النظام</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar Tabs */}
        <div className="lg:col-span-1">
          <Card className="border border-gray-200">
            <CardContent className="p-4">
              <nav className="space-y-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => {
                        setActiveTab(tab.id);
                        setIsEditing(false);
                      }}
                      className={`w-full flex items-center space-x-3 space-x-reverse p-3 rounded-lg text-right transition-colors ${
                        activeTab === tab.id
                          ? "bg-blue-50 text-blue-600 border-r-4 border-blue-600"
                          : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                      }`}
                    >
                      <Icon size={18} />
                      <span className="font-medium text-sm">{tab.name}</span>
                    </button>
                  );
                })}
              </nav>

              {/* Logout Button */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <button
                  type="button"
                  onClick={handleLogout}
                  className="w-full flex items-center space-x-3 space-x-reverse p-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
                >
                  <FiLogOut size={18} />
                  <span className="font-medium text-sm">تسجيل الخروج</span>
                </button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          {/* Profile Tab */}
          {activeTab === "profile" && (
            <Card className="border border-gray-200">
              <CardContent className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-lg font-semibold text-gray-900">
                    الملف الشخصي
                  </h2>
                  {!isEditing ? (
                    <button
                      type="button"
                      onClick={() => setIsEditing(true)}
                      className="flex items-center space-x-2 space-x-reverse px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      <FiEdit size={16} />
                      <span>تعديل</span>
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setIsEditing(false)}
                      className="flex items-center space-x-2 space-x-reverse px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <span>إلغاء</span>
                    </button>
                  )}
                </div>

                <div className="space-y-6">
                  {/* Profile Image */}
                  <div className="flex items-center space-x-4 space-x-reverse">
                    <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center">
                      <FiUser size={24} className="text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">
                        {userData.name}
                      </p>
                      <p className="text-sm text-gray-600">{userData.email}</p>
                      {isEditing && (
                        <button
                          type="button"
                          className="mt-2 text-sm text-blue-600 hover:text-blue-800"
                        >
                          تغيير الصورة
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Form Fields */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input.Text
                      label="الاسم الكامل"
                      value={userData.name}
                      onChange={(e) =>
                        setUserData({ ...userData, name: e.target.value })
                      }
                      disabled={!isEditing}
                      icon={FiUser}
                    />

                    <Input.Text
                      label="البريد الإلكتروني"
                      type="email"
                      value={userData.email}
                      onChange={(e) =>
                        setUserData({ ...userData, email: e.target.value })
                      }
                      disabled={!isEditing}
                      icon={FiMail}
                    />

                    <Input.Text
                      label="رقم الجوال"
                      value={userData.phone}
                      onChange={(e) =>
                        setUserData({ ...userData, phone: e.target.value })
                      }
                      disabled={!isEditing}
                      icon={FiPhone}
                    />
                  </div>

                  {isEditing && (
                    <div className="flex space-x-4 space-x-reverse pt-4">
                      <Button.Primary
                        type="button"
                        onClick={handleProfileSave}
                        className="flex items-center space-x-2 space-x-reverse"
                      >
                        <FiSave size={16} />
                        <span>حفظ التغييرات</span>
                      </Button.Primary>
                      <Button.Secondary
                        type="button"
                        onClick={() => setIsEditing(false)}
                      >
                        إلغاء
                      </Button.Secondary>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Security Tab */}
          {activeTab === "security" && (
            <Card className="border border-gray-200">
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-6">
                  الأمان
                </h2>

                <div className="space-y-6">
                  <div>
                    <h3 className="font-medium text-gray-900 mb-4">
                      تغيير كلمة المرور
                    </h3>
                    <div className="space-y-4">
                      <Input.Text
                        label="كلمة المرور الحالية"
                        type="password"
                        value={userData.currentPassword}
                        onChange={(e) =>
                          setUserData({
                            ...userData,
                            currentPassword: e.target.value,
                          })
                        }
                        icon={FiLock}
                      />

                      <Input.Text
                        label="كلمة المرور الجديدة"
                        type="password"
                        value={userData.newPassword}
                        onChange={(e) =>
                          setUserData({
                            ...userData,
                            newPassword: e.target.value,
                          })
                        }
                        icon={FiLock}
                      />

                      <Input.Text
                        label="تأكيد كلمة المرور الجديدة"
                        type="password"
                        value={userData.confirmPassword}
                        onChange={(e) =>
                          setUserData({
                            ...userData,
                            confirmPassword: e.target.value,
                          })
                        }
                        icon={FiLock}
                      />

                      <Button.Primary
                        type="button"
                        onClick={handlePasswordSave}
                        className="mt-4"
                      >
                        تغيير كلمة المرور
                      </Button.Primary>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 pt-6">
                    <h3 className="font-medium text-gray-900 mb-4">
                      جلسات التسجيل
                    </h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-900">
                            هذه الجلسة
                          </p>
                          <p className="text-sm text-gray-600">
                            متصفح Chrome على Windows
                          </p>
                        </div>
                        <span className="text-sm text-green-600 bg-green-100 px-2 py-1 rounded">
                          نشطة
                        </span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-900">
                            جلسة سابقة
                          </p>
                          <p className="text-sm text-gray-600">
                            متصفح Safari على iPhone
                          </p>
                        </div>
                        <span className="text-sm text-gray-500">
                          منذ 3 أيام
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Notifications Tab */}
          {activeTab === "notifications" && (
            <Card className="border border-gray-200">
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-6">
                  الإشعارات
                </h2>

                <div className="space-y-6">
                  <div>
                    <h3 className="font-medium text-gray-900 mb-4">
                      تفضيلات الإشعارات
                    </h3>
                    <div className="space-y-4">
                      {Object.entries(userData.notifications).map(
                        ([key, value]) => (
                          <div
                            key={key}
                            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                          >
                            <div>
                              <p className="font-medium text-gray-900">
                                {key === "email" && "البريد الإلكتروني"}
                                {key === "sms" && "رسائل SMS"}
                                {key === "push" && "الإشعارات الفورية"}
                              </p>
                              <p className="text-sm text-gray-600">
                                {key === "email" &&
                                  "استلام إشعارات على البريد الإلكتروني"}
                                {key === "sms" &&
                                  "استلام إشعارات عبر رسائل SMS"}
                                {key === "push" &&
                                  "استلام إشعارات فورية في المتصفح"}
                              </p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input
                                type="checkbox"
                                checked={!!value}
                                onChange={(e) =>
                                  setUserData({
                                    ...userData,
                                    notifications: {
                                      ...userData.notifications,
                                      [key]: e.target.checked,
                                    },
                                  })
                                }
                                className="sr-only peer"
                              />
                              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:right-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                            </label>
                          </div>
                        )
                      )}
                    </div>

                    <Button.Primary
                      type="button"
                      onClick={handleNotificationsSave}
                      className="mt-6"
                    >
                      حفظ التفضيلات
                    </Button.Primary>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Preferences Tab */}
          {activeTab === "preferences" && (
            <Card className="border border-gray-200">
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-6">
                  التفضيلات
                </h2>

                <div className="space-y-6">
                  <div>
                    <h3 className="font-medium text-gray-900 mb-4">
                      إعدادات اللغة
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Input.Select
                        label="لغة الواجهة"
                        value={userData.language}
                        onChange={(e) =>
                          setUserData({ ...userData, language: e.target.value })
                        }
                        options={[
                          { value: "ar", label: "العربية" },
                          { value: "en", label: "English" },
                        ]}
                        icon={FiGlobe}
                      />
                    </div>
                  </div>

                  <div className="border-t border-gray-200 pt-6">
                    <h3 className="font-medium text-gray-900 mb-4">
                      إعدادات النظام
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-900">
                            الوضع الليلي
                          </p>
                          <p className="text-sm text-gray-600">
                            تفعيل الوضع المظلم للواجهة
                          </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={userData.darkMode}
                            onChange={(e) =>
                              setUserData({
                                ...userData,
                                darkMode: e.target.checked,
                              })
                            }
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:right-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>

                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-900">
                            التحديثات التلقائية
                          </p>
                          <p className="text-sm text-gray-600">
                            تثبيت التحديثات تلقائياً
                          </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={userData.autoUpdate}
                            onChange={(e) =>
                              setUserData({
                                ...userData,
                                autoUpdate: e.target.checked,
                              })
                            }
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:right-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                    </div>

                    <Button.Primary
                      type="button"
                      onClick={handlePreferencesSave}
                      className="mt-6"
                    >
                      حفظ الإعدادات
                    </Button.Primary>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
