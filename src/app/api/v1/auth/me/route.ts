import { NextRequest, NextResponse } from "next/server";
import { db, firebaseAdmin } from "@/lib/services/firebase.admin";

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get("Authorization");
    const cookieToken = request.cookies.get("authToken")?.value;
    const token = authHeader?.split(" ")[1] || cookieToken;

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const session = await firebaseAdmin.auth().verifyIdToken(token);
    const email: string | undefined = session?.email;

    const doc = await db.collection("users").where("email", "==", email).get();
    if (doc.empty) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(
      { user: { ...doc.docs[0].data() } },
      { status: 200 }
    );
  } catch (error) {
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

    console.error("Error in get user info:", error);

    return NextResponse.json(
      { error: "Authentication failed" },
      { status: 500 }
    );
  }
}
