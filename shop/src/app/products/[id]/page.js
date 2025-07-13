// app/products/[id]/page.js
import ClientProductPage from './client-page';

export default function ProductPage({ params }) {
  return <ClientProductPage id={params.id} />;
}