"use client";

import { useAuth } from "@/lib/hooks/useAuth";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function RedirectHandler() {
  const { token } = useAuth();
  const isLoggedIn = !!token;
  const searchParams = useSearchParams();

  useEffect(() => {
    // Check if there's a redirect parameter in the URL
    const redirectTo = searchParams.get("redirect");

    if (redirectTo && isLoggedIn && typeof window !== "undefined") {
      // Force refresh and redirect to the intended page
      window.location.href = redirectTo;
    }
  }, [isLoggedIn, searchParams]);

  return null; // This component doesn't render anything
}
