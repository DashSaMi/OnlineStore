module.exports = {

"[project]/.next-internal/server/app/dashboard/products/add/page/actions.js [app-rsc] (server actions loader, ecmascript)": ((__turbopack_context__) => {

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

__turbopack_context__.s({
    "createProduct": ()=>createProduct,
    "default": ()=>__TURBOPACK__default__export__,
    "deleteProduct": ()=>deleteProduct,
    "fetchOrders": ()=>fetchOrders,
    "fetchProducts": ()=>fetchProducts,
    "updateProduct": ()=>updateProduct
});
const API_BASE_URL = ("TURBOPACK compile-time value", "http://localhost:3000/api") || 'http://localhost:3000/api';
// Fetch all products
const fetchProducts = async ()=>{
    const response = await fetch(`${API_BASE_URL}/products`);
    if (!response.ok) throw new Error('Failed to fetch products');
    return response.json();
};
// Fetch all orders
const fetchOrders = async ()=>{
    const response = await fetch(`${API_BASE_URL}/orders`, {
        headers: {
            'Authorization': `Bearer ${("TURBOPACK compile-time value", "saman121213xpCrocode")}`
        }
    });
    if (!response.ok) throw new Error('Failed to fetch orders');
    return response.json();
};
// Create product
const createProduct = async (productData)=>{
    const response = await fetch(`${API_BASE_URL}/admin/products`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${("TURBOPACK compile-time value", "saman121213xpCrocode")}`
        },
        body: JSON.stringify(productData)
    });
    if (!response.ok) throw new Error('Failed to create product');
    return response.json();
};
// Update product
const updateProduct = async (id, productData)=>{
    const response = await fetch(`${API_BASE_URL}/admin/products/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${("TURBOPACK compile-time value", "saman121213xpCrocode")}`
        },
        body: JSON.stringify(productData)
    });
    if (!response.ok) throw new Error('Failed to update product');
    return response.json();
};
// Delete product
const deleteProduct = async (id)=>{
    const response = await fetch(`${API_BASE_URL}/admin/products/${id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${("TURBOPACK compile-time value", "saman121213xpCrocode")}`
        }
    });
    if (!response.ok) throw new Error('Failed to delete product');
    return response.json();
};
;
const __TURBOPACK__default__export__ = {
    fetchProducts,
    fetchOrders,
    createProduct,
    updateProduct,
    deleteProduct
};
}),
"[project]/src/app/dashboard/products/add/page.js [app-rsc] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "default": ()=>AddProductPage
});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/api.js [app-rsc] (ecmascript)");
;
function AddProductPage() {
    return `
    <div class="p-4">
      <h1 class="text-2xl font-bold mb-6">افزودن محصول جدید</h1>
      
      <form id="productForm" class="bg-white p-6 rounded-lg shadow">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">نام محصول</label>
            <input
              type="text"
              name="name"
              required
              class="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">قیمت (ریال)</label>
            <input
              type="number"
              name="price"
              required
              class="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">دسته‌بندی‌ها (با کاما جدا کنید)</label>
            <input
              type="text"
              name="categories"
              required
              class="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">موجودی</label>
            <input
              type="number"
              name="stock"
              required
              class="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          
          <div class="md:col-span-2">
            <label class="block text-sm font-medium text-gray-700 mb-1">توضیحات</label>
            <textarea
              name="description"
              required
              class="w-full p-2 border border-gray-300 rounded"
              rows="4"
            ></textarea>
          </div>
          
          <div class="md:col-span-2">
            <label class="block text-sm font-medium text-gray-700 mb-1">آدرس تصویر</label>
            <input
              type="text"
              name="imageUrl"
              required
              class="w-full p-2 border border-gray-300 rounded"
            />
          </div>
        </div>
        
        <div class="mt-6 flex justify-end space-x-4">
          <button
            type="button"
            onclick="window.location.href='/dashboard/products'"
            class="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            انصراف
          </button>
          <button
            type="submit"
            class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            ذخیره محصول
          </button>
        </div>
      </form>

      <script>
        document.getElementById('productForm').addEventListener('submit', async (e) => {
          e.preventDefault();
          const formData = Object.fromEntries(new FormData(e.target));
          
          try {
            const response = await fetch('/api/admin/products', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                ...formData,
                categories: formData.categories.split(',').map(c => c.trim()),
                price: Number(formData.price),
                stock: Number(formData.stock)
              })
            });
            
            if (response.ok) {
              window.location.href = '/dashboard/products';
            } else {
              alert('خطا در ثبت محصول');
            }
          } catch (error) {
            console.error('Error:', error);
            alert('خطا در ارتباط با سرور');
          }
        });
      </script>
    </div>
  `;
}
}),
"[project]/src/app/dashboard/products/add/page.js [app-rsc] (ecmascript, Next.js Server Component)": ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/src/app/dashboard/products/add/page.js [app-rsc] (ecmascript)"));
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}}),

};

//# sourceMappingURL=%5Broot-of-the-server%5D__89477617._.js.map