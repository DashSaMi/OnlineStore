'use client';

import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { useCart } from '../context/CartContext';
import ThemeToggle from './ThemeToggle';
import './navbar.css';
import { useState, useEffect } from 'react';
import {
  FaShoppingCart,
  FaUser,
  FaSignOutAlt,
  FaSignInAlt,
  FaClipboardList,
  FaBoxOpen,
  FaBars,
  FaTimes
} from 'react-icons/fa';

export default function Navbar() {
  const { data: session } = useSession();
  const { cartItems = [] } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Check if dark mode is enabled
    const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setIsDarkMode(darkModeMediaQuery.matches);

    // Listen for changes in system dark mode
    const handleChange = (e) => setIsDarkMode(e.matches);
    darkModeMediaQuery.addEventListener('change', handleChange);

    return () => darkModeMediaQuery.removeEventListener('change', handleChange);
  }, []);

  const totalItems = cartItems?.reduce((sum, item) => sum + (item.quantity || 0), 0) || 0;

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className={`glass ${isDarkMode ? 'dark' : ''} sticky top-0 z-50 shadow-lg font-vazir`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-xl font-bold font-vazir" onClick={closeMenu}>
              فروشگاه آنلاین
            </Link>
            <Link href="/products" className="magical-button md:flex hidden font-vazir" onClick={closeMenu}>
              <FaBoxOpen className="h-5 w-5" />
              <span className="hidden sm:inline">محصولات</span>
            </Link>
          </div>

          <button 
            className="menu-toggle md:hidden"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <FaTimes className="h-6 w-6" />
            ) : (
              <FaBars className="h-6 w-6" />
            )}
          </button>

          <div className={`nav-menu ${isMenuOpen ? 'open' : ''}`}>
            <div className="flex md:flex-row flex-col items-center gap-2">
              <ThemeToggle />

              <Link
                href="/products"
                className="magical-button md:hidden flex font-vazir"
                onClick={closeMenu}
              >
                <FaBoxOpen className="h-5 w-5" />
                <span>محصولات</span>
              </Link>

              <Link
                href="/cart"
                className="magical-button cart-button font-vazir"
                onClick={closeMenu}
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
                <div className="nav-group md:flex-row flex-col">
                  <Link
                    href="/orders"
                    className="magical-button font-vazir"
                    onClick={closeMenu}
                  >
                    <FaClipboardList className="h-5 w-5" />
                    <span className="hidden sm:inline">سفارش‌ها</span>
                  </Link>
                  <Link
                    href="/profile"
                    className="magical-button font-vazir"
                    onClick={closeMenu}
                  >
                    <FaUser className="h-5 w-5" />
                    <span className="hidden sm:inline">پروفایل</span>
                  </Link>
                  <button
                    onClick={() => {
                      closeMenu();
                      signOut();
                    }}
                    className="magical-button font-vazir"
                  >
                    <FaSignOutAlt className="h-5 w-5" />
                    <span className="hidden sm:inline">خروج</span>
                  </button>
                </div>
              ) : (
                <Link
                  href="/login"
                  className="magical-button font-vazir"
                  onClick={closeMenu}
                >
                  <FaSignInAlt className="h-5 w-5" />
                  <span className="hidden sm:inline">ورود</span>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}