// app/layout.js
'use client';

import './globals.css';
import { CartProvider } from './context/CartContext';
import { ThemeProvider } from './context/ThemeContext';
import { SessionProvider } from 'next-auth/react';
import { Vazirmatn } from 'next/font/google';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

const vazir = Vazirmatn({
  subsets: ['arabic'],
  variable: '--font-vazir',
  display: 'swap',
});

export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl" className={`${vazir.variable} font-sans`}>
      <body className="flex flex-col min-h-screen">
        <ThemeProvider>
          <SessionProvider>
            <CartProvider>
              <Navbar />
              <main className="flex-grow">{children}</main>
              <Footer />
            </CartProvider>
          </SessionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}