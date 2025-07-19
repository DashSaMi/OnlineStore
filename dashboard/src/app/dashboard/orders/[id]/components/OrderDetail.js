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
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Order Information */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Order Information</h2>
          <div className="space-y-2">
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
                className="mt-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
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
          <h2 className="text-lg font-semibold mb-4">Customer Information</h2>
          <div className="flex items-start gap-4">
            {order.customerImage && (
              <div className="relative w-12 h-12 rounded-full overflow-hidden">
                <SafeImage
                  src={order.customerImage}
                  alt="Customer"
                  width={48}
                  height={48}
                  className="object-cover"
                />
              </div>
            )}
            <div>
              <p className="font-medium">{order.customerName || 'Guest Customer'}</p>
              <p className="text-gray-600">{order.customerEmail || 'No email provided'}</p>
              <p className="text-sm text-gray-500 mt-1">User ID: {order.userId || 'N/A'}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Order Summary */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
        <div className="bg-gray-50 p-4 rounded">
          <p className="text-xl font-bold">Total: {formatPrice(order.totalPrice)} Toman</p>
        </div>
      </div>

      {/* Order Items */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Order Items ({order.items.length})</h2>
        <div className="space-y-4">
          {order.items.map((item, index) => (
            <div key={index} className="flex items-start border-b pb-4">
              {item.imageUrl && (
                <div className="relative w-20 h-20 mr-4 min-w-[80px]">
                  <SafeImage
                    src={item.imageUrl}
                    alt={item.name}
                    width={80}
                    height={80}
                    className="object-contain"
                  />
                </div>
              )}
              <div className="flex-1">
                <h3 className="font-medium">{item.name}</h3>
                <div className="grid grid-cols-2 mt-2 text-sm">
                  <div>
                    <p>Quantity: {item.quantity}</p>
                    <p>Price: {formatPrice(item.price)} Toman</p>
                  </div>
                  <div className="text-right">
                    {item.discount > 0 && <p className="text-green-600">Discount: {item.discount}%</p>}
                    <p>Original: {formatPrice(item.originalPrice)} Toman</p>
                    <p className="font-medium mt-1">
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
