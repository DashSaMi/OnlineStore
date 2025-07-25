// app/api/admin/orders/route.js
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET(request) {
  try {
    // Use direct URL or fallback to environment variable
    const baseUrl = 'https://onlineshop-rose-six.vercel.app' || process.env.NEXTAUTH_URL;
    const mainAppUrl = new URL(`${baseUrl}/api/orders`);
    
    // Copy query parameters
    const { searchParams } = new URL(request.url)
    searchParams.forEach((value, key) => {
      mainAppUrl.searchParams.append(key, value)
    })

    console.log('Fetching from:', mainAppUrl.toString()); // Debug log

    const response = await fetch(mainAppUrl, {
      headers: {
        'Authorization': `Bearer ${process.env.ADMIN_SECRET || 'your_fallback_secret'}`,
        'Content-Type': 'application/json'
      },
      cache: 'no-store'
    })

    if (!response.ok) {
      const error = await response.text()
      throw new Error(`Main app responded with ${response.status}: ${error}`)
    }

    const data = await response.json()
    
    return NextResponse.json({
      success: true,
      data: data.orders || data.data || [],
      message: 'Orders fetched successfully'
    })

  } catch (error) {
    console.error('[Admin Orders Proxy] Error:', error)
    return NextResponse.json(
      { 
        success: false, 
        message: 'Failed to fetch admin orders',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      },
      { status: 500 }
    )
  }
}