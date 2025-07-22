'use client';

import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { useCart } from '../context/CartContext';
import ThemeToggle from './ThemeToggle';
import './navbar.css';
import {
  FaShoppingCart,
  FaUser,
  FaSignOutAlt,
  FaSignInAlt,
  FaClipboardList,
  FaBoxOpen,
  FaHome
} from 'react-icons/fa';

export default function Navbar() {
  const { data: session } = useSession();
  const { cartItems = [] } = useCart();

  const totalItems = cartItems?.reduce((sum, item) => sum + (item.quantity || 0), 0) || 0;

  return (
    <nav className="glass sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-xl font-bold">
              فروشگاه آنلاین
            </Link>
            <Link href="/products" className="magical-button">
              <FaBoxOpen className="h-5 w-5" />
              <span className="hidden sm:inline">محصولات</span>
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <ThemeToggle />

            <Link
              href="/cart"
              className="magical-button cart-button"
            >
              <FaShoppingCart className="h-5 w-5" />
              <span className="hidden sm:inline">سبد خرید</span>
              {totalItems > 0 && (
                <span className="cart-count">
                  {totalItems}
                </span>
              )}
            </Link>

            {session ? (
              <div className="nav-group">
                <Link
                  href="/orders"
                  className="magical-button"
                >
                  <FaClipboardList className="h-5 w-5" />
                  <span className="hidden sm:inline">سفارش‌ها</span>
                </Link>
                <Link
                  href="/profile"
                  className="magical-button"
                >
                  <FaUser className="h-5 w-5" />
                  <span className="hidden sm:inline">پروفایل</span>
                </Link>
                <button
                  onClick={() => signOut()}
                  className="magical-button"
                >
                  <FaSignOutAlt className="h-5 w-5" />
                  <span className="hidden sm:inline">خروج</span>
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="magical-button"
              >
                <FaSignInAlt className="h-5 w-5" />
                <span className="hidden sm:inline">ورود</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}