"use client";

import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth"; // Import Firebase sign-in function
import { auth } from "@/lib/firebase"; // Import auth object from your Firebase config
import { useRouter } from "next/navigation"; // For routing after successful login
import { doc, getDoc } from "firebase/firestore"; // Add Firestore imports
import { db } from "@/lib/firebase"; // Ensure your Firebase config exports Firestore as `db`

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [keepLoggedIn, setKeepLoggedIn] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent default form submission

    // Validate fields
    if (!email || !password) {
      setError("Please fill in both email and password.");
      return;
    }

    // Basic email format validation
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setError(""); // Clear previous error

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

    // 🔥 Get user document from Firestore
    const userDocRef = doc(db, "users", user.uid); // Adjust collection name if needed
    const userDoc = await getDoc(userDocRef);

    if (!userDoc.exists()) {
      throw new Error("User data not found in Firestore.");
    }

    const userData = userDoc.data();
    const isApproved = userData.approved;

if (!isApproved) {
  router.push("/waiting"); // Not approved yet
} else if (userData.isCompany) {
  router.push("/userdashboard"); // Company dashboard
} else {
  router.push("/dashboard"); // Regular user dashboard
}
    // ✅ Store login info
    const userCredentials = { email, password };
    if (keepLoggedIn) {
      localStorage.setItem("user", JSON.stringify(userCredentials));
    } else {
      sessionStorage.setItem("user", JSON.stringify(userCredentials));
    }

  

    // 🔀 Redirect based on approval status
    
      // // Use Firebase Authentication to sign in with email and password
      // const userCredential = await signInWithEmailAndPassword(auth, email, password);
      // const user = userCredential.user;
      // console.log("Logged in as:", user.email);

      // // Store the login state in localStorage or sessionStorage
      // const userCredentials = { email, password };
      // if (keepLoggedIn) {
      //   localStorage.setItem("user", JSON.stringify(userCredentials));
      //   console.log("User is kept logged in");
      // } else {
      //   sessionStorage.setItem("user", JSON.stringify(userCredentials));
      //   console.log("User is logged in for this session");
      // }

      // alert("Login successful");
      

      // // Redirect to another page (e.g., dashboard)
      // router.push("/"); // Or any route you want to navigate to after login
    } catch (err: Error | unknown) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
      setError("Login failed: " + errorMessage);
    }

    // Clear the input fields after submission
    setEmail("");
    setPassword("");
  };

  return (
    <div className="min-h-screen bg-[#080710] flex items-center justify-center px-4 relative font-['Poppins']">
      {/* Background circles */}
      <div className="absolute w-full h-full max-w-[430px] max-h-[520px]">
        <div className="absolute w-40 h-40 md:w-52 md:h-52 bg-gradient-to-br from-[#1845ad] to-[#23a2f6] rounded-full -top-20 -left-20" />
        <div className="absolute w-40 h-40 md:w-52 md:h-52 bg-gradient-to-r from-[#2f0263] to-[#301dbb] rounded-full -bottom-20 -right-10" />
      </div>

      {/* Login Form */}
      <form
        onSubmit={handleSubmit}
        className="relative z-10 w-full max-w-md bg-white/10 backdrop-blur-md border border-white/10 shadow-2xl rounded-xl px-6 py-10 md:px-10"
      >
        <h3 className="text-3xl font-medium text-white text-center mb-6">Login</h3>

        {error && (
          <div className="text-red-500 text-sm mb-4">
            <p>{error}</p>
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label htmlFor="email" className="text-white block text-sm font-medium">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)} 
              className="mt-1 w-full h-12 rounded-md bg-white/10 text-white px-3 text-sm placeholder:text-gray-300 focus:outline-none"
            />
          </div>

          <div>
            <label htmlFor="password" className="text-white block text-sm font-medium">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)} 
              className="mt-1 w-full h-12 rounded-md bg-white/10 text-white px-3 text-sm placeholder:text-gray-300 focus:outline-none"
            />
          </div>

          <div className="flex items-center">
            <input
              id="keepLoggedIn"
              type="checkbox"
              checked={keepLoggedIn}
              onChange={(e) => setKeepLoggedIn(e.target.checked)} 
              className="w-4 h-4 rounded-md text-white"
            />
            <label htmlFor="keepLoggedIn" className="text-white text-sm ml-2">
              Keep me logged in
            </label>
          </div>
        </div>

        <button
          type="submit"
          className="mt-8 w-full bg-white text-[#080710] py-3 rounded-md font-semibold text-lg hover:bg-gray-200 transition"
        >
          Login
        </button>
      </form>
    </div>
  );
}
