import { db } from "@/lib/services/firebase.admin";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const snapshot = await db.collection("groups").get();

    if (snapshot.empty) {
      return NextResponse.json({ groups: [] }, { status: 200 });
    }

    const groups = snapshot.docs.map((doc) => ({
      id: doc.id,
      score: doc.data()?.totalScore || 0,
    }));

    return NextResponse.json({ groups }, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to get group scores: " + err },
      { status: 500 }
    );
  }
}
