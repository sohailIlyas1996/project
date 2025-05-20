import { Suspense } from 'react';
import PaymentSuccessClient from './PaymentSuccessClient';

export default function PaymentSuccessPage({
  searchParams,
}: {
  searchParams: { status?: string };
}) {
  // Ensure status is passed as a string
  const status = searchParams.status || '';
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
