// app/products/category/[category]/page.js
import React from 'react';
import ProductCard from '../../../components/ProductCard'; // Update this path if different
import FilterSidebar from '../../../components/FilterSidebar'; // You'll create this below

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
    <div className="p-4 flex flex-col lg:flex-row gap-6">
      {/* Product List */}
      <div className="flex-1">
        <h1 className="text-xl font-bold mb-4">محصولات در دسته "{category}"</h1>

        {products.length === 0 ? (
          <p>محصولی یافت نشد.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {products.map(product => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>

      {/* Filter Sidebar */}
      <div className="w-full lg:w-64">
        <FilterSidebar category={category} />
      </div>
    </div>
  );
}
