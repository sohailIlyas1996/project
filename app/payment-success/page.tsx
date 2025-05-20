import { Suspense } from 'react';
import PaymentSuccessClient from './PaymentSuccessClient';
import { Metadata } from 'next';

// Define the expected params structure
type Params = {
  status?: string;
};

// Define the props type with Promise-based params
type PageProps = {
  searchParams: Promise<Params>;
};

export const metadata: Metadata = {
  title: 'Payment Success',
  description: 'Payment success page',
};

export default async function PaymentSuccessPage({ searchParams }: PageProps) {
  // Await the searchParams promise
  const params = await searchParams;
  const status = params.status || '';
  console.log('Page status:', status); // Debug log

  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#0b0f1a] text-white p-6">
        <div className="max-w-md mx-auto text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
        </div>
      </div>
    }>
      <PaymentSuccessClient status={status} />
    </Suspense>
  );
}
