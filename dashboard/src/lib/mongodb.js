import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const defaultDbName = process.env.MONGODB_DB_NAME || 'SamanOnlineShop';

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  maxPoolSize: 10,               // Max number of connections in pool
  socketTimeoutMS: 30000,        // Close sockets after 30 seconds of inactivity
  serverSelectionTimeoutMS: 5000,// Try to send operations for 5 seconds
  connectTimeoutMS: 10000,       // Give up initial connection after 10 seconds
};

// Validate environment variables
if (!uri) {
  throw new Error('MongoDB URI is not defined. Please add MONGODB_URI to .env.local');
}

// Global clientPromise to maintain connection during development HMR
let clientPromise;

if (process.env.NODE_ENV === 'development') {
  if (!global._mongoClientPromise) {
    const client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect()
      .then(() => {
        console.log('MongoDB connected successfully');
        return client;
      })
      .catch(err => {
        console.error('MongoDB connection error:', err);
        throw err;
      });
  }
  clientPromise = global._mongoClientPromise;
} else {
  // Production - new client for each deploy/run
  const client = new MongoClient(uri, options);
  clientPromise = client.connect()
    .then(() => {
      console.log('MongoDB connected successfully');
      return client;
    })
    .catch(err => {
      console.error('MongoDB connection error:', err);
      throw err;
    });
}

/**
 * Get a MongoDB database instance
 * @param {string} [dbName] - Optional database name (defaults to MONGODB_DB_NAME or 'SamanOnlineShop')
 * @returns {Promise<{client: MongoClient, db: Db}>} Returns both client and db for flexibility
 */
export async function getDatabase(dbName = defaultDbName) {
  try {
    const client = await clientPromise;
    const db = client.db(dbName);

    // Ping database to verify connection is alive
    await db.command({ ping: 1 });

    return { client, db };
  } catch (error) {
    console.error('Failed to get database instance:', error);
    throw new Error('Database connection failed');
  }
}

// Graceful shutdown handler for Node process termination
process.on('SIGINT', async () => {
  try {
    const client = await clientPromise;
    await client.close();
    console.log('MongoDB connection closed through app termination');
    process.exit(0);
  } catch (err) {
    console.error('Failed to close MongoDB connection:', err);
    process.exit(1);
  }
});
