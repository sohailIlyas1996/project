// app/products/[id]/page.tsx
"use client";   
import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { Product } from '@/app/types';
import { useCart } from '@/app/context/CartContext';
import { ShoppingCart } from 'lucide-react';
import toast from 'react-hot-toast';
import Navigation from '@/app/components/Navigation';
import { useParams } from 'next/navigation';

export default function ProductDetail() {
  const params = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedImage, setSelectedImage] = useState('');
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productId = params.id as string;
        const productDoc = await getDoc(doc(db, 'products', productId));
        
        if (productDoc.exists()) {
          const productData = productDoc.data();
          const product = {
            productId: productDoc.id,
            title: productData.title,
            description: productData.description,
            imageUrl: productData.imageUrl,
            qrCode: productData.qrCode
          };
          setProduct(product);
          setSelectedImage(product.imageUrl || "https://placehold.co/400x300/1e293b/ffffff?text=No+Image");
        } else {
          setError('Product not found');
        }
      } catch (err) {
        setError('Error loading product');
        console.error('Error fetching product:', err);
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchProduct();
    }
  }, [params.id]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product);
      toast.success('Added to cart!');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0b0f1a] text-white">
        <Navigation />
        <div className="p-6">
          <div className="max-w-7xl mx-auto">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-[#0b0f1a] text-white">
        <Navigation />
        <div className="p-6">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-2xl font-bold text-red-500">{error || 'Product not found'}</h1>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0b0f1a] text-white">
      <Navigation />
      <div className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Product Images */}
          <div className="space-y-4">
            <div className="relative aspect-square rounded-lg overflow-hidden bg-white/5">
              <img
                src={selectedImage}
                alt={product.title}
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "https://placehold.co/400x300/1e293b/ffffff?text=No+Image";
                }}
              />
            </div>
            <div className="grid grid-cols-4 gap-2">
              <button
                onClick={() => setSelectedImage(product.imageUrl)}
                className="relative aspect-square rounded-md overflow-hidden border-2 border-blue-500"
              >
                <img
                  src={product.imageUrl}
                  alt="Main product image"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </button>
              {product.qrCode && (
                <button
                  onClick={() => setSelectedImage(product.qrCode || '')}
                  className="relative aspect-square rounded-md overflow-hidden border border-white/10"
                >
                  <img
                    src={product.qrCode}
                    alt="Product QR code"
                    style={{ width: '100%', height: '100%', objectFit: 'contain', backgroundColor: 'white' }}
                  />
                </button>
              )}
            </div>
          </div>

          {/* Right Column - Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
            </div>

            <div className="bg-white/5 rounded-lg p-4">
              <div className="text-2xl font-bold text-green-400">$99.99</div>
              <div className="text-sm text-gray-400">In Stock</div>
            </div>

            <div className="space-y-4">
              <button
                onClick={handleAddToCart}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition"
              >
                <ShoppingCart className="w-5 h-5" />
                Add to Cart
              </button>
            </div>

            {/* Product Description */}
            <div className="border-t border-white/10 pt-6">
              <div className="bg-white/5 rounded-lg p-6">
                <div className="prose prose-invert max-w-none">
                  <p>{product.description}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
