const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// Common fetch wrapper
async function handleRequest(url, options = {}) {
  try {
    const res = await fetch(url, {
      ...options,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        ...options.headers
      },
      cache: 'no-store'
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.error || `HTTP error! status: ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    console.error(`API Error (${url}):`, error);
    throw error;
  }
}

// Fetch products list with filters/pagination
export async function fetchProducts(params = {}) {
  const {
    page = 1,
    limit = 10,
    sort = 'createdAt',
    order = 'desc',
    bestSellers,
    category,
    minPrice,
    maxPrice,
    search
  } = params;

  const query = new URLSearchParams({
    page,
    limit,
    sort,
    order,
    ...(bestSellers !== undefined && { bestSellers: bestSellers.toString() }),
    ...(category && { category }),
    ...(minPrice && { minPrice }),
    ...(maxPrice && { maxPrice }),
    ...(search && { search })
  });

  return handleRequest(`${API_BASE_URL}/api/products?${query.toString()}`);
}

// Create a new product
export async function createProduct(productData) {
  return handleRequest(`${API_BASE_URL}/api/products`, {
    method: 'POST',
    body: JSON.stringify(productData)
  });
}

// Update an existing product
export async function updateProduct({ _id, ...updateData }) {
  return handleRequest(`${API_BASE_URL}/api/products`, {
    method: 'PUT',
    body: JSON.stringify({ _id, ...updateData })
  });
}

// Delete a product by id
export async function deleteProduct(id) {
  if (!id) throw new Error('Product ID is required for deletion');
  return handleRequest(`${API_BASE_URL}/api/products?id=${id}`, {
    method: 'DELETE'
  });
}

// Get single product by id
export async function getProduct(id) {
  if (!id) throw new Error('Product ID is required');
  return handleRequest(`${API_BASE_URL}/api/products/${id}`);
}
