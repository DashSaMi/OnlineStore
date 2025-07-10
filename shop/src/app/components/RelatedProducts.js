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
        if (!category) {
          setRelatedProducts([]);
          setLoading(false);
          return;
        }

        const url = new URL('/api/products/related', window.location.origin);
        url.searchParams.append('currentProductId', currentProductId);
        url.searchParams.append('category', category);

        const response = await fetch(url.toString());
        
        if (!response.ok) {
          throw new Error('Failed to fetch related products');
        }
        
        const data = await response.json();
        setRelatedProducts(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Error fetching related products:', error);
        setError(error.message);
        setRelatedProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchRelatedProducts();
  }, [currentProductId, category]);

  if (loading) return <div className="text-center py-4">در حال بارگذاری...</div>;
  if (error) return <div className="text-center py-4 text-red-500">خطا: {error}</div>;
  if (!Array.isArray(relatedProducts) || relatedProducts.length === 0) return null;

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold mb-6">محصولات مشابه</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {relatedProducts.map((product) => (
          <div key={product._id}>
            <Link href={`/products/${product._id}`} passHref>
              <ProductCard product={product} />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}