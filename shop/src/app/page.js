// app/page.js
import Link from 'next/link'
import BestSellingProducts from './components/BestSellingProducts'
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen relative">
      {/* Hero Section with Fantasy Theme */}
      <section className="relative py-20 px-4 text-center overflow-hidden">
        {/* Magical background overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-pink-900/20"></div>
        
        {/* Floating magical particles */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-4 h-4 bg-purple-400 rounded-full animate-pulse float"></div>
          <div className="absolute top-40 right-20 w-3 h-3 bg-cyan-400 rounded-full animate-pulse float" style={{animationDelay: '1s'}}></div>
          <div className="absolute bottom-20 left-1/4 w-2 h-2 bg-pink-400 rounded-full animate-pulse float" style={{animationDelay: '2s'}}></div>
          <div className="absolute top-1/2 right-1/3 w-3 h-3 bg-yellow-400 rounded-full animate-pulse float" style={{animationDelay: '3s'}}></div>
        </div>

        <div className="relative z-10 container mx-auto">
          <div className="glass rounded-3xl p-8 md:p-12 magical-card">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
              به فروشگاه جادویی ما خوش آمدید
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto mb-8 leading-relaxed">
              بهترین محصولات با کیفیت افسانه‌ای و قیمت‌های جادویی
            </p>
            
            {/* Magical CTA Button */}
            <Link 
              href="/products" 
              className="inline-block bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white font-bold py-4 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105"
            >
              شروع خرید جادویی
            </Link>
          </div>
        </div>
      </section>

      {/* Best Selling Products Section */}
      <div className="relative py-16">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/10 via-transparent to-cyan-900/10"></div>
        <div className="relative z-10">
          <BestSellingProducts />
        </div>
      </div>

      {/* Features Section with Fantasy Theme */}
      <section className="relative py-20 px-4">
        <div className="absolute inset-0 bg-gradient-to-t from-purple-900/5 via-transparent to-pink-900/5"></div>
        
        <div className="container mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              چرا ما را انتخاب کنید؟
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-cyan-500 mx-auto rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="glass rounded-2xl p-8 text-center magical-card group">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Image 
                  src="/delivery-icon.svg" 
                  alt="Fast delivery" 
                  width={40} 
                  height={40} 
                  className="filter brightness-0 invert"
                />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-purple-300">تحویل سریع</h3>
              <p className="text-gray-300 leading-relaxed">تحویل در کمتر از 24 ساعت در تهران با سرعت جادویی</p>
            </div>

            {/* Feature 2 */}
            <div className="glass rounded-2xl p-8 text-center magical-card group">
              <div className="w-20 h-20 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Image 
                  src="/support-icon.svg" 
                  alt="Customer support" 
                  width={40} 
                  height={40} 
                  className="filter brightness-0 invert"
                />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-cyan-300">پشتیبانی 24/7</h3>
              <p className="text-gray-300 leading-relaxed">پشتیبانی آنلاین در تمام ساعات با تیم جادویی ما</p>
            </div>

            {/* Feature 3 */}
            <div className="glass rounded-2xl p-8 text-center magical-card group">
              <div className="w-20 h-20 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Image 
                  src="/guarantee-icon.svg" 
                  alt="Quality guarantee" 
                  width={40} 
                  height={40} 
                  className="filter brightness-0 invert"
                />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-yellow-300">ضمانت کیفیت</h3>
              <p className="text-gray-300 leading-relaxed">گارانتی 18 ماهه برای تمام محصولات با کیفیت افسانه‌ای</p>
            </div>
          </div>
        </div>
      </section>

      {/* Magical Stats Section */}
      <section className="relative py-16 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="glass rounded-xl p-6 text-center magical-card">
              <div className="text-3xl font-bold text-purple-400 mb-2">1000+</div>
              <div className="text-gray-300">محصول جادویی</div>
            </div>
            <div className="glass rounded-xl p-6 text-center magical-card">
              <div className="text-3xl font-bold text-cyan-400 mb-2">5000+</div>
              <div className="text-gray-300">مشتری راضی</div>
            </div>
            <div className="glass rounded-xl p-6 text-center magical-card">
              <div className="text-3xl font-bold text-yellow-400 mb-2">24h</div>
              <div className="text-gray-300">تحویل سریع</div>
            </div>
            <div className="glass rounded-xl p-6 text-center magical-card">
              <div className="text-3xl font-bold text-pink-400 mb-2">100%</div>
              <div className="text-gray-300">رضایت مشتری</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}