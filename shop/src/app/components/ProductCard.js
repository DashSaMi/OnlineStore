// components/ProductCard.js
'use client'
import { FaStar, FaShoppingCart } from 'react-icons/fa'
import Image from 'next/image'
import { useCart } from '../context/CartContext'
import { useState } from 'react'

export default function ProductCard({ product }) {
  const { addToCart } = useCart()
  const [isAdding, setIsAdding] = useState(false)

  const formatPrice = (price) => {
    return new Intl.NumberFormat('fa-IR', {
      style: 'currency',
      currency: 'IRR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price)
  }

  const handleAddToCart = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsAdding(true)
    addToCart(product, 1)
    setTimeout(() => setIsAdding(false), 1000)
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
      <div className="relative h-48 w-full">
        <Image
          src={product.imageUrl || '/placeholder-product.jpg'}
          alt={`تصویر ${product.name}`}
          fill
          className="object-contain p-4"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          {product.name}
        </h3>

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

        <button 
          onClick={handleAddToCart}
          className={`w-full ${
            isAdding ? 'bg-green-600' : 'bg-blue-600'
          } hover:bg-blue-700 text-white py-2 px-4 rounded flex items-center justify-center gap-2 transition-colors mt-auto`}
        >
          <FaShoppingCart />
          <span>{isAdding ? 'اضافه شد!' : 'افزودن به سبد خرید'}</span>
        </button>
      </div>
  

    </div>
  )
}