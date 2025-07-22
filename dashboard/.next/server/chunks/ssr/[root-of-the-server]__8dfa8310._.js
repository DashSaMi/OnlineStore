module.exports = {

"[project]/.next-internal/server/app/dashboard/page/actions.js [app-rsc] (server actions loader, ecmascript)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
}}),
"[project]/src/app/favicon.ico.mjs { IMAGE => \"[project]/src/app/favicon.ico (static in ecmascript)\" } [app-rsc] (structured image object, ecmascript, Next.js Server Component)": ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/src/app/favicon.ico.mjs { IMAGE => \"[project]/src/app/favicon.ico (static in ecmascript)\" } [app-rsc] (structured image object, ecmascript)"));
}),
"[project]/src/app/layout.js [app-rsc] (ecmascript, Next.js Server Component)": ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/src/app/layout.js [app-rsc] (ecmascript)"));
}),
"[project]/src/app/dashboard/layout.js [app-rsc] (ecmascript, Next.js Server Component)": ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/src/app/dashboard/layout.js [app-rsc] (ecmascript)"));
}),
"[project]/src/lib/api.js [app-rsc] (ecmascript)": ((__turbopack_context__) => {
"use strict";

//src/lib/api.js
__turbopack_context__.s({
    "createProduct": ()=>createProduct,
    "default": ()=>__TURBOPACK__default__export__,
    "deleteProduct": ()=>deleteProduct,
    "fetchOrders": ()=>fetchOrders,
    "fetchProductById": ()=>fetchProductById,
    "fetchProducts": ()=>fetchProducts,
    "updateProduct": ()=>updateProduct
});
const API_BASE_URL = ("TURBOPACK compile-time value", "http://localhost:3000/api") || 'http://localhost:3000/api';
/**
 * Fetches all products from the API
 * @returns {Promise<Array>} Array of products
 * @throws {Error} If the request fails
 */ const fetchProducts = async ()=>{
    try {
        const response = await fetch(`${API_BASE_URL}/products`, {
            cache: 'no-store' // Important for fresh data
        });
        if (!response.ok) {
            const errorData = await response.json().catch(()=>({}));
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
 */ const fetchProductById = async (id)=>{
    try {
        if (!id) {
            throw new Error('Product ID is required');
        }
        const response = await fetch(`${API_BASE_URL}/products/${id}`, {
            cache: 'no-store'
        });
        if (!response.ok) {
            const errorData = await response.json().catch(()=>({}));
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
 */ const fetchOrders = async ()=>{
    try {
        const response = await fetch(`${API_BASE_URL}/orders`, {
            headers: {
                'Authorization': `Bearer ${("TURBOPACK compile-time value", "saman121213xpCrocode")}`
            },
            cache: 'no-store'
        });
        if (!response.ok) {
            const errorData = await response.json().catch(()=>({}));
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
 */ const createProduct = async (productData)=>{
    try {
        const response = await fetch(`${API_BASE_URL}/admin/products`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${("TURBOPACK compile-time value", "saman121213xpCrocode")}`
            },
            body: JSON.stringify(productData)
        });
        if (!response.ok) {
            const errorData = await response.json().catch(()=>({}));
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
 */ const updateProduct = async (id, productData)=>{
    try {
        const response = await fetch(`${API_BASE_URL}/admin/products/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${("TURBOPACK compile-time value", "saman121213xpCrocode")}`
            },
            body: JSON.stringify(productData)
        });
        if (!response.ok) {
            const errorData = await response.json().catch(()=>({}));
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
 */ const deleteProduct = async (id)=>{
    try {
        const response = await fetch(`${API_BASE_URL}/admin/products/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${("TURBOPACK compile-time value", "saman121213xpCrocode")}`
            }
        });
        if (!response.ok) {
            const errorData = await response.json().catch(()=>({}));
            throw new Error(errorData.message || 'Failed to delete product');
        }
        return await response.json();
    } catch (error) {
        console.error(`deleteProduct error for ID ${id}:`, error);
        throw error;
    }
};
;
const __TURBOPACK__default__export__ = {
    fetchProducts,
    fetchProductById,
    fetchOrders,
    createProduct,
    updateProduct,
    deleteProduct
};
}),
"[project]/src/app/dashboard/page.js [app-rsc] (ecmascript)": ((__turbopack_context__) => {
"use strict";

//app/dashboard/page.js
__turbopack_context__.s({
    "default": ()=>DashboardPage
});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/api.js [app-rsc] (ecmascript)");
;
async function DashboardPage() {
    try {
        const [products, orders] = await Promise.all([
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["fetchProducts"])(),
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["fetchOrders"])()
        ]);
        return `
      <div class="p-4">
        <h1 class="text-2xl font-bold mb-6">Dashboard Overview</h1>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div class="bg-white p-6 rounded-lg shadow">
            <h2 class="text-lg font-semibold mb-2">Total Products</h2>
            <p class="text-3xl font-bold">${products.length}</p>
          </div>
          
          <div class="bg-white p-6 rounded-lg shadow">
            <h2 class="text-lg font-semibold mb-2">Total Orders</h2>
            <p class="text-3xl font-bold">${orders.length}</p>
          </div>
        </div>
      </div>
    `;
    } catch (error) {
        return `
      <div class="p-4 bg-red-50 text-red-700 rounded-lg">
        <h2 class="text-xl font-bold mb-2">Error Loading Dashboard</h2>
        <p>${error.message}</p>
        <button onclick="window.location.reload()" class="mt-4 px-4 py-2 bg-blue-600 text-white rounded">
          Try Again
        </button>
      </div>
    `;
    }
}
}),
"[project]/src/app/dashboard/page.js [app-rsc] (ecmascript, Next.js Server Component)": ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/src/app/dashboard/page.js [app-rsc] (ecmascript)"));
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}}),

};

//# sourceMappingURL=%5Broot-of-the-server%5D__8dfa8310._.js.map