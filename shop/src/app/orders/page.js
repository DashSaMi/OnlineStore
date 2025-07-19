'use client';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { formatPrice } from '@/lib/format';
import Link from 'next/link';
import { FaClipboardList, FaMagic, FaStar, FaCrown, FaBoxOpen, FaCheckCircle, FaClock, FaEye } from 'react-icons/fa';

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { data: session } = useSession();
  const router = useRouter();

  const getStatusLabel = (status) => {
    return status === 'complete' ? 'تکمیل شده' : 'در حال پردازش';
  };

  const getStatusIcon = (status) => {
    return status === 'complete' ? <FaCheckCircle className="text-green-400" /> : <FaClock className="text-yellow-400" />;
  };

  useEffect(() => {
    if (!session) {
      router.push('/login');
      return;
    }

    const fetchOrders = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch('/api/orders');
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        
        if (!data.success) {
          throw new Error(data.message || 'Failed to fetch orders');
        }

        setOrders(data.orders);
      } catch (err) {
        console.error('Fetch error:', err);
        setError(err.message);
        toast.error(err.message || 'خطا در دریافت سفارشات');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [session, router]);

  if (loading) {
    return (
      <div className="min-h-screen relative py-16 px-4">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/5 via-transparent to-cyan-900/5"></div>
        <div className="container mx-auto text-center relative z-10">
          <div className="magical-spinner mx-auto mb-4"></div>
          <p className="text-gray-300 text-lg">در حال دریافت لیست سفارشات جادویی...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen relative py-16 px-4">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/5 via-transparent to-cyan-900/5"></div>
        <div className="container mx-auto text-center relative z-10">
          <div className="glass rounded-3xl p-12 max-w-lg mx-auto">
            <FaMagic className="text-red-400 text-6xl mx-auto mb-6 animate-pulse" />
            <h1 className="text-3xl font-bold text-white mb-6">
              خطا در دریافت سفارشات
            </h1>
            <p className="text-red-400 text-lg mb-8">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="bg-gradient-to-r from-purple-600 to-cyan-600 text-white px-8 py-3 rounded-full font-bold transition-all duration-300 transform hover:scale-105"
            >
              تلاش مجدد
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative py-16 px-4">
      {/* Magical background overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/5 via-transparent to-cyan-900/5"></div>
      
      <div className="container mx-auto relative z-10">
        {/* Header with magical styling */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <FaClipboardList className="text-purple-400 text-3xl animate-pulse" />
            <h1 className="text-4xl md:text-5xl font-bold text-white">
              سفارشات جادویی من
            </h1>
            <FaClipboardList className="text-cyan-400 text-3xl animate-pulse" />
          </div>
          <p className="text-xl text-gray-300 mb-6">تاریخچه کامل سفارشات شما</p>
          
          {/* Magical divider */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="w-16 h-1 bg-gradient-to-r from-transparent to-purple-500 rounded-full"></div>
            <FaStar className="text-purple-400 text-xl animate-pulse" />
            <div className="w-16 h-1 bg-gradient-to-l from-transparent to-cyan-500 rounded-full"></div>
          </div>
        </div>
        
        {orders.length === 0 ? (
          <div className="text-center py-16">
            <div className="glass rounded-3xl p-12 max-w-lg mx-auto">
              <FaBoxOpen className="text-purple-400 text-6xl mx-auto mb-6 animate-pulse" />
              <h2 className="text-2xl font-bold text-gray-200 mb-4">هنوز سفارشی ثبت نکرده‌اید</h2>
              <p className="text-gray-400 mb-8">محصولات جادویی منتظر شما هستند!</p>
              <Link 
                href="/products" 
                className="inline-block bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white px-8 py-3 rounded-full font-bold transition-all duration-300 transform hover:scale-105"
              >
                مشاهده محصولات
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order, index) => (
              <div 
                key={order._id} 
                className="glass rounded-2xl p-6 magical-card"
                style={{animationDelay: `${index * 0.1}s`}}
              >
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-xl font-bold text-gray-100 mb-2 flex items-center gap-2">
                      <FaCrown className="text-yellow-400" />
                      سفارش #{order._id.substring(0, 8)}
                    </h2>
                    <p className="text-gray-400 text-sm">
                      {new Date(order.createdAt).toLocaleDateString('fa-IR')}
                    </p>
                  </div>
                  <div className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold ${
                    order.status === 'complete' 
                      ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white' 
                      : 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white'
                  }`}>
                    {getStatusIcon(order.status)}
                    <span>{getStatusLabel(order.status)}</span>
                  </div>
                </div>
                
                <div className="border-t border-white/20 pt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">تعداد کالاها:</span>
                      <span className="text-purple-400 font-bold">
                        {order.items.reduce((sum, item) => sum + item.quantity, 0)} عدد
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">مبلغ قابل پرداخت:</span>
                      <span className="text-2xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                        {formatPrice(order.totalPrice)}
                      </span>
                    </div>
                  </div>
                  
                  <Link 
                    href={`/orders/${order._id}`}
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white px-6 py-3 rounded-xl font-bold transition-all duration-300 transform hover:scale-105"
                  >
                    <FaEye className="text-lg" />
                    <span>مشاهده جزئیات سفارش</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Bottom magical section */}
        {orders.length > 0 && (
          <div className="mt-16 text-center">
            <div className="glass rounded-3xl p-8 max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold text-gray-200 mb-6 flex items-center justify-center gap-3">
                <FaStar className="text-purple-400" />
                آمار سفارشات شما
                <FaStar className="text-cyan-400" />
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-400 mb-2">{orders.length}</div>
                  <div className="text-gray-400">کل سفارشات</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-cyan-400 mb-2">
                    {orders.filter(o => o.status === 'complete').length}
                  </div>
                  <div className="text-gray-400">تکمیل شده</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-400 mb-2">
                    {orders.filter(o => o.status !== 'complete').length}
                  </div>
                  <div className="text-gray-400">در حال پردازش</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}