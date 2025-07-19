///components/Navbar.js
'use client';
import { useSession, signIn, signOut } from 'next-auth/react';
import Link from 'next/link';
import { FaShoppingCart, FaUser, FaSignOutAlt, FaHome, FaBoxOpen, FaClipboardList } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const { data: session } = useSession();
  const router = useRouter();
  const { totalItems } = useCart();

  const handleSignIn = async () => {
    const result = await signIn('google', { 
      redirect: false,
      callbackUrl: '/' 
    });
    if (result?.url) {
      router.push(result.url);
    }
  };

  return (
    <header className="glass border-b border-white/10 py-4 px-6 sticky top-0 z-50 backdrop-blur-lg">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo with fixed visibility */}
        <Link href="/" className="text-2xl font-bold text-white hover:text-purple-300 transition-colors duration-300">
          فروشگاه جادویی
        </Link>

        <div className="flex items-center gap-6">
          {/* Main Navigation Links */}
          <nav className="hidden md:flex items-center gap-6">
            <Link 
              href="/" 
              className="flex items-center gap-2 text-gray-200 hover:text-purple-300 transition-colors duration-300 px-4 py-2 rounded-lg hover:bg-white/10"
            >
              <FaHome className="text-lg" />
              <span>خانه</span>
            </Link>
            <Link 
              href="/products" 
              className="flex items-center gap-2 text-gray-200 hover:text-cyan-300 transition-colors duration-300 px-4 py-2 rounded-lg hover:bg-white/10"
            >
              <FaBoxOpen className="text-lg" />
              <span>محصولات</span>
            </Link>
            {session && (
              <Link 
                href="/orders" 
                className="flex items-center gap-2 text-gray-200 hover:text-yellow-300 transition-colors duration-300 px-4 py-2 rounded-lg hover:bg-white/10"
              >
                <FaClipboardList className="text-lg" />
                <span>سفارشات من</span>
              </Link>
            )}
          </nav>

          {/* User Actions */}
          <div className="flex items-center gap-4">
            {session ? (
              <>
                {/* Cart with fixed badge positioning */}
                <Link 
                  href="/cart" 
                  className="relative p-3 text-gray-200 hover:text-purple-300 transition-all duration-300 rounded-full hover:bg-white/10 hover:scale-110"
                >
                  <FaShoppingCart className="text-xl" />
                  {totalItems > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                      {totalItems}
                    </span>
                  )}
                </Link>
                
                {/* User Profile */}
                <div className="flex items-center gap-3">
                  {session.user?.image && (
                    <div className="relative group">
                      <img
                        src={session.user.image}
                        alt="Profile"
                        className="w-10 h-10 rounded-full border-2 border-purple-400 hover:border-cyan-400 transition-all duration-300 hover:scale-110"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  )}
                  
                  {/* User name */}
                  <div className="hidden md:block">
                    <span className="text-gray-200 font-medium">
                      {session.user?.name || 'کاربر جادویی'}
                    </span>
                  </div>
                </div>
                
                {/* Sign Out Button */}
                <button
                  onClick={() => signOut({ callbackUrl: '/' })}
                  className="p-3 text-gray-200 hover:text-red-400 transition-all duration-300 rounded-full hover:bg-white/10 hover:scale-110"
                  title="خروج"
                >
                  <FaSignOutAlt className="text-xl" />
                </button>
              </>
            ) : (
              /* Sign In Button */
              <button
                onClick={handleSignIn}
                className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white px-6 py-3 rounded-full font-medium transition-all duration-300 transform hover:scale-105"
              >
                <FaUser className="text-lg" />
                <span>ورود</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}