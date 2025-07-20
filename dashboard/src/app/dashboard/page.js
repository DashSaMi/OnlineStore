// src/app/dashboard/page.js
import { fetchOrdersServer } from './actions';
import SalesChart from './components/SalesChart';

function getSummary(orders) {
  let totalSales = 0;
  let totalOrders = orders.length;
  let salesByDate = {};
  let ordersByDate = {};
  orders.forEach(order => {
    const date = new Date(order.createdAt).toLocaleDateString();
    totalSales += order.total || 0;
    salesByDate[date] = (salesByDate[date] || 0) + (order.total || 0);
    ordersByDate[date] = (ordersByDate[date] || 0) + 1;
  });
  const salesData = Object.entries(ordersByDate).map(([date, count]) => ({ date, total: count }));
  return { totalSales, totalOrders, salesData };
}

export default async function DashboardPage() {
  try {
    const orders = await fetchOrdersServer();
    if (!Array.isArray(orders)) {
      return (
        <div className="p-4 text-red-600">
          Error: Orders data is not an array.<br />
          <span className="text-gray-700 text-sm">Check your API response at <code>/api/admin/orders</code> and ensure it returns an array. Debug info: <pre>{JSON.stringify(orders, null, 2)}</pre></span>
        </div>
      );
    }
    const { totalSales, totalOrders, salesData } = getSummary(orders);
    return (
      <div className="py-6 space-y-8">
        <h1 className="text-3xl font-bold mb-6 text-gray-900">Dashboard Overview</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white shadow rounded-lg p-6 flex flex-col items-center">
            <span className="text-gray-500 text-sm">Total Orders</span>
            <span className="text-2xl font-bold text-blue-700 mt-2">{totalOrders}</span>
          </div>
          <div className="bg-white shadow rounded-lg p-6 flex flex-col items-center">
            <span className="text-gray-500 text-sm">Total Sales</span>
            <span className="text-2xl font-bold text-green-700 mt-2">${totalSales.toLocaleString()}</span>
          </div>
        </div>
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-4 text-gray-800">Sales Over Time</h2>
          <SalesChart data={salesData} />
        </div>
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