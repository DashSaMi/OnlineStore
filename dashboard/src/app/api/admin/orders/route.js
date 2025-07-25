// app/api/admin/orders/route.js
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET(request) {
  try {
    // Use direct URL - ensure it's exactly correct
    const baseUrl = 'https://onlineshop-rose-six.vercel.app';
    const mainAppUrl = new URL(`${baseUrl}/api/orders`);
    
    // Verify URL construction
    if (!mainAppUrl.hostname.includes('onlineshop-rose-six')) {
      throw new Error('Invalid API URL configuration');
    }

    // Copy query parameters
    const { searchParams } = new URL(request.url);
    searchParams.forEach((value, key) => {
      mainAppUrl.searchParams.append(key, value);
    });

    console.log('Fetching orders from:', mainAppUrl.toString());

    const response = await fetch(mainAppUrl, {
      headers: {
        'Authorization': 'Bearer saman121213xpCrocode',
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest' // Helps identify API requests
      },
      cache: 'no-store'
    });

    // Check if response is JSON before parsing
    const contentType = response.headers.get('content-type');
    if (!contentType?.includes('application/json')) {
      const text = await response.text();
      console.error('Non-JSON response:', text.substring(0, 200));
      throw new Error('API returned non-JSON response');
    }

    const data = await response.json();
    
    return NextResponse.json({
      success: true,
      data: data.orders || data.data || [],
      message: 'Orders fetched successfully'
    });

  } catch (error) {
    console.error('[Admin Orders Proxy] Error:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Failed to fetch admin orders',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      },
      { status: 500 }
    );
  }
}