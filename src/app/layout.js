// app/layout.js
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { Vazirmatn } from 'next/font/google';
import './globals.css';
import { CartProvider } from './context/CartContext';

// Configure Vazirmatn font
const vazir = Vazirmatn({
  subsets: ['arabic', 'latin'],
  weight: ['400', '500', '700'],
  variable: '--font-vazir',
  adjustFontFallback: false,
});

export const metadata = {
  title: 'فروشگاه آنلاین',
  description: 'فروشگاه اینترنتی ما',
};

export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl" className={`${vazir.variable} font-sans`}>
      <body className="flex flex-col min-h-screen bg-white">
        <CartProvider>
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}