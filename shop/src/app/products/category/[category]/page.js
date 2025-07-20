// app/products/category/[category]/page.js
import React from 'react';
import ProductCard from '../../../components/ProductCard';
import FilterSidebar from '../../../components/FilterSidebar';
import Link from 'next/link';
import styles from './CategoryPage.module.css';

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
    <div className={styles.categoryPageWrapper}>
      {/* Product List */}
      <div className={styles.productList}>
        <h1 className={styles.categoryTitle}>
          محصولات در دسته "{category}"
        </h1>

        {products.length === 0 ? (
          <div className={styles.noProductsFound}>
            <p>ماژولی یافت نشد</p>
          </div>
        ) : (
          <div className={styles.productGrid}>
            {products.map(product => (
              <Link
                key={product._id}
                href={`/products/${product._id}`}
                className={styles.productCardLink}
                tabIndex={0}
              >
                <div className={styles.productCardHoverMedia}>
                  {product.media && product.media.length > 0 ? (
                    <img 
                      src={product.media[0]} 
                      alt={product.name}
                      className={styles.productCardMediaImg}
                    />
                  ) : null}
                </div>
                <div className={styles.productCardMain}>
                  <ProductCard product={product} />
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Filter Sidebar */}
      <aside className={styles.filterSidebarWrapper}>
        <div className={styles.filterSidebarPanel}>
          <FilterSidebar category={category} />
        </div>
      </aside>
    </div>
  );
}