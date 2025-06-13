'use client';

import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <nav className="bg-white border-b shadow-md px-4 md:px-8 py-3 flex items-center justify-between">
        <div className="text-xl font-bold text-indigo-600">MyApp</div>
        <div className="space-x-3">
          <Link href="/login">
            <button className="px-4 py-2 border border-indigo-600 text-indigo-600 rounded-xl hover:bg-indigo-50 transition-all">
              Login
            </button>
          </Link>
          <Link href="/register">
            <button className="px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-all">
              Sign Up
            </button>
          </Link>
        </div>
      </nav>

      {/* Main content */}
      <main className="flex-grow bg-gray-50 px-4 md:px-8 py-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Welcome to MyApp</h1>
        <p className="text-gray-600 max-w-2xl mx-auto text-center mb-8">
          This is a sample landing page built with Next.js and Tailwind CSS.
          It includes a responsive navbar, dummy content, and a footer.
        </p>

        {/* Dummy content cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-all"
            >
              <h2 className="text-xl font-semibold text-indigo-700">Card {i}</h2>
              <p className="text-gray-600 mt-2">
                This is a dummy card with some sample content to show the layout.
              </p>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t py-4 px-4 md:px-8 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} MyApp. All rights reserved.
      </footer>
    </div>
  );
}
