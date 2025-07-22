"use client";

import { useAuth } from "@/lib/hooks/useAuth";
import { useRouter } from "@/i18n/navigation";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";

export default function RedirectHandler() {
  const { token } = useAuth();
  const isLoggedIn = !!token;
  const searchParams = useSearchParams();
  const router = useRouter();
  const hasRedirected = useRef(false);

  useEffect(() => {
    const redirectTo = searchParams.get("redirect");

    if (redirectTo && isLoggedIn && !hasRedirected.current) {
      hasRedirected.current = true;

      // Use i18n router which should preserve locale automatically
      router.push(redirectTo);
    }
  }, [isLoggedIn, searchParams, router]);

  return null; // This component doesn't render anything
}
