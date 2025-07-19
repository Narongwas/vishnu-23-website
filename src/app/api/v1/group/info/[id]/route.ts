import { db } from "@/lib/services/firebase.admin";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  // Get each
  try {
    const id = (await params).id;
    const doc = await db.collection("groups").doc(id).get();
    if (!doc.exists) {
      return NextResponse.json({ error: "Group not found" }, { status: 404 });
    }
    const groupData = doc.data();
    return NextResponse.json(
      {
        id: doc.id,
        ...groupData,
      },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to get group information : " + err },
      { status: 500 }
    );
  }
}
