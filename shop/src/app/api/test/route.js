import { getDatabase } from '@/lib/mongodb';

export async function GET() {
  try {
    const { products, users } = await getDatabase();

    const allProducts = await products.find({}).toArray();
    const allUsers = await users.find({}).toArray();

    return new Response(JSON.stringify({ products: allProducts, users: allUsers }), {
      headers: { 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (error) {
    return new Response('Internal Server Error', { status: 500 });
  }
}
