// components/ProductCard.js
'use client'
import Link from 'next/link'
import { FaStar, FaShoppingCart } from 'react-icons/fa'
import Image from 'next/image'

export default function ProductCard({ product }) {
  // Format price with Persian locale
  const formatPrice = (price) => {
    return new Intl.NumberFormat('fa-IR', {
      style: 'currency',
      currency: 'IRR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price)
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
      {/* Product Image */}
      <div className="relative h-48 w-full">
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          className="object-contain"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      <div className="p-4 flex flex-col flex-grow">
        {/* Product Name */}
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          {product.name}
        </h3>

        {/* Price and Discount */}
        <div className="flex items-center gap-3 mb-3 mt-auto">
          <span className="text-lg font-bold text-red-600">
            {formatPrice(product.price)}
          </span>
          {product.discount > 0 && (
            <>
              <span className="text-sm text-gray-500 line-through">
                {formatPrice(product.originalPrice)}
              </span>
              <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded">
                {product.discount}% تخفیف
              </span>
            </>
          )}
        </div>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-4">
          <div className="flex text-yellow-400">
            {[...Array(5)].map((_, i) => (
              <FaStar
                key={i}
                className={
                  i < Math.floor(product.rating)
                    ? 'fill-current'
                    : 'fill-gray-300'
                }
              />
            ))}
          </div>
          <span className="text-sm text-gray-500">
            ({product.reviews} نظر)
          </span>
        </div>

        {/* Add to Cart Button */}
        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded flex items-center justify-center gap-2 transition-colors mt-auto">
          <FaShoppingCart />
          <span>افزودن به سبد خرید</span>
        </button>
      </div>
    </div>
  )
}