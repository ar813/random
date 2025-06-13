'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface User {
  name: string;
  email: string;
}

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch('/api/me');
      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
      } else {
        setUser(null);
      }
    };
    fetchUser();
  }, []);

  const handleLogout = async () => {
    await fetch('/api/logout', { method: 'POST' });
    router.push('/login'); // Redirect to login
  };

  const handleDelete = async () => {
    const confirmDelete = confirm('Are you sure you want to delete your account? This cannot be undone.');
    if (!confirmDelete) return;

    const res = await fetch('/api/delete-account', { method: 'POST' });
    if (res.ok) {
      router.push('/register'); // Redirect after deletion
    }
  };

  const cryptoData = [
    { name: 'Bitcoin', symbol: 'BTC', price: '$67,000', change: '+2.4%' },
    { name: 'Ethereum', symbol: 'ETH', price: '$3,200', change: '+1.8%' },
    { name: 'Solana', symbol: 'SOL', price: '$150', change: '-0.5%' },
    { name: 'Cardano', symbol: 'ADA', price: '$0.45', change: '+0.9%' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-100 to-slate-200">
      <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center sticky top-0 z-10">
        <h1 className="text-2xl font-extrabold text-indigo-700 tracking-tight">Crypto Dashboard</h1>
        <div className="flex gap-4 items-center">
          <span className="text-sm text-gray-700">
            Welcome, <strong>{user ? user.name : 'Guest'}</strong>
          </span>
          {user && (
            <>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg text-sm"
              >
                Logout
              </button>
              <button
                onClick={handleDelete}
                className="bg-black hover:bg-gray-800 text-white px-3 py-1 rounded-lg text-sm"
              >
                Delete Account
              </button>
            </>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 px-6 py-10">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">Today's Market Overview</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {cryptoData.map((crypto) => (
            <div
              key={crypto.symbol}
              className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-bold text-gray-800">{crypto.name}</h3>
                  <p className="text-sm text-gray-500 uppercase">{crypto.symbol}</p>
                </div>
                <span className="text-sm px-2 py-1 rounded-full font-medium bg-indigo-100 text-indigo-600">
                  {crypto.price}
                </span>
              </div>
              <p
                className={`text-sm font-semibold ${
                  crypto.change.startsWith('+') ? 'text-green-600' : 'text-red-500'
                }`}
              >
                {crypto.change} {crypto.change.startsWith('+') ? '↑' : '↓'}
              </p>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white text-center text-sm text-gray-500 py-4 shadow-inner">
        &copy; {new Date().getFullYear()} Crypto Dashboard by Muhammad Arsalan. All rights reserved.
      </footer>
    </div>
  );
}
