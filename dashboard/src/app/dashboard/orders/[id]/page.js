import OrderDetail from './components/OrderDetail';
import { fetchAdminOrderById } from './actions';

export default async function OrderDetailPage({ params }) {
  const { id } = params;

  try {
    const order = await fetchAdminOrderById(id);

    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Order #{order._id}</h1>
        <OrderDetail order={order} />
      </div>
    );
  } catch (error) {
    return (
      <div className="p-4 text-red-600">
        Error loading order: {error.message}
      </div>
    );
  }
}
