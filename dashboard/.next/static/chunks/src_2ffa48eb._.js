(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push([typeof document === "object" ? document.currentScript : undefined, {

"[project]/src/lib/api/products.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "createProduct": ()=>createProduct,
    "deleteProduct": ()=>deleteProduct,
    "fetchProducts": ()=>fetchProducts,
    "getProduct": ()=>getProduct,
    "updateProduct": ()=>updateProduct
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
const API_BASE_URL = ("TURBOPACK compile-time value", "http://localhost:3000") || 'http://localhost:3000';
// Common fetch wrapper
async function handleRequest(url) {
    let options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
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
            const errorData = await res.json().catch(()=>({}));
            throw new Error(errorData.error || "HTTP error! status: ".concat(res.status));
        }
        return await res.json();
    } catch (error) {
        console.error("API Error (".concat(url, "):"), error);
        throw error;
    }
}
async function fetchProducts() {
    let params = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    const { page = 1, limit = 10, sort = 'createdAt', order = 'desc', bestSellers, category, minPrice, maxPrice, search } = params;
    const query = new URLSearchParams({
        page,
        limit,
        sort,
        order,
        ...bestSellers !== undefined && {
            bestSellers: bestSellers.toString()
        },
        ...category && {
            category
        },
        ...minPrice && {
            minPrice
        },
        ...maxPrice && {
            maxPrice
        },
        ...search && {
            search
        }
    });
    return handleRequest("".concat(API_BASE_URL, "/api/products?").concat(query.toString()));
}
async function createProduct(productData) {
    return handleRequest("".concat(API_BASE_URL, "/api/products"), {
        method: 'POST',
        body: JSON.stringify(productData)
    });
}
async function updateProduct(param) {
    let { _id, ...updateData } = param;
    return handleRequest("".concat(API_BASE_URL, "/api/products"), {
        method: 'PUT',
        body: JSON.stringify({
            _id,
            ...updateData
        })
    });
}
async function deleteProduct(id) {
    if (!id) throw new Error('Product ID is required for deletion');
    return handleRequest("".concat(API_BASE_URL, "/api/products?id=").concat(id), {
        method: 'DELETE'
    });
}
async function getProduct(id) {
    if (!id) throw new Error('Product ID is required');
    return handleRequest("".concat(API_BASE_URL, "/api/products/").concat(id));
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/app/dashboard/products/edit/[id]/EditProductForm.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": ()=>EditProductForm
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$products$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/api/products.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
function EditProductForm(param) {
    let { product } = param;
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const [formData, setFormData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        _id: product._id,
        name: product.name || '',
        price: product.price || '',
        description: product.description || '',
        categories: (product.categories || []).join(', '),
        stock: product.stock || 0,
        imageUrl: product.imageUrl || '',
        isBestSeller: product.isBestSeller || false
    });
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isSubmitting, setIsSubmitting] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const handleChange = (e)=>{
        const { name, value, type, checked } = e.target;
        setFormData((prev)=>({
                ...prev,
                [name]: type === 'checkbox' ? checked : value
            }));
    };
    const handleSubmit = async (e)=>{
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);
        try {
            const updatedProduct = {
                ...formData,
                price: Number(formData.price),
                stock: Number(formData.stock),
                categories: formData.categories.split(',').map((c)=>c.trim()).filter(Boolean)
            };
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$products$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["updateProduct"])(updatedProduct);
            router.push('/dashboard/products');
            router.refresh();
        } catch (err) {
            setError(err.message || 'خطا در بروزرسانی محصول');
        } finally{
            setIsSubmitting(false);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
        onSubmit: handleSubmit,
        className: "max-w-3xl mx-auto p-6 space-y-6 bg-white rounded-lg shadow-md",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                className: "text-2xl font-semibold text-gray-800",
                children: "ویرایش محصول"
            }, void 0, false, {
                fileName: "[project]/src/app/dashboard/products/edit/[id]/EditProductForm.js",
                lineNumber: 62,
                columnNumber: 7
            }, this),
            error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-red-600 bg-red-100 p-3 rounded border border-red-400",
                children: error
            }, void 0, false, {
                fileName: "[project]/src/app/dashboard/products/edit/[id]/EditProductForm.js",
                lineNumber: 65,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                type: "hidden",
                name: "_id",
                value: formData._id
            }, void 0, false, {
                fileName: "[project]/src/app/dashboard/products/edit/[id]/EditProductForm.js",
                lineNumber: 71,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        htmlFor: "name",
                        className: "block mb-1 text-gray-700 font-medium",
                        children: "نام محصول"
                    }, void 0, false, {
                        fileName: "[project]/src/app/dashboard/products/edit/[id]/EditProductForm.js",
                        lineNumber: 74,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        id: "name",
                        type: "text",
                        name: "name",
                        value: formData.name,
                        onChange: handleChange,
                        className: "w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100",
                        disabled: isSubmitting,
                        required: true
                    }, void 0, false, {
                        fileName: "[project]/src/app/dashboard/products/edit/[id]/EditProductForm.js",
                        lineNumber: 80,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/dashboard/products/edit/[id]/EditProductForm.js",
                lineNumber: 73,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        htmlFor: "price",
                        className: "block mb-1 text-gray-700 font-medium",
                        children: "قیمت"
                    }, void 0, false, {
                        fileName: "[project]/src/app/dashboard/products/edit/[id]/EditProductForm.js",
                        lineNumber: 93,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        id: "price",
                        type: "number",
                        name: "price",
                        value: formData.price,
                        onChange: handleChange,
                        min: "0",
                        className: "w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100",
                        disabled: isSubmitting,
                        required: true
                    }, void 0, false, {
                        fileName: "[project]/src/app/dashboard/products/edit/[id]/EditProductForm.js",
                        lineNumber: 99,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/dashboard/products/edit/[id]/EditProductForm.js",
                lineNumber: 92,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        htmlFor: "categories",
                        className: "block mb-1 text-gray-700 font-medium",
                        children: "دسته‌بندی‌ها"
                    }, void 0, false, {
                        fileName: "[project]/src/app/dashboard/products/edit/[id]/EditProductForm.js",
                        lineNumber: 113,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        id: "categories",
                        type: "text",
                        name: "categories",
                        value: formData.categories,
                        onChange: handleChange,
                        placeholder: "مثلاً: الکترونیک, کامپیوتر",
                        className: "w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100",
                        disabled: isSubmitting,
                        required: true
                    }, void 0, false, {
                        fileName: "[project]/src/app/dashboard/products/edit/[id]/EditProductForm.js",
                        lineNumber: 119,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/dashboard/products/edit/[id]/EditProductForm.js",
                lineNumber: 112,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        htmlFor: "stock",
                        className: "block mb-1 text-gray-700 font-medium",
                        children: "موجودی"
                    }, void 0, false, {
                        fileName: "[project]/src/app/dashboard/products/edit/[id]/EditProductForm.js",
                        lineNumber: 133,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        id: "stock",
                        type: "number",
                        name: "stock",
                        value: formData.stock,
                        onChange: handleChange,
                        min: "0",
                        className: "w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100",
                        disabled: isSubmitting,
                        required: true
                    }, void 0, false, {
                        fileName: "[project]/src/app/dashboard/products/edit/[id]/EditProductForm.js",
                        lineNumber: 139,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/dashboard/products/edit/[id]/EditProductForm.js",
                lineNumber: 132,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        htmlFor: "description",
                        className: "block mb-1 text-gray-700 font-medium",
                        children: "توضیحات"
                    }, void 0, false, {
                        fileName: "[project]/src/app/dashboard/products/edit/[id]/EditProductForm.js",
                        lineNumber: 153,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                        id: "description",
                        name: "description",
                        value: formData.description,
                        onChange: handleChange,
                        rows: "4",
                        className: "w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 resize-none",
                        disabled: isSubmitting,
                        required: true
                    }, void 0, false, {
                        fileName: "[project]/src/app/dashboard/products/edit/[id]/EditProductForm.js",
                        lineNumber: 159,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/dashboard/products/edit/[id]/EditProductForm.js",
                lineNumber: 152,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        htmlFor: "imageUrl",
                        className: "block mb-1 text-gray-700 font-medium",
                        children: "آدرس تصویر"
                    }, void 0, false, {
                        fileName: "[project]/src/app/dashboard/products/edit/[id]/EditProductForm.js",
                        lineNumber: 172,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        id: "imageUrl",
                        type: "url",
                        name: "imageUrl",
                        value: formData.imageUrl,
                        onChange: handleChange,
                        placeholder: "https://example.com/image.jpg",
                        className: "w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100",
                        disabled: isSubmitting,
                        required: true
                    }, void 0, false, {
                        fileName: "[project]/src/app/dashboard/products/edit/[id]/EditProductForm.js",
                        lineNumber: 178,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/dashboard/products/edit/[id]/EditProductForm.js",
                lineNumber: 171,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center space-x-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        type: "checkbox",
                        name: "isBestSeller",
                        checked: formData.isBestSeller,
                        onChange: handleChange,
                        disabled: isSubmitting,
                        id: "isBestSeller",
                        className: "h-5 w-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                    }, void 0, false, {
                        fileName: "[project]/src/app/dashboard/products/edit/[id]/EditProductForm.js",
                        lineNumber: 192,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        htmlFor: "isBestSeller",
                        className: "text-gray-700 select-none",
                        children: "Mark as Best Seller"
                    }, void 0, false, {
                        fileName: "[project]/src/app/dashboard/products/edit/[id]/EditProductForm.js",
                        lineNumber: 201,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/dashboard/products/edit/[id]/EditProductForm.js",
                lineNumber: 191,
                columnNumber: 7
            }, this),
            formData.imageUrl && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                src: formData.imageUrl,
                alt: "Preview",
                className: "h-48 w-48 object-contain border rounded mx-auto",
                onError: (e)=>{
                    e.target.onerror = null;
                    e.target.src = '/placeholder-product.jpg';
                }
            }, void 0, false, {
                fileName: "[project]/src/app/dashboard/products/edit/[id]/EditProductForm.js",
                lineNumber: 210,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "submit",
                disabled: isSubmitting,
                className: "w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 rounded-md transition-colors",
                children: isSubmitting ? 'در حال بروزرسانی...' : 'ذخیره تغییرات'
            }, void 0, false, {
                fileName: "[project]/src/app/dashboard/products/edit/[id]/EditProductForm.js",
                lineNumber: 221,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/dashboard/products/edit/[id]/EditProductForm.js",
        lineNumber: 58,
        columnNumber: 5
    }, this);
}
_s(EditProductForm, "crkvq6H7GK5ulpB1Wcm54XG0WlY=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = EditProductForm;
var _c;
__turbopack_context__.k.register(_c, "EditProductForm");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
}]);

//# sourceMappingURL=src_2ffa48eb._.js.map