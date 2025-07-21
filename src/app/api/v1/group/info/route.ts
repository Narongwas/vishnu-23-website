import { db } from "@/lib/services/firebase.admin";
import { Group } from "@/lib/types/group";
import { NextResponse } from "next/server";

export async function GET() {
  // Getall
  try {
    const snapshot = await db.collection("groups").get();

    if (snapshot.empty) {
      return NextResponse.json({ groups: [] }, { status: 200 });
    }

    const groups = snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        lineLink: data.lineLink,
        registrationsPoint: data.registrationsPoint,
        groupName: data.groupName,
        bingo: data.bingo,
        bingoScore: data.bingoScore,
        totalScore: data.totalScore,
      } as Group;
    });
    groups.sort((a, b) => b.totalScore - a.totalScore);

    return NextResponse.json({ groups }, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to get group information: " + err },
      { status: 500 }
    );
  }
}
