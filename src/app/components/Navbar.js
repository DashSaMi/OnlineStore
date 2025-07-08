// components/Navbar.js
'use client'
import Link from 'next/link';
import { FaShoppingCart, FaBars, FaTimes } from 'react-icons/fa';
import { useState } from 'react';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { totalItems } = useCart();

  return (
    <header className="bg-white shadow-sm py-4 px-6 sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo and title */}
        <div className="flex items-center gap-4">
          <Link href="/" className="text-2xl font-bold text-gray-800">
            فروشگاه
          </Link>
          <div className="w-10 h-10 bg-blue-500 rounded"></div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-8">
          <Link href="/" className="text-gray-700 hover:text-blue-600">
            صفحه اصلی
          </Link>
          <Link href="/products" className="text-gray-700 hover:text-blue-600">
            محصولات
          </Link>
          <Link href="/about" className="text-gray-700 hover:text-blue-600">
            درباره ما
          </Link>
          <Link href="/contact" className="text-gray-700 hover:text-blue-600">
            تماس با ما
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-gray-700 focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>

        {/* Shopping Cart with item count */}
        <div className="flex items-center">
          <Link 
            href="/cart" 
            className="p-2 text-gray-700 hover:text-blue-600 relative"
          >
            <FaShoppingCart className="text-xl" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {totalItems}
              </span>
            )}
            <span className="sr-only">سبد خرید</span>
          </Link>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg py-4 px-6">
            <nav className="flex flex-col gap-4">
              <Link href="/" className="text-gray-700 hover:text-blue-600 py-2" onClick={() => setIsOpen(false)}>
                صفحه اصلی
              </Link>
              <Link href="/products" className="text-gray-700 hover:text-blue-600 py-2" onClick={() => setIsOpen(false)}>
                محصولات
              </Link>
              <Link href="/about" className="text-gray-700 hover:text-blue-600 py-2" onClick={() => setIsOpen(false)}>
                درباره ما
              </Link>
              <Link href="/contact" className="text-gray-700 hover:text-blue-600 py-2" onClick={() => setIsOpen(false)}>
                تماس با ما
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}