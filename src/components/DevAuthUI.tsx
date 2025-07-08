"use client";

import { useAuth } from "@/lib/hooks/useAuth";
import { signInWithGoogle, signOut } from "@/lib/firebase/auth";
import Image from "next/image";

// very crude floater for dev -- palm
export default function DevAuthUI() {
  const { user, loading, token } = useAuth();

  const handleLogin = async () => {
    const { error } = await signInWithGoogle();
    if (error) {
      console.error("Dev login error:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut();
      await fetch("/api/v1/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      window.location.reload();
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  if (loading) {
    return (
      <div className="font-bai fixed top-4 right-4 z-50 max-w-xs rounded-lg border border-yellow-400 bg-yellow-100 p-4 shadow-lg">
        <div className="text-sm font-medium text-yellow-800">
          Loading auth...
        </div>
      </div>
    );
  }

  return (
    <div className="font-bai fixed top-4 right-4 z-50 max-w-xs rounded-lg border border-gray-300 bg-white p-4 shadow-lg">
      <div className="mb-2 text-xs font-bold text-gray-700">
        🔧 DEV AUTH UI เดี๋ยวลบออกจ้า
      </div>

      {user ? (
        <div className="space-y-2">
          <div className="text-xs font-medium text-green-600">✅ Signed In</div>
          <div className="text-xs text-gray-600">
            <div className="truncate">
              <strong>Email:</strong> {user.email}
            </div>
            <div className="truncate">
              <strong>Name:</strong> {user.displayName || "N/A"}
            </div>
            <div className="truncate">
              <strong>UID:</strong> {user.uid.substring(0, 10)}...
            </div>
          </div>
          <div className="text-xs text-gray-500">
            <strong>Token:</strong> {token ? "✅ Present" : "❌ Missing"}
          </div>
          {user.photoURL && (
            <Image
              src={user.photoURL}
              alt="Profile"
              width={32}
              height={32}
              className="h-8 w-8 rounded-full"
            />
          )}
          <button
            onClick={handleLogout}
            className="w-full rounded bg-red-500 px-2 py-1 text-xs text-white transition-colors hover:bg-red-600"
          >
            Sign Out
          </button>
        </div>
      ) : (
        <div className="space-y-2">
          <div className="text-xs font-medium text-red-600">
            ❌ Not Signed In
          </div>
          <button
            onClick={handleLogin}
            className="w-full rounded bg-blue-500 px-2 py-1 text-xs text-white transition-colors hover:bg-blue-600"
          >
            Sign In with Google
          </button>
        </div>
      )}

      <div className="mt-2 border-t border-gray-200 pt-2">
        <div className="text-xs text-gray-500">
          <strong>Current URL:</strong>
          <div className="truncate">
            {typeof window !== "undefined" ? window.location.pathname : "N/A"}
          </div>
        </div>
      </div>
    </div>
  );
}
