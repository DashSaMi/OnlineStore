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
import styles from './ProductDetail.module.css';

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
      <div className={styles.loadingContainer}>
        <div className={styles.loadingSkeleton}>
          <div className={styles.loadingTitle}></div>
          <div className={styles.loadingGrid}>
            <div className={styles.loadingImage}></div>
            <div className={styles.loadingDetails}></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <h1 className={styles.errorTitle}>خطا در بارگذاری محصول</h1>
        <p className={styles.errorMessage}>{error}</p>
        <p className={styles.errorId}>شناسه محصول: {productId}</p>
        <Link href="/products" className={styles.errorBackLink}>
          بازگشت به صفحه محصولات
        </Link>
      </div>
    );
  }

  if (!product) {
    return (
      <div className={styles.errorContainer}>
        <h1 className={styles.errorTitle}>محصول یافت نشد</h1>
        <p className={styles.errorMessage}>محصول با شناسه مورد نظر وجود ندارد</p>
        <Link href="/products" className={styles.errorBackLink}>
          بازگشت به صفحه محصولات
        </Link>
      </div>
    );
  }

  return (
    <div className={styles.detailPageWrapper}>
      {/* Best Seller Badge */}
      {product.isBestSeller && (
        <div className={styles.bestSellerBadgeRow}>
          <span className={styles.bestSellerBadge}>پرفروش</span>
        </div>
      )}
      <div className={styles.detailMainGrid}>
        {/* Product Image */}
        <div className={styles.imageCol}>
          <div className={styles.imageWrapper}>
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              className={styles.productImage}
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>
        </div>
        {/* Product Details */}
        <div className={styles.detailsCol}>
          {/* Category Tags */}
          <div className={styles.categoryTags}>
            {product.categories.map((category, index) => (
              <button
                key={index}
                onClick={() => handleCategoryClick(category)}
                className={styles.categoryTagBtn}
              >
                {category}
              </button>
            ))}
          </div>

          <h1 className={styles.productName}>
            {product.name}
          </h1>

          {/* Rating */}
          <div className={styles.ratingRow}>
            <div className={styles.ratingStars}>
              {[...Array(5)].map((_, i) => (
                <FaStar
                  key={i}
                  className={i < Math.floor(product.rating) ? 'fill-current' : 'text-gray-700'}
                />
              ))}
            </div>
            <span className={styles.ratingReviews}>
              ({product.reviews} نظر)
            </span>
          </div>

          {/* Price */}
          <div className={styles.priceRow}>
            {product.discount > 0 ? (
              <div className={styles.discountPriceRow}>
                <span className={styles.discountPrice}>
                  {formatPrice(product.price)}
                </span>
                <span className={styles.originalPrice}>
                  {formatPrice(product.originalPrice)}
                </span>
                <span className={styles.discountBadge}>
                  {product.discount}% تخفیف
                </span>
              </div>
            ) : (
              <span className={styles.price}>
                {formatPrice(product.price)}
              </span>
            )}
          </div>

          {/* Stock Status */}
          <div className={styles.stockStatusRow}>
            <span className={`${product.stock > 0 ? styles.inStock : styles.outOfStock}`}> 
              {product.stock > 0 ? `موجود در انبار (${product.stock} عدد)` : 'ناموجود'}
            </span>
          </div>

          {/* Quantity Selector & Add to Cart */}
          <div className={styles.quantityAndCartRow}>
            <div className={styles.quantitySelector}>
              <button
                onClick={handleDecrement}
                className={styles.quantityButton}
                disabled={quantity <= 1}
              >
                <FaMinus />
              </button>
              <input
                type="number"
                min={1}
                value={quantity}
                onChange={handleQuantityChange}
                className={styles.quantityInput}
              />
              <button
                onClick={handleIncrement}
                className={styles.quantityButton}
              >
                <FaPlus />
              </button>
            </div>
            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0 || isAddingToCart}
              className={`${styles.addToCartButton} ${product.stock === 0 ? styles.disabledButton : styles.enabledButton}`}
            >
              <FaShoppingCart />
              {isAddingToCart ? 'در حال افزودن...' : 'افزودن به سبد خرید'}
            </button>
          </div>

          {/* Description */}
          <div className={styles.descriptionRow}>
            <h2 className={styles.descriptionTitle}>توضیحات محصول</h2>
            <p className={styles.descriptionText}>
              {product.description}
            </p>
          </div>

          {/* Created/Updated */}
          <div className={styles.createdUpdatedRow}>
            <span>ایجاد شده: {product.createdAt}</span>
            {product.updatedAt && <span className={styles.updatedAtText}>آخرین بروزرسانی: {product.updatedAt}</span>}
          </div>
        </div>
      </div>

      {/* Related Products */}
      {product.categories && product.categories[0] && (
        <div className={styles.relatedProductsSection}>
          <RelatedProducts category={product.categories[0]} exclude={product._id} />
        </div>
      )}
    </div>
  );
}