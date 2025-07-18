import { protect } from "@/lib/middleware/protect";
import { db } from "@/lib/services/firebase.admin";
import { FieldValue } from "firebase-admin/firestore";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const res = await protect(request, ["admin"]);
  if (res) {
    return res;
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
      { error: "Failed to add group score : " + err },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const res = await protect(request, ["admin"]);
  if (res) {
    return res;
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
      { error: "Failed to set group score : " + err },
      { status: 500 }
    );
  }
}
