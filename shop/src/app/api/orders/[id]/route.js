//app/api/orders/[id]/route.js
import { getDatabase } from '@/lib/mongodb';
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { ObjectId } from 'mongodb';

export async function GET(request, { params }) {
  try {
    const { id } = params;

    // Verify session
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, message: 'Authentication required' },
        { status: 401 }
      );
    }

    // Validate ObjectId format
    if (!ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, message: 'Invalid order ID format' },
        { status: 400 }
      );
    }

    const { db } = await getDatabase();

    // Find order (make sure to match both ID and user ID)
    const order = await db.collection('orders').findOne({
      _id: new ObjectId(id),
      userId: new ObjectId(session.user.id)
    });

    if (!order) {
      return NextResponse.json(
        { success: false, message: 'Order not found' },
        { status: 404 }
      );
    }

    // Prepare response data
    const responseData = {
      success: true,
      order: {
        ...order,
        _id: order._id.toString(),
        userId: order.userId.toString(),
        items: order.items.map(item => ({
          ...item,
          productId: item.productId?.toString() || null
        }))
      }
    };

    return NextResponse.json(responseData, { status: 200 });

  } catch (error) {
    console.error('Order fetch error:', error);
    return NextResponse.json(
      { success: false, message: 'Server error', error: error.message },
      { status: 500 }
    );
  }
}