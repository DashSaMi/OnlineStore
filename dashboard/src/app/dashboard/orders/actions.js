'use server';

import { getDatabase } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export async function fetchAdminOrderById(id) {
  try {
    const { db } = await getDatabase();
    if (!db) throw new Error('Could not connect to database');

    // Find order by _id
    const order = await db.collection('orders').findOne({ _id: new ObjectId(id) });
    if (!order) throw new Error('Order not found');

    // Prepare default user info for guest orders
    let userInfo = {
      customerName: 'Guest Customer',
      customerEmail: 'No email provided',
      customerImage: null,
    };

    if (order.userId) {
      // Find user by userId from order
      const user = await db.collection('users').findOne({ _id: new ObjectId(order.userId) });
      if (user) {
        userInfo = {
          customerName: `${user.firstName || ''} ${user.lastName || ''}`.trim() || 'Registered Customer',
          customerEmail: user.email || 'No email provided',
          customerImage: user.image || null,
        };
      }
    }

    return JSON.parse(
      JSON.stringify({
        ...order,
        _id: order._id.toString(),
        userId: order.userId?.toString(),
        ...userInfo,
        items:
          order.items?.map((item) => ({
            ...item,
            productId: item.productId?.toString(),
          })) || [],
      })
    );
  } catch (error) {
    console.error('[fetchAdminOrderById] Error:', error);
    throw new Error(error.message || 'Failed to fetch order');
  }
}
