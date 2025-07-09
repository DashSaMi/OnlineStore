module.exports = {

"[project]/.next-internal/server/app/api/products/related/route/actions.js [app-rsc] (server actions loader, ecmascript)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
}}),
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}}),
"[externals]/mongoose [external] (mongoose, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("mongoose", () => require("mongoose"));

module.exports = mod;
}}),
"[project]/src/app/lib/mongodb.js [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/mongoose [external] (mongoose, cjs)");
;
const uri = process.env.MONGODB_URI;
if (!uri) {
    throw new Error('Please define MONGODB_URI in .env.local');
}
let cached = global.mongoose;
if (!cached) {
    cached = global.mongoose = {
        conn: null,
        promise: null
    };
}
async function connectToDatabase() {
    if (cached.conn) {
        return cached.conn;
    }
    if (!cached.promise) {
        cached.promise = __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["default"].connect(uri, {
            dbName: 'SamanOnlineShop',
            useNewUrlParser: true,
            useUnifiedTopology: true
        }).then((mongoose)=>{
            console.log('Connected to MongoDB Atlas');
            return mongoose;
        });
    }
    cached.conn = await cached.promise;
    return cached.conn;
}
const __TURBOPACK__default__export__ = connectToDatabase;
}}),
"[project]/src/app/models/product.js [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/mongoose [external] (mongoose, cjs)");
;
const productSchema = new __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["Schema"]({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: [
            true,
            'نام محصول الزامی است'
        ],
        trim: true
    },
    price: {
        type: Number,
        required: [
            true,
            'قیمت محصول الزامی است'
        ],
        min: [
            0,
            'قیمت نمی‌تواند منفی باشد'
        ]
    },
    originalPrice: {
        type: Number,
        min: [
            0,
            'قیمت اصلی نمی‌تواند منفی باشد'
        ]
    },
    discount: {
        type: Number,
        min: [
            0,
            'تخفیف نمی‌تواند منفی باشد'
        ],
        max: [
            100,
            'تخفیف نمی‌تواند بیشتر از ۱۰۰ باشد'
        ]
    },
    rating: {
        type: Number,
        default: 0,
        min: [
            0,
            'امتیاز نمی‌تواند منفی باشد'
        ],
        max: [
            5,
            'حداکثر امتیاز ۵ است'
        ]
    },
    reviews: {
        type: Number,
        default: 0,
        min: [
            0,
            'تعداد نظرات نمی‌تواند منفی باشد'
        ]
    },
    imageUrl: {
        type: String,
        required: [
            true,
            'تصویر محصول الزامی است'
        ]
    },
    description: {
        type: String,
        required: [
            true,
            'توضیحات محصول الزامی است'
        ]
    },
    category: {
        type: String,
        required: [
            true,
            'دسته‌بندی محصول الزامی است'
        ]
    },
    stock: {
        type: Number,
        required: true,
        default: 0,
        min: [
            0,
            'موجودی نمی‌تواند منفی باشد'
        ]
    },
    isBestSeller: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true,
    toJSON: {
        transform: function(doc, ret) {
            ret.id = doc.id;
            delete ret._id;
            delete ret.__v;
            return ret;
        }
    }
});
// Add a pre-save hook to generate numeric ID if not provided
productSchema.pre('save', async function(next) {
    if (!this.id) {
        // Find the highest id and increment by 1
        const highestProduct = await this.constructor.findOne().sort('-id');
        this.id = highestProduct ? highestProduct.id + 1 : 1;
    }
    next();
});
const Product = __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["models"].Product || (0, __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["model"])('Product', productSchema);
const __TURBOPACK__default__export__ = Product;
}}),
"[project]/src/app/api/products/related/route.js [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "GET": (()=>GET)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$mongodb$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/lib/mongodb.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$models$2f$product$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/models/product.js [app-route] (ecmascript)");
;
;
async function GET(request) {
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$mongodb$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["connectedToDatabase"])();
    try {
        const { searchParams } = new URL(request.url);
        const currentProductId = searchParams.get('currentProductId');
        const category = searchParams.get('category');
        // Get 4 random related products
        const relatedProducts = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$models$2f$product$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].aggregate([
            {
                $match: {
                    category,
                    id: {
                        $ne: Number(currentProductId)
                    }
                }
            },
            {
                $sample: {
                    size: 4
                }
            }
        ]);
        return Response.json(relatedProducts);
    } catch (error) {
        return Response.json({
            error: error.message
        }, {
            status: 500
        });
    }
}
}}),

};

//# sourceMappingURL=%5Broot-of-the-server%5D__f7185135._.js.map