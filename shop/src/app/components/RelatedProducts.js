// components/RelatedProducts.js
'use client';
import { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import Link from 'next/link';

export default function RelatedProducts({ currentProductId, category }) {
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRelatedProducts = async () => {
      try {
        // Add error handling for missing category
        if (!category) {
          setLoading(false);
          return;
        }

        const response = await fetch(
          `/api/products/related?category=${encodeURIComponent(category)}&exclude=${currentProductId}`
        );
        
        if (!response.ok) {
          throw new Error(`Failed to fetch related products: ${response.status}`);
        }
        
        const data = await response.json();
        setRelatedProducts(data);
      } catch (err) {
        console.error('Error fetching related products:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRelatedProducts();
  }, [currentProductId, category]);

  if (loading) return <div className="text-center py-4">در حال بارگذاری...</div>;
  if (error) return <div className="text-center py-4 text-red-500">خطا: {error}</div>;
  if (!relatedProducts?.length) return null;

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold mb-6">محصولات مشابه</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {relatedProducts.map((product) => (
          <Link 
            key={product._id} 
            href={`/products/${product._id}`}
            className="hover:scale-[1.02] transition-transform block"
          >
            <ProductCard product={product} />
          </Link>
        ))}
      </div>
    </div>
  );
}