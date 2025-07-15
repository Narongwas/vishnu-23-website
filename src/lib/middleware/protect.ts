import { db, firebaseAdmin } from "@/lib/services/firebase.admin";
import { NextRequest, NextResponse } from "next/server";

export async function protect(req: NextRequest, roles: string[]) {
  // get token from the authorization request header
  const authHeader = req.headers.get("Authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const token = authHeader.split(" ")[1];

  //decoding the token to get the user email and role
  const session = await firebaseAdmin.auth().verifyIdToken(token);

  const email: string | undefined = session?.email;

  const doc = await db.collection("users").where("email", "==", email).get();
  if (doc.empty) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const userData = doc.docs[0].data();
  const role: string = userData.role;

  if (!roles.includes(role)) {
    return NextResponse.json({ error: "Permission denied" }, { status: 403 });
  }

  return null;
}
