"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import GoogleLoginBtn from "@/components/GoogleLoginButton";
import { useAuth } from "@/contexts/AuthContext";

export default function LoginPage() {
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && user) {
      router.push("/");
    }
  }, [user, loading, router]);

  const handleLoginSuccess = () => {
    router.push("/", { scroll: false });
  };

  const handleLoginError = (error: string) => {
    console.error(error);
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-32 w-32 animate-spin rounded-full border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="font-bai flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            ล็อกอินก่อนเข้านะน้อง
          </h2>
        </div>
        <div className="mt-8 space-y-6">
          <div className="flex justify-center">
            <GoogleLoginBtn
              onSuccess={handleLoginSuccess}
              onError={handleLoginError}
              className="w-full max-w-sm"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
