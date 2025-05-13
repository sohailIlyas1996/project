"use client";

import { useEffect } from "react";
import Image from "next/image";

export default function WaitingApprovalPage() {
  // Example: polling or delay logic if needed later
  useEffect(() => {
    const interval = setInterval(() => {
      // You could check user's approval status here
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#080710] to-[#141e30] flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center animate-fade-in-down">
        <div className="relative w-40 h-40 mx-auto mb-6">
          <Image
            src="/images/waiting.png"
            alt="Waiting for Approval"
            fill
            className="object-contain"
            priority
          />
        </div>
        <h1 className="text-2xl font-semibold text-gray-800 mb-2">
          Awaiting Approval
        </h1>
        <p className="text-gray-600 text-sm">
          Your account has been created successfully. Please wait while an admin reviews and approves your registration.
        </p>
      </div>
    </div>
  );
}
