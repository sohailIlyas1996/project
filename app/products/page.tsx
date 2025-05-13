// app/products/page.tsx
"use client";
import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import Link from "next/link";
import Image from "next/image";
import { HomeIcon, InfoIcon, ShoppingCartIcon } from "lucide-react";

interface Product {
  productId: string;
  imageUrl: string;
  title: string;
  description: string;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-[#0b0f1a] text-white">Loading products...</div>;
  }

  return (
    <div className="min-h-screen bg-[#0b0f1a]">
      {/* Navbar */}
      <nav className="w-full px-6 py-4 flex items-center justify-between bg-[#0a0f1c] shadow-md text-gray-200">
        <div className="text-3xl font-extrabold text-white">
          🛍️ GenuineShield
        </div>

        {/* Search bar */}
        <div className="hidden md:flex items-center gap-6 ml-auto mr-5">
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full max-w-xs px-4 py-2 rounded-full border border-blue-500 bg-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Desktop navigation */}
        <div className="hidden md:flex items-center gap-6">
          <ul className="flex items-center gap-6">
            <li className="flex items-center gap-1 hover:text-blue-400 cursor-pointer text-lg font-medium">
              <Link href="/" className="flex items-center gap-1">
                <HomeIcon className="w-5 h-5" />
                Home
              </Link>
            </li>
            <li className="flex items-center gap-1 hover:text-blue-400 cursor-pointer text-lg font-medium">
              <Link href="/about" className="flex items-center gap-1">
                <InfoIcon className="w-5 h-5" />
                About
              </Link>
            </li>
            <li className="flex items-center gap-1 hover:text-blue-400 cursor-pointer text-lg font-medium">
              <Link href="/cart" className="flex items-center gap-1">
                <ShoppingCartIcon className="w-5 h-5" />
                Cart
              </Link>
            </li>
          </ul>
        </div>

        {/* Mobile hamburger menu */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-white focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile menu dropdown */}
      <div
        className={`md:hidden ${isMobileMenuOpen ? 'block' : 'hidden'} fixed top-16 left-0 w-full bg-[#0a0f1c] text-white shadow-lg z-50`}
      >
        <ul className="flex flex-col items-center gap-6 py-4">
          <li className="flex items-center gap-1 hover:text-blue-400 cursor-pointer text-lg font-medium">
            <Link href="/" className="flex items-center gap-1">
              <HomeIcon className="w-5 h-5" />
              Home
            </Link>
          </li>
          <li className="flex items-center gap-1 hover:text-blue-400 cursor-pointer text-lg font-medium">
            <Link href="/about" className="flex items-center gap-1">
              <InfoIcon className="w-5 h-5" />
              About
            </Link>
          </li>
          <li className="flex items-center gap-1 hover:text-blue-400 cursor-pointer text-lg font-medium">
            <Link href="/cart" className="flex items-center gap-1">
              <ShoppingCartIcon className="w-5 h-5" />
              Cart
            </Link>
          </li>
        </ul>
      </div>

      {/* Mobile search bar */}
      <div className="md:hidden px-4 py-2">
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-2 rounded-full border border-blue-500 bg-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Products Section */}
      <div className="py-8 px-4">
        {filteredProducts.length === 0 ? (
          <div className="text-center text-gray-400">No products found matching your search.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {filteredProducts.map((product) => (
              <div key={product.productId} className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-lg shadow-lg overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className="relative w-full h-48">
                  <Image
                    src={product.imageUrl}
                    alt={product.title}
                    fill
                    className="object-cover"
                    priority
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "https://placehold.co/400x300/1e293b/ffffff?text=No+Image";
                    }}
                  />
                </div>
                <div className="p-4">
                  <h2 className="text-xl font-semibold mb-2 text-white">{product.title}</h2>
                  <p className="text-gray-300 mb-4">{product.description}</p>
                  <div className="flex justify-between items-center">
                    <Link 
                      href={`/products/${product.productId}`}
                      className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                    >
                      View Details
                    </Link>
                    <button 
                      className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
                      onClick={() => {
                        // Add to cart functionality will be implemented later
                        alert('Added to cart!');
                      }}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
