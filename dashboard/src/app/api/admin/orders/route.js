// app/api/admin/orders/route.js (Port 3001)
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET(request) {
  try {
    const mainAppUrl = new URL('http://localhost:3000/api/orders')
    const { searchParams } = new URL(request.url)
    
    // Forward all query parameters
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
    return NextResponse.json(data)

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

export async function OPTIONS() {
  return new Response(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  })
}