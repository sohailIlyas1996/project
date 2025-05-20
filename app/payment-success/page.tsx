import dynamic from 'next/dynamic';
import { Suspense } from 'react';

// Dynamically import the client component
const PaymentSuccess = dynamic(() => import('./PaymentSuccess'), { ssr: false });

export default function Page() {
  return (
    <Suspense fallback={<div className="p-6 text-white">Loading...</div>}>
      <PaymentSuccess />
    </Suspense>
  );
}
