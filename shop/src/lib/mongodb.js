import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB_NAME || 'SamanOnlineShop';
const options = {};

let client;
let clientPromise;

if (!uri) throw new Error('Please add your Mongo URI');

if (process.env.NODE_ENV === 'development') {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export async function getDatabase() {
  try {
    const client = await clientPromise;
    const db = client.db(dbName);

    // Verify connection and collection
    await db.command({ ping: 1 });
    const collections = await db.listCollections().toArray();

    if (!collections.some(col => col.name === 'products')) {
      console.warn('Products collection not found - creating it');
      await db.createCollection('products');
    }

    return {
      db,
      products: db.collection('products'),
      client
    };
  } catch (error) {
    console.error('Database connection error:', error);
    throw error;
  }
}

export const connectToDatabase = getDatabase;
export default clientPromise;