'use client';

import { useCart } from '../context/CartContext';
import { useState } from 'react';
import { formatPrice } from '@/lib/format';
import Link from 'next/link';
import Image from 'next/image';
import { FaTrash, FaPlus, FaMinus, FaShoppingCart, FaMagic, FaCrown, FaStar, FaHeart } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';

export default function CartPage() {
  const { cartItems = [], removeFromCart, updateQuantity, clearCart } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const router = useRouter();

  const totalItems = cartItems?.reduce((sum, item) => sum + (item.quantity || 0), 0) || 0;
  const totalPrice = cartItems?.reduce((sum, item) => sum + (item.price * (item.quantity || 0)), 0) || 0;

  const createOrder = async () => {
    try {
      setIsProcessing(true);
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: cartItems.map(item => ({
            _id: item.id,
            name: item.name,
            imageUrl: item.imageUrl,
            quantity: item.quantity,
            price: item.price
          })),
          totalPrice: totalPrice
        }),
      });

      const data = await response.json();

      if (data.success) {
        clearCart();
        router.push(`/orders/${data.orderId}`);
      } else {
        toast.error(data.message || 'خطا در ایجاد سفارش');
      }
    } catch (error) {
      toast.error('خطا در ایجاد سفارش');
      console.error('Error creating order:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="min-h-screen relative py-16 px-4">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/5 via-transparent to-cyan-900/5"></div>
        <div className="container mx-auto text-center relative z-10">
          <div className="glass rounded-3xl p-12 max-w-lg mx-auto">
            <FaShoppingCart className="text-purple-400 text-6xl mx-auto mb-6 animate-pulse" />
            <h1 className="text-4xl font-bold mb-6">
              سبد خرید شما خالی است
            </h1>
            <p className="text-lg mb-8 opacity-80">محصولات جادویی منتظر شما هستند!</p>
            <Link 
              href="/products" 
              className="inline-block bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white px-8 py-3 rounded-full font-bold transition-all duration-300 transform hover:scale-105"
            >
              بازگشت به محصولات
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
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={true}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
        
        {/* Header with magical styling */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <FaShoppingCart className="text-purple-400 text-3xl animate-pulse" />
            <h1 className="text-4xl md:text-5xl font-bold">
              سبد خرید جادویی
            </h1>
            <FaShoppingCart className="text-cyan-400 text-3xl animate-pulse" />
          </div>
          <p className="text-xl opacity-80 mb-6">({totalItems} آیتم جادویی)</p>
          
          {/* Magical divider */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="w-16 h-1 bg-gradient-to-r from-transparent to-purple-500 rounded-full"></div>
            <FaStar className="text-purple-400 text-xl animate-pulse" />
            <div className="w-16 h-1 bg-gradient-to-l from-transparent to-cyan-500 rounded-full"></div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {cartItems.map((item, index) => (
              <div 
                key={item.id}
                className="glass rounded-2xl p-6 magical-card group"
                style={{animationDelay: `${index * 0.1}s`}}
              >
                <div className="flex flex-col sm:flex-row gap-6">
                  {/* Product Image */}
                  <div className="relative w-full sm:w-40 h-40 bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl overflow-hidden">
                    {item.imageUrl ? (
                      <Image
                        src={item.imageUrl}
                        alt={item.name}
                        fill
                        className="object-contain p-4 group-hover:scale-110 transition-transform duration-500"
                        sizes="160px"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <FaShoppingCart className="w-12 h-12 text-gray-400" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-purple-500/20 via-transparent to-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>

                  {/* Product Details */}
                  <div className="flex-grow">
                    <h2 className="text-xl font-bold mb-3 group-hover:text-purple-300 transition-colors duration-300">
                      {item.name}
                    </h2>
                    <div className="flex items-center gap-4 my-3">
                      <span className="text-2xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                        {formatPrice(item.price)}
                      </span>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-3 mt-6">
                      <button
                        onClick={() => updateQuantity(item.id, (item.quantity || 0) - 1)}
                        className="p-2 bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white rounded-lg transition-all duration-300 transform hover:scale-110"
                        disabled={item.quantity <= 1}
                      >
                        <FaMinus size={14} />
                      </button>
                      <span className="w-12 text-center text-lg font-bold bg-white/10 px-3 py-2 rounded-lg">
                        {item.quantity || 0}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, (item.quantity || 0) + 1)}
                        className="p-2 bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white rounded-lg transition-all duration-300 transform hover:scale-110"
                      >
                        <FaPlus size={14} />
                      </button>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="p-2 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white rounded-lg transition-all duration-300 transform hover:scale-110 mr-auto"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="glass rounded-2xl p-8 h-fit magical-card">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <FaCrown className="text-yellow-400" />
              خلاصه سفارش
            </h2>
            
            <div className="space-y-4 mb-6">
              <div className="flex justify-between items-center">
                <span className="opacity-80">تعداد کالاها:</span>
                <span className="text-purple-400 font-bold">{totalItems}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="opacity-80">جمع کل:</span>
                <span className="text-cyan-400 font-bold">{formatPrice(totalPrice)}</span>
              </div>
              <div className="border-t border-white/20 pt-4">
                <div className="flex justify-between items-center">
                  <span className="font-bold">مبلغ قابل پرداخت:</span>
                  <span className="text-2xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                    {formatPrice(totalPrice)}
                  </span>
                </div>
              </div>
            </div>

            <button 
              onClick={createOrder}
              disabled={isProcessing}
              className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white py-4 px-6 rounded-xl font-bold transition-all duration-300 transform hover:scale-105 mb-4 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FaHeart className="text-lg" />
              <span>{isProcessing ? 'در حال پردازش...' : 'انجام فرآیند خرید'}</span>
            </button>
            
            <button
              onClick={clearCart}
              className="w-full bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white py-3 px-6 rounded-xl font-bold transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
            >
              <FaTrash className="text-lg" />
              <span>پاک کردن سبد خرید</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}