// app/products/page.js
import ProductCard from '../components/ProductCard';
import Link from 'next/link';

async function getProducts() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products`, {
    next: { revalidate: 60 }
  });
  
  if (!res.ok) {
    throw new Error('Failed to fetch products');
  }
  return res.json();
}

export default async function ProductsPage() {
  try {
    const response = await getProducts();
    
    // Ensure products is always an array
    const products = Array.isArray(response) ? response : 
                    Array.isArray(response?.data) ? response.data : [];
    
    if (products.length === 0) {
      return (
        <div className="container mx-auto px-4 py-8 text-center">
          <h1 className="text-3xl font-bold mb-8">همه محصولات</h1>
          <p className="text-gray-500">محصولی یافت نشد</p>
        </div>
      );
    }

    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8">همه محصولات</h1>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <Link 
              key={product._id} 
              href={`/products/${product._id}`}
              className="hover:scale-[1.02] transition-transform block"
            >
              <ProductCard product={product} />
            </Link>
          ))}
        </div>
      </div>
    );
  } catch (error) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-3xl font-bold mb-8">همه محصولات</h1>
        <p className="text-red-500">{error.message}</p>
      </div>
    );
  }
}