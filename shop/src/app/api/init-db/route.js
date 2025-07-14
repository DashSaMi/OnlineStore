// app/api/init-db/route.js
import clientPromise from '@/lib/mongodb';

export async function GET() {
  const client = await clientPromise;
  const db = client.db(process.env.MONGODB_DB_NAME);
  
  await db.createCollection('users');
  await db.createCollection('accounts');
  await db.createCollection('sessions');
  await db.createCollection('verificationTokens');
  
  return Response.json({ success: true });
}