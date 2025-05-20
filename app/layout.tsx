import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Suspense } from "react";
import { CartProvider } from "@/app/context/CartContext";
import { Toaster } from 'react-hot-toast';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Shield App",
  description: "Your one-stop shop for security products",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CartProvider>
          <Suspense fallback={<div className="min-h-screen bg-[#0b0f1a] text-white p-6">Loading...</div>}>
            <main>{children}</main>
          </Suspense>
          <Toaster />
        </CartProvider>
      </body>
    </html>
  );
}
