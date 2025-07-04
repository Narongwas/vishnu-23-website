"use client";

import {
  getCurrentUser,
  getIdToken,
  onAuthStateChange,
} from "@/lib/firebase/auth";
import { auth } from "@/lib/services/firebase.client";
import { onIdTokenChanged, User } from "firebase/auth";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  token: string | null;
  refreshToken: () => Promise<void>;
  loginWithToken: (user: User) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

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
      console.log("AuthContext - Token refreshed:", !!idToken);
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
        console.log("AuthContext - Login API success");
        setToken(idToken);
      } else {
        console.error("AuthContext - Login API failed");
      }
    } catch (error) {
      console.error("AuthContext - Login error:", error);
    }
  };

  useEffect(() => {
    console.log("AuthContext - Setting up auth listener");

    const unsubscribe = onAuthStateChange(async (firebaseUser) => {
      console.log(
        "AuthContext - Auth state changed:",
        firebaseUser?.email || "null"
      );
      setUser(firebaseUser);
      setLoading(false);

      if (firebaseUser) {
        const idToken = await getIdToken();
        setToken(idToken);
        console.log("AuthContext - Token set:", !!idToken);
      } else {
        setToken(null);
        console.log("AuthContext - Token cleared");
      }
    });

    const currentUser = getCurrentUser();
    if (currentUser) {
      console.log("AuthContext - Current user found:", currentUser.email);
      setUser(currentUser);
      refreshToken();
    } else {
      setLoading(false);
    }

    return () => unsubscribe();
  }, [refreshToken]);

  useEffect(() => {
    const unsubscribe = onIdTokenChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const idToken = await firebaseUser.getIdToken();
        await fetch("/api/v1/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ idToken }),
        });
        setToken(idToken);
      } else {
        setToken(null);
      }
    });
    return () => unsubscribe();
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
