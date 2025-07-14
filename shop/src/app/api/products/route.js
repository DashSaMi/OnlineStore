import { getDatabase } from '@/lib/mongodb';

export async function GET(request) {
  try {
    const { products } = await getDatabase();
    const { searchParams } = new URL(request.url);
    const bestSellers = searchParams.get('bestSellers');
    
    const query = bestSellers === 'true' ? { isBestSeller: true } : {};
    const results = await products.find(query).limit(10).toArray();
    
    return Response.json(results.map(product => ({
      ...product,
      _id: product._id.toString()
    })));
  } catch (error) {
    return Response.json(
      { error: error.message },
      { status: 500 }
    );
  }
}