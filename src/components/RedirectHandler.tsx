"use client";

import { useAuth } from "@/lib/hooks/useAuth";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function RedirectHandler() {
  const { token } = useAuth();
  const isLoggedIn = !!token;
  const searchParams = useSearchParams();
  const params = useParams();
  const locale = params.locale as string;

  useEffect(() => {
    // Check if there's a redirect parameter in the URL
    const redirectTo = searchParams.get("redirect");

    if (redirectTo && isLoggedIn && typeof window !== "undefined") {
      // Preserve locale in the redirect URL
      const redirectWithLocale = redirectTo.startsWith("/")
        ? `/${locale}${redirectTo}`
        : redirectTo;

      // Force refresh and redirect to the intended page
      window.location.href = redirectWithLocale;
    }
  }, [isLoggedIn, searchParams, locale]);

  return null; // This component doesn't render anything
}
