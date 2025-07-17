'use server';

import { getDatabase } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

function isValidObjectId(id) {
  if (!id) return false;
  try {
    return ObjectId.isValid(id) && String(new ObjectId(id)) === id;
  } catch {
    return false;
  }
}

export async function fetchAdminOrderById(id) {
  try {
    const { db } = await getDatabase();
    if (!db) throw new Error('Could not connect to database');

    // Find order by _id
    const order = await db.collection('orders').findOne({ _id: new ObjectId(id) });
    if (!order) throw new Error('Order not found');

    // Default user info for guest
    let userInfo = {
      customerName: 'Guest Customer',
      customerEmail: 'No email provided',
      customerImage: null,
    };

    if (order.userId) {
      let user = null;

      if (isValidObjectId(order.userId)) {
        // Query users by ObjectId _id
        user = await db.collection('users').findOne({ _id: new ObjectId(order.userId) });
      } else {
        // Query users by string _id (if your _id is string)
        user = await db.collection('users').findOne({ _id: order.userId });
      }

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
