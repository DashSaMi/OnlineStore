// app/api/products/[id]/route.js
import { connectToDatabase } from '../../../../lib/mongodb';
import { ObjectId } from 'mongodb';

export async function GET(request, { params }) {
  try {
    const { db } = await connectToDatabase();
    const { id } = params;

    // Check if the id is a valid MongoDB ObjectId
    if (ObjectId.isValid(id)) {
      const product = await db.collection('products').findOne({ 
        _id: new ObjectId(id) 
      });
      
      if (product) {
        return Response.json({
          ...product,
          _id: product._id.toString()
        });
      }
    }

    // If not found by _id or not a valid ObjectId, try numeric id
    const numericId = Number(id);
    if (!isNaN(numericId)) {
      const product = await db.collection('products').findOne({ 
        id: numericId 
      });
      
      if (product) {
        return Response.json({
          ...product,
          _id: product._id.toString()
        });
      }
    }

    return new Response(JSON.stringify({ error: 'Product not found' }), {
      status: 404,
      headers: { 'Content-Type': 'application/json' }
    });
    
  } catch (error) {
    return new Response(JSON.stringify({ 
      error: error.message 
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}