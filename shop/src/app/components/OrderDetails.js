//app/components/OrderDetails.js
'use client'
import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import { formatPrice } from '@/lib/format'

export default function OrderDetails({ orderId }) {
  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(true)
  const { data: session } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (!session) {
      router.push('/login')
      return
    }

    const fetchOrder = async () => {
      try {
        const response = await fetch(`/api/orders/${orderId}`)
        const data = await response.json()

        if (data.success) {
          setOrder(data.order)
        } else {
          toast.error(data.message)
          router.push('/')
        }
      } catch (error) {
        console.error('Error fetching order:', error)
        toast.error('خطا در دریافت اطلاعات سفارش')
        router.push('/')
      } finally {
        setLoading(false)
      }
    }

    fetchOrder()
  }, [orderId, session, router])

  if (loading) {
    return <div className="text-center py-8">در حال دریافت اطلاعات سفارش...</div>
  }

  if (!order) {
    return <div className="text-center py-8">سفارش یافت نشد</div>
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">سفارش #{order._id}</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">وضعیت سفارش</h2>
        <div className="flex items-center gap-2">
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
            order.status === 'completed' ? 'bg-green-100 text-green-800' :
            order.status === 'cancelled' ? 'bg-red-100 text-red-800' :
            'bg-yellow-100 text-yellow-800'
          }`}>
            {order.status === 'completed' ? 'تکمیل شده' :
             order.status === 'cancelled' ? 'لغو شده' : 'در حال پردازش'}
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
    </div>
  )
}