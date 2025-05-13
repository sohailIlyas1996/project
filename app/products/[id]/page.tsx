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
            imageUrl: data.imageUrl || "/default-image.png", // Provide fallback if missing
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

  if (loading) return <div>Loading...</div>;

  if (!product) return <div>Product not found</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="relative w-full h-[400px]">
          {imageError ? (
            <div className="w-full h-full flex items-center justify-center bg-gray-100">
              <p className="text-gray-500">Failed to load image</p>
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
          <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
          <p className="text-gray-600">{product.description}</p>
          <p className="text-sm text-gray-500 mt-2">Image URL: {product.imageUrl}</p>
        </div>
      </div>
    </div>
  );
}
