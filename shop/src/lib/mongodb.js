// lib/mongodb.js
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB_NAME || 'SamanOnlineShop';
const options = { /* your options */ };

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
  const client = await clientPromise;
  const db = client.db(dbName);

  return {
    db,
    users: db.collection('users'),
    products: db.collection('products'),
    accounts: db.collection('accounts'),
  };
}

export default clientPromise;
