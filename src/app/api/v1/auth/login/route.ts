import { NextRequest, NextResponse } from "next/server";
import { db, firebaseAdmin } from "@/lib/services/firebase.admin";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { idToken } = body;

    if (!idToken) {
      return Response.json({ error: "ID token is required" }, { status: 400 });
    }

    const decodedToken = await firebaseAdmin.auth().verifyIdToken(idToken);
    const userRecord = await firebaseAdmin.auth().getUser(decodedToken.uid);
    // to also fetch from real user data in firestore
    const userQuery = await db
      .collection("users")
      .where("email", "==", userRecord.email)
      .limit(1)
      .get();

    let firestoreUser = null;
    if (!userQuery.empty) {
      firestoreUser = { id: userQuery.docs[0].id, ...userQuery.docs[0].data() };
    }
    const response = NextResponse.json(
      {
        success: true,
        user: {
          uid: userRecord.uid,
          email: userRecord.email,
          displayName: userRecord.displayName,
          photoURL: userRecord.photoURL,
          userData: firestoreUser,
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
