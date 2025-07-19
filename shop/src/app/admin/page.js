'use client';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import AdminLayout from '../components/AdminLayout';
import { 
  FaChartBar, 
  FaBoxOpen, 
  FaClipboardList, 
  FaUsers, 
  FaCog, 
  FaTachometerAlt,
  FaShoppingCart,
  FaDollarSign,
  FaUserTie,
  FaChartLine,
  FaEye,
  FaEdit,
  FaTrash,
  FaPlus,
  FaCheckCircle,
  FaClock,
  FaExclamationTriangle
} from 'react-icons/fa';

export default function AdminDashboard() {
  const { data: session } = useSession();
  const router = useRouter();
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0,
    activeUsers: 0,
    monthlySales: [],
    recentOrders: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!session) {
      router.push('/login');
      return;
    }

    // Simulate fetching dashboard data
    const fetchDashboardData = async () => {
      try {
        // In a real app, you'd fetch this from your API
        const mockData = {
          totalProducts: 156,
          totalOrders: 89,
          totalRevenue: 12500000,
          activeUsers: 234,
          monthlySales: [
            { month: 'فروردین', sales: 1200000 },
            { month: 'اردیبهشت', sales: 1800000 },
            { month: 'خرداد', sales: 1500000 },
            { month: 'تیر', sales: 2200000 },
            { month: 'مرداد', sales: 1900000 },
            { month: 'شهریور', sales: 2500000 }
          ],
          recentOrders: [
            { id: '1', customer: 'احمد محمدی', amount: 450000, status: 'complete', date: '2024-01-15' },
            { id: '2', customer: 'فاطمه احمدی', amount: 320000, status: 'pending', date: '2024-01-14' },
            { id: '3', customer: 'علی رضایی', amount: 780000, status: 'complete', date: '2024-01-13' },
            { id: '4', customer: 'مریم کریمی', amount: 210000, status: 'pending', date: '2024-01-12' }
          ]
        };
        
        setStats(mockData);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [session, router]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('fa-IR', {
      style: 'currency',
      currency: 'IRR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const getStatusColor = (status) => {
    return status === 'complete' ? 'text-green-600' : 'text-yellow-600';
  };

  const getStatusIcon = (status) => {
    return status === 'complete' ? <FaCheckCircle className="text-green-500" /> : <FaClock className="text-yellow-500" />;
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">در حال بارگذاری داشبورد...</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-500">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <FaShoppingCart className="h-8 w-8 text-blue-600" />
            </div>
            <div className="mr-4">
              <p className="text-sm font-medium text-gray-600">کل سفارشات</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.totalOrders}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-green-500">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <FaDollarSign className="h-8 w-8 text-green-600" />
            </div>
            <div className="mr-4">
              <p className="text-sm font-medium text-gray-600">درآمد کل</p>
              <p className="text-2xl font-semibold text-gray-900">{formatPrice(stats.totalRevenue)}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-purple-500">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <FaBoxOpen className="h-8 w-8 text-purple-600" />
            </div>
            <div className="mr-4">
              <p className="text-sm font-medium text-gray-600">محصولات</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.totalProducts}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-yellow-500">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <FaUsers className="h-8 w-8 text-yellow-600" />
            </div>
            <div className="mr-4">
              <p className="text-sm font-medium text-gray-600">کاربران فعال</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.activeUsers}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow mb-8">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">دسترسی سریع</h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link href="/admin/products" className="group">
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-6 text-white text-center hover:from-blue-600 hover:to-blue-700 transition-all duration-200 transform hover:scale-105">
                <FaBoxOpen className="h-8 w-8 mx-auto mb-3" />
                <h3 className="font-medium">مدیریت محصولات</h3>
              </div>
            </Link>

            <Link href="/admin/orders" className="group">
              <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg p-6 text-white text-center hover:from-green-600 hover:to-green-700 transition-all duration-200 transform hover:scale-105">
                <FaClipboardList className="h-8 w-8 mx-auto mb-3" />
                <h3 className="font-medium">مدیریت سفارشات</h3>
              </div>
            </Link>

            <Link href="/admin/users" className="group">
              <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg p-6 text-white text-center hover:from-purple-600 hover:to-purple-700 transition-all duration-200 transform hover:scale-105">
                <FaUsers className="h-8 w-8 mx-auto mb-3" />
                <h3 className="font-medium">مدیریت کاربران</h3>
              </div>
            </Link>

            <Link href="/admin/settings" className="group">
              <div className="bg-gradient-to-r from-gray-500 to-gray-600 rounded-lg p-6 text-white text-center hover:from-gray-600 hover:to-gray-700 transition-all duration-200 transform hover:scale-105">
                <FaCog className="h-8 w-8 mx-auto mb-3" />
                <h3 className="font-medium">تنظیمات</h3>
              </div>
            </Link>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Sales Chart */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900 flex items-center">
              <FaChartLine className="h-5 w-5 text-blue-600 mr-2" />
              نمودار فروش ماهانه
            </h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {stats.monthlySales.map((item, index) => (
                <div key={index} className="flex items-center">
                  <div className="w-20 text-sm text-gray-600">{item.month}</div>
                  <div className="flex-1 mr-4">
                    <div className="bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                        style={{ 
                          width: `${(item.sales / Math.max(...stats.monthlySales.map(s => s.sales))) * 100}%` 
                        }}
                      ></div>
                    </div>
                  </div>
                  <div className="w-24 text-sm font-medium text-gray-900 text-left">
                    {formatPrice(item.sales)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Orders */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900 flex items-center">
              <FaClipboardList className="h-5 w-5 text-green-600 mr-2" />
              سفارشات اخیر
            </h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {stats.recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    {getStatusIcon(order.status)}
                    <div className="mr-4">
                      <p className="font-medium text-gray-900">{order.customer}</p>
                      <p className="text-sm text-gray-600">{order.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900">{formatPrice(order.amount)}</p>
                    <p className={`text-sm ${getStatusColor(order.status)}`}>
                      {order.status === 'complete' ? 'تکمیل شده' : 'در حال پردازش'}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 text-center">
              <Link 
                href="/admin/orders"
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                مشاهده همه سفارشات →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
} 