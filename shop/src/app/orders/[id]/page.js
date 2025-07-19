'use client';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter, useParams } from 'next/navigation';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { formatPrice } from '@/lib/format';
import Link from 'next/link';
import { 
  FaArrowRight,
  FaCheckCircle,
  FaClock,
  FaUser,
  FaCalendarAlt,
  FaShoppingCart,
  FaDollarSign,
  FaBoxOpen,
  FaClipboardList,
  FaTimes
} from 'react-icons/fa';

export default function OrderPage() {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { data: session } = useSession();
  const router = useRouter();
  const { id } = useParams();

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
      ? <FaCheckCircle className="h-5 w-5 text-green-600" />
      : <FaClock className="h-5 w-5 text-yellow-600" />;
  };

  useEffect(() => {
    if (!session) {
      router.push('/login');
      return;
    }

    const fetchOrder = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(`/api/orders/${id}`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        
        if (!data.success) {
          throw new Error(data.message || 'Failed to fetch order');
        }

        setOrder(data.order);
      } catch (err) {
        console.error('Fetch error:', err);
        setError(err.message);
        toast.error(err.message || 'خطا در دریافت سفارش');
        router.push('/orders');
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id, session, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">در حال دریافت اطلاعات سفارش...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md mx-auto text-center">
          <FaTimes className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-900 mb-2">خطا در دریافت سفارش</h2>
          <p className="text-red-600 mb-6">{error}</p>
          <Link 
            href="/orders" 
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors"
          >
            <FaArrowRight className="h-4 w-4" />
            بازگشت به لیست سفارشات
          </Link>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md mx-auto text-center">
          <FaClipboardList className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-900 mb-2">سفارش یافت نشد</h2>
          <p className="text-gray-600 mb-6">سفارش مورد نظر وجود ندارد یا حذف شده است.</p>
          <Link 
            href="/orders" 
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors"
          >
            <FaArrowRight className="h-4 w-4" />
            بازگشت به لیست سفارشات
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                <FaClipboardList className="h-8 w-8 text-blue-600" />
                سفارش #{order._id.substring(0, 8)}
              </h1>
              <p className="text-gray-600 mt-2">جزئیات کامل سفارش مشتری</p>
            </div>
            <Link 
              href="/orders" 
              className="inline-flex items-center gap-2 bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg transition-colors"
            >
              <FaArrowRight className="h-4 w-4" />
              بازگشت به لیست
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order Status */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                  <FaCheckCircle className="h-5 w-5 text-blue-600" />
                  وضعیت سفارش
                </h2>
                <div className={`flex items-center gap-2 px-4 py-2 rounded-full border ${getStatusColor(order.status)}`}>
                  {getStatusIcon(order.status)}
                  <span className="font-medium">{getStatusLabel(order.status)}</span>
                </div>
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <FaCalendarAlt className="h-4 w-4" />
                  <span>تاریخ سفارش: {new Date(order.createdAt).toLocaleDateString('fa-IR')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaUser className="h-4 w-4" />
                  <span>مشتری: {session?.user?.name || 'کاربر'}</span>
                </div>
              </div>
            </div>

            {/* Products */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                <FaBoxOpen className="h-5 w-5 text-green-600" />
                محصولات سفارش
              </h2>
              <div className="space-y-4">
                {order.items.map((item, index) => (
                  <div key={index} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                    <div className="w-16 h-16 bg-white rounded-lg overflow-hidden border border-gray-200 flex items-center justify-center">
                      {item.imageUrl ? (
                        <img 
                          src={item.imageUrl} 
                          alt={item.name}
                          className="w-full h-full object-contain"
                        />
                      ) : (
                        <FaBoxOpen className="h-6 w-6 text-gray-400" />
                      )}
                    </div>
                    <div className="flex-grow">
                      <h3 className="font-medium text-gray-900">{item.name}</h3>
                      <div className="flex items-center gap-4 mt-1 text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          <FaDollarSign className="h-3 w-3" />
                          قیمت واحد: {formatPrice(item.price)}
                        </span>
                        <span className="flex items-center gap-1">
                          <FaShoppingCart className="h-3 w-3" />
                          تعداد: {item.quantity}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-gray-900">
                        {formatPrice(item.price * item.quantity)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Order Summary */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                <FaDollarSign className="h-5 w-5 text-purple-600" />
                خلاصه سفارش
              </h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">تعداد کالاها:</span>
                  <span className="font-medium text-gray-900">
                    {order.items.reduce((sum, item) => sum + item.quantity, 0)} عدد
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">تعداد محصولات:</span>
                  <span className="font-medium text-gray-900">
                    {order.items.length} نوع
                  </span>
                </div>
                <div className="flex justify-between items-center py-4 border-t border-gray-200">
                  <span className="text-lg font-semibold text-gray-900">مبلغ قابل پرداخت:</span>
                  <span className="text-2xl font-bold text-green-600">
                    {formatPrice(order.totalPrice)}
                  </span>
                </div>
              </div>
            </div>

       

            {/* Order Timeline */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">تاریخچه سفارش</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full mt-2"></div>
                  <div>
                    <p className="font-medium text-gray-900">سفارش ثبت شد</p>
                    <p className="text-sm text-gray-600">{new Date(order.createdAt).toLocaleDateString('fa-IR')}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-3 h-3 bg-blue-500 rounded-full mt-2"></div>
                  <div>
                    <p className="font-medium text-gray-900">در حال پردازش</p>
                    <p className="text-sm text-gray-600">در حال بررسی سفارش</p>
                  </div>
                </div>
                {order.status === 'complete' && (
                  <div className="flex items-start gap-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full mt-2"></div>
                    <div>
                      <p className="font-medium text-gray-900">تکمیل شد</p>
                      <p className="text-sm text-gray-600">سفارش با موفقیت تکمیل شد</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}