import { NextRequest, NextResponse } from "next/server";
import { db, firebaseAdmin } from "@/lib/services/firebase.admin";
import emailToId from "@/lib/helpers/emailToId";

// This API route retrieves the group from the user student email.
export async function GET(request: NextRequest) {
  // get token from the authorization request header
  const authHeader = request.headers.get("Authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const token = authHeader.split(" ")[1];

  //decoding the token to get the user email and role
  const session = await firebaseAdmin.auth().verifyIdToken(token);

  const email: string | undefined = session?.email;
  const role: string = session?.role;

  // Check if email is correct
  if (
    !email ||
    (!email.endsWith("21@student.chula.ac.th") && role !== "admin") //I'm not sure how to define type of role, so I assume it's a string
  ) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 403 });
  }

  const studentId = emailToId(email);
  const doc = await db
    .collection("users")
    .where("studentId", "==", studentId)
    .get();

  return NextResponse.json(
    { group: doc.docs[0].data().group },
    { status: 200 }
  );
}
