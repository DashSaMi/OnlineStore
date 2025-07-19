// app/products/page.js
import ProductCard from '../components/ProductCard';
import Link from 'next/link';
import { FaMagic, FaBoxOpen, FaStar, FaCrown } from 'react-icons/fa';

async function getProducts() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products`, {
    next: { revalidate: 60 }
  });
  
  if (!res.ok) {
    throw new Error('Failed to fetch products');
  }
  return res.json();
}

export default async function ProductsPage() {
  try {
    const response = await getProducts();
    
    // Ensure products is always an array
    const products = Array.isArray(response) ? response : 
                    Array.isArray(response?.data) ? response.data : [];
    
    if (products.length === 0) {
      return (
        <div className="min-h-screen relative py-16 px-4">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/5 via-transparent to-cyan-900/5"></div>
          <div className="container mx-auto text-center relative z-10">
            <div className="glass rounded-3xl p-12 max-w-lg mx-auto">
              <FaBoxOpen className="text-purple-400 text-6xl mx-auto mb-6 animate-pulse" />
              <h1 className="text-4xl font-bold text-white mb-6">
                همه محصولات
              </h1>
              <p className="text-gray-400 text-lg mb-8">محصولی یافت نشد</p>
              <Link 
                href="/" 
                className="inline-block bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white px-8 py-3 rounded-full font-bold transition-all duration-300 transform hover:scale-105"
              >
                بازگشت به خانه
              </Link>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-screen relative py-16 px-4">
        {/* Magical background overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/5 via-transparent to-cyan-900/5"></div>
        
        <div className="container mx-auto relative z-10">
          {/* Header with magical styling */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <FaBoxOpen className="text-purple-400 text-3xl animate-pulse" />
              <h1 className="text-4xl md:text-5xl font-bold text-white">
                همه محصولات
              </h1>
              <FaBoxOpen className="text-cyan-400 text-3xl animate-pulse" />
            </div>
            <p className="text-xl text-gray-300 mb-6">مجموعه کامل محصولات جادویی ما</p>
            
            {/* Magical divider */}
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="w-16 h-1 bg-gradient-to-r from-transparent to-purple-500 rounded-full"></div>
              <FaStar className="text-purple-400 text-xl animate-pulse" />
              <div className="w-16 h-1 bg-gradient-to-l from-transparent to-cyan-500 rounded-full"></div>
            </div>
          </div>

          {/* Products count and stats */}
          <div className="glass rounded-2xl p-6 mb-8 max-w-2xl mx-auto">
            <div className="flex items-center justify-center gap-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-400">{products.length}</div>
                <div className="text-gray-400 text-sm">کل محصولات</div>
              </div>
              <div className="w-px h-8 bg-white/20"></div>
              <div className="text-center">
                <div className="text-2xl font-bold text-cyan-400">
                  {products.filter(p => p.isBestSeller).length}
                </div>
                <div className="text-gray-400 text-sm">پرفروش</div>
              </div>
              <div className="w-px h-8 bg-white/20"></div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-400">100%</div>
                <div className="text-gray-400 text-sm">کیفیت</div>
              </div>
            </div>
          </div>
          
          {/* Products grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.map((product, index) => (
              <div 
                key={product._id}
                className="hover:scale-[1.02] transition-transform duration-500"
                style={{animationDelay: `${index * 0.05}s`}}
              >
                <Link 
                  href={`/products/${product._id}`}
                  className="block"
                >
                  <ProductCard product={product} />
                </Link>
              </div>
            ))}
          </div>

          {/* Bottom magical section */}
          <div className="mt-16 text-center">
            <div className="glass rounded-3xl p-8 max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold text-gray-200 mb-6 flex items-center justify-center gap-3">
                <FaCrown className="text-yellow-400" />
                تجربه خرید جادویی
                <FaCrown className="text-yellow-400" />
              </h3>
              <p className="text-gray-300 mb-6 leading-relaxed">
                تمام محصولات ما با کیفیت افسانه‌ای و قیمت‌های جادویی ارائه می‌شوند. 
                تجربه‌ای منحصر به فرد از خرید آنلاین را با ما تجربه کنید.
              </p>
              <div className="flex items-center justify-center gap-6">
                <div className="flex items-center gap-2 text-purple-400">
                  <FaStar className="text-lg" />
                  <span className="text-sm">کیفیت تضمینی</span>
                </div>
                <div className="flex items-center gap-2 text-cyan-400">
                  <FaStar className="text-lg" />
                  <span className="text-sm">تحویل سریع</span>
                </div>
                <div className="flex items-center gap-2 text-yellow-400">
                  <FaStar className="text-lg" />
                  <span className="text-sm">پشتیبانی 24/7</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    return (
      <div className="min-h-screen relative py-16 px-4">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/5 via-transparent to-cyan-900/5"></div>
        <div className="container mx-auto text-center relative z-10">
          <div className="glass rounded-3xl p-12 max-w-lg mx-auto">
            <FaMagic className="text-red-400 text-6xl mx-auto mb-6 animate-pulse" />
            <h1 className="text-4xl font-bold text-white mb-6">
              همه محصولات
            </h1>
            <p className="text-red-400 text-lg mb-8">{error.message}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="bg-gradient-to-r from-purple-600 to-cyan-600 text-white px-8 py-3 rounded-full font-bold transition-all duration-300 transform hover:scale-105"
            >
              تلاش مجدد
            </button>
          </div>
        </div>
      </div>
    );
  }
}