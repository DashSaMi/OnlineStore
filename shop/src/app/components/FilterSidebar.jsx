'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

export default function FilterSidebar({ category }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [minPrice, setMinPrice] = useState(searchParams.get('minPrice') || '');
  const [maxPrice, setMaxPrice] = useState(searchParams.get('maxPrice') || '');
  const [rating, setRating] = useState(searchParams.get('rating') || '');

  const applyFilters = () => {
    const params = new URLSearchParams();

    if (minPrice) params.set('minPrice', minPrice);
    if (maxPrice) params.set('maxPrice', maxPrice);
    if (rating) params.set('rating', rating);

    params.set('category', category); // in case we navigate

    router.push(`/products/category/${encodeURIComponent(category)}?${params.toString()}`);
  };

  return (
    <div className="p-4 border rounded shadow bg-white sticky top-24">
      <h2 className="text-lg font-bold mb-4">فیلترها</h2>

      {/* Price Filter */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">قیمت (تومان)</label>
        <div className="flex gap-2">
          <input
            type="number"
            placeholder="حداقل"
            className="w-1/2 p-2 border rounded text-sm"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
          />
          <input
            type="number"
            placeholder="حداکثر"
            className="w-1/2 p-2 border rounded text-sm"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
          />
        </div>
      </div>

      {/* Rating Filter */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">امتیاز</label>
        <select
          className="w-full p-2 border rounded text-sm"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        >
          <option value="">بدون فیلتر</option>
          <option value="3">3 ستاره به بالا</option>
          <option value="4">4 ستاره به بالا</option>
          <option value="5">فقط 5 ستاره</option>
        </select>
      </div>

      <button
        onClick={applyFilters}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded text-sm transition-colors"
      >
        اعمال فیلتر
      </button>
    </div>
  );
}
