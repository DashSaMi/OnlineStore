// src/app/dashboard/actions.js
'use server';

export async function fetchOrdersServer() {
  try {
    const response = await fetch('http://localhost:3001/api/admin/orders', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${process.env.ADMIN_SECRET}`
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