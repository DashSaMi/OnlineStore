// app/dashboard/orders/[id]/actions.js
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

    const order = await db.collection('orders').findOne({ _id: new ObjectId(id) });
    if (!order) throw new Error('Order not found');

    let userInfo = {
      customerName: 'Guest Customer',
      customerEmail: 'No email provided',
      customerImage: null,
    };

    if (order.userId) {
      let user = null;

      if (isValidObjectId(order.userId)) {
        user = await db.collection('users').findOne({ _id: new ObjectId(order.userId) });
      } else {
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
        items: order.items?.map((item) => ({
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

export async function updateOrderStatus(id, status) {
  try {
    const { db } = await getDatabase();
    if (!db) throw new Error('Could not connect to database');

    const result = await db.collection('orders').updateOne(
      { _id: new ObjectId(id) },
      { $set: { status, updatedAt: new Date() } }
    );

    if (!result.modifiedCount) {
      throw new Error('Order status update failed');
    }

    return { success: true };
  } catch (error) {
    console.error('[updateOrderStatus] Error:', error);
    throw new Error(error.message || 'Failed to update status');
  }
}