'use client';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter, useParams } from 'next/navigation';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { formatPrice } from '@/lib/format';
import Link from 'next/link';

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
      <div className="container mx-auto px-4 py-8 text-center">
        <p>در حال دریافت اطلاعات سفارش...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p className="text-red-600">{error}</p>
        <Link 
          href="/orders" 
          className="mt-4 inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          بازگشت به لیست سفارشات
        </Link>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p>سفارش یافت نشد</p>
        <Link 
          href="/orders" 
          className="mt-4 inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          بازگشت به لیست سفارشات
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">سفارش #{order._id.substring(0, 8)}</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">وضعیت سفارش</h2>
        <div className="flex items-center gap-2">
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
            order.status === 'complete' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
          }`}>
            {getStatusLabel(order.status)}
          </span>
          <span className="text-gray-500 text-sm">
            {new Date(order.createdAt).toLocaleDateString('fa-IR')}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">محصولات</h2>
            <div className="divide-y">
              {order.items.map((item) => (
                <div key={item.productId} className="py-4 flex gap-4">
                  <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden">
                    <img 
                      src={item.imageUrl} 
                      alt={item.name}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="flex-grow">
                    <h3 className="font-medium">{item.name}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-gray-800 font-medium">
                        {formatPrice(item.price)}
                      </span>
                      <span className="text-gray-500 text-sm">
                        × {item.quantity}
                      </span>
                    </div>
                  </div>
                  <div className="font-medium">
                    {formatPrice(item.price * item.quantity)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 h-fit">
          <h2 className="text-xl font-semibold mb-4">خلاصه سفارش</h2>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span>تعداد کالاها:</span>
              <span>{order.items.reduce((sum, item) => sum + item.quantity, 0)}</span>
            </div>
            <div className="flex justify-between font-medium text-lg pt-3 border-t">
              <span>مبلغ قابل پرداخت:</span>
              <span className="text-red-600">{formatPrice(order.totalPrice)}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <Link 
          href="/orders" 
          className="inline-block bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-2 rounded-lg transition-colors"
        >
          بازگشت به لیست سفارشات
        </Link>
      </div>
    </div>
  );
}