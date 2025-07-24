// app/auth/signin/page.js
'use client';
import { signIn } from 'next-auth/react';

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">ورود به حساب کاربری</h1>
        <button
          onClick={() => signIn('google')}
          className="w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition-colors"
        >
          ورود با گوگل
        </button>
      </div>
    </div>
  );
}