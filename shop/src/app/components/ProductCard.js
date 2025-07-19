'use client';
import { FaStar, FaShoppingCart, FaMagic, FaCrown } from 'react-icons/fa';
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
    <div className="glass rounded-2xl overflow-hidden magical-card group relative border border-white/20">
      {/* Magical background glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      {/* Best Seller Badge with magical styling */}
      {product.isBestSeller && (
        <div className="absolute top-4 left-4 z-20">
          <div className="flex items-center gap-1 bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xs font-bold px-3 py-1.5 rounded-full">
            <FaCrown className="text-yellow-200" />
            <span>پرفروش</span>
          </div>
        </div>
      )}

      {/* Product Image with magical overlay */}
      <div className="relative h-56 w-full bg-gradient-to-br from-gray-900 to-gray-800 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-purple-500/20 via-transparent to-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <Image
          src={product.imageUrl || '/placeholder-product.jpg'}
          alt={product.name || 'تصویر محصول'}
          fill
          className="object-contain p-6 group-hover:scale-110 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority
        />
        
        {/* Magical sparkle effect */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="absolute top-4 right-4 w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
          <div className="absolute bottom-4 left-4 w-1.5 h-1.5 bg-purple-400 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
          <div className="absolute top-1/2 right-1/4 w-1 h-1 bg-cyan-400 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
        </div>
      </div>

      {/* Product Details */}
      <div className="p-6 flex flex-col flex-grow relative z-10">
        {/* Product Name with magical styling */}
        <h3 className="text-xl font-bold text-gray-100 mb-3 line-clamp-2 group-hover:text-purple-300 transition-colors duration-300">
          {product.name}
        </h3>

        {/* Price Section with magical effects */}
        <div className="flex items-center gap-3 mb-4 mt-auto">
          <span className="text-2xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
            {formatPrice(product.price)}
          </span>
          {product.discount > 0 && (
            <>
              <span className="text-sm text-gray-400 line-through">
                {formatPrice(product.originalPrice)}
              </span>
              <span className="text-xs bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1.5 rounded-full font-bold">
                {product.discount}% تخفیف
              </span>
            </>
          )}
        </div>

        {/* Rating Section with magical stars */}
        <div className="flex items-center gap-2 mb-4">
          <div className="flex text-yellow-400">
            {[...Array(5)].map((_, i) => (
              <FaStar
                key={i}
                className={`${
                  i < Math.floor(product.rating || 0)
                    ? 'fill-current animate-pulse'
                    : 'text-gray-600'
                } transition-all duration-300 group-hover:scale-110`}
                style={{animationDelay: `${i * 0.1}s`}}
              />
            ))}
          </div>
          <span className="text-sm text-gray-400">
            ({product.reviews || 0} نظر)
          </span>
        </div>

        {/* Stock Status with magical indicators */}
        {product.stock > 0 ? (
          <div className="flex items-center gap-2 text-sm text-green-400 mb-4">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span>موجود در انبار: {product.stock} عدد</span>
          </div>
        ) : (
          <div className="flex items-center gap-2 text-sm text-red-400 mb-4">
            <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
            <span>ناموجود</span>
          </div>
        )}

        {/* Add to Cart Button with magical effects */}
        <button
          onClick={handleAddToCart}
          disabled={isAdding || product.stock <= 0}
          className={`w-full ${
            isAdding 
              ? 'bg-gradient-to-r from-green-600 to-emerald-600' 
              : product.stock <= 0 
                ? 'bg-gradient-to-r from-gray-600 to-gray-700 cursor-not-allowed' 
                : 'bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700'
          } text-white py-3 px-6 rounded-xl flex items-center justify-center gap-3 transition-all duration-300 transform hover:scale-105 font-bold text-lg`}
        >
          {isAdding ? (
            <>
              <div className="magical-spinner w-5 h-5"></div>
              <span>اضافه شد!</span>
            </>
          ) : product.stock <= 0 ? (
            <>
              <FaMagic className="text-lg" />
              <span>ناموجود</span>
            </>
          ) : (
            <>
              <FaShoppingCart className="text-lg" />
              <span>افزودن به سبد خرید</span>
            </>
          )}
        </button>
      </div>
      
      {/* Magical border glow on hover */}
      <div className="absolute inset-0 rounded-2xl border-2 border-transparent bg-gradient-to-r from-purple-500 via-cyan-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
    </div>
  );
}