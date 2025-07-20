import { getDatabase } from '@/lib/mongodb';

export default async function UsersPage() {
  let users = [];
  let error = null;
  try {
    const { db } = await getDatabase();
    users = await db.collection('users').find({}).toArray();
  } catch (err) {
    error = err.message;
  }

  return (
    <div className="py-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-900">All Users</h1>
      {error ? (
        <div className="p-4 text-red-600">Error: {error}</div>
      ) : users.length === 0 ? (
        <div className="text-gray-600">No users found.</div>
      ) : (
        <div className="overflow-x-auto bg-white shadow rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Role</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {users.map(user => (
                <tr key={user._id.toString()} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user._id.toString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{user.name || `${user.firstName || ''} ${user.lastName || ''}`}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{user.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{user.role || 'user'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
} 