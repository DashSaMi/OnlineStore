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
        const response = await fetch('/api/products?bestSellers=true')
        
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}))
          throw new Error(errorData.message || 'Failed to fetch products')
        }
        
        const data = await response.json()
        setProducts(data)
      } catch (err) {
        console.error('Fetch error:', err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  if (loading) return <div className="text-center py-12">در حال بارگذاری...</div>
  if (error) return <div className="text-center py-12 text-red-500">خطا: {error}</div>
  
  return (
    <section className="py-12 px-4 bg-gray-50">
      <div className="container mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">محصولات پر فروش</h2>
          <p className="text-gray-600">برترین محصولات با بیشترین فروش</p>
        </div>

        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
        ) : (
          <div className="text-center py-12">
            <p>هیچ محصول پرفروشی یافت نشد</p>
            <Link href="/products" className="text-blue-600 hover:underline mt-2 inline-block">
              مشاهده همه محصولات
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}