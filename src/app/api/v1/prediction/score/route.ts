import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/services/firebase.admin";
import { firebaseAuthMiddleware } from "@/lib/middleware/firebaseAuthMiddleware";
import scoreAdmin from "@/jsondata/score-admin.json";
import emailToId from "@/lib/helpers/emailToId";

//This is a method to get a list of group and number of member who is correct
// in predictionId query
export async function GET(request: NextRequest) {
  try {
    const predictionId = request.nextUrl.searchParams.get("prediction");

    const { decodedToken, error } = await firebaseAuthMiddleware(request);
    if (error || !decodedToken) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const uid = emailToId(decodedToken.email || "");

    const userRole = (await db.collection("users").doc(uid).get()).data()?.role;

    if (
      !scoreAdmin.email.includes(decodedToken.email || "") &&
      userRole !== "admin"
    ) {
      return NextResponse.json(
        { error: "You cannot access this route" },
        { status: 403 }
      );
    }

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
        .where("isCorrect", "==", true)
        .select("userId", "isCorrect")
        .get(),
      db.collection("groups").get(),
      db.collection("users").get(),
    ]);

    const groups = groupsSnap.docs.map((group) => {
      return { group: group.id, name: group.data().name };
    });

    const userData = usersSnap.docs;

    // groupList is a list of object that contains group(e.g. A,B,...), groupname and
    // number of user that correct
    const groupsList = groups.map(({ group, name }) => {
      const usersInGroup = userData
        .filter((userDoc) => userDoc.data().group === group)
        .filter((userDoc) => userDoc.data().role === "camper")
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
