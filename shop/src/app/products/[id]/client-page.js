'use client';
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { FaMinus, FaPlus, FaShoppingCart, FaStar } from 'react-icons/fa';
import { useCart } from '../../context/CartContext';
import { useSession } from 'next-auth/react';
import RelatedProducts from '../../components/RelatedProducts';

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
    <div className="container mx-auto px-4 py-8">
      {/* Best Seller Badge */}
      {product.isBestSeller && (
        <div className="mb-4">
          <span className="bg-green-100 text-green-800 text-sm font-medium px-2.5 py-0.5 rounded">
            پرفروش
          </span>
        </div>
      )}

      <div className="flex flex-col md:flex-row gap-8 mb-12">
        {/* Product Image */}
        <div className="md:w-1/2 bg-white p-4 rounded-lg shadow-md flex justify-center">
          <div className="relative w-full h-96">
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>
        </div>

        {/* Product Details */}
        <div className="md:w-1/2">
          {/* Category Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {product.categories.map((category, index) => (
              <button
                key={index}
                onClick={() => handleCategoryClick(category)}
                className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded hover:bg-blue-200 transition-colors"
              >
                {category}
              </button>
            ))}
          </div>

          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            {product.name}
          </h1>

          {/* Rating */}
          <div className="flex items-center gap-3 mb-4">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <FaStar
                  key={i}
                  className={i < Math.floor(product.rating) ? 'fill-current' : 'text-gray-300'}
                />
              ))}
            </div>
            <span className="text-sm text-gray-500">
              ({product.reviews} نظر)
            </span>
          </div>

          {/* Price */}
          <div className="mb-6">
            {product.discount > 0 ? (
              <div className="flex items-center gap-3">
                <span className="text-lg font-bold text-red-600">
                  {formatPrice(product.price)}
                </span>
                <span className="text-sm text-gray-500 line-through">
                  {formatPrice(product.originalPrice)}
                </span>
                <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded">
                  {product.discount}% تخفیف
                </span>
              </div>
            ) : (
              <span className="text-lg font-bold text-gray-800">
                {formatPrice(product.price)}
              </span>
            )}
          </div>

          {/* Stock Status */}
          <div className="mb-4">
            <span className={`text-sm ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
              {product.stock > 0 ? `موجود در انبار (${product.stock} عدد)` : 'ناموجود'}
            </span>
          </div>

          {/* Quantity Selector */}
          <div className="mb-6">
            <label className="block text-gray-700 mb-2">تعداد:</label>
            <div className="flex items-center gap-2">
              <button
                onClick={handleDecrement}
                className="p-2 bg-gray-200 rounded hover:bg-gray-300 transition-colors"
                aria-label="کاهش تعداد"
                disabled={quantity <= 1}
              >
                <FaMinus />
              </button>
              <input
                type="number"
                min="1"
                max={product.stock}
                value={quantity}
                onChange={handleQuantityChange}
                className="w-16 text-center border border-gray-300 rounded py-2"
                aria-label="تعداد محصول"
              />
              <button
                onClick={handleIncrement}
                className="p-2 bg-gray-200 rounded hover:bg-gray-300 transition-colors"
                aria-label="افزایش تعداد"
                disabled={quantity >= product.stock}
              >
                <FaPlus />
              </button>
            </div>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            disabled={isAddingToCart || product.stock <= 0}
            className={`w-full ${
              isAddingToCart ? 'bg-green-600' : 
              product.stock <= 0 ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
            } text-white py-3 px-4 rounded flex items-center justify-center gap-2 transition-colors mb-6`}
          >
            <FaShoppingCart />
            <span>
              {isAddingToCart ? 'اضافه شد!' : 
               product.stock <= 0 ? 'ناموجود' : `افزودن به سبد خرید (${quantity})`}
            </span>
          </button>

          {/* Product Description */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h2 className="text-lg font-bold mb-2">توضیحات محصول</h2>
            <p className="text-gray-700 whitespace-pre-line">
              {product.description}
            </p>
          </div>

          {/* Dates */}
          <div className="mt-4 text-sm text-gray-500">
            {product.createdAt && (
              <p>تاریخ اضافه شدن: {product.createdAt}</p>
            )}
            {product.updatedAt && (
              <p>آخرین بروزرسانی: {product.updatedAt}</p>
            )}
          </div>
        </div>
      </div>

      {/* Related Products */}
      <RelatedProducts 
        currentProductId={product._id} 
        category={product.categories[0]}
      />
    </div>
  );
}