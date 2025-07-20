'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import styles from './FilterSidebar.module.css';

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
    <div className={styles.sidebar}>
      <h2 className={styles.heading}>فیلترها</h2>
      {/* Price Filter */}
      <div className={styles.filterGroup}>
        <label className={styles.label}>قیمت (تومان)</label>
        <div className={styles.inputRow}>
          <input
            type="number"
            placeholder="حداقل"
            className={styles.input}
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
          />
          <input
            type="number"
            placeholder="حداکثر"
            className={styles.input}
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
          />
        </div>
      </div>
      {/* Rating Filter */}
      <div className={styles.filterGroup}>
        <label className={styles.label}>امتیاز</label>
        <select
          className={styles.select}
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
        className={styles.button}
      >
        اعمال فیلتر
      </button>
    </div>
  );
}
