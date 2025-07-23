// components/BestSellingProducts.js
'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import ProductCard from './ProductCard';
import { useCart } from '../context/CartContext';
import { FaCrown, FaMagic, FaStar } from 'react-icons/fa';

export default function BestSellingProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products?bestSellers=true');
        
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        
        const data = await response.json();
        // Filter products where isBestSeller is true
        const bestSellers = data.data.filter(product => product.isBestSeller);
        setProducts(bestSellers);
      } catch (err) {
        console.error('Fetch error:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <section className="relative py-16 px-4">
        <div className="container mx-auto text-center">
          <div className="magical-spinner mx-auto mb-4"></div>
          <p className="text-gray-300 text-lg">در حال بارگذاری محصولات جادویی...</p>
        </div>
      </section>
    );
  }
  
  if (error) {
    return (
      <section className="relative py-16 px-4">
        <div className="container mx-auto text-center">
          <div className="glass rounded-2xl p-8 max-w-md mx-auto">
            <FaMagic className="text-red-400 text-4xl mx-auto mb-4" />
            <p className="text-red-400 text-lg mb-4">خطا: {error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="bg-gradient-to-r from-purple-600 to-cyan-600 text-white px-6 py-2 rounded-full"
            >
              تلاش مجدد
            </button>
          </div>
        </div>
      </section>
    );
  }
  
  return (
    <section className="relative py-16 px-4">
      {/* Magical background overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/5 via-transparent to-cyan-900/5"></div>
      
      <div className="container mx-auto relative z-10">
        {/* Header with magical styling */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <FaCrown className="text-yellow-400 text-3xl animate-pulse" />
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              محصولات پرفروش
            </h2>
            <FaCrown className="text-yellow-400 text-3xl animate-pulse" />
          </div>
          <p className="text-xl text-gray-300 mb-6">محصولات ویژه با بیشترین فروش و کیفیت افسانه‌ای</p>
          
          {/* Magical divider */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="w-16 h-1 bg-gradient-to-r from-transparent to-purple-500 rounded-full"></div>
            <FaStar className="text-purple-400 text-xl animate-pulse" />
            <div className="w-16 h-1 bg-gradient-to-l from-transparent to-cyan-500 rounded-full"></div>
          </div>
        </div>

        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product, index) => (
              <div 
                key={product._id} 
                className="hover:scale-[1.02] transition-transform duration-500"
                style={{animationDelay: `${index * 0.1}s`}}
              >
                <Link href={`/products/${product._id}`} passHref>
                  <ProductCard product={product} />
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="glass rounded-3xl p-12 max-w-lg mx-auto">
              <FaMagic className="text-purple-400 text-6xl mx-auto mb-6 animate-pulse" />
              <h3 className="text-2xl font-bold text-gray-200 mb-4">هیچ محصول پرفروشی یافت نشد</h3>
              <p className="text-gray-400 mb-8">در حال حاضر محصولات پرفروشی در دسترس نیست</p>
              <Link 
                href="/products" 
                className="inline-block bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white px-8 py-3 rounded-full font-bold transition-all duration-300 transform hover:scale-105"
              >
                مشاهده همه محصولات
              </Link>
            </div>
          </div>
        )}

        {/* Magical stats */}
        {products.length > 0 && (
          <div className="mt-16 text-center">
            <div className="glass rounded-2xl p-8 max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold text-gray-200 mb-6">آمار جادویی</h3>
              <div className="grid grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-400 mb-2">{products.length}</div>
                  <div className="text-gray-400">محصول پرفروش</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-cyan-400 mb-2">100%</div>
                  <div className="text-gray-400">کیفیت تضمینی</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-400 mb-2">24h</div>
                  <div className="text-gray-400">تحویل سریع</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}