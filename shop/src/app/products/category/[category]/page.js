// app/products/category/[category]/page.js
import Link from 'next/link';
import ProductCard from '../../../components/ProductCard';
import FilterPanel from '../../../components/FilterPanel';
import SearchBox from '../../../components/SearchBox';

async function getFilteredProducts(category, searchParams) {
  const params = new URLSearchParams();
  
  if (searchParams.minPrice) params.append('minPrice', searchParams.minPrice);
  if (searchParams.maxPrice) params.append('maxPrice', searchParams.maxPrice);
  if (searchParams.search) params.append('search', searchParams.search);
  if (searchParams.rating) params.append('rating', searchParams.rating);

  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/products/filter?category=${encodeURIComponent(category)}&${params.toString()}`;
  
  const res = await fetch(url, {
    next: { revalidate: 60 }
  });
  
  if (!res.ok) {
    throw new Error('Failed to fetch products');
  }
  return res.json();
}

export default async function CategoryPage({ params, searchParams }) {
  const { category } = params;
  const products = await getFilteredProducts(category, searchParams);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">
        محصولات دسته‌بندی: {decodeURIComponent(category)}
      </h1>
      
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/4">
          <FilterPanel currentCategory={category} />
        </div>

        <div className="md:w-3/4">
          <SearchBox currentCategory={category} />
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {products?.length > 0 ? (
              products.map((product) => (
                <div key={product._id}>
                  <Link 
                    href={`/products/${product._id}`} 
                    className="block hover:scale-[1.02] transition-transform"
                  >
                    <ProductCard product={product} />
                  </Link>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p>محصولی یافت نشد</p>
                <Link 
                  href={`/products/category/${category}`}
                  className="text-blue-600 hover:underline mt-2 inline-block"
                >
                  حذف فیلترها
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}