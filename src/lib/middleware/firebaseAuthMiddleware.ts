import { NextRequest } from "next/server";
import { firebaseAdmin } from "@/lib/services/firebase.admin";

export const firebaseAuthMiddleware = async (req: NextRequest) => {
  const authCookie = req.cookies.get("authToken")?.value;
  const authHeader = req.headers.get("authorization");
  //if (!authHeader || !authHeader.startsWith("Bearer ")) {
  //  return { error: "Missing or invalid Authorization header" };
  //}

  const idToken = authHeader?.split("Bearer ")[1] || authCookie;

  if (!idToken) {
    return { error: "Missing or invalid ID token" };
  }

  try {
    const decodedToken = await firebaseAdmin.auth().verifyIdToken(idToken);
    return { uid: decodedToken.uid, decodedToken };
  } catch (err) {
    return { error: "Invalid or expired token : " + err };
  }
};
