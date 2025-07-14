import { getDb } from '@/lib/mongodb';

export async function findUserByEmail(email) {
  const db = await getDb();
  return db.collection('users').findOne({ email });
}

export async function updateUserInfo(email, data) {
  const db = await getDb();
  return db.collection('users').updateOne({ email }, { $set: data });
}
