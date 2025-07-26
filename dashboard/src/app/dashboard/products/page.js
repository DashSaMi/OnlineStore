import SortControls from './components/SortControls';
import Link from 'next/link';
import ProductDeleteButton from './components/ProductDeleteButton';

const PAGE_SIZE = 6;
const API_BASE_URL = 'https://onlineshop-rose-six.vercel.app/';

export default async function ProductsPage({ searchParams }) {
  let products = [];
  let error = null;
  const sort = searchParams?.sort || 'createdAt';
  const order = searchParams?.order || 'desc';
  const page = parseInt(searchParams?.page || '1', 10);

  let total = 0;
  let totalPages = 1;

  try {
    const res = await fetch(`${API_BASE_URL}/api/products?sort=${sort}&order=${order}&limit=${PAGE_SIZE}&page=${page}`, { cache: 'no-store' });
    if (!res.ok) {
      throw new Error(`Failed to fetch products: ${res.status}`);
    }
    const data = await res.json();
    products = Array.isArray(data.data) ? data.data : (Array.isArray(data.products) ? data.products : []);
    total = data.pagination?.total || products.length;
    totalPages = data.pagination?.totalPages || Math.ceil(total / PAGE_SIZE);
  } catch (err) {
    error = err.message;
  }

  return (
    <div className="py-6 space-y-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Products</h1>
        <Link href="/dashboard/products/new" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">Add New Product</Link>
      </div>
      <SortControls />
      {error ? (
        <div className="p-4 text-red-600">Error: {error}</div>
      ) : products.length === 0 ? (
        <div className="text-gray-600">No products found.</div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-3 gap-6">
            {products.map(product => (
              <div key={product._id} className="bg-white shadow-lg rounded-xl p-6 flex flex-col border border-gray-100 hover:shadow-2xl transition-all">
                <div className="font-semibold text-lg mb-2 truncate" title={product.name}>{product.name}</div>
                <div className="text-gray-700 mb-1">Price: <span className="font-bold">{product.price?.toLocaleString?.() ?? product.price}</span> Toman</div>
                <div className="text-gray-500 text-sm mb-2">Stock: {product.stock}</div>
                {product.imageUrl && (
                  <img src={product.imageUrl} alt={product.name} className="h-32 object-contain mb-2 rounded border bg-gray-50" />
                )}
                <div className="text-xs text-gray-400 mb-2">ID: {product._id}</div>
                <div className="flex gap-2 mt-auto">
                  <Link href={`/dashboard/products/edit/${product._id}`} className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 text-center">Edit</Link>
                  <ProductDeleteButton productId={product._id} />
                </div>
              </div>
            ))}
          </div>
          {/* Pagination Controls */}
          <div className="flex justify-center mt-8 gap-2">
            {Array.from({ length: totalPages }, (_, i) => (
              <Link
                key={i + 1}
                href={`?${new URLSearchParams({
                  ...Object.fromEntries(Object.entries(searchParams || {}).filter(([k]) => typeof k === 'string')),
                  page: (i + 1).toString()
                }).toString()}`}
                className={`px-3 py-1 rounded border ${page === i + 1 ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-700 border-gray-300 hover:bg-blue-50'}`}
              >
                {i + 1}
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  );
}