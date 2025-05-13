"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function WaitingApprovalPage() {
  const router = useRouter();

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
      <img
          src="/images/waiting.png" // Make sure the path matches the file structure
          alt="Waiting for Approval"
          className="mx-auto mb-6 w-40 h-40 object-contain"
        />
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
