import { db } from "@/lib/services/firebase.admin";
import { NextRequest, NextResponse } from "next/server";

// PATCH : "api/v1/bingo/scores/refresh"
// refresh all groups' bingoScore
export async function PATCH(request: NextRequest) {
  const token = request.headers.get("Authorization")?.split(" ")[1];

  // check if the token is valid
  if (token !== process.env.CRON_SECRET_TOKEN) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

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
