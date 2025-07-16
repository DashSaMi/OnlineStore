import { getDatabase } from '@/lib/mongodb';
import { NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';

export const dynamic = 'force-dynamic';

// Helper: transform product to serialize ObjectId and Dates properly
const transformProduct = (product) => {
  if (!product) return null;
  
  const transformed = {
    ...product,
    _id: product._id.toString(),
  };

  // Handle createdAt - ensure it's a valid Date object before conversion
  if (product.createdAt) {
    transformed.createdAt = (product.createdAt instanceof Date || typeof product.createdAt === 'string')
      ? new Date(product.createdAt).toISOString()
      : null;
  } else {
    transformed.createdAt = null;
  }

  // Handle updatedAt - ensure it's a valid Date object before conversion
  if (product.updatedAt) {
    transformed.updatedAt = (product.updatedAt instanceof Date || typeof product.updatedAt === 'string')
      ? new Date(product.updatedAt).toISOString()
      : null;
  } else {
    transformed.updatedAt = null;
  }

  return transformed;
};

// GET - Fetch list of products with filters and pagination
export async function GET(request) {
  try {
    const { db } = await getDatabase();
    const { searchParams } = new URL(request.url);

    // Build filter object
    const filter = {};
    const bestSellers = searchParams.get('bestSellers');
    const category = searchParams.get('category');
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');
    const searchQuery = searchParams.get('search');

    if (bestSellers === 'true') filter.isBestSeller = true;
    if (category) filter.categories = { $in: [category] };

    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    if (searchQuery) {
      filter.$or = [
        { name: { $regex: searchQuery, $options: 'i' } },
        { description: { $regex: searchQuery, $options: 'i' } },
      ];
    }

    // Get pagination and sorting parameters
    const limit = Math.min(parseInt(searchParams.get('limit')) || 10, 100);
    const page = Math.max(parseInt(searchParams.get('page')) || 1, 1);
    const sortField = searchParams.get('sort') || 'createdAt';
    const sortOrder = searchParams.get('order') === 'asc' ? 1 : -1;
    const sort = { [sortField]: sortOrder };

    // Execute queries
    const [products, totalCount] = await Promise.all([
      db
        .collection('products')
        .find(filter)
        .sort(sort)
        .skip((page - 1) * limit)
        .limit(limit)
        .toArray(),
      db.collection('products').countDocuments(filter),
    ]);

    // Transform products before sending response
    const transformedProducts = products.map(transformProduct);

    return NextResponse.json(
      {
        success: true,
        data: transformedProducts,
        pagination: {
          total: totalCount,
          page,
          limit,
          totalPages: Math.ceil(totalCount / limit),
          hasNextPage: page * limit < totalCount,
        },
      },
      {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Cache-Control': 'no-store, max-age=0',
        },
      }
    );
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch products',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined,
      },
      { status: 500 }
    );
  }
}

// POST - Create a new product
export async function POST(request) {
  try {
    const { db } = await getDatabase();
    const productData = await request.json();

    if (!productData.name || productData.price == null) {
      return NextResponse.json(
        { success: false, error: 'Name and price are required' },
        { status: 400 }
      );
    }

    const productDoc = {
      ...productData,
      price: Number(productData.price),
      stock: Number(productData.stock) || 0,
      isBestSeller: Boolean(productData.isBestSeller),
      rating: Number(productData.rating) || 0,
      reviews: Number(productData.reviews) || 0,
      createdAt: new Date(),  // Ensure this is always a Date object
      updatedAt: new Date(),  // Ensure this is always a Date object
    };

    const result = await db.collection('products').insertOne(productDoc);

    return NextResponse.json(
      {
        success: true,
        data: transformProduct({ ...productDoc, _id: result.insertedId }),
      },
      {
        status: 201,
        headers: { 'Access-Control-Allow-Origin': '*' },
      }
    );
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to create product',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined,
      },
      { status: 500 }
    );
  }
}

// PUT - Update existing product
export async function PUT(request) {
  try {
    const { db } = await getDatabase();
    const { _id, ...updateData } = await request.json();

    if (!_id) {
      return NextResponse.json(
        { success: false, error: 'Product ID is required' },
        { status: 400 }
      );
    }

    const updateDoc = {
      $set: {
        ...updateData,
        updatedAt: new Date(),  // Ensure this is always a Date object
      },
    };

    const result = await db.collection('products').updateOne(
      { _id: new ObjectId(_id) },
      updateDoc
    );

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { success: false, error: 'Product not found' },
        { status: 404 }
      );
    }

    const updatedProduct = await db.collection('products').findOne({ _id: new ObjectId(_id) });

    return NextResponse.json(
      {
        success: true,
        data: transformProduct(updatedProduct),
      },
      {
        headers: { 'Access-Control-Allow-Origin': '*' },
      }
    );
  } catch (error) {
    console.error('Error updating product:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to update product',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined,
      },
      { status: 500 }
    );
  }
}

// DELETE - Remove a product
export async function DELETE(request) {
  try {
    const { db } = await getDatabase();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Product ID is required' },
        { status: 400 }
      );
    }

    const result = await db.collection('products').deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { success: false, error: 'Product not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Product deleted successfully',
      },
      {
        headers: { 'Access-Control-Allow-Origin': '*' },
      }
    );
  } catch (error) {
    console.error('Error deleting product:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to delete product',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined,
      },
      { status: 500 }
    );
  }
}