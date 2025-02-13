"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLogged"); 
    console.log("isLoggedIn:", isLoggedIn); 
    if (!isLoggedIn) {
      router.replace("/admin");
    }
  }, [router]);

  return <>{children}</>;
}
