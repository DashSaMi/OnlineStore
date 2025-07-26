//app/api/orders/[id]/route.js
import { getDatabase } from '@/lib/mongodb';
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { ObjectId } from 'mongodb';

const transformOrder = (order) => ({
  ...order,
  _id: order._id.toString(),
  userId: order.userId.toString(),
  items: order.items.map((item) => ({
    ...item,
    productId: item.productId?.toString() || null,
  })),
  createdAt: order.createdAt.toISOString(),
  updatedAt: order.updatedAt?.toISOString() || null,
});

const isAdminRequest = (headers) => {
  const authHeader = headers.get('authorization');
  return (
    authHeader?.startsWith('Bearer ') &&
    authHeader.split(' ')[1] === 'saman121213xpCrocode'
  );
};

export async function GET(req, context) {
  try {
    const { db } = await getDatabase();
    const id = context?.params?.id;

    if (!id || !ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, message: 'Invalid or missing order ID' },
        { status: 400 }
      );
    }

    const isAdmin = isAdminRequest(req.headers);

    if (!isAdmin) {
      const session = await getServerSession(authOptions);
      if (!session?.user?.id) {
        return NextResponse.json(
          { success: false, message: 'Authentication required' },
          { status: 401 }
        );
      }

      // Fetch order for the authenticated user
      const order = await db.collection('orders').findOne({
        _id: new ObjectId(id),
        userId: new ObjectId(session.user.id),
      });

      if (!order) {
        return NextResponse.json(
          { success: false, message: 'Order not found' },
          { status: 404 }
        );
      }

      return NextResponse.json({ success: true, order: transformOrder(order) });
    } else {
      // Admin can fetch any order
      const order = await db.collection('orders').findOne({
        _id: new ObjectId(id),
      });

      if (!order) {
        return NextResponse.json(
          { success: false, message: 'Order not found' },
          { status: 404 }
        );
      }

      return NextResponse.json({ success: true, order: transformOrder(order) });
    }
  } catch (error) {
    console.error('Single order fetch error:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to fetch order',
        error: process.env.NODE_ENV === 'development' ? error.message : null,
      },
      { status: 500 }
    );
  }
}
