'use client';
import { signIn, useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const error = searchParams.get('error');

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">ورود به حساب کاربری</h1>
        {error && (
          <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
            خطا در ورود. لطفاً دوباره تلاش کنید.
          </div>
        )}
        <button
          onClick={() => signIn('google')}
          className="w-full bg-red-600 hover:bg-red-700 text-white py-3 px-4 rounded flex items-center justify-center gap-2 transition-colors"
        >

          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12.545 10.239v3.821h5.445c-0.712 2.315-2.647 3.972-5.445 3.972-3.332 0-6.033-2.701-6.033-6.032s2.701-6.032 6.033-6.032c1.498 0 2.866 0.549 3.921 1.453l2.814-2.814c-1.786-1.664-4.167-2.676-6.735-2.676-5.522 0-10 4.477-10 10s4.478 10 10 10c8.396 0 10-7.524 10-10 0-0.671-0.068-1.325-0.182-1.977h-9.818z"/>
          </svg>
          ورود با گوگل
        </button>
      </div>
    </div>
  );
}