import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/services/firebase.admin";

export async function GET(request: NextRequest) {
  try {
    const predictionId = request.nextUrl.searchParams.get("prediction");

    if (!predictionId) {
      return NextResponse.json(
        { error: "prediction ID is required" },
        { status: 400 }
      );
    }

    const [prediction, answersData, groupsSnap, usersSnap] = await Promise.all([
      db.collection("prediction").doc(predictionId).get(),
      db
        .collection("answer")
        .where("predictionId", "==", predictionId)
        .where("isCorrect")
        .select("userId", "isCorrect")
        .get(),
      db.collection("group").get(),
      db.collection("user").get(),
    ]);

    const groups = groupsSnap.docs.map((doc) => {
      return { group: doc.id, name: doc.data().name };
    });

    const userData = usersSnap.docs;

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

    return NextResponse.json(
      {
        question: prediction.data()?.question,
        day: prediction.data()?.day,
        time: prediction.data()?.time,
        leaderboard: groupsList,
      },
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (err) {
    console.error("Error fetching prediction leaderboard : " + err);
    return NextResponse.json(
      { error: "Error fetching prediction leaderboard" },
      { status: 500 }
    );
  }
}
