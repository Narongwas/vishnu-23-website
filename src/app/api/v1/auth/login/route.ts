import { firebaseAdmin } from "@/lib/services/firebase.admin";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { idToken } = body;

    if (!idToken) {
      return NextResponse.json(
        { error: "ID token is required" },
        { status: 400 }
      );
    }

    const decodedToken = await firebaseAdmin.auth().verifyIdToken(idToken);
    const userRecord = await firebaseAdmin.auth().getUser(decodedToken.uid);

    if (
      !userRecord.email ||
      !userRecord.email.endsWith("21@student.chula.ac.th")
    ) {
      return NextResponse.json(
        {
          error:
            "You can only sign in with chula email with faculty of engineering",
        },
        { status: 403 }
      );
    }
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
    return NextResponse.json(
      { error: "Authentication failed" },
      { status: 500 }
    );
  }
}
