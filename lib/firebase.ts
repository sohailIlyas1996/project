// lib/firebase.ts

import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"; // Import sign-in function
import { getFirestore } from "firebase/firestore"; // Import Firestore functions
import { getStorage, ref } from "firebase/storage";
import { getAnalytics, isSupported } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyD7FxgvgRAESCSpGp6nCKlyqJB21IGCfwA",
  authDomain: "shieldapp-db637.firebaseapp.com",
  projectId: "shieldapp-db637",
  storageBucket: "shieldapp-db637.firebasestorage.app",
  messagingSenderId: "20620642359",
  appId: "1:20620642359:web:e413db04ac54ad481617b2",
  measurementId: "G-J8PB2VHE9X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// Initialize Analytics only on client side
let analytics = null;
if (typeof window !== 'undefined') {
  isSupported().then(yes => yes && (analytics = getAnalytics(app)));
}

// Configure storage for CORS
const storageRef = ref(storage);
const corsConfig = {
  origin: ['http://localhost:3000', 'https://shieldapp-db637.web.app', 'https://shieldapp-db637.firebaseapp.com'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Content-Length', 'User-Agent', 'x-goog-resumable'],
  maxAgeSeconds: 3600
};

export { auth, signInWithEmailAndPassword, db, storage, storageRef, corsConfig, analytics }; // Export sign-in function and auth object
