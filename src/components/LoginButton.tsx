"use client";

import Button from "@/components/Button";
import { useAuth } from "@/components/AuthContext";
import { signInWithGoogle } from "@/lib/firebase/auth";
import Image from "next/image";
import { useEffect, useCallback, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";

interface GoogleLoginBtnProps {
  onSuccess?: () => void;
  onError?: (error: string) => void;
  className?: string;
}

export default function GoogleLoginBtn({
  onSuccess,
  onError,
}: GoogleLoginBtnProps) {
  const { loginWithToken, token, user } = useAuth();
  const isLoggedIn = !!token;
  const redirectTo = useSearchParams().get("redirect") || "/";
  const router = useRouter();
  const loginAttempted = useRef(false);

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

  useEffect(() => {
    if (!isLoggedIn && redirectTo !== "/" && !loginAttempted.current) {
      loginAttempted.current = true;
      handleGoogleLogin();
    }
  }, [redirectTo, isLoggedIn, handleGoogleLogin]);

  return isLoggedIn ? (
    <>
      <Image
        src={user?.photoURL ?? ""}
        alt=""
        width={48}
        height={48}
        className="rounded-full border border-gray-300"
      />
    </>
  ) : (
    <Button
      onClick={handleGoogleLogin}
      icon="login"
      label="เข้าสู่ระบบ"
      Size="Small"
      Appearance="Primary"
      aria-label="เข้าสู่ระบบ"
      title="เข้าสู่ระบบ"
    />
  );
}
