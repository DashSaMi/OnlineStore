//app/dashboard/layout
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function DashboardLayout({ children }) {
  return (
    <div className={`${inter.className} flex min-h-screen bg-gray-100`}>
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white p-4">
        <h1 className="text-2xl font-bold mb-8">Admin Dashboard</h1>
        <nav>
          <ul className="space-y-2">
            <li>
              <a href="/dashboard" className="block py-2 px-4 rounded hover:bg-gray-700">
                Dashboard
              </a>
            </li>
            <li>
              <a href="/dashboard/products" className="block py-2 px-4 rounded hover:bg-gray-700">
                Products
              </a>
            </li>
            <li>
              <a href="/dashboard/orders" className="block py-2 px-4 rounded hover:bg-gray-700">
                Orders
              </a>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        {children}
      </div>
    </div>
  );
}