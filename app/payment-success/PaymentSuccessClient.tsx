'use client';

import { useCart } from '@/app/context/CartContext';
import Link from 'next/link';
import { CheckCircle, XCircle } from 'lucide-react';
import { useEffect, useRef } from 'react';

interface PaymentSuccessClientProps {
  status?: string;
}

export default function PaymentSuccessClient({ status }: PaymentSuccessClientProps) {
  const { clearCart } = useCart();
  const hasClearedCart = useRef(false);

  useEffect(() => {
    if (status === 'succeeded' && !hasClearedCart.current) {
      clearCart();
      hasClearedCart.current = true;
    }
  }, [status, clearCart]);

  if (status === 'succeeded') {
    return (
      <div className="min-h-screen bg-[#0b0f1a] text-white p-6">
        <div className="max-w-md mx-auto text-center">
          <div className="mb-6">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
          </div>
          <h1 className="text-2xl font-bold mb-4">Payment Successful!</h1>
          <p className="text-gray-300 mb-8">
            Thank you for your purchase. Your order has been processed successfully.
          </p>
          <Link
            href="/products"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0b0f1a] text-white p-6">
      <div className="max-w-md mx-auto text-center">
        <div className="mb-6">
          <XCircle className="w-16 h-16 text-red-500 mx-auto" />
        </div>
        <h1 className="text-2xl font-bold mb-4">Payment Failed</h1>
        <p className="text-gray-300 mb-8">
          There was an error processing your payment. Please try again.
        </p>
        <Link
          href="/cart"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
        >
          Return to Cart
        </Link>
      </div>
    </div>
  );
}
