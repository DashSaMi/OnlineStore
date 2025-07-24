// app/api/products/filter/route.js
import { connectToDatabase } from '../../../../lib/mongodb';

export async function GET(request) {
  try {
    const { db } = await connectToDatabase();
    const { searchParams } = new URL(request.url);

    const category = searchParams.get('category');
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');
    const rating = searchParams.get('rating');
    const searchQuery = searchParams.get('search');

    let query = {};

    // Category filter
    if (category) {
      query.categories = decodeURIComponent(category);
    }

    // Price range filter
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    // Rating filter
    if (rating) {
      query.rating = { $gte: Number(rating) };
    }

    // Text search
    if (searchQuery) {
      query.$or = [
        { name: { $regex: searchQuery, $options: 'i' } },
        { description: { $regex: searchQuery, $options: 'i' } },
      ];
    }

    const products = await db.collection('products')
      .find(query)
      .toArray();

    const serializedProducts = products.map(product => ({
      ...product,
      _id: product._id.toString(),
    }));

    return Response.json(serializedProducts);
  } catch (error) {
    return Response.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
