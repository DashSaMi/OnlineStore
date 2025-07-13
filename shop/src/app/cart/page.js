'use client'
import { useCart } from '../context/CartContext'
import Link from 'next/link'
import Image from 'next/image'
import { FaTrash, FaPlus, FaMinus } from 'react-icons/fa'

export default function CartPage() {
  const {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    totalItems,
    totalPrice,
  } = useCart()

  const formatPrice = (price) => {
    return new Intl.NumberFormat('fa-IR', {
      style: 'currency',
      currency: 'IRR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price)
  }

  const handleIncrement = (productId) => {
    const product = cart.find(item => item._id === productId)
    if (product) {
      updateQuantity(productId, product.quantity + 1)
    }
  }

  const handleDecrement = (productId) => {
    const product = cart.find(item => item._id === productId)
    if (product) {
      updateQuantity(productId, product.quantity - 1)
    }
  }

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold mb-4">سبد خرید شما خالی است</h1>
        <Link
          href="/products"
          className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          بازگشت به محصولات
        </Link>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8">سبد خرید ({totalItems} آیتم)</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {cart.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-lg shadow-md p-4 mb-4 flex flex-col sm:flex-row gap-4"
            >
              <div className="relative w-full sm:w-32 h-32">
                <Image
                  src={item.imageUrl || '/placeholder-product.jpg'}
                  alt={item.name}
                  fill
                  className="object-contain"
                  sizes="100px"
                />
              </div>
              <div className="flex-grow">
                <h2 className="text-lg font-semibold">{item.name}</h2>
                <div className="flex items-center gap-4 my-2">
                  <span className="text-lg font-bold text-red-600">
                    {formatPrice(item.price)}
                  </span>
                  {item.discount > 0 && (
                    <span className="text-sm text-gray-500 line-through">
                      {formatPrice(item.originalPrice)}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2 mt-4">
                  <button
                    onClick={() => handleDecrement(item._id)}
                    className="p-1 bg-gray-200 rounded hover:bg-gray-300"
                    disabled={item.quantity <= 1}
                  >
                    <FaMinus size={12} />
                  </button>
                  <span className="w-8 text-center">{item.quantity}</span>
                  <button
                    onClick={() => handleIncrement(item._id)}
                    className="p-1 bg-gray-200 rounded hover:bg-gray-300"
                  >
                    <FaPlus size={12} />
                  </button>
                  <button
                    onClick={() => removeFromCart(item._id)}
                    className="p-1 bg-red-100 text-red-600 rounded hover:bg-red-200 ml-auto"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 h-fit">
          <h2 className="text-xl font-bold mb-4">خلاصه سفارش</h2>
          <div className="flex justify-between mb-2">
            <span>تعداد کالاها:</span>
            <span>{totalItems}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span>جمع کل:</span>
            <span>{formatPrice(totalPrice)}</span>
          </div>
          <div className="flex justify-between font-bold text-lg mt-4 mb-6">
            <span>مبلغ قابل پرداخت:</span>
            <span className="text-red-600">{formatPrice(totalPrice)}</span>
          </div>
          <button className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg font-medium transition-colors">
            پرداخت
          </button>
          <button
            onClick={clearCart}
            className="w-full mt-2 bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded-lg font-medium transition-colors"
          >
            پاک کردن سبد خرید
          </button>
        </div>
      </div>
    </div>
  )
}