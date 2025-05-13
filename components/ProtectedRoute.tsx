// components/ProtectedRoute.tsx
"use client";

import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { useRouter } from "next/navigation";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        router.push("/login");
        return;
      }

      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        router.push("/login");
        return;
      }

      const userData = docSnap.data();

      if (!userData.approved) {
        router.push("/waiting");
        return;
      }

      const path = window.location.pathname;

      // Redirect company user to /dashboard only
      if (userData.isCompany && path !== "/userdashboard") {
        router.push("/userdashboard");
        return;
      }

      // Redirect normal user to /userdashboard only
      if (userData.isAdmin && path !== "/dashboard") {
        router.push("/dashboard");
        return;
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, [router]);

  if (loading) {
    return <div className="text-white text-center mt-10">Checking access...</div>;
  }

  return <>{children}</>;
}
