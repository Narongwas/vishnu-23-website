import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/services/firebase.admin";
import { FieldValue } from "firebase-admin/firestore";

//This is a method to get a list of group and number of member who is correct
// in predictionId query
export async function GET(request: NextRequest) {
  try {
    const predictionId = request.nextUrl.searchParams.get("prediction");

    //If not send predictionId return error
    if (!predictionId) {
      return NextResponse.json(
        { error: "prediction ID is required" },
        { status: 400 }
      );
    }

    const [prediction, answersData, groupsSnap, usersSnap] = await Promise.all([
      db.collection("predictions").doc(predictionId).get(),
      db
        .collection("answers")
        .where("predictionId", "==", predictionId)
        .where("isCorrect")
        .select("userId", "isCorrect")
        .get(),
      db.collection("groups").get(),
      db.collection("users").get(),
    ]);

    const groups = groupsSnap.docs.map((doc) => {
      return { group: doc.id, name: doc.data().name };
    });

    const userData = usersSnap.docs;

    // groupList is a list of object that contains group(e.g. A,B,...), groupname and
    // number of user that correct
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

    //sort by correctCount in descending order
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

//This is a method to add group score, that has a highest member who is correct
//Should send body like [{ group1 , point1},{ group2 , point2},{ group3, point3}]
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
      .update(db.collection("groups").doc(first.group), {
        totalScore: FieldValue.increment(first.point ?? 0),
      })
      .update(db.collection("groups").doc(second.group), {
        totalScore: FieldValue.increment(second.point ?? 0),
      })
      .update(db.collection("groups").doc(third.group), {
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
