'use client';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import AdminLayout from '../../components/AdminLayout';
import { 
  FaClipboardList,
  FaSearch,
  FaFilter,
  FaSort,
  FaEye,
  FaCheckCircle,
  FaClock,
  FaTimes,
  FaUser,
  FaDollarSign,
  FaCalendarAlt
} from 'react-icons/fa';

export default function AdminOrders() {
  const { data: session } = useSession();
  const router = useRouter();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState('date');

  useEffect(() => {
    if (!session) {
      router.push('/login');
      return;
    }

    const fetchOrders = async () => {
      try {
        // Simulate API call
        const mockOrders = [
          {
            _id: '1',
            customerName: 'احمد محمدی',
            customerEmail: 'ahmad@example.com',
            totalAmount: 450000,
            status: 'complete',
            itemsCount: 3,
            createdAt: '2024-01-15T10:30:00Z',
            orderNumber: 'ORD-001'
          },
          {
            _id: '2',
            customerName: 'فاطمه احمدی',
            customerEmail: 'fateme@example.com',
            totalAmount: 320000,
            status: 'pending',
            itemsCount: 2,
            createdAt: '2024-01-14T15:45:00Z',
            orderNumber: 'ORD-002'
          },
          {
            _id: '3',
            customerName: 'علی رضایی',
            customerEmail: 'ali@example.com',
            totalAmount: 780000,
            status: 'complete',
            itemsCount: 5,
            createdAt: '2024-01-13T09:15:00Z',
            orderNumber: 'ORD-003'
          },
          {
            _id: '4',
            customerName: 'مریم کریمی',
            customerEmail: 'maryam@example.com',
            totalAmount: 210000,
            status: 'pending',
            itemsCount: 1,
            createdAt: '2024-01-12T14:20:00Z',
            orderNumber: 'ORD-004'
          },
          {
            _id: '5',
            customerName: 'حسین نوری',
            customerEmail: 'hossein@example.com',
            totalAmount: 950000,
            status: 'complete',
            itemsCount: 4,
            createdAt: '2024-01-11T11:00:00Z',
            orderNumber: 'ORD-005'
          }
        ];
        
        setOrders(mockOrders);
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [session, router]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('fa-IR', {
      style: 'currency',
      currency: 'IRR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('fa-IR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusLabel = (status) => {
    return status === 'complete' ? 'تکمیل شده' : 'در حال پردازش';
  };

  const getStatusColor = (status) => {
    return status === 'complete' 
      ? 'bg-green-100 text-green-800 border-green-200' 
      : 'bg-yellow-100 text-yellow-800 border-yellow-200';
  };

  const getStatusIcon = (status) => {
    return status === 'complete' 
      ? <FaCheckCircle className="h-4 w-4" />
      : <FaClock className="h-4 w-4" />;
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.customerEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || order.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const sortedOrders = [...filteredOrders].sort((a, b) => {
    switch (sortBy) {
      case 'date':
        return new Date(b.createdAt) - new Date(a.createdAt);
      case 'amount':
        return b.totalAmount - a.totalAmount;
      case 'customer':
        return a.customerName.localeCompare(b.customerName);
      case 'status':
        return a.status.localeCompare(b.status);
      default:
        return 0;
    }
  });

  const handleStatusChange = (orderId, newStatus) => {
    setOrders(orders.map(order => 
      order._id === orderId 
        ? { ...order, status: newStatus }
        : order
    ));
  };

  const stats = {
    total: orders.length,
    completed: orders.filter(o => o.status === 'complete').length,
    pending: orders.filter(o => o.status === 'pending').length,
    totalRevenue: orders.filter(o => o.status === 'complete').reduce((sum, o) => sum + o.totalAmount, 0)
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">در حال بارگذاری سفارشات...</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">مدیریت سفارشات</h1>
        <p className="text-gray-600">مشاهده و مدیریت سفارشات مشتریان</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-500">
          <div className="flex items-center">
            <FaClipboardList className="h-8 w-8 text-blue-600" />
            <div className="mr-4">
              <p className="text-sm font-medium text-gray-600">کل سفارشات</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.total}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-green-500">
          <div className="flex items-center">
            <FaCheckCircle className="h-8 w-8 text-green-600" />
            <div className="mr-4">
              <p className="text-sm font-medium text-gray-600">تکمیل شده</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.completed}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-yellow-500">
          <div className="flex items-center">
            <FaClock className="h-8 w-8 text-yellow-600" />
            <div className="mr-4">
              <p className="text-sm font-medium text-gray-600">در حال پردازش</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.pending}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-purple-500">
          <div className="flex items-center">
            <FaDollarSign className="h-8 w-8 text-purple-600" />
            <div className="mr-4">
              <p className="text-sm font-medium text-gray-600">درآمد کل</p>
              <p className="text-2xl font-semibold text-gray-900">{formatPrice(stats.totalRevenue)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search */}
          <div className="relative">
            <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="جستجو در سفارشات..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Filter */}
          <div className="relative">
            <FaFilter className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
            >
              <option value="all">همه سفارشات</option>
              <option value="complete">تکمیل شده</option>
              <option value="pending">در حال پردازش</option>
            </select>
          </div>

          {/* Sort */}
          <div className="relative">
            <FaSort className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
            >
              <option value="date">مرتب بر اساس تاریخ</option>
              <option value="amount">مرتب بر اساس مبلغ</option>
              <option value="customer">مرتب بر اساس مشتری</option>
              <option value="status">مرتب بر اساس وضعیت</option>
            </select>
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">
            سفارشات ({sortedOrders.length})
          </h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  شماره سفارش
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  مشتری
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  مبلغ
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  تعداد آیتم
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  تاریخ
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  وضعیت
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  عملیات
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sortedOrders.map((order) => (
                <tr key={order._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {order.orderNumber}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-8 w-8">
                        <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                          <FaUser className="h-4 w-4 text-gray-400" />
                        </div>
                      </div>
                      <div className="mr-3">
                        <div className="text-sm font-medium text-gray-900">
                          {order.customerName}
                        </div>
                        <div className="text-sm text-gray-500">
                          {order.customerEmail}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {formatPrice(order.totalAmount)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                      {order.itemsCount} آیتم
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex items-center">
                      <FaCalendarAlt className="h-4 w-4 text-gray-400 mr-2" />
                      {formatDate(order.createdAt)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <select
                      value={order.status}
                      onChange={(e) => handleStatusChange(order._id, e.target.value)}
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(order.status)}`}
                    >
                      <option value="pending">در حال پردازش</option>
                      <option value="complete">تکمیل شده</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button 
                      onClick={() => router.push(`/orders/${order._id}`)}
                      className="text-blue-600 hover:text-blue-900 p-1"
                    >
                      <FaEye className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {sortedOrders.length === 0 && (
          <div className="text-center py-12">
            <FaClipboardList className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">سفارشی یافت نشد</h3>
            <p className="text-gray-600">سفارشی با فیلترهای انتخاب شده وجود ندارد.</p>
          </div>
        )}
      </div>
    </AdminLayout>
  );
} 