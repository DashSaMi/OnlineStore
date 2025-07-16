import EditProductForm from './EditProductForm';
import { getProduct } from '@/lib/api/products';

export default async function EditProductPage({ params }) {
  const { id } = params;

  if (!id) {
    return <div>Product ID is missing</div>;
  }

  let productResponse;
  try {
    productResponse = await getProduct(id);
  } catch (error) {
    return <div>Error loading product: {error.message}</div>;
  }

  if (!productResponse.success) {
    return <div>Error: {productResponse.error}</div>;
  }

  return <EditProductForm product={productResponse.data} />;
}
