// app/products/[id]/page.js
'use client';
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { FaMinus, FaPlus, FaShoppingCart } from 'react-icons/fa';
import { useCart } from '../../context/CartContext';
import RelatedProducts from '../../components/RelatedProducts';

export default function ProductDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/products/${id}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch product');
        }
        
        const data = await response.json();
        setProduct(data);
      } catch (err) {
        console.error('Fetch error:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleCategoryClick = (category) => {
    router.push(`/products/category/${encodeURIComponent(category)}`);
  };

  const handleDecrement = () => setQuantity((prev) => Math.max(1, prev - 1));
  const handleIncrement = () => setQuantity((prev) => prev + 1);
  
  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value) || 1;
    setQuantity(Math.max(1, value));
  };

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
      alert(`${quantity} عدد ${product.name} به سبد خرید اضافه شد`);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('fa-IR', {
      style: 'currency',
      currency: 'IRR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  if (loading) return <div className="text-center py-12">در حال بارگذاری...</div>;
  if (error) return <div className="text-center py-12 text-red-500">خطا: {error}</div>;

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold text-red-500">محصول یافت نشد</h1>
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
      <div className="flex flex-col md:flex-row gap-8 mb-12">
        {/* Product Image Section */}
        <div className="md:w-1/2 bg-white p-4 rounded-lg shadow-md flex justify-center">
          <div className="relative w-full h-96">
            <Image
              src={product.imageUrl || '/placeholder-product.jpg'}
              alt={`تصویر ${product.name}`}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>
        </div>

        {/* Product Details Section */}
        <div className="md:w-1/2">
          {/* Category Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {product.categories?.map((category, index) => (
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
                <span key={i}>{i < Math.floor(product.rating) ? '★' : '☆'}</span>
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

          {/* Quantity Selector */}
          <div className="mb-6">
            <label className="block text-gray-700 mb-2">تعداد:</label>
            <div className="flex items-center gap-2">
              <button
                onClick={handleDecrement}
                className="p-2 bg-gray-200 rounded hover:bg-gray-300 transition-colors"
                aria-label="Decrease quantity"
              >
                <FaMinus />
              </button>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={handleQuantityChange}
                className="w-16 text-center border border-gray-300 rounded py-2"
                aria-label="Product quantity"
              />
              <button
                onClick={handleIncrement}
                className="p-2 bg-gray-200 rounded hover:bg-gray-300 transition-colors"
                aria-label="Increase quantity"
              >
                <FaPlus />
              </button>
            </div>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded flex items-center justify-center gap-2 transition-colors mb-6"
          >
            <FaShoppingCart />
            <span>افزودن به سبد خرید ({quantity})</span>
          </button>

          {/* Product Description */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h2 className="text-lg font-bold mb-2">توضیحات محصول</h2>
            <p className="text-gray-700">
              {product.description || 'توضیحاتی برای این محصول موجود نیست.'}
            </p>
          </div>
        </div>
      </div>

      {/* Related Products */}
      <RelatedProducts currentProductId={product._id} category={product.categories?.[0]} />
    </div>
  );
}