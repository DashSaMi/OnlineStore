// app/page.js
import Link from 'next/link'
import BestSellingProducts from './components/BestSellingProducts'
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section (optional) */}
      <section className="bg-blue-50 py-16 px-4 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">به فروشگاه آنلاین ما خوش آمدید</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          بهترین محصولات با کیفیت بالا و قیمت مناسب
        </p>
      </section>

      {/* Best Selling Products Section */}
      <BestSellingProducts />

      {/* Features Section (optional) */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-12">چرا ما را انتخاب کنید؟</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Image 
                  src="/delivery-icon.svg" 
                  alt="Fast delivery" 
                  width={32} 
                  height={32} 
                />
              </div>
              <h3 className="text-xl font-semibold mb-2">تحویل سریع</h3>
              <p className="text-gray-600">تحویل در کمتر از 24 ساعت در تهران</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Image 
                  src="/support-icon.svg" 
                  alt="Customer support" 
                  width={32} 
                  height={32} 
                />
              </div>
              <h3 className="text-xl font-semibold mb-2">پشتیبانی 24/7</h3>
              <p className="text-gray-600">پشتیبانی آنلاین در تمام ساعات</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Image 
                  src="/guarantee-icon.svg" 
                  alt="Quality guarantee" 
                  width={32} 
                  height={32} 
                />
              </div>
              <h3 className="text-xl font-semibold mb-2">ضمانت کیفیت</h3>
              <p className="text-gray-600">گارانتی 18 ماهه برای تمام محصولات</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}