"use client";

import { getRedirectResult, User } from "firebase/auth";
import { auth } from "@/lib/services/firebase.client";
import { AuthContext } from "@/lib/contexts/AuthContext";
import {
  getCurrentUser,
  getIdToken,
  onAuthStateChange,
} from "@/lib/firebase/auth";
import { useCallback, useEffect, useState } from "react";

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState<string | null>(null);

  const refreshToken = useCallback(async () => {
    if (user) {
      const idToken = await getIdToken();
      setToken(idToken);
    }
  }, [user]);

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
      }
    } catch {}
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChange(async (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);

      try {
        const result = await getRedirectResult(auth);
        if (result?.user) {
          const email = result.user.email;
          if (!email || !email.endsWith("21@student.chula.ac.th")) {
            alert("You can only sign in with Chula Engineering email.");
            await auth.signOut();
            return;
          }
          setUser(result.user);
          await loginWithToken(result.user);
        }
      } catch {}

      if (firebaseUser) {
        const idToken = await getIdToken();
        setToken(idToken);
      } else {
        setToken(null);
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
  }, [refreshToken]);

  const value = {
    user,
    loading,
    token,
    refreshToken,
    loginWithToken,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
