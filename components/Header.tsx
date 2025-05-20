'use client';

import Link from 'next/link';
// import { useCart } from '@/contexts/CartContext'; // Removed useCart import
// import { ShoppingCartIcon } from '@heroicons/react/24/outline'; // Removed ShoppingCartIcon import
import { UserCircleIcon } from '@heroicons/react/24/outline'; // UserCircleIcon can remain if used elsewhere or for future profile link

export default function Header() {
  // const { itemCount, isLoadingCart } = useCart(); // Removed useCart usage

  return (
    <header className="bg-white/5 backdrop-blur-md shadow-lg sticky top-0 z-50 font-['Poppins']">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-white">
              MyApp
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/userdashboard" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
              Dashboard
            </Link>
            {/* Cart Link Removed
            <Link href="/cart" className="relative text-gray-300 hover:text-white px-3 py-2 rounded-md">
              <ShoppingCartIcon className="h-6 w-6" />
              {!isLoadingCart && itemCount > 0 && (
                <span className="absolute -top-2 -right-2 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
                  {itemCount}
                </span>
              )}
            </Link>
            */}
            {/* Example User Profile Link - can be kept if you plan to use it 
            <Link href="/profile" className="text-gray-300 hover:text-white px-3 py-2 rounded-md">
              <UserCircleIcon className="h-6 w-6" />
            </Link> 
            */}
          </div>
        </div>
      </div>
    </header>
  );
} 