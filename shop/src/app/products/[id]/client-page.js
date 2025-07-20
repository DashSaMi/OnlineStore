'use client';
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { FaMinus, FaPlus, FaShoppingCart, FaStar } from 'react-icons/fa';
import { useCart } from '../../context/CartContext';
import { useSession } from 'next-auth/react';
import RelatedProducts from '../../components/RelatedProducts';
import { Types } from 'mongoose';

export default function ProductDetailPage({ id: initialId }) {
  const params = useParams();
  const router = useRouter();
  const { data: session } = useSession();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const { addToCart } = useCart();

  const productId = initialId || params.id;

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);
        
        console.log(`Fetching product with ID: ${productId}`);
        const response = await fetch(`/api/products/${productId}`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const result = await response.json();
        console.log('API Response:', result);

        // Handle both direct product object and wrapped response
        const productData = result.data || result;
        
        if (!productData || !productData._id) {
          throw new Error('Invalid product data structure');
        }

        // Transform and validate product data
        const transformedProduct = {
          _id: productData._id,
          id: productData.id,
          name: productData.name || 'نامشخص',
          price: Number(productData.price) || 0,
          originalPrice: Number(productData.originalPrice) || Number(productData.price) || 0,
          discount: Number(productData.discount) || 0,
          rating: Number(productData.rating) || 0,
          reviews: Number(productData.reviews) || 0,
          imageUrl: productData.imageUrl || '/placeholder-product.jpg',
          description: productData.description || 'توضیحاتی برای این محصول موجود نیست.',
          categories: Array.isArray(productData.categories) ? productData.categories : [],
          stock: Number(productData.stock) || 0,
          isBestSeller: Boolean(productData.isBestSeller),
          createdAt: productData.createdAt ? new Date(productData.createdAt).toLocaleString('fa-IR') : null,
          updatedAt: productData.updatedAt ? new Date(productData.updatedAt).toLocaleString('fa-IR') : null
        };

        setProduct(transformedProduct);
      } catch (err) {
        console.error('Failed to load product:', err);
        setError(err.message);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleDecrement = () => setQuantity(prev => Math.max(1, prev - 1));
  const handleIncrement = () => setQuantity(prev => prev + 1);
  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value) || 1;
    setQuantity(Math.max(1, value));
  };

  const handleAddToCart = async () => {
    if (!session) {
      router.push('/login');
      return;
    }

    if (product) {
      setIsAddingToCart(true);
      addToCart(product, quantity);
      setTimeout(() => setIsAddingToCart(false), 1000);
    }
  };

  const handleCategoryClick = (category) => {
    router.push(`/products/category/${encodeURIComponent(category)}`);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('fa-IR', {
      style: 'currency',
      currency: 'IRR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-3/4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-200 h-96 rounded-lg"></div>
            <div className="space-y-4">
              <div className="h-6 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              <div className="h-10 bg-gray-200 rounded w-1/4"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold text-red-500">خطا در بارگذاری محصول</h1>
        <p className="text-gray-600 mb-4">{error}</p>
        <p className="text-sm text-gray-500 mb-4">شناسه محصول: {productId}</p>
        <Link
          href="/products"
          className="text-blue-600 hover:underline mt-4 inline-block"
        >
          بازگشت به صفحه محصولات
        </Link>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold text-red-500">محصول یافت نشد</h1>
        <p className="text-gray-600 mb-4">محصول با شناسه مورد نظر وجود ندارد</p>
        <Link
          href="/products"
          className="text-blue-600 hover:underline mt-4 inline-block"
        >
          بازگشت به صفحه محصولات
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-900 via-gray-900 to-gray-800 container mx-auto px-4 py-8">
      {/* Best Seller Badge */}
      {product.isBestSeller && (
        <div className="mb-4">
          <span className="bg-green-100 text-green-800 text-sm font-medium px-2.5 py-0.5 rounded">
            پرفروش
          </span>
        </div>
      )}

      <div className="flex flex-col md:flex-row gap-10 mb-12">
        {/* Product Image */}
        <div className="md:w-1/2 flex justify-center items-center">
          <div className="relative w-full max-w-md h-96 bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-xl flex items-center justify-center overflow-hidden">
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              className="object-contain drop-shadow-xl"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>
        </div>

        {/* Product Details */}
        <div className="md:w-1/2 flex flex-col justify-center bg-[#18181b] rounded-2xl shadow-lg p-8 text-white">
          {/* Category Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {product.categories.map((category, index) => (
              <button
                key={index}
                onClick={() => handleCategoryClick(category)}
                className="bg-blue-900 text-blue-200 text-xs px-2 py-1 rounded hover:bg-blue-800 transition-colors"
              >
                {category}
              </button>
            ))}
          </div>

          <h1 className="text-3xl font-extrabold text-white mb-3">
            {product.name}
          </h1>

          {/* Rating */}
          <div className="flex items-center gap-3 mb-4">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <FaStar
                  key={i}
                  className={i < Math.floor(product.rating) ? 'fill-current' : 'text-gray-700'}
                />
              ))}
            </div>
            <span className="text-sm text-gray-400">
              ({product.reviews} نظر)
            </span>
          </div>

          {/* Price */}
          <div className="mb-6">
            {product.discount > 0 ? (
              <div className="flex items-center gap-3">
                <span className="text-2xl font-bold text-red-400">
                  {formatPrice(product.price)}
                </span>
                <span className="text-base text-gray-400 line-through">
                  {formatPrice(product.originalPrice)}
                </span>
                <span className="text-xs bg-red-900 text-red-200 px-2 py-1 rounded">
                  {product.discount}% تخفیف
                </span>
              </div>
            ) : (
              <span className="text-2xl font-bold text-white">
                {formatPrice(product.price)}
              </span>
            )}
          </div>

          {/* Stock Status */}
          <div className="mb-4">
            <span className={`text-base ${product.stock > 0 ? 'text-green-400' : 'text-red-400'}`}> 
              {product.stock > 0 ? `موجود در انبار (${product.stock} عدد)` : 'ناموجود'}
            </span>
          </div>

          {/* Quantity Selector & Add to Cart */}
          <div className="mb-8 flex items-center gap-4">
            <div className="flex items-center border border-gray-700 rounded-lg overflow-hidden bg-gray-900">
              <button
                onClick={handleDecrement}
                className="px-3 py-2 bg-gray-800 hover:bg-gray-700 text-lg text-white"
                disabled={quantity <= 1}
              >
                <FaMinus />
              </button>
              <input
                type="number"
                min={1}
                value={quantity}
                onChange={handleQuantityChange}
                className="w-14 text-center border-0 focus:ring-0 focus:outline-none text-lg bg-gray-900 text-white"
              />
              <button
                onClick={handleIncrement}
                className="px-3 py-2 bg-gray-800 hover:bg-gray-700 text-lg text-white"
              >
                <FaPlus />
              </button>
            </div>
            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0 || isAddingToCart}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg text-white font-semibold transition-all shadow-lg ${product.stock === 0 ? 'bg-gray-700 cursor-not-allowed' : 'bg-blue-700 hover:bg-blue-800'}`}
            >
              <FaShoppingCart />
              {isAddingToCart ? 'در حال افزودن...' : 'افزودن به سبد خرید'}
            </button>
          </div>

          {/* Description */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-white mb-2">توضیحات محصول</h2>
            <p className="text-gray-200 leading-relaxed bg-gray-900 rounded-lg p-4 shadow-inner">
              {product.description}
            </p>
          </div>

          {/* Created/Updated */}
          <div className="text-xs text-gray-500 mt-4">
            <span>ایجاد شده: {product.createdAt}</span>
            {product.updatedAt && <span className="ml-4">آخرین بروزرسانی: {product.updatedAt}</span>}
          </div>
        </div>
      </div>

      {/* Related Products */}
      {product.categories && product.categories[0] && (
        <div className="mt-12 bg-[#18181b] rounded-2xl shadow-lg p-8">
          <RelatedProducts category={product.categories[0]} exclude={product._id} />
        </div>
      )}
    </div>
  );
}