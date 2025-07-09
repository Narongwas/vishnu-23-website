import { NextRequest, NextResponse } from "next/server";
import { db, firebaseAdmin } from "@/lib/services/firebase.admin";
import { FieldValue } from "firebase-admin/firestore";

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

// Set group score : Private (admin)
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
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

  // get body
  const body = await request.json();
  const { addScore } = body;
  // add new score to total score
  try {
    const id = (await params).id;
    await db
      .collection("groups")
      .doc(id)
      .update({ totalScore: FieldValue.increment(addScore) });
    return NextResponse.json(
      { msg: `Successfully added ${addScore} to the total score` },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      JSON.stringify({ error: "Failed to get group score : " + err }),
      { status: 500 }
    );
  }
}

// Set group score : Private (admin)
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
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

  // get body
  const body = await request.json();
  const { newScore } = body;
  // set new score
  try {
    const id = (await params).id;
    await db.collection("groups").doc(id).update({ totalScore: newScore });
    return NextResponse.json({ score: newScore }, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      JSON.stringify({ error: "Failed to get group score : " + err }),
      { status: 500 }
    );
  }
}
