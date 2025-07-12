"use client";

import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/app/lib/firebase";
import Image from "next/image";
import { Product } from "@/app/types";
import Link from "next/link";

type ScanPageProps = {
  params: { id: string };
  searchParams?: { [key: string]: string | string[] };
};

export default function Page({ params }: ScanPageProps) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productId = params.id;
        const productDoc = await getDoc(doc(db, "products", productId));

        if (productDoc.exists()) {
          const productData = productDoc.data();
          setProduct({
            productId: productDoc.id,
            title: productData.title,
            description: productData.description,
            imageUrl: productData.imageUrl,
            qrCode: productData.qrCode,
          });
        } else {
          setError("Product not found");
        }
      } catch (err) {
        setError("Error loading product");
        console.error("Error fetching product:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0b0f1a] text-white p-6">
        <div className="max-w-4xl mx-auto">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-[#0b0f1a] text-white p-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold text-red-500">
            {error || "Product not found"}
          </h1>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0b0f1a] text-white p-6">
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="relative aspect-square rounded-lg overflow-hidden">
            <Image
              src={product.imageUrl}
              alt={product.title}
              fill
              className="object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src =
                  "https://placehold.co/400x300/1e293b/ffffff?text=No+Image";
              }}
            />
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <h1 className="text-3xl font-bold">{product.title}</h1>
            <p className="text-gray-300">{product.description}</p>

            {/* View Full Details Button */}
            <Link
              href={`/products/${product.productId}`}
              className="block w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition text-center"
            >
              View Full Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
