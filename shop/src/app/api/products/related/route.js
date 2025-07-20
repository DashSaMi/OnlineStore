import { NextResponse } from 'next/server';
import { getDatabase } from '@/lib/mongodb';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const categories = searchParams.getAll('categories');
    const exclude = searchParams.get('exclude');
    const limit = searchParams.get('limit') || 4;

    const { db } = await getDatabase();

    const query = {
      ...(categories?.length > 0 && { categories: { $in: categories } }),
      ...(exclude && { _id: { $ne: exclude } })
    };

    const products = await db
      .collection('products')
      .find(query)
      .limit(parseInt(limit))
      .toArray();

    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}