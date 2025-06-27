import {
  signInWithPopup,
  GoogleAuthProvider,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  User,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";
import { auth } from "@/lib/services/firebase.client";

setPersistence(auth, browserLocalPersistence);

const googleProvider = new GoogleAuthProvider();
googleProvider.addScope("email");
googleProvider.addScope("profile");

// sign in with popup for now
export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return { user: result.user, error: null };
  } catch (error) {
    console.error("Google sign-in error:", error);
    return { user: null, error: error };
  }
};

export const signOut = async () => {
  try {
    await firebaseSignOut(auth);
    return { error: null };
  } catch (error) {
    console.error("Sign-out error:", error);
    return { error: error };
  }
};

export const onAuthStateChange = (callback: (user: User | null) => void) => {
  return onAuthStateChanged(auth, callback);
};

export const getCurrentUser = () => {
  return auth.currentUser;
};

export const getIdToken = async () => {
  const user = getCurrentUser();
  if (user) {
    try {
      return await user.getIdToken();
    } catch (error) {
      console.error("Error getting ID token:", error);
      return null;
    }
  }
  return null;
};
