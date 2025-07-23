"use client";

import { useAuth } from "@/lib/hooks/useAuth";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";

export default function RedirectHandler() {
  const { token } = useAuth();
  const isLoggedIn = !!token;
  const searchParams = useSearchParams();
  const params = useParams();
  const locale = params.locale as string;
  const hasRedirected = useRef(false);

  useEffect(() => {
    const redirectTo = searchParams.get("redirect");

    console.log("Debug - RedirectHandler:", {
      redirectTo,
      isLoggedIn,
      locale,
      currentUrl: window.location.href,
      hasRedirected: hasRedirected.current,
    });

    if (redirectTo && isLoggedIn && !hasRedirected.current) {
      hasRedirected.current = true;

      // Add a small delay to ensure auth state is fully synced
      setTimeout(() => {
        // Ensure locale exists, fallback to 'en'
        const safeLocale = locale || "en";

        // Manually construct URL with locale
        const redirectUrl = `/${safeLocale}${redirectTo}`;

        console.log("Redirecting to:", redirectUrl);

        window.location.href = redirectUrl;
      }, 500); // 500ms delay
    }
  }, [isLoggedIn, searchParams, locale]);

  return null; // This component doesn't render anything
}
