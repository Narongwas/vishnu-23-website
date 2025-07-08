import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/services/firebase.admin";
import { FieldValue } from "firebase-admin/firestore";

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

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const [first, second, third]: { group: string; point?: number }[] = body;

    if (!first.group || !second.group || !third.group) {
      return NextResponse.json(
        { error: "List of first 3 groups is required" },
        { status: 400 }
      );
    }

    await db
      .batch()
      .update(db.collection("group").doc(first.group), {
        totalScore: FieldValue.increment(first.point ?? 0),
      })
      .update(db.collection("group").doc(second.group), {
        totalScore: FieldValue.increment(second.point ?? 0),
      })
      .update(db.collection("group").doc(third.group), {
        totalScore: FieldValue.increment(third.point ?? 0),
      })
      .commit();

    return new NextResponse(null, { status: 204 });
  } catch (err) {
    console.error("Error adding score" + err);
    return NextResponse.json(
      { error: "Error adding score" + err },
      { status: 500 }
    );
  }
}
