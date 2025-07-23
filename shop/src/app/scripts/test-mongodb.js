// app/scripts/test-mongodb.js
const { MongoClient } = require('mongodb');
require('dotenv').config();

async function testConnection() {
  // Use your exact connection string from .env
  const uri = process.env.MONGODB_URI || 'mongodb+srv://samankarimian12:fbAIcTaz4VYMCtJj@samanonlineshop.tvibppu.mongodb.net/?retryWrites=true&w=majority&appName=SamanOnlineShop';
  const dbName = process.env.MONGODB_DB_NAME || 'SamanOnlineShop';

  console.log('🔌 Testing connection to:', uri.replace(/\/\/.*@/, '//****:****@'));
  console.log('📁 Using database:', dbName);

  const client = new MongoClient(uri, {
    connectTimeoutMS: 5000,
    serverSelectionTimeoutMS: 5000
  });

  try {
    await client.connect();
    console.log('✅ Successfully connected to MongoDB Atlas');
    
    const db = client.db(dbName);
    const collections = await db.listCollections().toArray();
    
    console.log('\n📋 Collections found:');
    collections.forEach(col => console.log(`- ${col.name}`));
    
    // Test basic CRUD
    const testCollection = db.collection('test_connection');
    await testCollection.insertOne({ test: new Date() });
    const doc = await testCollection.findOne();
    console.log('\n🧪 Test document:', doc);
    await testCollection.drop();
    
  } catch (err) {
    console.error('\n❌ Connection failed:', err.message);
    console.log('\nPossible fixes:');
    console.log('1. Check your MONGODB_URI in .env');
    console.log('2. Verify your password is correct');
    console.log('3. Whitelist your IP in MongoDB Atlas');
    console.log('4. Check network connectivity');
  } finally {
    await client.close();
  }
}

testConnection();