// lib/api.js
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000/api';

export async function fetchProducts(params = {}) {
  try {
    const query = new URLSearchParams(params).toString();
    const response = await fetch(`${API_BASE_URL}/products?${query}`, {
      cache: 'no-store'
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    // Ensure the response has the expected structure
    if (!data || typeof data !== 'object') {
      throw new Error('Invalid API response format');
    }

    return {
      success: true,
      data: Array.isArray(data) ? data : data.data || [],
      ...(data.pagination && { pagination: data.pagination })
    };
  } catch (error) {
    console.error('fetchProducts error:', error);
    return {
      success: false,
      error: error.message,
      data: []
    };
  }
}