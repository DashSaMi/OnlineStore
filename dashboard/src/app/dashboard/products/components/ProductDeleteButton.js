'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function ProductDeleteButton({ productId }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    setLoading(true);
    try {
      const API_BASE_URL = 'https://onlineshop-rose-six.vercel.app';
      const res = await fetch(`${API_BASE_URL}/api/products?id=${productId}`, {
        method: 'DELETE',
      });
      if (!res.ok) {
        const data = await res.json();
        alert(data.error || 'Failed to delete product');
        setLoading(false);
        return;
      }
      router.refresh();
    } catch (err) {
      alert('Failed to delete product');
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleDelete}
      className={`px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-center ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
      type="button"
      disabled={loading}
    >
      {loading ? 'Deleting...' : 'Delete'}
    </button>
  );
} 