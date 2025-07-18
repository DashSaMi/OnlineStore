// app/products/page.js
import ProductCard from '../components/ProductCard'
import Link from 'next/link'

async function getProducts() {
  const res = await fetch('http://localhost:3000/api/products')
  if (!res.ok) {
    throw new Error('Failed to fetch products')
  }
  return res.json()
}

export default async function ProductsPage() {
  const products = await getProducts()

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">همه محصولات</h1>
      
     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
  {products.map((product) => (
    <Link key={product.id} href={`/products/${product.id}`}>
      <ProductCard product={product} />
    </Link>
  ))}
</div>
    </div>
  )
}