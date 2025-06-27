import { NextRequest, NextResponse } from "next/server";
import { firebaseAdmin } from "@/lib/services/firebase.admin";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { idToken } = body;

    if (!idToken) {
      return Response.json({ error: "ID token is required" }, { status: 400 });
    }

    const decodedToken = await firebaseAdmin.auth().verifyIdToken(idToken);
    const userRecord = await firebaseAdmin.auth().getUser(decodedToken.uid);
    const response = NextResponse.json(
      {
        success: true,
        user: {
          uid: userRecord.uid,
          email: userRecord.email,
          displayName: userRecord.displayName,
          photoURL: userRecord.photoURL,
        },
      },
      { status: 200 }
    );

    response.cookies.set("authToken", idToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      path: "/",
      maxAge: 86400,
    });

    return response;
  } catch (error) {
    console.error("Login error:", error);
    return Response.json({ error: "Authentication failed" }, { status: 401 });
  }
}
