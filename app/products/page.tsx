// app/products/page.tsx
"use client";
import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import Link from "next/link";

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
            productId: doc.id, // Assuming the document ID is the product ID
            imageUrl: data.imageUrl || "/default-image.png", // Provide fallback image URL if missing
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
    return <div>Loading products...</div>;
  }

  if (products.length === 0) {
    return <div>No products found.</div>;
  }

  return (
    <div>
      <h1>Products</h1>
      <div>
        {products.map((product) => (
          <div key={product.productId}>
            <img src={product.imageUrl} alt={product.title} />
            <h2>{product.title}</h2>
            <p>{product.description}</p>
            <Link href={`/products/${product.productId}`}>View Details</Link>
          </div>
        ))}
      </div>
    </div>
  );
}
