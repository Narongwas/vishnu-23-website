"use client";

import { AuthContext } from "@/lib/contexts/AuthContext";
import {
  getCurrentUser,
  getIdToken,
  onAuthStateChange,
} from "@/lib/firebase/auth";
import { auth } from "@/lib/services/firebase.client";
import { onIdTokenChanged, User } from "firebase/auth";
import { useCallback, useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();
  const refreshInterval = useRef<NodeJS.Timeout | null>(null);

  const refreshToken = useCallback(async () => {
    if (user) {
      const idToken = await getIdToken();
      setToken(idToken);
    }
  }, [user]);

  const fetchUserWithAutoRefresh = async (url: string, user: User) => {
    let idToken = await user.getIdToken();
    setToken(idToken);

    let response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ idToken }),
    });

    if (response.status === 401) {
      idToken = await user.getIdToken(true);
      setToken(idToken);
      response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ idToken }),
      });
    }

    return response;
  };

  const loginWithToken = async (firebaseUser: User) => {
    try {
      const idToken = await firebaseUser.getIdToken();
      const response = await fetch("/api/v1/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ idToken }),
      });

      if (response.ok) {
        setToken(idToken);
      } else {
        console.error("AuthContext - Login API failed");
      }
    } catch (error) {
      console.error("AuthContext - Login error:", error);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChange(async (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);

      if (firebaseUser) {
        const idToken = await getIdToken();
        setToken(idToken);
      } else {
        setToken(null);
        // Check if we need to redirect to login for protected pages
        if (typeof window !== "undefined") {
          const authRequired = document.querySelector(
            'meta[name="x-auth-required"]'
          );
          if (authRequired) {
            router.push(
              `/?redirect=${encodeURIComponent(window.location.pathname)}`
            );
          }
        }
      }
    });

    const currentUser = getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
      refreshToken();
    } else {
      setLoading(false);
    }

    return () => unsubscribe();
  }, [refreshToken, router]);

  useEffect(() => {
    const unsubscribe = onIdTokenChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        await fetchUserWithAutoRefresh("/api/v1/auth/login", firebaseUser);

        // Set up interval to refresh token every 50 minutes
        if (refreshInterval.current) clearInterval(refreshInterval.current);
        refreshInterval.current = setInterval(
          async () => {
            const refreshedToken = await firebaseUser.getIdToken(true);
            setToken(refreshedToken);
            await fetch("/api/v1/auth/login", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ idToken: refreshedToken }),
            });
          },
          50 * 60 * 1000
        ); // 50 minutes
      } else {
        setToken(null);
        if (refreshInterval.current) clearInterval(refreshInterval.current);
      }
    });
    return () => {
      unsubscribe();
      if (refreshInterval.current) clearInterval(refreshInterval.current);
    };
  }, []);

  const value = {
    user,
    loading,
    token,
    refreshToken,
    loginWithToken,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
