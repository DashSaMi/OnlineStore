// app/api/products/related/route.js
import { connectToDatabase } from '../../../lib/mongodb';
import { ObjectId } from 'mongodb';

export async function GET(request) {
  try {
    const { db } = await connectToDatabase();
    const { searchParams } = new URL(request.url);
    
    const currentProductId = searchParams.get('currentProductId');
    const category = searchParams.get('category');

    if (!ObjectId.isValid(currentProductId)) {
      return Response.json({ message: 'Invalid product ID' }, { status: 400 });
    }

    const products = await db.collection('products')
      .find({
        _id: { $ne: new ObjectId(currentProductId) },
        categories: category
      })
      .limit(4)
      .toArray();

    const serializedProducts = products.map(product => ({
      ...product,
      _id: product._id.toString()
    }));
    
    return Response.json(serializedProducts);
  } catch (error) {
    return Response.json({ 
      message: 'Server error', 
      error: error.message 
    }, { status: 500 });
  }
}