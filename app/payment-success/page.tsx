import { Suspense } from "react";
import { use } from "react";
import PaymentSuccessClient from "./PaymentSuccessClient";
import { Metadata } from "next";

// Define the params type as a Promise
type Params = Promise<{ status?: string }>;

// Define the props type with the Promise-based params
type PaymentSuccessPageProps = {
  searchParams: Params;
};

export const metadata: Metadata = {
  title: "Payment Success",
  description: "Payment success page",
};

export default function PaymentSuccessPage(props: PaymentSuccessPageProps) {
  // Use the 'use' hook to unwrap the searchParams promise
  const params = use(props.searchParams);
  const status = params.status || "";
  console.log("Page status:", status); // Debug log

  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#0b0f1a] text-white p-6">
          <div className="max-w-md mx-auto text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          </div>
        </div>
      }
    >
      <PaymentSuccessClient status={status} />
    </Suspense>
  );
}
