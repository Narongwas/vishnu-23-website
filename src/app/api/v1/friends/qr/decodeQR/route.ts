import { NextRequest, NextResponse } from "next/server";
import { firebaseAdmin } from "@/lib/services/firebase.admin";

// This is a GET method to decode token from QR code and return the userID
export async function GET(request: NextRequest) {
  try {
    //get the token from the request headers or cookies
    const token =
      request.headers.get("token")?.split(" ")[1] ||
      request.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.json({ error: "Invalid token" }, { status: 400 });
    }

    // Verify the token and get the user ID
    const decodedToken = await firebaseAdmin.auth().verifyIdToken(token);
    const uid = decodedToken.uid;

    // return the user ID
    return NextResponse.json(
      {
        uid: uid,
      },
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (e) {
    console.error("Error in QR code generation:", e);
    return NextResponse.json({ error: "Error decode token" }, { status: 500 });
  }
}
