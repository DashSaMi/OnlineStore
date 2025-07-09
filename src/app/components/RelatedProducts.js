'use client'
import { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import Link from 'next/link';

export default function RelatedProducts({ currentProductId, category }) {
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRelatedProducts = async () => {
      try {
        const response = await fetch(
          `/api/products/related?currentProductId=${currentProductId}&category=${category}`
        );
        const data = await response.json();
        // Ensure we always set an array, even if the response is invalid
        setRelatedProducts(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Error fetching related products:', error);
        setRelatedProducts([]); // Set to empty array on error
      } finally {
        setLoading(false);
      }
    };

    fetchRelatedProducts();
  }, [currentProductId, category]);

  if (loading) return <div className="text-center py-4">در حال بارگذاری...</div>;
  if (!Array.isArray(relatedProducts) || relatedProducts.length === 0) return null;

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold mb-6">محصولات مشابه</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {relatedProducts.map((product) => (
          <Link key={product.id} href={`/products/${product.id}`}>
            <ProductCard product={product} />
          </Link>
        ))}
      </div>
    </div>
  );
}