// app/products/[id]/page.tsx
"use client";   
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import Image from "next/image";

interface Product {
  productId: string;
  imageUrl: string;
  title: string;
  description: string;
}

export default function ProductDetailPage() {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [imageError, setImageError] = useState<boolean>(false);
  const params = useParams();
  const id = params.id as string;

  // Check if the id exists before attempting to fetch the product
  useEffect(() => {
    if (!id) return; // If `id` is not available, skip the fetch

    const fetchProduct = async () => {
      try {
        const productRef = doc(db, "products", id as string);
        const productSnapshot = await getDoc(productRef);
        if (productSnapshot.exists()) {
          const data = productSnapshot.data();
          console.log("Product data:", data); // Log the entire product data
          console.log("Image URL:", data.imageUrl); // Log specifically the image URL
          
          setProduct({
            productId: productSnapshot.id,
            imageUrl: data.imageUrl || "https://placehold.co/400x300/1e293b/ffffff?text=No+Image",
            title: data.title || "Untitled",
            description: data.description || "No description available.",
          });
        } else {
          setProduct(null); // If no product found, set null
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]); // Dependency array ensures effect runs when `id` changes

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-[#0b0f1a] text-white">Loading...</div>;

  if (!product) return <div className="min-h-screen flex items-center justify-center bg-[#0b0f1a] text-white">Product not found</div>;

  return (
    <div className="min-h-screen bg-[#0b0f1a] py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-lg shadow-lg overflow-hidden">
          <div className="relative w-full h-[400px]">
            {imageError ? (
              <div className="w-full h-full flex items-center justify-center bg-gray-800">
                <p className="text-gray-400">Failed to load image</p>
              </div>
            ) : (
              <Image
                src={product.imageUrl}
                alt={product.title}
                fill
                className="object-cover"
                priority
                onError={() => {
                  console.error("Image failed to load:", product.imageUrl);
                  setImageError(true);
                }}
              />
            )}
          </div>
          <div className="p-6">
            <h1 className="text-3xl font-bold mb-4 text-white">{product.title}</h1>
            <p className="text-gray-300">{product.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
