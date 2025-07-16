import { db } from "@/lib/services/firebase.admin";
import { NextResponse } from "next/server";

export async function GET() {
  // Getall
  try {
    const snapshot = await db.collection("groups").get();

    if (snapshot.empty) {
      return NextResponse.json({ groups: [] }, { status: 200 });
    }

    const groups = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return NextResponse.json({ groups }, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to get group information: " + err },
      { status: 500 }
    );
  }
}
