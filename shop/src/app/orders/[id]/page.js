'use client';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter, useParams } from 'next/navigation';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { formatPrice } from '@/lib/format';
import Link from 'next/link';
import styles from './OrderPage.module.css';
import { 
  FaArrowRight,
  FaCheckCircle,
  FaClock,
  FaUser,
  FaCalendarAlt,
  FaShoppingCart,
  FaDollarSign,
  FaBoxOpen,
  FaClipboardList,
  FaTimes
} from 'react-icons/fa';

export default function OrderPage() {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { data: session } = useSession();
  const router = useRouter();
  const { id } = useParams();

  const getStatusLabel = (status) => {
    return status === 'complete' ? 'تکمیل شده' : 'در حال پردازش';
  };

  const getStatusClass = (status) => {
    return status === 'complete' ? styles.complete : styles.processing;
  };

  const getStatusIcon = (status) => {
    return status === 'complete' 
      ? <FaCheckCircle className={styles.statusIcon} />
      : <FaClock className={styles.statusIcon} />;
  };

  useEffect(() => {
    if (!session) {
      router.push('/login');
      return;
    }

    const fetchOrder = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(`/api/orders/${id}`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        
        if (!data.success) {
          throw new Error(data.message || 'Failed to fetch order');
        }

        setOrder(data.order);
      } catch (err) {
        console.error('Fetch error:', err);
        setError(err.message);
        toast.error(err.message || 'خطا در دریافت سفارش');
        router.push('/orders');
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id, session, router]);

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingContent}>
          <div className={styles.spinner}></div>
          <p className={styles.loadingText}>در حال دریافت اطلاعات سفارش...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <div className={styles.errorContent}>
          <FaTimes className={styles.errorIcon} />
          <h2 className={styles.errorTitle}>خطا در دریافت سفارش</h2>
          <p className={styles.errorMessage}>{error}</p>
          <Link href="/orders" className={styles.backButton}>
            <FaArrowRight />
            بازگشت به لیست سفارشات
          </Link>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className={styles.errorContainer}>
        <div className={styles.errorContent}>
          <FaClipboardList className={styles.errorIcon} />
          <h2 className={styles.errorTitle}>سفارش یافت نشد</h2>
          <p className={styles.errorMessage}>سفارش مورد نظر وجود ندارد یا حذف شده است.</p>
          <Link href="/orders" className={styles.backButton}>
            <FaArrowRight />
            بازگشت به لیست سفارشات
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.contentWrapper}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.headerContent}>
            <div>
              <h1 className={styles.title}>
                <FaClipboardList className={styles.titleIcon} />
                سفارش #{order._id.substring(0, 8)}
              </h1>
              <p className={styles.subtitle}>جزئیات کامل سفارش مشتری</p>
            </div>
            <Link href="/orders" className={styles.backButton}>
              <FaArrowRight />
              بازگشت به لیست
            </Link>
          </div>
        </div>

        <div className={styles.mainGrid}>
          {/* Main Content */}
          <div>
            {/* Order Status */}
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <h2 className={styles.cardTitle}>
                  <FaCheckCircle />
                  وضعیت سفارش
                </h2>
                <div className={`${styles.statusBadge} ${getStatusClass(order.status)}`}>
                  {getStatusIcon(order.status)}
                  <span>{getStatusLabel(order.status)}</span>
                </div>
              </div>
              <div className={styles.metaInfo}>
                <div className={styles.metaItem}>
                  <FaCalendarAlt />
                  <span>تاریخ سفارش: {new Date(order.createdAt).toLocaleDateString('fa-IR')}</span>
                </div>
                <div className={styles.metaItem}>
                  <FaUser />
                  <span>مشتری: {session?.user?.name || 'کاربر'}</span>
                </div>
              </div>
            </div>

            {/* Products */}
            <div className={styles.card}>
              <h2 className={styles.cardTitle}>
                <FaBoxOpen />
                محصولات سفارش
              </h2>
              <div className={styles.productList}>
                {order.items.map((item, index) => (
                  <div key={index} className={styles.productItem}>
                    <div className={styles.productImage}>
                      {item.imageUrl ? (
                        <img src={item.imageUrl} alt={item.name} />
                      ) : (
                        <FaBoxOpen />
                      )}
                    </div>
                    <div className={styles.productInfo}>
                      <h3 className={styles.productName}>{item.name}</h3>
                      <div className={styles.productMeta}>
                        <span>
                          <FaDollarSign />
                          قیمت واحد: {formatPrice(item.price)}
                        </span>
                        <span>
                          <FaShoppingCart />
                          تعداد: {item.quantity}
                        </span>
                      </div>
                    </div>
                    <div className={styles.productPrice}>
                      {formatPrice(item.price * item.quantity)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div>
            {/* Order Summary */}
            <div className={styles.card}>
              <h2 className={styles.cardTitle}>
                <FaDollarSign />
                خلاصه سفارش
              </h2>
              <div>
                <div className={styles.summaryItem}>
                  <span>تعداد کالاها:</span>
                  <span>{order.items.reduce((sum, item) => sum + item.quantity, 0)} عدد</span>
                </div>
                <div className={styles.summaryItem}>
                  <span>تعداد محصولات:</span>
                  <span>{order.items.length} نوع</span>
                </div>
                <div className={styles.totalPrice}>
                  <span className={styles.totalPriceLabel}>مبلغ قابل پرداخت:</span>
                  <span className={styles.totalPriceValue}>
                    {formatPrice(order.totalPrice)}
                  </span>
                </div>
              </div>
            </div>

            {/* Order Timeline */}
            <div className={styles.card}>
              <h3 className={styles.cardTitle}>تاریخچه سفارش</h3>
              <div className={styles.timeline}>
                <div className={styles.timelineItem}>
                  <div className={`${styles.timelineDot} ${styles.green}`}></div>
                  <div className={styles.timelineContent}>
                    <h4>سفارش ثبت شد</h4>
                    <p>{new Date(order.createdAt).toLocaleDateString('fa-IR')}</p>
                  </div>
                </div>
                <div className={styles.timelineItem}>
                  <div className={`${styles.timelineDot} ${styles.blue}`}></div>
                  <div className={styles.timelineContent}>
                    <h4>در حال پردازش</h4>
                    <p>در حال بررسی سفارش</p>
                  </div>
                </div>
                {order.status === 'complete' && (
                  <div className={styles.timelineItem}>
                    <div className={`${styles.timelineDot} ${styles.green}`}></div>
                    <div className={styles.timelineContent}>
                      <h4>تکمیل شد</h4>
                      <p>سفارش با موفقیت تکمیل شد</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}