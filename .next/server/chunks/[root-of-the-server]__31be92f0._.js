module.exports = {

"[project]/.next-internal/server/app/api/products/route/actions.js [app-rsc] (server actions loader, ecmascript)": (function(__turbopack_context__) {

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
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}}),
"[project]/src/app/api/products/route.js [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
// app/api/products/[id]/route.js
__turbopack_context__.s({
    "GET": (()=>GET)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
;
async function GET(request, { params }) {
    const products = [
        {
            id: 1,
            name: 'هدفون بلوتوثی AirPods Pro 2',
            price: 9_800_000,
            originalPrice: 12_500_000,
            discount: 22,
            rating: 4.5,
            reviews: 124,
            imageUrl: 'https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/airpods-pro-2-hero-select-202409_FMT_WHH?wid=750&hei=556&fmt=jpeg&qlt=90&.v=1724041668836',
            description: 'هدفون بی‌سیم اپل با قابلیت نویزکنسلینگ فعال و حالت شفاف. طراحی ارگونومیک با قابلیت ضد آب و تعریق. باتری با عمر 6 ساعت و همراه با کیس شارژر مگسیف.'
        },
        {
            id: 2,
            name: 'لپ تاپ ویوو بوک Go 14',
            price: 25_990_000,
            originalPrice: 31_750_000,
            discount: 18,
            rating: 4.8,
            reviews: 89,
            imageUrl: 'https://dlcdnwebimgs.asus.com/gain/7b6485d2-2950-485c-92c9-58692b928766/w800',
            description: 'لپ تاپ فوق سبک 1.3 کیلوگرمی با پردازنده Core i7 نسل 12، رم 16GB، SSD 512GB، صفحه نمایش 14 اینچ فول اچ دی IPS، گرافیک Intel Iris Xe، ویندوز 11 اورجینال'
        },
        {
            id: 3,
            name: 'لپ تاپ مک بوک ایر M2',
            price: 31_750_000,
            originalPrice: 36_500_000,
            discount: 13,
            rating: 4.7,
            reviews: 56,
            imageUrl: 'https://www.busiboutique.com/medias/boutique/429078/344f6d9a-c168-42c2-87f5-e49204b3fa65.jpg',
            description: 'لپ تاپ اپل با تراشه M2، رم 8GB، SSD 256GB، صفحه نمایش 13.6 اینچ Retina، دوربین 1080p FaceTime HD، اسپیکر استریو، تاچ آی دی، macOS ونچورا، عمر باتری تا 18 ساعت'
        },
        {
            id: 4,
            name: 'گوشی سامسونگ گلکسی S23',
            price: 16_750_000,
            originalPrice: 19_900_000,
            discount: 16,
            rating: 4.3,
            reviews: 78,
            imageUrl: 'https://showroom-mobile.orange.fr/wp-content/uploads/2023/01/640X500_Samsung_Galaxy_S23_5G_EE.jpg',
            description: 'گوشی پرچمدار سامسونگ با پردازنده Snapdragon 8 Gen 2، رم 8GB، حافظه 256GB، نمایشگر 6.1 اینچ Dynamic AMOLED 120Hz، سه دوربین 50+12+10 مگاپیکسل، باتری 3900mAh، اندروید 13'
        },
        {
            id: 5,
            name: 'آیفون 16',
            price: 45_000_000,
            originalPrice: 50_000_000,
            discount: 10,
            rating: 4.9,
            reviews: 215,
            imageUrl: 'https://m.media-amazon.com/images/I/712Pyq1hPfL.jpg',
            description: 'جدیدترین آیفون اپل با تراشه A18 Bionic، نمایشگر 6.7 اینچ Super Retina XDR ProMotion، سه دوربین 48+12+12 مگاپیکسل با قابلیت فیلمبرداری 8K، مقاوم در برابر آب IP68، iOS 18'
        }
    ];
    const product = products.find((p)=>p.id === Number(params.id));
    if (!product) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'محصول مورد نظر یافت نشد'
        }, {
            status: 404
        });
    }
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(product);
}
}}),

};

//# sourceMappingURL=%5Broot-of-the-server%5D__31be92f0._.js.map