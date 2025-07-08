// components/RelatedProducts.js
'use client'
import ProductCard from './ProductCard'
import Link from 'next/link'

export default function RelatedProducts({ products, currentProductId }) {
  // Filter out current product and get 4 random related products
  const relatedProducts = products
    .filter(product => product.id !== currentProductId)
    .slice(0, 4)

  if (relatedProducts.length === 0) return null

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">محصولات مشابه</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {relatedProducts.map((product) => (
          <Link key={product.id} href={`/products/${product.id}`}>
            <ProductCard product={product} />
          </Link>
        ))}
      </div>
    </div> 
  )
}