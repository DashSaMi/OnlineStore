'use client';

import { CartProvider } from '../context/CartContext';
import { ThemeProvider } from '../context/ThemeContext';
import { SessionProvider } from 'next-auth/react';

export default function Providers({ children }) {
  return (
    <ThemeProvider>
      <SessionProvider>
        <CartProvider>
          {children}
        </CartProvider>
      </SessionProvider>
    </ThemeProvider>
  );
} 