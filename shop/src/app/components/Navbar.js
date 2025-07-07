// components/Navbar.js
import Link from 'next/link';
import { FaShoppingCart } from 'react-icons/fa';

export default function Navbar() {
  return (
    <header className="bg-white shadow-sm py-4 px-6 sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo and title on the right (RTL layout) */}
        <div className="flex items-center gap-4">
          <Link href="/" className="text-2xl font-bold text-gray-800">
            فروشگاه
          </Link>
          <div className="w-10 h-10 bg-blue-500 rounded"></div> {/* Logo placeholder */}
        </div>

        {/* Navigation links - center */}
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

        {/* Shopping cart on the left (RTL layout) */}
        <div className="flex items-center">
          <Link href="/cart" className="p-2 text-gray-700 hover:text-blue-600">
            <FaShoppingCart className="text-xl" />
            <span className="sr-only">سبد خرید</span>
          </Link>
        </div>
      </div>
    </header>
  );
}