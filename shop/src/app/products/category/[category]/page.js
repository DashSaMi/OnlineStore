// app/products/category/[category]/page.js
import React from 'react';
import ProductCard from '../../../components/ProductCard';
import FilterSidebar from '../../../components/FilterSidebar';
import Link from 'next/link';

async function getFilteredProducts(category, searchParams) {
  const queryParams = new URLSearchParams();

  queryParams.set('category', decodeURIComponent(category));

  if (searchParams.minPrice) queryParams.set('minPrice', searchParams.minPrice);
  if (searchParams.maxPrice) queryParams.set('maxPrice', searchParams.maxPrice);
  if (searchParams.rating) queryParams.set('rating', searchParams.rating);

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products/filter?${queryParams.toString()}`, {
    cache: 'no-store',
  });

  if (!res.ok) throw new Error('Failed to fetch filtered products');
  return res.json();
}

export default async function CategoryPage({ params, searchParams }) {
  const category = decodeURIComponent(params.category);
  const products = await getFilteredProducts(category, searchParams);

  return (
    <div className="p-4 flex flex-col lg:flex-row gap-8 bg-gradient-to-br from-gray-900 via-gray-950 to-gray-800 min-h-screen">
      {/* Product List */}
      <div className="flex-1 max-w-screen-2xl mx-auto">
        <h1 className="text-2xl font-extrabold mb-6 text-white drop-shadow-lg border-b border-gray-700 pb-2">
          محصولات در دسته "{category}"
        </h1>

        {products.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 bg-gray-900 rounded-xl shadow-inner">
            <p className="text-gray-400 text-lg">محصولی یافت نشد.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-4 w-full">
            {products.map(product => (
              <Link
                key={product._id}
                href={`/products/${product._id}`}
                className="group relative block h-full rounded-2xl overflow-hidden transition-all duration-300 transform hover:scale-[1.02] focus:scale-[1.02] outline-none"
                tabIndex={0}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity duration-300 z-10 rounded-2xl"></div>
                
                {/* Product media that appears on hover/focus */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity duration-300 z-0">
                  {product.media && product.media.length > 0 ? (
                    <img 
                      src={product.media[0]} 
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                      <span className="text-gray-500">No media available</span>
                    </div>
                  )}
                </div>
                
                {/* Main Product Card */}
                <div className="h-full bg-gray-900 rounded-2xl shadow-lg border border-gray-800 overflow-hidden transition-all duration-300 group-hover:shadow-xl group-focus:shadow-xl">
                  <ProductCard product={product} />
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Filter Sidebar */}
      <aside className="w-full lg:w-96 max-w-md lg:sticky top-24 self-start">
        <div className="bg-black rounded-2xl shadow-2xl border border-gray-800 p-8 text-white">
          <FilterSidebar category={category} />
        </div>
      </aside>
    </div>
  );
}