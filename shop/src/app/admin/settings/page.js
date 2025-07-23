'use client';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import AdminLayout from '../../components/AdminLayout';
import { 
  FaCog,
  FaSave,
  FaUndo,
  FaBell,
  FaShieldAlt,
  FaPalette,
  FaGlobe,
  FaCreditCard,
  FaTruck,
  FaEnvelope,
  FaToggleOn,
  FaToggleOff
} from 'react-icons/fa';

export default function AdminSettings() {
  const { data: session } = useSession();
  const router = useRouter();
  const [settings, setSettings] = useState({
    // General Settings
    siteName: 'فروشگاه جادویی',
    siteDescription: 'بهترین فروشگاه آنلاین با کیفیت افسانه‌ای',
    siteEmail: 'info@magicalshop.com',
    sitePhone: '021-12345678',
    siteAddress: 'تهران، خیابان جادویی',
    
    // Notification Settings
    emailNotifications: true,
    smsNotifications: false,
    orderNotifications: true,
    stockNotifications: true,
    
    // Security Settings
    twoFactorAuth: false,
    sessionTimeout: 30,
    maxLoginAttempts: 5,
    passwordMinLength: 8,
    
    // Payment Settings
    enableOnlinePayment: true,
    enableCashOnDelivery: true,
    taxRate: 9,
    shippingCost: 50000,
    freeShippingThreshold: 500000,
    
    // Appearance Settings
    theme: 'light',
    primaryColor: '#3B82F6',
    secondaryColor: '#8B5CF6',
    enableAnimations: true,
    showProductImages: true
  });

  const [isSaving, setIsSaving] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  const handleSettingChange = (key, value) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
    setHasChanges(true);
  };

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSaving(false);
    setHasChanges(false);
    // Show success message
    alert('تنظیمات با موفقیت ذخیره شد');
  };

  const handleReset = () => {
    if (window.confirm('آیا از بازنشانی تنظیمات اطمینان دارید؟')) {
      // Reset to default values
      setSettings({
        siteName: 'فروشگاه جادویی',
        siteDescription: 'بهترین فروشگاه آنلاین با کیفیت افسانه‌ای',
        siteEmail: 'info@magicalshop.com',
        sitePhone: '021-12345678',
        siteAddress: 'تهران، خیابان جادویی',
        emailNotifications: true,
        smsNotifications: false,
        orderNotifications: true,
        stockNotifications: true,
        twoFactorAuth: false,
        sessionTimeout: 30,
        maxLoginAttempts: 5,
        passwordMinLength: 8,
        enableOnlinePayment: true,
        enableCashOnDelivery: true,
        taxRate: 9,
        shippingCost: 50000,
        freeShippingThreshold: 500000,
        theme: 'light',
        primaryColor: '#3B82F6',
        secondaryColor: '#8B5CF6',
        enableAnimations: true,
        showProductImages: true
      });
      setHasChanges(false);
    }
  };

  return (
    <AdminLayout>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">تنظیمات سیستم</h1>
        <p className="text-gray-600">مدیریت تنظیمات و پیکربندی فروشگاه</p>
      </div>

      {/* Save/Reset Buttons */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FaCog className="h-5 w-5 text-blue-600" />
            <span className="text-sm text-gray-600">
              {hasChanges ? 'تغییرات ذخیره نشده' : 'همه تغییرات ذخیره شده'}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleReset}
              className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              <FaUndo className="h-4 w-4" />
              بازنشانی
            </button>
            <button
              onClick={handleSave}
              disabled={!hasChanges || isSaving}
              className={`flex items-center gap-2 px-6 py-2 rounded-lg transition-colors ${
                hasChanges && !isSaving
                  ? 'bg-blue-600 hover:bg-blue-700 text-white'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              {isSaving ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              ) : (
                <FaSave className="h-4 w-4" />
              )}
              {isSaving ? 'در حال ذخیره...' : 'ذخیره تنظیمات'}
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* General Settings */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
            <FaGlobe className="h-5 w-5 text-blue-600" />
            تنظیمات عمومی
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                نام فروشگاه
              </label>
              <input
                type="text"
                value={settings.siteName}
                onChange={(e) => handleSettingChange('siteName', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                توضیحات فروشگاه
              </label>
              <textarea
                value={settings.siteDescription}
                onChange={(e) => handleSettingChange('siteDescription', e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                ایمیل فروشگاه
              </label>
              <input
                type="email"
                value={settings.siteEmail}
                onChange={(e) => handleSettingChange('siteEmail', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                شماره تماس
              </label>
              <input
                type="text"
                value={settings.sitePhone}
                onChange={(e) => handleSettingChange('sitePhone', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                آدرس فروشگاه
              </label>
              <textarea
                value={settings.siteAddress}
                onChange={(e) => handleSettingChange('siteAddress', e.target.value)}
                rows={2}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
            <FaBell className="h-5 w-5 text-green-600" />
            تنظیمات اعلان‌ها
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-900">اعلان‌های ایمیل</h3>
                <p className="text-xs text-gray-500">ارسال اعلان‌ها از طریق ایمیل</p>
              </div>
              <button
                onClick={() => handleSettingChange('emailNotifications', !settings.emailNotifications)}
                className="text-2xl"
              >
                {settings.emailNotifications ? (
                  <FaToggleOn className="text-green-600" />
                ) : (
                  <FaToggleOff className="text-gray-400" />
                )}
              </button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-900">اعلان‌های پیامک</h3>
                <p className="text-xs text-gray-500">ارسال اعلان‌ها از طریق پیامک</p>
              </div>
              <button
                onClick={() => handleSettingChange('smsNotifications', !settings.smsNotifications)}
                className="text-2xl"
              >
                {settings.smsNotifications ? (
                  <FaToggleOn className="text-green-600" />
                ) : (
                  <FaToggleOff className="text-gray-400" />
                )}
              </button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-900">اعلان سفارشات جدید</h3>
                <p className="text-xs text-gray-500">اعلان برای سفارشات جدید</p>
              </div>
              <button
                onClick={() => handleSettingChange('orderNotifications', !settings.orderNotifications)}
                className="text-2xl"
              >
                {settings.orderNotifications ? (
                  <FaToggleOn className="text-green-600" />
                ) : (
                  <FaToggleOff className="text-gray-400" />
                )}
              </button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-900">اعلان موجودی</h3>
                <p className="text-xs text-gray-500">اعلان برای محصولات کم‌موجود</p>
              </div>
              <button
                onClick={() => handleSettingChange('stockNotifications', !settings.stockNotifications)}
                className="text-2xl"
              >
                {settings.stockNotifications ? (
                  <FaToggleOn className="text-green-600" />
                ) : (
                  <FaToggleOff className="text-gray-400" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Security Settings */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
            <FaShieldAlt className="h-5 w-5 text-red-600" />
            تنظیمات امنیتی
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-900">احراز هویت دو مرحله‌ای</h3>
                <p className="text-xs text-gray-500">فعال‌سازی احراز هویت دو مرحله‌ای</p>
              </div>
              <button
                onClick={() => handleSettingChange('twoFactorAuth', !settings.twoFactorAuth)}
                className="text-2xl"
              >
                {settings.twoFactorAuth ? (
                  <FaToggleOn className="text-green-600" />
                ) : (
                  <FaToggleOff className="text-gray-400" />
                )}
              </button>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                زمان انقضای نشست (دقیقه)
              </label>
              <input
                type="number"
                value={settings.sessionTimeout}
                onChange={(e) => handleSettingChange('sessionTimeout', parseInt(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                حداکثر تلاش ورود
              </label>
              <input
                type="number"
                value={settings.maxLoginAttempts}
                onChange={(e) => handleSettingChange('maxLoginAttempts', parseInt(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                حداقل طول رمز عبور
              </label>
              <input
                type="number"
                value={settings.passwordMinLength}
                onChange={(e) => handleSettingChange('passwordMinLength', parseInt(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Payment & Shipping Settings */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
            <FaCreditCard className="h-5 w-5 text-purple-600" />
            تنظیمات پرداخت و ارسال
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-900">پرداخت آنلاین</h3>
                <p className="text-xs text-gray-500">فعال‌سازی پرداخت آنلاین</p>
              </div>
              <button
                onClick={() => handleSettingChange('enableOnlinePayment', !settings.enableOnlinePayment)}
                className="text-2xl"
              >
                {settings.enableOnlinePayment ? (
                  <FaToggleOn className="text-green-600" />
                ) : (
                  <FaToggleOff className="text-gray-400" />
                )}
              </button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-900">پرداخت در محل</h3>
                <p className="text-xs text-gray-500">فعال‌سازی پرداخت در محل</p>
              </div>
              <button
                onClick={() => handleSettingChange('enableCashOnDelivery', !settings.enableCashOnDelivery)}
                className="text-2xl"
              >
                {settings.enableCashOnDelivery ? (
                  <FaToggleOn className="text-green-600" />
                ) : (
                  <FaToggleOff className="text-gray-400" />
                )}
              </button>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                نرخ مالیات (%)
              </label>
              <input
                type="number"
                value={settings.taxRate}
                onChange={(e) => handleSettingChange('taxRate', parseFloat(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                هزینه ارسال (تومان)
              </label>
              <input
                type="number"
                value={settings.shippingCost}
                onChange={(e) => handleSettingChange('shippingCost', parseInt(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                حد آستانه ارسال رایگان (تومان)
              </label>
              <input
                type="number"
                value={settings.freeShippingThreshold}
                onChange={(e) => handleSettingChange('freeShippingThreshold', parseInt(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
} 