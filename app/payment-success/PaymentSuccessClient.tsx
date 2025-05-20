'use client';

import { useSearchParams } from 'next/navigation';
import PaymentSuccessClientContent from '@/app/payment-success/PaymentSuccessClientContent';

export default function PaymentSuccessClient() {
  const searchParams = useSearchParams();
  const status = searchParams.get('status') || '';

  return <PaymentSuccessClientContent status={status} />;
}
