import { NextRequest, NextResponse } from "next/server";
import { db, firebaseAdmin } from "@/lib/services/firebase.admin";

// Get each group score : Public
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const id = (await params).id;
    const doc = await db.collection("groups").doc(id).get();
    if (!doc.exists) {
      return NextResponse.json({ error: "Group not found" }, { status: 404 });
    }
    const groupData = doc.data();
    return NextResponse.json({ score: groupData?.totalScore }, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      JSON.stringify({ error: "Failed to get group score : " + err }),
      { status: 500 }
    );
  }
}

// Update group score : Private (admin)
export async function PUT(request: NextRequest) {
  // get token from the authorization request header
  const authHeader = request.headers.get("Authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const token = authHeader.split(" ")[1];

  //decoding the token to get the user email and role
  const session = await firebaseAdmin.auth().verifyIdToken(token);

  const role: string = session?.role;

  if (role != "admin") {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 403 });
  }

  // ...
}
