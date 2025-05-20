"use client";
import { useCart } from "@/app/context/CartContext";
import { CartProduct } from "@/app/types";
import Image from "next/image";
import Link from "next/link";
import { ShoppingCartIcon, TrashIcon } from "lucide-react";
import Checkout from "@/app/components/Checkout";

export default function CartPage() {
  const { cart, removeFromCart } = useCart();
  const totalAmount = cart.length * 99.99; // Replace with actual product prices

  return (
    <div className="min-h-screen bg-[#0b0f1a] text-white p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 flex items-center gap-2">
          <ShoppingCartIcon className="w-8 h-8" />
          Your Shopping Cart
        </h1>
        
        {cart.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl text-gray-400 mb-4">Your cart is empty</p>
            <Link 
              href="/products" 
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cart.map((product: CartProduct) => (
                <div
                  key={product.productId}
                  className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-lg p-4 flex gap-4 hover:shadow-lg transition-all duration-300"
                >
                  {/* Product Image */}
                  <div className="relative w-32 h-32 flex-shrink-0">
                    <Image
                      src={product.imageUrl}
                      alt={product.title}
                      fill
                      className="object-cover rounded-md"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "https://placehold.co/400x300/1e293b/ffffff?text=No+Image";
                      }}
                    />
                  </div>

                  {/* Product Details */}
                  <div className="flex-grow">
                    <h2 className="text-xl font-semibold mb-2">{product.title}</h2>
                    <p className="text-gray-300 text-sm mb-4">{product.description}</p>
                    <div className="flex justify-between items-center">
                      <button
                        className="text-red-400 hover:text-red-300 flex items-center gap-1 transition-colors"
                        onClick={() => removeFromCart(product.productId)}
                      >
                        <TrashIcon className="w-5 h-5" />
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary and Checkout */}
            <div className="lg:col-span-1">
              <div className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-lg p-6 sticky top-6">
                <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-gray-300">
                    <span>Items ({cart.length}):</span>
                    <span>${totalAmount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-300">
                    <span>Shipping:</span>
                    <span>Free</span>
                  </div>
                  <div className="border-t border-white/10 my-4"></div>
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total:</span>
                    <span>${totalAmount.toFixed(2)}</span>
                  </div>
                </div>
                <Checkout amount={totalAmount} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
