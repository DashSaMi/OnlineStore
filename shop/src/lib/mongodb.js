import { MongoClient } from 'mongodb';
import mongoose from 'mongoose'; // Add mongoose import

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB_NAME || 'SamanOnlineShop';
const options = { /* your options */ };

// Your existing MongoDB native driver code
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

// Your existing getDatabase function
export async function getDatabase() {
  const client = await clientPromise;
  const db = client.db(dbName);

  return {
    db,
    users: db.collection('users'),
    products: db.collection('products'),
    accounts: db.collection('accounts'),
  };
}

// Add mongoose connection function
export async function connectToDB() {
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  try {
    await mongoose.connect(uri, {
      dbName,
      ...options
    });
    console.log('MongoDB connected via Mongoose');
    return mongoose.connection;
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
}

// Keep your existing default export
export default clientPromise;