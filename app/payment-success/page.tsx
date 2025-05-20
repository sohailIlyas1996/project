import { Suspense } from 'react';
import PaymentSuccessClient from './PaymentSuccessClient';
import { Metadata } from 'next';

interface PageProps {
  params: { [key: string]: string | string[] | undefined };
  searchParams: { [key: string]: string | string[] | undefined };
}

export const metadata: Metadata = {
  title: 'Payment Success',
  description: 'Payment success page',
};

export default function PaymentSuccessPage({
  searchParams,
}: PageProps) {
  // Ensure status is passed as a string
  const status = typeof searchParams.status === 'string' ? searchParams.status : '';
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
