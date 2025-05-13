"use client";

import { useEffect, useState } from "react";
import { auth, db, storage } from "@/lib/firebase";
import { doc, getDoc, addDoc, collection } from "firebase/firestore";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useRouter } from "next/navigation";
import ProtectedRoute from "@/components/ProtectedRoute";
import QRCode from "qrcode";
import { v4 as uuidv4 } from "uuid";

export default function Dashboard() {
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [message, setMessage] = useState("");
  const [qrCode, setQrCode] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0); // To track upload progress
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const stored = localStorage.getItem("user") || sessionStorage.getItem("user");
      if (!stored) return router.push("/login");

      try {
        const creds = JSON.parse(stored);
        const result = await signInWithEmailAndPassword(auth, creds.email, creds.password);

        const user = result.user;
        setUserEmail(user.email);

        const docSnap = await getDoc(doc(db, "users", user.uid));
        if (!docSnap.exists()) router.push("/waiting");
      } catch (err) {
        console.error(err);
        router.push("/login");
      }
    };

    fetchUser();
  }, [router]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("user");
      sessionStorage.removeItem("user");
      router.push("/login");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const generateQRCode = async (productId: string) => {
    try {
      const qrData = await QRCode.toDataURL(productId);
      setQrCode(qrData);
      return qrData;
    } catch (err) {
      console.error("Error generating QR code:", err);
      throw err;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");
    setUploadProgress(0); // Reset progress before starting

    try {
      const currentUser = auth.currentUser;
      if (!currentUser) {
        throw new Error("You must be logged in to upload files");
      }

      const productId = uuidv4();
      const qrCodeData = await generateQRCode(productId);

      let imageUrl = "";
      if (imageFile) {
        try {
          console.log("Starting file upload...", imageFile);

          const maxSize = 5 * 1024 * 1024; // 5MB in bytes
          if (imageFile.size > maxSize) {
            throw new Error("File size must be less than 5MB");
          }

          const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
          if (!allowedTypes.includes(imageFile.type)) {
            throw new Error("Only JPEG, PNG and GIF files are allowed");
          }

          const fileRef = ref(storage, `products/${currentUser.uid}-${imageFile.name}`);
          const metadata = {
            contentType: imageFile.type,
            customMetadata: {
              'uploadedBy': currentUser.uid,
              'uploadedAt': new Date().toISOString()
            },
            cacheControl: 'public,max-age=31536000'
          };

          const uploadTask = uploadBytesResumable(fileRef, imageFile, metadata);

          uploadTask.on('state_changed',
            (snapshot) => {
              const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              setUploadProgress(progress); // Update upload progress

              switch (snapshot.state) {
                case 'paused':
                  console.log('Upload is paused');
                  break;
                case 'running':
                  console.log('Upload is running');
                  break;
              }
            },
            (error) => {
              console.error("Upload error:", error);
              throw new Error(`File upload failed: ${error.message}`);
            },
            async () => {
              imageUrl = await getDownloadURL(uploadTask.snapshot.ref);
              console.log('File available at', imageUrl);
            }
          );

          await new Promise((resolve, reject) => {
            uploadTask.on('state_changed',
              null,
              (error) => reject(error),
              () => resolve(true)
            );
          });
        } catch (uploadError) {
          console.error("Detailed upload error:", uploadError);
          throw new Error(`File upload failed: ${(uploadError as Error).message}`);
        }
      }

      const productData = {
        productId,
        title,
        description,
        imageUrl, // Store image URL here
        qrCode: qrCodeData,
        userEmail: currentUser.email,
        userId: currentUser.uid,
        createdAt: new Date(),
      };

      await addDoc(collection(db, "products"), productData);
      console.log("Product data stored successfully");

      setMessage("Product uploaded successfully!");
      setTitle("");
      setDescription("");
      setImageFile(null);
      setQrCode("");
    } catch (err) {
      console.error("Detailed error:", err);
      setMessage("Error uploading product: " + (err as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-[#0b0f1a] text-white p-6 font-['Poppins']">
        <div className="max-w-3xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold">User Dashboard</h1>
              <p className="text-sm mt-2">
                <strong>Email:</strong> {userEmail ?? "Loading..."}
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-md text-white font-medium transition-colors"
            >
              Logout
            </button>
          </div>

          <div className="bg-white/10 p-6 rounded-xl shadow-lg backdrop-blur-sm border border-white/10">
            <h2 className="text-2xl font-semibold mb-4">Upload a Product</h2>
            {message && (
              <div className={`text-sm mb-4 ${message.includes('Error') ? 'text-red-400' : 'text-green-400'} font-medium`}>
                {message}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm mb-1">Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-md bg-white/10 border border-white/20 placeholder:text-gray-300 text-white focus:outline-none"
                  placeholder="Product title"
                  required
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3 py-2 rounded-md bg-white/10 border border-white/20 placeholder:text-gray-300 text-white focus:outline-none"
                  placeholder="Product description"
                  required
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Upload Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                  className="w-full text-sm text-white file:bg-blue-600 file:hover:bg-blue-700 file:text-white file:py-2 file:px-4 file:rounded file:border-none"
                />
              </div>

              {qrCode && (
                <div className="mt-4 p-4 bg-white/5 rounded-lg">
                  <h3 className="text-sm font-medium mb-2">Generated QR Code</h3>
                  <img src={qrCode} alt="Product QR Code" className="w-32 h-32 mx-auto" />
                </div>
              )}

              <div className="mt-4">
                {isLoading && (
                  <div className="h-2 bg-blue-600 rounded-full">
                    <div
                      className="h-full bg-blue-800"
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                )}
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-2 rounded-md text-white font-semibold transition ${
                  isLoading 
                    ? 'bg-gray-600 cursor-not-allowed' 
                    : 'bg-blue-600 hover:bg-blue-700'
                }`}
              >
                {isLoading ? 'Uploading...' : 'Upload Product'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
