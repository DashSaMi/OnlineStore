'use client';
import { FaStar, FaShoppingCart, FaMagic, FaCrown } from 'react-icons/fa';
import Image from 'next/image';
import { useCart } from '../context/CartContext';
import { useState } from 'react';
import styles from './ProductCard.module.css';

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
    <div className={styles.card}>
      {/* Magical background glow */}
      <div className={styles.backgroundGlow}></div>
      {/* Best Seller Badge with magical styling */}
      {product.isBestSeller && (
        <div className={styles.bestSellerBadge}>
          <FaCrown />
          <span>پرفروش</span>
        </div>
      )}
      {/* Product Image with magical overlay */}
      <div className={styles.imageWrapper}>
        <Image
          src={product.imageUrl || '/placeholder-product.jpg'}
          alt={product.name || 'تصویر محصول'}
          fill
          className={styles.productImage}
          style={{ background: 'transparent' }}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority
        />
        {/* Magical sparkle effect */}
        <div className={`${styles.sparkle} ${styles.sparkle1}`}></div>
        <div className={`${styles.sparkle} ${styles.sparkle2}`}></div>
        <div className={`${styles.sparkle} ${styles.sparkle3}`}></div>
      </div>
      {/* Product Details */}
      <div className={styles.details}>
        {/* Product Name with magical styling */}
        <h3 className={styles.productName}>
          {product.name}
        </h3>
        {/* Price Section with magical effects */}
        <div className={styles.priceRow}>
          <span className={styles.price}>
            {formatPrice(product.price)}
          </span>
          {product.discount > 0 && (
            <>
              <span className={styles.originalPrice}>
                {formatPrice(product.originalPrice)}
              </span>
              <span className={styles.discountBadge}>
                {product.discount}% تخفیف
              </span>
            </>
          )}
        </div>
        {/* Rating Section with magical stars */}
        <div className={styles.ratingRow}>
          <div className={styles.stars}>
            {[...Array(5)].map((_, i) => (
              <FaStar
                key={i}
                className={i < Math.floor(product.rating || 0) ? styles.filledStar : ''}
                style={{animationDelay: `${i * 0.1}s`}}
              />
            ))}
          </div>
          <span className={styles.reviews}>
            ({product.reviews || 0} نظر)
          </span>
        </div>
        {/* Stock Status with magical indicators */}
        {product.stock > 0 ? (
          <div className={`${styles.stockRow} ${styles.inStock}`}>
            <div className={styles.stockDot}></div>
            <span>موجود در انبار: {product.stock} عدد</span>
          </div>
        ) : (
          <div className={`${styles.stockRow} ${styles.outOfStock}`}>
            <div className={styles.stockDot}></div>
            <span>ناموجود</span>
          </div>
        )}
        {/* Add to Cart Button with magical effects */}
        <button
          onClick={handleAddToCart}
          disabled={isAdding || product.stock <= 0}
          className={styles.addToCartBtn}
        >
          {isAdding ? (
            <>
              <div className="magical-spinner w-5 h-5"></div>
              <span>اضافه شد!</span>
            </>
          ) : product.stock <= 0 ? (
            <>
              <FaMagic />
              <span>ناموجود</span>
            </>
          ) : (
            <>
              <FaShoppingCart />
              <span>افزودن به سبد خرید</span>
            </>
          )}
        </button>
      </div>
      {/* Magical border glow on hover */}
      <div className={styles.borderGlow}></div>
    </div>
  );
}