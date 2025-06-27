"use client";
import { auth } from "@/utils/firebase.client";
import { GoogleAuthProvider, User, signInWithPopup } from "firebase/auth";
import React, { createContext, useContext, useEffect, useState } from "react";
import { cookies } from "next/headers";

export async function getAuthToken(): Promise<string | undefined> {
  const cookieStore = await cookies();
  return cookieStore.get("firebaseToken")?.value;
}

export async function setAuthToken(token: string): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set("firebaseToken", token, {
    secure: process.env.NODE_ENV === "development",
    httpOnly: true,
    sameSite: "strict",
  });
}

export async function removeAuthToken(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete("firebaseToken");
}

type AuthContextType = {
  user: User | null;
  loginGoogle: () => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (!auth) return;

    return auth.onAuthStateChanged(async (user: User | null) => {
      if (!user) {
        setUser(null);
        removeAuthToken();
        return;
      }

      const token = await user.getIdToken();
      if (user) {
        setUser(user);
        setAuthToken(token);
      }
    });
  }, []);

  function loginGoogle(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!auth) {
        reject();
        return;
      }
      signInWithPopup(auth, new GoogleAuthProvider())
        .then((user) => {
          console.log("Signed in with Google: ", user);
          resolve();
        })
        .catch(() => {
          console.error("Something went wrong");
          reject();
        });
    });
  }

  function logout(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!auth) {
        reject();
        return;
      }
      auth
        .signOut()
        .then(() => {
          console.log("Signed out");
          resolve();
        })
        .catch(() => {
          console.error("Something went wrong");
          reject();
        });
    });
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loginGoogle,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
