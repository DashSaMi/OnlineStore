'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch('http://localhost:3001/api/admin/orders', {
          headers: {
            'Authorization': `Bearer ${process.env.NEXT_PUBLIC_ADMIN_SECRET}`
          }
        });
        const data = await res.json();
        if (data.success) {
          setOrders(data.data || data.orders); // Handle both response formats
        } else {
          setError(data.message || 'Failed to fetch orders');
        }
      } catch (err) {
        console.error('Failed to fetch orders:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <div className="p-4">Loading orders...</div>;
  if (error) return <div className="p-4 text-red-600">Error: {error}</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">All Orders</h1>
      <ul className="space-y-4">
        {orders.map(order => (
          <li key={order._id} className="border p-4 rounded-md">
            <p><strong>Order ID:</strong> {order._id}</p>
            <p><strong>Status:</strong> {order.status}</p>
            <p><strong>Total:</strong> {order.totalPrice?.toLocaleString() ?? order.total?.toLocaleString()} Toman</p>
            <Link
              href={`/dashboard/orders/${order._id}`}
              className="text-blue-600 hover:underline mt-2 inline-block"
            >
              View Details
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}