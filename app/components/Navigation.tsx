'use client';

import Link from 'next/link';
import { ShoppingCart, Package } from 'lucide-react';
import { useCart } from '@/app/context/CartContext';

export default function Navigation() {
  const { cart } = useCart();

  return (
    <nav className="w-full px-6 py-4 flex items-center justify-between bg-[#0a0f1c] shadow-md text-gray-200">
      <div className="text-3xl font-extrabold text-white">
        🛍️ GenuineShield
      </div>

      {/* Navigation Links */}
      <div className="flex items-center gap-6">
        <Link 
          href="/products" 
          className="flex items-center gap-2 hover:text-blue-400 transition-colors"
        >
          <Package className="w-6 h-6" />
          <span>Products</span>
        </Link>
        <Link 
          href="/cart" 
          className="flex items-center gap-2 hover:text-blue-400 transition-colors relative"
        >
          <ShoppingCart className="w-6 h-6" />
          <span>Cart</span>
          {cart.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
              {cart.length}
            </span>
          )}
        </Link>
      </div>
    </nav>
  );
} 