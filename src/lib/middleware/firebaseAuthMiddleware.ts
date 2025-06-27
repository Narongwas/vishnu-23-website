import { NextRequest } from "next/server";
import { firebaseAdmin } from "@/lib/services/firebase.admin";

export const firebaseAuthMiddleware = async (req: NextRequest) => {
  const authHeader = req.headers.get("authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return { error: "Missing or invalid Authorization header" };
  }

  const idToken = authHeader.split("Bearer ")[1];
  try {
    const decodedToken = await firebaseAdmin.auth().verifyIdToken(idToken);
    return { uid: decodedToken.uid, decodedToken };
  } catch (err) {
    return { error: "Invalid or expired token : " + err };
  }
};
