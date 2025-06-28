import { NextRequest, NextResponse } from "next/server";
import { db, firebaseAdmin } from "@/lib/services/firebase.admin";

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get("Authorization");
  const cookieToken = request.cookies.get("authToken")?.value;
  const token = authHeader?.split(" ")[1] || cookieToken;

  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const session = await firebaseAdmin.auth().verifyIdToken(token);
  const email: string | undefined = session?.email;

  const doc = await db.collection("users").where("email", "==", email).get();

  return NextResponse.json(
    { user: { ...doc.docs[0].data() } },
    { status: 200 }
  );
}
