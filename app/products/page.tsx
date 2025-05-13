// app/products/page.tsx
"use client";
import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import Link from "next/link";
import Image from "next/image";

interface Product {
  productId: string;
  imageUrl: string;
  title: string;
  description: string;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsCollection = collection(db, "products");
        const productSnapshot = await getDocs(productsCollection);
        const productList = productSnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            productId: doc.id,
            imageUrl: data.imageUrl || "/default-image.png",
            title: data.title || "Untitled",
            description: data.description || "No description available.",
          };
        });
        setProducts(productList);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading products...</div>;
  }

  if (products.length === 0) {
    return <div className="min-h-screen flex items-center justify-center">No products found.</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <h1 className="text-3xl font-bold text-center mb-8">Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {products.map((product) => (
          <div key={product.productId} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="relative w-full h-48">
              <Image
                src={product.imageUrl}
                alt={product.title}
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{product.title}</h2>
              <p className="text-gray-600 mb-4">{product.description}</p>
              <Link 
                href={`/products/${product.productId}`}
                className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
