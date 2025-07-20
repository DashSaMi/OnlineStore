//app/dashboard/orders/[id]/page.js
import OrderDetail from './components/OrderDetail';
import { fetchAdminOrderById } from './actions';

export default async function OrderDetailPage({ params }) {
  const { id } = params;

  try {
    const order = await fetchAdminOrderById(id);

    return (
      <div className="py-8">
        <h1 className="text-3xl font-bold mb-8 text-gray-900">Order #{order._id}</h1>
        <OrderDetail order={order} />
      </div>
    );
  } catch (error) {
    return (
      <div className="p-8 text-red-600 bg-red-50 rounded">
        Error loading order: {error.message}
      </div>
    );
  }
}
