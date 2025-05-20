import { Suspense } from "react";
import dynamic from "next/dynamic";

const PaymentSuccess = dynamic(() => import("./PaymentSuccess"), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen bg-[#0b0f1a] text-white p-6">
      <div className="max-w-md mx-auto text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
        <p className="mt-4 text-lg">Processing payment...</p>
      </div>
    </div>
  ),
});

export default function Page() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#0b0f1a] text-white p-6">
          <div className="max-w-md mx-auto text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-4 text-lg">Loading...</p>
          </div>
        </div>
      }
    >
      <PaymentSuccess />
    </Suspense>
  );
}
