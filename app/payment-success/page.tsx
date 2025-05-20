import { Suspense } from 'react';
import PaymentSuccessClient from '@/app/payment-success/PaymentSuccessClient';
import { useSearchParams } from 'next/navigation';

// eslint-disable-next-line @typescript-eslint/no-unused-vars   
export default function PaymentSuccessPage() {
  const searchParams = useSearchParams();
  const status = searchParams.get('status') ?? undefined;
  console.log(status);

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