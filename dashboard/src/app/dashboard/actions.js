'use server';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function fetchOrdersServer() {
  if (!process.env.ADMIN_SECRET) {
    throw new Error('Admin secret not configured');
  }

  try {
    const response = await fetch(`${API_BASE_URL}/api/admin/orders`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer saman121213xpCrocode`
      },
      cache: 'no-store'
    });

    // Check content type before parsing
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      const text = await response.text();
      throw new Error(`Expected JSON but got: ${text.substring(0, 100)}`);
    }

    const data = await response.json();
    
    // Ensure we always return an array
    return Array.isArray(data?.data) ? data.data : 
           Array.isArray(data?.orders) ? data.orders : [];
  } catch (error) {
    console.error('Failed to fetch orders:', error);
    throw new Error(error.message || 'Could not load orders data');
  }
}