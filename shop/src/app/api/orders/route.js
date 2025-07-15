//app/api/orders/route.js
import { getDatabase } from '@/lib/mongodb'
import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { ObjectId } from 'mongodb'

export async function GET(req) {
  try {
    // Verify authentication
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, message: 'لطفا ابتدا وارد حساب کاربری خود شوید' },
        { status: 401 }
      )
    }

    // Get database connection
    const { db } = await getDatabase()
    
    // Find orders for this user
    const orders = await db.collection('orders')
      .find({ userId: new ObjectId(session.user.id) })
      .sort({ createdAt: -1 })
      .toArray()

    return NextResponse.json(
      { 
        success: true,
        orders: orders.map(order => ({
          ...order,
          _id: order._id.toString(),
          userId: order.userId.toString(),
          items: order.items.map(item => ({
            ...item,
            productId: item.productId?.toString() || null
          }))
        }))
      },
      { status: 200 }
    )

  } catch (error) {
    console.error('Error fetching orders:', error)
    return NextResponse.json(
      { 
        success: false,
        message: 'خطا در دریافت سفارشات',
        error: error.message 
      },
      { status: 500 }
    )
  }
}

export async function POST(req) {
  try {
    // Verify authentication
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, message: 'لطفا ابتدا وارد حساب کاربری خود شوید' },
        { status: 401 }
      )
    }

    // Get database connection
    const { db } = await getDatabase()
    
    // Parse request data
    const { items, totalPrice } = await req.json()
    
    // Validate request data
    if (!items || !Array.isArray(items)) {
      return NextResponse.json(
        { success: false, message: 'داده‌های سبد خرید نامعتبر است' },
        { status: 400 }
      )
    }

    if (items.length === 0) {
      return NextResponse.json(
        { success: false, message: 'سبد خرید شما خالی است' },
        { status: 400 }
      )
    }

    // Create order document
    const orderDoc = {
      userId: new ObjectId(session.user.id),
      items: items.map(item => ({
        productId: new ObjectId(item._id),
        name: item.name,
        imageUrl: item.imageUrl || '/placeholder-product.jpg',
        quantity: item.quantity,
        price: item.price,
        originalPrice: item.originalPrice || item.price,
        discount: item.discount || 0
      })),
      totalPrice,
      status: 'completed',
      createdAt: new Date(),
      updatedAt: new Date()
    }

    // Insert order into database
    const result = await db.collection('orders').insertOne(orderDoc)

    return NextResponse.json(
      { 
        success: true,
        message: 'سفارش با موفقیت ثبت شد',
        orderId: result.insertedId.toString()
      },
      { status: 201 }
    )

  } catch (error) {
    console.error('Order submission error:', error)
    return NextResponse.json(
      { 
        success: false,
        message: 'خطا در ثبت سفارش',
        error: error.message 
      },
      { status: 500 }
    )
  }
}

export async function OPTIONS() {
  return new Response(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  })
}