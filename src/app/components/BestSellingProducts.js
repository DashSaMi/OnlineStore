// components/BestSellingProducts.js
'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import ProductCard from './ProductCard'

export default function BestSellingProducts() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products')
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        const data = await response.json()
        setProducts(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  if (loading) return <div className="text-center py-12">در حال بارگذاری...</div>
  if (error) return <div className="text-center py-12 text-red-500">خطا در بارگذاری محصولات: {error}</div>

  return (
    <section className="py-12 px-4 bg-gray-50">
      <div className="container mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">محصولات پر فروش</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            پرفروش ترین محصولات ما را با بهترین قیمت و کیفیت بالا تجربه کنید
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {products.map((product) => (
            <Link 
              key={product.id} 
              href={`/products/${product.id}`}
              className="hover:scale-[1.02] transition-transform"
            >
              <ProductCard product={product} />
            </Link>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-10">
          <Link
            href="/products"
            className="inline-block border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-6 py-2 rounded-lg font-medium transition-colors"
          >
            مشاهده همه محصولات
          </Link>
        </div>
      </div>
    </section>
  )
}