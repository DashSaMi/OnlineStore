// app/verify/page.js
'use client';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function VerifyPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'authenticated' && session.user.verified) {
      router.push('/');
    }
  }, [status, session, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">تایید حساب کاربری</h1>
        <p className="text-center mb-6">
          برای دسترسی به سبد خرید و خرید محصولات، لطفاً حساب کاربری خود را تایید کنید.
        </p>
        <button
          onClick={() => signIn('google')}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded flex items-center justify-center gap-2 transition-colors"
        >
          تایید با گوگل
        </button>
      </div>
    </div>
  );
}