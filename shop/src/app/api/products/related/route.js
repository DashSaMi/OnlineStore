// app/api/products/related/route.js
import { connectToDB } from '@/lib/mongoose';
import Product from '@/models/product/product';
import { Types } from 'mongoose';

export async function GET(request) {
  try {
    await connectToDB();
    
    const { searchParams } = new URL(request.url);
    const category = decodeURIComponent(searchParams.get('category'));
    const exclude = searchParams.get('exclude');

    if (!category) {
      return Response.json([]);
    }

    const excludeId = exclude && Types.ObjectId.isValid(exclude) ? new Types.ObjectId(exclude) : undefined;

    const query = {
      categories: { $in: [category] }
    };
    if (excludeId) {
      query._id = { $ne: excludeId };
    }

    const relatedProducts = await Product.find(query)
      .select('-__v')
      .limit(4)
      .lean();

    return Response.json(relatedProducts);
  } catch (error) {
    console.error('Error:', error);
    return Response.json(
      { 
        error: 'Failed to fetch related products',
        message: error.message
      },
      { status: 500 }
    );
  }
}