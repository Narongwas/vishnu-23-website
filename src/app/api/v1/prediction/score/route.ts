import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/services/firebase.admin";

export async function GET(request: NextRequest) {
  const predictionId = request.nextUrl.searchParams.get("prediction");

  if (!predictionId) {
    return NextResponse.json(
      { error: "prediction ID is required" },
      { status: 400 }
    );
  }

  const answersData = await db
    .collection("answer")
    .where("predictionId", "==", predictionId)
    .where("isCorrect")
    .select("userId", "isCorrect")
    .get();

  const groups = (await db.collection("group").get()).docs.map((doc) => {
    return { group: doc.id, name: doc.data().name };
  });

  const userData = (await db.collection("user").get()).docs;

  const groupsList = groups.map(({ group, name }) => {
    const usersInGroup = userData
      .filter((userDoc) => userDoc.data().group === group)
      .map((userDoc) => userDoc.id);
    const userCorrect = answersData.docs.filter((answerDoc) =>
      usersInGroup.includes(answerDoc.data().userId)
    );

    return {
      group,
      name,
      correctCount: userCorrect.length,
    };
  });

  groupsList.sort((a, b) => b.correctCount - a.correctCount);

  return groupsList;
}
