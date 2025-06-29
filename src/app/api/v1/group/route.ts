import { NextRequest, NextResponse } from "next/server";
import { db, firebaseAdmin } from "@/lib/services/firebase.admin";

// This API route retrieves the group from the user student email.
export async function GET(request: NextRequest) {
  const authHeader = request.headers.get("Authorization");
  const cookieToken = request.cookies.get("authToken")?.value;
  const token = authHeader?.split(" ")[1] || cookieToken;

  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  //decoding the token to get the user email and role
  const session = await firebaseAdmin.auth().verifyIdToken(token);

  const email: string | undefined = session?.email;
  // Check if email is correct
  if (!email) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 403 });
  }
  const doc = await db.collection("users").where("email", "==", email).get();

  return NextResponse.json(
    { group: doc.docs[0].data().group },
    { status: 200 }
  );
}
