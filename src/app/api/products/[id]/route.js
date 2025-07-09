import connectToDatabase from '../../../lib/mongodb';
import Product from '../../../models/product';

export async function GET(request, { params }) {
  try {
    await connectToDatabase();
    
    const product = await Product.findOne({ id: Number(params.id) });
    
    if (!product) {
      return new Response(JSON.stringify({ error: 'Product not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    return new Response(JSON.stringify(product), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
    
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}