import { getDatabase } from '@/lib/mongodb';
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { ObjectId } from 'mongodb';

const transformOrder = (order) => ({
  ...order,
  _id: order._id.toString(),
  userId: order.userId.toString(),
  items: order.items.map(item => ({
    ...item,
    productId: item.productId?.toString() || null,
  })),
  createdAt: order.createdAt.toISOString(),
  updatedAt: order.updatedAt?.toISOString() || null
});

const isAdminRequest = (headers) => {
  const authHeader = headers.get('authorization');
  return authHeader?.startsWith('Bearer ') && 
    authHeader.split(' ')[1] === process.env.ADMIN_SECRET;
};

export async function GET(req) {
  try {
    const { db } = await getDatabase();
    const { searchParams } = new URL(req.url);
    const isAdmin = isAdminRequest(req.headers);
    
    const filter = {};
    
    if (!isAdmin) {
      const session = await getServerSession(authOptions);
      if (!session?.user?.id) {
        return NextResponse.json(
          { success: false, message: 'Authentication required' },
          { status: 401 }
        );
      }
      filter.userId = new ObjectId(session.user.id);
    }

    // Enhanced filtering
    const status = searchParams.get('status');
    const dateFrom = searchParams.get('dateFrom');
    const dateTo = searchParams.get('dateTo');
    
    if (status) filter.status = { $in: status.split(',') };
    if (dateFrom || dateTo) {
      filter.createdAt = {};
      if (dateFrom) filter.createdAt.$gte = new Date(dateFrom);
      if (dateTo) filter.createdAt.$lte = new Date(dateTo);
    }

    const limit = Math.min(parseInt(searchParams.get('limit')) || 10, 100);
    const page = parseInt(searchParams.get('page')) || 1;

    const [orders, totalCount] = await Promise.all([
      db.collection('orders')
        .find(filter)
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .toArray(),
      db.collection('orders').countDocuments(filter)
    ]);

    return NextResponse.json({
      success: true,
      orders: orders.map(transformOrder),   // <-- Changed from `data` to `orders`
      pagination: {
        total: totalCount,
        page,
        limit,
        totalPages: Math.ceil(totalCount / limit),
        hasNextPage: (page * limit) < totalCount
      }
    });

  } catch (error) {
    console.error('Orders fetch error:', error);
    return NextResponse.json(
      { 
        success: false,
        message: 'Failed to fetch orders',
        error: process.env.NODE_ENV === 'development' ? error.message : null
      },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json(
      { success: false, message: 'Authentication required' },
      { status: 401 }
    );
  }

  try {
    const { client, db } = await getDatabase();
    const requestData = await req.json();

    if (!Array.isArray(requestData?.items) || requestData.items.length === 0) {
      return NextResponse.json(
        { success: false, message: 'Invalid order items' },
        { status: 400 }
      );
    }

    const calculatedTotal = requestData.items.reduce(
      (sum, item) => sum + (item.price * item.quantity),
      0
    );

    if (Math.abs(calculatedTotal - (requestData.totalPrice || 0)) > 0.01) {
      return NextResponse.json(
        { success: false, message: 'Total price mismatch' },
        { status: 400 }
      );
    }

    const orderDoc = {
      userId: new ObjectId(session.user.id),
      items: requestData.items.map(item => ({
        productId: new ObjectId(item._id),
        name: item.name,
        imageUrl: item.imageUrl || '/placeholder-product.jpg',
        quantity: item.quantity,
        price: item.price,
        originalPrice: item.originalPrice || item.price,
        discount: item.discount || 0
      })),
      totalPrice: calculatedTotal,
      status: 'pending',
      paymentMethod: requestData.paymentMethod || 'unknown',
      shippingAddress: requestData.shippingAddress || null,
      billingAddress: requestData.billingAddress || null,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const dbSession = client.startSession();

    try {
      let result;
      await dbSession.withTransaction(async () => {
        result = await db.collection('orders').insertOne(orderDoc, { session: dbSession });

        const bulkOps = requestData.items.map(item => ({
          updateOne: {
            filter: { _id: new ObjectId(item._id) },
            update: { $inc: { stock: -item.quantity } }
          }
        }));

        await db.collection('products').bulkWrite(bulkOps, { session: dbSession });
      });

      return NextResponse.json(
        { 
          success: true,
          message: 'Order created successfully',
          orderId: result.insertedId.toString()
        },
        { status: 201 }
      );

    } finally {
      await dbSession.endSession();
    }

  } catch (error) {
    console.error('Order creation error:', error);
    return NextResponse.json(
      { 
        success: false,
        message: 'Failed to create order',
        error: process.env.NODE_ENV === 'development' ? error.message : null
      },
      { status: 500 }
    );
  }
}

export async function OPTIONS() {
  return new Response(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}
