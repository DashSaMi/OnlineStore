import { getDatabase } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export async function GET(request, { params }) {
  try {
    const { products } = await getDatabase();
    const { id } = params;

    // Try by ObjectId first
    if (ObjectId.isValid(id)) {
      const product = await products.findOne({ _id: new ObjectId(id) });
      if (product) {
        return Response.json({
          ...product,
          _id: product._id.toString()
        });
      }
    }

    // Fallback to numeric ID
    const numericId = Number(id);
    if (!isNaN(numericId)) {
      const product = await products.findOne({ id: numericId });
      if (product) {
        return Response.json({
          ...product,
          _id: product._id.toString()
        });
      }
    }

    return Response.json({ error: 'Product not found' }, { status: 404 });
  } catch (error) {
    return Response.json(
      { error: error.message },
      { status: 500 }
    );
  }
}