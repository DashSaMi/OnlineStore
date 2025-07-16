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
    <header className="bg-white shadow-sm py-4 px-6 sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-gray-800">
          فروشگاه
        </Link>

        <div className="flex items-center gap-6">
          {/* Main Navigation Links */}
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="flex items-center gap-1 text-gray-700 hover:text-blue-600">
              <FaHome className="text-lg" />
              <span>خانه</span>
            </Link>
            <Link href="/products" className="flex items-center gap-1 text-gray-700 hover:text-blue-600">
              <FaBoxOpen className="text-lg" />
              <span>محصولات</span>
            </Link>
            {session && (
              <Link href="/orders" className="flex items-center gap-1 text-gray-700 hover:text-blue-600">
                <FaClipboardList className="text-lg" />
                <span>سفارشات من</span>
              </Link>
            )}
          </nav>

          {/* User Actions */}
          <div className="flex items-center gap-4">
            {session ? (
              <>
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
                </Link>
                
                <div className="flex items-center gap-2">
                  {session.user?.image && (
                    <img
                      src={session.user.image}
                      alt="Profile"
                      className="w-8 h-8 rounded-full"
                      referrerPolicy="no-referrer"
                    />
                  )}
                </div>
                
                <button
                  onClick={() => signOut({ callbackUrl: '/' })}
                  className="p-2 text-gray-700 hover:text-red-600"
                >
                  <FaSignOutAlt className="text-xl" />
                </button>
              </>
            ) : (
              <button
                onClick={handleSignIn}
                className="p-2 text-gray-700 hover:text-blue-600"
              >
                <FaUser className="text-xl" />
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}