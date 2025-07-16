// src/app/dashboard/page.js
import { fetchOrdersServer } from './actions';

export default async function DashboardPage() {
  try {
    const orders = await fetchOrdersServer();
    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Orders</h1>
        <pre className="bg-gray-100 p-4 rounded">
          {JSON.stringify(orders, null, 2)}
        </pre>
      </div>
    );
  } catch (error) {
    return (
      <div className="p-4 text-red-600">
        Error: {error.message}
        <div className="mt-2 text-sm text-gray-600">
          Check your server logs and ensure ADMIN_SECRET is set correctly in both apps.
        </div>
      </div>
    );
  }
}