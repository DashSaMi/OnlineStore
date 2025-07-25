//app/api/admin/orders/route.js 
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET(request) {
  try {
    const mainAppUrl = new URL(`${process.env.NEXTAUTH_URL}/api/orders`);
    const { searchParams } = new URL(request.url)
    
    searchParams.forEach((value, key) => {
      mainAppUrl.searchParams.append(key, value)
    })

    const response = await fetch(mainAppUrl, {
      headers: {
        'Authorization': `Bearer ${process.env.ADMIN_SECRET}`,
        'Content-Type': 'application/json'
      },
      cache: 'no-store'
    })

    if (!response.ok) {
      const error = await response.text()
      throw new Error(`Main app responded with ${response.status}: ${error}`)
    }

    const data = await response.json()
    
    // Standardize the response format
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