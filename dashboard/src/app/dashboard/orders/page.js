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
        const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
        const res = await fetch(`${API_BASE_URL}/api/admin/orders`, {
          headers: {
             'Authorization': 'Bearer saman121213xpCrocode'
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

  if (loading) return <div className="p-8 text-lg text-gray-600">Loading orders...</div>;
  if (error) return <div className="p-8 text-red-600 bg-red-50 rounded">Error: {error}</div>;

  return (
    <div className="py-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-900">All Orders</h1>
      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Order ID</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Total (Toman)</th>
              <th className="px-6 py-3"></th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {orders.map(order => (
              <tr key={order._id} className="hover:bg-gray-50 transition">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order._id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{order.status}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{order.totalPrice?.toLocaleString() ?? order.total?.toLocaleString()}</td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <Link
                    href={`/dashboard/orders/${order._id}`}
                    className="text-blue-600 hover:underline font-medium text-sm"
                  >
                    View Details
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}