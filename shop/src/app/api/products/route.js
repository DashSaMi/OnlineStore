import { connectToDatabase } from '../../lib/mongodb';
import { ObjectId } from 'mongodb';

export async function GET(request) {
  try {
    const { db } = await connectToDatabase();
    
    const { searchParams } = new URL(request.url);
    const bestSellers = searchParams.get('bestSellers');
    
    const query = bestSellers === 'true' ? { isBestSeller: true } : {};
    
    const products = await db.collection('products').find(query).limit(10).toArray();
    
    // Convert ObjectId to string for client-side
    const serializedProducts = products.map(product => ({
      ...product,
      _id: product._id.toString()
    }));
    
    return Response.json(serializedProducts);
  } catch (error) {
    return Response.json(
      { error: error.message },
      { status: 500 }
    );
  }
} 