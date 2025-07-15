import { auth } from "@/lib/services/firebase.client";
import {
  GoogleAuthProvider,
  User,
  browserLocalPersistence,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  setPersistence,
  signInWithPopup,
} from "firebase/auth";

setPersistence(auth, browserLocalPersistence);

const googleProvider = new GoogleAuthProvider();
googleProvider.addScope("email");
googleProvider.addScope("profile");
googleProvider.setCustomParameters({
  hd: "student.chula.ac.th",
});

// sign in with popup for now
export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const email = result.user.email;

    if (!email || !email.endsWith("21@student.chula.ac.th")) {
      throw new Error(
        "You can only sign in with chula email with faculty of engineering"
      );
    }

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
