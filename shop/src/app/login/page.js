// app/login/page.js
'use client';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { FaMagic, FaStar, FaCrown, FaUser, FaLock } from 'react-icons/fa';

export default function LoginPage() {
  const router = useRouter();

  const handleSignIn = async () => {
    await signIn('google', { callbackUrl: '/' });
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center py-16 px-4">
      {/* Magical background overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 via-transparent to-cyan-900/10"></div>
      
      {/* Floating magical particles */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-4 h-4 bg-purple-400 rounded-full animate-pulse float"></div>
        <div className="absolute top-40 right-20 w-3 h-3 bg-cyan-400 rounded-full animate-pulse float" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-20 left-1/4 w-2 h-2 bg-pink-400 rounded-full animate-pulse float" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 right-1/3 w-3 h-3 bg-yellow-400 rounded-full animate-pulse float" style={{animationDelay: '3s'}}></div>
        <div className="absolute bottom-1/3 left-1/3 w-2 h-2 bg-green-400 rounded-full animate-pulse float" style={{animationDelay: '4s'}}></div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        <div className="glass rounded-3xl p-8 magical-card">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <FaMagic className="text-purple-400 text-3xl animate-pulse" />
              <h1 className="text-3xl font-bold text-white">
                ورود جادویی
              </h1>
              <FaMagic className="text-cyan-400 text-3xl animate-pulse" />
            </div>
            <p className="text-gray-300 text-lg">به دنیای جادویی ما خوش آمدید</p>
            
            {/* Magical divider */}
            <div className="flex items-center justify-center gap-4 mt-6">
              <div className="w-12 h-1 bg-gradient-to-r from-transparent to-purple-500 rounded-full"></div>
              <FaStar className="text-purple-400 text-lg animate-pulse" />
              <div className="w-12 h-1 bg-gradient-to-l from-transparent to-cyan-500 rounded-full"></div>
            </div>
          </div>

          {/* Login Form */}
          <div className="space-y-6">
            {/* Welcome Message */}
            <div className="text-center mb-6">
              <div className="glass rounded-2xl p-4 mb-4">
                <FaCrown className="text-yellow-400 text-2xl mx-auto mb-2" />
                <p className="text-gray-300 text-sm">
                  با ورود به حساب کاربری، به تمام امکانات جادویی دسترسی پیدا کنید
                </p>
              </div>
            </div>

            {/* Google Sign In Button */}
            <button
              onClick={handleSignIn}
              className="w-full bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white py-4 px-6 rounded-xl font-bold transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-3"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.545 10.239v3.821h5.445c-0.712 2.315-2.647 3.972-5.445 3.972-3.332 0-6.033-2.701-6.033-6.032s2.701-6.032 6.033-6.032c1.498 0 2.866 0.549 3.921 1.453l2.814-2.814c-1.786-1.664-4.167-2.676-6.735-2.676-5.522 0-10 4.477-10 10s4.478 10 10 10c8.396 0 10-7.524 10-10 0-0.671-0.068-1.325-0.182-1.977h-9.818z"/>
              </svg>
              <span>ورود با گوگل</span>
            </button>

            {/* Features */}
            <div className="space-y-3 mt-8">
              <div className="flex items-center gap-3 text-gray-300">
                <FaStar className="text-purple-400 text-sm" />
                <span className="text-sm">دسترسی به محصولات ویژه</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <FaStar className="text-cyan-400 text-sm" />
                <span className="text-sm">تخفیف‌های جادویی</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <FaStar className="text-yellow-400 text-sm" />
                <span className="text-sm">پشتیبانی 24/7</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <FaStar className="text-pink-400 text-sm" />
                <span className="text-sm">تحویل سریع و رایگان</span>
              </div>
            </div>

            {/* Footer */}
            <div className="text-center mt-8 pt-6 border-t border-white/20">
              <p className="text-gray-400 text-sm">
                با ورود، شما شرایط و قوانین ما را می‌پذیرید
              </p>
            </div>
          </div>
        </div>

        {/* Bottom magical indicator */}
        <div className="text-center mt-8">
          <div className="flex items-center justify-center gap-2">
            <div className="w-1 h-1 bg-purple-400 rounded-full animate-pulse"></div>
            <div className="w-1 h-1 bg-cyan-400 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
            <div className="w-1 h-1 bg-yellow-400 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
            <div className="w-1 h-1 bg-pink-400 rounded-full animate-pulse" style={{animationDelay: '1.5s'}}></div>
          </div>
        </div>
      </div>
    </div>
  );
}