import emailToId from "@/lib/helpers/emailToId";
import { db, firebaseAdmin } from "@/lib/services/firebase.admin";
import { NextRequest, NextResponse } from "next/server";

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

  const studentId = emailToId(email);

  const doc = await db.collection("users").doc(studentId).get();

  return NextResponse.json({ group: doc.data()?.group }, { status: 200 });
}
