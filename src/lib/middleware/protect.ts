import { db, firebaseAdmin } from "@/lib/services/firebase.admin";
import { NextRequest, NextResponse } from "next/server";

export async function protect(req: NextRequest, roles: string[]) {
  const authHeader = req.headers.get("Authorization");
  const cookieToken = req.cookies.get("authToken")?.value;
  const token = authHeader?.split(" ")[1] || cookieToken;

  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

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
