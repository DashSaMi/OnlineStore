//src/lib/api.js
const API_BASE_URL = process.env.NEXTAUTH_URL;

/**
 * Fetches all products from the API
 * @returns {Promise<Array>} Array of products
 * @throws {Error} If the request fails
 */
const fetchProducts = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/products`, {
      cache: 'no-store' // Important for fresh data
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Failed to fetch products');
    }
    
    return await response.json();
  } catch (error) {
    console.error('fetchProducts error:', error);
    throw error;
  }
};

/**
 * Fetches a single product by ID
 * @param {string} id - Product ID
 * @returns {Promise<Object>} Product data
 * @throws {Error} If the request fails
 */
const fetchProductById = async (id) => {
  try {
    if (!id) {
      throw new Error('Product ID is required');
    }

    const response = await fetch(`${API_BASE_URL}/products/${id}`, {
      cache: 'no-store'
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Product ${id} not found`);
    }
    
    return await response.json();
  } catch (error) {
    console.error(`fetchProductById error for ID ${id}:`, error);
    throw error;
  }
};

/**
 * Fetches all orders (admin only)
 * @returns {Promise<Array>} Array of orders
 * @throws {Error} If the request fails
 */
const fetchOrders = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/orders`, {
      headers: {
        'Authorization': 'Bearer saman121213xpCrocode'
      },
      cache: 'no-store'
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Failed to fetch orders');
    }
    
    return await response.json();
  } catch (error) {
    console.error('fetchOrders error:', error);
    throw error;
  }
};

/**
 * Creates a new product
 * @param {Object} productData - Product data to create
 * @returns {Promise<Object>} Created product
 * @throws {Error} If the request fails
 */
const createProduct = async (productData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/admin/products`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
         'Authorization': 'Bearer saman121213xpCrocode'
      },
      body: JSON.stringify(productData)
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Failed to create product');
    }
    
    return await response.json();
  } catch (error) {
    console.error('createProduct error:', error);
    throw error;
  }
};

/**
 * Updates an existing product
 * @param {string} id - Product ID to update
 * @param {Object} productData - Updated product data
 * @returns {Promise<Object>} Updated product
 * @throws {Error} If the request fails
 */
const updateProduct = async (id, productData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/admin/products/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
       'Authorization': 'Bearer saman121213xpCrocode'
      },
      body: JSON.stringify(productData)
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Failed to update product');
    }
    
    return await response.json();
  } catch (error) {
    console.error(`updateProduct error for ID ${id}:`, error);
    throw error;
  }
};

/**
 * Deletes a product
 * @param {string} id - Product ID to delete
 * @returns {Promise<Object>} Deletion confirmation
 * @throws {Error} If the request fails
 */
const deleteProduct = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/admin/products/${id}`, {
      method: 'DELETE',
      headers: {
         'Authorization': 'Bearer saman121213xpCrocode'
      }
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Failed to delete product');
    }
    
    return await response.json();
  } catch (error) {
    console.error(`deleteProduct error for ID ${id}:`, error);
    throw error;
  }
};

// Explicit named exports
export {
  fetchProducts,
  fetchProductById,
  fetchOrders,
  createProduct,
  updateProduct,
  deleteProduct
};

// Default export
export default {
  fetchProducts,
  fetchProductById,
  fetchOrders,
  createProduct,
  updateProduct,
  deleteProduct
};