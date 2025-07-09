"use client";

import Button from "@/components/Button";
import { signInWithGoogle } from "@/lib/firebase/auth";
import { useAuth } from "@/lib/hooks/useAuth";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useCallback, useEffect, useState } from "react";

interface GoogleLoginBtnProps {
  onSuccess?: () => void;
  onError?: (error: string) => void;
  className?: string;
}

function SearchParamsHandler({
  onRedirectChange,
}: {
  onRedirectChange: (redirect: string) => void;
}) {
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/";

  useEffect(() => {
    onRedirectChange(redirectTo);
  }, [redirectTo, onRedirectChange]);

  return null;
}

export default function GoogleLoginBtn({
  onSuccess,
  onError,
}: GoogleLoginBtnProps) {
  const { loginWithToken, token, user } = useAuth();
  const isLoggedIn = !!token;
  const [redirectTo, setRedirectTo] = useState("/");
  const router = useRouter();

  console.log("photo : " + user?.photoURL);

  const handleGoogleLogin = useCallback(async () => {
    try {
      const { user, error } = await signInWithGoogle();

      if (error) {
        const errorMessage =
          error instanceof Error ? error.message : JSON.stringify(error);
        onError?.(errorMessage || "Login failed");
      }
      if (user) {
        console.log("GoogleLoginButton - User signed in:", user.email);
        await loginWithToken(user);
        onSuccess?.();
        router.push(redirectTo);
      }
    } catch (error) {
      console.error("Login error:", error);
      onError?.((error as unknown as string) || "Login failed");
    }
  }, [loginWithToken, onError, onSuccess, redirectTo, router]);

  const t = useTranslations("HomeHero");

  return (
    <>
      <Suspense fallback={null}>
        <SearchParamsHandler onRedirectChange={setRedirectTo} />
      </Suspense>
      {isLoggedIn ? (
        <button
          type="button"
          onClick={() => router.push("/profile")}
          className="border-none bg-transparent p-0"
          aria-label="Go to profile"
          title="Go to profile"
        >
          <Image
            src={user?.photoURL ?? ""}
            alt="user profile"
            width={44}
            height={44}
            className="rounded-full"
          />
        </button>
      ) : (
        <Button
          onClick={handleGoogleLogin}
          icon="login"
          label={t("action.logIn")}
          Size="Small"
          Appearance="Primary"
          aria-label={t("action.logIn")}
          title={t("action.logIn")}
        />
      )}
    </>
  );
}
