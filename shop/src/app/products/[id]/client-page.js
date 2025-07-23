'use client';
import { SessionProvider } from 'next-auth/react';
import ProductDetailPage from '@/app/components/ProductDetailPage';

export default function ClientProductPage({ id, session }) {
  return (
    <SessionProvider 
      session={session || null}
      refetchInterval={5 * 60}
      refetchOnWindowFocus={true}
    >
      <ProductDetailPage id={id} />
    </SessionProvider>
  );
}