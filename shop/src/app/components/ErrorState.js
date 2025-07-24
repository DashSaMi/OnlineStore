'use client';

import { FaMagic } from 'react-icons/fa';

export default function ErrorState({ message }) {
  return (
    <div className="min-h-screen relative py-16 px-4">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/5 via-transparent to-cyan-900/5"></div>
      <div className="text-center relative z-10">
        <div className="glass rounded-3xl p-12 max-w-lg mx-auto">
          <FaMagic className="text-red-400 text-6xl mx-auto mb-6 animate-pulse" />
          <h1 className="text-4xl font-bold text-white mb-6">
            همه محصولات
          </h1>
          <p className="text-red-400 text-lg mb-8">{message}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-gradient-to-r from-purple-600 to-cyan-600 text-white px-8 py-3 rounded-full font-bold transition-all duration-300 transform hover:scale-105"
          >
            تلاش مجدد
          </button>
        </div>
      </div>
    </div>
  );
} 