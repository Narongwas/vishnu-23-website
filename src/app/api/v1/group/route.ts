import { NextRequest, NextResponse } from "next/server";
import { db, firebaseAdmin } from "@/utils/firebase.admin";

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
    ((email.slice(2) !== "68" ||
      email.slice(8, email.length) !== "21@student.chula.ac.th") &&
      role !== "admin")
  ) {
    return NextResponse.json(
      { error: "Email is not correct" },
      { status: 400 }
    );
  }

  const studentId = parseInt(email.split("@")[0]);
  const doc = await db
    .collection("users")
    .where("studentId", "==", studentId)
    .get();

  return NextResponse.json(
    { group: doc.docs[0].data().group },
    { status: 200 }
  );
}
