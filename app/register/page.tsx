"use client";

import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "@/lib/firebase"; // Import Firebase Auth
import { useRouter } from 'next/navigation'; // Import useRouter
import { collection, addDoc, setDoc, doc } from "firebase/firestore";
export default function Register() {
  // State variables for user details
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false); // Added loading state
  
  const router = useRouter(); // Initialize useRouter

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent the default form submission behavior

    // Check if all fields are filled
    if (!fullName || !email || !password || !confirmPassword) {
      setErrorMessage("All fields are required.");
      return;
    }

    // Check if password matches confirm password
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    // Clear error message if validation is successful
    setErrorMessage("");
    setLoading(true); // Set loading to true when starting registration

    try {
      // Firebase Sign Up
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // 2. Create Firestore user document with the same UID
    const userData = {
      fullName,
      email,
      approved: false, // initially not approved
      createdAt: new Date(),
      isCompany: true,
    };

    const userDocRef = doc(db, "users", user.uid);
    await setDoc(userDocRef, userData); // use UID as document ID

      // Successfully registered, alert the user
      alert("Registration successful!");


      // Redirect to the login page after successful registration
      router.push('/login'); // Redirect to login page

      // Clear form fields
      setFullName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    } catch (error) {
      setErrorMessage("Error during registration: " + (error as Error).message);
    } finally {
      setLoading(false); // Set loading to false after operation is complete
    }
  };

  return (
    <div className="min-h-screen bg-[#080710] flex items-center justify-center px-4 relative font-['Poppins']">
      {/* Background circles */}
      <div className="absolute w-full h-full max-w-[430px] max-h-[520px]">
        <div className="absolute w-40 h-40 md:w-52 md:h-52 bg-gradient-to-br from-[#1845ad] to-[#23a2f6] rounded-full -top-20 -left-20" />
        <div className="absolute w-40 h-40 md:w-52 md:h-52 bg-gradient-to-r from-[#2f0263] to-[#301dbb] rounded-full -bottom-20 -right-10" />
      </div>

      {/* Sign Up Form */}
      <form
        onSubmit={handleSubmit} // Handle form submission
        className="relative z-10 w-full max-w-md bg-white/10 backdrop-blur-md border border-white/10 shadow-2xl rounded-xl px-6 py-10 md:px-10"
      >
        <h3 className="text-3xl font-medium text-white text-center mb-6">Sign Up</h3>

        {/* Error Message */}
        {errorMessage && (
          <div className="text-red-500 text-sm mb-4">{errorMessage}</div>
        )}

        <div className="space-y-4">
          <div>
            <label htmlFor="name" className="text-white block text-sm font-medium">
              Company Full Name
            </label>
            <input
              id="name"
              type="text"
              placeholder="Company name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)} // Update state on input change
              className="mt-1 w-full h-12 rounded-md bg-white/10 text-white px-3 text-sm placeholder:text-gray-300 focus:outline-none"
            />
          </div>

          <div>
            <label htmlFor="email" className="text-white block text-sm font-medium">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Your Compnay email"
              value={email}
              onChange={(e) => setEmail(e.target.value)} // Update state on input change
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
              onChange={(e) => setPassword(e.target.value)} // Update state on input change
              className="mt-1 w-full h-12 rounded-md bg-white/10 text-white px-3 text-sm placeholder:text-gray-300 focus:outline-none"
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="text-white block text-sm font-medium">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              placeholder="Re-enter password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)} // Update state on input change
              className="mt-1 w-full h-12 rounded-md bg-white/10 text-white px-3 text-sm placeholder:text-gray-300 focus:outline-none"
            />
          </div>
        </div>

        <button
          type="submit"
          className="mt-8 w-full bg-white text-[#080710] py-3 rounded-md font-semibold text-lg hover:bg-gray-200 transition"
          disabled={loading} // Disable button while loading
        >
          {loading ? "Signing Up..." : "Sign Up"}
        </button>
      </form>
    </div>
  );
}
