'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function DashboardLoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (username === 'admin' && password === 'saman121213') {
      document.cookie = 'dashboard_auth=1; path=/;';
      router.push('/dashboard');
      router.refresh();
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm space-y-6">
        <h1 className="text-2xl font-bold text-center text-gray-900">Dashboard Login</h1>
        {error && <div className="text-red-600 text-center">{error}</div>}
        <div>
          <label className="block text-gray-700 mb-1">Username</label>
          <input type="text" value={username} onChange={e => setUsername(e.target.value)} className="w-full border rounded px-3 py-2" autoFocus />
        </div>
        <div>
          <label className="block text-gray-700 mb-1">Password</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="w-full border rounded px-3 py-2" />
        </div>
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">Login</button>
      </form>
    </div>
  );
} 