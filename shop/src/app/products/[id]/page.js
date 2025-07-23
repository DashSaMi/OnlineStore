import { getServerSession } from 'next-auth';
import ClientProductPage from './client-page';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export default async function ProductPage({ params }) {
  let session = null;
  
  try {
    session = await getServerSession(authOptions);
  } catch (error) {
    console.error('Error getting session:', error);
  }

  return <ClientProductPage id={params.id} session={session} />;
}