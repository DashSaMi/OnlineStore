module.exports = {

"[externals]/mongodb [external] (mongodb, cjs)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("mongodb", () => require("mongodb"));

module.exports = mod;
}}),
"[project]/src/lib/mongodb.js [app-rsc] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "getDatabase": ()=>getDatabase
});
var __TURBOPACK__imported__module__$5b$externals$5d2f$mongodb__$5b$external$5d$__$28$mongodb$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/mongodb [external] (mongodb, cjs)");
;
const uri = process.env.MONGODB_URI;
const defaultDbName = process.env.MONGODB_DB_NAME || 'SamanOnlineShop';
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    maxPoolSize: 10,
    socketTimeoutMS: 30000,
    serverSelectionTimeoutMS: 5000,
    connectTimeoutMS: 10000
};
// Validate environment variables
if (!uri) {
    throw new Error('MongoDB URI is not defined. Please add MONGODB_URI to .env.local');
}
// Global clientPromise to maintain connection during development HMR
let clientPromise;
if ("TURBOPACK compile-time truthy", 1) {
    if (!("TURBOPACK ident replacement", globalThis)._mongoClientPromise) {
        const client = new __TURBOPACK__imported__module__$5b$externals$5d2f$mongodb__$5b$external$5d$__$28$mongodb$2c$__cjs$29$__["MongoClient"](uri, options);
        ("TURBOPACK ident replacement", globalThis)._mongoClientPromise = client.connect().then(()=>{
            console.log('MongoDB connected successfully');
            return client;
        }).catch((err)=>{
            console.error('MongoDB connection error:', err);
            throw err;
        });
    }
    clientPromise = ("TURBOPACK ident replacement", globalThis)._mongoClientPromise;
} else //TURBOPACK unreachable
;
async function getDatabase(dbName = defaultDbName) {
    try {
        const client = await clientPromise;
        const db = client.db(dbName);
        // Ping database to verify connection is alive
        await db.command({
            ping: 1
        });
        return {
            client,
            db
        };
    } catch (error) {
        console.error('Failed to get database instance:', error);
        throw new Error('Database connection failed');
    }
}
// Graceful shutdown handler for Node process termination
process.on('SIGINT', async ()=>{
    try {
        const client = await clientPromise;
        await client.close();
        console.log('MongoDB connection closed through app termination');
        process.exit(0);
    } catch (err) {
        console.error('Failed to close MongoDB connection:', err);
        process.exit(1);
    }
});
}),
"[project]/src/app/dashboard/orders/[id]/actions.js [app-rsc] (ecmascript)": ((__turbopack_context__) => {
"use strict";

// app/dashboard/orders/[id]/actions.js
/* __next_internal_action_entry_do_not_use__ [{"407ae0e74c384947af0465fee0678fe6618751424c":"fetchAdminOrderById","60854b7da80ed096641e78ed5fb28d61c69a9c71de":"updateOrderStatus"},"",""] */ __turbopack_context__.s({
    "fetchAdminOrderById": ()=>fetchAdminOrderById,
    "updateOrderStatus": ()=>updateOrderStatus
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$app$2d$render$2f$encryption$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/app-render/encryption.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mongodb$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/mongodb.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$mongodb__$5b$external$5d$__$28$mongodb$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/mongodb [external] (mongodb, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
;
;
function isValidObjectId(id) {
    if (!id) return false;
    try {
        return __TURBOPACK__imported__module__$5b$externals$5d2f$mongodb__$5b$external$5d$__$28$mongodb$2c$__cjs$29$__["ObjectId"].isValid(id) && String(new __TURBOPACK__imported__module__$5b$externals$5d2f$mongodb__$5b$external$5d$__$28$mongodb$2c$__cjs$29$__["ObjectId"](id)) === id;
    } catch  {
        return false;
    }
}
async function fetchAdminOrderById(id) {
    try {
        const { db } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mongodb$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getDatabase"])();
        if (!db) throw new Error('Could not connect to database');
        const order = await db.collection('orders').findOne({
            _id: new __TURBOPACK__imported__module__$5b$externals$5d2f$mongodb__$5b$external$5d$__$28$mongodb$2c$__cjs$29$__["ObjectId"](id)
        });
        if (!order) throw new Error('Order not found');
        let userInfo = {
            customerName: 'Guest Customer',
            customerEmail: 'No email provided',
            customerImage: null
        };
        if (order.userId) {
            let user = null;
            if (isValidObjectId(order.userId)) {
                user = await db.collection('users').findOne({
                    _id: new __TURBOPACK__imported__module__$5b$externals$5d2f$mongodb__$5b$external$5d$__$28$mongodb$2c$__cjs$29$__["ObjectId"](order.userId)
                });
            } else {
                user = await db.collection('users').findOne({
                    _id: order.userId
                });
            }
            if (user) {
                userInfo = {
                    customerName: `${user.firstName || ''} ${user.lastName || ''}`.trim() || 'Registered Customer',
                    customerEmail: user.email || 'No email provided',
                    customerImage: user.image || null
                };
            }
        }
        return JSON.parse(JSON.stringify({
            ...order,
            _id: order._id.toString(),
            userId: order.userId?.toString(),
            ...userInfo,
            items: order.items?.map((item)=>({
                    ...item,
                    productId: item.productId?.toString()
                })) || []
        }));
    } catch (error) {
        console.error('[fetchAdminOrderById] Error:', error);
        throw new Error(error.message || 'Failed to fetch order');
    }
}
async function updateOrderStatus(id, status) {
    try {
        const { db } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mongodb$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getDatabase"])();
        if (!db) throw new Error('Could not connect to database');
        const result = await db.collection('orders').updateOne({
            _id: new __TURBOPACK__imported__module__$5b$externals$5d2f$mongodb__$5b$external$5d$__$28$mongodb$2c$__cjs$29$__["ObjectId"](id)
        }, {
            $set: {
                status,
                updatedAt: new Date()
            }
        });
        if (!result.modifiedCount) {
            throw new Error('Order status update failed');
        }
        return {
            success: true
        };
    } catch (error) {
        console.error('[updateOrderStatus] Error:', error);
        throw new Error(error.message || 'Failed to update status');
    }
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    fetchAdminOrderById,
    updateOrderStatus
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(fetchAdminOrderById, "407ae0e74c384947af0465fee0678fe6618751424c", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(updateOrderStatus, "60854b7da80ed096641e78ed5fb28d61c69a9c71de", null);
}),
"[project]/.next-internal/server/app/dashboard/orders/[id]/page/actions.js { ACTIONS_MODULE0 => \"[project]/src/app/dashboard/orders/[id]/actions.js [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript) <locals>": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$dashboard$2f$orders$2f5b$id$5d2f$actions$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/dashboard/orders/[id]/actions.js [app-rsc] (ecmascript)");
;
;
}),
"[project]/.next-internal/server/app/dashboard/orders/[id]/page/actions.js { ACTIONS_MODULE0 => \"[project]/src/app/dashboard/orders/[id]/actions.js [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript) <module evaluation>": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$dashboard$2f$orders$2f5b$id$5d2f$actions$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/dashboard/orders/[id]/actions.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f2e$next$2d$internal$2f$server$2f$app$2f$dashboard$2f$orders$2f5b$id$5d2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$src$2f$app$2f$dashboard$2f$orders$2f5b$id$5d2f$actions$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i('[project]/.next-internal/server/app/dashboard/orders/[id]/page/actions.js { ACTIONS_MODULE0 => "[project]/src/app/dashboard/orders/[id]/actions.js [app-rsc] (ecmascript)" } [app-rsc] (server actions loader, ecmascript) <locals>');
}),
"[project]/.next-internal/server/app/dashboard/orders/[id]/page/actions.js { ACTIONS_MODULE0 => \"[project]/src/app/dashboard/orders/[id]/actions.js [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript) <exports>": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "407ae0e74c384947af0465fee0678fe6618751424c": ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$dashboard$2f$orders$2f5b$id$5d2f$actions$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["fetchAdminOrderById"],
    "60854b7da80ed096641e78ed5fb28d61c69a9c71de": ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$dashboard$2f$orders$2f5b$id$5d2f$actions$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["updateOrderStatus"]
});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$dashboard$2f$orders$2f5b$id$5d2f$actions$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/dashboard/orders/[id]/actions.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f2e$next$2d$internal$2f$server$2f$app$2f$dashboard$2f$orders$2f5b$id$5d2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$src$2f$app$2f$dashboard$2f$orders$2f5b$id$5d2f$actions$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i('[project]/.next-internal/server/app/dashboard/orders/[id]/page/actions.js { ACTIONS_MODULE0 => "[project]/src/app/dashboard/orders/[id]/actions.js [app-rsc] (ecmascript)" } [app-rsc] (server actions loader, ecmascript) <locals>');
}),
"[project]/.next-internal/server/app/dashboard/orders/[id]/page/actions.js { ACTIONS_MODULE0 => \"[project]/src/app/dashboard/orders/[id]/actions.js [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "407ae0e74c384947af0465fee0678fe6618751424c": ()=>__TURBOPACK__imported__module__$5b$project$5d2f2e$next$2d$internal$2f$server$2f$app$2f$dashboard$2f$orders$2f5b$id$5d2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$src$2f$app$2f$dashboard$2f$orders$2f5b$id$5d2f$actions$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$exports$3e$__["407ae0e74c384947af0465fee0678fe6618751424c"],
    "60854b7da80ed096641e78ed5fb28d61c69a9c71de": ()=>__TURBOPACK__imported__module__$5b$project$5d2f2e$next$2d$internal$2f$server$2f$app$2f$dashboard$2f$orders$2f5b$id$5d2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$src$2f$app$2f$dashboard$2f$orders$2f5b$id$5d2f$actions$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$exports$3e$__["60854b7da80ed096641e78ed5fb28d61c69a9c71de"]
});
var __TURBOPACK__imported__module__$5b$project$5d2f2e$next$2d$internal$2f$server$2f$app$2f$dashboard$2f$orders$2f5b$id$5d2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$src$2f$app$2f$dashboard$2f$orders$2f5b$id$5d2f$actions$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i('[project]/.next-internal/server/app/dashboard/orders/[id]/page/actions.js { ACTIONS_MODULE0 => "[project]/src/app/dashboard/orders/[id]/actions.js [app-rsc] (ecmascript)" } [app-rsc] (server actions loader, ecmascript) <module evaluation>');
var __TURBOPACK__imported__module__$5b$project$5d2f2e$next$2d$internal$2f$server$2f$app$2f$dashboard$2f$orders$2f5b$id$5d2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$src$2f$app$2f$dashboard$2f$orders$2f5b$id$5d2f$actions$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$exports$3e$__ = __turbopack_context__.i('[project]/.next-internal/server/app/dashboard/orders/[id]/page/actions.js { ACTIONS_MODULE0 => "[project]/src/app/dashboard/orders/[id]/actions.js [app-rsc] (ecmascript)" } [app-rsc] (server actions loader, ecmascript) <exports>');
}),
"[project]/src/app/favicon.ico.mjs { IMAGE => \"[project]/src/app/favicon.ico (static in ecmascript)\" } [app-rsc] (structured image object, ecmascript, Next.js Server Component)": ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/src/app/favicon.ico.mjs { IMAGE => \"[project]/src/app/favicon.ico (static in ecmascript)\" } [app-rsc] (structured image object, ecmascript)"));
}),
"[project]/src/app/layout.js [app-rsc] (ecmascript, Next.js Server Component)": ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/src/app/layout.js [app-rsc] (ecmascript)"));
}),
"[project]/src/app/dashboard/layout.js [app-rsc] (ecmascript, Next.js Server Component)": ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/src/app/dashboard/layout.js [app-rsc] (ecmascript)"));
}),
"[project]/src/app/dashboard/orders/[id]/components/OrderDetail.js [app-rsc] (client reference proxy) <module evaluation>": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "default": ()=>__TURBOPACK__default__export__
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call the default export of [project]/src/app/dashboard/orders/[id]/components/OrderDetail.js <module evaluation> from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/src/app/dashboard/orders/[id]/components/OrderDetail.js <module evaluation>", "default");
}),
"[project]/src/app/dashboard/orders/[id]/components/OrderDetail.js [app-rsc] (client reference proxy)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "default": ()=>__TURBOPACK__default__export__
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call the default export of [project]/src/app/dashboard/orders/[id]/components/OrderDetail.js from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/src/app/dashboard/orders/[id]/components/OrderDetail.js", "default");
}),
"[project]/src/app/dashboard/orders/[id]/components/OrderDetail.js [app-rsc] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$dashboard$2f$orders$2f5b$id$5d2f$components$2f$OrderDetail$2e$js__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/src/app/dashboard/orders/[id]/components/OrderDetail.js [app-rsc] (client reference proxy) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$dashboard$2f$orders$2f5b$id$5d2f$components$2f$OrderDetail$2e$js__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__ = __turbopack_context__.i("[project]/src/app/dashboard/orders/[id]/components/OrderDetail.js [app-rsc] (client reference proxy)");
;
__turbopack_context__.n(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$dashboard$2f$orders$2f5b$id$5d2f$components$2f$OrderDetail$2e$js__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__);
}),
"[project]/src/app/dashboard/orders/[id]/page.js [app-rsc] (ecmascript)": ((__turbopack_context__) => {
"use strict";

//app/dashboard/orders/[id]/page.js
__turbopack_context__.s({
    "default": ()=>OrderDetailPage
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$dashboard$2f$orders$2f5b$id$5d2f$components$2f$OrderDetail$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/dashboard/orders/[id]/components/OrderDetail.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$dashboard$2f$orders$2f5b$id$5d2f$actions$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/dashboard/orders/[id]/actions.js [app-rsc] (ecmascript)");
;
;
;
async function OrderDetailPage({ params }) {
    const { id } = params;
    try {
        const order = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$dashboard$2f$orders$2f5b$id$5d2f$actions$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["fetchAdminOrderById"])(id);
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "py-8",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                    className: "text-3xl font-bold mb-8 text-gray-900",
                    children: [
                        "Order #",
                        order._id
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/dashboard/orders/[id]/page.js",
                    lineNumber: 13,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$dashboard$2f$orders$2f5b$id$5d2f$components$2f$OrderDetail$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                    order: order
                }, void 0, false, {
                    fileName: "[project]/src/app/dashboard/orders/[id]/page.js",
                    lineNumber: 14,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/dashboard/orders/[id]/page.js",
            lineNumber: 12,
            columnNumber: 7
        }, this);
    } catch (error) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "p-8 text-red-600 bg-red-50 rounded",
            children: [
                "Error loading order: ",
                error.message
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/dashboard/orders/[id]/page.js",
            lineNumber: 19,
            columnNumber: 7
        }, this);
    }
}
}),
"[project]/src/app/dashboard/orders/[id]/page.js [app-rsc] (ecmascript, Next.js Server Component)": ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/src/app/dashboard/orders/[id]/page.js [app-rsc] (ecmascript)"));
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}}),

};

//# sourceMappingURL=%5Broot-of-the-server%5D__639e0fa5._.js.map