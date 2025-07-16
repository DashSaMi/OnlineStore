'use client';
import { FaStar, FaShoppingCart } from 'react-icons/fa';
import Image from 'next/image';
import { useCart } from '../context/CartContext';
import { useState } from 'react';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const [isAdding, setIsAdding] = useState(false);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('fa-IR', {
      style: 'currency',
      currency: 'IRR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsAdding(true);
    addToCart(product, 1);
    setTimeout(() => setIsAdding(false), 1000);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 h-full flex flex-col border border-gray-200">
      {/* Best Seller Badge */}
      {product.isBestSeller && (
        <div className="absolute top-2 left-2 z-10">
          <span className="bg-green-600 text-white text-xs font-medium px-2 py-0.5 rounded">
            پرفروش
          </span>
        </div>
      )}

      {/* Product Image */}
      <div className="relative h-48 w-full bg-gray-100">
        <Image
          src={product.imageUrl || '/placeholder-product.jpg'}
          alt={product.name || 'تصویر محصول'}
          fill
          className="object-contain p-4"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority
        />
      </div>

      {/* Product Details */}
      <div className="p-4 flex flex-col flex-grow">
        {/* Product Name */}
        <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
          {product.name}
        </h3>

        {/* Price Section */}
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

        {/* Rating Section */}
        <div className="flex items-center gap-1 mb-4">
          <div className="flex text-yellow-400">
            {[...Array(5)].map((_, i) => (
              <FaStar
                key={i}
                className={
                  i < Math.floor(product.rating || 0)
                    ? 'fill-current'
                    : 'text-gray-300'
                }
              />
            ))}
          </div>
          <span className="text-sm text-gray-500">
            ({product.reviews || 0} نظر)
          </span>
        </div>

        {/* Stock Status */}
        {product.stock > 0 ? (
          <div className="text-xs text-green-600 mb-2">
            موجود در انبار: {product.stock} عدد
          </div>
        ) : (
          <div className="text-xs text-red-600 mb-2">ناموجود</div>
        )}

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          disabled={isAdding || product.stock <= 0}
          className={`w-full ${
            isAdding 
              ? 'bg-green-600' 
              : product.stock <= 0 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-blue-600 hover:bg-blue-700'
          } text-white py-2 px-4 rounded flex items-center justify-center gap-2 transition-colors mt-auto`}
        >
          <FaShoppingCart />
          <span>
            {isAdding 
              ? 'اضافه شد!' 
              : product.stock <= 0 
                ? 'ناموجود' 
                : 'افزودن به سبد خرید'
            }
          </span>
        </button>
      </div>
    </div>
  );
}