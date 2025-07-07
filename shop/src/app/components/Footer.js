// components/Footer.js
import { FaInstagram, FaTelegram, FaTwitter, FaLinkedin } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8 mt-auto">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="text-lg font-semibold mb-4">درباره ما</h3>
            <p className="text-gray-300">
              فروشگاه آنلاین ما با ارائه بهترین محصولات با کیفیت بالا در خدمت شماست.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">لینک های سریع</h3>
            <ul className="space-y-2">
              <li><a href="/" className="text-gray-300 hover:text-white">صفحه اصلی</a></li>
              <li><a href="/products" className="text-gray-300 hover:text-white">محصولات</a></li>
              <li><a href="/about" className="text-gray-300 hover:text-white">درباره ما</a></li>
              <li><a href="/contact" className="text-gray-300 hover:text-white">تماس با ما</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">تماس با ما</h3>
            <address className="text-gray-300 not-italic">
              <p>تهران، خیابان نمونه</p>
              <p>info@example.com</p>
              <p>۰۲۱-۱۲۳۴۵۶۷۸</p>
            </address>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-lg font-semibold mb-4">شبکه های اجتماعی</h3>
            <div className="flex gap-4">
              <a href="#" className="text-gray-300 hover:text-white">
                <FaInstagram className="text-2xl" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                <FaTelegram className="text-2xl" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                <FaTwitter className="text-2xl" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                <FaLinkedin className="text-2xl" />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400">
          <p>© {new Date().getFullYear()} فروشگاه آنلاین. تمام حقوق محفوظ است.</p>
        </div>
      </div>
    </footer>
  );
}