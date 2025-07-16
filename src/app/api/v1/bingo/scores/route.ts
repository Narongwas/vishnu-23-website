import { db } from "@/lib/services/firebase.admin";
import { NextResponse } from "next/server";

// GET : "api/v1/bingo/scores" public
// get all groups' bingoScore and sort them in descending order
export async function GET() {
  const groupsSnapshot = await db
    .collection("groups")
    .orderBy("bingoScore", "desc")
    .get();

  const groupData = groupsSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return NextResponse.json(groupData, { status: 200 });
}
