"use client";
import Button from "@/components/Button";
import { useAuth } from "@/lib/contexts/AuthContext";
import { signInWithGoogle } from "@/lib/firebase/auth";
import { useEffect, useState } from "react";
import Image from "next/image";

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
  const [isLoggedIn, setLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    if (token != null) {
      setLoggedIn(true);
    }
  }, [token]);

  console.log("photo : " + user?.photoURL);

  const handleGoogleLogin = async () => {
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
        setLoggedIn(true);
        onSuccess?.();
      }
    } catch (error) {
      console.error("Login error:", error);
      onError?.((error as unknown as string) || "Login failed");
    }
  };

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
