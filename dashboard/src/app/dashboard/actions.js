// src/app/dashboard/actions.js
'use server';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function fetchOrdersServer() {
  try {
    const response = await fetch(`${API_BASE_URL}/api/admin/orders`, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer saman121213xpCrocode'
      },
      cache: 'no-store'
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    // Ensure we always return an array
    if (Array.isArray(data.data)) {
      return data.data;
    } else if (Array.isArray(data.orders)) {
      return data.orders;
    } else {
      return [];
    }
  } catch (error) {
    console.error('Failed to fetch orders:', error);
    throw new Error(error.message || 'Could not load orders data');
  }
}
