module.exports = {

"[project]/.next-internal/server/app/dashboard/products/edit/[id]/page/actions.js [app-rsc] (server actions loader, ecmascript)": ((__turbopack_context__) => {

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
"[project]/src/lib/api/products.js [app-rsc] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "createProduct": ()=>createProduct,
    "deleteProduct": ()=>deleteProduct,
    "fetchProducts": ()=>fetchProducts,
    "getProduct": ()=>getProduct,
    "updateProduct": ()=>updateProduct
});
const API_BASE_URL = ("TURBOPACK compile-time value", "http://localhost:3000") || 'http://localhost:3000';
// Common fetch handler
async function handleRequest(url, options = {}) {
    try {
        const response = await fetch(url, {
            ...options,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                ...options.headers
            },
            cache: 'no-store'
        });
        if (!response.ok) {
            const errorData = await response.json().catch(()=>({}));
            throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error(`API Error (${url}):`, error);
        throw error;
    }
}
async function fetchProducts({ page = 1, limit = 10, sort = 'createdAt', order = 'desc', bestSellers, category, minPrice, maxPrice, search } = {}) {
    const params = new URLSearchParams({
        page,
        limit,
        sort,
        order,
        ...bestSellers && {
            bestSellers: 'true'
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
    return handleRequest(`${API_BASE_URL}/api/products?${params.toString()}`);
}
async function createProduct(productData) {
    return handleRequest(`${API_BASE_URL}/api/products`, {
        method: 'POST',
        body: JSON.stringify(productData)
    });
}
async function updateProduct({ _id, ...updateData }) {
    return handleRequest(`${API_BASE_URL}/api/products`, {
        method: 'PUT',
        body: JSON.stringify({
            _id,
            ...updateData
        })
    });
}
async function deleteProduct(id) {
    return handleRequest(`${API_BASE_URL}/api/products?id=${id}`, {
        method: 'DELETE'
    });
}
async function getProduct(id) {
    return handleRequest(`${API_BASE_URL}/api/products/${id}`);
}
}),
"[project]/src/app/dashboard/products/edit/[id]/page.js [app-rsc] (ecmascript)": ((__turbopack_context__) => {
"use strict";

// src/app/dashboard/products/edit/[id]/page.js
__turbopack_context__.s({
    "default": ()=>EditProductPage
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$products$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/api/products.js [app-rsc] (ecmascript)");
(()=>{
    const e = new Error("Cannot find module './EditProductForm'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
;
;
;
async function EditProductPage({ params }) {
    const product = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$products$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getProduct"])(params.id);
    if (!product) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "p-6",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    children: "محصول یافت نشد"
                }, void 0, false, {
                    fileName: "[project]/src/app/dashboard/products/edit/[id]/page.js",
                    lineNumber: 12,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/dashboard/products/edit/[id]/page.js",
                lineNumber: 11,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/app/dashboard/products/edit/[id]/page.js",
            lineNumber: 10,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(EditProductForm, {
        product: product
    }, void 0, false, {
        fileName: "[project]/src/app/dashboard/products/edit/[id]/page.js",
        lineNumber: 18,
        columnNumber: 10
    }, this);
}
}),
"[project]/src/app/dashboard/products/edit/[id]/page.js [app-rsc] (ecmascript, Next.js Server Component)": ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/src/app/dashboard/products/edit/[id]/page.js [app-rsc] (ecmascript)"));
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}}),

};

//# sourceMappingURL=%5Broot-of-the-server%5D__5629aeba._.js.map