'use client';
import { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import Link from 'next/link';

export default function RelatedProducts({ currentProductId, categories }) {
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRelatedProducts = async () => {
      try {
        if (!categories?.length) {
          setRelatedProducts([]);
          return;
        }

        const params = new URLSearchParams();
        categories.forEach(cat => params.append('categories', cat));
        params.append('exclude', currentProductId);
        params.append('limit', '4');

        const response = await fetch(`/api/products/related?${params.toString()}`);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setRelatedProducts(data);
      } catch (err) {
        console.error('Failed to fetch related products:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRelatedProducts();
  }, [currentProductId, categories]);

  if (loading) return <div className="text-center py-4">در حال بارگذاری محصولات مشابه...</div>;
  
  if (error) return (
    <div className="text-center py-4 text-red-500">
      <p>خطا در دریافت محصولات مشابه</p>
      <p className="text-sm">{error}</p>
      <pre className="text-xs mt-2 text-left bg-gray-100 p-2 rounded">
        {JSON.stringify(debugInfo, null, 2)}
      </pre>
    </div>
  );

  if (!relatedProducts?.length) {
    return (
      <div className="text-center py-4 text-gray-500">
        <p>محصول مشابهی یافت نشد</p>
        <pre className="text-xs mt-2 text-left bg-gray-100 p-2 rounded">
          {JSON.stringify({
            currentProductId,
            categories,
            debugInfo
          }, null, 2)}
        </pre>
      </div>
    );
  }

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