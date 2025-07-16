// src/app/dashboard/actions.js
'use server';

export async function fetchOrdersServer() {
  try {
    const response = await fetch('http://localhost:3000/api/orders', { // Note: Changed to main app's URL
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
    return data.data; // Changed from data.orders to data.data to match our API response
  } catch (error) {
    console.error('Failed to fetch orders:', error);
    throw new Error(error.message || 'Could not load orders data');
  }
}