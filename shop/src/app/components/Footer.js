// components/Footer.js
import { FaInstagram, FaTelegram, FaTwitter, FaLinkedin, FaMagic, FaStar, FaHeart } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="glass border-t border-white/10 py-12 mt-auto relative overflow-hidden">
      {/* Magical background particles */}
      <div className="absolute inset-0">
        <div className="absolute bottom-10 left-10 w-3 h-3 bg-purple-400 rounded-full animate-pulse float"></div>
        <div className="absolute bottom-20 right-20 w-2 h-2 bg-cyan-400 rounded-full animate-pulse float" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-10 left-1/4 w-2 h-2 bg-pink-400 rounded-full animate-pulse float" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/3 right-1/3 w-3 h-3 bg-yellow-400 rounded-full animate-pulse float" style={{animationDelay: '3s'}}></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center md:text-right">
          {/* About */}
          <div className="md:border-l md:border-white/20 md:pl-6">
            <h3 className="text-xl font-bold mb-6 text-white flex items-center gap-2">
              <FaMagic className="text-purple-400" />
              درباره ما
            </h3>
            <p className="text-gray-300 leading-relaxed">
              فروشگاه جادویی ما با ارائه بهترین محصولات با کیفیت افسانه‌ای در خدمت شماست. 
              تجربه‌ای جادویی از خرید آنلاین
            </p>
          </div>

          {/* Quick Links */}
          <div className="md:border-l md:border-white/20 md:pl-6">
            <h3 className="text-xl font-bold mb-6 text-white flex items-center gap-2">
              <FaStar className="text-yellow-400" />
              لینک های سریع
            </h3>
            <ul className="space-y-3">
              <li>
                <a href="/" className="text-gray-300 hover:text-purple-300 transition-colors duration-300 px-3 py-1 rounded-lg hover:bg-white/10 inline-block">
                  صفحه اصلی
                </a>
              </li>
              <li>
                <a href="/products" className="text-gray-300 hover:text-cyan-300 transition-colors duration-300 px-3 py-1 rounded-lg hover:bg-white/10 inline-block">
                  محصولات
                </a>
              </li>
              <li>
                <a href="/about" className="text-gray-300 hover:text-yellow-300 transition-colors duration-300 px-3 py-1 rounded-lg hover:bg-white/10 inline-block">
                  درباره ما
                </a>
              </li>
              <li>
                <a href="/contact" className="text-gray-300 hover:text-pink-300 transition-colors duration-300 px-3 py-1 rounded-lg hover:bg-white/10 inline-block">
                  تماس با ما
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="md:border-l md:border-white/20 md:pl-6">
            <h3 className="text-xl font-bold mb-6 text-white flex items-center gap-2">
              <FaHeart className="text-pink-400" />
              تماس با ما
            </h3>
            <address className="text-gray-300 not-italic space-y-2">
              <p className="flex items-center gap-2">
                <span className="text-purple-400">📍</span>
                تهران، خیابان جادویی
              </p>
              <p className="flex items-center gap-2">
                <span className="text-cyan-400">✉️</span>
                info@magicalshop.com
              </p>
              <p className="flex items-center gap-2">
                <span className="text-yellow-400">📞</span>
                ۰۲۱-۱۲۳۴۵۶۷۸
              </p>
            </address>
          </div>

          {/* Social Media */}
          <div className="md:border-l md:border-white/20 md:pl-6">
            <h3 className="text-xl font-bold mb-6 text-white flex items-center gap-2">
              <FaStar className="text-green-400" />
              شبکه های اجتماعی
            </h3>
            <div className="flex justify-center md:justify-start gap-4">
              <a 
                href="#" 
                className="text-gray-300 hover:text-pink-400 transition-all duration-300 transform hover:scale-110 p-3 rounded-full hover:bg-white/10"
                title="اینستاگرام"
              >
                <FaInstagram className="text-2xl" />
              </a>
              <a 
                href="#" 
                className="text-gray-300 hover:text-blue-400 transition-all duration-300 transform hover:scale-110 p-3 rounded-full hover:bg-white/10"
                title="تلگرام"
              >
                <FaTelegram className="text-2xl" />
              </a>
              <a 
                href="#" 
                className="text-gray-300 hover:text-cyan-400 transition-all duration-300 transform hover:scale-110 p-3 rounded-full hover:bg-white/10"
                title="توییتر"
              >
                <FaTwitter className="text-2xl" />
              </a>
              <a 
                href="#" 
                className="text-gray-300 hover:text-purple-400 transition-all duration-300 transform hover:scale-110 p-3 rounded-full hover:bg-white/10"
                title="لینکدین"
              >
                <FaLinkedin className="text-2xl" />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright with magical styling */}
        <div className="border-t border-white/20 mt-12 pt-8 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-1 h-1 bg-purple-400 rounded-full animate-pulse"></div>
            <div className="w-1 h-1 bg-cyan-400 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
            <div className="w-1 h-1 bg-yellow-400 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
            <div className="w-1 h-1 bg-pink-400 rounded-full animate-pulse" style={{animationDelay: '1.5s'}}></div>
          </div>
          <p className="text-gray-400 font-medium">
            © {new Date().getFullYear()} فروشگاه جادویی. تمام حقوق محفوظ است.
          </p>
          <p className="text-gray-500 text-sm mt-2">
            ساخته شده با عشق و جادو
          </p>
        </div>
      </div>
    </footer>
  );
}