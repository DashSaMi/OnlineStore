// app/products/[id]/page.js
import ClientProductPage from './client-page';

// This is a Server Component that renders the Client Component
export default function ProductPage() {
  return <ClientProductPage />;
}