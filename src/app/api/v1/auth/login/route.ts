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
            "Please sign in using your Chulalongkorn University Faculty of Engineering email address only.",
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
      maxAge: 345600,
    });

    return response;
  } catch (error) {
    console.error("Login error:", error);

    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      (error as { code?: string }).code === "auth/id-token-expired"
    ) {
      return NextResponse.json(
        { error: "ID token has expired" },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { error: "Authentication failed" },
      { status: 500 }
    );
  }
}
