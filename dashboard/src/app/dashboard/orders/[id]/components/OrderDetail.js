// app/dashboard/orders/[id]/components/OrderDetail.js
'use client';

import SafeImage from './SafeImage';
import { useTransition } from 'react';
import { updateOrderStatus } from '../actions';

export default function OrderDetail({ order }) {
  const formatDate = (dateString) => new Date(dateString).toLocaleString();
  const formatPrice = (price) => price?.toLocaleString() || '0';
  const [isPending, startTransition] = useTransition();

  const handleStatusUpdate = () => {
    startTransition(async () => {
      await updateOrderStatus(order._id, 'complete');
      window.location.reload();
    });
  };

  return (
    <div className="bg-white p-8 rounded-xl shadow-md space-y-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-8">
        {/* Order Information */}
        <div>
          <h2 className="text-xl font-semibold mb-6 text-gray-800">Order Information</h2>
          <div className="space-y-3 text-gray-700">
            <p>
              <span className="font-medium">Order ID:</span> {order._id}
            </p>
            <p>
              <span className="font-medium">Status:</span>{' '}
              <span className="capitalize">{order.status}</span>
            </p>
            {order.status === 'pending' && (
              <button
                onClick={handleStatusUpdate}
                disabled={isPending}
                className="mt-2 px-5 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 transition"
              >
                {isPending ? 'Updating...' : 'Mark as Complete'}
              </button>
            )}
            <p>
              <span className="font-medium">Date:</span> {formatDate(order.createdAt)}
            </p>
            <p>
              <span className="font-medium">Last Updated:</span> {formatDate(order.updatedAt)}
            </p>
            <p>
              <span className="font-medium">Payment Method:</span> {order.paymentMethod}
            </p>
          </div>
        </div>

        {/* Customer Information */}
        <div>
          <h2 className="text-xl font-semibold mb-6 text-gray-800">Customer Information</h2>
          <div className="flex items-start gap-5">
            {order.customerImage && (
              <div className="relative w-14 h-14 rounded-full overflow-hidden border border-gray-200">
                <SafeImage
                  src={order.customerImage}
                  alt="Customer"
                  width={56}
                  height={56}
                  className="object-cover"
                />
              </div>
            )}
            <div>
              <p className="font-medium text-gray-900">{order.customerName || 'Guest Customer'}</p>
              <p className="text-gray-600">{order.customerEmail || 'No email provided'}</p>
              <p className="text-xs text-gray-500 mt-1">User ID: {order.userId || 'N/A'}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Order Summary */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-6 text-gray-800">Order Summary</h2>
        <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
          <p className="text-2xl font-bold text-green-700">Total: {formatPrice(order.totalPrice)} Toman</p>
        </div>
      </div>

      {/* Order Items */}
      <div>
        <h2 className="text-xl font-semibold mb-6 text-gray-800">Order Items <span className='text-gray-400 font-normal'>({order.items.length})</span></h2>
        <div className="space-y-6">
          {order.items.map((item, index) => (
            <div key={index} className="flex items-start border-b pb-6 last:border-b-0">
              {item.imageUrl && (
                <div className="relative w-24 h-24 mr-6 min-w-[96px] border border-gray-100 rounded-lg overflow-hidden">
                  <SafeImage
                    src={item.imageUrl}
                    alt={item.name}
                    width={96}
                    height={96}
                    className="object-contain"
                  />
                </div>
              )}
              <div className="flex-1">
                <h3 className="font-medium text-lg text-gray-900">{item.name}</h3>
                <div className="grid grid-cols-2 mt-2 text-sm gap-2">
                  <div>
                    <p>Quantity: <span className="font-medium">{item.quantity}</span></p>
                    <p>Price: <span className="font-medium">{formatPrice(item.price)}</span> Toman</p>
                  </div>
                  <div className="text-right">
                    {item.discount > 0 && <p className="text-green-600">Discount: {item.discount}%</p>}
                    <p>Original: <span className="line-through text-gray-400">{formatPrice(item.originalPrice)}</span> Toman</p>
                    <p className="font-medium mt-1 text-blue-700">
                      Subtotal: {formatPrice(item.price * item.quantity)} Toman
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
