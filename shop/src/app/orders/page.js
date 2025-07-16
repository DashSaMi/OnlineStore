'use client';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { formatPrice } from '@/lib/format';
import Link from 'next/link';

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!session) {
      router.push('/login');
      return;
    }

    const fetchOrders = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch('/api/orders', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        
        if (!data.success) {
          throw new Error(data.message || 'Failed to fetch orders');
        }

        setOrders(data.orders);  // <-- stays the same here (matches API)

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
      <div className="container mx-auto px-4 py-8 text-center">
        <p>در حال دریافت لیست سفارشات...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p className="text-red-600">{error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
        >
          تلاش مجدد
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">سفارشات من</h1>
      
      {orders.length === 0 ? (
        <div className="text-center py-8">
          <p>هنوز سفارشی ثبت نکرده‌اید</p>
          <Link 
            href="/products" 
            className="mt-4 inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            مشاهده محصولات
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map(order => (
            <div key={order._id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-lg font-semibold">
                    سفارش #{order._id.substring(0, 8)}
                  </h2>
                  <p className="text-gray-500 text-sm mt-1">
                    {new Date(order.createdAt).toLocaleDateString('fa-IR')}
                  </p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  order.status === 'completed' ? 'bg-green-100 text-green-800' :
                  order.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {order.status === 'completed' ? 'تکمیل شده' :
                   order.status === 'cancelled' ? 'لغو شده' : 'در حال پردازش'}
                </span>
              </div>
              
              <div className="border-t pt-4">
                <div className="flex justify-between mb-2">
                  <span>تعداد کالاها:</span>
                  <span>{order.items.reduce((sum, item) => sum + item.quantity, 0)}</span>
                </div>
                <div className="flex justify-between font-medium">
                  <span>مبلغ قابل پرداخت:</span>
                  <span className="text-red-600">{formatPrice(order.totalPrice)}</span>
                </div>
              </div>
              
              <Link 
                href={`/orders/${order._id}`}
                className="mt-4 inline-block text-blue-600 hover:text-blue-800"
              >
                مشاهده جزئیات سفارش →
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
