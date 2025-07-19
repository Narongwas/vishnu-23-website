import { db } from "@/lib/services/firebase.admin";
import { NextResponse } from "next/server";

// PATCH : "api/v1/bingo/scores/refresh"
// refresh all groups' bingoScore
export async function PATCH() {
  // get all groups
  const groupsSnapshot = await db.collection("groups").get();

  for (const groupDoc of groupsSnapshot.docs) {
    const groupId = groupDoc.id;
    const usersSnapshot = await db
      .collection("users")
      .where("group", "==", groupId)
      .where("role", "==", "camper")
      .get();

    let groupScore = 0;

    for (const userDoc of usersSnapshot.docs) {
      const bingoScore = userDoc.data().bingoScore;
      groupScore += bingoScore;
    }

    await groupDoc.ref.update({ bingoScore: groupScore });
  }

  return NextResponse.json(
    { message: "Groups refreshed successfully" },
    { status: 200 }
  );
}
