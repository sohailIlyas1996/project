"use client";
import Image from "next/image";
import { HomeIcon, InfoIcon, LogInIcon } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

const products = [
  {
    id: 1,
    name: "Tyre",
    price: "$49.99",
    stock: 12,
    image:
      "https://images.unsplash.com/photo-1527266258038-6ae3e089a609?w=500&auto=format&fit=crop&q=60",
  },
  {
    id: 2,
    name: "Brake Pad",
    price: "$89.99",
    stock: 5,
    image:
      "https://images.unsplash.com/photo-1696494561430-de087dd0bd69?w=500&auto=format&fit=crop&q=60",
  },
  {
    id: 3,
    name: "Oil",
    price: "$29.99",
    stock: 20,
    image:
      "https://images.unsplash.com/photo-1590227763209-821c686b932f?w=500&auto=format&fit=crop&q=60",
  },
  {
    id: 4,
    name: "Battery",
    price: "$249.99",
    stock: 8,
    image:
      "https://plus.unsplash.com/premium_photo-1661770030805-0abb8fd880f1?w=500&auto=format&fit=crop&q=60",
  },
  {
    id: 5,
    name: "Air Filter",
    price: "$39.99",
    stock: 14,
    image:
      "https://images.unsplash.com/photo-1588294020274-1e23a4815b72?w=500&auto=format&fit=crop&q=60",
  },
];

export default function Home() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  return (
    <div className="min-h-screen bg-black text-gray-200 font-sans">
      {/* Navbar */}
      <nav className="w-full px-6 py-4 flex items-center justify-between bg-[#0a0f1c] shadow-md text-gray-200">
        <Image
          src="/images/logo.png"
          alt="logo for app"
          width={50}
          height={50}
          className="rounded-full m-2"
        />
        <div className="text-3xl font-extrabold text-white">GenuineShield</div>

        {/* Search bar */}
        <div className="hidden md:flex items-center gap-6 ml-auto mr-5">
          <input
            type="text"
            placeholder="Search products..."
            className="w-full max-w-xs px-4 py-2 rounded-full border border-blue-500 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Desktop navigation */}
        <div className="hidden md:flex items-center gap-6">
          <ul className="flex items-center gap-6">
            <li className="flex items-center gap-1 hover:text-blue-400 cursor-pointer text-lg font-medium">
              <Link href="/">
                <HomeIcon className="w-5 h-5" />
                Home
              </Link>
            </li>
            <li className="flex items-center gap-1 hover:text-blue-400 cursor-pointer text-lg font-medium">
              <Link href="/about">
                <InfoIcon className="w-5 h-5" />
                About
              </Link>
            </li>
            <li className="flex items-center gap-1 hover:text-blue-400 cursor-pointer text-lg font-medium">
              <Link href="/login">
                <LogInIcon className="w-5 h-5" />
                Login
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
        className={`md:hidden ${
          isMobileMenuOpen ? "block" : "hidden"
        } fixed top-0 left-0 w-full bg-[#0a0f1c] text-white shadow-lg z-50`}
      >
        <ul className="flex flex-col items-center gap-6 py-4">
          <li className="flex items-center gap-1 hover:text-blue-400 cursor-pointer text-lg font-medium">
            <HomeIcon className="w-5 h-5" />
            <Link href="/">Home</Link>
          </li>
          <li className="flex items-center gap-1 hover:text-blue-400 cursor-pointer text-lg font-medium">
            <InfoIcon className="w-5 h-5" />
            <Link href="/about">About</Link>
          </li>
          <li className="flex items-center gap-1 hover:text-blue-400 cursor-pointer text-lg font-medium">
            <LogInIcon className="w-5 h-5" />
            <Link href="/login">Login</Link>
          </li>
        </ul>
      </div>

      <section className="relative w-full h-[80vh] flex items-center justify-center overflow-hidden text-white bg-[#1e293b]">
        <div className="relative z-10 text-center px-6">
          <h1 className="text-5xl font-extrabold mb-4 tracking-tight animate-fadeInDelay1">
            Welcome to GenuineShield
          </h1>
          <p className="text-xl mb-6 tracking-wide leading-relaxed animate-fadeInDelay2">
            Find the Genuine car parts at unbeatable prices!
          </p>
          <Link
            href="/products"
            className="bg-blue-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-700 hover:scale-105 transition-transform duration-200 animate-fadeInDelay3"
          >
            Shop Now
          </Link>

          <Link
            href="/register"
            className=" ml-5 inline-block bg-blue-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-700 hover:scale-105 transition-transform duration-200 animate-fadeInDelay3"
          >
            Register Your Company
          </Link>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-16 px-6">
        <h2 className="text-4xl font-extrabold text-center mb-12 text-white">
          Featured Products
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-[#111827] border border-gray-700 rounded-lg shadow-lg hover:shadow-xl hover:-translate-y-2 transition-transform duration-300"
            >
              <Image
                src={product.image}
                alt={product.name}
                width={400}
                height={400}
                className="rounded-t-lg object-cover w-full h-64"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                <p className="text-blue-400 font-semibold text-lg">
                  {product.price}
                </p>
                <p className="text-sm text-gray-400">
                  {product.stock} in stock
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0a0f1c] text-gray-400 py-10 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4 text-white">About Us</h3>
            <p>We provide high-quality genuine car parts at the best prices.</p>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4 text-white">Quick Links</h3>
            <ul className="space-y-2">
              <Link href="/">
                <li>Home</li>
              </Link>

              <Link href="/products">
                <li>Products</li>
              </Link>

              <Link href={"/about"}>
                <li> Contacs</li>
              </Link>
            </ul>
          </div>
          {/* <div>
            <h3 className="text-lg font-bold mb-4 text-white">Newsletter</h3>
            <p>Subscribe to get the latest updates and offers.</p>
            <input
              type="email"
              placeholder="Your email"
              className="mt-4 w-full px-4 py-2 rounded bg-[#1e293b] text-white placeholder-gray-400 focus:outline-none"
            />
          </div> */}
        </div>
        <div className="text-center mt-10 text-gray-600">
          &copy; 2025 GenuineShield. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
